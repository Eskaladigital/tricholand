// ============================================
// Internacionalización de emails — Tricholand
// Los emails al ADMIN siempre van en español.
// Los emails al CLIENTE van en su idioma (locale del pedido/contacto).
// Idiomas soportados: es, en, de, fr, it, nl, pt
// ============================================

export type EmailLocale = 'es' | 'en' | 'de' | 'fr' | 'it' | 'nl' | 'pt'

const SUPPORTED_LOCALES: EmailLocale[] = ['es', 'en', 'de', 'fr', 'it', 'nl', 'pt']

/** Normaliza un locale string a uno soportado, fallback a 'es' */
export function resolveLocale(locale?: string | null): EmailLocale {
  if (!locale) return 'es'
  const short = locale.substring(0, 2).toLowerCase()
  return SUPPORTED_LOCALES.includes(short as EmailLocale) ? (short as EmailLocale) : 'es'
}

/** Locale para Intl.NumberFormat */
export const intlLocaleMap: Record<EmailLocale, string> = {
  es: 'es-ES',
  en: 'en-GB',
  de: 'de-DE',
  fr: 'fr-FR',
  it: 'it-IT',
  nl: 'nl-NL',
  pt: 'pt-PT',
}

/** Formato de moneda según locale */
export function formatCentsLocalized(cents: number, locale: EmailLocale = 'es'): string {
  return new Intl.NumberFormat(intlLocaleMap[locale], { style: 'currency', currency: 'EUR' }).format(cents / 100)
}

/** Formato de fecha según locale */
export function formatDateLocalized(date: string | Date, locale: EmailLocale = 'es'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(intlLocaleMap[locale], { year: 'numeric', month: 'long', day: 'numeric' })
}

