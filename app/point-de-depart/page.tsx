import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { PointDeDepartForm } from "@/components/point-de-depart-form";

const signatureFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function PointDeDepartPage() {
  return (
    <main className="min-h-screen bg-transparent px-4 py-8 text-slate-900 sm:px-6 sm:py-10 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-12 text-center sm:mb-16">
          <div className="mx-auto flex max-w-sm flex-col items-center">
            <Image
              src="/images/systia-logo.png"
              alt="SYSTIA"
              width={340}
              height={180}
              priority
              className="h-auto w-[220px] sm:w-[280px] lg:w-[320px]"
            />

            <div className="mt-5 h-px w-24 bg-[#cfd7e7]" />
          </div>
        </header>

        <section className="mx-auto mb-10 max-w-3xl text-left sm:mb-12">
          <h1
            className={`${signatureFont.className} text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#15233d] sm:text-[3.1rem]`}
          >
            Point de départ du projet
          </h1>

          <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-slate-600 sm:text-[1.04rem]">
            Ce document va me permettre de poser une base claire avant de
            démarrer. L’objectif n’est pas de vous demander un travail
            technique, mais de mieux comprendre votre activité, votre situation
            et la direction à donner au projet. Prenez simplement le temps de
            répondre avec vos mots. Des réponses courtes suffisent.
          </p>
        </section>

        <PointDeDepartForm />
      </div>
    </main>
  );
}
