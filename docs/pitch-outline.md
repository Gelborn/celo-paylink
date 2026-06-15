# Pitch Outline

## Slide 1
- MiniPay PayLink
- A public stablecoin payment profile for freelancers, creators, and solo merchants

## Slide 2
- Problem
- Small creators, freelancers, and solo merchants need a public payment profile that feels native to MiniPay
- Copying and pasting wallet addresses makes small repeat payments harder to trust
- Wallet transfers without clear references are harder to reconcile with client requests

## Slide 3
- Product
- Claim a handle, publish a profile, and get paid in stablecoins
- Reuse the same public profile or prefilled payment request links for repeat payments
- Prefill amount, token, and reference for one-off requests
- Support English and Brazilian Portuguese in the same payment flow

## Slide 4
- Why Celo
- MiniPay mobile distribution
- Mobile-first stablecoin payment experience
- Low transaction costs for small repeat payments

## Slide 5
- Onchain design
- Verified PayLinkProfile contract
- Stablecoins forward directly to the recipient
- No custody; payments settle directly to the recipient wallet
- Recent payment history from PayLink events on Celo
- No backend or indexer required

## Slide 6
- MiniPay user flow
- Open the public PayLink profile in MiniPay
- Use walletless preview links only as a fallback before the live payment proof
- Payer does not need to create a PayLink account before paying
- Copy a prefilled payment request link from the dashboard when a fixed amount is needed
- Confirm the final HTTPS origin, recipient name, and handle before payment
- Review amount, token, and reference
- Keep the token label consistent between the wallet confirmation and PayLink receipt
- Keep the reference short enough to read in MiniPay and on the receipt
- Approve the token if prompted
- Send payment
- Return to the in-app PayLink receipt
- Open the matching Celo explorer transaction page
- Point out that both proof surfaces use the same transaction hash
- Share the PayLink receipt URL and Celo explorer transaction link as payment proof
- Reopen the receipt URL in a private tab to show it does not depend on wallet state
- Refresh the public profile to show the recent payment event

## Slide 7
- Product principles
- Direct wallet settlement
- Minimal setup
- Prefilled payment request links
- Shareable PayLink receipt proof
- Receipts link back to the recipient profile for repeat payments
- No payer PayLink account required
- Bilingual public payment flow for English and Brazilian Portuguese reviewers
- No platform custody

## Slide 8
- Next steps
- Reusable MiniPay PayLink QR codes that open the recipient's public profile for in-person repeat payments
- Saved PayLink receipt links with matching Celo explorer proof for client bookkeeping
- Lightweight invoice templates for repeat client requests
- Merchant-specific suggested amount presets for faster payment request links
