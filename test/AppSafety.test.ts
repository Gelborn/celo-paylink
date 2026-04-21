import { expect } from "chai";
import { readPublicEnv } from "../lib/env";
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
});
