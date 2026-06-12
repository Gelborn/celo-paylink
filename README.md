# MiniPay PayLink

MiniPay PayLink is a mobile-first payment profile for freelancers, creators, and solo merchants on Celo.

Create a public payment profile, add your handle, avatar, bio, and preferred token, and receive stablecoin payments through public profile URLs like:

`/u/user?amount=5&ref=coffee`

When building a link by hand, URL-encode references with spaces or symbols before sharing.
Keep `ref` concise because it appears on receipts and recent payment history.
The dashboard request-link form handles this encoding for generated links.
Use a supported token symbol such as `USDC` or a supported token contract address for the optional `token` query.
Omit `token` to use the recipient's preferred token from their profile.
Use human-readable decimal amounts such as `5` or `5.50`; do not put token base units in request URLs.
Use a period as the decimal separator in shared URLs so wallets and receipts read the amount consistently.

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
3. Get paid directly to your wallet in Celo stablecoins with an in-app receipt.

## Features

- Claim a unique immutable handle for a stable public profile URL
- Add an avatar URL, bio, and payment message
- Update bio, avatar, payment message, and preferred token without changing the handle
- Accept supported Celo stablecoins (`USDm`, `USDC`, or `USD₮`) directly from MiniPay-compatible wallets
- Forward funds straight to the recipient with no platform custody
- Render recent payments from PayLink activity on Celo without a separate backend or indexer
- Share PayLink receipt URLs with matching Celo explorer proof
- Support English (`en`) and Brazilian Portuguese (`pt-BR`) with automatic locale detection and a manual language switcher

## Repo Layout

```text
celo-paylink/
├── app/                  # Next.js routes, metadata, and PWA manifest
├── components/           # Shared dashboard and public payment UI
├── contracts/            # PayLinkProfile Solidity contract
├── docs/                 # Demo script, launch checklist, and pitch outline
├── lib/                  # Shared Celo, MiniPay, localization, and formatting helpers
├── public/               # Icons, OG image, and demo media
├── scripts/              # Contract deploy, verify, seed, and ABI export helpers
└── test/                 # Hardhat contract tests
```

## Quick Start

Use Node `22.13.0` or newer. The repo includes [.nvmrc](./.nvmrc) for local setup, and the current Hardhat/ESLint toolchain will not run cleanly on older Node releases.

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

For preview-only local review, keep the placeholder `PRIVATE_KEY` from `.env.example`; replace it only before deploy, verify, or seed scripts.

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

5. Run the local frontend:

```bash
npm run dev
```

For phone testing on the same network, run `npm run dev:mobile` and open the printed network URL in MiniPay.
Use that printed network URL for local QR code or share link tests on the phone.
When using the phone URL, replace `localhost:3000` in the preview links below with the printed network host.
Keep the phone and dev machine on the same Wi-Fi network; `localhost` only works from the machine running Next.js.
If the phone cannot open the network URL, allow incoming connections to the dev machine or disable VPN isolation before retrying.

For a quick reviewer demo without connecting a wallet or deploying a contract, open:

`http://localhost:3000/u/demo-paylink?amount=5&ref=coffee&token=USDC&preview=1`

This opens a prefilled public profile payment page with the demo amount, token, and reference already set.
Keep `demo-paylink` for local preview; use a real created handle for final demo links.

If Next.js starts on a different local port, replace `3000` in both preview URLs.
Keep both preview URLs on the same local origin so the payment and receipt states share one app session.

To preview the matching receipt state, open:

`http://localhost:3000/success?tx=0x51f0ed1f7cf8e3d4860ef65bfb30e94c877ce4bfc0a463ce84f674fed0ef8e2c&handle=demo-paylink&amount=5&token=USDC&ref=coffee&preview=1`

If you change the demo amount, token, or reference, keep the same values in both preview URLs so the receipt matches the payment page.
Keep the same handle in both preview URLs so the payment and receipt states point to the same profile.
Use the same browser locale for both preview URLs so the payment page and receipt copy match.
For Portuguese screenshots, switch the browser language to Portuguese (Brazil) before opening both preview URLs.
Use the same mobile viewport for both preview URLs so screenshots show the payment and receipt states at matching scale.

