# Demo Script

Target length: 90 seconds for judging or quick product review.
Keep setup under 30 seconds so the live wallet confirmation, receipt, and explorer proof stay readable.

Set the app language before recording so the narration, screenshots, and visible copy stay in the same locale.

For walletless review, use `/u/demo-paylink?amount=5&ref=coffee&token=USDC&preview=1` to show the public profile payment page before the live MiniPay walkthrough.
Keep the README's matching preview receipt URL ready if you need to show the receipt state without a wallet.
When showing either preview URL on a phone, open the paths on the `npm run dev:mobile` network host instead of `localhost`.
Use the same amount, token, and reference values in the preview fallback and live wallet walkthrough so reviewers can compare both states quickly.
Keep the live reference short so it stays legible in the wallet and receipt screens.
Use a neutral reference such as `coffee` or `demo` so client names do not appear in wallet or receipt footage.

During the live wallet walkthrough, call out that payments settle directly to the recipient wallet with no platform custody.
Use a real created handle for the live wallet walkthrough; keep `demo-paylink` for preview-only fallback URLs.
Name the recipient handle and payer wallet consistently so reviewers can follow the two-wallet flow.

Before the live wallet walkthrough, confirm the payer wallet has enough of the selected token for the requested amount and a little CELO for network fees.
Confirm MiniPay is on the target Celo network before opening the live request link.
Confirm the recipient profile is already saved before starting the timer so setup does not crowd the live wallet walkthrough.

Keep the MiniPay phone unlocked on the public profile payment page before starting the 90-second timer.
Keep the final request link open in a second tab in case the MiniPay phone needs a quick reload.
Keep the public profile and PayLink receipt URLs visible long enough for reviewers to read the shared origin and handle.
Keep the browser address bar visible when showing final URLs so the deployed origin is readable.
Turn on Do Not Disturb so notification banners do not cover wallet confirmations.
Disable auto-lock on the phone so it does not sleep mid-flow.

Close unrelated browser tabs and dismiss wallet notifications before recording so the live wallet walkthrough stays focused.
Keep wallet account and network switchers closed unless you need to explain the two-wallet setup.
Keep private keys, seed phrases, and deployment env files out of the recording.
Wait for prepared pages to finish loading before recording so profile and receipt details are visible from the first frame.
Open both prepared preview URLs once before recording so local Next.js routes are warm when the camera starts.
Keep browser zoom at 100% in both preview and live tabs so the wallet handoff, receipt, and explorer proof stay readable.

If the live wallet connection stalls during judging, switch to the preview link and narrate where the live confirmation would happen.
If you use a browser-wallet fallback, keep the same request link so the amount, token, and reference stay aligned with the MiniPay path.
If the Celo explorer is slow during judging, keep the PayLink receipt visible and point out that the explorer link uses the same transaction hash.

1. Open the landing page and explain PayLink in one sentence.
2. Open `/my`, connect with MiniPay, and create or update the payment profile.
3. Show the saved handle and copy the public profile link.
   Pause on the copied link long enough to make the public profile URL format clear.
4. Open the copied public `/u/[handle]` link so the final origin is visible.
5. Pick a token, choose a preset amount, and add a short reference.
   Pause on the selected token label before sending so the currency is clear in the recording.
   Name the target Celo network before sending so the wallet confirmation has context.
   Say that the reference carries through to the receipt and recent payment history.
6. Approve the token if needed.
   If the wallet shows a separate approval prompt, call it out before the payment confirmation.
7. Send the payment and wait for confirmation.
   Keep the wallet confirmation visible briefly so the amount and token are legible.
   Wait for PayLink to return to the success receipt before stopping the recording.
8. Show the success page and matching Celo explorer transaction link.
   Mention the amount, token, reference, and handle shown on the receipt.
   Pause on the PayLink receipt URL briefly before opening the explorer so the final origin is visible.
   Call out that the PayLink receipt and explorer proof use the same transaction hash before switching views.
   Keep the Celo explorer receipt visible long enough to make the Celo transaction proof clear.
   Copy the PayLink receipt URL after the live wallet walkthrough for the final submission notes.
   Reopen the copied PayLink receipt URL once so the final proof is not tied to the active wallet session.
   Label the copied PayLink receipt URL separately from the explorer transaction link in the final submission notes.
9. Refresh the public profile and show the recent payment from PayLink activity on Celo.