/** Formato de fecha+hora según locale */
export function formatDateTimeLocalized(date: string | Date, locale: EmailLocale = 'es'): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString(intlLocaleMap[locale], { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// ============================================
// TRADUCCIONES
// ============================================

interface EmailTranslations {
  // Layout
  layoutSubtitle: string
  layoutFooterAuto: string

  // Subjects (asuntos de email)
  subjectOrderReceived: string     // "Tu solicitud de pedido {order} — Tricholand"
  subjectContactReceived: string   // "Hemos recibido tu consulta — Tricholand"
  subjectPaymentReady: string      // "Pedido {order} validado — Ya puedes pagar | Tricholand"
  subjectPaymentConfirmed: string  // "Pago confirmado — Pedido {order} | Tricholand"

  // orderClientEmail
  orderReceived: string
  orderNumber: string
  orderHello: string
  orderConfirmation: string
  orderSummary: string
  orderSubtotalNote: string
  orderQuestion: string
  orderThanks: string
  subtotalEstimated: string
  orderProfessionalConditions: string

  // contactClientEmail
  contactReceived: string
  contactHello: string
  contactConfirmation: string
  contactYourMessage: string
  contactAddMore: string
  contactThanks: string

  // paymentEmail
  paymentValidated: string
  paymentHello: string
  paymentBody: string
  paymentBreakdown: string
  paymentSubtotal: string
  paymentDiscount: string
  paymentShipping: string
  paymentTax: string
  paymentTotal: string
  paymentDetails: string
  paymentViewAndPay: string
  paymentSecure: string
  paymentQuestion: string
  paymentThanks: string

  // paymentConfirmedEmail
  paymentConfirmedTitle: string
  paymentConfirmedHello: string
  paymentConfirmedBody: string
  paymentConfirmedOrder: string
  paymentConfirmedTotalPaid: string
  paymentConfirmedMethod: string
  paymentConfirmedDate: string
  paymentConfirmedInvoice: string
  paymentConfirmedViewOrder: string
  paymentConfirmedShipping: string
  paymentConfirmedThanks: string

  // transferBankDetailsEmail
  subjectTransferDetails: string   // "Datos para transferencia — Pedido {order} | Tricholand"
  transferTitle: string
  transferHello: string
  transferBody: string
  transferBankDetails: string
  transferAccountHolder: string
  transferIBAN: string
  transferBank: string
  transferBIC: string
  transferReference: string
  transferAmount: string
  transferImportant: string
  transferImportantNote: string
  transferQuestion: string
  transferThanks: string
}

const translations: Record<EmailLocale, EmailTranslations> = {
  es: {
    layoutSubtitle: 'Vivero de Trichocereus y cact&aacute;ceas columnares',
    layoutFooterAuto: 'Este email fue enviado autom&aacute;ticamente. Por favor no respondas a este mensaje.',
    subjectOrderReceived: 'Tu solicitud de pedido {order} — Tricholand',
    subjectContactReceived: 'Hemos recibido tu consulta — Tricholand',
    subjectPaymentReady: 'Pedido {order} validado — Ya puedes pagar | Tricholand',
    subjectPaymentConfirmed: 'Pago confirmado — Pedido {order} | Tricholand',
    orderReceived: 'Solicitud recibida',
    orderNumber: 'Pedido',
    orderHello: 'Hola',
    orderConfirmation: 'Hemos recibido tu solicitud de pedido correctamente. Nuestro equipo la revisar&aacute; y te enviar&aacute; el presupuesto final con el enlace de pago a <strong>{email}</strong> en un plazo m&aacute;ximo de 24 horas laborables.',
    orderSummary: 'Resumen del pedido',
    orderSubtotalNote: '* Precios sin IVA. El IVA (21%), env&iacute;o y posibles descuentos se detallar&aacute;n en el presupuesto final.',
    orderQuestion: 'Si tienes alguna pregunta, no dudes en contactarnos en',
    orderThanks: 'Gracias por confiar en Tricholand.',
    subtotalEstimated: 'Base imponible (sin IVA)',
    orderProfessionalConditions: 'Venta exclusiva B2B — Solo profesionales. Los precios indicados son para profesionales. Para validar tu pedido debes acreditar tu condici&oacute;n de profesional enviando por email a info@tricholand.com el Certificado de actividades econ&oacute;micas (AEAT) o NIF-IVA verificable en VIES. Solo entonces se validar&aacute;n t&eacute;rminos y precios. Si no acreditas ser profesional, no podr&aacute;s rechazar el pedido; Tricholand podr&aacute; cancelarlo o ajustar los precios a venta a particular seg&uacute;n considere.',
    contactReceived: 'Consulta recibida',
    contactHello: 'Hola',
    contactConfirmation: 'Hemos recibido tu consulta correctamente. Nuestro equipo la revisar&aacute; y te responder&aacute; a <strong>{email}</strong> lo antes posible.',
    contactYourMessage: 'Tu mensaje',
    contactAddMore: 'Si necesitas a&ntilde;adir algo, puedes escribirnos a',
    contactThanks: 'Gracias por tu inter&eacute;s en Tricholand.',
    paymentValidated: 'Tu pedido ha sido validado',
    paymentHello: 'Hola',
    paymentBody: 'Tu pedido ha sido revisado y validado por <strong>Tricholand</strong>. Ya puedes proceder al pago.',
    paymentBreakdown: 'A continuaci&oacute;n tienes el desglose final de tu pedido:',
    paymentDetails: 'Desglose del pedido',
    paymentSubtotal: 'Subtotal',
    paymentDiscount: 'Descuento',
    paymentShipping: 'Env&iacute;o',
    paymentTax: 'IVA',
    paymentTotal: 'TOTAL',
    paymentViewAndPay: 'Ver pedido y pagar',
    paymentSecure: 'Pago seguro mediante TPV virtual (Redsys) o Stripe.',
    paymentQuestion: 'Si tienes alguna duda, contacta con nosotros en',
    paymentThanks: 'Gracias por confiar en Tricholand.',
    paymentConfirmedTitle: 'Pago confirmado',
    paymentConfirmedHello: 'Hola',
    paymentConfirmedBody: 'Hemos recibido tu pago correctamente. Tu pedido est&aacute; confirmado y se est&aacute; preparando.',
    paymentConfirmedOrder: 'Pedido',
    paymentConfirmedTotalPaid: 'Total pagado',
    paymentConfirmedMethod: 'M&eacute;todo',
    paymentConfirmedDate: 'Fecha',
    paymentConfirmedInvoice: 'Adjuntamos la factura a este email. Tambi&eacute;n puedes verla desde tu p&aacute;gina de pedido:',
    paymentConfirmedViewOrder: 'Ver mi pedido',
    paymentConfirmedShipping: 'Te informaremos cuando tu pedido sea enviado. Si tienes alguna duda, escr&iacute;benos a',
    paymentConfirmedThanks: 'Gracias por tu compra en Tricholand.',
    subjectTransferDetails: 'Datos para transferencia — Pedido {order} | Tricholand',
    transferTitle: 'Pago por transferencia',
    transferHello: 'Hola',
    transferBody: 'Has elegido pagar por transferencia bancaria. A continuaci&oacute;n te indicamos los datos para realizar la transferencia:',
    transferBankDetails: 'Datos bancarios',
    transferAccountHolder: 'Titular',
    transferIBAN: 'IBAN',
    transferBank: 'Banco',
    transferBIC: 'BIC/SWIFT',
    transferReference: 'Concepto (obligatorio)',
    transferAmount: 'Importe exacto',
    transferImportant: 'Importante',
    transferImportantNote: 'Indica el n&uacute;mero de pedido <strong>{order}</strong> como concepto de la transferencia. Confirmaremos el pago en un plazo de 1-3 d&iacute;as h&aacute;biles tras recibir la transferencia.',
    transferQuestion: 'Si tienes alguna duda, contacta con nosotros en',
    transferThanks: 'Gracias por confiar en Tricholand.',
  },

  en: {
    layoutSubtitle: 'Trichocereus &amp; columnar cacti nursery',
    layoutFooterAuto: 'This email was sent automatically. Please do not reply to this message.',
    subjectOrderReceived: 'Your order request {order} — Tricholand',
    subjectContactReceived: 'We have received your inquiry — Tricholand',
    subjectPaymentReady: 'Order {order} validated — Proceed to payment | Tricholand',
    subjectPaymentConfirmed: 'Payment confirmed — Order {order} | Tricholand',
    orderReceived: 'Order received',
    orderNumber: 'Order',
    orderHello: 'Hello',
    orderConfirmation: 'We have received your order request successfully. Our team will review it and send you the final quote with the payment link to <strong>{email}</strong> within a maximum of 24 business hours.',
    orderSummary: 'Order summary',
    orderSubtotalNote: '* Prices exclude VAT. VAT (21%), shipping and possible discounts will be detailed in the final quote.',
    orderQuestion: 'If you have any questions, feel free to contact us at',
    orderThanks: 'Thank you for trusting Tricholand.',
    subtotalEstimated: 'Subtotal (excl. VAT)',
    orderProfessionalConditions: 'B2B exclusive — Professionals only. The prices shown are for professionals. To validate your order you must prove your professional status by emailing info@tricholand.com your Certificate of economic activities (Spanish AEAT) or a VAT number verifiable in VIES. Only then will terms and prices be validated. If you cannot prove you are a professional, you may not reject the order; Tricholand may cancel it or adjust prices to retail at its discretion.',
    contactReceived: 'Inquiry received',
    contactHello: 'Hello',
    contactConfirmation: 'We have received your inquiry successfully. Our team will review it and reply to <strong>{email}</strong> as soon as possible.',
    contactYourMessage: 'Your message',
    contactAddMore: 'If you need to add anything, you can write to us at',
    contactThanks: 'Thank you for your interest in Tricholand.',
    paymentValidated: 'Your order has been validated',
    paymentHello: 'Hello',
    paymentBody: 'Your order has been reviewed and validated by <strong>Tricholand</strong>. You can now proceed to payment.',
    paymentBreakdown: 'Below is the final breakdown of your order:',
    paymentDetails: 'Order breakdown',
    paymentSubtotal: 'Subtotal',
    paymentDiscount: 'Discount',
    paymentShipping: 'Shipping',
    paymentTax: 'VAT',
    paymentTotal: 'TOTAL',
    paymentViewAndPay: 'View order and pay',
    paymentSecure: 'Secure payment via virtual POS (Redsys) or Stripe.',
    paymentQuestion: 'If you have any questions, contact us at',
    paymentThanks: 'Thank you for trusting Tricholand.',
    paymentConfirmedTitle: 'Payment confirmed',
    paymentConfirmedHello: 'Hello',
    paymentConfirmedBody: 'We have received your payment successfully. Your order is confirmed and is being prepared.',
    paymentConfirmedOrder: 'Order',
    paymentConfirmedTotalPaid: 'Total paid',
    paymentConfirmedMethod: 'Method',
    paymentConfirmedDate: 'Date',
    paymentConfirmedInvoice: 'The invoice is attached to this email. You can also view it from your order page:',
    paymentConfirmedViewOrder: 'View my order',
    paymentConfirmedShipping: 'We will notify you when your order is shipped. If you have any questions, write to us at',
    paymentConfirmedThanks: 'Thank you for your purchase at Tricholand.',
    subjectTransferDetails: 'Bank details for transfer — Order {order} | Tricholand',
    transferTitle: 'Bank transfer payment',
    transferHello: 'Hello',
    transferBody: 'You have chosen to pay by bank transfer. Below are the details to make the transfer:',
    transferBankDetails: 'Bank details',
    transferAccountHolder: 'Account holder',
    transferIBAN: 'IBAN',
    transferBank: 'Bank',
    transferBIC: 'BIC/SWIFT',
    transferReference: 'Reference (required)',
    transferAmount: 'Exact amount',
    transferImportant: 'Important',
    transferImportantNote: 'Please include order number <strong>{order}</strong> as the transfer reference. We will confirm payment within 1-3 business days of receiving the transfer.',
    transferQuestion: 'If you have any questions, contact us at',
    transferThanks: 'Thank you for trusting Tricholand.',
  },

  de: {
    layoutSubtitle: 'Trichocereus &amp; S&auml;ulenkakteen-G&auml;rtnerei',
    layoutFooterAuto: 'Diese E-Mail wurde automatisch gesendet. Bitte antworten Sie nicht auf diese Nachricht.',
    subjectOrderReceived: 'Ihre Bestellanfrage {order} — Tricholand',
    subjectContactReceived: 'Wir haben Ihre Anfrage erhalten — Tricholand',
    subjectPaymentReady: 'Bestellung {order} bestätigt — Jetzt bezahlen | Tricholand',
    subjectPaymentConfirmed: 'Zahlung bestätigt — Bestellung {order} | Tricholand',
    orderReceived: 'Bestellung eingegangen',
    orderNumber: 'Bestellung',
    orderHello: 'Hallo',
    orderConfirmation: 'Wir haben Ihre Bestellanfrage erfolgreich erhalten. Unser Team wird sie pr&uuml;fen und Ihnen das endg&uuml;ltige Angebot mit dem Zahlungslink an <strong>{email}</strong> innerhalb von maximal 24 Gesch&auml;ftsstunden zusenden.',
    orderSummary: 'Bestell&uuml;bersicht',
    orderSubtotalNote: '* Preise ohne MwSt. MwSt. (21%), Versand und m&ouml;gliche Rabatte werden im endg&uuml;ltigen Angebot aufgef&uuml;hrt.',
    orderQuestion: 'Bei Fragen k&ouml;nnen Sie uns gerne kontaktieren unter',
    orderThanks: 'Vielen Dank f&uuml;r Ihr Vertrauen in Tricholand.',
    subtotalEstimated: 'Zwischensumme (ohne MwSt.)',
    orderProfessionalConditions: 'B2B exklusiv — Nur f&uuml;r Fachleute. Die angezeigten Preise gelten f&uuml;r Fachleute. Zur Validierung Ihrer Bestellung m&uuml;ssen Sie Ihren Fachleute-Status per E-Mail an info@tricholand.com nachweisen: Zertifikat &uuml;ber wirtschaftliche T&auml;tigkeit (spanische AEAT) oder in VIES verifizierbare USt-IdNr. Erst dann werden Bedingungen und Preise best&auml;tigt. Ohne Nachweis k&ouml;nnen Sie die Bestellung nicht ablehnen; Tricholand kann sie stornieren oder die Preise auf Endverbraucherpreise anpassen.',
    contactReceived: 'Anfrage eingegangen',
    contactHello: 'Hallo',
    contactConfirmation: 'Wir haben Ihre Anfrage erfolgreich erhalten. Unser Team wird sie pr&uuml;fen und so schnell wie m&ouml;glich an <strong>{email}</strong> antworten.',
    contactYourMessage: 'Ihre Nachricht',
    contactAddMore: 'Falls Sie etwas hinzuf&uuml;gen m&ouml;chten, schreiben Sie uns an',
    contactThanks: 'Vielen Dank f&uuml;r Ihr Interesse an Tricholand.',
    paymentValidated: 'Ihre Bestellung wurde best&auml;tigt',
    paymentHello: 'Hallo',
    paymentBody: 'Ihre Bestellung wurde von <strong>Tricholand</strong> gepr&uuml;ft und best&auml;tigt. Sie k&ouml;nnen jetzt mit der Zahlung fortfahren.',
    paymentBreakdown: 'Hier ist die endg&uuml;ltige Aufschl&uuml;sselung Ihrer Bestellung:',
    paymentDetails: 'Bestell-Aufschl&uuml;sselung',
    paymentSubtotal: 'Zwischensumme',
    paymentDiscount: 'Rabatt',
    paymentShipping: 'Versand',
    paymentTax: 'MwSt.',
    paymentTotal: 'GESAMT',
    paymentViewAndPay: 'Bestellung ansehen und bezahlen',
    paymentSecure: 'Sichere Zahlung &uuml;ber virtuelles POS (Redsys) oder Stripe.',
    paymentQuestion: 'Bei Fragen kontaktieren Sie uns unter',
    paymentThanks: 'Vielen Dank f&uuml;r Ihr Vertrauen in Tricholand.',
    paymentConfirmedTitle: 'Zahlung best&auml;tigt',
    paymentConfirmedHello: 'Hallo',
    paymentConfirmedBody: 'Wir haben Ihre Zahlung erfolgreich erhalten. Ihre Bestellung ist best&auml;tigt und wird vorbereitet.',
    paymentConfirmedOrder: 'Bestellung',
    paymentConfirmedTotalPaid: 'Bezahlter Betrag',
    paymentConfirmedMethod: 'Methode',
    paymentConfirmedDate: 'Datum',
    paymentConfirmedInvoice: 'Die Rechnung ist dieser E-Mail beigef&uuml;gt. Sie k&ouml;nnen sie auch von Ihrer Bestellseite herunterladen:',
    paymentConfirmedViewOrder: 'Meine Bestellung ansehen',
    paymentConfirmedShipping: 'Wir benachrichtigen Sie, wenn Ihre Bestellung versandt wird. Bei Fragen schreiben Sie uns an',
    paymentConfirmedThanks: 'Vielen Dank f&uuml;r Ihren Einkauf bei Tricholand.',
    subjectTransferDetails: 'Bankdaten f&uuml;r &Uuml;berweisung — Bestellung {order} | Tricholand',
    transferTitle: 'Zahlung per &Uuml;berweisung',
    transferHello: 'Hallo',
    transferBody: 'Sie haben sich f&uuml;r die Zahlung per Bank&uuml;berweisung entschieden. Hier sind die Daten f&uuml;r die &Uuml;berweisung:',
    transferBankDetails: 'Bankdaten',
    transferAccountHolder: 'Kontoinhaber',
    transferIBAN: 'IBAN',
    transferBank: 'Bank',
    transferBIC: 'BIC/SWIFT',
    transferReference: 'Verwendungszweck (Pflicht)',
    transferAmount: 'Exakter Betrag',
    transferImportant: 'Wichtig',
    transferImportantNote: 'Bitte geben Sie die Bestellnummer <strong>{order}</strong> als Verwendungszweck an. Wir best&auml;tigen die Zahlung innerhalb von 1-3 Werktagen nach Eingang.',
    transferQuestion: 'Bei Fragen kontaktieren Sie uns unter',
    transferThanks: 'Vielen Dank f&uuml;r Ihr Vertrauen in Tricholand.',
  },

  fr: {
    layoutSubtitle: 'P&eacute;pini&egrave;re de Trichocereus et cactus columnaires',
    layoutFooterAuto: 'Cet email a &eacute;t&eacute; envoy&eacute; automatiquement. Merci de ne pas r&eacute;pondre &agrave; ce message.',
    subjectOrderReceived: 'Votre demande de commande {order} — Tricholand',
    subjectContactReceived: 'Nous avons reçu votre demande — Tricholand',
    subjectPaymentReady: 'Commande {order} validée — Procédez au paiement | Tricholand',
    subjectPaymentConfirmed: 'Paiement confirmé — Commande {order} | Tricholand',
    orderReceived: 'Commande re&ccedil;ue',
    orderNumber: 'Commande',
    orderHello: 'Bonjour',
    orderConfirmation: 'Nous avons bien re&ccedil;u votre demande de commande. Notre &eacute;quipe l\'examinera et vous enverra le devis final avec le lien de paiement &agrave; <strong>{email}</strong> dans un d&eacute;lai maximum de 24 heures ouvr&eacute;es.',
    orderSummary: 'R&eacute;sum&eacute; de la commande',
    orderSubtotalNote: '* Prix hors TVA. La TVA (21%), les frais de port et &eacute;ventuels rabais seront d&eacute;taill&eacute;s dans le devis final.',
    orderQuestion: 'Si vous avez des questions, n\'h&eacute;sitez pas &agrave; nous contacter &agrave;',
    orderThanks: 'Merci de votre confiance envers Tricholand.',
    subtotalEstimated: 'Sous-total (HT)',
    orderProfessionalConditions: 'Vente B2B exclusive — Professionnels uniquement. Les prix indiqu&eacute;s sont pour les professionnels. Pour valider votre commande, vous devez justifier votre statut de professionnel en envoyant par email &agrave; info@tricholand.com le Certificat d\'activit&eacute;s &eacute;conomiques (AEAT espagnol) ou un num&eacute;ro de TVA v&eacute;rifiable dans VIES. Seulement alors les conditions et prix seront valid&eacute;s. Sans justification, vous ne pourrez pas refuser la commande ; Tricholand pourra l\'annuler ou ajuster les prix au d&eacute;tail.',
    contactReceived: 'Demande re&ccedil;ue',
    contactHello: 'Bonjour',
    contactConfirmation: 'Nous avons bien re&ccedil;u votre demande. Notre &eacute;quipe l\'examinera et vous r&eacute;pondra &agrave; <strong>{email}</strong> dans les meilleurs d&eacute;lais.',
    contactYourMessage: 'Votre message',
    contactAddMore: 'Si vous souhaitez ajouter quelque chose, vous pouvez nous &eacute;crire &agrave;',
    contactThanks: 'Merci pour votre int&eacute;r&ecirc;t pour Tricholand.',
    paymentValidated: 'Votre commande a &eacute;t&eacute; valid&eacute;e',
    paymentHello: 'Bonjour',
    paymentBody: 'Votre commande a &eacute;t&eacute; examin&eacute;e et valid&eacute;e par <strong>Tricholand</strong>. Vous pouvez maintenant proc&eacute;der au paiement.',
    paymentBreakdown: 'Voici le d&eacute;tail final de votre commande :',
    paymentDetails: 'D&eacute;tail de la commande',
    paymentSubtotal: 'Sous-total',
    paymentDiscount: 'Remise',
    paymentShipping: 'Livraison',
    paymentTax: 'TVA',
    paymentTotal: 'TOTAL',
    paymentViewAndPay: 'Voir la commande et payer',
    paymentSecure: 'Paiement s&eacute;curis&eacute; par TPV virtuel (Redsys) ou Stripe.',
    paymentQuestion: 'Si vous avez des questions, contactez-nous &agrave;',
    paymentThanks: 'Merci de votre confiance envers Tricholand.',
    paymentConfirmedTitle: 'Paiement confirm&eacute;',
    paymentConfirmedHello: 'Bonjour',
    paymentConfirmedBody: 'Nous avons bien re&ccedil;u votre paiement. Votre commande est confirm&eacute;e et en cours de pr&eacute;paration.',
    paymentConfirmedOrder: 'Commande',
    paymentConfirmedTotalPaid: 'Total pay&eacute;',
    paymentConfirmedMethod: 'M&eacute;thode',
    paymentConfirmedDate: 'Date',
    paymentConfirmedInvoice: 'La facture est jointe &agrave; cet email. Vous pouvez &eacute;galement la consulter depuis votre page de commande :',
    paymentConfirmedViewOrder: 'Voir ma commande',
    paymentConfirmedShipping: 'Nous vous informerons lorsque votre commande sera exp&eacute;di&eacute;e. Pour toute question, &eacute;crivez-nous &agrave;',
    paymentConfirmedThanks: 'Merci pour votre achat chez Tricholand.',
    subjectTransferDetails: 'Coordonn&eacute;es bancaires — Commande {order} | Tricholand',
    transferTitle: 'Paiement par virement',
    transferHello: 'Bonjour',
    transferBody: 'Vous avez choisi de payer par virement bancaire. Voici les coordonn&eacute;es pour effectuer le virement :',
    transferBankDetails: 'Coordonn&eacute;es bancaires',
    transferAccountHolder: 'Titulaire du compte',
    transferIBAN: 'IBAN',
    transferBank: 'Banque',
    transferBIC: 'BIC/SWIFT',
    transferReference: 'R&eacute;f&eacute;rence (obligatoire)',
    transferAmount: 'Montant exact',
    transferImportant: 'Important',
    transferImportantNote: 'Indiquez le num&eacute;ro de commande <strong>{order}</strong> comme r&eacute;f&eacute;rence du virement. Nous confirmerons le paiement sous 1 &agrave; 3 jours ouvr&eacute;s apr&egrave;s r&eacute;ception.',
    transferQuestion: 'Pour toute question, contactez-nous &agrave;',
    transferThanks: 'Merci de votre confiance en Tricholand.',
  },

  it: {
    layoutSubtitle: 'Vivaio di Trichocereus e cactus colonnari',
    layoutFooterAuto: 'Questa email &egrave; stata inviata automaticamente. Per favore non rispondere a questo messaggio.',
    subjectOrderReceived: 'La tua richiesta d\'ordine {order} — Tricholand',
    subjectContactReceived: 'Abbiamo ricevuto la tua richiesta — Tricholand',
    subjectPaymentReady: 'Ordine {order} convalidato — Procedi al pagamento | Tricholand',
    subjectPaymentConfirmed: 'Pagamento confermato — Ordine {order} | Tricholand',
    orderReceived: 'Ordine ricevuto',
    orderNumber: 'Ordine',
    orderHello: 'Ciao',
    orderConfirmation: 'Abbiamo ricevuto correttamente la tua richiesta d\'ordine. Il nostro team la esaminer&agrave; e ti invier&agrave; il preventivo finale con il link di pagamento a <strong>{email}</strong> entro un massimo di 24 ore lavorative.',
    orderSummary: 'Riepilogo dell\'ordine',
    orderSubtotalNote: '* Prezzi IVA esclusa. L\'IVA (21%), la spedizione ed eventuali sconti saranno dettagliati nel preventivo finale.',
    orderQuestion: 'Se hai domande, non esitare a contattarci a',
    orderThanks: 'Grazie per la fiducia in Tricholand.',
    subtotalEstimated: 'Subtotale (IVA esclusa)',
    orderProfessionalConditions: 'Vendita B2B esclusiva — Solo professionisti. I prezzi indicati sono per professionisti. Per convalidare il tuo ordine devi attestare la tua condizione di professionista inviando per email a info@tricholand.com il Certificato di attivit&agrave; economiche (AEAT spagnolo) o Partita IVA verificabile in VIES. Solo allora saranno convalidati termini e prezzi. Senza attestazione non potrai rifiutare l\'ordine; Tricholand potr&agrave; annullarlo o adeguare i prezzi al dettaglio.',
    contactReceived: 'Richiesta ricevuta',
    contactHello: 'Ciao',
    contactConfirmation: 'Abbiamo ricevuto correttamente la tua richiesta. Il nostro team la esaminer&agrave; e ti risponder&agrave; a <strong>{email}</strong> il prima possibile.',
    contactYourMessage: 'Il tuo messaggio',
    contactAddMore: 'Se desideri aggiungere qualcosa, puoi scriverci a',
    contactThanks: 'Grazie per il tuo interesse in Tricholand.',
    paymentValidated: 'Il tuo ordine &egrave; stato convalidato',
    paymentHello: 'Ciao',
    paymentBody: 'Il tuo ordine &egrave; stato esaminato e convalidato da <strong>Tricholand</strong>. Ora puoi procedere al pagamento.',
    paymentBreakdown: 'Di seguito trovi il dettaglio finale del tuo ordine:',
    paymentDetails: 'Dettaglio dell\'ordine',
    paymentSubtotal: 'Subtotale',
    paymentDiscount: 'Sconto',
    paymentShipping: 'Spedizione',
    paymentTax: 'IVA',
    paymentTotal: 'TOTALE',
    paymentViewAndPay: 'Visualizza ordine e paga',
    paymentSecure: 'Pagamento sicuro tramite POS virtuale (Redsys) o Stripe.',
    paymentQuestion: 'Se hai domande, contattaci a',
    paymentThanks: 'Grazie per la fiducia in Tricholand.',
    paymentConfirmedTitle: 'Pagamento confermato',
    paymentConfirmedHello: 'Ciao',
    paymentConfirmedBody: 'Abbiamo ricevuto correttamente il tuo pagamento. Il tuo ordine &egrave; confermato e in fase di preparazione.',
    paymentConfirmedOrder: 'Ordine',
    paymentConfirmedTotalPaid: 'Totale pagato',
    paymentConfirmedMethod: 'Metodo',
    paymentConfirmedDate: 'Data',
    paymentConfirmedInvoice: 'La fattura &egrave; allegata a questa email. Puoi anche visualizzarla dalla pagina del tuo ordine:',
    paymentConfirmedViewOrder: 'Vedi il mio ordine',
    paymentConfirmedShipping: 'Ti avviseremo quando il tuo ordine sar&agrave; spedito. Per qualsiasi domanda, scrivici a',
    paymentConfirmedThanks: 'Grazie per il tuo acquisto su Tricholand.',
    subjectTransferDetails: 'Dati bancari per bonifico — Ordine {order} | Tricholand',
    transferTitle: 'Pagamento con bonifico bancario',
    transferHello: 'Ciao',
    transferBody: 'Hai scelto di pagare con bonifico bancario. Di seguito i dati per effettuare il bonifico:',
    transferBankDetails: 'Dati bancari',
    transferAccountHolder: 'Intestatario',
    transferIBAN: 'IBAN',
    transferBank: 'Banca',
    transferBIC: 'BIC/SWIFT',
    transferReference: 'Causale (obbligatoria)',
    transferAmount: 'Importo esatto',
    transferImportant: 'Importante',
    transferImportantNote: 'Indica il numero d\'ordine <strong>{order}</strong> come causale del bonifico. Confermeremo il pagamento entro 1-3 giorni lavorativi dal ricevimento.',
    transferQuestion: 'Per domande, contattaci a',
    transferThanks: 'Grazie per la fiducia in Tricholand.',
  },

  nl: {
    layoutSubtitle: 'Trichocereus &amp; zuilvormige cactus kwekerij',
    layoutFooterAuto: 'Deze email is automatisch verzonden. Gelieve niet te antwoorden op dit bericht.',
    subjectOrderReceived: 'Uw bestellingsaanvraag {order} — Tricholand',
    subjectContactReceived: 'We hebben uw aanvraag ontvangen — Tricholand',
    subjectPaymentReady: 'Bestelling {order} gevalideerd — Ga naar betaling | Tricholand',
    subjectPaymentConfirmed: 'Betaling bevestigd — Bestelling {order} | Tricholand',
    orderReceived: 'Bestelling ontvangen',
    orderNumber: 'Bestelling',
    orderHello: 'Hallo',
    orderConfirmation: 'We hebben uw bestellingsaanvraag succesvol ontvangen. Ons team zal deze bekijken en u de definitieve offerte met de betaallink sturen naar <strong>{email}</strong> binnen maximaal 24 werkuren.',
    orderSummary: 'Besteloverzicht',
    orderSubtotalNote: '* Prijzen exclusief btw. Btw (21%), verzending en mogelijke kortingen worden gedetailleerd in de definitieve offerte.',
    orderQuestion: 'Als u vragen heeft, neem gerust contact met ons op via',
    orderThanks: 'Bedankt voor uw vertrouwen in Tricholand.',
    subtotalEstimated: 'Subtotaal (excl. btw)',
    orderProfessionalConditions: 'B2B exclusief — Alleen professionals. De getoonde prijzen zijn voor professionals. Om uw bestelling te valideren moet u uw professionele status aantonen door te e-mailen naar info@tricholand.com het Certificaat van economische activiteiten (Spaanse AEAT) of een btw-nummer verifieerbaar in VIES. Pas dan worden voorwaarden en prijzen gevalideerd. Zonder bewijs kunt u de bestelling niet weigeren; Tricholand kan deze annuleren of de prijzen aanpassen aan consumentenprijzen.',
    contactReceived: 'Aanvraag ontvangen',
    contactHello: 'Hallo',
    contactConfirmation: 'We hebben uw aanvraag succesvol ontvangen. Ons team zal deze bekijken en zo snel mogelijk reageren naar <strong>{email}</strong>.',
    contactYourMessage: 'Uw bericht',
    contactAddMore: 'Als u iets wilt toevoegen, kunt u ons schrijven op',
    contactThanks: 'Bedankt voor uw interesse in Tricholand.',
    paymentValidated: 'Uw bestelling is gevalideerd',
    paymentHello: 'Hallo',
    paymentBody: 'Uw bestelling is beoordeeld en gevalideerd door <strong>Tricholand</strong>. U kunt nu doorgaan met betalen.',
    paymentBreakdown: 'Hieronder vindt u de definitieve specificatie van uw bestelling:',
    paymentDetails: 'Bestelspecificatie',
    paymentSubtotal: 'Subtotaal',
    paymentDiscount: 'Korting',
    paymentShipping: 'Verzending',
    paymentTax: 'BTW',
    paymentTotal: 'TOTAAL',
    paymentViewAndPay: 'Bestelling bekijken en betalen',
    paymentSecure: 'Veilige betaling via virtueel POS (Redsys) of Stripe.',
    paymentQuestion: 'Als u vragen heeft, neem contact met ons op via',
    paymentThanks: 'Bedankt voor uw vertrouwen in Tricholand.',
    paymentConfirmedTitle: 'Betaling bevestigd',
    paymentConfirmedHello: 'Hallo',
    paymentConfirmedBody: 'We hebben uw betaling succesvol ontvangen. Uw bestelling is bevestigd en wordt voorbereid.',
    paymentConfirmedOrder: 'Bestelling',
    paymentConfirmedTotalPaid: 'Totaal betaald',
    paymentConfirmedMethod: 'Methode',
    paymentConfirmedDate: 'Datum',
    paymentConfirmedInvoice: 'De factuur is bijgevoegd bij deze email. U kunt deze ook bekijken via uw bestelpagina:',
    paymentConfirmedViewOrder: 'Mijn bestelling bekijken',
    paymentConfirmedShipping: 'We laten u weten wanneer uw bestelling is verzonden. Voor vragen kunt u ons schrijven op',
    paymentConfirmedThanks: 'Bedankt voor uw aankoop bij Tricholand.',
    subjectTransferDetails: 'Gegevens voor overschrijving — Bestelling {order} | Tricholand',
    transferTitle: 'Betaling per overschrijving',
    transferHello: 'Hallo',
    transferBody: 'U heeft gekozen om per bankoverschrijving te betalen. Hieronder vindt u de gegevens voor de overschrijving:',
    transferBankDetails: 'Bankgegevens',
    transferAccountHolder: 'Rekeninghouder',
    transferIBAN: 'IBAN',
    transferBank: 'Bank',
    transferBIC: 'BIC/SWIFT',
    transferReference: 'Onderwerp (verplicht)',
    transferAmount: 'Exact bedrag',
    transferImportant: 'Belangrijk',
    transferImportantNote: 'Vermeld het bestelnummer <strong>{order}</strong> als onderwerp van de overschrijving. We bevestigen de betaling binnen 1-3 werkdagen na ontvangst.',
    transferQuestion: 'Bij vragen kunt u ons bereiken op',
    transferThanks: 'Bedankt voor uw vertrouwen in Tricholand.',
  },

  pt: {
    layoutSubtitle: 'Viveiro de Trichocereus e cactos colunares',
    layoutFooterAuto: 'Este email foi enviado automaticamente. Por favor n&atilde;o responda a esta mensagem.',
    subjectOrderReceived: 'O seu pedido {order} — Tricholand',
    subjectContactReceived: 'Recebemos a sua consulta — Tricholand',
    subjectPaymentReady: 'Pedido {order} validado — Proceda ao pagamento | Tricholand',
    subjectPaymentConfirmed: 'Pagamento confirmado — Pedido {order} | Tricholand',
    orderReceived: 'Pedido recebido',
    orderNumber: 'Pedido',
    orderHello: 'Ol&aacute;',
    orderConfirmation: 'Recebemos o seu pedido com sucesso. A nossa equipa ir&aacute; revis&aacute;-lo e enviar-lhe o or&ccedil;amento final com o link de pagamento para <strong>{email}</strong> num prazo m&aacute;ximo de 24 horas &uacute;teis.',
    orderSummary: 'Resumo do pedido',
    orderSubtotalNote: '* Pre&ccedil;os sem IVA. O IVA (21%), envio e poss&iacute;veis descontos ser&atilde;o detalhados no or&ccedil;amento final.',
    orderQuestion: 'Se tiver alguma pergunta, n&atilde;o hesite em contactar-nos em',
    orderThanks: 'Obrigado pela confian&ccedil;a na Tricholand.',
    subtotalEstimated: 'Subtotal (sem IVA)',
    orderProfessionalConditions: 'Venda B2B exclusiva — Apenas profissionais. Os pre&ccedil;os indicados s&atilde;o para profissionais. Para validar o seu pedido deve comprovar a sua condi&ccedil;&atilde;o de profissional enviando por email para info@tricholand.com o Certificado de atividades econ&oacute;micas (AEAT espanhol) ou NIF-IVA verific&aacute;vel no VIES. S&oacute; ent&atilde;o ser&atilde;o validados os termos e pre&ccedil;os. Sem comprova&ccedil;&atilde;o n&atilde;o poder&aacute; rejeitar o pedido; a Tricholand poder&aacute; cancel&aacute;-lo ou ajustar os pre&ccedil;os a venda a particular.',
    contactReceived: 'Consulta recebida',
    contactHello: 'Ol&aacute;',
    contactConfirmation: 'Recebemos a sua consulta com sucesso. A nossa equipa ir&aacute; revis&aacute;-la e responder&aacute; para <strong>{email}</strong> o mais breve poss&iacute;vel.',
    contactYourMessage: 'A sua mensagem',
    contactAddMore: 'Se precisar de acrescentar algo, pode escrever-nos para',
    contactThanks: 'Obrigado pelo seu interesse na Tricholand.',
    paymentValidated: 'O seu pedido foi validado',
    paymentHello: 'Ol&aacute;',
    paymentBody: 'O seu pedido foi revisto e validado pela <strong>Tricholand</strong>. Pode agora proceder ao pagamento.',
    paymentBreakdown: 'Abaixo encontra o detalhe final do seu pedido:',
    paymentDetails: 'Detalhe do pedido',
    paymentSubtotal: 'Subtotal',
    paymentDiscount: 'Desconto',
    paymentShipping: 'Envio',
    paymentTax: 'IVA',
    paymentTotal: 'TOTAL',
    paymentViewAndPay: 'Ver pedido e pagar',
    paymentSecure: 'Pagamento seguro atrav&eacute;s de POS virtual (Redsys) ou Stripe.',
    paymentQuestion: 'Se tiver alguma d&uacute;vida, contacte-nos em',
    paymentThanks: 'Obrigado pela confian&ccedil;a na Tricholand.',
    paymentConfirmedTitle: 'Pagamento confirmado',
    paymentConfirmedHello: 'Ol&aacute;',
    paymentConfirmedBody: 'Recebemos o seu pagamento com sucesso. O seu pedido est&aacute; confirmado e est&aacute; a ser preparado.',
    paymentConfirmedOrder: 'Pedido',
    paymentConfirmedTotalPaid: 'Total pago',
    paymentConfirmedMethod: 'M&eacute;todo',
    paymentConfirmedDate: 'Data',
    paymentConfirmedInvoice: 'A fatura est&aacute; anexada a este email. Tamb&eacute;m pode consult&aacute;-la na p&aacute;gina do seu pedido:',
    paymentConfirmedViewOrder: 'Ver o meu pedido',
    paymentConfirmedShipping: 'Informaremos quando o seu pedido for enviado. Se tiver alguma d&uacute;vida, escreva-nos para',
    paymentConfirmedThanks: 'Obrigado pela sua compra na Tricholand.',
    subjectTransferDetails: 'Dados para transfer&ecirc;ncia — Pedido {order} | Tricholand',
    transferTitle: 'Pagamento por transfer&ecirc;ncia',
    transferHello: 'Ol&aacute;',
    transferBody: 'Escolheu pagar por transfer&ecirc;ncia banc&aacute;ria. Seguem os dados para realizar a transfer&ecirc;ncia:',
    transferBankDetails: 'Dados banc&aacute;rios',
    transferAccountHolder: 'Titular',
    transferIBAN: 'IBAN',
    transferBank: 'Banco',
    transferBIC: 'BIC/SWIFT',
    transferReference: 'Refer&ecirc;ncia (obrigat&oacute;ria)',
    transferAmount: 'Valor exato',
    transferImportant: 'Importante',
    transferImportantNote: 'Indique o n&uacute;mero do pedido <strong>{order}</strong> como refer&ecirc;ncia da transfer&ecirc;ncia. Confirmaremos o pagamento em 1-3 dias &uacute;teis ap&oacute;s recebermos.',
    transferQuestion: 'Se tiver alguma d&uacute;vida, contacte-nos em',
    transferThanks: 'Obrigado pela confian&ccedil;a na Tricholand.',
  },
}

/** Obtiene las traducciones para un locale dado */
export function t(locale: EmailLocale | string): EmailTranslations {
  const resolved = resolveLocale(locale)
  return translations[resolved]
}
