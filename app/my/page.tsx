import { Header } from "../../components/header";
import { ProfileForm } from "../../components/profile-form";

export default function MyPayLinkPage() {
  return (
    <main>
      <Header />
      <section className="mb-6">
        <span className="eyebrow">Creator setup</span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
          Publish the pay link you will actually use in MiniPay.
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:rgba(23,50,40,0.78)] md:text-base">
          This page writes directly to the PayLink contract. Use Celo Sepolia
          while testing, then switch the env and deploy to Celo mainnet for the
          final Proof of Ship submission.
        </p>
      </section>
      <ProfileForm />
    </main>
  );
}
