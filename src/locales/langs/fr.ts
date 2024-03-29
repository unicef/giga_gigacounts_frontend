import { TranslationObject } from 'src/@types'

const fr: TranslationObject = {
  demo: {
    title: `France`,
    introduction: `Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.`
  },
  docs: {
    hi: `Bonjour`,
    description: `Besoin d'aide? \n Consultez notre documentation.`,
    documentation: `documentation`
  },
  login: {
    signin: 'Se connecter à Gigacounts',
    newuser: 'Nouvel utilisateur?',
    createaccount: 'Créer un compte',
    auth_error: "les informations d'identification invalides"
  },
  authLoginForm: {
    forgot_password: 'Mot de passe oublié?',
    login: 'Connexion'
  },
  accountChangePassword: {
    old_password_required: `L'ancien mot de passe est requis`,
    min_password: 'Le mot de passe doit comporter au moins 6 caractères',
    min_password_short: 'Le mot de passe doit être au minimum 6+',
    password_must_be_different: `Le nouveau mot de passe doit être différent de l'ancien mot de passe`,
    new_password: 'Nouveau mot de passe',
    old_password: 'Ancien mot de passe',
    match_password: 'Les mots de passe doivent correspondre'
  },
  authNewPasswordForm: {
    confirm_new_password: 'confirmer le nouveau mot de passe',
    update_password: 'Mettre à jour le mot de passe',
    change_success: 'Cambio de contreseña correcto!'
  },
  authRegisterForm: {
    createaccount: 'Créer un compte'
  },
  authResetPasswordForm: {
    sendrequest: 'Envoyer la demande'
  },
  authVerifyCodeForm: {
    success: 'Vérifier le succès !',
    verify: 'Vérifier'
  },
  authWithSocial: {
    or: 'ou'
  },
  resetPassword: {
    forgot_password: 'Mot de passe oublié?',
    forgot_msg: `Veuillez saisir l'adresse e-mail associée à votre compte et nous vous enverrons par e-mail un lien pour réinitialiser votre mot de passe.`,
    return_msg: 'Revenir à la connexion'
  },
  newPassword: {
    request_sent: 'Requête envoyée avec succès !',
    request_msg1: `Nous avons envoyé un e-mail de confirmation à 6 chiffres à votre adresse e-mail.`,
    request_msg2:
      'Veuillez entrer le code dans la case ci-dessous pour vérifier votre adresse e-mail.',
    no_code: `Vous n'avez pas de code ?`,
    resend: 'Renvoyer le code',
    return: 'Revenir à la connexion'
  },
  header: {
    need_help: `Besoin d'aide?`
  },
  register: {
    introtitle:
      'Surveillance facile de la connectivité et suivi des paiements pour la connectivité Internet dans les écoles',
    register: "S'inscrire à Gigacounts",
    already: 'Vous avez déjà un compte ?',
    signin: 'Connexion',
    agreeto: "En m'inscrivant, j'accepte",
    terms: "Conditions d'utilisation",
    and: 'et',
    privacy: 'Politique de confidentialité'
  },
  loginLayout: {
    welcome: 'Bonjour, bienvenue à nouveau'
  },
  autosave: {
    saving: 'Enregistrement...',
    saved: 'Enregistré',
    created: "Aucun contrat n'a encore été créé. Entrez un nom de contrat pour commencer.",
    unsaved_changes: 'A des changements sans économiser'
  },
  push: {
    credentials_sent: 'Vos informations ont été enregistrées avec succès',
    credentials_sent_error: 'Il y a eu une erreur enregistrant vos informations',
    knowledge_base_error: 'Base de connaissances pour cette page non encore mise en œuvre',
    changed_reliability: "La fiabilité a changé pour l'école",
    changed_reliability_error: "Une erreur s'est produite en modifiant la fiabilité de l'école",
    sent_feedback: 'Les commentaires ont été envoyés',
    sent_feedback_error: "Une erreur s'est produite en envoyant des commentaires",
    sent_help_request: "Une demande d'aide a été envoyée",
    sent_help_request_error: "Une erreur d'envoi d'une demande d'aide s'est produite",
    duplicated_contract: 'Le contrat a été dupliqué',
    duplicated_contract_error: "Une erreur s'est produite en doubler le contrat",
    published_contract: 'Le contrat a été publié',
    published_contract_error: "Une erreur s'est produite lors de la publication du contrat",
    saved_as_draft: 'Le contrat a été enregistré comme brouillon',
    saved_as_draft_error:
      "Une erreur s'est produite lors de l'enregistrement du contrat en tant que brouillon",
    deleted_contract: 'Le contrat a été supprimé.',
    deleted_contract_error: "Une erreur s'est produite en éliminant le contrat",
    approve_contract: 'Le contrat a été approuvé',
    approve_contract_error: "Une erreur s'est produite lors de l'approbation du contrat",
    fund_contract: 'Le contrat a été financé',
    fund_contract_error: "Une erreur s'est produite lors du financement du contrat.",
    fund_wallet: 'Le portefeuille a été financé',
    fund_wallet_error: "Une erreur s'est produite lors du financement du portefeuille.",
    approve_automatic_contract_invalid_wallet:
      "Le contrat ne peut pas être approuvé. Assurez-vous d'avoir un portefeuille connecté, et que c'est le même que celui que vous avez vérifié dans votre profil.",
    fund_automatic_contract_invalid_wallet:
      "Le contrat ne peut pas être financé. Assurez-vous d'avoir un portefeuille connecté, et qu'il est le même que celui que vous avez vérifié dans votre profil.",
    fund_wallet_invalid_wallet:
      "Impossible de transférer des fonds. Assurez-vous d'avoir un portefeuille connecté et qu'il s'agit du même que celui que vous avez vérifié dans votre profil.",
    fund_automatic_contract_low_balance: 'Solde de jetons insuffisant pour transférer au contrat.',
    added_payment: 'Le paiement a été ajouté',
    added_payment_error: "Une erreur s'est produite lors de l'ajout du paiement",
    updated_payment: 'Le paiement a été mis à jour',
    updated_payment_error: "Une erreur s'est produite lors de la mise à jour du paiement",
    approve_payment: 'Le paiement a été approuvé',
    approve_payment_error: "Une erreur s'est produite lors de l'approbation du paiement",
    reject_payment: 'Le paiement a été rejeté',
    reject_payment_error: "Une erreur s'est produite lors du rejet du paiement",
    pay_payment: 'Le paiement a été marqué comme payé',
    pay_payment_error: "Une erreur s'est produite lors du marquant du paiement comme payé",
    approved_manually_contract: 'Le contrat a été approuvé manuellement',
    approved_manually_contract_error: 'Il y a eu une erreur approuvant le contrat manuellement',
    user_approved: "L'utilisateur approuvé correctement",
    user_approved_error: "Il y a eu une erreur approuvant l'utilisateur"
  },
  duplicate_contract: {
    title: 'Dupliquer le contrat',
    content: 'Voulez-vous dupliquer le contrat sélectionné?',
    footer: 'Ce contrat sera créé avec le statut "Brouillon"'
  },
  delete_contract: {
    title:
      'Vous êtes sur le point de supprimer le contrat. Vous aurez 10 minutes pour le récupérer.',
    content: 'Êtes-vous sûr de vouloir supprimer ce contrat?',
    footer: 'Vous pouvez récupérer le contrat en cliquant sur le bouton annuler.'
  },
  approve_contract: {
    title: "Vous êtes sur le point d'approuver le contrat.",
    content: 'Êtes-vous sûr de vouloir approuver ce contrat?'
  },
  approve_automatic_contract: {
    title: "Vous êtes sur le point d'approuver le contrat automatique.",
    content: 'Êtes-vous sûr de vouloir approuver ce contrat automatique?'
  },
  fund_wallet: {
    title: 'Recharger portefeuille',
    transfer_amount_error1: 'Le montant doit être inférieur ou égal au solde de votre portefeuille',
    info: "Restez à l'écoute des demandes de signature qui apparaîtront dans votre portefeuille, pour autoriser le transfert de fonds. Le processus peut prendre plusieurs secondes.",
    field_user_name: "Nom d'utilisateur",
    field_wallet_from: 'Portefeuille de',
    field_wallet_to: 'Portefeuille à',
    field_wallet_from_balance: 'Solde actuel',
    field_wallet_to_balance: 'Solde actuel',
    view_in_explorer: "Afficher dans l'explorateur blockchain"
  },
  fund_automatic_contract: {
    title: 'Vous êtes sur le point de transférer des fonds au contrat automatique.',
    content: 'Êtes-vous sûr de vouloir transférer des fonds à ce contrat automatique?',
    info: "Restez à l'écoute des demandes de signature qui apparaîtront dans votre portefeuille, pour autoriser le transfert de fonds vers le contrat. Le processus peut prendre plusieurs secondes. À la fin, vous pourrez voir les transactions effectuées dans les détails du contrat.",
    data: 'Données du Fonds',
    contract_current_balance: 'Solde du contrat en cours',
    contract_budget: 'Budget du Contrat',
    transfer_amount: 'Montant à Transférer au Contrat',
    transfer_amount_error1: 'Le montant doit être inférieur ou égal au budget du contrat',
    transfer_amount_error2:
      'Le montant que vous souhaitez transférer dépasse le montant en attente de transfert'
  },
  transactions_tab: {
    detail: 'Détail de la transaction',
    increase_allowance: "Augmenter l'allocation",
    fund_contract: 'Financement du contrat',
    fund_wallet: 'Financement du portefeuille',
    transaction_hash: 'Hachage de la transaction',
    transaction_type: 'Type de transaction',
    transaction_network: 'Réseau'
  },
  without_walllet: {
    title: 'no se puede proceder sin una billetera conectada y verificada',
    to_approve:
      'Pour approuver un contrat automatique, vous devez avoir un portefeuille vérifié et connecté. Veuillez en configurer un dans votre profil.',
    to_fund_contract:
      'Pour transférer des fonds vers un contrat automatique, vous devez avoir un portefeuille vérifié et connecté. Veuillez en configurer un dans votre profil.',
    to_fund_Wallet:
      'Pour transférer des fonds vers un autre portefeuille, vous devez avoir un portefeuille vérifié et connecté. Veuillez en configurer un dans votre profil.'
  },
  publish_contract_modal: {
    title: 'Vous êtes sur le point de publier le contrat.',
    content: 'Êtes-vous sûr de vouloir publier ce contrat?'
  },
  user_approve_modal: {
    title: "Vous êtes sur le point d'approuver l'utilisateur {{name}} avec un e-mail {{email}}.",
    content:
      'Une fois que vous avez approuvé, ils pourront accéder au système comme le rôle que vous sélectionnez ci-dessous.'
  },
  payment_pay_modal: {
    title: 'Marquez le paiement comme payé',
    content:
      'Êtes-vous sûr de vouloir marquer ce paiement comme payé? Ce changement ne peut pas être annulé.'
  },
  contract_draft_modal: {
    title:
      'Votre contrat a été enregistré en tant que brouillon! Pour commencer officiellement le contrat, vous devez le publier.',
    content:
      'Recherchez et modifiez votre contrat dans la liste des contrats au statut de brouillon.'
  },
  contract_published_modal: {
    choose: {
      title: "Vous êtes à un pas d'un contrat actif.",
      content:
        'Vous pouvez envoyer le contrat au FAI pour signature ou vous pouvez valider le contrat vous-même.',
      primaryText: 'Envoyer au FAI pour signature',
      secondaryText: 'Confirmer la signature manuellement'
    },
    send: {
      title: "Vous êtes sur le point d'envoyer le contrat pour la signature ISP.",
      content: 'Vous recevrez une notification lorsque les signes ISP.',
      primaryText: 'Envoyer au FAI pour signature',
      secondaryText: 'Retourner',
      disabledText:
        "Le ISP doit faire enregistrer un utilisateur dans le système, le ISP pour ce contrat ne l'a pas fait."
    },
    manual: {
      title: 'Vous êtes sur le point de confirmer la signature du FAI pour vous-même.',
      content:
        'En confirmant la signature du FAI pour vous, vous confirmez que le FAI est bien informé et en accord des termes du contrat. Cette action ne peut être effectuée que pour les contrats manuels.',
      primaryText: 'Confirmer la signature manuellement',
      secondaryText: 'Retourner',
      disabledText: "La confirmation manuelle n'est disponible que pour les contrats manuels"
    }
  },
  contract_cancel_modal: {
    title: 'Annuler la création du contrat',
    content: 'Voulez-vous vraiment annuler la création de votre contrat? Votre contrat sera rejeté.'
  },
  contract_discard_changes_modal: {
    title: 'Annuler les modifications',
    content:
      'Are you sure you want to cancel your contract creation? Any unsaved changes will be discarded.'
  },
  comment_section: {
    title: 'Commentaires supplémentaires',
    placeholder:
      'Voulez-vous vraiment annuler la création de votre contrat? Toutes les modifications non enregistrées seront ignorées.'
  },
  contract_draft_descriptions: {
    attachments:
      'Veuillez joindre tout document lié au processus de signature du contrat que vous jugez utile de conserver dans le système, tel que les accords de niveau de service, les contrats originaux, etc.',
    budget:
      'Dans cette étape, vous pouvez déterminer le budget total du contrat. Vous pouvez sélectionner fiat ou crypto',
    schools:
      "Dans cette étape, vous pouvez ajouter les listes d'écoles qui seront couvertes par le contrat. Vous pouvez ensuite sélectionner les écoles en recherchant manuellement ou en téléchargeant un fichier csv de référence pour l'ajout par lots. Une fois que vous aurez ajouté les écoles, vous pourrez personnaliser le budget de chaque école."
  },
  upload_errors: {
    one_file: "Vous ne pouvez pas télécharger plus d'un fichier à la fois",
    csv: 'Vous ne pouvez télécharger que des fichiers CSV',
    pdf: 'Vous ne pouvez télécharger que des fichiers PDF',
    distinct_name: 'Vous ne pouvez pas télécharger deux pièces jointes portant le même nom'
  },
  field_errors: {
    required: '{{field}} est requis',
    required_plural: '{{field}} sont obligatoires',
    unique: '{{field}} doit être unique',
    positive: '{{field}} doit être positif',
    less_than: '{{field}} doit être inférieur à {{number}}',
    multiple_missing: 'Certains champs manquent',
    start_date: "Date date de début doit être après aujourd'hui",
    end_date: 'Date de fin doit être postérieure à la Date de début',
    launch_date_min: 'Date de lancement doit être postérieure à la Date de début',
    launch_date_max: 'Date de lancement doit être antérieure à la Date de fin',
    is_invalid: 'est invalide'
  },
  parse_errors: {
    school_not_found: 'École introuvable sur la ligne',
    school_id: "External_id de l'école manquant ou mal formé sur la ligne",
    school_budget_missing: "Budget de l'école manquant ou mal formé en ligne",
    school_budget_positive: "Le budget de l'école ne peut pas être nul ou négatif sur la ligne"
  },
  add_contract_details: 'Ajouter les détails du contrat',
  add_budgets_and_schools: 'Ajouter des budgets et des écoles',
  add_the_total_budget:
    'Ajoutez le budget total du contrat.Vous pouvez sélectionner dans Fiat ou Crypto Devise.',
  total_budget_of_the_contract: 'Total budget of the contract',
  add_the_general_details: 'Ajouter les détails du contrat général',
  add_the_contract_managers:
    'Ajouter les gestionnaires des contrats, les moniteurs de contrat et autres',
  schools_list: 'Liste des écoles',
  add_the_list_of_schools:
    'Ajoutez la liste des écoles qui seront couvertes par ce contrat.Vous pouvez sélectionner manuellement les écoles ou télécharger un fichier CSV de référence.Une fois que vous avez ajouté les écoles, vous pouvez personnaliser le budget à chaque école.',
  to_link_schools: `Pour lier plus rapidement les écoles au contrat, vous pouvez télécharger une liste des identifiants scolaires.
  Télécharger ceci`,
  quality_of_service_terms: 'Conditions de qualité de service',
  add_the_terms_agreed: 'Add the terms agreed upon between you and the ISP in the contract.',
  contract_breaking_rules: 'contract breaking rules',
  add_rules_and_guidelines:
    'Ajoutez des règles et des directives à suivre lorsque les FAI ne respectent pas les conditions du contrat.',
  payment_settings: 'Paramètres de paiement',
  add_payment_frequency: 'Ajouter la fréquence de paiement pour ce contrat.',
  payment_interval: 'Intervalle de paiement',
  add_contract_terms: 'Ajouter des conditions de contrat',
  review_and_save: 'examiner et économiser',
  contract_team: 'Équipe de contrat',
  documents_and_attachments: 'Documents et pièces jointes',
  add_any_document: 'Ajouter tout document lié à ce contrat',
  publish_error: 'Impossible de publier',
  government_behalf: 'Government behalf',
  metrics: 'Métrique',
  uploaded_with_errors: 'Téléchargé avec des erreurs',
  notifications_popover: {
    news: 'récent',
    you_have: 'Vous avez',
    unread_messages: 'messages non lus',
    before_that: 'Avant cela',
    view_all: 'Tout afficher',
    dismiss_all: 'Jetez tout',
    mark_all_as_read: 'tout marquer comme lu',
    empty: "Vous n'avez pas de notifications"
  },
  functionalities: {
    connectivity_viewing: 'Affichage de la connectivité',
    contract_creation: 'Création de contrat',
    contract_viewing: 'Affichage des contrats',
    dashboard: 'Home',
    feedback: 'Retour',
    help_request: `Demande d'aide`,
    login: 'Login',
    other: 'Autre',
    payment_creation: 'Création de paiement',
    payment_viewing: 'Affichage de paiement',
    register: 'Inscription',
    user_profile: "Profil de l'utilisateur",
    user_settings: 'Paramètres utilisateur'
  },
  contract_creation: 'Création de contrat',
  help_request: {
    bug: 'Signaler un bug',
    feedback: 'Donnez votre avis pour nous aider à nous améliorer',
    types: {
      improvement: 'Je voudrais suggérer des améliorations pour les fonctionnalités actuelles',
      display: "Quelque chose ne s'affiche pas correctement",
      behavior: 'Quelque chose ne fonctionne pas correctement',

      new_feature: 'Je voudrais proposer une nouvelle fonctionnalité'
    },
    other: 'autre'
  },
  functionality: 'Fonctionnalité',
  ticket: {
    code: 'En quoi pouvons-nous vous aider?',
    type: 'Lequel des énoncés suivants correspond le mieux à votre rapport?',
    description: {
      placeholder:
        'Ajoutez ici tout commentaire ou information supplémentaire concernant votre rapport de feedback'
    }
  },
  upload_error: 'Erreur de téléversement',
  yes: 'oui',
  no: 'non',
  undo: 'annuler',
  password: `mot de passe`,
  email: 'e-mail',
  email_address: `Adresse e-mail`,
  code_required: 'Le code est requis',
  email_valid: `L'e-mail doit être une adresse e-mail valide`,
  password_required: 'Le mot de passe est requis',
  confirm_password_required: 'La confirmation du mot de passe est requise',
  email_required: `L'e-mail est requis`,
  first_name: 'nombre',
  last_name: 'apellido',
  first_name_required: 'Le prénom est requis',
  last_name_required: 'Le nom de famille est requis',
  app: `application`,
  user: `utilisateur`,
  list: `liste`,
  edit: `Éditer`,
  clear: 'annuler',
  delete: 'Supprimer',
  shop: `boutique`,
  blog: `blog`,
  post: `poste`,
  mail: `e-mail`,
  chat: `discuter`,
  cards: `cartes`,
  posts: `des postes`,
  create: `créer`,
  kanban: `kanban`,
  general: `général`,
  banking: `bancaire`,
  booking: `réservation`,
  profile: `profil`,
  account: `compte`,
  product: `produit`,
  details: `détail`,
  checkout: `vérifier`,
  calendar: `calendrier`,
  analytics: `analytique`,
  ecommerce: `e-commerce`,
  management: `management`,
  contracts: `contrats`,
  payment: 'paiement',
  payments: 'paiements',
  payments_log: 'journal de paiement',
  automatic_contracts: 'contrats automatiques',
  automatic_contracts_list: 'liste des contrats automatiques',
  automatic_contracts_check_info:
    "Ceci est un contrat automatique, donc les paiements seront gérés automatiquement à l'aide d'un contrat intelligent.",
  invoice: `facture`,
  invoices: `factures`,
  workflows: `workflows`,
  description: `la description`,
  other_cases: `autres cas`,
  item_by_roles: `élément par rôles`,
  only_admin_can_see_this_item: `seul l'administrateur peut voir cet élément`,
  dashboard: 'dashboard',
  search_country: 'Rechercher le pays pour afficher des données',
  users: 'utilisateurs',
  settings: 'paramètres',
  account_settings: 'paramètres de compte',
  payments_list: 'liste des paiements',
  users_list: 'lista des usuários',
  contracts_list: 'liste des utilisateurs',
  filter: 'Filtre',
  change_lang: 'Changer de langue',
  notifications: 'Avis',
  all: 'tout',
  name: 'nom',
  status: 'statut',
  isp: 'isp',
  region: 'région',
  lta_name: 'nom du lta',
  generated: 'généré',
  add_an_isp: 'Sjouter des contacts ISP',
  add_a_team_member: "Ajouter un membre de l'équipe contractuelle",
  add_team_member: "Ajouter un membre de l'équipe",
  team_member_saved: "Membre de l'équipe sauvé",
  enable_bypass: 'activer la confirmation du ISP de contournement',
  important: 'importante',
  add_a_contract_launch_day:
    'ajouter une date de lancement du contrat (si la date de lancement est différente de la date de début, ajoutez-le ici)',
  link_schools:
    'lier les écoles plus rapidement en téléchargeant une liste des identifiants scolaires et des budgets',
  breaking_rules: 'contrat des règles de rupture',
  enter_all_breaking: 'entrez toutes les règles de rupture de ce contrat',
  enter_the_payment: 'entrez les détails de paiement de ce contrat',
  accept_the_terms: `j'accepte les termes et conditions de création d'un contrat.`,
  dense: 'dense',
  update_success: `Mise à jour réussie!`,
  save_changes: 'Enregistrer les modifications',
  contract_details: 'Détails du contrat',
  contract_name: 'Nom du contrat',
  contract_id: 'ID du contrat',
  start_date: 'Date de début',
  end_date: 'Date de fin',
  date_from: 'Dater de',
  date_to: 'Date de',
  launch_date: 'Date de lancement',
  umbrella: 'Umbrella',
  quality_of_service: 'Qualité de service',
  uptime: 'Disponibilité',
  latency: 'Latence',
  download_speed: 'Vitesse téléchargement',
  upload_speed: 'Vitesse téléversement',
  attachments: 'Pièces jointes',
  main_info: 'Informations principales',
  lta: 'Accord à long terme',
  valid_through: "Valable jusqu'au",
  internet_provider: 'Fournisseur Internet',
  upload: 'Téléverser',
  other_users: 'Autres utilisateurs',
  schools_and_budget: 'Écoles et budget',
  schools_list_budget: 'Liste des écoles et allocation budgétaire',
  schools: 'Écoles',
  stakeholders_and_collaborators: 'Stakeholders & collaborateurs',
  stakeholders: 'Stakeholders',
  final_review: 'Revue final',
  back: 'dos',
  save: 'enregistrer',
  as: 'comme',
  continue: 'continuer',
  finish: 'Finaliser',
  cancel: 'Annuler',
  add: 'ajouter',
  new: 'nouveau',
  contract: 'contrat',
  contract_type: 'type de contrat',
  partners: 'partenaires',
  export: 'exporter',
  and: 'et',
  upload_csv: 'Téléverser un fichier csv',
  download_csv: 'Vous pouvez télécharger',
  upload_reference: 'Téléverser un fichier de référence',
  upload_relevant: 'Télécharger les documents pertinents',
  upload_files: 'Télécharger des fichiers',
  search_and_add_schools: 'Rechercher et ajouter des écoles',
  publish_and_send_to_isp: 'publier & envoyer au isp',
  publish_contract: 'publier le contrat',
  create_another_contract: 'créer un autre contrat',
  view_contract: 'voir le contrat',
  currency: 'monnaie',
  budget: 'budget',
  search: 'Recherche',
  read: 'lire',
  delete_confirm_item: 'Êtes-vous sûr de vouloir supprimer?',
  delete_confirm_items: 'Êtes-vous sûr de vouloir supprimer <strong>{{number}}</strong> éléments?',
  section: 'rubrique',
  no_collaborators_added: 'Aucun collaborateur ajouté.',
  no_attachments_added: 'Aucune pièce jointe ajoutée.',
  see_all_schools: 'Voir toutes les écoles',
  number_of_schools: "nombre d'écoles",
  message: 'message',
  date: 'date',
  collaborators: 'collaborateurs',
  no_data: 'pas de date',
  total_budget: 'budget total',
  the_users: 'Les utilisateurs que vous ajoutez seront affichés dans cette section',
  add_users: 'ajouter des utilisateurs',
  phone_number: 'numéro de téléphone',
  exceeds_budget_error: "le budget total n'est pas le même que le budget du contrat",
  contract_budget: 'budget du contrat',
  publish: 'Publier',
  period: 'période',
  from: 'de',
  to: 'pour',
  change: 'changement',
  print: 'imprimer',
  send: 'envoyer',
  share: 'partager',
  mark_as_paid: 'marquer comme payé',
  mark_as_unpaid: 'Mark comme impayé rémunéré',
  close: 'fermer',
  service_type: 'Type de service',
  search_user: 'Rechercher un utilisateur...',
  total: 'Totale',
  verified: 'Vérifié',
  pending: 'En attente',
  rejected: 'Rejeté',
  new_payment: 'nouveau paiement',
  client: 'Client',
  due: 'Exigible',
  amount: ' Montant',
  view_connectivity: 'Voir la connectivité',
  view_payments: 'Voir paiements',
  view_payment: 'Voir paiement',
  view: 'voir',
  download: 'télécharger',
  add_payment: 'Ajouter paiement',
  update_payment: 'Mettre à jour le paiement',
  payment_detail: 'Détails de paiement',
  approve: 'Approuver',
  fund: 'Fonder',
  funds: 'Fonds',
  cashback: 'Remboursement',
  discount: 'Rabais',
  decline: 'Déclin',
  find_the_invoice: `Retrouvez la facture ici. N'oubliez pas qu'il s'agit d'un document légal qui prend en charge le paiement créé.`,
  find_the_receipt: `Retrouvez le reçu ici. N'oubliez pas qu'il s'agit d'un document légal qui atteste que le paiement a été effectué avec succès.`,
  payment_cancel_modal: {
    title: 'Annuler la création du paiement',
    content:
      'Voulez-vous vraiment annuler la création de votre paiement? Votre paiement sera rejeté.'
  },
  payment_created_modal: {
    title: 'Votre paiement a été créé avec succès!',
    content: 'Trouvez votre paiement sur la liste de paiement'
  },
  payment_updated_modal: {
    title: 'Votre paiement a été mis à jour avec succès!',
    content: 'Trouvez votre paiement sur la liste de paiement'
  },
  payment_approve_modal: {
    title: 'Approbation du paiement',
    content: 'Voulez-vous vraiment approuver ce paiement?'
  },
  payment_reject_modal: {
    title: 'Refus de paiement',
    content: 'Voulez-vous vraiment rejeter ce paiement?'
  },
  country: 'pays',
  no_schools_for_selected_country: "Il n'y a pas d'écoles pour le pays sélectionné",
  schools_equal_or_above_average: 'Écoles égales ou supérieures à la moyenne',
  schools_below_average: 'Écoles en dessous de la moyenne',
  schools_without_connection: 'Écoles hors ligne',
  qos_summary: 'Résumé de la qualité de service',
  qos_description:
    "Dans cette section, vous pouvez voir la qualité du service fourni par le fournisseur d'accès Internet pour l'école sélectionnée, classée par période et type de métrique",
  very_weak_connection: 'connexion très faible',
  weak_connection: 'connexion faible',
  strong_connection: 'connexion fort',
  strong: 'fort',
  weak: 'faible',
  very_weak: 'très faible',
  connectivity_list: 'liste de connectivité',
  connection: 'connexion',
  location: 'emplacement',
  no_available_payments: 'Aucun paiement disponible pour ce contrat',
  currency_type: 'type de monnaie',
  contact: 'contact',
  other: 'autre',
  automatic: 'Automatique',
  forgot_password: "J'ai oublié mon mot de passe",
  wallet: {
    switch_subtitle:
      'En activant cette option, vous pouvez configurer un portefeuille ici et une nouvelle option de menu principal sera disponible pour afficher les contrats automatiques.',
    switch_update_msg_ok: 'Enregistré',
    switch_update_msg_error: "Erreur lors de l'enregistrement du paramètre",
    label: 'Portefeuille',
    copied: 'Copié!',
    copy_wallet: "Copier l'adresse du portefeuille",
    view_explorer: 'Afficher sur Blockchain Explorer',
    attached_wallet: 'Portefeuille attaché',
    wallet_explain_1:
      'Ce portefeuille sera utilisé pour signer les transactions, créer un contrat crypto, gérer le budget sur la plateforme. Installer',
    metamask: 'Metamask',
    wallet_explain_2:
      'plugin dans votre navigateur et veuillez actualiser la page. Assurez-vous que vous êtes connecté ou créez un nouveau compte MetaMask. Alternativement, vous pouvez connecter votre portefeuille avec',
    wallet_connect: 'Wallet Connect',
    wallet_metamask: 'Portefeuille MetaMask',
    wallet_trust: 'Portefeuille Trust',
    wallet_coinbase: 'Portefeuille Coinbase',
    connect: 'Se connecter',
    disconnect: 'Déconnecter',
    wallet_not_verified: 'Portefeuille non vérifié',
    wallet_verified: 'Portefeuille vérifié',
    wallet_connected: 'Portefeuille connecté',
    verify_msg_error: 'Erreur de vérification du portefeuille',
    verify_msg_error_already_Attached:
      'Le portefeuille sélectionné est déjà attaché à un autre utilisateur',
    connect_msg_error: 'Erreur de connexion du portefeuille',
    verify: 'Vérifier le portefeuille connecté',
    verify_msg:
      'Le portefeuille connecté ne correspond pas à votre portefeuille vérifié sur Gigacounts.',
    verify_msg_choose:
      'Vérifier le portefeuille connecté ou choisissez WALLET_ADDRESS dans votre fournisseur de portefeuille.',
    verify_msg_choose_wtihout_wallet: "Le portefeuille connecté n'est pas vérifié sur Gigacounts.",
    gigacounts_crypto_balance: 'Solde de chiffrement Gigacounts',
    wallet_this_is: 'Ceci est un',
    gnosis_explain_1:
      'qui est partagé avec tous les utilisateurs administrateurs. Pour déposer des fonds dans votre Gnosis-Safe',
    gnosis_instructions: 'suivez ces instructions',
    gnosis_label: 'Compte sécurisé',
    address_not_set: 'adresse non définie',
    automatic_contracts: 'Contrats automatiques',
    automatic_enabled: 'on',
    automatic_disabled: 'off',
    network_supported: 'Red compatible',
    network_unsupported: 'Red no compatible'
  },
  role_base_guard: {
    permission_denied: 'Autorisation refusée',
    without_permission: "Vous n'êtes pas autorisé à accéder à cette page"
  },
  wallet_external_component: {
    connect: {
      selectingWallet: {
        header: 'Portefeuilles disponibles',
        sidebar: {
          heading: '',
          subheading: 'Connectez votre portefeuille',
          paragraph:
            "Connecter votre portefeuille, c'est comme vous connecter à Web3. Sélectionnez votre portefeuille parmi les options pour commencer.",
          IDontHaveAWallet: "Je n'ai pas de portefeuille"
        },
        recommendedWalletsPart1: '{app} prend en charge uniquement',
        recommendedWalletsPart2:
          "sur cette plateforme. Veuillez utiliser ou installer l'un des portefeuilles pris en charge pour continuer.",
        installWallet:
          "Vous n'avez aucun portefeuille installé que {app} prend en charge. Veuillez utiliser un portefeuille pris en charge.",
        agreement: {
          agree: "J'accepte les",
          terms: 'Conditions générales',
          and: 'et',
          privacy: 'Politique de confidentialité'
        },
        whyDontISeeMyWallet: 'Pourquoi ne vois-je pas mon portefeuille ?',
        learnMore: 'Cliquez ici pour en savoir plus'
      },
      connectingWallet: {
        header:
          '{connectionRejected, select, false {Connexion à {wallet} en cours...} other {Connexion rejetée}}',
        sidebar: {
          subheading: 'Approuver la connexion',
          paragraph:
            "Veuillez approuver la connexion dans votre portefeuille et autoriser l'accès pour continuer."
        },
        mainText: 'Connexion en cours...',
        paragraph:
          "Assurez-vous de sélectionner tous les comptes auxquels vous souhaitez accorder l'accès.",
        previousConnection:
          "{wallet} a déjà une demande de connexion en attente. Veuillez ouvrir l'application {wallet} pour vous connecter.",
        rejectedText: 'Connexion rejetée !',
        rejectedCTA: 'Cliquez ici pour réessayer',
        primaryButton: 'Retour aux portefeuilles'
      },
      connectedWallet: {
        header: 'Connexion réussie',
        sidebar: {
          subheading: 'Connexion réussie !',
          paragraph: 'Votre portefeuille est maintenant connecté à {app}'
        },
        mainText: 'Connecté'
      }
    },
    modals: {
      actionRequired: {
        heading: 'Action requise dans {wallet}',
        paragraph: 'Veuillez changer de compte actif dans votre portefeuille.',
        linkText: 'En savoir plus.',
        buttonText: 'OK'
      },
      switchChain: {
        heading: 'Changer de chaîne',
        paragraph1:
          '{app} nécessite que vous passiez votre portefeuille à la chaîne {nextNetworkName} pour continuer.',
        paragraph2:
          '*Certains portefeuilles peuvent ne pas prendre en charge le changement de chaîne. Si vous ne pouvez pas changer de chaîne dans votre portefeuille, vous devriez envisager de passer à un autre portefeuille.'
      },
      confirmDisconnectAll: {
        heading: 'Déconnecter tous les portefeuilles',
        description: 'Êtes-vous sûr de vouloir déconnecter tous vos portefeuilles ?',
        confirm: 'Confirmer',
        cancel: 'Annuler'
      },
      confirmTransactionProtection: {
        heading: 'Activer la protection des transactions',
        description:
          'La protection des points de terminaison RPC masque vos transactions des bots de front-running et de sandwich pour réduire les transactions défavorables dues au slippage.',
        enable: 'Activer',
        dismiss: 'Ignorer'
      }
    },
    accountCenter: {
      connectAnotherWallet: 'Connecter un autre portefeuille',
      disconnectAllWallets: 'Déconnecter tous les portefeuilles',
      currentNetwork: 'Réseau actuel',
      enableTransactionProtection: 'Activer la protection des transactions',
      appInfo: "Informations sur l'application",
      learnMore: 'En savoir plus',
      gettingStartedGuide: 'Guide de démarrage',
      smartContracts: 'Contrats intelligents',
      explore: 'Explorer',
      poweredBy: 'propulsé par',
      addAccount: 'Ajouter un compte',
      setPrimaryAccount: 'Définir le compte principal',
      disconnectWallet: 'Déconnecter le portefeuille',
      copyAddress: "Copier l'adresse du portefeuille"
    },
    notify: {
      transaction: {
        txRequest: 'Votre transaction attend votre confirmation',
        nsfFail: "Vous n'avez pas suffisamment de fonds pour cette transaction",
        txUnderpriced:
          'Le prix du gaz pour votre transaction est trop bas, essayez un prix du gaz plus élevé',
        txRepeat: "Il s'agit peut-être d'une transaction en double",
        txAwaitingApproval: 'Vous avez une transaction précédente en attente de confirmation',
        txConfirmReminder: 'Veuillez confirmer votre transaction pour continuer',
        txSendFail: 'Vous avez rejeté la transaction',
        txSent: 'Votre transaction a été envoyée au réseau',
        txStallPending: 'Votre transaction est bloquée avant son envoi, veuillez réessayer',
        txStuck: "Votre transaction est bloquée en raison d'un écart de nonce",
        txPool: 'Votre transaction a démarré',
        txStallConfirmed: "Votre transaction est bloquée et n'a pas été confirmée",
        txSpeedUp: 'Votre transaction a été accélérée',
        txCancel: "Votre transaction est en cours d'annulation",
        txFailed: 'Votre transaction a échoué',
        txConfirmed: 'Votre transaction a réussi',
        txError: "Oops, quelque chose s'est mal passé, veuillez réessayer",
        txReplaceError:
          "Une erreur s'est produite lors du remplacement de votre transaction, veuillez réessayer"
      },
      watched: {
        txPool:
          'Votre compte est {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txSpeedUp:
          'La transaction de {formattedValue} {asset} {preposition} {counterpartyShortened} a été accélérée',
        txCancel:
          'La transaction de {formattedValue} {asset} {preposition} {counterpartyShortened} a été annulée',
        txConfirmed:
          'Votre compte a réussi à {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txFailed:
          'Votre compte a échoué à {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txStuck: "Votre transaction est bloquée en raison d'un écart de nonce"
      },
      time: {
        minutes: 'min',
        seconds: 'sec'
      }
    }
  },
  previous_page: 'Page précédente',
  next_page: 'Page suivante',
  items_per_page: 'Objets par page',
  page_number: 'Numéro de page',
  address_copied: 'Adresse copiée!',
  account_safe: 'Coffre-fort de compte',
  send_feedback: 'envoyer des commentaires',
  send_us_feedback: 'envoyez-nous vos commentaires',
  flag: 'drapeau',
  personal_info: 'Informations personnelles',
  role: 'rôle',
  country_name: 'nom du pays',
  address: 'adresse',
  day: 'jour',
  median_value: 'Valeur médiane',
  metric_name: 'Nom de la métrique',
  clean_form: 'Forme épurée',
  add_contact: 'Ajouter le contact',
  payment_period: 'Délai de paiement',
  receipt: 'Reçu',
  home: 'Home',
  more: 'plus',
  overview: 'aperçu',
  size: 'taille',
  spent_budget: 'Budget dépensé',
  duplicate: 'double',
  bypass_isp_description:
    'Si vous activez cette option, le gestionnaire de contrat peut confirmer le contrat sans confirmation du ISP',
  contact_saved: 'Contact réussi',
  help: 'Aider',
  visit_help_page: "visitez la page d'aide",
  payment_frequency: 'fréquence de paiement',
  of: 'de',
  items: 'articles',
  pages: 'pages',
  monthly: 'mensuelle',
  weekly: 'hebdomadaire',
  biweekly: 'bihebdomadaire',
  log_out: 'Se déconnecter',
  connectivity: 'connectivité',
  schools_connectivity: 'Connectivité des écoles',
  no_comments_added: "Aucun commentaire n'a été ajouté",
  constant_status: {
    payment: {
      Draft: 'brouillon',
      Unpaid: 'confirmé mais impayé',
      Paid: 'payé'
    },
    contract: {
      Draft: 'brouillon',
      Sent: 'envoyé',
      Confirmed: 'confirmé',
      Ongoing: 'en cours',
      Expired: 'expiré',
      Completed: 'fini'
    },
    connectivity: {
      Connected: 'connecté',
      PoorlyConnected: 'mal connecté',
      Disconnected: 'débranché',
      Unknown: 'inconnue'
    },
    notification: {
      SENT: 'nouvelle',
      READ: 'lire'
    },
    web_transaction: {
      OK: 'Ok',
      ERROR: 'Erreur'
    }
  },
  payment_status: 'statut de paiement',
  set_payment_status: 'Établir le statut de paiement',
  connectivity_status_distribution: "Distribution de l'état de connectivité",
  connectivity_quality_check: 'Vérification de la qualité de la connectivité',
  mark_as_read: 'Marquer comme lu',
  title: 'titre',
  yesterday: 'hier',
  today: "aujourd'hui",
  current_delivery: 'Livraison actuelleelle',
  agreement: 'accord',
  older: 'plus ancien',
  contract_frequency: 'Fréquence contractuelle',
  has_reliable_measure_data: 'Il a des données de mesure fiables',
  schools_reliability: 'Fiabilité des mesures scolaires',
  reliable: 'fiable',
  unreliable: 'non fiable',
  drag_and_drop_pdf_multiple:
    'Faites glisser et relâchez le fichier .pdf ici ou cliquez pour charger',
  drag_and_drop_pdf_singular:
    'Faites glisser et relâchez les fichiers .pdf ici ou cliquez pour charger',
  drag_and_drop_csv_singular:
    'Faites glisser et relâchez le fichier .csv ici ou cliquez pour charger',
  drag_and_drop_csv_multiple:
    'Faites glisser et relâchez les fichiers .csv ici ou cliquez pour charger',
  knowledge_base: 'Base de connaissances',
  contact_information: 'Coordonnées',
  education_level: "Niveau d'éducation",
  no_breaking_rules: 'Aucune règle de rupture ajoutée pour ce contrat',
  schools_connected_out_of: 'écoles connectées à partir de',
  during: 'pendant',
  web3_transcations: 'Transactions automatiques',
  search_isp_contacts: 'Sélectionnez les contacts ISP',
  search_contract_team: "Trouvez des membres de l'équipe contractuelle disponibles",
  onboard_steps: {
    home: {
      account_nav_information:
        'Dans cette section, vous pouvez modifier vos informations personnelles',
      notifications_popover: 'Vous pouvez afficher et gérer vos notifications',
      feedback_link: "Ici, vous pouvez partager votre expérience avec l'application Gigacounts",
      language_popover: "Ici, vous pouvez sélectionner la langue de l'application",
      help_page_link: "Ici, vous pouvez visiter la page d'aide",
      ask_for_help_link: "Ici, vous pouvez demander de l'aide"
    },
    contracts: {
      new_contract: `C'est le bouton pour créer un nouveau contrat`,
      filter: `Ici, vous pouvez appliquer certains filtres`,
      table_container: 'Ici, vous pouvez voir les contrats que vous pouvez gérer'
    },
    profile: {
      wallet:
        'Ici, vous pouvez connecter votre portefeuille pour le paiement des contrats automatiques'
    },
    contract_detail: {
      schools:
        'Ici, vous pouvez voir la liste des écoles et surveiller le statut de leur connectivité',
      payment: 'Ici, vous pouvez exporter les factures et les ajouter'
    }
  },
  next: 'suivante',
  skip: 'sauter',
  open: 'ouvrir',
  last: 'dernière',
  payment_receiver: 'Récepteur de paiement des ISP',
  table_no_data: {
    contracts: 'contrat',
    measures: 'mesure',
    notifications: 'notification',
    payments: 'paiement',
    schools: 'école',
    users: 'utilisateur',
    attachments: 'attachement',
    transactions: 'transaction'
  },
  table_empty: {
    title: "Aucune donnée enregistrée pour l'instant",
    subtitle: 'Commencez par créer un {{content}} et il sera enregistré dans cet espace'
  },
  table_not_found: {
    title: "Votre recherche n'a donné aucun résultat",
    subtitle:
      'Essayez à nouveau de vérifier correctement les données ou effectuez une nouvelle recherche'
  },
  fedback_rating: {
    1: 'Je me sens insatisfait',
    2: 'Il pourrait être meilleur',
    3: "Je l'aime bien",
    4: "Je l'aime beaucoup",
    5: "Je l'aime"
  },
  education_levels: {
    high_school: 'Lycée',
    primary: 'Primaire',
    secondary: 'Secondaire'
  },
  payment_receiver_warning:
    "L'utilisateur sélectionné n'a pas de portefeuille configuré. Il ne pourra pas recevoir de paiements automatiques tant qu'il n'en aura pas configuré un dans son profil.",
  payment_details: 'Détails de paiement',
  no_wallet_address: 'Aucune adresse de portefeuille',
  isp_contacts: 'Contacts ISP',
  school: 'école',
  name_spaces_error: "Le nom ne peut pas contenir d'espaces",
  budget_exceeds_max_error: 'Le budget total des écoles doit être égal au budget du contrat',
  uploaded: 'téléchargé',
  added_as_contact: 'ajouté comme contact',
  added_as_team_member: "ajouté comme membre de l'équipe",
  failed_to_upload: 'échec du téléchargement',
  failed_to_add_as_contact: "échec de l'ajout en contact",
  failed_to_add_as_team_member: "échec de l'ajout en tant que membre de l'équipe",
  file_container_label_accept: 'Les types de fichiers compatibles sont {{accept}}',
  file_container_label_size: 'La taille maximale du fichier est {{size}}mb.',
  page_error: {
    403: {
      title: 'Aucune autorisation',
      content:
        "La page que vous essayez d'accès a un accès restreint. Veuillez vous référer à votre administrateur système"
    },
    404: {
      title: 'Page non trouvée',
      content:
        "Nous l'avons senti, nous ne trouvons pas la page que vous recherchez.Assurez-vous que l'URL est correcte "
    },
    500: {
      title: 'Erreur interne du serveur',
      content: 'Il y a eu une erreur. Veuillez réessayer plus tard.'
    },
    generic: {
      title: `On dirait qu'il y a eu une erreur`,
      content: `Quelque chose s'est mal passé en traitement de votre demande. Veuillez réessayer.`
    },
    notVerified: {
      title: 'Compte non vérifié',
      content:
        "Merci d'avoir rempli vos informations, un utilisateur d'administration approuvera et vérifiera votre compte dès que possible.",
      contentWithoutRoleAndCountry:
        "Avant qu'un administrateur puisse approuver la création de votre compte, vous devez remplir les informations suivantes."
    }
  },
  widgets: {
    map: {
      title: 'Carte des écoles',
      average_latency: 'Latence moyenne',
      average_uptime: 'Time de disponibilité moyen',
      average_download_speed: 'Vitesse de téléchargement moyenne',
      average_upload_speed: 'Vitesse de téléversement moyenne',
      you_are_here: 'Tu es là'
    },
    contract_issues: {
      title1: 'Contractes avec les problèmes de',
      title2: '',

      no_data: "Aucun contrat n'a de problèmes de SLA"
    },
    take_action: {
      title: 'Actions nécessitant une attention',
      no_data: 'Aucune action à prendre'
    },
    school_issues: {
      title1: 'Écoles avec des problèmes de',
      title2: '',
      no_data: "Aucune école n'a de problèmes de SLA"
    },
    upcoming_payments: {
      title: 'Paiements à venir',
      no_data: 'Pas de paiements à venir'
    },
    overdue_payment: {
      title: 'Paiements en retards',
      no_data: 'Pas de paiements en retard'
    }
  },
  the_file_is_downloading: 'le fichier se télécharge',
  copied_link: 'lien copié',
  share_contract_details: 'Partager les détails du contrat',
  contract_dates: 'Dates du contrat',
  options: 'choix',
  copy_url: "copier et partager l'URL",
  distribute_budget_equally: 'Distribuer le budget également',
  add_external_isp_contact: 'Ajouter un contact externe ISP',
  ask_for_help: "demander de l'aide",
  contract_period: 'période de contrat',
  daily: 'tous les jours',
  tooltips: {
    SLA: {
      line1: 'Niveau de qualité de service Contracté',
      line2: 'entre le ISP et un',
      line3: 'Créateur de contrat pour une école.'
    },
    upcoming_payments: {
      line1: 'Paiements non rémunérés',
      line2: 'et leur période de couverture',
      line3: "n'a pas encore commencé."
    },
    overdue_payments: {
      line1: 'Paiements non rémunérés',
      line2: 'et leur période de couverture',
      line3: 'a fini.'
    },
    measures_24: 'Les mesures proviennent des dernières 24 heures',
    connectivity_distribution_status: {
      line1: 'Spectacles (en %) si les écoles avaient une bonne, mauvaise ou pas de connexion.',
      line2: 'Mesuré pour les {{number}} écoles sous le contrat,',
      line3: 'pour la période de paiement sélectionnée de {{dateFrom}} à {{dateTo}}.'
    },
    connectivity_distribution_days: {
      line1:
        'Montre (en %) si les écoles étaient connectées tous les jours, quelques jours ou 0 jours.',
      line2: 'Mesuré pour les {{number}} écoles sous le contrat,',
      line3: 'pour la période de paiement sélectionnée de {{dateFrom}} à {{dateTo}}.'
    },
    quality_of_service_comparison: {
      line1: 'Les comparaisons entre la QoS convenue dans le contrat et la QoS livrée',
      line2: 'pour la période de paiement sélectionnée de {{dateFrom}} à {{dateTo}}.'
    },
    payment_status:
      "Vous permet de décider et de définir un statut de paiement.Si rien n'est sélectionné, le statut sera défini sur le projet.",
    connectivity_graph: {
      days: {
        success: '{{number}}% écoles connectées tous les jours',
        warning: '{{number}}% écoles connectées certains jours',
        error: '{{number}}% écoles déconnectées chaque jour',
        unknown: '{{number}}% écoles avec des données inconnues pour les jours connectés'
      },
      status: {
        success: '{{number}}% écoles avec une bonne connexion',
        warning: '{{number}}% écoles avec une mauvaise connexion',
        error: '{{number}}% écoles sans connexion',
        unknown: '{{number}}% écoles avec un statut de connexion inconnu'
      }
    }
  },
  install: 'installer',
  january: 'janvier',
  february: 'février',
  march: 'mars',
  april: 'avril',
  may: 'mai',
  june: 'juin',
  july: 'juillet',
  august: 'août',
  september: 'septembre',
  october: 'octobre',
  november: 'novembre',
  december: 'décembre',
  month: 'mois',
  for: 'pour',
  percentage_schools_connected: "pourcentage d'écoles connectées",
  percentage_schools_connected_by_number_of_days:
    "Pourcentage d'écoles liées par le nombre de jours",
  number_schools: '{{number}} écoles',
  from_date_to_date: 'de {{dateFrom}} à {{dateTo}}',
  distributed_by_percentage_of_schools: "distribué par pourcentage d'écoles",
  no_connection: 'pas de connection',
  bad_connection: 'mauvaise connexion',
  good_connection: 'bonne connexion',
  unknown_data: 'données inconnues',
  out_of_number_days: 'de {{number}} jours',
  out_of_number_schools: 'des écoles {{number}}',
  connected_number_days: 'connecté {{number}} jours',
  connected_every_day: 'connecté tous les jours',
  connected_1_to_number_days_out_of_max_days: 'connecté 1 à {{number}} jours sur {{max}} jours',
  mark_as_reliable: 'Marquez-le comme fiable',
  mark_as_unreliable: 'Marquez-le comme peu fiable',
  connectivity_distribution_by_status: 'distribution de la connectivité: par statut',
  connectivity_distribution_by_days: 'distribution de la connectivité: par jours',
  quality_of_service_comparison: 'comparaison de la qualité de service',
  none: 'Aucun',
  pay_reciev: 'Recep. Paie.',
  reset_table: 'réinitialiser tableau',
  help_request_subtitle: 'Veuillez remplir votre requête ci-dessous ou',
  user_approval: "Approbation de l'utilisateur",
  reject: 'Rejeter',
  go_back: 'Retourner'
}

export default fr
