# MiniPay PayLink

MiniPay PayLink turns a simple onchain profile into a shareable payment card for freelancers, creators, and solo merchants on Celo.

Users claim a handle, publish a short profile, and receive stablecoin payments through MiniPay using links like:

`/u/gelborn?amount=5&ref=coffee`

## Why This Fits Proof of Ship

- Built as a MiniPay-facing utility app, not a demo or farming tool
- Uses a verified smart contract on Celo
- Open source and GitHub-friendly
- Focused on real stablecoin transactions for real users

Rules and current docs used for this repo:

- [Proof of Ship campaign](https://talent.app/~/earn/celo-proof-of-ship)
- [MiniPay quickstart](https://docs.celo.org/build-on-celo/build-on-minipay/quickstart)
- [Token contracts](https://docs.celo.org/tooling/contracts/token-contracts)
- [Network overview](https://docs.celo.org/build-on-celo/network-overview)

## Features

- Claim a unique immutable handle
- Update profile metadata without changing the handle
- Accept `USDm`, `USDC`, or `USD₮` directly from MiniPay-compatible wallets
- Forward funds straight to the recipient with no platform custody
- Render recent payments from onchain events without a backend or indexer

## Repo Layout

```text
celo-paylink/
├── app/                  # Next.js App Router pages
├── components/           # UI building blocks
├── contracts/            # Solidity contracts
├── docs/                 # Submission assets and scripts
├── lib/                  # Shared Celo, MiniPay, and formatting helpers
├── public/               # Static assets
├── scripts/              # Deploy, verify, seed, ABI export
└── test/                 # Hardhat tests
```

## Quick Start

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

4. Run the frontend:

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

- `NEXT_PUBLIC_DEFAULT_CHAIN` should be `celoSepolia` while testing and `celo` for the final mainnet submission.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_*` powers the frontend.
- `PAYLINK_CONTRACT_ADDRESS_*` is used by the verification and seeding scripts.

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

## Contest Submission Checklist

See:

- [docs/submission-checklist.md](./docs/submission-checklist.md)
- [docs/demo-script.md](./docs/demo-script.md)
- [docs/pitch-outline.md](./docs/pitch-outline.md)
