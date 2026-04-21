# MiniPay PayLink

MiniPay PayLink is a mobile-first payment profile for freelancers, creators, and solo merchants on Celo.

Create a public page, add your handle and avatar, and receive stablecoin payments through links like:

`/u/user?amount=5&ref=coffee`

## Product

- [MiniPay quickstart](https://docs.celo.org/build-on-celo/build-on-minipay/quickstart)
- [Token contracts](https://docs.celo.org/tooling/contracts/token-contracts)
- [Network overview](https://docs.celo.org/build-on-celo/network-overview)

MiniPay PayLink is built around one simple flow:

1. Create a public payment profile.
2. Share your public page or a prefilled charge link.
3. Get paid directly in Celo stablecoins.

## Features

- Claim a unique immutable handle
- Add an avatar URL, bio, and payment message
- Update profile metadata without changing the handle
- Accept `USDm`, `USDC`, or `USD₮` directly from MiniPay-compatible wallets
- Forward funds straight to the recipient with no platform custody
- Render recent payments from onchain events without a backend or indexer
- Support `en` and `pt-BR` with automatic language detection

## Repo Layout

```text
celo-paylink/
├── app/                  # Next.js App Router pages
├── components/           # UI building blocks
├── contracts/            # Solidity contracts
├── docs/                 # Product notes and launch assets
├── lib/                  # Shared Celo, MiniPay, and formatting helpers
├── public/               # Static assets
├── scripts/              # Deploy, verify, seed, ABI export
└── test/                 # Hardhat tests
```

## Quick Start

Use Node `22.10.0` or newer. The repo includes [.nvmrc](./.nvmrc) for local setup, and Hardhat 3 will not run on older Node releases.

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env
```

3. Compile contracts:

```bash
npm run compile
```

4. Run local quality checks:

```bash
npm test
npm run lint
npm run typecheck
```

5. Run the frontend:

```bash
npm run dev
```

## Deploy

Deploy to Celo Sepolia:

```bash
npm run deploy:sepolia
```

Deploy to Celo mainnet:

```bash
npm run deploy:mainnet
```

Verify after deployment:

```bash
npm run verify:sepolia
# or
npm run verify:mainnet
```

## Environment Notes

- `NEXT_PUBLIC_DEFAULT_CHAIN` should be `celoSepolia` while testing and `celo` for production.
- Vercel, CI, and any machine running `npm run compile`, `npm test`, deploy, or verify scripts should use Node `22.10.0` or newer.
- `NEXT_PUBLIC_*` values are safe to expose to the browser.
- `CELO_*` values are private RPC settings for Hardhat and scripts only.
- `NEXT_PUBLIC_CELO_*` values are the browser-facing RPC endpoints used by the frontend.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_*` powers the frontend.
- `NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_*` limits payment history reads to the contract deployment block.
- `PAYLINK_CONTRACT_ADDRESS_*` is used by the verification and seeding scripts.
- Do not rely on private `CELO_*` values as fallbacks for browser config.

## Release Checks

Run this before pushing public changes:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Avatar URLs

- Arbitrary remote avatar sources are allowed for this POC.
- Avatar URLs must be `https://`.
- Invalid or non-HTTPS avatar URLs fall back to initials.

## Supported Tokens

From the current Celo docs:

- Mainnet
  - `USDm`: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
  - `USDC`: `0xcebA9300f2b948710d2653dD7B07f33A8B32118C`
  - `USD₮`: `0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e`
- Celo Sepolia
  - `USDm`: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`
  - `USDC`: `0x01C5C0122039549AD1493B8220cABEdD739BC44E`
  - `USD₮`: `0xd077A400968890Eacc75cdc901F0356c943e4fDb`

## Docs

See:

- [docs/launch-checklist.md](./docs/launch-checklist.md)
- [docs/demo-script.md](./docs/demo-script.md)
- [docs/pitch-outline.md](./docs/pitch-outline.md)
- [SECURITY.md](./SECURITY.md)
- [LICENSE](./LICENSE)
