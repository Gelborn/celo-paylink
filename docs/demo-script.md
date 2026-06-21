# Demo Script

Target length: 90 seconds for judging or a quick product review.
Keep setup under 30 seconds so the live wallet confirmation, receipt, and Celo explorer transaction page stay readable.

Set the app language with the visible language switcher before recording and keep it unchanged so the narration, screenshots, and visible copy stay in the same locale.
Disable automatic browser translation before recording so the English and Brazilian Portuguese copy stays intentional.
When recording both locales, reuse the same profile, amount, token, and reference values so reviewers can compare the English and Brazilian Portuguese flows directly.

For walletless review, use `/u/demo-paylink?amount=5&ref=coffee&token=USDC&preview=1` to show the public profile payment page before the live MiniPay walkthrough.
Keep the README's matching local preview receipt URL ready if you need to show the receipt state without connecting a wallet.
Describe walletless preview receipts as UI review only, not as proof of live settlement.
When showing either preview URL on a phone, open the paths on the `npm run dev:mobile` network host instead of `localhost`.
Keep the same query string when swapping hosts so amount, token, reference, and preview mode still match.
Use the same amount, token, and reference values in the walletless preview fallback and live wallet walkthrough so reviewers can compare both states quickly.
Keep the live reference short so it stays legible in the wallet and receipt screens.
Use a neutral reference such as `coffee` or `demo` so client names do not appear in wallet confirmations, receipts, or screenshots.

During the live wallet walkthrough, call out that payments settle directly to the recipient wallet with no platform custody.
Use a real created handle for the live wallet walkthrough; keep `demo-paylink` for preview-only fallback URLs.
Name the recipient handle and payer wallet consistently so reviewers can follow the two-wallet flow.

Before the live wallet walkthrough, confirm the payer wallet has enough of the selected token for the requested amount and a little CELO for network fees.
Confirm the payer MiniPay wallet is on the target Celo network before opening the live payment request URL.
Use the same network name again when showing the Celo explorer transaction link so reviewers can match the wallet and receipt context.
Keep the same payer wallet selected through approval and send prompts so the recorded wallet identity stays consistent.
Confirm the recipient profile is already saved before starting the timer so setup does not crowd the live wallet walkthrough.

Keep the payer MiniPay phone unlocked on the public profile payment page before starting the 90-second timer.
Keep the same final HTTPS localized prefilled payment request URL open in a second tab in case the payer MiniPay phone needs a quick reload.
Keep a notes tab ready for the live PayLink receipt and Celo explorer transaction links so the reviewer handoff is immediate after confirmation.
If using a QR code in the recording, scan it with the payer phone once before starting the timer.
Label the QR code as a public profile or localized prefilled payment request so reviewers know what should open on the phone.
Keep the public profile URL, localized prefilled payment request URL, and PayLink receipt URL visible long enough for reviewers to read the shared origin, handle, and receipt path.
Show the final URLs without shorteners so reviewers can see the deployed origin and PayLink path directly.
Keep the browser address bar visible when showing final URLs so the deployed origin is readable.
If showing profile search, use a known published handle so the result opens immediately during the timed demo.
Turn on Do Not Disturb on the payer phone so notification banners do not cover wallet confirmations.
Disable auto-lock on the payer phone so it does not sleep mid-flow.
Set the payer phone brightness high enough that wallet confirmation text stays readable on camera.
Keep the payer phone in portrait orientation so MiniPay prompts do not rotate mid-recording.

Close unrelated browser tabs and dismiss wallet notifications before recording so the live wallet walkthrough stays focused.
Dismiss browser autofill and password manager popovers before recording so they do not cover payment fields.
Keep wallet account and network switchers closed unless you need to explain the two-wallet setup.
Keep private keys, seed phrases, and deployment env files out of the recording.
Wait for prepared pages to finish loading before recording so profile and receipt details are visible from the first frame.
Open the prepared payment and receipt preview URLs once before recording so local Next.js routes and images are warm when the camera starts.
Keep browser zoom at 100% in preview, live, and explorer tabs so the wallet handoff, receipt, and Celo explorer transaction page stay readable.

If the live wallet confirmation stalls during judging, switch to the walletless preview link and narrate where the live confirmation would happen.
If you use a browser-wallet fallback, keep the same localized prefilled payment request URL so the amount, token, and reference stay aligned with the MiniPay path.
After any browser-wallet network switch, re-check the amount, token, and reference on PayLink before approving.
If the Celo explorer is slow during judging, keep the PayLink receipt visible and point out that the explorer link uses the same transaction hash.

1. Open the landing page and explain PayLink as a no-custody MiniPay profile in one sentence.
2. Open `/my`, connect with the recipient wallet in MiniPay, and create or update the payment profile.
3. Show the saved handle and copy the public profile URL.
   Pause on the dashboard until the saved handle and preferred token are both visible.
   Pause on the copied URL long enough to make the final origin and handle clear.
4. Open the copied public `/u/[handle]` link on the payer device so the final origin is visible.
   Pause on the profile header until the recipient name and handle are readable.
   Say that the payer only needs a compatible wallet and does not create a PayLink account.
5. Pick a token, choose a preset amount, and add a short reference.
   Pause on the selected token label before sending so the currency is clear in the recording.
   Use the same token symbol spelling in narration and final notes so it matches the wallet and receipt labels.
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
   Call out that the PayLink receipt and Celo explorer transaction link use the same transaction hash before switching views.
   Keep the Celo explorer transaction page visible long enough to make the Celo transaction details clear.
   Copy the PayLink receipt URL after the live wallet walkthrough for the final submission notes.
   Reopen the copied PayLink receipt URL once so the final proof is not tied to the active wallet session.
   Keep the reloaded receipt visible long enough to show the amount, token, reference, and handle still match.
   Paste the copied receipt URL into a fresh private tab once before submitting so reviewers see the same proof without wallet state.
   Label the copied PayLink receipt URL separately from the Celo explorer transaction link in the final submission notes.
9. Refresh the public profile after the success receipt and show the recent payment from PayLink activity on Celo.
