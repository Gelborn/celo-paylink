# Pitch Outline

## Slide 1
- MiniPay PayLink
- A no-custody public payment profile for Celo stablecoins, built for freelancers, creators, and solo merchants

## Slide 2
- Problem
- Small creators, freelancers, and solo merchants need a public, no-custody payment profile that feels native to MiniPay
- Copying and pasting wallet addresses makes small repeat payments harder to trust
- Payment requests that lose amount, token, or reference details make wallet handoff harder to review
- Wallet transfers without clear references are harder to reconcile with client requests
- Screenshot-only payment proof is harder to verify without a PayLink receipt URL and matching Celo explorer transaction link

## Slide 3
- Product
- Claim a handle, publish a profile, and get paid directly in Celo stablecoins
- Reuse the same public profile URL or localized PayLink prefilled payment request URLs for repeat payments
- Prefill amount, token, and reference for one-off requests
- Share PayLink receipt URLs after confirmation as client-ready payment proof
- Reopen PayLink receipt URLs later without relying on the payer wallet session
- Support English and Brazilian Portuguese across the same payment and receipt flow

## Slide 4
- Why Celo
- MiniPay mobile distribution on Celo
- Mobile-first stablecoin payment experience for phone-based payers
- Low transaction costs for low-value repeat payments where fees should not erase the payment

## Slide 5
- Onchain design
- Verified PayLinkProfile contract
- Stablecoins forward directly to the recipient
- No custody; payments settle directly to the recipient wallet
- Recent payment history from PayLink contract events on Celo
- No backend, server session, or separate indexer required

## Slide 6
- MiniPay user flow
- Open the public PayLink profile in MiniPay
- Use walletless preview URLs only as a fallback before the live payment proof
- Payer does not need to create a PayLink account before paying
- Copy a localized PayLink prefilled payment request URL from the dashboard when a fixed amount is needed
- Confirm the final HTTPS origin, recipient name, and handle before payment
- Review recipient handle, amount, token, and reference
- Use a low-value live amount for judge payments so proof stays verifiable without unnecessary risk
- Keep the token label consistent between the wallet confirmation, PayLink receipt page, and final submission notes
- Keep the reference short enough to read in MiniPay and on the PayLink receipt page
- Approve the token if prompted
- Send payment
- Return to the in-app PayLink receipt page
- Open the matching Celo explorer transaction page from the PayLink receipt
- Point out that the PayLink receipt URL and Celo explorer transaction link use the same transaction hash
- Share the PayLink receipt URL copied from the receipt page address bar and the matching Celo explorer transaction link as payment proof in the final submission notes
- Reopen the PayLink receipt URL in a private tab to show the receipt details and profile return path do not depend on the payer wallet session
- Refresh the public profile to show the matching recent PayLink contract event on that profile with the same amount, token, reference, and handle

## Slide 7
- Product principles
- Direct wallet settlement
- Minimal setup
- Localized PayLink prefilled payment request URLs
- Shareable, reopenable PayLink receipt URLs
- PayLink receipts link back to the recipient profile for repeat payments
- No payer PayLink account required
- Bilingual public payment flow for English and Brazilian Portuguese payers and reviewers
- No platform custody

## Slide 8
- Next steps
- Reusable MiniPay PayLink QR codes that open the recipient's public profile for in-person repeat payments
- Saved PayLink receipt URLs with matching Celo explorer transaction links for client bookkeeping
- Lightweight invoice templates that embed localized PayLink prefilled payment request URLs for repeat client billing
- Merchant-specific suggested amount presets for faster localized PayLink prefilled payment request URLs
