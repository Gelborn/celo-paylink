# Demo Script

Target length: 90 seconds for judging or quick product review.

Set the app language before recording so the narration, screenshots, and visible copy stay in the same locale.

For walletless review, use `/u/demo-paylink?amount=5&ref=coffee&token=USDC&preview=1` to show the public pay page before the live MiniPay walkthrough.
Keep the matching `/success?...&preview=1` URL from the README ready if you need to show the receipt state without a wallet.
Use the same reference value in the preview fallback and live wallet pass so reviewers can compare both states quickly.
Keep the live reference short so it stays legible in the wallet and receipt screens.

During the live pass, call out that payments settle directly to the recipient wallet with no platform custody.
Use a real created handle for the live pass; keep `demo-paylink` for preview-only fallback URLs.

Before the live pass, confirm the demo wallet has enough of the selected token for the requested amount.

Keep the MiniPay phone unlocked on the pay link before starting the 90-second timer.
Turn on Do Not Disturb so notification banners do not cover wallet confirmations.

Close unrelated browser tabs and wallet notifications before recording so the live pass stays focused.
Keep browser zoom at 100% so the wallet handoff, receipt, and explorer proof stay readable.

If the wallet connection stalls during judging, switch to the preview link and narrate where the live confirmation would happen.

1. Open the landing page and explain PayLink in one sentence.
2. Open `/my`, connect with MiniPay, and create or update the payment profile.
3. Show the saved handle and copy the shareable pay link.
   Pause on the copied link long enough to make the reusable request format clear.
4. Open the public `/u/[handle]` page.
5. Pick a token, choose a preset amount, and add a short reference.
   Say that the reference carries through to the receipt and recent payment history.
6. Approve the token if needed.
7. Send the payment and wait for confirmation.
   Keep the wallet confirmation visible briefly so the amount and token are legible.
8. Show the success page and transaction link.
   Mention the amount, token, reference, and handle shown on the receipt.
   Keep the explorer receipt visible long enough to make the onchain proof clear.
9. Refresh the public card and show the recent payment event rendered from chain data.
