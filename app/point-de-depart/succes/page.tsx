export default function Page() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eef2f7_0%,#f6f8fc_45%,#eef1f8_100%)] px-6 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <section className="w-full rounded-[2rem] border border-white/70 bg-white/72 p-8 text-center shadow-[0_18px_50px_rgba(76,93,135,0.08)] backdrop-blur-[6px] sm:p-12 md:p-14">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#3b82f6_0%,#2563eb_100%)] text-2xl text-white shadow-[0_18px_40px_rgba(37,99,235,0.28)]">
            ✓
          </div>

          <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-[#7b8db8]">
            Formulaire transmis
          </p>

          <h1 className="text-[2rem] font-semibold tracking-[-0.03em] text-[#1a2740] sm:text-[2.4rem]">
            Merci
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[1.02rem] leading-8 text-slate-600 sm:text-[1.06rem]">
            Votre formulaire a bien été transmis.
          </p>

          <p className="mx-auto mt-3 max-w-2xl text-[1.02rem] leading-8 text-slate-600 sm:text-[1.06rem]">
            Je vais maintenant m’appuyer sur vos réponses pour cadrer le projet de façon claire, structurée et pertinente.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="/point-de-depart"
              className="inline-flex min-w-[220px] items-center justify-center rounded-2xl border border-[#d7deee] bg-white px-8 py-4 text-base font-medium text-[#1a2740] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c7d3eb] hover:shadow-[0_14px_30px_rgba(76,93,135,0.10)]"
            >
              Revenir au formulaire
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