The demo receipt URL uses a fixed transaction hash for UI review only; live receipts should use the hash returned by the wallet flow.

`preview=1` only works outside production; production public profile payment pages should use the deployed `PayLinkProfile` contract.

## Production Configuration

These values should be set explicitly for a public deployment:

- `NEXT_PUBLIC_APP_URL`: canonical public origin, without a path or trailing slash, used by metadata, receipts, robots, and sitemap output.
- `NEXT_PUBLIC_DEFAULT_CHAIN`: `celo` for mainnet, `celoSepolia` for testing.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET`: deployed `PayLinkProfile` address on Celo mainnet.
- `NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_MAINNET`: numeric `PayLinkProfile` creation block used to bound event reads for payment history.
- `NEXT_PUBLIC_CELO_MAINNET_RPC_URL`: browser-safe Celo mainnet RPC endpoint.

For Celo Sepolia staging, use the matching `_SEPOLIA` contract address and numeric creation block with `NEXT_PUBLIC_DEFAULT_CHAIN=celoSepolia`.

Do not leave `NEXT_PUBLIC_APP_URL=http://localhost:3000` in a public production build.

## Deploy

Deploy to Celo Sepolia:

```bash
npm run deploy:sepolia
```

Deploy to Celo mainnet:

```bash
npm run deploy:mainnet
```

Verify the deployed contract after deployment:

```bash
npm run verify:sepolia
# or
npm run verify:mainnet
```

After deployment, copy the contract address and numeric creation block into the matching `NEXT_PUBLIC_*` values, then run the production build with those values in place.

## Environment Notes

- `NEXT_PUBLIC_DEFAULT_CHAIN` should be `celoSepolia` while testing and exactly `celo` for production; other values fall back to `celoSepolia`.
- `NEXT_PUBLIC_APP_URL` should be an HTTPS origin without a trailing slash or path for production.
- Vercel, CI, and any machine running `npm install`, `npm run compile`, `npm test`, deploy, or verify scripts should use Node `22.13.0` or newer.
- `PRIVATE_KEY` is only needed for deploy, verify, or seed scripts; frontend preview URLs do not use it.
- `NEXT_PUBLIC_*` values are safe to expose to the browser.
- `CELO_*` values are private RPC settings for Hardhat and scripts only.
- `NEXT_PUBLIC_CELO_*` values are the browser-facing RPC endpoints used by the frontend.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_*` powers the frontend.
- `NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_*` limits payment history reads to the decimal contract creation block height.
- `PAYLINK_CONTRACT_ADDRESS_*` is used by the verification and seeding scripts.
- Keep `PAYLINK_CONTRACT_ADDRESS_*` aligned with the matching `NEXT_PUBLIC_CONTRACT_ADDRESS_*` when running scripts.
- `ETHERSCAN_API_KEY` and `CELOSCAN_API_KEY` are only needed when running explorer verification scripts.
- Do not rely on private `CELO_*` values as fallbacks for browser config.

## Wallet Support

- Primary target: MiniPay on Celo.
- Use MiniPay for the canonical mobile review before retesting the same public profile link in other injected wallets.
- Use the recipient wallet for profile setup and a separate payer wallet when testing a live payment.
- Payers do not need a PayLink account; they only need a compatible wallet to confirm the transfer.
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
- Use a direct image URL rather than a profile page or gallery link.
- Avoid expiring or signed avatar image URLs so shared profile previews keep loading.
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
- `robots.ts` and page metadata keep dashboard and receipt routes out of indexing while PayLink receipt URLs remain directly shareable.
- `sitemap.ts` publishes the canonical app origin for search engines; dynamic profile links are shared directly instead of being enumerated.
- `manifest.ts` publishes install metadata, maskable install icons, the `Open PayLink dashboard` shortcut, and English plus Brazilian Portuguese mobile demo screenshots.
- Demo, launch, and pitch notes live in `docs/`, including preview URLs and launch checks that stay separate from implementation code.

## Docs

See the launch and review notes:

- [docs/launch-checklist.md](./docs/launch-checklist.md)
- [docs/demo-script.md](./docs/demo-script.md)
- [docs/pitch-outline.md](./docs/pitch-outline.md)
- [SECURITY.md](./SECURITY.md)
- [LICENSE](./LICENSE)
