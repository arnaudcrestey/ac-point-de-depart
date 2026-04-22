"use client";

import { FormEvent, useMemo, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { options, requiredFields, type PointDeDepartPayload } from "@/lib/point-de-depart";

const sectionFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

type Status = "idle" | "loading" | "success" | "error";

const initialValues: PointDeDepartPayload = {
  activite: "",
  anciennete: "",
  cible: "",
  valeur: "",
  revenusPrincipaux: "",
  elementsExistants: [],
  liensPrincipaux: "",
  acquisitionClients: "",
  offreClaire: "",
  resumeSituation: "",
  raisonMaintenant: "",
  objectifPrincipal: "",
  resultatAttendu: "",
  impactSiReussi: "",
  activiteComprise: "",
  principalDecalage: "",
  perceptionSouhaitee: [],
  aEviterEnImage: "",
  identiteExistante: "",
  orientationIdentite: "",
  references: "",
  ceQuiPlaitReferences: "",
  inquietudes: "",
  mauvaiseExperience: "",
  quoiEviterCetteFois: "",
  aEviterAbsolument: "",
  budget: "",
  contrainteDelai: "",
  implication: "",
  elementsImportants: "",
};

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor?: string;
  children: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 block text-[0.95rem] font-medium leading-6 text-slate-800"
    >
      {children}
      {required ? <span className="ml-1 text-slate-400">*</span> : null}
    </label>
  );
}

function SectionCard({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.6rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
      <div className="mb-7">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-slate-400">
          {String(index).padStart(2, "0")}
        </p>
        <h2
          className={`${sectionFont.className} mt-2 text-[1.8rem] font-semibold leading-none tracking-[-0.02em] text-slate-900`}
        >
          {title}
        </h2>
        <div className="mt-4 h-px w-16 bg-slate-200" />
      </div>

      {children}
    </section>
  );
}

const fieldClassName =
  "w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-[0.98rem] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

const textareaClassName =
  "w-full rounded-xl border border-slate-300/90 bg-white px-4 py-3 text-[0.98rem] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200";

