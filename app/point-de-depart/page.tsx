import { Cormorant_Garamond } from "next/font/google";
import { PointDeDepartForm } from "@/components/point-de-depart-form";

const signatureFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function PointDeDepartPage() {
  return (
    <main className="min-h-screen bg-[#edf1f8] px-4 py-8 text-slate-900 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-16 text-center sm:mb-20">
          <div className="mx-auto flex max-w-md flex-col items-center">
            <div
              className={`${signatureFont.className} select-none text-[4.4rem] font-semibold leading-none tracking-[-0.09em] text-[#0d2345] sm:text-[5.8rem]`}
              aria-label="SYSTIA"
            >
              SYSTIA
            </div>

            <p
              className={`${signatureFont.className} mt-2 text-center text-[1.15rem] font-medium tracking-[-0.03em] text-[#15294a] sm:text-[1.45rem]`}
            >
              Conception de systèmes d’activité
            </p>

            <div className="mt-6 h-px w-24 bg-[#cfd7e7]" />
          </div>
        </header>

        <section className="mx-auto mb-10 max-w-3xl text-left sm:mb-12">
          <h1
            className={`${signatureFont.className} text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-[#112347] sm:text-[4rem]`}
          >
            Point de départ du projet
          </h1>

          <div className="mt-6 space-y-5 text-[1.05rem] leading-9 text-slate-600 sm:text-[1.12rem]">
            <p>
              Ce document va me permettre de poser une base claire avant de
              démarrer.
            </p>

            <p>
              L’objectif n’est pas de vous demander un travail technique, mais
              de mieux comprendre votre activité, votre situation et la
              direction à donner au projet.
            </p>

            <p>
              Prenez simplement le temps de répondre avec vos mots. Des réponses
              courtes suffisent.
            </p>
          </div>
        </section>

        <PointDeDepartForm />
      </div>
    </main>
  );
}
