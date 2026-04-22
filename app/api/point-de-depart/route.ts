import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { options, requiredFields, type PointDeDepartPayload } from "@/lib/point-de-depart";

const oneLine = (value?: string | string[]) => {
  if (Array.isArray(value)) return value.length ? value.join(", ") : "Non renseigné";
  return value?.trim() ? value.trim() : "Non renseigné";
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isAllowedValue = (value: string | undefined, allowed: readonly string[]) => !value || allowed.includes(value);

function validatePayload(payload: PointDeDepartPayload) {
  for (const field of requiredFields) {
    if (!String(payload[field] ?? "").trim()) {
      return `Le champ requis "${field}" est manquant.`;
    }
  }

  const checks: Array<[string | undefined, readonly string[]]> = [
    [payload.anciennete, options.anciennete],
    [payload.revenusPrincipaux, options.revenusPrincipaux],
    [payload.offreClaire, options.offreClaire],
    [payload.resumeSituation, options.resumeSituation],
    [payload.objectifPrincipal, options.objectifPrincipal],
    [payload.activiteComprise, options.activiteComprise],
    [payload.principalDecalage, options.principalDecalage],
    [payload.identiteExistante, options.identiteExistante],
    [payload.orientationIdentite, options.orientationIdentite],
    [payload.mauvaiseExperience, options.mauvaiseExperience],
    [payload.budget, options.budget],
    [payload.contrainteDelai, options.contrainteDelai],
    [payload.implication, options.implication],
  ];

  if (!checks.every(([value, allowed]) => isAllowedValue(value, allowed))) {
    return "Une ou plusieurs valeurs de sélection sont invalides.";
  }

  if (
    !payload.elementsExistants.every((item) =>
      (options.elementsExistants as readonly string[]).includes(item),
    )
  ) {
    return "Les éléments existants contiennent une valeur invalide.";
  }

  if (
    !payload.perceptionSouhaitee.every((item) =>
      (options.perceptionSouhaitee as readonly string[]).includes(item),
    )
  ) {
    return "La perception souhaitée contient une valeur invalide.";
  }

  return null;
}

function sectionHtml(title: string, rows: Array<[string, string | string[] | undefined]>) {
  return `
  <section style="margin: 0 0 24px;">
    <h2 style="font-size:16px;margin:0 0 10px;color:#0f172a;">${escapeHtml(title)}</h2>
    <table style="width:100%;border-collapse:collapse;">
      ${rows
        .map(
          ([label, value]) => `
          <tr>
            <td style="vertical-align:top;padding:8px 0;width:230px;color:#475569;font-weight:600;">${escapeHtml(
              label,
            )}</td>
            <td style="vertical-align:top;padding:8px 0;color:#0f172a;">${escapeHtml(oneLine(value))}</td>
          </tr>`,
        )
        .join("")}
    </table>
  </section>`;
}

function buildHtmlEmail(data: PointDeDepartPayload) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;line-height:1.55;color:#0f172a;max-width:760px;margin:0 auto;padding:24px;background:#f8fafc;">
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:28px;">
      <p style="margin:0 0 18px;color:#334155;">Nouveau formulaire reçu depuis la page <strong>/point-de-depart</strong>.</p>
      ${sectionHtml("Activité & contexte", [
        ["Activité", data.activite],
        ["Ancienneté", data.anciennete],
        ["Cible", data.cible],
        ["Valeur", data.valeur],
        ["Source principale de revenus", data.revenusPrincipaux],
      ])}
      ${sectionHtml("Situation actuelle", [
        ["Éléments existants", data.elementsExistants],
        ["Liens principaux", data.liensPrincipaux],
        ["Acquisition clients", data.acquisitionClients],
        ["Offre claire", data.offreClaire],
        ["Résumé situation", data.resumeSituation],
      ])}
      ${sectionHtml("Objectif du projet", [
        ["Pourquoi maintenant", data.raisonMaintenant],
        ["Objectif principal", data.objectifPrincipal],
        ["Résultat attendu", data.resultatAttendu],
        ["Impact si réussi", data.impactSiReussi],
      ])}
      ${sectionHtml("Positionnement & perception", [
        ["Activité bien comprise", data.activiteComprise],
        ["Principal décalage", data.principalDecalage],
        ["Perception souhaitée", data.perceptionSouhaitee],
        ["À éviter dans l’image", data.aEviterEnImage],
      ])}
      ${sectionHtml("Univers & références", [
        ["Identité existante", data.identiteExistante],
        ["Orientation identité", data.orientationIdentite],
        ["Références", data.references],
        ["Ce qui plaît", data.ceQuiPlaitReferences],
      ])}
      ${sectionHtml("Freins & inquiétudes", [
        ["Inquiétudes", data.inquietudes],
        ["Mauvaise expérience", data.mauvaiseExperience],
        ["À éviter cette fois-ci", data.quoiEviterCetteFois],
        ["À éviter absolument", data.aEviterAbsolument],
      ])}
      ${sectionHtml("Cadre du projet", [
        ["Budget", data.budget],
        ["Contrainte délai", data.contrainteDelai],
        ["Implication", data.implication],
        ["Éléments importants", data.elementsImportants],
      ])}
    </div>
  </div>`;
}

function buildTextEmail(data: PointDeDepartPayload) {
  const blocks = [
    [
      "ACTIVITÉ & CONTEXTE",
      `- Activité : ${oneLine(data.activite)}`,
      `- Ancienneté : ${oneLine(data.anciennete)}`,
      `- Cible : ${oneLine(data.cible)}`,
      `- Valeur : ${oneLine(data.valeur)}`,
      `- Source principale de revenus : ${oneLine(data.revenusPrincipaux)}`,
    ],
    [
      "SITUATION ACTUELLE",
      `- Éléments existants : ${oneLine(data.elementsExistants)}`,
      `- Liens principaux : ${oneLine(data.liensPrincipaux)}`,
      `- Acquisition clients : ${oneLine(data.acquisitionClients)}`,
      `- Offre claire : ${oneLine(data.offreClaire)}`,
      `- Résumé situation : ${oneLine(data.resumeSituation)}`,
    ],
    [
      "OBJECTIF DU PROJET",
      `- Pourquoi maintenant : ${oneLine(data.raisonMaintenant)}`,
      `- Objectif principal : ${oneLine(data.objectifPrincipal)}`,
      `- Résultat attendu : ${oneLine(data.resultatAttendu)}`,
      `- Impact si réussi : ${oneLine(data.impactSiReussi)}`,
    ],
    [
      "POSITIONNEMENT & PERCEPTION",
      `- Activité bien comprise : ${oneLine(data.activiteComprise)}`,
      `- Principal décalage : ${oneLine(data.principalDecalage)}`,
      `- Perception souhaitée : ${oneLine(data.perceptionSouhaitee)}`,
      `- À éviter dans l’image : ${oneLine(data.aEviterEnImage)}`,
    ],
    [
      "UNIVERS & RÉFÉRENCES",
      `- Identité existante : ${oneLine(data.identiteExistante)}`,
      `- Orientation identité : ${oneLine(data.orientationIdentite)}`,
      `- Références : ${oneLine(data.references)}`,
      `- Ce qui plaît : ${oneLine(data.ceQuiPlaitReferences)}`,
    ],
    [
      "FREINS & INQUIÉTUDES",
      `- Inquiétudes : ${oneLine(data.inquietudes)}`,
      `- Mauvaise expérience : ${oneLine(data.mauvaiseExperience)}`,
      `- À éviter cette fois-ci : ${oneLine(data.quoiEviterCetteFois)}`,
      `- À éviter absolument : ${oneLine(data.aEviterAbsolument)}`,
    ],
    [
      "CADRE DU PROJET",
      `- Budget : ${oneLine(data.budget)}`,
      `- Contrainte délai : ${oneLine(data.contrainteDelai)}`,
      `- Implication : ${oneLine(data.implication)}`,
      `- Éléments importants : ${oneLine(data.elementsImportants)}`,
    ],
  ];

  return blocks.map((block) => block.join("\n")).join("\n\n");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PointDeDepartPayload;
    const validationError = validatePayload(body);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailTo = process.env.MAIL_TO || "demande@arnaudcrestey.com";
    const mailFrom = process.env.MAIL_FROM;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !mailFrom) {
      return NextResponse.json(
        { error: "Configuration email incomplète côté serveur." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: `Nouveau point de départ projet — ${body.activite}`,
      html: buildHtmlEmail(body),
      text: buildTextEmail(body),
      replyTo: mailFrom,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Impossible d’envoyer le formulaire pour le moment." },
      { status: 500 },
    );
  }
}
