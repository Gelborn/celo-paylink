import { expect } from "chai";
import { network } from "hardhat";

type NetworkConnection = Awaited<ReturnType<typeof network.create>>;

describe("PayLinkProfile", function () {
  let ethers: NetworkConnection["ethers"];

  async function deployFixture() {
    const [owner, payer, outsider] = await ethers.getSigners();

    const MockERC20 = await ethers.getContractFactory("MockERC20");
    const usdCoin = (await MockERC20.deploy("USD Coin", "USDC", 6)) as any;
    await usdCoin.waitForDeployment();

    const PayLinkProfile = await ethers.getContractFactory("PayLinkProfile");
    const payLink = (await PayLinkProfile.deploy([
      await usdCoin.getAddress()
    ])) as any;
    await payLink.waitForDeployment();

    await usdCoin.mint(payer.address, 50_000_000n);

    return { owner, payer, outsider, usdCoin, payLink };
  }

  async function deployFailingTokenFixture() {
    const [owner, payer] = await ethers.getSigners();

    const MockFailingERC20 = await ethers.getContractFactory("MockFailingERC20");
    const failingToken = (await MockFailingERC20.deploy()) as any;
    await failingToken.waitForDeployment();

    const PayLinkProfile = await ethers.getContractFactory("PayLinkProfile");
    const payLink = (await PayLinkProfile.deploy([
      await failingToken.getAddress()
    ])) as any;
    await payLink.waitForDeployment();

    return { owner, payer, failingToken, payLink };
  }

  before(async function () {
    ({ ethers } = await network.create());
  });

  it("creates a profile and normalizes the handle", async function () {
    const { owner, usdCoin, payLink } = await deployFixture();

    await payLink
      .connect(owner)
      .setProfile(
        "Atlas_Studio",
        "Atlas Studio",
        "https://example.com/avatar.png",
        "Freelance product design and interfaces.",
        "Thanks for the payment.",
        await usdCoin.getAddress()
      );

    const profile = await payLink.getProfile(owner.address);
    expect(profile.handle).to.equal("atlas_studio");
    expect(profile.displayName).to.equal("Atlas Studio");
    expect(profile.avatarUrl).to.equal("https://example.com/avatar.png");
  });

  it("rejects reusing a handle", async function () {
    const { owner, outsider, usdCoin, payLink } = await deployFixture();

    await payLink
      .connect(owner)
      .setProfile(
        "atlas",
        "Atlas",
        "https://example.com/atlas.png",
        "Builder one.",
        "Thanks.",
        await usdCoin.getAddress()
      );

    await expect(
      payLink
        .connect(outsider)
        .setProfile(
          "ATLAS",
          "Creator Copy",
          "https://example.com/copy.png",
          "Builder two.",
          "Thanks.",
          await usdCoin.getAddress()
        )
    ).to.be.revertedWithCustomError(payLink, "HandleTaken");
  });

  it("keeps the handle immutable after creation", async function () {
    const { owner, usdCoin, payLink } = await deployFixture();

    await payLink
      .connect(owner)
      .setProfile(
        "atlas",
        "Atlas",
        "https://example.com/atlas.png",
        "Builder one.",
        "Thanks.",
        await usdCoin.getAddress()
      );

    await expect(
      payLink
        .connect(owner)
        .setProfile(
          "another-handle",
          "Atlas",
          "https://example.com/atlas-2.png",
          "Updated bio.",
          "Thanks again.",
          await usdCoin.getAddress()
        )
    ).to.be.revertedWithCustomError(payLink, "HandleImmutable");
  });

  it("rejects unsupported tokens", async function () {
    const { owner, payLink } = await deployFixture();

    await expect(
      payLink
        .connect(owner)
        .setProfile(
          "atlas",
          "Atlas",
          "https://example.com/atlas.png",
          "Builder one.",
          "Thanks.",
          ethers.ZeroAddress
        )
    ).to.be.revertedWithCustomError(payLink, "UnsupportedToken");
  });

  it("rejects paying a missing profile", async function () {
    const { payer, usdCoin, payLink } = await deployFixture();

    await usdCoin.connect(payer).approve(await payLink.getAddress(), 5_000_000n);

    await expect(
      payLink
        .connect(payer)
        .pay("missing-handle", await usdCoin.getAddress(), 5_000_000n, "coffee")
    ).to.be.revertedWithCustomError(payLink, "ProfileNotFound");
  });

  it("rejects zero amount payments", async function () {
    const { owner, payer, usdCoin, payLink } = await deployFixture();

    await payLink
      .connect(owner)
      .setProfile(
        "atlas",
        "Atlas",
        "https://example.com/atlas.png",
        "Builder one.",
        "Thanks.",
        await usdCoin.getAddress()
      );

    await usdCoin.connect(payer).approve(await payLink.getAddress(), 1_000_000n);

    await expect(
      payLink
        .connect(payer)
        .pay("atlas", await usdCoin.getAddress(), 0, "coffee")
    ).to.be.revertedWithCustomError(payLink, "ZeroAmount");
  });

  it("forwards funds and emits a payment event", async function () {
    const { owner, payer, usdCoin, payLink } = await deployFixture();

    await payLink
      .connect(owner)
      .setProfile(
        "atlas",
        "Atlas",
        "https://example.com/atlas.png",
        "Builder one.",
        "Thanks.",
        await usdCoin.getAddress()
      );

    await usdCoin.connect(payer).approve(await payLink.getAddress(), 5_000_000n);

    await expect(
      payLink
        .connect(payer)
        .pay("atlas", await usdCoin.getAddress(), 5_000_000n, "coffee")
    )
      .to.emit(payLink, "PaymentSent")
      .withArgs(
        owner.address,
        payer.address,
        await usdCoin.getAddress(),
        5_000_000n,
        "coffee",
        "atlas"
      );

    expect(await usdCoin.balanceOf(owner.address)).to.equal(5_000_000n);
    expect(await usdCoin.balanceOf(payer.address)).to.equal(45_000_000n);
  });

  it("accepts an owner address as the payment recipient", async function () {
    const { owner, payer, usdCoin, payLink } = await deployFixture();

    await payLink
      .connect(owner)
      .setProfile(
        "atlas",
        "Atlas",
        "https://example.com/atlas.png",
        "Builder one.",
        "Thanks.",
        await usdCoin.getAddress()
      );

    await usdCoin.connect(payer).approve(await payLink.getAddress(), 5_000_000n);

    await expect(
      payLink
        .connect(payer)
        .pay(owner.address, await usdCoin.getAddress(), 5_000_000n, "invoice-42")
    )
      .to.emit(payLink, "PaymentSent")
      .withArgs(
        owner.address,
        payer.address,
        await usdCoin.getAddress(),
        5_000_000n,
        "invoice-42",
        "atlas"
      );
  });

  it("rejects malformed recipient addresses", async function () {
    const { payer, usdCoin, payLink } = await deployFixture();

    await expect(
      payLink
        .connect(payer)
        .pay(`0x${"z".repeat(40)}`, await usdCoin.getAddress(), 5_000_000n, "coffee")
    ).to.be.revertedWithCustomError(payLink, "InvalidRecipient");
  });

  it("reverts when the token transfer returns false", async function () {
    const { owner, payer, failingToken, payLink } = await deployFailingTokenFixture();

    await payLink
      .connect(owner)
      .setProfile(
        "atlas",
        "Atlas",
        "https://example.com/atlas.png",
        "Builder one.",
        "Thanks.",
        await failingToken.getAddress()
      );

    await expect(
      payLink
        .connect(payer)
        .pay("atlas", await failingToken.getAddress(), 5_000_000n, "coffee")
    ).to.be.revertedWithCustomError(payLink, "TransferFailed");
  });
});
