# Demo Script

Target length: 90 seconds for judging or quick product review.
Keep setup under 30 seconds so the live wallet confirmation, receipt, and explorer proof stay readable.

Set the app language before recording so the narration, screenshots, and visible copy stay in the same locale.

For walletless review, use `/u/demo-paylink?amount=5&ref=coffee&token=USDC&preview=1` to show the public profile payment page before the live MiniPay walkthrough.
Keep the matching `/success?...&preview=1` URL from the README ready if you need to show the receipt state without a wallet.
When showing either preview on a phone, open the paths on the `npm run dev:mobile` network host instead of `localhost`.
Use the same amount, token, and reference values in the preview fallback and live wallet pass so reviewers can compare both states quickly.
Keep the live reference short so it stays legible in the wallet and receipt screens.

During the live pass, call out that payments settle directly to the recipient wallet with no platform custody.
Use a real created handle for the live pass; keep `demo-paylink` for preview-only fallback URLs.
Name the recipient handle and payer wallet consistently so reviewers can follow the two-wallet flow.

Before the live pass, confirm the payer wallet has enough of the selected token for the requested amount and a little CELO for network fees.
Confirm the recipient profile is already saved before starting the timer so setup does not crowd the payment walkthrough.

Keep the MiniPay phone unlocked on the public profile payment page before starting the 90-second timer.
Keep the final request link open in a second tab in case the phone needs a quick reload.
Turn on Do Not Disturb so notification banners do not cover wallet confirmations.
Disable auto-lock on the phone so it does not sleep mid-flow.

Close unrelated browser tabs and dismiss wallet notifications before recording so the live pass stays focused.
Wait for prepared pages to finish loading before recording so profile and receipt details are visible from the first frame.
Open both prepared preview URLs once before recording so local Next.js routes are warm when the camera starts.
Keep browser zoom at 100% so the wallet handoff, receipt, and explorer proof stay readable.

If the wallet connection stalls during judging, switch to the preview link and narrate where the live confirmation would happen.
If the explorer is slow during recording, keep the PayLink receipt visible and point out that the explorer link uses the same transaction hash.

1. Open the landing page and explain PayLink in one sentence.
2. Open `/my`, connect with MiniPay, and create or update the payment profile.
3. Show the saved handle and copy the public profile link.
   Pause on the copied link long enough to make the public profile URL format clear.
4. Open the copied public `/u/[handle]` link so the final origin is visible.
5. Pick a token, choose a preset amount, and add a short reference.
   Say that the reference carries through to the receipt and recent payment history.
6. Approve the token if needed.
   If the wallet shows a separate approval prompt, call it out before the payment confirmation.
7. Send the payment and wait for confirmation.
   Keep the wallet confirmation visible briefly so the amount and token are legible.
   Wait for PayLink to return to the success receipt before stopping the recording.
8. Show the success page and Celo explorer transaction link.
   Mention the amount, token, reference, and handle shown on the receipt.
   Pause on the PayLink receipt URL briefly before opening the explorer so the final origin is visible.
   Keep the Celo explorer receipt visible long enough to make the onchain transaction proof clear.
   Copy the PayLink receipt URL after the live pass for the final submission notes.
   Label the copied PayLink receipt URL as fallback proof in the final submission notes.
9. Refresh the public profile and show the recent payment event rendered from chain data.
