# Pitch Outline

## Slide 1
- MiniPay PayLink
- A public stablecoin payment profile for freelancers, creators, and solo merchants

## Slide 2
- Problem
- Small creators, freelancers, and solo merchants need a public payment profile that feels native to MiniPay
- Copying and pasting wallet addresses makes small repeat payments harder to trust
- Wallet transfers without clear references are harder to match back to client requests

## Slide 3
- Product
- Claim a handle, publish a profile, and get paid in stablecoins
- Reuse the same public profile or prefilled request links for repeat payments
- Prefill amount, token, and reference for one-off requests
- Support English and Brazilian Portuguese in the same flow

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
- Payment history from PayLink events
- No backend or indexer required

## Slide 6
- MiniPay user flow
- Open the public PayLink in MiniPay
- Payer does not need to create a PayLink account before paying
- Copy a prefilled request link from the dashboard when a fixed amount is needed
- Confirm the final HTTPS origin and handle before payment
- Review amount, token, and reference
- Keep the reference short enough to read in MiniPay and on the receipt
- Approve the token if prompted
- Send payment
- Return to the in-app PayLink receipt
- Open the matching Celo explorer transaction receipt
- Point out that both proof surfaces use the same transaction hash
- Share the PayLink receipt URL as proof
- Refresh the public profile to show the recent payment event

## Slide 7
- Product principles
- Direct wallet settlement
- Minimal setup
- Prefilled request links
- Shareable PayLink receipt proof
- Receipts link back to the recipient profile for repeat payments
- No payer PayLink account required
- No platform custody

## Slide 8
- Next steps
- Shareable MiniPay PayLink QR codes that open the recipient's public profile for in-person payments
- Saved PayLink receipt links with matching explorer proof for client bookkeeping
- Lightweight invoice templates for repeat client requests
- Merchant-specific suggested amount presets for faster request links
