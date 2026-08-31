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
  offresPrincipales?: string;
  offrePrioritaire?: string;
  elementsExistants: string[];
  liensPrincipaux?: string;
  acquisitionClients?: string;
  premiereActionClient?: string;
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
  elementsATransmettre?: string;
  inquietudes?: string;
  mauvaiseExperience?: string;
  quoiEviterCetteFois?: string;
  aEviterAbsolument?: string;
  budget?: string;
  contrainteDelai?: string;
  implication?: string;
  decideurs?: string;
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
