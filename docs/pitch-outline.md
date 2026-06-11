# Pitch Outline

## Slide 1
- MiniPay PayLink
- A public stablecoin payment profile for freelancers and solo merchants

## Slide 2
- Problem
- Small creators and freelancers need a public payment profile that feels native to MiniPay
- Wallet-address copy/paste makes small repeat payments harder to trust

## Slide 3
- Product
- Claim a handle, publish a profile, get paid in stablecoins
- Reuse the same public profile or prefilled request links for repeat payments
- Prefill amount, token, and reference for specific requests
- Support English and Brazilian Portuguese from the same flow

## Slide 4
- Why Celo
- MiniPay mobile distribution
- Stablecoin payment UX
- Low transaction costs for small payments

## Slide 5
- Onchain design
- Verified PayLinkProfile contract
- Direct stablecoin forwarding
- No custody; payments settle directly to the recipient wallet
- Event-based payment history
- No backend or indexer required

## Slide 6
- MiniPay user flow
- Open the PayLink in MiniPay
- Review amount, token, and reference
- Approve token if prompted
- Send payment
- Return to the in-app PayLink receipt
- Open the Celo explorer transaction receipt
- Point out that both proof surfaces use the same transaction hash
- Share the PayLink receipt URL as fallback proof
- Refresh the public profile to show the recent payment event

## Slide 7
- Product principles
- Direct payments
- Minimal setup
- Prefilled request links
- Shareable PayLink receipt proof
- No payer PayLink account required
- No custody

## Slide 8
- Next steps
- Shareable PayLink QR codes for in-person payments
- Saved PayLink receipt links with explorer proof for client bookkeeping
- Lightweight invoice templates
- Merchant-specific suggested amount presets for faster request links
