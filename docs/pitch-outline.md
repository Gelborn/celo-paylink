# Pitch Outline

## Slide 1
- MiniPay PayLink
- A public stablecoin payment profile for freelancers, creators, and solo merchants

## Slide 2
- Problem
- Small creators, freelancers, and solo merchants need a public payment profile that feels native to MiniPay
- Copying and pasting wallet addresses makes small repeat payments harder to trust
- Payment requests that lose amount, token, or reference details make wallet handoff harder to review
- Wallet transfers without clear references are harder to reconcile with client requests
- Screenshots alone are weak payment proof without a receipt URL and matching Celo explorer transaction

## Slide 3
- Product
- Claim a handle, publish a profile, and get paid in stablecoins
- Reuse the same public profile or localized prefilled payment request URLs for repeat payments
- Prefill amount, token, and reference for one-off requests
- Share PayLink receipt URLs after confirmation as client-ready payment proof
- Reopen receipt URLs later without relying on the payer wallet session
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
- Use walletless preview URLs only as a fallback before the live payment proof
- Payer does not need to create a PayLink account before paying
- Copy a localized prefilled payment request URL from the dashboard when a fixed amount is needed
- Confirm the final HTTPS origin, recipient name, and handle before payment
- Review amount, token, and reference
- Use a low-value live amount for judge payments so proof stays verifiable without unnecessary risk
- Keep the token label consistent between the wallet confirmation and PayLink receipt
- Keep the reference short enough to read in MiniPay and on the receipt
- Approve the token if prompted
- Send payment
- Return to the in-app PayLink receipt
- Open the matching Celo explorer transaction page
- Point out that the PayLink receipt and Celo explorer transaction link use the same transaction hash
- Share the PayLink receipt URL and Celo explorer transaction link as payment proof
- Reopen the PayLink receipt URL in a private tab to show it does not depend on wallet state
- Refresh the public profile to show the recent payment event

## Slide 7
- Product principles
- Direct wallet settlement
- Minimal setup
- Localized prefilled payment request URLs
- Shareable, reopenable PayLink receipt URLs
- Receipts link back to the recipient profile for repeat payments
- No payer PayLink account required
- Bilingual public payment flow for English and Brazilian Portuguese payers and reviewers
- No platform custody

## Slide 8
- Next steps
- Reusable MiniPay PayLink QR codes that open the recipient's public profile for in-person repeat payments
- Saved PayLink receipt URLs with matching Celo explorer transaction links for client bookkeeping
- Lightweight invoice templates that embed localized prefilled payment request URLs for repeat client requests
- Merchant-specific suggested amount presets for faster payment request URLs
