import { Cormorant_Garamond } from "next/font/google";
import { PointDeDepartForm } from "@/components/point-de-depart-form";

const signatureFont = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function PointDeDepartPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-12 text-center">
          <div className="mx-auto max-w-sm">
            <p className={`${signatureFont.className} text-6xl font-medium leading-none text-slate-800 sm:text-7xl`}>AC</p>
            <p className="mt-2 text-sm tracking-[0.25em] text-slate-600">arnaudcrestey.com</p>
            <div className="mx-auto mt-6 h-px w-28 bg-slate-300" />
          </div>
        </header>

        <section className="mb-10">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Point de départ du projet
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-700">
            Ce document va me permettre de poser une base claire avant de démarrer. L’objectif n’est pas
            de vous demander un travail technique, mais de mieux comprendre votre activité, votre situation
            et la direction à donner au projet. Prenez simplement le temps de répondre avec vos mots. Des
            réponses courtes suffisent.
          </p>
        </section>

        <PointDeDepartForm />
      </div>
    </main>
  );
}