export function PointDeDepartForm() {
  const [form, setForm] = useState<PointDeDepartPayload>(initialValues);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const missingRequired = useMemo(
    () => requiredFields.some((field) => !String(form[field] ?? "").trim()),
    [form],
  );

  const updateField = <K extends keyof PointDeDepartPayload>(
    key: K,
    value: PointDeDepartPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMultiValue = (
    key: "elementsExistants" | "perceptionSouhaitee",
    value: string,
  ) => {
    setForm((prev) => {
      const currentValues = prev[key] as string[];
      const nextValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];

      return { ...prev, [key]: nextValues };
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (missingRequired) {
      setStatus("error");
      setErrorMessage("Merci de renseigner tous les champs requis.");
      return;
    }

    try {
      const response = await fetch("/api/point-de-depart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Une erreur est survenue lors de l’envoi du formulaire.");
      }

      setStatus("success");
      setForm(initialValues);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible d’envoyer le formulaire pour le moment.",
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <SectionCard index={1} title="Activité & contexte">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="activite" required>
              Quelle est votre activité aujourd’hui ?
            </FieldLabel>
            <input
              id="activite"
              required
              value={form.activite}
              onChange={(e) => updateField("activite", e.target.value)}
              className={fieldClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="anciennete" required>
              Depuis combien de temps exercez-vous cette activité ?
            </FieldLabel>
            <select
              id="anciennete"
              required
              value={form.anciennete}
              onChange={(e) => updateField("anciennete", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.anciennete.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="revenusPrincipaux" required>
              Votre activité est-elle aujourd’hui votre source principale de revenus ?
            </FieldLabel>
            <select
              id="revenusPrincipaux"
              required
              value={form.revenusPrincipaux}
              onChange={(e) => updateField("revenusPrincipaux", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.revenusPrincipaux.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="cible" required>
              À qui vous adressez-vous principalement ?
            </FieldLabel>
            <input
              id="cible"
              required
              value={form.cible}
              onChange={(e) => updateField("cible", e.target.value)}
              className={fieldClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="valeur" required>
              Comment décririez-vous votre valeur en une phrase ?
            </FieldLabel>
            <input
              id="valeur"
              required
              value={form.valeur}
              onChange={(e) => updateField("valeur", e.target.value)}
              className={fieldClassName}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard index={2} title="Situation actuelle">
        <div className="grid gap-5">
          <fieldset>
            <legend className="mb-3 text-[0.95rem] font-medium text-slate-800">
              Disposez-vous déjà d’éléments existants ?
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              {options.elementsExistants.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-[0.95rem] text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={form.elementsExistants.includes(item)}
                    onChange={() => toggleMultiValue("elementsExistants", item)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <FieldLabel htmlFor="liensPrincipaux">
              Si oui, pouvez-vous partager les liens principaux ?
            </FieldLabel>
            <textarea
              id="liensPrincipaux"
              rows={3}
              value={form.liensPrincipaux}
              onChange={(e) => updateField("liensPrincipaux", e.target.value)}
              className={textareaClassName}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="acquisitionClients">
                Aujourd’hui, comment viennent vos clients ?
              </FieldLabel>
              <input
                id="acquisitionClients"
                value={form.acquisitionClients}
                onChange={(e) => updateField("acquisitionClients", e.target.value)}
                className={fieldClassName}
              />
            </div>

            <div>
              <FieldLabel htmlFor="offreClaire">
                Avez-vous actuellement une offre claire et structurée ?
              </FieldLabel>
              <select
                id="offreClaire"
                value={form.offreClaire}
                onChange={(e) => updateField("offreClaire", e.target.value)}
                className={fieldClassName}
              >
                <option value="">Sélectionnez</option>
                {options.offreClaire.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="resumeSituation">
              Si vous deviez résumer votre situation actuelle :
            </FieldLabel>
            <select
              id="resumeSituation"
              value={form.resumeSituation}
              onChange={(e) => updateField("resumeSituation", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.resumeSituation.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </SectionCard>

      <SectionCard index={3} title="Objectif du projet">
        <div className="grid gap-5">
          <div>
            <FieldLabel htmlFor="raisonMaintenant" required>
              Pourquoi avez-vous décidé de lancer ce projet maintenant ?
            </FieldLabel>
            <textarea
              id="raisonMaintenant"
              required
              rows={4}
              value={form.raisonMaintenant}
              onChange={(e) => updateField("raisonMaintenant", e.target.value)}
              className={textareaClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="objectifPrincipal" required>
              Quel est l’objectif principal du projet ?
            </FieldLabel>
            <select
              id="objectifPrincipal"
              required
              value={form.objectifPrincipal}
              onChange={(e) => updateField("objectifPrincipal", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.objectifPrincipal.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="resultatAttendu" required>
              Concrètement, qu’attendez-vous comme résultat ?
            </FieldLabel>
            <textarea
              id="resultatAttendu"
              required
              rows={4}
              value={form.resultatAttendu}
              onChange={(e) => updateField("resultatAttendu", e.target.value)}
              className={textareaClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="impactSiReussi">
              Si ce projet fonctionne parfaitement, qu’est-ce que cela change pour vous ?
            </FieldLabel>
            <textarea
              id="impactSiReussi"
              rows={4}
              value={form.impactSiReussi}
              onChange={(e) => updateField("impactSiReussi", e.target.value)}
              className={textareaClassName}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard index={4} title="Positionnement & perception">
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="activiteComprise">
                Aujourd’hui, pensez-vous que votre activité est bien comprise ?
              </FieldLabel>
              <select
                id="activiteComprise"
                value={form.activiteComprise}
                onChange={(e) => updateField("activiteComprise", e.target.value)}
                className={fieldClassName}
              >
                <option value="">Sélectionnez</option>
                {options.activiteComprise.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel htmlFor="principalDecalage">
                Selon vous, où se situe le principal décalage ?
              </FieldLabel>
              <select
                id="principalDecalage"
                value={form.principalDecalage}
                onChange={(e) => updateField("principalDecalage", e.target.value)}
                className={fieldClassName}
              >
                <option value="">Sélectionnez</option>
                {options.principalDecalage.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-[0.95rem] font-medium text-slate-800">
              Comment souhaitez-vous être perçu(e) ?
            </legend>

            <div className="grid gap-3 sm:grid-cols-2">
              {options.perceptionSouhaitee.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-[0.95rem] text-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={form.perceptionSouhaitee.includes(item)}
                    onChange={() => toggleMultiValue("perceptionSouhaitee", item)}
                    className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <FieldLabel htmlFor="aEviterEnImage">
              Y a-t-il des choses que vous ne voulez surtout pas renvoyer ?
            </FieldLabel>
            <textarea
              id="aEviterEnImage"
              rows={3}
              value={form.aEviterEnImage}
              onChange={(e) => updateField("aEviterEnImage", e.target.value)}
              className={textareaClassName}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard index={5} title="Univers & références">
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="identiteExistante">
                Avez-vous déjà une identité visuelle ou un univers existant ?
              </FieldLabel>
              <select
                id="identiteExistante"
                value={form.identiteExistante}
                onChange={(e) => updateField("identiteExistante", e.target.value)}
                className={fieldClassName}
              >
                <option value="">Sélectionnez</option>
                {options.identiteExistante.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <FieldLabel htmlFor="orientationIdentite">
                Si oui, souhaitez-vous :
              </FieldLabel>
              <select
                id="orientationIdentite"
                value={form.orientationIdentite}
                onChange={(e) => updateField("orientationIdentite", e.target.value)}
                className={fieldClassName}
              >
                <option value="">Sélectionnez</option>
                {options.orientationIdentite.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="references">
              Pouvez-vous partager 1 à 3 références que vous appréciez ?
            </FieldLabel>
            <textarea
              id="references"
              rows={3}
              value={form.references}
              onChange={(e) => updateField("references", e.target.value)}
              className={textareaClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="ceQuiPlaitReferences">
              Qu’est-ce qui vous plaît dans ces références ?
            </FieldLabel>
            <textarea
              id="ceQuiPlaitReferences"
              rows={3}
              value={form.ceQuiPlaitReferences}
              onChange={(e) => updateField("ceQuiPlaitReferences", e.target.value)}
              className={textareaClassName}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard index={6} title="Freins & inquiétudes">
        <div className="grid gap-5">
          <div>
            <FieldLabel htmlFor="inquietudes">
              Y a-t-il des points qui vous inquiètent dans ce projet ?
            </FieldLabel>
            <textarea
              id="inquietudes"
              rows={3}
              value={form.inquietudes}
              onChange={(e) => updateField("inquietudes", e.target.value)}
              className={textareaClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="mauvaiseExperience">
              Avez-vous déjà eu une mauvaise expérience sur ce type de sujet ?
            </FieldLabel>
            <select
              id="mauvaiseExperience"
              value={form.mauvaiseExperience}
              onChange={(e) => updateField("mauvaiseExperience", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.mauvaiseExperience.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="quoiEviterCetteFois">
              Si oui, qu’aimeriez-vous éviter cette fois-ci ?
            </FieldLabel>
            <textarea
              id="quoiEviterCetteFois"
              rows={3}
              value={form.quoiEviterCetteFois}
              onChange={(e) => updateField("quoiEviterCetteFois", e.target.value)}
              className={textareaClassName}
            />
          </div>

          <div>
            <FieldLabel htmlFor="aEviterAbsolument">
              Qu’aimeriez-vous éviter absolument ?
            </FieldLabel>
            <textarea
              id="aEviterAbsolument"
              rows={3}
              value={form.aEviterAbsolument}
              onChange={(e) => updateField("aEviterAbsolument", e.target.value)}
              className={textareaClassName}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard index={7} title="Cadre du projet">
        <div className="grid gap-5">
          <div>
            <FieldLabel htmlFor="budget">
              Quel niveau d’investissement avez-vous prévu pour ce projet ?
            </FieldLabel>
            <select
              id="budget"
              value={form.budget}
              onChange={(e) => updateField("budget", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.budget.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="contrainteDelai">
              Avez-vous une contrainte de délai ?
            </FieldLabel>
            <select
              id="contrainteDelai"
              value={form.contrainteDelai}
              onChange={(e) => updateField("contrainteDelai", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.contrainteDelai.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="implication">
              Quel sera votre niveau d’implication ?
            </FieldLabel>
            <select
              id="implication"
              value={form.implication}
              onChange={(e) => updateField("implication", e.target.value)}
              className={fieldClassName}
            >
              <option value="">Sélectionnez</option>
              {options.implication.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <FieldLabel htmlFor="elementsImportants">
              Y a-t-il des éléments importants à ajouter ?
            </FieldLabel>
            <textarea
              id="elementsImportants"
              rows={4}
              value={form.elementsImportants}
              onChange={(e) => updateField("elementsImportants", e.target.value)}
              className={textareaClassName}
            />
          </div>
        </div>
      </SectionCard>

      <section className="rounded-[1.6rem] border border-slate-200/80 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
        <p className="max-w-2xl text-[0.98rem] leading-8 text-slate-600">
          Une fois ce formulaire envoyé, je pourrai cadrer le projet sur des bases plus claires,
          avec moins d’allers-retours inutiles.
        </p>

        {status === "success" ? (
          <p
            className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm leading-7 text-emerald-800"
            role="status"
          >
            Merci. Votre formulaire a bien été transmis. Il va me permettre de cadrer le
            projet sur des bases claires avant le démarrage.
          </p>
        ) : null}

        {status === "error" ? (
          <p
            className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm leading-7 text-rose-700"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#0f2340] px-8 py-3.5 text-sm font-medium text-white transition hover:bg-[#162b49] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Envoi en cours..." : "Envoyer le formulaire"}
        </button>
      </section>
    </form>
  );
}
