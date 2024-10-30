const affiliation = [
  {
    parent: "Affiliation",
    path: "/insuree/families",
    title: "Liste des familles",
  },
  {
    parent: "Affiliation",
    path: "/insuree/insurees",
    title: "Liste des assurés",
  },
  {
    parent: "Affiliation",
    path: "/policy/policies",
    title: "Polices",
  },
  {
    parent: "Affiliation",
    title: "Affectation d'un utilisateur",
    path: "insuree/insurees/PendingApprovalAssignemnt",
  },
];

const administration = [
  {
    parent: "Administration",
    path: "/admin/users",
    title: "Utilisateurs",
  },
  {
    parent: "Administration",
    path: "/location/locations",
    title: "Localisations geographiques",
  },
  {
    parent: "Administration",
    path: "/location/centers",
    title: "Centres",
  },
  {
    parent: "Administration",
    path: "/roles",
    title: "Gestion des roles",
  },
  {
    parent: "Administration",
    path: "/policyHolderUsers",
    title: "Administrateurs souscripteurs",
  },
  {
    parent: "Administration",
    path: "/admin/dashboard",
    title: "Dashboard",
  },
];

const demandePayement = [
  {
    parent: "Demande de paiement",
    path: "/claim/reviews",
    title: "Controle et paiement des factures",
  },
  {
    parent: "Demande de paiement",
    path: "/claim_batch",
    title: "Evaluation par lots",
  },
];

const category = [
  {
    parent: "Category des assurés",
    title: "Category des assurés",
    path: "/admin/products",
  },
  {
    parent: "Category des assurés",
    title: "Cotisations",
    path: "/contributionPlans",
  },
  {
    parent: "Category des assurés",
    title: "Taux/forfait cotisations",
    path: "/contributionPlanBundles",
  },
];

const fosa = [
  {
    parent: "Fosa",
    title: "Formation sanitaire",
    path: "/location/healthFacilities",
  },
  {
    parent: "Fosa",
    title: "Panier des soins : actes des soins",
    path: "/medical/pricelists/services",
  },
  {
    parent: "Fosa",
    title: "Panier des soins: produits medicaux",
    path: "/medical/pricelists/items",
  },
  {
    parent: "Fosa",
    title: "Actes des soins",
    path: "/medical/medicalServices",
  },
  {
    parent: "Fosa",
    title: "Produits medicaux",
    path: "/medical/medicalItems",
  },
  {
    parent: "Fosa",
    title: "Verification",
    path: "/insuree/insurees/verifyinsuree",
  },
];

const outils = [
  {
    parent: "Outils",
    path: "/tools/registers",
    title: "Registres",
  },
  {
    parent: "Outils",
    path: "/tools/extracts",
    title: "Extraits",
  },
  {
    parent: "Outils",
    path: "/tools/reports",
    title: "Rapports",
  },
];

const profile = [
  {
    parent: "Profil",
    path: "/profile/myProfile",
    title: "Information",
  },
  {
    parent: "Profil",
    path: "/profile/changePassword",
    title: "Changer mot de passe",
  },
];

const souscripteurs = [
  {
    parent: "Souscripteurs",
    path: "/contribution/contributions",
    title: "Contributions",
  },
  {
    parent: "Souscripteurs",
    path: "/front/policyHolders",
    title: "Immatriculation",
  },
  {
    parent: "Souscripteurs",
    path: "/contribution/contributions",
    title: "Contributions",
  },
  {
    parent: "Souscripteurs",
    path: "/payment/payments",
    title: "Recouvrements",
  },
  {
    parent: "Souscripteurs",
    path: "/paymentApproval",
    title: "Paiement par approbation",
  },
  {
    parent: "Souscripteurs",
    path: "/contracts",
    title: "Déclaration",
  },
  {
    parent: "Souscripteurs",
    path: "/declaration",
    title: "Rapport de déclaration",
  },
  {
    parent: "Souscripteurs",
    path: "/policyholderRequest",
    title: "Nouveau souscripteur demandes",
  },
];

const juridique = [
  {
    parent: "Juridique et financier",
    path: "/invoices",
    title: "Factures",
  },
  {
    parent: "Juridique et financier",
    path: "/bills",
    title: "Factures",
  },
  {
    parent: "Juridique et financier",
    path: "/paymentPlans",
    title: "Plans de paiement",
  },
];

const exceptions = [
  {
    parent: "Exceptions",
    path: "/exception",
    title: "Exception pour les assurés",
  },
  {
    parent: "Exceptions",
    path: "/exception/policyholder",
    title: "Exception pour les souscripteurs",
  },
  {
    parent: "Exceptions",
    path: "/exception/pendingapproval",
    title: "En attente d'approbation",
  },
];

export const routePages = [
  {
    "path": "home",
    "title": "",
    "parent": "",
  },
  ...affiliation,
  ...demandePayement,
  ...administration,
  ...category,
  ...fosa,
  ...outils,
  ...profile,
  ...souscripteurs,
  ...juridique,
  ...exceptions,
];
