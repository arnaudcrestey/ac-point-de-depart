export type PointDeDepartPayload = {
  prenom: string;
  nom: string;
  email: string;
  entreprise: string;
  activite: string;
  anciennete: string;
  cible: string;
  valeur: string;
  revenusPrincipaux: string;
  elementsExistants: string[];
  liensPrincipaux?: string;
  acquisitionClients?: string;
  offreClaire?: string;
  resumeSituation?: string;
  raisonMaintenant: string;
  objectifPrincipal: string;
  resultatAttendu: string;
  impactSiReussi?: string;
  activiteComprise?: string;
  principalDecalage?: string;
  perceptionSouhaitee: string[];
  aEviterEnImage?: string;
  identiteExistante?: string;
  orientationIdentite?: string;
  references?: string;
  ceQuiPlaitReferences?: string;
  inquietudes?: string;
  mauvaiseExperience?: string;
  quoiEviterCetteFois?: string;
  aEviterAbsolument?: string;
  budget?: string;
  contrainteDelai?: string;
  implication?: string;
  elementsImportants?: string;
};

export const options = {
  anciennete: ["En lancement", "Moins de 1 an", "1 à 3 ans", "Plus de 3 ans"],
  revenusPrincipaux: ["Oui", "Partiellement", "Non"],
  elementsExistants: [
    "Site internet",
    "Landing page",
    "Réseaux sociaux actifs",
    "Offre structurée",
    "Aucun pour le moment",
  ],
  offreClaire: ["Oui", "Partiellement", "Non"],
  resumeSituation: [
    "C’est clair mais ça ne convertit pas",
    "C’est flou dans la présentation",
    "Je ne sais pas vraiment par où commencer",
    "Autre",
  ],
  objectifPrincipal: [
    "Clarifier mon activité",
    "Mieux présenter mon offre",
    "Générer des demandes",
    "Structurer un système complet",
    "Autre",
  ],
  activiteComprise: ["Oui", "Partiellement", "Non"],
  principalDecalage: [
    "Dans le message",
    "Dans l’offre",
    "Dans la visibilité",
    "Dans la conversion",
    "Je ne sais pas",
  ],
  perceptionSouhaitee: [
    "Professionnel / crédible",
    "Accessible / humain",
    "Premium / haut de gamme",
    "Structuré / clair",
    "Autre",
  ],
  identiteExistante: ["Oui", "Partiellement", "Non"],
  orientationIdentite: ["Le conserver", "Le faire évoluer", "Repartir de zéro"],
  mauvaiseExperience: ["Oui", "Non"],
  budget: [
    "En cours de définition",
    "500 – 1 000 €",
    "1 000 – 3 000 €",
    "3 000 – 7 000 €",
    "Plus",
  ],
  contrainteDelai: ["Oui, court terme", "Oui, moyen terme", "Non"],
  implication: [
    "Je suis très disponible",
    "Je peux m’impliquer ponctuellement",
    "J’ai peu de disponibilité",
  ],
} as const;

export const requiredFields: Array<keyof PointDeDepartPayload> = [
  "prenom",
"nom",
"email",
  "activite",
  "anciennete",
  "cible",
  "valeur",
  "revenusPrincipaux",
  "raisonMaintenant",
  "objectifPrincipal",
  "resultatAttendu",
];
