import { expect } from "chai";
import { Interface } from "ethers";
import {
  collectLatestProfileSetOwners,
  dedupeProfilesByDisplayName,
  type ProfileRecord
} from "../lib/contract";
import { readPublicEnv } from "../lib/env";
import {
  featuredProfiles,
  getFeaturedProfileImageKey,
  getFeaturedProfileNameKey
} from "../lib/featured-profiles";
import { readServerEnv } from "../lib/server-env";
import {
  normalizeImageUrl,
  safeTextQuery,
  sanitizeCurrencyInput
} from "../lib/format";

const MANAGED_ENV_KEYS = [
  "CELO_MAINNET_RPC_URL",
  "CELO_SEPOLIA_RPC_URL",
  "NEXT_PUBLIC_CELO_MAINNET_RPC_URL",
  "NEXT_PUBLIC_CELO_SEPOLIA_RPC_URL",
  "NEXT_PUBLIC_DEFAULT_CHAIN"
] as const;

const profileSetInterface = new Interface([
  "event ProfileSet(address indexed owner, string handle, string displayName, string avatarUrl, address preferredToken)"
]);

function profileSetLog(owner: string, handle: string) {
  const event = profileSetInterface.getEvent("ProfileSet");
  if (!event) throw new Error("ProfileSet event missing.");

  return profileSetInterface.encodeEventLog(event, [
    owner,
    handle,
    "Creator",
    "",
    "0x765DE816845861e75A25fCA122bb6898B8B1282a"
  ]);
}

describe("app safety helpers", function () {
  let previousEnv: Partial<Record<(typeof MANAGED_ENV_KEYS)[number], string>>;

  beforeEach(function () {
    previousEnv = Object.fromEntries(
      MANAGED_ENV_KEYS.map((key) => [key, process.env[key]])
    );
  });

  afterEach(function () {
    for (const key of MANAGED_ENV_KEYS) {
      const value = previousEnv[key];

      if (value === undefined) {
        delete process.env[key];
        continue;
      }

      process.env[key] = value;
    }
  });

  it("keeps private RPC URLs out of the public env reader", function () {
    process.env.CELO_MAINNET_RPC_URL = "https://private-rpc.example/mainnet";
    delete process.env.NEXT_PUBLIC_CELO_MAINNET_RPC_URL;

    expect(readPublicEnv().celoMainnetRpcUrl).to.equal("https://forno.celo.org");
    expect(readServerEnv().celoMainnetRpcUrl).to.equal(
      "https://private-rpc.example/mainnet"
    );
  });

  it("prefers explicit public RPC URLs for browser config", function () {
    process.env.NEXT_PUBLIC_CELO_SEPOLIA_RPC_URL = "https://public-rpc.example/sepolia";

    expect(readPublicEnv().celoSepoliaRpcUrl).to.equal(
      "https://public-rpc.example/sepolia"
    );
  });

  it("normalizes arbitrary avatar URLs to canonical https URLs", function () {
    expect(
      normalizeImageUrl("  HTTPS://user:pass@Example.com/avatar.png?size=200#bio  ")
    ).to.equal("https://example.com/avatar.png?size=200");
  });

  it("rejects non-https avatar URLs", function () {
    expect(normalizeImageUrl("http://example.com/avatar.png")).to.equal("");
    expect(normalizeImageUrl("javascript:alert(1)")).to.equal("");
  });

  it("sanitizes amount query parameters", function () {
    expect(sanitizeCurrencyInput(["12.3456<script>", "999"])).to.equal("12.34");
    expect(sanitizeCurrencyInput("abc")).to.equal("");
  });

  it("sanitizes free-form text query parameters", function () {
    expect(safeTextQuery([" \nhello\u0000world\t", "ignored"])).to.equal("hello world");
    expect(safeTextQuery("x".repeat(200))).to.have.lengthOf(140);
  });

  it("collects latest unique profile owners from ProfileSet logs", function () {
    const ownerA = "0x1111111111111111111111111111111111111111";
    const ownerB = "0x2222222222222222222222222222222222222222";
    const ownerC = "0x3333333333333333333333333333333333333333";
    const logs = [
      profileSetLog(ownerA, "atlas"),
      profileSetLog(ownerB, "bravo"),
      profileSetLog(ownerA, "atlas"),
      profileSetLog(ownerC, "cora")
    ];

    expect(
      collectLatestProfileSetOwners(logs, 3).map((owner) => owner.toLowerCase())
    ).to.deep.equal([ownerC, ownerA, ownerB]);
    expect(collectLatestProfileSetOwners(logs, 2)).to.have.lengthOf(2);
  });

  it("dedupes discovered profiles by display name", function () {
    const profiles = [
      {
        owner: "0x1111111111111111111111111111111111111111",
        handle: "atlas-new",
        displayName: "Atlas Studio",
        avatarUrl: "",
        bio: "",
        paymentMessage: "",
        preferredToken: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
        exists: true
      },
      {
        owner: "0x2222222222222222222222222222222222222222",
        handle: "atlas-old",
        displayName: " atlas studio ",
        avatarUrl: "",
        bio: "",
        paymentMessage: "",
        preferredToken: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
        exists: true
      },
      {
        owner: "0x3333333333333333333333333333333333333333",
        handle: "empty-name-one",
        displayName: "",
        avatarUrl: "",
        bio: "",
        paymentMessage: "",
        preferredToken: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
        exists: true
      },
      {
        owner: "0x4444444444444444444444444444444444444444",
        handle: "empty-name-two",
        displayName: "",
        avatarUrl: "",
        bio: "",
        paymentMessage: "",
        preferredToken: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
        exists: true
      }
    ] satisfies ProfileRecord[];

    expect(dedupeProfilesByDisplayName(profiles).map((profile) => profile.handle))
      .to.deep.equal(["atlas-new", "empty-name-one", "empty-name-two"]);
  });

  it("keeps the fixed featured profile set distinct", function () {
    const expectedHandles = [
      "marble-motion-c8d6ed",
      "signal-photo-2b24a3",
      "aster-research-d2de2a",
      "echo-motion-814dd2",
      "tidal-collective-fed4e2",
      "signal-media-fdf3dd",
      "northline-collective-d50c06",
      "maple-ux-notes-b47f70",
      "foundry-works-427ba6",
      "lena-audio-4a2e30"
    ];
    const nameKeys = featuredProfiles.map(getFeaturedProfileNameKey);
    const imageKeys = featuredProfiles.map(getFeaturedProfileImageKey);

    expect(featuredProfiles.map((profile) => profile.handle)).to.deep.equal(
      expectedHandles
    );
    expect(new Set(nameKeys).size).to.equal(featuredProfiles.length);
    expect(new Set(imageKeys).size).to.equal(featuredProfiles.length);
  });
});
