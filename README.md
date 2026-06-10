# MiniPay PayLink

MiniPay PayLink is a mobile-first payment profile for freelancers, creators, and solo merchants on Celo.

Create a public payment profile, add your handle and avatar, and receive stablecoin payments through public profile URLs like:

`/u/user?amount=5&ref=coffee`

When building a link by hand, URL-encode references with spaces or symbols before sharing.
Keep `ref` concise because it appears on receipts and recent payment history.
The dashboard request-link form handles encoding for generated links.
Use a supported token symbol such as `USDC` or a deployed token address for the optional `token` query.
Omit `token` to use the recipient's preferred token from their profile.
Use human-readable decimal amounts such as `5` or `5.50`; do not use token base units in the URL.

## Mainnet Status

- The app is ready to run against Celo mainnet.
- Set `NEXT_PUBLIC_DEFAULT_CHAIN=celo` for production builds.
- Set `NEXT_PUBLIC_APP_URL` to the deployed HTTPS origin without a trailing slash before building.
- Populate the mainnet contract address and deployment block so public routes, receipts, and payment history resolve against the live contract.

## Product

- [MiniPay quickstart](https://docs.celo.org/build-on-celo/build-on-minipay/quickstart)
- [Token contracts](https://docs.celo.org/tooling/contracts/token-contracts)
- [Network overview](https://docs.celo.org/build-on-celo/network-overview)

MiniPay PayLink is built around one simple flow:

1. Create a public payment profile.
2. Share your public profile or a prefilled request link.
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

Use Node `22.13.0` or newer. The repo includes [.nvmrc](./.nvmrc) for local setup, and the current Hardhat/ESLint toolchain will not run cleanly on older Node releases.

1. Install dependencies:

```bash
npm install
```

2. Copy the environment file:

```bash
cp .env.example .env
```

For preview-only local review, keep the placeholder `PRIVATE_KEY`; replace it only before deploy, verify, or seed scripts.

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

For phone testing on the same network, run `npm run dev:mobile` and open the printed network URL from MiniPay.
Use that printed network URL for local QR-code or share-link tests on the phone.
Keep the phone and dev machine on the same Wi-Fi; `localhost` only works from the machine running Next.js.

For a quick reviewer demo without connecting a wallet or deploying a contract, open:

`http://localhost:3000/u/demo-paylink?amount=5&ref=coffee&token=USDC&preview=1`

This opens a prefilled public profile payment page with the demo amount, token, and reference already set.
Keep `demo-paylink` for local preview; use a real created handle for final demo links.

If Next.js starts on a different local port, replace `3000` in the preview URLs.

To preview the matching receipt state, open:

`http://localhost:3000/success?tx=0x51f0ed1f7cf8e3d4860ef65bfb30e94c877ce4bfc0a463ce84f674fed0ef8e2c&handle=demo-paylink&amount=5&token=USDC&ref=coffee&preview=1`

If you change the demo amount, token, or reference, keep the same values in both preview URLs.
Use the same browser locale for both preview URLs so the payment page and receipt copy match.
Use the same mobile viewport for both preview URLs so screenshots show the payment and receipt states at matching scale.

The demo receipt URL uses a fixed transaction hash for UI review; live receipts should use the hash returned by the wallet flow.

`preview=1` only works outside production; production public profile payment pages should use the deployed `PayLinkProfile` contract.

## Production Configuration

These values should be set explicitly for a public deployment:

- `NEXT_PUBLIC_APP_URL`: canonical public origin used by metadata, receipts, robots, and sitemap output.
- `NEXT_PUBLIC_DEFAULT_CHAIN`: `celo` for mainnet, `celoSepolia` for testing.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET`: deployed `PayLinkProfile` address on Celo mainnet.
- `NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_MAINNET`: deployment block used to bound event reads for payment history.
- `NEXT_PUBLIC_CELO_MAINNET_RPC_URL`: browser-safe mainnet RPC endpoint.

For Celo Sepolia staging, use the matching `_SEPOLIA` contract values with `NEXT_PUBLIC_DEFAULT_CHAIN=celoSepolia`.

Do not leave `NEXT_PUBLIC_APP_URL=http://localhost:3000` in a production build.

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

After deployment, copy the contract address and deployment block into the matching `NEXT_PUBLIC_*` values before building the frontend.

## Environment Notes

- `NEXT_PUBLIC_DEFAULT_CHAIN` should be `celoSepolia` while testing and `celo` for production.
- `NEXT_PUBLIC_APP_URL` should be an HTTPS origin without a trailing slash or path for production.
- Vercel, CI, and any machine running `npm install`, `npm run compile`, `npm test`, deploy, or verify scripts should use Node `22.13.0` or newer.
- `NEXT_PUBLIC_*` values are safe to expose to the browser.
- `CELO_*` values are private RPC settings for Hardhat and scripts only.
- `NEXT_PUBLIC_CELO_*` values are the browser-facing RPC endpoints used by the frontend.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_*` powers the frontend.
- `NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_*` limits payment history reads to the contract deployment block.
- `PAYLINK_CONTRACT_ADDRESS_*` is used by the verification and seeding scripts.
- `ETHERSCAN_API_KEY` and `CELOSCAN_API_KEY` are only needed when running explorer verification scripts.
- Do not rely on private `CELO_*` values as fallbacks for browser config.

## Wallet Support

- Primary target: MiniPay on Celo.
- Use MiniPay for the canonical mobile review before retesting the same public profile link in other injected wallets.
- Any injected wallet that can switch to Celo, approve ERC-20 allowances, and submit contract writes can exercise the same profile and payment flows.
- Public profile payment pages, success receipts, and recent payments are designed to work without a backend or indexer.

## Release Checks

Run these before pushing public changes:

```bash
npm run compile
npm test
npm run lint
npm run typecheck
npm run build
```

## Avatar URLs

- Arbitrary remote avatar sources are allowed for this POC.
- Avatar URLs must be `https://`.
- Square images work best because PayLink displays avatars in a circular crop.
- Invalid or non-HTTPS avatar URLs fall back to initials.

## Supported Tokens

From the current Celo docs. Before a mainnet deployment, re-check these addresses against the latest Celo token docs.

- Mainnet
  - `USDm`: `0x765DE816845861e75A25fCA122bb6898B8B1282a`
  - `USDC`: `0xcebA9300f2b948710d2653dD7B07f33A8B32118C`
  - `USD₮`: `0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e`
- Celo Sepolia
  - `USDm`: `0xdE9e4C3ce781b4bA68120d6261cbad65ce0aB00b`
  - `USDC`: `0x01C5C0122039549AD1493B8220cABEdD739BC44E`
  - `USD₮`: `0xd077A400968890Eacc75cdc901F0356c943e4fDb`

## Public Repo Notes

- The repo includes CI, Dependabot, `SECURITY.md`, and explicit public/private env separation.
- CI runs contract tests, lint, typecheck, and a production build on pushes and pull requests.
- `robots.ts` keeps dashboard routes and receipt URLs out of indexing.
- `sitemap.ts` publishes the canonical app origin for search engines; dynamic profile links are shared directly instead of being enumerated.
- `manifest.ts` publishes install metadata, the install icon, the Dashboard shortcut, and the mobile demo screenshot.
- Demo, launch, and pitch notes live in `docs/` so review assets stay separate from implementation code.

## Docs

See:

- [docs/launch-checklist.md](./docs/launch-checklist.md)
- [docs/demo-script.md](./docs/demo-script.md)
- [docs/pitch-outline.md](./docs/pitch-outline.md)
- [SECURITY.md](./SECURITY.md)
- [LICENSE](./LICENSE)
