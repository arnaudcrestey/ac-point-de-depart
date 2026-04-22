import { Cormorant_Garamond } from "next/font/google";
import { PointDeDepartForm } from "@/components/point-de-depart-form";

const signatureFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function PointDeDepartPage() {
  return (
    <main className="min-h-screen bg-[#f6f4ef] px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-16 text-center sm:mb-20">
          <div className="mx-auto flex max-w-sm flex-col items-center">
            <div
              className={`${signatureFont.className} select-none text-[4.4rem] font-medium leading-none tracking-[-0.08em] text-[#0f2340] sm:text-[5.2rem]`}
              aria-label="AC"
            >
              <span className="relative -mr-3 inline-block">A</span>
              <span className="relative inline-block">C</span>
            </div>

            <p
              className={`${signatureFont.className} mt-2 text-[1.05rem] font-medium tracking-[-0.025em] text-[#1a2740] sm:text-[1.2rem]`}
            >
              arnaudcrestey.com
            </p>

            <div className="mt-5 h-px w-24 bg-[#cfd5df]" />
          </div>
        </header>

        <section className="mb-10 sm:mb-12">
          <h1
            className={`${signatureFont.className} text-[2.2rem] font-semibold leading-tight tracking-[-0.03em] text-[#0f172a] sm:text-[2.9rem]`}
          >
            Point de départ du projet
          </h1>

          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-600 sm:text-[1.03rem]">
            Ce document va me permettre de poser une base claire avant de démarrer.
            L’objectif n’est pas de vous demander un travail technique, mais de mieux
            comprendre votre activité, votre situation et la direction à donner au projet.
            Prenez simplement le temps de répondre avec vos mots. Des réponses courtes
            suffisent.
          </p>
        </section>

        <PointDeDepartForm />
      </div>
    </main>
  );
}
