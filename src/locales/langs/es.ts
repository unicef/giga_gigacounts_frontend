import { TranslationObject } from 'src/@types'

const es: TranslationObject = {
  demo: {
    title: `Español`,
    introduction: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  docs: {
    hi: `Hola`,
    description: `Necesitas Ayuda? \n Por favor revisa nuestra documentación.`,
    documentation: `documentación`
  },
  login: {
    signin: 'Inciar Sesión en Gigacounts',
    newuser: '¿Nuevo usuario?',
    createaccount: 'Crear una cuenta',
    auth_error: 'Credenciales no válidas'
  },
  authLoginForm: {
    forgot_password: '¿Olvidaste tú contraseña?',
    login: 'Iniciar Sesión'
  },
  accountChangePassword: {
    old_password_required: 'La contraseña anterior es requerida',
    min_password: 'La contraseña debe tener al menos 6 caracteres',
    min_password_short: 'La contraseña debe tener mínimo 6+',
    password_must_be_different: 'La nueva contraseña debe ser diferente a la anterior',
    new_password: 'Nueva contraseña',
    old_password: 'Contraseña anterior',
    match_password: 'Las contraseñas deben coincidir'
  },
  authNewPasswordForm: {
    confirm_new_password: 'confirmar nueva contraseña',
    update_password: 'Actualizar Contraseña',
    change_success: 'Cambio de contraseña correcto!'
  },
  authRegisterForm: {
    createaccount: 'Crear Cuenta'
  },
  authResetPasswordForm: {
    sendrequest: 'Enviar Solicitud'
  },
  authVerifyCodeForm: {
    success: 'Verificación con éxito!',
    verify: 'Verificar'
  },
  authWithSocial: {
    or: 'ó'
  },
  resetPassword: {
    forgot_password: '¿Olvidaste la contraseña?',
    forgot_msg:
      'Ingresa la dirección de correo electrónico asociada con tu cuenta y te enviaremos un enlace para restablecer la contraseña.',
    return_msg: 'Volver al inicio de sesión'
  },
  newPassword: {
    request_sent: '¡Solicitud enviada con éxito!',
    request_msg1: `Hemos enviado un código de confirmación de 6 dígitos a tu correo electrónico.`,
    request_msg2:
      'Ingresa el código en el cuadro a continuación para verificar tu correo electrónico.',
    no_code: `¿No tienes un código?`,
    resend: 'Reenviar código',
    return: 'Regresar a Inicio de sesión'
  },
  header: {
    need_help: '¿Necesitas Ayuda?'
  },
  register: {
    introtitle:
      'Monitorear fácilmente la conectividad y seguimiento de pagos de la conexión a internet en las escuelas',
    register: 'Registrarse en Gigacounts',
    already: '¿Ya tienes una cuenta?',
    signin: 'Iniciar Sesión',
    agreeto: 'Al registrarte, aceptas',
    terms: 'Términos de Servicio',
    and: 'y',
    privacy: 'Políticas de Privacidad'
  },
  loginLayout: {
    welcome: 'Hola, bienvenido nuevamente'
  },
  autosave: {
    saving: 'Guardando...',
    saved: 'Guardado',
    created: 'Contrato aún no creado. Ingresa un nombre de contrato para iniciar.',
    unsaved_changes: 'Tiene cambios sin guardar'
  },
  push: {
    knowledge_base_error: 'Base de conocimiento para esta página aún no implementada',
    changed_reliability: 'La confiabilidad ha cambiado para la escuela',
    changed_reliability_error: 'Ha ocurrido un error al cambiar la confiabilidad para la escuela',
    sent_feedback: 'Se ha enviado el feedback',
    sent_feedback_error: 'Ha ocurrido un error al enviar el feedback',
    sent_help_request: 'Se ha enviado una solicitud de ayuda',
    sent_help_request_error: 'Ha ocurrido un error de enviar una solicitud de ayuda',
    duplicated_contract: 'El contrato ha sido duplicado',
    duplicated_contract_error: 'Ha ocurrido un error duplicando el contrato',
    published_contract: 'El contrato ha sido publicado',
    published_contract_error: 'Ha ocurrido un error publicando el contrato',
    saved_as_draft: 'El contrato ha sido guardado como borrador',
    saved_as_draft_error: 'Ha ocurrido un error guardando el contrato como borrador',
    deleted_contract: 'El contrato ha sido eliminado.',
    deleted_contract_error: 'Ha ocurrido un error eliminando el contrato',
    approve_contract: 'El contrato ha sido aprobado',
    approve_contract_error: 'Ha ocurrido un error aprobando el contrato',
    fund_contract: 'El contrato ha sido fondeado',
    fund_contract_error: 'Ha ocurrido un error fondeando el contrato',
    fund_wallet: 'La billetera ha sido fondeado',
    fund_wallet_error: 'Ha ocurrido un error fondeando la billetera',
    approve_automatic_contract_invalid_wallet:
      'El contrato no puede ser aprobado. Verifica tener conectada una billetera y que sea la misma que verificaste en tu perfil.',
    fund_automatic_contract_invalid_wallet:
      'El contrato no puede ser fondeado. Asegúrate de tener una billetera conectada y que sea la misma que has verificado en tu perfil.',
    fund_wallet_invalid_wallet:
      'No se puede realizar la transferencia de fondos. Asegúrate de tener una billetera conectada y que sea la misma que has verificado en tu perfil.',
    fund_automatic_contract_low_balance:
      'Balance insuficiente de tokens para transferir al contrato.',
    added_payment: 'El pago ha sido agregado',
    added_payment_error: 'Ha ocurrido un error agregando el pago',
    updated_payment: 'El pago ha sido actualizado',
    updated_payment_error: 'Ha ocurrido un error actualizando el pago',
    approve_payment: 'El pago ha sido aprobado',
    approve_payment_error: 'Ha ocurrido un error aprobando el pago',
    reject_payment: 'El pago ha sido rechazado',
    reject_payment_error: 'Ha ocurrido un error rechazando el pago',
    pay_payment: 'El pago ha sido marcado como pagado',
    pay_payment_error: 'Ha ocurrido un error marcando el pago como pagado',
    approved_manually_contract: 'El contrato fue aprobado manualmente',
    approved_manually_contract_error: 'Ha ocurrido un error aprobando el contrato manualmente'
  },
  duplicate_contract: {
    title: 'Duplicar contrato',
    content: '¿Deseas duplicar el contrato seleccionado?',
    footer: 'Este contrato se creará con el estado de "Borrador"'
  },
  delete_contract: {
    title: 'Estás a punto de eliminar el contrato. Tendrás 10 minutos para recuperarlo.',
    content: '¿Estás seguro de que deseas eliminar este contrato?',
    footer: 'Puedes recuperar el contrato haciendo clic en el botón deshacer.'
  },
  approve_contract: {
    title: 'Estás a punto de aprobar el contrato.',
    content: '¿Estás seguro de que deseas aprobar este contrato?'
  },
  approve_automatic_contract: {
    title: 'Estás a punto de aprobar el contrato automático.',
    content: '¿Estás seguro de que deseas aprobar este contrato automático?'
  },
  fund_wallet: {
    title: 'Fondear Billetera',
    transfer_amount_error1: 'La monto debe ser menor o igual que el saldo de su billetera',
    info: 'Quédese atento a las solicitudes de firma de transacciones que aparecerán en su wallet, para permitir la transferencia de fondos. El proceso puede demorar varios segundos.',
    field_user_name: 'Usuario',
    field_wallet_from: 'Billetera Origen',
    field_wallet_to: 'Billetera Destino',
    field_wallet_from_balance: 'Balance actual',
    field_wallet_to_balance: 'Balance actual',
    view_in_explorer: 'Ver en explorador de blockchain'
  },
  fund_automatic_contract: {
    title: 'Estás a punto de transferir fondos al contrato automático.',
    content: '¿Estás seguro de que deseas transferir fondos a este contrato automático?',
    info: 'Quédese atento a las solicitudes de firma de transacciones que aparecerán en su wallet, para permitir la transferencia de fondos al contrato. El proceso puede demorar varios segundos. Al finalizar podrá ver las transacciones realizadas en el detalle del contrato.',
    data: 'Datos del fondeo',
    contract_current_balance: 'Balance actual del contrato',
    contract_budget: 'Presupuesto del Contrato',
    transfer_amount: 'Monto a Transferir al Contrato',
    transfer_amount_error1: 'El monto debe ser menor o igual al presupuesto del contrato',
    transfer_amount_error2:
      'El monto que se quiere transferir supera el monto pendiente de transferir'
  },
  transactions_tab: {
    detail: 'Detalle de la Transacción',
    increase_allowance: 'Increase Allowance',
    fund_contract: 'Fondeo de Contracto',
    fund_wallet: 'Fondeo de Billetera',
    transaction_hash: 'Hash Transacción',
    transaction_type: 'Tipo de Transacción',
    transaction_network: 'Red'
  },
  without_walllet: {
    title: 'no se puede proceder sin una billetera conectada y verificada',
    to_approve:
      'Para aprobar un contrato automático debes tener una billetera verificada y conectada. Por favor, configura una en tu perfil.',
    to_fund_contract:
      'Para transferir fondos a un contrato automático debes tener una billetera verificada y conectada. Por favor, configura una en tu perfil.',
    to_fund_Wallet:
      'Para transferir fondos a otra billetera debes tener una verificada y conectada. Por favor, configura una en tu perfil.'
  },
  publish_contract_modal: {
    title: 'Estás a punto de publicar el contrato.',
    content: '¿Estás seguro de que deseas publicar este contrato?'
  },
  payment_pay_modal: {
    title: 'Marque el pago como pagado',
    content:
      '¿Estás seguro de que quieres marcar este pago como pagado? Este cambio no se puede deshacer.'
  },
  contract_draft_modal: {
    title:
      '¡Su contrato se guardó como borrador! Para iniciar oficialmente el contrato es necesario publicarlo.',
    content: 'Encuentre y edite su contrato en la lista de contratos con el estado de borrador.'
  },
  contract_published_modal: {
    choose: {
      title: 'Estás a un paso de un contrato activo.',
      content:
        'Puede enviar el contrato al ISP para la firma o puede validar el contrato usted mismo.',
      primaryText: 'Enviar a ISP para la firma',
      secondaryText: 'Confirmar la firma manualmente'
    },
    send: {
      title: 'Estás a punto de enviar el contrato para la firma ISP.',
      content: 'Recibirá una notificación cuando ISP firma.',
      primaryText: 'Enviar a ISP para la firma',
      secondaryText: 'Atrás',
      disabledText:
        'El ISP debe tener un usuario registrado en el sistema, el ISP para este contrato no lo ha hecho.'
    },
    manual: {
      title: 'Estás a punto de confirmar la firma ISP.',
      content:
        'Al confirmar la firma del ISP, confirma que el ISP está bien informado y de acuerdo con los términos del contrato. Esta acción solo se puede hacer para contratos manuales.',
      primaryText: 'Confirmar la firma manualmente',
      secondaryText: 'Atrás',
      disabledText: 'Confirmar manualmente solo está disponible para contratos manuales'
    }
  },
  contract_cancel_modal: {
    title: 'Cancelar creación de contrato',
    content:
      '¿Está seguro de que desea cancelar la creación de su contrato? Su contrato será descartado.'
  },
  contract_discard_changes_modal: {
    title: 'Descartar los cambios',
    content:
      '¿Está seguro de que desea cancelar la creación de su contrato? Cualquier cambio no guardado será descartado.'
  },
  comment_section: {
    title: 'Comentarios adicionales',
    placeholder: 'Añade aquí cualquier comentario o información adicional sobre tu contrato'
  },
  contract_draft_descriptions: {
    attachments:
      'Por favor, adjunte cualquier documento relacionado con el proceso de firma del contrato que considere útil para mantener en el sistema, como acuerdos de nivel de servicio, contratos originales, etc.',
    budget:
      'En este paso se puede determinar el presupuesto total del contrato. Puede seleccionar fiat o crypto',
    schools:
      'En este paso, puede agregar las listas de escuelas que estarán cubiertas por el contrato. Luego puede seleccionar escuelas buscando manualmente o cargando un archivo csv de referencia para agregar por lotes. Una vez que agregue las escuelas, podrá personalizar el presupuesto para cada escuela.'
  },
  notifications_popover: {
    news: 'Recientes',
    you_have: 'Tienes',
    unread_messages: 'mensajes no leídos',
    before_that: 'Anteriores',
    view_all: 'Ver Todas',
    dismiss_all: 'descartar todas',
    mark_all_as_read: 'marcar todo como leído',
    empty: 'No tienes notificaciones'
  },
  upload_errors: {
    one_file: 'No puedes subir más de un archivo a la vez',
    csv: 'Solo puedes subir archivos CSV',
    pdf: 'Solo puedes subir archivos PDF',
    distinct_name: 'No puede cargar dos archivos adjuntos con el mismo nombre'
  },
  field_errors: {
    required: '{{field}} es obligatorio',
    required_plural: '{{field}} son obligtorias',
    unique: '{{field}} debe ser único',
    positive: '{{field}} debe ser positivo',
    less_than: '{{field}} debe ser menor que {{number}}',
    multiple_missing: 'Faltan campos',
    start_date: 'La fecha de inicio debe ser después de hoy',
    end_date: 'Fecha de fin debe ser posterior a Fecha de inicio',
    launch_date_min: 'Fecha de lanzamiento debe ser posterior a Fecha de inicio',
    launch_date_max: 'Fecha de lanzamiento debe ser anterior a Fecha de fin',
    is_invalid: 'es invalido'
  },
  parse_errors: {
    school_not_found: 'Escuela no encontrada en la fila',
    school_id: 'Falta el external_id de la escuela o tiene un formato incorrecto en la fila',
    school_budget_missing:
      'Falta el presupuesto de la escuela o tiene un formato incorrecto en la fila',
    school_budget_positive: 'El presupuesto de la escuela no puede ser cero o negativo en la fila'
  },
  functionalities: {
    connectivity_viewing: 'Visualización de conectividad',
    contract_creation: 'Creación de contrato',
    contract_viewing: 'Visualización de contratos',
    dashboard: 'Home',
    feedback: 'Feedback',
    help_request: 'Solicitud de ayuda',
    login: 'Iniciar sesion',
    other: 'Otra',
    payment_creation: 'Creación de pago',
    payment_viewing: 'Visualización de pagos',
    register: 'Registrarse',
    user_profile: 'Perfil del usuario',
    user_settings: 'Ajustes de usuario'
  },
  contract_creation: 'Creación de contrato',
  help_request: {
    bug: 'Reportar un error',
    feedback: 'Danos tu opinión para ayudarnos a mejorar',
    types: {
      display: 'Algo no se muestra correctamente',
      behavior: 'Algo no funciona correctamente',
      improvement: 'Me gustaría sugerir mejoras para la funcionalidad actual',
      new_feature: 'Me gustaría sugerir una nueva funcionalidad.'
    },
    other: 'otro'
  },
  functionality: 'Funcionalidad',
  ticket: {
    code: '¿Con qué podemos ayudarte?',
    type: '¿Cuál de los siguientes se adapta mejor a su reporte?',
    description: {
      placeholder:
        'Añade aquí cualquier comentario o información adicional sobre tu reporte de feedback'
    }
  },
  add_contract_details: 'Agregar detalles del contrato',
  add_budgets_and_schools: 'Agregar presupuestos y escuelas',
  add_the_total_budget:
    'Agregue el presupuesto total para el contrato.Puede seleccionar en moneda fiduciaria o criptográfica.',
  total_budget_of_the_contract: 'Presupuesto total del contrato',
  schools_list: 'Lista de escuelas',
  add_the_list_of_schools:
    'Agregue la lista de escuelas que estarán cubiertas por este contrato.Puede seleccionar manualmente escuelas o cargar un archivo CSV de referencia.Una vez que agregue las escuelas, puede personalizar el presupuesto a cada escuela.',
  to_link_schools: `Para vincular las escuelas con el contrato más rápido, puede subir una lista de identificaciones escolares.
  Descargue esta `,
  quality_of_service_terms: 'Términos de calidad de servicio',
  add_the_terms_agreed: 'Agregue los términos acordados entre usted y el ISP en el contrato.',
  contract_breaking_rules: 'Reglas de ruptura de contrato',
  add_rules_and_guidelines:
    'Agregue reglas y directrices a seguir cuando los ISP no cumplan los términos del contrato.',
  payment_settings: 'Configuración de pago',
  add_payment_frequency: 'Agregue la frecuencia de pago para este contrato.',
  payment_interval: 'Intervalo de pago',
  add_contract_terms: 'Agregar términos del contrato',
  review_and_save: 'Revisar y guardar',
  contract_team: 'Equipo de contrato',
  documents_and_attachments: 'Documentos y archivos adjuntos',
  add_any_document: 'Agregue cualquier documento relacionado con este contrato',
  add_the_general_details: 'Agregue los detalles del contrato general',
  add_the_contract_managers: 'Agregar gerentes de contrato, monitores de contrato y otros',
  publish_error: 'No se puede publicar',
  government_behalf: 'Government behalf',
  metrics: 'Métricas',
  uploaded_with_errors: 'Subido con errores',
  upload_error: 'Error al subir',
  yes: 'sí',
  no: 'no',
  undo: 'deshacer',
  password: `contraseña`,
  email: `correo electrónico`,
  email_address: `dirección de correo`,
  code_required: 'Código Requerido',
  email_valid: 'El correo debe ser una dirección de correo válida',
  password_required: 'La contraseña es requerida',
  confirm_password_required: 'La confirmación de la contraseña es requerida',
  email_required: 'El correo es requerido',
  first_name: 'nombre',
  last_name: 'apellido',
  first_name_required: 'Nombre es requerido',
  last_name_required: 'Apellido es requerido',
  app: `app`,
  user: `usuario`,
  list: `lista`,
  edit: `Editar`,
  clear: 'deshacer',
  delete: 'Eliminar',
  shop: `shop`,
  blog: `blog`,
  post: `post`,
  mail: `mail`,
  chat: `chat`,
  cards: `cards`,
  posts: `posts`,
  create: `crear`,
  kanban: `kanban`,
  general: `general`,
  banking: `banking`,
  booking: `booking`,
  profile: `profile`,
  account: `cuenta`,
  product: `product`,
  details: `details`,
  checkout: `checkout`,
  calendar: `calendar`,
  analytics: `analytics`,
  ecommerce: `e-commerce`,
  management: `management`,
  contracts: `contratos`,
  payment: 'pago',
  payments: 'pagos',
  payments_log: 'registro de pagos',
  automatic_contracts: 'contratos automáticos',
  automatic_contracts_list: 'lista de contratos automáticos',
  automatic_contracts_check_info:
    'Este es un contrato automático, por lo que los pagos se gestionarán automáticamente mediante un contrato inteligente.',
  invoice: `factura`,
  invoices: `facturas`,
  workflows: `workflows`,
  description: `descripción`,
  other_cases: `other cases`,
  item_by_roles: `item by roles`,
  only_admin_can_see_this_item: `Only admin can see this item`,
  dashboard: 'dashboard',
  search_country: 'Buscar país para mostrar datos',
  users: 'usuarios',
  settings: 'ajustes',
  account_settings: 'ajustes de cuenta',
  payments_list: 'lista de pagos',
  users_list: 'lista de usuarios',
  contracts_list: 'lista de contratos',
  filter: 'Filtrar',
  change_lang: 'Cambiar idioma',
  notifications: 'Notificaciones',
  all: 'todo',
  name: 'nombre',
  status: 'estado',
  isp: 'isp',
  region: 'region',
  lta_name: 'nombre de lta',
  generated: 'generado',
  add_an_isp: 'Agregar ontactos del ISP',
  add_a_team_member: 'Agregar un miembro del equipo de contrato',
  add_team_member: 'Agregar miembro del equipo',
  team_member_saved: 'Miembro del equipo guardado',
  enable_bypass: 'habilitar la confirmación de ISP de derivación',
  important: 'importante',
  add_a_contract_launch_day:
    'agregue la fecha de lanzamiento de un contrato (si la fecha de lanzamiento es diferente a la fecha de inicio, agregue aquí)',
  link_schools:
    'enlace las escuelas más rápido cargando una lista de identificaciones y presupuestos escolares',
  breaking_rules: 'contrato de reglas de ruptura',
  enter_all_breaking: 'ingrese todas las reglas de ruptura para este contrato',
  enter_the_payment: 'ingrese los detalles de pago de este contrato',
  accept_the_terms: 'acepto los términos y condiciones de crear un contrato.',
  dense: 'denso',
  update_success: 'Actualización exitosa!',
  save_changes: 'Guardar Cambios',
  contract_details: 'Detalles del contrato',
  contract_name: 'Nombre del contrato',
  contract_id: 'ID del contrato',
  start_date: 'Fecha de inicio',
  end_date: 'Fecha de fin',
  date_from: 'Fecha desde',
  date_to: 'Fecha hasta',
  launch_date: 'Fecha de lanzamiento',
  umbrella: 'Umbrella',
  quality_of_service: 'Calidad del servicio',
  uptime: 'Tiempo de actividad',
  latency: 'Latencia',
  download_speed: 'Velocidad de descarga',
  upload_speed: 'Velocidad de subida',
  attachments: 'Archivos adjuntos',
  main_info: 'Informacion principal',
  lta: 'Acuerdo a largo plazo',
  valid_through: 'Valido hasta',
  internet_provider: 'Proveedor de internet',
  upload: 'Subir',
  other_users: 'Otros usuarios',
  schools_and_budget: 'Escuelas y presupuesto',
  schools_list_budget: 'Lista de escuelas y asignación de presupuesto',
  schools: 'Escuelas',
  stakeholders_and_collaborators: 'Stakeholders & colaboradores',
  stakeholders: 'Stakeholders',
  final_review: 'Revisión final',
  back: 'volver',
  save: 'guardar',
  as: 'como',
  continue: 'continuar',
  finish: 'Finalizar',
  cancel: 'Cancelar',
  contract: 'contrato',
  contract_type: 'tipo de contrato',
  new: 'nuevo',
  add: 'agregar',
  partners: 'socios',
  export: 'exportar',
  and: 'y',
  upload_csv: 'Subir un archivo csv',
  download_csv: 'Puede descargar',
  upload_reference: 'Subir archivo de referencia',
  upload_relevant: 'Subir documentos relevantes',
  upload_files: 'Subir archivo',
  search_and_add_schools: 'Buscar y agregar escuelas',
  publish_and_send_to_isp: 'publicar & enviar a isp',
  publish_contract: 'publicar contrato',
  create_another_contract: 'crear otro contrato',
  view_contract: 'ver contrato',
  currency: 'divisa',
  budget: 'presupuesto',
  search: 'Buscar',
  read: 'leer',
  delete_confirm_item: '¿Estás seguro que deseas borrar?',
  delete_confirm_items: '¿Estás seguro que deseas borrar <strong>{{number}}</strong> elementos?',
  section: 'sección',
  no_collaborators_added: 'No hay colaboradores añadidos.',
  no_attachments_added: 'No se agregaron archivos adjuntos.',
  see_all_schools: 'Ver todas las escuelas',
  number_of_schools: 'Cant. escuelas',
  message: 'mensaje',
  date: 'fecha',
  collaborators: 'colaboradores',
  no_data: 'No hay datos',
  total_budget: 'presupuesto total',
  the_users: 'Los usuarios que agregue se mostrarán en esta sección',
  add_users: 'añadir usuarios',
  phone_number: 'número de teléfono',
  exceeds_budget_error: 'el presupuesto total no es lo mismo que el presupuesto del contrato',
  contract_budget: 'presupuesto del contrato',
  publish: 'Publicar',
  period: 'período',
  from: 'de',
  to: 'para',
  change: 'cambiar',
  print: 'imprimir',
  send: 'enviar',
  share: 'compartir',
  mark_as_paid: 'marcar como pago',
  mark_as_unpaid: 'marcar como no pago',
  close: 'cerrar',
  service_type: 'Tipo de servicio',
  search_user: 'Buscar usuario...',
  total: 'Total',
  verified: 'Verificado',
  pending: 'Pendiente',
  rejected: 'Rechazado',
  new_payment: 'nuevo pago',
  client: 'Cliente',
  due: 'Pendiente',
  amount: 'Monto',
  view_connectivity: 'Ver conectividad',
  view_payments: 'Ver pagos',
  view_payment: 'Ver pago',
  view: 'Ver',
  download: 'descargar',
  add_payment: 'Agregar pago',
  update_payment: 'Actualizar pago',
  payment_detail: 'Detalles del pago',
  approve: 'Aprobar',
  fund: 'Fondear',
  funds: 'Fondos',
  cashback: 'Reembolso',
  discount: 'Descuento',
  decline: 'Rechazar',
  find_the_invoice:
    'Adjunte la factura aquí. Recuerda que este es un documento legal que respalda el pago creado.',
  find_the_receipt:
    'Adjunte el recibo aquí. Recuerde que este es un documento legal que respalda que el pago se realizó con éxito.',
  payment_cancel_modal: {
    title: 'Cancelar creación de pago',
    content: '¿Está seguro de que desea cancelar la creación de su pago? Su pago será descartado.'
  },
  payment_created_modal: {
    title: '¡Su pago fue creado con éxito!',
    content: 'Encuentre su pago en la lista de pagos'
  },
  payment_updated_modal: {
    title: '¡Su pago fue actualizado con éxito!',
    content: 'Encuentre su pago en la lista de pagos'
  },
  payment_approve_modal: {
    title: 'Aprobación de pago',
    content: '¿Estás seguro de que quieres aprobar este pago?'
  },
  payment_reject_modal: {
    title: 'Rechazo de pago',
    content: '¿Está seguro de que desea rechazar este pago?'
  },
  country: 'país',
  no_schools_for_selected_country: 'There are no schools for the selected country',
  schools_equal_or_above_average: 'Escuelas iguales o encima del promedio',
  schools_below_average: 'Escuelas debajo del promedio',
  schools_without_connection: 'Escuelas sin conexión',
  qos_summary: 'Resumen de la calidad del servicio',
  qos_description:
    'En esta sección puedes ver la calidad del servicio que brinda el proveedor de internet para la escuela seleccionada categorizada por periodo y tipo de métrica',
  very_weak_connection: 'conexión muy débil',
  weak_connection: 'conexión débil',
  strong_connection: 'conexión fuerte',
  strong: 'fuerte',
  weak: 'débil',
  very_weak: 'muy débil',
  connectivity_list: 'lista de conectividad',
  connection: 'conexión',
  location: 'ubicación',
  no_available_payments: 'No hay pagos disponibles para este contrato',
  currency_type: 'Tipo de divisa',
  contact: 'contacto',
  other: 'otro',
  automatic: 'Automático',
  forgot_password: 'Olvide mi contraseña',
  wallet: {
    switch_subtitle:
      'Al activar este interruptor, se puede configurar una billetera y en el menú principal estará disponible una nueva opción, para ver los contratos automáticos.',
    switch_update_msg_ok: 'Guardado',
    switch_update_msg_error: 'Error al guardar la configuración',
    label: 'Billetera',
    copied: '¡Copiado!',
    copy_wallet: 'Copiar dirección de billetera',
    view_explorer: 'Ver en Blockchain Explorer',
    attached_wallet: 'Billetera asociada',
    wallet_explain_1:
      'Esta billetera se usará para firmar las transacciones, crear un contrato automático y administrar el presupuesto en la plataforma. Instale ',
    metamask: 'MetaMask',
    wallet_explain_2:
      'plugin en su navegador y actualice la página. Asegúrese de haber iniciado sesión o cree una nueva cuenta de MetaMask. Alternativamente, puede conectar su billetera con',
    wallet_connect: 'Billetera Conectada',
    wallet_metamask: 'Billetera MetaMask',
    wallet_trust: 'Billetera Trust',
    wallet_coinbase: 'Billetera Coinbase',
    connect: 'Conectar',
    disconnect: 'Desconectar',
    wallet_not_verified: 'Billetera no verificada',
    wallet_verified: 'Billetera verificada',
    wallet_connected: 'Billetera conectada',
    verify_msg_error: 'Error al verificar la billetera',
    verify_msg_error_already_Attached: 'La billetera elegida está asociada a otro usuario',
    connect_msg_error: 'Error al conectar la billetera',
    verify: 'Verificar billetera conectada',
    verify_msg: 'La billetera conectada no coincide con su billetera verificada en Gigacounts.',
    verify_msg_choose:
      'Verificar billetera conectada o elige WALLET_ADDRESS en tu proveedor de billetera.',
    verify_msg_choose_wtihout_wallet: 'La billetera conectada no está verificada en Gigacounts.',
    gigacounts_crypto_balance: 'Saldo criptográfico de Gigacounts',
    wallet_this_is: 'Esto es un',
    gnosis_explain_1:
      'que se comparte con todos los usuarios administradores. Para depositar fondos en su Gnosis-Safe',
    gnosis_instructions: 'sigue éstas instrucciones',
    gnosis_label: 'Cuenta segura',
    address_not_set: 'Address no configurada',
    automatic_contracts: 'Contratos automáticos',
    automatic_enabled: 'on',
    automatic_disabled: 'off',
    network_supported: 'Red compatible',
    network_unsupported: 'Red no compatible'
  },
  role_base_guard: {
    permission_denied: 'Permiso denegado',
    without_permission: 'No tienes permiso para acceder a esta página'
  },
  wallet_external_component: {
    connect: {
      selectingWallet: {
        header: 'Billeteras disponibles',
        sidebar: {
          heading: '',
          subheading: 'Conecta tu billetera',
          paragraph:
            'Conectar tu billetera es como iniciar sesión en Web3. Selecciona tu billetera de las opciones para comenzar.',
          IDontHaveAWallet: 'No tengo una billetera'
        },
        recommendedWalletsPart1: '{app} solo es compatible con',
        recommendedWalletsPart2:
          'en esta plataforma. Por favor, utiliza o instala una de las billeteras compatibles para continuar',
        installWallet:
          'No tienes instalada ninguna billetera compatible con {app}, por favor, utiliza una billetera compatible',
        agreement: {
          agree: 'Acepto los',
          terms: 'Términos y Condiciones',
          and: 'y',
          privacy: 'Política de Privacidad'
        },
        whyDontISeeMyWallet: '¿Por qué no veo mi billetera?',
        learnMore: 'Haz clic aquí para obtener más información'
      },
      connectingWallet: {
        header:
          '{connectionRejected, select, false {Conectando a {wallet}...} other {Conexión Rechazada}}',
        sidebar: {
          subheading: 'Aprobar Conexión',
          paragraph:
            'Por favor, aprueba la conexión en tu billetera y autoriza el acceso para continuar.'
        },
        mainText: 'Conectando...',
        paragraph: 'Asegúrate de seleccionar todas las cuentas a las que deseas otorgar acceso.',
        previousConnection:
          '{wallet} ya tiene una solicitud de conexión pendiente, por favor, abre la aplicación de {wallet} para iniciar sesión y conectar.',
        rejectedText: '¡Conexión Rechazada!',
        rejectedCTA: 'Haz clic aquí para intentarlo de nuevo',
        primaryButton: 'Volver a las billeteras'
      },
      connectedWallet: {
        header: 'Conexión Exitosa',
        sidebar: {
          subheading: '¡Conexión Exitosa!',
          paragraph: 'Tu billetera ahora está conectada a {app}'
        },
        mainText: 'Conectado'
      }
    },
    modals: {
      actionRequired: {
        heading: 'Acción requerida en {wallet}',
        paragraph: 'Por favor, cambia la cuenta activa en tu billetera.',
        linkText: 'Más información.',
        buttonText: 'Aceptar'
      },
      switchChain: {
        heading: 'Cambiar Cadena',
        paragraph1:
          '{app} requiere que cambies tu billetera a la red {nextNetworkName} para continuar.',
        paragraph2:
          '*Algunas billeteras pueden no admitir el cambio de redes. Si no puedes cambiar de red en tu billetera, considera cambiar a una billetera diferente.'
      },
      confirmDisconnectAll: {
        heading: 'Desconectar todas las Billeteras',
        description: '¿Estás seguro de que quieres desconectar todas tus billeteras?',
        confirm: 'Confirmar',
        cancel: 'Cancelar'
      },
      confirmTransactionProtection: {
        heading: 'Activar Protección de Transacción',
        description:
          'La protección de puntos finales RPC oculta tus transacciones de bots de adelantamiento y de sandwich para reducir la liquidación desfavorable de transacciones debido al deslizamiento.',
        enable: 'Activar',
        dismiss: 'Cerrar'
      }
    },
    accountCenter: {
      connectAnotherWallet: 'Conectar otra Billetera',
      disconnectAllWallets: 'Desconectar todas las Billeteras',
      currentNetwork: 'Red Actual',
      enableTransactionProtection: 'Activar Protección de Transacción',
      appInfo: 'Información de la Aplicación',
      learnMore: 'Aprender más',
      gettingStartedGuide: 'Guía de Inicio',
      smartContracts: 'Contratos Inteligentes',
      explore: 'Explorar',
      poweredBy: 'proporcionado por',
      addAccount: 'Agregar Cuenta',
      setPrimaryAccount: 'Establecer Cuenta Principal',
      disconnectWallet: 'Desconectar Billetera',
      copyAddress: 'Copiar dirección de billetera'
    },
    notify: {
      transaction: {
        txRequest: 'Tu transacción está esperando tu confirmación',
        nsfFail: 'No tienes suficientes fondos para esta transacción',
        txUnderpriced:
          'El precio del gas para tu transacción es demasiado bajo, intenta con un precio de gas más alto',
        txRepeat: 'Esta podría ser una transacción repetida',
        txAwaitingApproval: 'Tienes una transacción anterior esperando tu confirmación',
        txConfirmReminder: 'Por favor, confirma tu transacción para continuar',
        txSendFail: 'Has rechazado la transacción',
        txSent: 'Tu transacción ha sido enviada a la red',
        txStallPending:
          'Tu transacción se ha detenido antes de ser enviada, por favor inténtalo de nuevo',
        txStuck: 'Tu transacción está atascada debido a una brecha de nonce',
        txPool: 'Tu transacción ha comenzado',
        txStallConfirmed: 'Tu transacción se ha detenido y no ha sido confirmada',
        txSpeedUp: 'Tu transacción ha sido acelerada',
        txCancel: 'Tu transacción se está cancelando',
        txFailed: 'Tu transacción ha fallado',
        txConfirmed: 'Tu transacción ha tenido éxito',
        txError: 'Ups, algo salió mal, por favor inténtalo de nuevo',
        txReplaceError: 'Hubo un error al reemplazar tu transacción, por favor inténtalo de nuevo'
      },
      watched: {
        txPool: 'Tu cuenta {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txSpeedUp:
          'La transacción de {formattedValue} {asset} {preposition} {counterpartyShortened} se ha acelerado',
        txCancel:
          'La transacción de {formattedValue} {asset} {preposition} {counterpartyShortened} se ha cancelado',
        txConfirmed:
          'Tu cuenta se ha {verb} exitosamente {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txFailed:
          'Tu cuenta no pudo {verb} {formattedValue} {asset} {preposition} {counterpartyShortened}',
        txStuck: 'Tu transacción está atascada debido a una brecha de nonce'
      },
      time: {
        minutes: 'min',
        seconds: 'seg'
      }
    }
  },
  previous_page: 'Pagina anterior',
  next_page: 'Siguiente página',
  items_per_page: 'Items por página',
  page_number: 'Número de página',
  address_copied: '¡Dirección copiada!',
  account_safe: 'Cuenta segura',
  send_feedback: 'Enviar feedback',
  send_us_feedback: 'Envianos feedback',
  flag: 'bandera',
  personal_info: 'Información personal',
  role: 'rol',
  country_name: 'nombre del país',
  address: 'dirección',
  day: 'día',
  median_value: 'Valor medio',
  metric_name: 'Nombre de la métrica',
  clean_form: 'Limpiar formulario',
  add_contact: 'Agregar contacto',
  payment_period: 'Periodo de pago',
  receipt: 'Recibo',
  home: 'Inicio',
  more: 'más',
  overview: 'descripción general',
  size: 'tamaño',
  spent_budget: 'Presupuesto gastado',
  duplicate: 'duplicar',
  bypass_isp_description:
    'Si activa esta opcion, el gerente de contrato podrá confirmar el contrato sin confirmación de ISP',
  contact_saved: 'Contacto guardado con éxito',
  help: 'Ayuda',
  visit_help_page: 'visite la página de ayuda',
  payment_frequency: 'frecuencia de pago',
  of: 'de',
  items: 'items',
  pages: 'páginas',
  monthly: 'mensual',
  weekly: 'semanalmente',
  biweekly: 'quincenal',
  log_out: 'Cerrar sesión',
  connectivity: 'conectividad',
  schools_connectivity: 'Conect. de las escuelas',
  no_comments_added: 'No se agregaron comentarios',
  constant_status: {
    payment: {
      Unpaid: 'confirmado sin pagar',
      Draft: 'borrador',
      Paid: 'pagado'
    },
    contract: {
      Draft: 'borrador',
      Sent: 'enviado',
      Confirmed: 'confirmado',
      Ongoing: 'en curso',
      Expired: 'expirado',
      Completed: 'terminado'
    },
    connectivity: {
      Connected: 'conectada',
      PoorlyConnected: 'Mal conectada',
      Disconnected: 'desconectada',
      Unknown: 'desconocida'
    },
    notification: {
      SENT: 'nueva',
      READ: 'leída'
    },
    web_transaction: {
      OK: 'Ok',
      ERROR: 'Error'
    }
  },
  payment_status: 'estado de pago',
  set_payment_status: 'Establecer el estado de pago',
  connectivity_status_distribution: 'Distribución del estado de conectividad',
  connectivity_quality_check: 'Verificación de calidad de conectividad',
  mark_as_read: 'Marcar como leído',
  title: 'título',
  yesterday: 'ayer',
  today: 'hoy',
  current_delivery: 'entrega actual',
  agreement: 'acuerdo',
  older: 'más antiguo',
  contract_frequency: 'frecuencia de contrato',
  has_reliable_measure_data: 'Tiene datos de medida confiables',
  schools_reliability: 'Confiabilidad de las mediciones de las escuelas',
  reliable: 'confiable',
  unreliable: 'poco confiable',
  drag_and_drop_pdf_multiple: 'Arrastre y suelte el archivo .pdf aquí o haga clic para cargar',
  drag_and_drop_pdf_singular: 'Arrastre y suelte los archivos .pdf aquí o haga clic para cargar',
  drag_and_drop_csv_singular: 'Arrastre y suelte el archivo .csv aquí o haga clic para cargar',
  drag_and_drop_csv_multiple: 'Arrastre y suelte los archivos .csv aquí o haga clic para cargar',
  knowledge_base: 'Base de conocimiento',
  contact_information: 'Información del contacto',
  education_level: 'Nivel de Educación',
  no_breaking_rules: 'No se agregaron reglas de ruptura para este contrato',
  schools_connected_out_of: 'escuelas conectadas de',
  during: 'durante',
  web3_transcations: 'Transactiones Automáticas',
  search_isp_contacts: 'Seleccionar contactos ISP',
  search_contract_team: 'Buscar miembros del equipo de contrato disponibles',
  onboard_steps: {
    home: {
      account_nav_information: 'En esta sección puede editar su información personal',
      notifications_popover: 'Puede ver y administrar sus notificaciones',
      feedback_link: 'Aquí puede compartir su experiencia con la aplicación GIGACounts',
      language_popover: 'Aquí puede seleccionar el idioma de la aplicación',
      help_page_link: 'Aquí puede visitar la página de ayuda',
      ask_for_help_link: 'Aquí puedes pedir ayuda'
    },
    contracts: {
      new_contract: 'Este es el botón para crear un nuevo contrato',
      filter: 'Aquí puede aplicar ciertos filtros',
      table_container: 'Aquí puede ver los contratos que puede administrar'
    },
    profile: {
      wallet: 'Aquí puede conectar su billetera para el pago de contratos automáticos'
    },
    contract_detail: {
      schools: 'Aquí puede ver la lista de escuelas y monitorear el estado de su conectividad',
      payment: 'Aquí puede exportar las facturas y agregarlas'
    }
  },
  next: 'siguiente',
  skip: 'saltar',
  open: 'abrir',
  last: 'último',
  payment_receiver: 'Receptor de pago de ISP',
  table_no_data: {
    contracts: 'contrato',
    measures: 'medida',
    notifications: 'notificacion',
    payments: 'pago',
    schools: 'escuela',
    users: 'usuario',
    attachments: 'adjunto',
    transactions: 'transacción'
  },
  table_empty: {
    title: 'Aún no hay datos registrados',
    subtitle: 'Comienza creando un {{content}} y quedará registrado en este espacio'
  },
  table_not_found: {
    title: 'Su búsqueda no produjo resultados',
    subtitle: 'Intenta nuevamente verificando los datos correctamente o realiza una nueva búsqueda'
  },
  fedback_rating: {
    1: 'Me siento insatisfecho',
    2: 'Podría ser mejor',
    3: 'Me gusta',
    4: 'Me gusta mucho',
    5: 'Me encanta'
  },
  education_levels: {
    high_school: 'Escuela secundaria',
    primary: 'Primaria',
    secondary: 'Secundaria'
  },
  payment_receiver_warning:
    'El usuario seleccionado no tiene una billetera configurada. No podrá recibir los pagos automáticos hasta que configure una en su perfil.',
  payment_details: 'Detalles del pago',
  no_wallet_address: 'Sin dirección de billetera',
  isp_contacts: 'Contactos ISP',
  school: 'escuela',
  name_spaces_error: 'El nombre no puede contener espacios',
  budget_exceeds_max_error:
    'El presupuesto total en las escuelas debe ser igual al presupuesto de contrato',
  uploaded: 'cargado',
  added_as_contact: 'agregado como contacto',
  added_as_team_member: 'agregado como miembro del equipo',
  failed_to_upload: 'no se pudo subir',
  failed_to_add_as_contact: 'no se pudo agregar como contacto',
  failed_to_add_as_team_member: 'no se pudo agregar como miembro del equipo',
  file_container_label_accept: 'Los tipos de archivos compatibles son {{accept}}',
  file_container_label_size: 'El tamaño del archivo máximo es {{size}}mb.',
  daily: 'a diario',
  page_error: {
    403: {
      title: 'Sin autorización',
      content:
        'La página a la que se intentó acceder tiene acceso restringido. Consulte al administrador de su sistema.'
    },
    404: {
      title: 'La página no se encuentra',
      content:
        'Lo sentimos, no pudimos encontrar la página que está buscando. Asegúrese de que la URL es correcta'
    },
    500: {
      title: 'Error Interno del Servidor',
      content: 'Hubo un error. Intente nuevamente más tarde.'
    },
    generic: {
      title: 'Parece que hubo un error',
      content: 'Algo salió mal procesando su solicitud. Inténtelo de nuevo.'
    }
  },
  widgets: {
    map: {
      title: 'Mapa de escuelas',
      average_latency: 'Latencia media',
      average_uptime: 'Tiempo de actividad promedio',
      average_download_speed: 'Velocidad de descarga promedio',
      average_upload_speed: 'Velocidad de carga promedio',
      you_are_here: 'Usted está aquí'
    },
    contract_issues: {
      title1: 'Contratos con problemas de',
      title2: '',
      no_data: 'Ningún contrato tiene problemas de SLA'
    },
    take_action: {
      title: 'Acciones que requieren atención',
      no_data: 'No hay medidas a tomar'
    },
    school_issues: {
      title1: 'Escuelas con problemas de',
      title2: '',
      no_data: 'Ninguna escuelas tiene problemas de SLA'
    },
    upcoming_payments: {
      title: 'Próximos pagos',
      no_data: 'Sin pagos próximos'
    },
    overdue_payment: {
      title: 'Pagos atrasados',
      no_data: 'Sin pagos atrasados'
    }
  },
  the_file_is_downloading: 'el archivo se esta descargando',
  copied_link: 'enlace copiado',
  share_contract_details: 'Compartir detalles del contrato',
  contract_dates: 'Fechas del contrato',
  options: 'opciones',
  copy_url: 'copiar y compartir URL',
  distribute_budget_equally: 'Distribuir el presupuesto por igual',
  add_external_isp_contact: 'Agregar contacto externo de ISP',
  ask_for_help: 'pedir ayuda',
  contract_period: 'período de contrato',
  tooltips: {
    SLA: {
      line1: 'Nivel de calidad de servicio contratado',
      line2: 'entre el ISP y un',
      line3: 'Creador de contrato para una escuela.'
    },
    upcoming_payments: {
      line1: 'Pagos no pagados',
      line2: 'y que su período de cobertura',
      line3: 'aún no ha comenzado.'
    },
    overdue_payments: {
      line1: 'Pagos no pagados',
      line2: 'y que su período de cobertura',
      line3: 'ha terminado.'
    },
    measures_24: 'Las medidas son de las últimas 24 horas',
    connectivity_distribution_status: {
      line1: 'Muestra (en %) si las escuelas tenían conexión buena, mala o ninguna conexión.',
      line2: 'Medido para {{number}} escuelas bajo el contrato,',
      line3: 'para el período de pago seleccionado de {{dateFrom}} a {{dato}}.'
    },
    connectivity_distribution_days: {
      line1:
        'Muestra (en %) si las escuelas estaban conectadas todos los días, algunos días o 0 días.',
      line2: 'Medido para {{number}}} escuelas bajo el contrato,',
      line3: 'para el período de pago seleccionado de {{dateFrom}} a {{dato}}.'
    },
    quality_of_service_comparison: {
      line1: 'Se compara entre el QoS acordado en el contrato y el QoS entregado',
      line2: 'para el período de pago seleccionado de {{dateFrom}} a {{dato}}.'
    },
    payment_status:
      'Le permite decidir y establecer un estado de pago. Si no se selecciona nada, el estado se establecerá en borrador.',
    connectivity_graph: {
      days: {
        success: '{{number}}}% escuelas conectadas todos los días',
        warning: '{{number}}}% escuelas conectadas algunos días',
        error: '{{number}}}% escuelas desconectadas todos los días',
        unknown: '{{number}}}% escuelas con datos de días conectados desconocido'
      },
      status: {
        success: '{{number}}}% escuelas con buena conexión',
        warning: '{{number}}}% escuelas con mala conexión',
        error: '{{number}}}% escuelas sin conexión',
        unknown: '{{number}}}% escuelas con estado de conexión desconocidos'
      }
    }
  },
  install: 'instalar',
  month: 'mes',
  january: 'enero',
  february: 'febrero',
  march: 'marzo',
  april: 'abril',
  may: 'mayo',
  june: 'junio',
  july: 'julio',
  august: 'agosto',
  september: 'septiembre',
  october: 'octubre',
  november: 'noviembre',
  december: 'diciembre',
  for: 'para',
  percentage_schools_connected: 'Porcentaje de escuelas conectadas',
  percentage_schools_connected_by_number_of_days:
    'Porcentaje de escuelas conectadas por número de días',
  number_schools: '{{number}} escuelas',
  from_date_to_date: 'desde {{dateFrom}} hasta {{dateTo}}',
  distributed_by_percentage_of_schools: 'distribuido por porcentaje de escuelas',
  no_connection: 'sin conexión',
  bad_connection: 'mala conexión',
  good_connection: 'buena conexión',
  unknown_data: 'datos desconocidos',
  out_of_number_days: 'de {{number}} días',
  out_of_number_schools: 'de {{number}} escuelas',
  connected_number_days: 'conectado {{number}} días',
  connected_every_day: 'conectado todos los días',
  connected_1_to_number_days_out_of_max_days: 'conectado 1 a {{number}} días de {{max}} días',
  mark_as_reliable: 'marcar como confiable',
  mark_as_unreliable: 'marcar como poco confiable',
  connectivity_distribution_by_status: 'distribución de conectividad: por estado',
  connectivity_distribution_by_days: 'distribución de conectividad: por días',
  quality_of_service_comparison: 'comparación de calidad de servicio',
  none: 'Ninguna',
  pay_reciev: 'Recep. Pago.',
  reset_table: 'reiniciar tabla',
  help_request_subtitle: 'Complete su consulta a continuación o'
}

export default es
