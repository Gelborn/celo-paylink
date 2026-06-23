# MiniPay PayLink

MiniPay PayLink is a mobile-first no-custody payment profile for freelancers, creators, and solo merchants on Celo.

Create a public, no-custody payment profile, add your handle, avatar, bio, and preferred token, and receive stablecoin payments through public profile URLs like:

`/u/your-handle?amount=5&ref=coffee`

Add the deployed HTTPS origin before sharing the path outside the app.
When building a PayLink URL by hand, URL-encode `ref` values with spaces or symbols before sharing.
Keep `ref` concise because it appears on receipts and recent payment history.
The dashboard payment request form handles this URL encoding automatically for generated localized PayLink prefilled payment request URLs.
Use a supported token symbol such as `USDm`, `USDC`, or `USD₮`, or a supported token contract address for the optional `token` query.
When typing `token=USD₮` by hand, URL-encode the `₮` symbol or use the token contract address.
Omit `token` to use the recipient's preferred token from their profile.
Use human-readable decimal amounts such as `5` or `5.50`; do not put token base units in PayLink request URLs.
Use a period (`.`) as the decimal separator in shared PayLink URLs, even for localized demos, so wallets and receipts read the amount consistently.

## Mainnet Status

- The app is ready to run against Celo mainnet.
- Set `NEXT_PUBLIC_DEFAULT_CHAIN=celo` for production builds.
- Set `NEXT_PUBLIC_APP_URL` to the deployed HTTPS origin without a trailing slash before building.
- Populate the mainnet contract address and decimal deployment block so public routes, receipts, and payment history resolve against the live contract.

## Product

