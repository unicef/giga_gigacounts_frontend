import { TranslationObject } from 'src/@types'

const br: TranslationObject = {
  demo: {
    title: `Portuguese`,
    introduction: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  docs: {
    hi: 'Oi',
    description: `Precisa de ajuda? \n Verifique nossos documentos.`,
    documentation: `documentação`
  },
  login: {
    signin: 'Entrar no Gigacounts',
    newuser: 'Novo usuário?',
    createaccount: 'Criar uma conta',
    auth_error: 'Credenciais Inválidas'
  },
  authLoginForm: {
    forgot_password: 'Esqueceu a senha?',
    login: 'Entrar'
  },
  accountChangePassword: {
    old_password_required: 'A senha antiga é obrigatória',
    min_password: 'A senha deve ter pelo menos 6 caracteres',
    min_password_short: 'A senha deve ser no mínimo 6+',
    password_must_be_different: 'Nova senha deve ser diferente da senha antiga',
    new_password: 'Nova senha',
    old_password: 'Senha antiga',
    match_password: 'As senhas devem corresponder'
  },
  authNewPasswordForm: {
    confirm_new_password: 'confirmar nova senha',
    update_password: 'Atualizar senha',
    change_success: 'Mudança de senha com sucesso!'
  },
  authRegisterForm: {
    createaccount: 'Criar conta'
  },
  authResetPasswordForm: {
    sendrequest: 'Enviar solicitação'
  },
  authVerifyCodeForm: {
    success: 'Verifique o sucesso!',
    verify: 'Verificar'
  },
  authWithSocial: {
    or: 'ou'
  },
  resetPassword: {
    forgot_password: 'Esqueceu sua senha?',
    forgot_msg:
      'Por favor, digite o endereço de e-mail associado à sua conta e nós lhe enviaremos um link para redefinir sua senha.',
    return_msg: 'Volte para entrar'
  },
  newPassword: {
    request_sent: 'Pedido enviado com sucesso!',
    request_msg1: `Enviamos um e-mail de confirmação de 6 dígitos para o seu e-mail.`,
    request_msg2: 'Digite o código na caixa abaixo para verificar seu e-mail.',
    no_code: `Não tem um código?`,
    resend: 'Reenviar código',
    return: 'Volte para entrar'
  },
  header: {
    need_help: 'Precisa de ajuda?'
  },
  register: {
    introtitle:
      'Fácil monitoramento de conectividade e rastreamento de pagamentos para conectividade de internet nas escolas',
    register: 'Registre-se no Gigacounts',
    already: 'Já tem uma conta?',
    signin: 'Entrar',
    agreeto: 'Ao me inscrever, eu concordo com',
    terms: 'Termos de Serviço',
    and: 'e',
    privacy: 'Política de Privacidade'
  },
  loginLayout: {
    welcome: 'Oi, bem-vindo de volta'
  },
  autosave: {
    saving: 'Saving...',
    saved: 'Saved',
    created: 'Not created yet. Enter a contract name first to auto-save',
    unsaved_changes: 'Tem mudanças sem salvar'
  },
  push: {
    credentials_sent: 'Suas informações foram salvas com sucesso',
    credentials_sent_error: 'Houve um erro mantendo suas informações',
    knowledge_base_error: 'Base de conhecimento para esta página ainda não implementada',
    changed_reliability: 'A confiabilidade mudou para a escola',
    changed_reliability_error: 'Ocorreu um erro alterando a confiabilidade para a escola',
    sent_feedback: 'O feedback foi enviado',
    sent_feedback_error: 'Ocorreu um erro enviando o feedback',
    sent_help_request: 'Um pedido de ajuda foi enviado',
    sent_help_request_error: 'Ocorreu um erro enviando um pedido de ajuda',
    duplicated_contract: 'O contrato foi duplicado',
    duplicated_contract_error: 'Ocorreu um erro duplicando o contrato',
    published_contract: 'O contrato foi publicado',
    published_contract_error: 'Ocorreu um erro publicando o contrato',
    saved_as_draft: 'O contrato foi salvo como rascunho',
    saved_as_draft_error: 'Ocorreu um erro salvando o contrato como rascunho',
    deleted_contract: 'O contrato foi eliminado.',
    deleted_contract_error: 'Ocorreu um erro excluindo o contrato',
    approve_contract: 'O contrato foi aprovado',
    approve_contract_error: 'Ocorreu um erro aprovando o contrato',
    fund_contract: 'O contrato foi financiado',
    fund_contract_error: 'Ocorreu um erro financiar o contrato',
    fund_wallet: 'A carteira foi financiada',
    fund_wallet_error: 'Ocorreu um erro financiar a carteira',
    approve_automatic_contract_invalid_wallet:
      'O contrato não pode ser aprovado. Certifique-se de ter uma carteira conectada, e que seja a mesma que você verificou no seu perfil.',
    fund_automatic_contract_invalid_wallet:
      'O contrato não pode ser financiado. Verifique se você possui uma carteira conectada e se é a mesma que você verificou em seu perfil.',
    fund_wallet_invalid_wallet:
      'Não é possível transferir fundos. Certifique-se de ter uma carteira conectada e que seja a mesma que você verificou em seu perfil.',
    fund_automatic_contract_low_balance:
      'Saldo insuficiente de tokens para transferir para o contrato.',
    added_payment: 'O pagamento foi adicionado',
    added_payment_error: 'Ocorreu um erro adicionando o pagamento',
    updated_payment: 'O pagamento foi atualizado',
    updated_payment_error: 'Ocorreu um erro atualizando o pagamento',
    approve_payment: 'O pagamento foi aprovado',
    approve_payment_error: 'Ocorreu um erro aprovando o pagamento',
    reject_payment: 'O pagamento foi rejeitado',
    reject_payment_error: 'Ocorreu um erro rejeitando o pagamento',
    pay_payment: 'O pagamento foi marcado como pago',
    pay_payment_error: 'Ocorreu um erro marcando o pagamento conforme pago',
    approved_manually_contract: 'O contrato foi aprovado manualmente',
    approved_manually_contract_error: 'Ocorreu um erro ao aprovar o contrato manualmente',
    user_approved: 'Usuário aprovado corretamente',
    user_approved_error: 'Houve um erro de aprovação do usuário'
  },
  duplicate_contract: {
    title: 'Duplicar contrato',
    content: 'Você deseja duplicar o contrato selecionado?',
    footer: 'Este contrato será criado com o status de "Rascunho"'
  },
  delete_contract: {
    title: 'Você está prestes a excluir o contrato. Você terá 10 minutos para recuperá-lo.',
    content: 'Tem certeza de que deseja excluir este contrato?',
    footer: 'Você pode recuperar o contrato clicando no botão desfazer.'
  },
  approve_contract: {
    title: 'Você está prestes a aprovar o contrato.',
    content: 'Tem certeza de que deseja aprovar este contrato?'
  },
  approve_automatic_contract: {
    title: 'Você está prestes a aprovar o contrato automático.',
    content: 'Tem certeza de que deseja aprovar este contrato automático?'
  },
  fund_wallet: {
    title: 'Recarga de Carteira',
    transfer_amount_error1: 'O valor deve ser menor ou igual ao saldo da sua carteira',
    info: 'Fique atento às solicitações de assinatura de transações que aparecerão em sua carteira, para permitir a transferência de fundos. O processo pode levar alguns segundos.',
    field_user_name: 'Nome do usuário',
    field_wallet_from: 'Carteira de',
    field_wallet_to: 'Carteira para',
    field_wallet_from_balance: 'Saldo atual',
    field_wallet_to_balance: 'Saldo atual',
    view_in_explorer: 'Ver no blockchain explorer'
  },
  fund_automatic_contract: {
    title: 'Você está prestes a transferir fundos para o contrato automático.',
    content: 'Tem certeza de que deseja transferir fundos para este contrato automático?',
    info: 'Fique atento às solicitações de assinatura de transações que aparecerão em sua carteira, para permitir a transferência de fundos para o contrato. O processo pode levar alguns segundos. Ao finalizar, você poderá ver as transações realizadas nos detalhes do contrato.',
    data: 'Dados do Fundo',
    contract_current_balance: 'saldo real do contrato',
    contract_budget: 'Orçamento do Contrato',
    transfer_amount: 'Valor a Transferir para o Contrato',
    transfer_amount_error1: 'O valor deve ser menor ou igual ao orçamento do contrato',
    transfer_amount_error2:
      'O valor que você deseja transferir excede o valor pendente de transferência'
  },
  transactions_tab: {
    detail: 'Detalhe da transação',
    increase_allowance: 'Increase Allowance',
    fund_contract: 'Financiamento do Contrato',
    fund_wallet: 'Financiamento do carteira',
    transaction_hash: 'Hash de transação',
    transaction_type: 'Tipo de transação',
    transaction_network: 'Rede'
  },
  without_walllet: {
    title: 'Não é possível prosseguir sem uma carteira conectada e verificada.',
    to_approve:
      'To approve an automatic contract, you must have a verified and connected wallet. Please set one up in your profile.',
    to_fund_contract:
      'To transfer funds to an automatic contract, you must have a verified and connected wallet. Please set one up in your profile.',
    to_fund_Wallet:
      'To transfer funds to another wallet, you must have a verified and connected wallet. Please set one up in your profile.'
  },
  publish_contract_modal: {
    title: 'Você está prestes a publicar o contrato.',
    content: 'Tem certeza de que deseja publicar este contrato?'
  },
  user_approve_modal: {
    title: 'Você está prestes a aprovar o usuário {{name}} com email {{email}}.',
    content:
      'Depois de aprovar, eles poderão acessar o sistema como a função que você selecionar abaixo.'
  },
  payment_pay_modal: {
    title: 'Marque o pagamento conforme pago',
    content:
      'Tem certeza de que deseja marcar esse pagamento conforme pago? Essa mudança não pode ser desfeita.'
  },
  contract_draft_modal: {
    title:
      'Seu contrato foi salvo como rascunho! Para iniciar oficialmente o contrato, você precisa publicá-lo.',
    content: 'Encontre e edite seu contrato na lista de contratos com status de rascunho.'
  },
  contract_published_modal: {
    choose: {
      title: 'Você está a um passo de um contrato ativo.',
      content:
        'Você pode enviar o contrato para o ISP para a assinatura ou você pode validar o contrato sozinho.',
      primaryText: 'Enviar ISP para a assinatura',
      secondaryText: 'Confirme a assinatura manualmente'
    },
    send: {
      title: 'Você está prestes a enviar o contrato para a assinatura do ISP.',
      content: 'Receberá uma notificação quando os sinais do ISP.',
      primaryText: 'Enviar ISP para a assinatura',
      secondaryText: 'Retornar',
      disabledText:
        'O ISP deve ter um usuário registrado no sistema, o ISP para este contrato não o fez.'
    },
    manual: {
      title: 'Você está prestes a confirmar a assinatura do ISP.',
      content:
        'Ao confirmar a assinatura do ISP, confirma que o ISP está bem informado e de acordo com os termos do contrato. Essa ação só pode ser realizada para contratos manuais.',
      primaryText: 'Confirme a assinatura manualmente',
      secondaryText: 'Retornar',
      disabledText: 'Confirmar manualmente está disponível apenas para contratos manuais'
    }
  },
  contract_cancel_modal: {
    title: 'Cancelar criação do contrato',
    content:
      'Tem certeza de que deseja cancelar a criação do contrato? Seu contrato será descartado.'
  },
  contract_discard_changes_modal: {
    title: 'Descartar mudanças',
    content:
      'Tem certeza de que deseja cancelar a criação do contrato? Quaisquer alterações não salvas serão descartadas.'
  },
  comment_section: {
    title: 'Comentários adicionais',
    placeholder: 'Adicione aqui qualquer comentário ou informação adicional sobre o seu contrato'
  },
  contract_draft_descriptions: {
    attachments:
      'Por favor, anexe qualquer documento relacionado ao processo de assinatura do contrato que considere útil manter no sistema, como acordos de nível de serviço, contratos originais, etc.',
    budget:
      'Nesta etapa, você pode determinar o orçamento total para o contrato. Você pode selecionar fiduciário ou cripto',
    schools:
      'Nesta etapa você pode adicionar as listas de escolas que serão abrangidas pelo contrato. Você pode selecionar as escolas pesquisando manualmente ou carregando um arquivo csv de referência para adicionar em lote. Depois de adicionar as escolas, você poderá personalizar o orçamento para cada escola.'
  },
  notifications_popover: {
    news: 'recente',
    you_have: 'Você tem',
    unread_messages: 'mensagens não lidas',
    before_that: 'Antes disso',
    view_all: 'Ver tudo',
    dismiss_all: 'descarte tudo',
    mark_all_as_read: 'marque tudo',
    empty: 'Você não tem notificações'
  },
  upload_errors: {
    one_file: 'Você não pode enviar mais de um arquivo por vez',
    csv: 'Você só pode fazer upload de arquivos CSV',
    pdf: 'Você só pode fazer upload de arquivos PDF',
    distinct_name: 'Você não pode enviar dois anexos com o mesmo nome'
  },
  field_errors: {
    required: '{{field}} é obrigatório',
    required_plural: '{{field}} são obrigatórias',
    unique: '{{field}} deve ser único',
    positive: '{{field}} deve ser positivo',
    less_than: '{{field}} deve ser menor que {{number}}',
    multiple_missing: 'Faltam campos',
    start_date: 'A data de início deve ser depois de hoje',
    end_date: 'A data final deve ser posterior à Data de início',
    launch_date_min: 'A data de ativação deve ser posterior à Data de início',
    launch_date_max: 'A data de ativação deve ser anterior à Data final',
    is_invalid: 'é inválido'
  },
  parse_errors: {
    school_not_found: 'Escola não encontrada na linha',
    school_id: 'External_id da escola ausente ou malformado na linha',
    school_budget_missing: 'Orçamento da escola ausente ou malformado na linha',
    school_budget_positive: 'O orçamento da escola não pode ser zero ou negativo na linha'
  },
  functionalities: {
    connectivity_viewing: 'Visualização de conectividade',
    contract_creation: 'Criação de contrato',
    contract_viewing: 'Visualização do contrato',
    dashboard: 'Home',
    feedback: 'Opinião',
    help_request: 'Pedido de ajuda',
    login: 'Login',
    other: 'Outra',
    payment_creation: 'Criação de pagamento',
    payment_viewing: 'Visualização de pagamento',
    register: 'Cadastro',
    user_profile: 'Perfil de usuário',
    user_settings: 'Configurações do Usuário'
  },
  contract_creation: 'Criação de contrato',
  help_request: {
    bug: 'Reportar um erro',
    feedback: 'Dê feedback para nos ajudar a melhorar',
    types: {
      display: 'Algo não está sendo exibido corretamente',
      behavior: 'Algo não está funcionando corretamente',
      improvement: 'Gostaria de sugerir melhorias para a funcionalidade atual',
      new_feature: 'Gostaria de sugerir uma nova funcionalidade'
    },
    other: 'outro'
  },
  functionality: 'Funcionalidade',
  ticket: {
    code: 'Em que podemos ajudá-lo?',
    type: 'Qual das opções a seguir melhor se adapta ao seu informe?',
    description: {
      placeholder:
        'Adicione aqui qualquer comentário ou informação adicional sobre o seu informe de feedback'
    }
  },
  add_contract_details: 'Adicione detalhes do contrato',
  add_budgets_and_schools: 'Adicionar orçamentos e escolas',
  add_the_total_budget:
    'Adicione o orçamento total para o contrato.Você pode selecionar na moeda Fiat ou Crypto.',
  total_budget_of_the_contract: 'Orçamento total do contrato',
  schools_list: 'Lista de escolas',
  add_the_list_of_schools:
    'Adicione a lista de escolas que serão cobertas por este contrato. Você pode selecionar manualmente escolas ou fazer upload de um arquivo CSV de referência.Depois de adicionar as escolas, você pode personalizar o orçamento para cada escola.',
  to_link_schools: `Para vincular as escolas ao contrato mais rapidamente, você pode fazer upload de uma lista de IDs da escola.
  Faça o download deste `,
  add_the_general_details: 'Adicione os detalhes do contrato geral',
  add_the_contract_managers: 'Adicionar gerentes de contrato, monitores de contrato e outros',
  quality_of_service_terms: 'Termos de qualidade de serviço ',
  add_the_terms_agreed: 'Add the terms agreed upon between you and the ISP in the contract.',
  contract_breaking_rules: 'regras de quebra de contrato',
  add_rules_and_guidelines:
    'Adicione regras e diretrizes a seguir quando os ISPs não cumprem os termos do contrato.',
  payment_settings: 'Configurações de pagamento',
  add_payment_frequency: 'Adicione a frequência de pagamento para este contrato.',
  payment_interval: 'Intervalo de pagamento',
  add_contract_terms: 'Adicionar termos de contrato',
  review_and_save: 'Revise e salve',
  contract_team: 'Equipe de contrato',
  documents_and_attachments: 'Documentos e anexos',
  add_any_document: 'Adicione qualquer documento relacionado a este contrato',
  publish_error: 'Não é possível publicar',
  government_behalf: 'Government behalf',
  metrics: 'Métricas',
  uploaded_with_errors: 'Enviado com erros',
  upload_error: 'Erro de upload',
  yes: 'sim',
  no: 'não',
  undo: 'desfazer',
  password: `senha`,
  email: `e-mail`,
  email_address: `Endereço de email`,
  code_required: 'Código é obrigatório',
  email_valid: 'O e-mail deve ser um endereço de e-mail válido',
  password_required: 'Senha obrigatória',
  confirm_password_required: 'É necessário confirmar a senha',
  email_required: 'Email obrigatório',
  first_name: 'nome',
  last_name: 'apellido',
  first_name_required: 'Primeiro nome é obrigatório',
  last_name_required: 'Sobrenome obrigatório',
  app: `aplicativo`,
  user: `usuário`,
  list: `lista`,
  edit: `Editar`,
  clear: 'desfazer',
  delete: 'Excluir',
  shop: `shop`,
  blog: `blog`,
  post: `post`,
  mail: `mail`,
  chat: `chat`,
  cards: `cards`,
  posts: `posts`,
  create: `create`,
  kanban: `kanban`,
  general: `general`,
  banking: `banking`,
  booking: `booking`,
  profile: `profile`,
  account: `conta`,
  product: `product`,
  details: `details`,
  checkout: `checkout`,
  calendar: `calendar`,
  analytics: `analytics`,
  ecommerce: `e-commerce`,
  management: `management`,
  contracts: `contratos`,
  payment: 'pagamento',
  payments: 'pagamentos',
  payments_log: 'registro de pagamento',
  automatic_contracts: 'contratos automáticos',
  automatic_contracts_list: 'lista de contratos automáticos',
  automatic_contracts_check_info:
    'Este é um contrato automático, então os pagamentos serão gerenciados automaticamente usando um contrato inteligente.',
  invoice: `fatura`,
  invoices: `faturas`,
  workflows: `fluxos de trabalho`,
  description: `descrição`,
  other_cases: `outros casos`,
  item_by_roles: `item por funções`,
  only_admin_can_see_this_item: `Only admin can see this item`,
  dashboard: 'dashboard',
  search_country: 'Pesquisar países para mostrar dados',
  users: 'usuários',
  settings: 'configurações',
  account_settings: 'configurações de conta',
  payments_list: 'lista de pagamentos',
  users_list: 'lista de usuários',
  contracts_list: 'lista de contratos',
  filter: 'Filtro',
  change_lang: 'Mudar idioma',
  notifications: 'Notificações',
  all: 'tudo',
  name: 'nome',
  status: 'estado',
  isp: 'isp',
  region: 'região',
  lta_name: 'nome do lta',
  generated: 'gerada',
  add_an_isp: 'Adicionar contatos ISP',
  add_a_team_member: 'Adicione um membro da equipe do contrato',
  add_team_member: 'Adicionar membro da equipe',
  team_member_saved: 'Membro da equipe salvo',
  enable_bypass: 'habilitar a confirmação do ISP de desvio',
  important: 'importante',
  add_a_contract_launch_day:
    'adicione uma data de ativação do contrato (se a data de ativação for diferente da data de início, adicione aqui)',
  link_schools:
    'vincular as escolas mais rapidamente, enviando uma lista de IDs e orçamentos da escola',
  breaking_rules: 'quebrando o contrato de regras',
  enter_all_breaking: 'insira todas as regras de quebra deste contrato',
  enter_the_payment: 'digite os detalhes do pagamento para este contrato',
  accept_the_terms: 'aceito os termos e condições de criação de um contrato.',
  dense: 'denso',
  update_success: `Atualização feita com sucesso!`,
  save_changes: 'Salvar alterações',
  contract_details: 'Detalhes do contrato',
  contract_name: 'Nome do contrato',
  contract_id: 'ID do contrato',
  start_date: 'Data de início',
  end_date: 'Data final',
  date_from: 'Data de',
  date_to: 'Data para',
  launch_date: 'Data de ativação',
  umbrella: 'Umbrella',
  quality_of_service: 'Qualidade de serviço',
  uptime: 'Tempo de atividade',
  latency: 'Latência',
  download_speed: 'Velocidade de download',
  upload_speed: 'Velocidade de upload',
  attachments: 'Anexos',
  main_info: 'Informações principais',
  lta: 'Acordo de longo prazo',
  valid_through: 'Válido até',
  internet_provider: 'Provedor de internet',
  upload: 'Upload',
  other_users: 'Outros usuários',
  schools_and_budget: 'Escolas e orçamento',
  schools_list_budget: 'Lista de escolas e alocação de orçamento',
  schools: 'Escolas',
  stakeholders_and_collaborators: 'Stakeholders & contribuidores',
  stakeholders: 'Stakeholders',
  final_review: 'Revisão final',
  back: 'voltar',
  save: 'salvar',
  as: 'como',
  continue: 'continuar',
  finish: 'Finalizar',
  cancel: 'Cancelar',
  contract: 'contrato',
  contract_type: 'tipo de contrato',
  new: 'novo',
  add: 'adicionar',
  partners: 'parceiros',
  export: 'exportar',
  and: 'e',
  upload_csv: 'Carregar um arquivo csv',
  download_csv: 'Você pode baixar',
  upload_reference: 'Carregar arquivo de referência',
  upload_relevant: 'Carregar documentos relevantes',
  upload_files: 'Carregar arquivos',
  search_and_add_schools: 'Pesquise e adicione escolas',
  publish_and_send_to_isp: 'publicar & enviar para isp',
  publish_contract: 'publicar contrato',
  create_another_contract: 'criar outro contrato',
  view_contract: 'ver contrato',
  currency: 'moeda',
  budget: 'orçamento',
  search: 'Pesquisar',
  read: 'ler',
  delete_confirm_item: 'Tem certeza que deseja deletar?',
  delete_confirm_items: 'Tem certeza de que deseja excluir <strong>{{number}}</strong> itens?',
  section: 'seção',
  no_collaborators_added: 'Nenhum contribuidor adicionado.',
  no_attachments_added: 'Nenhum anexo adicionado.',
  see_all_schools: 'Ver todas as escolas',
  number_of_schools: 'número de escolas',
  message: 'mensagem',
  date: 'data',
  collaborators: 'contribuidores',
  no_data: 'Sem Data',
  total_budget: 'budget total',
  the_users: 'Os usuários que você adicionar serão exibidos nesta seção',
  add_users: 'adicionar usuários',
  phone_number: 'número de telefone',
  exceeds_budget_error: 'o orçamento total não é o mesmo que o orçamento do contrato',
  contract_budget: 'orçamento do contrato',
  publish: 'Publicar',
  period: 'período',
  from: 'de',
  to: 'para',
  change: 'mudar',
  print: 'imprimir',
  send: 'enviar',
  share: 'compartilhar',
  mark_as_paid: 'marca conforme pago',
  mark_as_unpaid: 'marca como não remunerado',
  close: 'fechar',
  service_type: 'Tipo de serviço',
  search_user: 'Pesquisar usuário...',
  total: 'Total',
  verified: 'Verificado',
  pending: 'Pendente',
  rejected: 'Rejeitado',
  new_payment: 'novo pagamento',
  client: 'Cliente',
  due: 'Devido',
  amount: 'Quantia',
  view_connectivity: 'Ver conectividade',
  view_payments: 'Ver pagamentos',
  view_payment: 'Ver pagamento',
  view: 'visualizar',
  download: 'descarga',
  add_payment: 'Adicionar pagamento',
  update_payment: 'Atualizar pagamento',
  payment_detail: 'Detalhes do pagamento',
  approve: 'Aprovar',
  fund: 'Fundar',
  funds: 'Fundos',
  cashback: 'Reembolso',
  discount: 'Desconto',
  decline: 'Declínio',
  find_the_invoice:
    'Encontre a fatura aqui. Lembre-se que este é um documento legal que suporta o pagamento criado.',
  find_the_receipt:
    'Encontre o recibo aqui. Lembre-se que este é um documento legal que comprova que o pagamento foi feito com sucesso.',
  payment_cancel_modal: {
    title: 'Cancelar criação do pagamento',
    content:
      'Tem certeza de que deseja cancelar a criação do pagamento? Seu pagamento será descartado.'
  },
  payment_created_modal: {
    title: 'Seu pagamento foi criado com sucesso!',
    content: 'Encontre seu pagamento na lista de pagamentos'
  },
  payment_updated_modal: {
    title: 'Seu pagamento foi atualizado com sucesso!',
    content: 'Encontre seu pagamento na lista de pagamentos'
  },
  payment_approve_modal: {
    title: 'Aprovação de pagamento',
    content: 'Tem certeza de que deseja aprovar este pagamento?'
  },
  payment_reject_modal: {
    title: 'Rejeição de pagamento',
    content: 'Tem certeza de que deseja rejeitar este pagamento?'
  },
  country: 'país',
  no_schools_for_selected_country: 'Não há escolas para o país selecionado',
  schools_equal_or_above_average: 'Escolas iguais ou acima da média',
  schools_below_average: 'Escolas abaixo da média',
  schools_without_connection: 'Escolas sem conexão',
  qos_summary: 'Resumo da qualidade do serviço',
  qos_description:
    'Nesta seção você pode ver a qualidade do serviço prestado pelo provedor de internet para a escola selecionada categorizada por período e tipo de métrica',
  very_weak_connection: 'conexão muito fraca',
  weak_connection: 'conexão fraca',
  strong_connection: 'conexão forte',
  strong: 'forte',
  weak: 'fraca',
  very_weak: 'muito fraca',
  connectivity_list: 'lista de conectividade',
  connection: 'conexão',
  location: 'localização',
  no_available_payments: 'Nenhum pagamento disponível para este contrato',
  currency_type: 'Tipo de moeda',
  contact: 'contato',
  other: 'outro',
  automatic: 'Automático',
  forgot_password: 'Esqueci minha senha',
  wallet: {
    switch_subtitle:
      'Ao ativar esta opção, você pode configurar uma carteira aqui e uma nova opção no menu principal estará disponível para visualizar os contratos automáticos.',
    switch_update_msg_ok: 'Salvo',
    switch_update_msg_error: 'Erro ao salvar configuração',
    label: 'Carteira',
    copied: 'Copiado!',
    copy_wallet: 'Copiar endereço da carteira',
    view_explorer: 'Exibir no Blockchain Explorer',
    attached_wallet: 'Carteira anexada',
    wallet_explain_1:
      'Esta carteira será usada para assinar as transações, criar um contrato de criptografia, gerenciar o orçamento na plataforma. Instalar',
    metamask: 'MetaMask',
    wallet_explain_2:
      'plugin no seu navegador e atualize a página. Certifique-se de estar logado ou crie uma nova conta MetaMask. Como alternativa, você pode conectar sua carteira com',
    wallet_connect: 'Wallet Connect',
    wallet_metamask: 'Carteira MetaMask',
    wallet_trust: 'Carteira Trust',
    wallet_coinbase: 'Carteira Coinbase',
    connect: 'Conectar',
    disconnect: 'Desconectar',
    wallet_not_verified: 'Carteira não verificada',
    wallet_verified: 'Carteira verificada',
    wallet_connected: 'Carteira conectada',
    verify_msg_error: 'Erro ao verificar a carteira',
    verify_msg_error_already_Attached: 'Carteira selecionada já está anexada a outro usuário',
    connect_msg_error: 'Erro ao conectar a carteira',
    verify: 'Verificar carteira conectada',
    verify_msg: 'Carteira conectada não corresponde à sua carteira verificada em Gigacounts.',
    verify_msg_choose:
      'Verificar carteira conectada ou escolha WALLET_ADDRESS em seu provedor de carteira.',
    verify_msg_choose_wtihout_wallet: 'A carteira conectada não é verificada em Gigacounts.',
    gigacounts_crypto_balance: 'Saldo de criptografia Gigacounts',
    wallet_this_is: 'Isto é um',
    gnosis_explain_1:
      'que é compartilhado com todos os usuários administradores. Para depositar fundos no seu Gnosis-Safe',
    gnosis_instructions: 'siga estas instruções',
    gnosis_label: 'Conta segura',
    address_not_set: 'endereço não definido',
    automatic_contracts: 'Contratos automáticos',
    automatic_enabled: 'on',
    automatic_disabled: 'off',
    network_supported: 'Rede Suportada',
    network_unsupported: 'Rede não suportada'
  },
  role_base_guard: {
    permission_denied: 'Permissão negada',
    without_permission: 'Você não tem permissão para acessar esta página'
  },
  wallet_external_component: {
    connect: {
      selectingWallet: {
        header: 'Carteiras Disponíveis',
        sidebar: {
          heading: '',
          subheading: 'Conecte sua carteira',
          paragraph:
            'Conectar sua carteira é como fazer login na Web3. Selecione sua carteira nas opções para começar.',
          IDontHaveAWallet: 'Eu não tenho uma carteira'
        },
        recommendedWalletsPart1: '{app} suporta apenas',
        recommendedWalletsPart2:
          'nessa plataforma. Por favor, use ou instale uma das carteiras suportadas para continuar',
        installWallet:
          'Você não tem nenhuma carteira instalada que {app} suporte, por favor, use uma carteira suportada',
        agreement: {
          agree: 'Eu concordo com os',
          terms: 'Termos e Condições',
          and: 'e',
          privacy: 'Política de Privacidade'
        },
        whyDontISeeMyWallet: 'Por que eu não vejo minha carteira?',
        learnMore: 'Clique aqui para saber mais'
      },
      connectingWallet: {
        header:
          '{connectionRejected, select, false {Conectando a {wallet}...} other {Conexão Rejeitada}}',
        sidebar: {
          subheading: 'Aprovar Conexão',
          paragraph:
            'Por favor, aprove a conexão em sua carteira e autorize o acesso para continuar.'
        },
        mainText: 'Conectando...',
        paragraph: 'Certifique-se de selecionar todas as contas às quais deseja conceder acesso.',
        previousConnection:
          '{wallet} já possui uma solicitação de conexão pendente, por favor, abra o aplicativo {wallet} para fazer login e conectar.',
        rejectedText: 'Conexão Rejeitada!',
        rejectedCTA: 'Clique aqui para tentar novamente',
        primaryButton: 'Voltar para as carteiras'
      },
      connectedWallet: {
        header: 'Conexão Bem-sucedida',
        sidebar: {
          subheading: 'Conexão Bem-sucedida!',
          paragraph: 'Sua carteira está agora conectada ao {app}'
        },
        mainText: 'Conectado'
      }
    },
    modals: {
      actionRequired: {
        heading: 'Ação necessária em {wallet}',
        paragraph: 'Por favor, altere a conta ativa em sua carteira.',
        linkText: 'Saiba mais.',
        buttonText: 'Ok'
      },
      switchChain: {
        heading: 'Trocar de Rede',
        paragraph1:
          '{app} requer que você troque sua carteira para a rede {nextNetworkName} para continuar.',
        paragraph2:
          '*Algumas carteiras podem não suportar a troca de redes. Se você não puder trocar de rede em sua carteira, considere usar uma carteira diferente.'
      },
      confirmDisconnectAll: {
        heading: 'Desconectar Todas as Carteiras',
        description: 'Você tem certeza de que deseja desconectar todas as suas carteiras?',
        confirm: 'Confirmar',
        cancel: 'Cancelar'
      },
      confirmTransactionProtection: {
        heading: 'Ativar Proteção de Transação',
        description:
          'Proteger os endpoints RPC oculta suas transações de front-running e sandwich bots para reduzir a liquidação desfavorável de transações devido a slippage.',
        enable: 'Ativar',
        dismiss: 'Ignorar'
      }
    },
    accountCenter: {
      connectAnotherWallet: 'Conectar outra Carteira',
      disconnectAllWallets: 'Desconectar todas as Carteiras',
      currentNetwork: 'Rede Atual',
      enableTransactionProtection: 'Ativar Proteção de Transação',
      appInfo: 'Informações do Aplicativo',
      learnMore: 'Saiba Mais',
      gettingStartedGuide: 'Guia de Início Rápido',
      smartContracts: 'Contratos Inteligentes',
      explore: 'Explorar',
      poweredBy: 'powered by',
      addAccount: 'Adicionar Conta',
      setPrimaryAccount: 'Definir Conta Principal',
      disconnectWallet: 'Desconectar Carteira',
      copyAddress: 'Copiar endereço da carteira'
    },
    notify: {
      transaction: {
        txRequest: 'Sua transação está aguardando sua confirmação',
        nsfFail: 'Você possui fundos insuficientes para esta transação',
        txUnderpriced:
          'O preço do gás para sua transação está muito baixo, tente um preço de gás mais alto',
        txRepeat: 'Isso pode ser uma transação repetida',
        txAwaitingApproval: 'Você possui uma transação anterior aguardando sua confirmação',
        txConfirmReminder: 'Por favor, confirme sua transação para continuar',
        txSendFail: 'Você rejeitou a transação',
        txSent: 'Sua transação foi enviada para a rede',
        txStallPending:
          'Sua transação foi interrompida antes de ser enviada, por favor, tente novamente',
        txStuck: 'Sua transação está parada devido a uma lacuna de nonce',
        txPool: 'Sua transação foi iniciada',
        txStallConfirmed: 'Sua transação está parada e não foi confirmada',
        txSpeedUp: 'Sua transação foi acelerada',
        txCancel: 'Sua transação está sendo cancelada',
        txFailed: 'Sua transação falhou',
        txConfirmed: 'Sua transação foi concluída com sucesso',
        txError: 'Oops, algo deu errado, por favor, tente novamente',
        txReplaceError: 'Houve um erro ao substituir sua transação, por favor, tente novamente'
      },
      watched: {
        txPool:
          'Sua conta está {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txSpeedUp:
          'Transação de {formattedValue} {asset} {preposition} {counterpartyShortened} foi acelerada',
        txCancel:
          'Transação de {formattedValue} {asset} {preposition} {counterpartyShortened} foi cancelada',
        txConfirmed:
          'Sua conta foi {verb} {formattedValue} {asset} {preposition} {counterpartyShortened} com sucesso',
        txFailed:
          'Sua conta falhou ao {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txStuck: 'Sua transação está presa devido a uma lacuna de nonce'
      },
      time: {
        minutes: 'min',
        seconds: 'seg'
      }
    }
  },
  previous_page: 'Página anterior',
  next_page: 'Próxima página',
  items_per_page: 'Itens por página',
  page_number: 'Número de página',
  address_copied: 'Endereço copiado!',
  account_safe: 'Conta segura',
  send_feedback: 'enviar comentários',
  send_us_feedback: 'Envie-nos comentários',
  flag: 'bandeira',
  personal_info: 'Informação pessoal',
  role: 'cargo',
  country_name: 'nome do país',
  address: 'Endereço',
  day: 'dia',
  median_value: 'Valor mediano',
  metric_name: 'Nome da métrica',
  clean_form: 'Limpar formulário',
  add_contact: 'Adicionar contato',
  payment_period: 'Período de pagamento',
  receipt: 'Recibo',
  home: 'Home',
  more: 'mais',
  overview: 'visão geral',
  size: 'tamanho',
  spent_budget: 'Orçamento gasto',
  duplicate: 'duplicar',
  bypass_isp_description:
    'Se você ativar esta opção, o gerente do contrato poderá confirmar o contrato sem confirmação do ISP',
  contact_saved: 'Contate adicionado com sucesso',
  help: 'Ajuda',
  visit_help_page: 'visite a página de ajuda',
  payment_frequency: 'frequência de Pagamento',
  of: 'de',
  items: 'itens',
  pages: 'páginas',
  monthly: 'por mês',
  weekly: 'semanalmente',
  biweekly: 'quinzenal',
  log_out: 'Sair',
  connectivity: 'conectividade',
  schools_connectivity: 'Conect. das escolas',
  no_comments_added: 'Nenhum comentário adicionado',
  constant_status: {
    payment: {
      Unpaid: 'confirmado sem pagar',
      Draft: 'rascunho',
      Paid: 'pago'
    },
    contract: {
      Draft: 'rascunho',
      Sent: 'enviado',
      Confirmed: 'confirmado',
      Ongoing: 'ativo',
      Expired: 'expirado',
      Completed: 'finalizado'
    },
    connectivity: {
      Connected: 'conectada',
      PoorlyConnected: 'mal conectada',
      Disconnected: 'desconectada',
      Unknown: 'desconhecido'
    },
    notification: {
      SENT: 'nova',
      READ: 'leia'
    },
    web_transaction: {
      OK: 'Ok',
      ERROR: 'Erro'
    }
  },
  payment_status: 'status do pagamento',
  set_payment_status: 'Estabelecer o status de pagamento',
  connectivity_status_distribution: 'Distribuição do estado de conectividade',
  connectivity_quality_check: 'Verificação da qualidade da conectividade',
  mark_as_read: 'Marcar como leído',
  title: 'título',
  yesterday: 'ontem',
  today: 'hoje',
  current_delivery: 'Entrega atual',
  agreement: 'acordo',
  older: 'mais antigo',
  contract_frequency: 'Frequência do contrato',
  has_reliable_measure_data: 'Tem dados de medição confiáveis',
  schools_reliability: 'Confiabilidade das medições escolares',
  reliable: 'confiável',
  unreliable: 'não confiável',
  drag_and_drop_pdf_multiple: 'Arraste e solte o arquivo .pdf aqui ou clique para carregar',
  drag_and_drop_pdf_singular: 'Arraste e solte os arquivos .pdf aqui ou clique para carregar',
  drag_and_drop_csv_singular: 'Arraste e solte o arquivo .csv aqui ou clique para carregar',
  drag_and_drop_csv_multiple: 'Arraste e solte os arquivos .csv aqui ou clique para carregar',
  knowledge_base: 'Base de conhecimento',
  contact_information: 'informações de contato',
  education_level: 'Nível de educação',
  no_breaking_rules: 'Nenhuma regra de ruptura adicionada para este contrato',
  schools_connected_out_of: 'escolas conectadas de',
  during: 'durante',
  web3_transcations: 'Transações Automáticas',
  search_isp_contacts: 'Selecione contatos do ISP',
  search_contract_team: 'Encontre membros da equipe de contrato disponível',
  onboard_steps: {
    home: {
      account_nav_information: 'Nesta seção, você pode editar suas informações pessoais',
      notifications_popover: 'Você pode ver e administrar suas notificações',
      feedback_link: 'Aqui você pode compartilhar sua experiência com o aplicativo GIGACounts',
      language_popover: 'Aqui você pode selecionar o idioma do aplicativo',
      help_page_link: 'Aqui você pode visitar a página de ajuda',
      ask_for_help_link: 'Aqui você pode pedir ajuda'
    },
    contracts: {
      new_contract: 'Este é o botão para criar um novo contrato',
      filter: 'Aqui você pode aplicar certos filtros',
      table_container: 'Aqui você pode ver os contratos que você pode administrar'
    },
    profile: {
      wallet: 'Aqui você pode conectar sua carteira para o pagamento de contratos automáticos'
    },
    contract_detail: {
      schools: 'Aqui você pode ver a lista de escolas e monitorar o status de sua conectividade',
      payment: 'Aqui você pode exportar as faturas e adicioná -las'
    }
  },
  next: 'seguindo',
  skip: 'saltar',
  open: 'abrir',
  last: 'último',
  payment_receiver: 'Receptor de pagamento do ISP',
  table_no_data: {
    contracts: 'contrato',
    measures: 'medida',
    notifications: 'notificação',
    payments: 'pagamento',
    schools: 'escola',
    users: 'usuário',
    attachments: 'anexo',
    transactions: 'transação'
  },
  table_empty: {
    title: 'Ainda não há dados registrados',
    subtitle: 'Comece criando um {{content}} e ele ficará gravado neste espaço'
  },
  table_not_found: {
    title: 'Sua busca não retornou resultados',
    subtitle: 'Tente novamente verificar os dados corretamente ou faça uma nova pesquisa'
  },
  fedback_rating: {
    1: 'Eu me sinto insatisfeito',
    2: 'Poderia ser melhor',
    3: 'Eu gosto',
    4: 'Gosto muito',
    5: 'Eu amo isso'
  },
  education_levels: {
    high_school: 'Escola Secundária',
    primary: 'Primaria',
    secondary: 'Secundário'
  },
  payment_receiver_warning:
    'O usuário selecionado não possui uma carteira configurada. Ele não poderá receber pagamentos automáticos até que configure um em seu perfil.',
  payment_details: 'Detalhes do pagamento',
  no_wallet_address: 'Sem endereço da carteira',
  isp_contacts: 'Contatos do ISP',
  school: 'escola',
  name_spaces_error: 'O nome não pode conter espaços',
  budget_exceeds_max_error: 'O orçamento total nas escolas deve ser igual ao orçamento do contrato',
  uploaded: 'carregado',
  added_as_contact: 'adicionado como contato',
  added_as_team_member: 'adicionado como membro da equipe',
  failed_to_upload: 'não poderia ser carregado',
  failed_to_add_as_contact: 'não foi possível adicionar como contato',
  failed_to_add_as_team_member: 'não foi possível adicionar como membro da equipe',
  file_container_label_accept: 'Os tipos de arquivos compatíveis são {{accept}}',
  file_container_label_size: 'O tamanho máximo do arquivo é {{size}}mb.',
  page_error: {
    403: {
      title: 'Sem permissão',
      content:
        'A página à qual foi tentada acessar tem acesso restrito. Consulte o administrador do seu sistema.'
    },
    404: {
      title: 'Página não encontrada',
      content:
        'Sentimos isso, não conseguimos encontrar a página que você está procurando. Verifique se o URL está correto'
    },
    500: {
      title: 'Erro do Servidor Interno',
      content: 'Houve um erro. Por favor tente novamente mais tarde.'
    },
    generic: {
      title: 'Parece que houve um erro',
      content: 'Algo deu errado processando sua solicitação. Por favor, tente novamente.'
    },
    notVerified: {
      title: 'Não verificado',
      content:
        'Obrigado por preencher suas informações, um usuário da administração aprovará e verificará sua conta o mais rápido possível.',
      contentWithoutRoleAndCountry:
        'Antes que um administrador possa aprovar a criação de sua conta, ele deve concluir as seguintes informações.'
    }
  },
  widgets: {
    map: {
      title: 'Mapa escolar',
      average_latency: 'Latência média',
      average_uptime: 'Tempo médio de atividade',
      average_download_speed: 'Velocidade média de download',
      average_upload_speed: 'Velocidade média de upload',
      you_are_here: 'Você está aqui'
    },
    contract_issues: {
      title1: 'Contratos com problemas de',
      title2: '',
      no_data: 'Nenhum contrato tem problemas de SLA'
    },
    take_action: {
      title: 'Ações que exigem atenção',
      no_data: 'Não há medidas para tomar'
    },
    school_issues: {
      title1: 'Escolas com problemas de',
      title2: '',
      no_data: 'Nenhuma escola tem problemas de SLA'
    },
    upcoming_payments: {
      title: 'Próximos pagamentos',
      no_data: 'Sem pagamentos próximos'
    },
    overdue_payment: {
      title: 'Pagamentos atrasados',
      no_data: 'Sem pagamentos atrasados'
    }
  },
  daily: 'diária',
  the_file_is_downloading: 'o arquivo está baixando',
  copied_link: 'Link copiado',
  share_contract_details: 'Compartilhar detalhes do contrato',
  contract_dates: 'Datas do contrato',
  options: 'opções',
  copy_url: 'copie e compartilhe URL',
  distribute_budget_equally: 'Distribua o orçamento igualmente',
  add_external_isp_contact: 'Adicionar contato externo do ISP',
  ask_for_help: 'peça por ajuda',
  contract_period: 'período do contrato',
  tooltips: {
    SLA: {
      line1: 'Nível de qualidade de serviço contratado',
      line2: 'entre o ISP e um',
      line3: 'Criador de contratos para uma escola.'
    },
    upcoming_payments: {
      line1: 'Pagamentos não pagos',
      line2: 'e que o seu período de cobertura',
      line3: 'ainda não começou.'
    },
    overdue_payments: {
      line1: 'Pagamentos não pagos',
      line2: 'e que o seu período de cobertura',
      line3: 'acabou.'
    },
    measures_24: 'As medidas são das últimas 24 horas',
    connectivity_distribution_status: {
      line1: 'Amostra (em %) se as escolas tivessem boa conexão, ruim ou nenhuma conexão.',
      line2: 'Medido para {{número}} escolas sob o contrato,',
      line3: 'para o período de pagamento selecionado de {{dateFrom}} A {{data}}.'
    },
    connectivity_distribution_days: {
      line1:
        'Amostra (em %) se as escolas estivessem conectadas todos os dias, alguns dias ou 0 dias.',
      line2: 'Medido para {{número}}} escolas sob o contrato,',
      line3: 'para o período de pagamento selecionado de {{dateFrom}} A {{data}}.'
    },
    quality_of_service_comparison: {
      line1: 'Compara entre o QoS acordada no contrato e o QoS entregue',
      line2: 'para o período de pagamento selecionado de {{dateFrom}} A {{data}}.'
    },
    payment_status:
      'Ele permite que você decida e estabeleça um estado de pagamento. Se nada foi selecionado, o estado será estabelecido em rascunho.',
    connectivity_graph: {
      days: {
        success: '{{number}}}% escolas conectadas todos os dias',
        warning: '{{number}}}% escolas conectadas alguns dias',
        error: '{{number}}}% escolas desconectadas todos os dias',
        unknown: '{{number}}}% escolas com dados de dias conectados desconhecidos'
      },
      status: {
        success: '{{number}}}% escolas com boa conexão',
        warning: '{{number}}}% escolas com conexão ruim',
        error: '{{number}}}% escolas sem conexão',
        unknown: '{{number}}}% escolas com conexão desconhecida'
      }
    }
  },
  install: 'Instalar',
  month: 'mês',
  january: 'janeiro',
  february: 'fevereiro',
  march: 'março',
  april: 'abril',
  may: 'maio',
  june: 'junho',
  july: 'julho',
  august: 'agosto',
  september: 'setembro',
  october: 'outubro',
  november: 'novembro',
  december: 'dezembro',
  for: 'para',
  percentage_schools_connected: 'Porcentagem de escolas conectadas',
  percentage_schools_connected_by_number_of_days:
    'Porcentagem de escolas conectadas por número de dias',
  number_schools: '{{number}} escolas',
  from_date_to_date: 'de {{dateFrom}} para {{dateTo}}',
  distributed_by_percentage_of_schools: 'distribuído pela porcentagem de escolas',
  no_connection: 'sem conexão',
  bad_connection: 'conexão ruim',
  good_connection: 'boa conexão',
  unknown_data: 'dados desconhecidos',
  out_of_number_days: 'de {{number}} dias',
  out_of_number_schools: 'de {{number}} escolas',
  connected_number_days: 'conectado {{number}} dias',
  connected_every_day: 'conectado todos os dias',
  connected_1_to_number_days_out_of_max_days: 'conectado 1 a {{number}} dias em {{max}} dias',
  mark_as_reliable: 'marcar como confiável',
  mark_as_unreliable: 'marcar como não confiável',
  connectivity_distribution_by_status: 'distribuição de conectividade: por estado',
  connectivity_distribution_by_days: 'distribuição de conectividade: para dias',
  quality_of_service_comparison: 'comparación de calidad de servicio',
  none: 'Nenhum',
  pay_reciev: 'Recep. Paga.',
  reset_table: 'reiniciar tela',
  help_request_subtitle: 'Conclua sua consulta abaixo ou',
  user_approval: 'Aprovação do usuário',
  reject: 'Rejeitar',
  go_back: 'Voltar'
}

export default br