- [MiniPay quickstart](https://docs.celo.org/build-on-celo/build-on-minipay/quickstart)
- [Token contracts](https://docs.celo.org/tooling/contracts/token-contracts)
- [Network overview](https://docs.celo.org/build-on-celo/network-overview)

MiniPay PayLink is built around one simple flow:

1. Create a public, no-custody payment profile.
2. Share your public profile URL or a localized PayLink prefilled payment request URL.
3. Get paid directly to your wallet in Celo stablecoins with a shareable, reopenable PayLink receipt URL for client proof.

## Features

- Claim a unique immutable handle for a stable public profile URL
- Add an avatar URL, bio, payment message, and preferred token
- Update bio, avatar, payment message, and preferred token without changing the handle
- Accept supported Celo stablecoins (`USDm`, `USDC`, or `USD₮`) directly from MiniPay-compatible wallets
- Forward funds straight to the recipient with no platform custody
- Render recent payments from PayLink contract events on Celo without a separate backend, server session, or indexer
- Share reopenable PayLink receipt URLs with matching Celo explorer links for the same Celo transaction
- Link PayLink receipts back to the recipient profile for repeat payments
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

For walletless local review, keep the placeholder `PRIVATE_KEY` from `.env.example`; replace it only before deploy, verify, or seed scripts.

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
# or, for phone testing on the same network:
npm run dev:mobile
```

For phone testing on the same network, run `npm run dev:mobile` and open the printed network URL on the phone in MiniPay.
Use that printed network URL for local QR code, public profile, or localized PayLink prefilled payment request URL tests on the phone.
If you test generated public profile or localized PayLink prefilled payment request URLs on the phone, set `NEXT_PUBLIC_APP_URL` to the printed network origin and restart the dev server.
Regenerate or recopy dashboard-created URLs after the restart so they use the printed network origin.
Scan any generated local QR code once after the restart to confirm it opens the printed network origin.
When using the phone URL, replace `localhost:3000` in the payment and receipt preview URLs below with the printed network host.
Keep the path and query string unchanged so amount, token, reference, and preview mode still match.
Keep the phone and dev machine on the same Wi-Fi or LAN network; `localhost` only works from the machine running Next.js.
If the phone cannot open the network URL, allow incoming connections to the dev server on the dev machine or disable VPN isolation before retrying.

For a quick reviewer demo without connecting a wallet or deploying a contract, open:

`http://localhost:3000/u/demo-paylink?amount=5&ref=coffee&token=USDC&preview=1`

This opens a prefilled public profile payment page with the demo amount, token, and reference already set.
Keep `demo-paylink` for local preview; use a real saved profile handle for final demo URLs.
For final reviewer notes, regenerate and copy the localized PayLink prefilled payment request URL from the deployed dashboard instead of adapting this local preview URL.

If Next.js starts on a different local port, replace `3000` in both preview URLs before opening them.
Keep both preview URLs on the same local origin so the payment and receipt states share the same preview context.

To preview the matching receipt state, open:

`http://localhost:3000/success?tx=0x51f0ed1f7cf8e3d4860ef65bfb30e94c877ce4bfc0a463ce84f674fed0ef8e2c&handle=demo-paylink&amount=5&token=USDC&ref=coffee&preview=1`

When sharing walletless review notes, label both preview URLs as local preview URLs rather than live payment proof so reviewers can compare the payment page and shareable, reopenable receipt preview.
If you change the demo amount, token, or reference, keep the same values in both preview URLs so the receipt matches the payment page.
Keep `handle=demo-paylink` in both preview URLs so the payment and receipt states point to the same demo profile.
Use the same browser locale for both preview URLs so the payment page and receipt copy stay in the same language.
For Brazilian Portuguese screenshots, use the in-app language switcher or set the browser language to Portuguese (Brazil) before capturing both preview URLs.
Use the same mobile viewport size for both preview URLs so screenshots show the payment and receipt states at matching scale.

The demo receipt URL uses a fixed transaction hash for UI review only; live receipts should use the hash returned by the wallet flow.
Do not include the fixed preview hash in final submission notes as live payment proof.
For live demos, copy the PayLink receipt URL and matching Celo explorer transaction link after wallet confirmation so the `tx` value and handle match the real payment.
Share the full unshortened PayLink receipt URL and matching Celo explorer transaction link so reviewers can see the deployed origin and transaction path.
Open the copied PayLink receipt URL in a signed-out or private browser once before sharing so reviewers see the same amount, token, reference, and handle without payer wallet state.
After a live payment, refresh the public profile once so reviewers can see the same amount, token, reference, and handle in the latest PayLink contract event on that profile.

`preview=1` only works outside production; production public profile payment pages should omit it and use the deployed `PayLinkProfile` contract.

## Production Configuration

These values should be set explicitly for a public deployment:

- `NEXT_PUBLIC_APP_URL`: canonical HTTPS public origin, without a path or trailing slash, used by metadata, share URLs, receipts, robots, and sitemap output.
- `NEXT_PUBLIC_DEFAULT_CHAIN`: `celo` for mainnet, `celoSepolia` for testing, matching the selected contract address, deployment block, and RPC URL.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_MAINNET`: deployed `PayLinkProfile` address on Celo mainnet.
- `NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_MAINNET`: decimal `PayLinkProfile` creation block used to bound event reads for payment history.
- `NEXT_PUBLIC_CELO_MAINNET_RPC_URL`: browser-safe Celo mainnet RPC endpoint that does not include private provider credentials.
- `NEXT_PUBLIC_CELO_SEPOLIA_RPC_URL`: browser-safe Celo Sepolia RPC endpoint for staging builds that does not include private provider credentials.

For Celo Sepolia staging, use the matching `_SEPOLIA` contract address, decimal creation block, and browser-safe RPC URL with `NEXT_PUBLIC_DEFAULT_CHAIN=celoSepolia`.

Do not leave `NEXT_PUBLIC_APP_URL=http://localhost:3000` or a LAN dev host in a public production build because generated share and receipt URLs inherit that origin.

## Deploy

Deploy to Celo Sepolia:

```bash
npm run deploy:sepolia
```

Deploy to Celo mainnet:

```bash
npm run deploy:mainnet
```

Verify the deployed contract on the same network after deployment:

```bash
npm run verify:sepolia
# or
npm run verify:mainnet
```

After deployment, copy the contract address and decimal creation block into the matching `NEXT_PUBLIC_*` values, then run the production build with those values in place.

## Environment Notes

- `NEXT_PUBLIC_DEFAULT_CHAIN` should be `celoSepolia` while testing and exactly `celo` for production; other values fall back to `celoSepolia`.
- `NEXT_PUBLIC_APP_URL` should be an HTTPS origin without a trailing slash or path for production.
- Vercel, CI, and any machine running `npm install`, `npm run compile`, `npm test`, deploy, or verify scripts should use Node `22.13.0` or newer.
- `PRIVATE_KEY` is only needed for deploy, verify, or seed scripts; frontend preview URLs do not use that key.
- `NEXT_PUBLIC_*` values are safe to expose to the browser.
- `CELO_*` values are private RPC settings for Hardhat and scripts only.
- `NEXT_PUBLIC_CELO_*` values are the browser-facing RPC endpoints used by the frontend.
- `NEXT_PUBLIC_CONTRACT_ADDRESS_*` powers public payment routes, receipts, and payment history.
- `NEXT_PUBLIC_CONTRACT_DEPLOYMENT_BLOCK_*` limits payment history reads to the decimal contract creation block height; leave it blank only for walletless local previews.
- Restart the dev server after changing `.env` so public origin, chain, contract, and browser-facing RPC values refresh.
- `PAYLINK_CONTRACT_ADDRESS_*` is used by explorer verification and demo seeding scripts.
- Keep `PAYLINK_CONTRACT_ADDRESS_*` aligned with the matching `NEXT_PUBLIC_CONTRACT_ADDRESS_*` when running scripts.
- `ETHERSCAN_API_KEY` and `CELOSCAN_API_KEY` are only needed when running explorer verification scripts.
- Do not rely on private `CELO_*` values as fallbacks for browser-facing config.

## Wallet Support

- Primary target: MiniPay on Celo.
- Use MiniPay for the canonical mobile review before retesting the same public profile or localized PayLink prefilled payment request URL with other browser wallets.
- Reuse the same localized PayLink prefilled payment request URL when comparing MiniPay and browser-wallet fallback behavior so amount, token, and reference stay aligned.
- Use a low-value live payment for review so wallet confirmations and receipts stay verifiable without risking more funds than needed.
- Use the recipient wallet for profile setup and a separate payer wallet when testing a live payment so receipt and settlement checks stay clear.
- Payers do not need a PayLink account; they only need a compatible Celo wallet to review and send the payment.
- Any browser wallet that can switch to the Celo network, approve ERC-20 allowances, and submit PayLink transactions can exercise the same profile and payment flows.
- When retesting outside MiniPay, confirm the browser-wallet fallback shows the Celo network switch before approving or sending the payment.
- After a browser-wallet fallback network switch, re-check that PayLink still shows the same amount, token, reference, and recipient handle before approving or sending.
- Public profile payment pages, success receipt pages, and recent payments are designed to work without a backend, server session, or separate indexer.

## Release Checks

Run these locally before publishing public changes or recording final demo footage:

```bash
npm run compile
npm test
npm run lint
npm run typecheck
npm run build
```

The GitHub Actions CI workflow is manual-only; trigger the manual workflow for the submitted commit after the final push if you need a hosted verification record reviewers can match to the submitted SHA.

## Avatar URLs

- PayLink accepts remote avatar image URLs for this proof of concept.
- Avatar URLs must be `https://`.
- Use a direct image file URL rather than a profile page or gallery link so preview fetchers can load the image directly.
- Avoid expiring or signed avatar image URLs so dashboard avatars and shared profile previews keep loading.
- Open the avatar URL in a private or signed-out browser once before final screenshots to catch blocked, expiring, or sign-in-gated images.
- Square images work best because PayLink displays avatars in a circular crop on profile pages and shared previews.
- Prefer a lightweight image file so public profiles and link previews load quickly on mobile networks.
- Leave the avatar URL blank to use the built-in initials fallback.

## Supported Tokens

These token addresses come from the current Celo docs. Before a mainnet deployment, re-check them against the latest Celo token docs before copying production environment values.
PayLink expects the token decimals listed in `lib/tokens.ts`: `USDC` and `USD₮` use 6 decimals, and `USDm` uses 18 decimals.
If a token address or decimal changes, update this table and `lib/tokens.ts` in the same review.

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
- `.env.example` uses placeholders and public RPC defaults so reviewers can run walletless previews without private credentials.
- `SECURITY.md` asks private reports to include app surface, wallet prompt, PayLink URL type, receipt URL, matching Celo explorer link, and transaction context without secrets or unrelated wallet details.
- CI remains available through `workflow_dispatch` for manual verification of the submitted commit without running on every push or pull request.
- `package.json` keywords highlight MiniPay public profiles, public profile URLs, localized PayLink prefilled payment request URLs, Celo stablecoin payment request URLs, payment proof, Celo receipts, Celo explorer transaction links, shareable and reopenable receipt URLs, direct no-custody payments, walletless payment previews, bilingual and localized payments, and MiniPay PWA discovery.
- `layout.tsx` publishes root language and direction attributes, social and keyword metadata for MiniPay request URLs, localized PayLink prefilled payment request URLs, direct no-custody Celo stablecoin payments, payment proof, Celo explorer transaction links, shareable and reopenable receipt URLs, bilingual and localized payments, and MiniPay PWA discovery, plus mobile web app tags, referrer policy, and Talent App verification metadata.
- `robots.ts` and page metadata keep dashboard routes, receipt paths, and preview URLs out of indexing while PayLink receipt links still open directly for sharing.
- `sitemap.ts` publishes the canonical app origin for search engines; dynamic profile URLs are shared directly instead of being enumerated.
- `manifest.ts` publishes install metadata for direct no-custody Celo payments, business, finance, productivity, and utility app categories, maskable install icons, English plus Brazilian Portuguese mobile prefilled payment page and shareable, reopenable receipt preview screenshots, and the `Open PayLink dashboard` shortcut with the `My PayLink` short label, localized PayLink prefilled payment request URL context, recent PayLink event payment wording, and receipt URL reopening description.
- Demo, launch, and pitch notes live in `docs/`, including walletless preview URLs and live receipt proof checks that stay separate from runtime implementation code.

## Docs

See the launch and review notes:

- [docs/launch-checklist.md](./docs/launch-checklist.md)
- [docs/demo-script.md](./docs/demo-script.md)
- [docs/pitch-outline.md](./docs/pitch-outline.md)
- [SECURITY.md](./SECURITY.md)
- [LICENSE](./LICENSE)
