export interface Dictionary {
  meta: {
    locale: string
    siteName: string
    siteDescription: string
  }
  nav: {
    home: string
    varieties: string
    shop: string
    services: string
    about: string
    contact: string
    certifications: string
    blog: string
  }
  header: {
    band_left: string
    band_right: string
  }
  hero: {
    badge: string
    title_line1: string
    title_highlight: string
    title_line2: string
    description: string
    cta: string
    image_tag: string
    tags: string[]
  }
  stats: {
    units: { value: string; label: string }
    area: { value: string; label: string }
    varieties: { value: string; label: string }
    countries: { value: string; label: string }
    delivery: { value: string; label: string }
  }
  catalog: {
    title: string
    viewAll: string
    available: string
    limited: string
    outOfStock: string
    viewSheet: string
    searchVariety: string
    filterAll: string
    varietyCount: string
    noVarietiesFound: string
    tryOtherFilters: string
  }
  shop: {
    searchProduct: string
    filterAll: string
    filterTrichocereus: string
    filterPacks: string
    productCount: string
    addToOrder: string
    inYourOrderAddAnother: string
    featured: string
    onlyXLotsLeft: string
    lotsLeft: string
    lotsAvailable: string
    noProductsFound: string
    tryOtherFilters: string
  }
  services: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
    }>
  }
  certifications: {
    title: string
    description: string
    badges: Array<{
      value: string
      label: string
    }>
  }
  cta: {
    title: string
    description: string
    email: string
    location: string
    button: string
  }
  footer: {
    description: string
    varieties_title: string
    company_title: string
    company_links: Array<{ label: string; href: string }>
    contact_title: string
    copyright: string
    b2b_note: string
  }
  contact_form: {
    step1_title: string
    particular: string
    particular_desc: string
    professional: string
    professional_desc: string
    pro_nursery: string
    pro_distributor: string
    pro_landscaper: string
    pro_other: string
    step2_title: string
    step1_label: string
    step2_label: string
    step3_label: string
    step4_label: string
    next: string
    back: string
    inquiry_purchase: string
    inquiry_purchase_desc: string
    inquiry_care: string
    inquiry_care_desc: string
    inquiry_other_part: string
    inquiry_other_part_desc: string
    inquiry_quote: string
    inquiry_quote_desc: string
    inquiry_recurring: string
    inquiry_recurring_desc: string
    inquiry_shipping: string
    inquiry_shipping_desc: string
    inquiry_certs: string
    inquiry_certs_desc: string
    inquiry_other_pro: string
    inquiry_other_pro_desc: string
    step3_title: string
    label_name: string
    label_company: string
    label_email: string
    label_phone: string
    label_country: string
    label_city: string
    label_message: string
    placeholder_name: string
    placeholder_company: string
    placeholder_phone: string
    placeholder_country: string
    placeholder_city: string
    placeholder_message: string
    placeholder_message_pro: string
    label_referral: string
    referral_google: string
    referral_social: string
    referral_referral: string
    referral_fair: string
    referral_other: string
    review_send: string
    step4_title: string
    summary_type: string
    summary_inquiry: string
    summary_name: string
    summary_company: string
    summary_email: string
    summary_phone: string
    summary_location: string
    summary_message: string
    gdpr_text: string
    gdpr_link: string
    gdpr_suffix: string
    edit_btn: string
    send_btn: string
    sending: string
    success_title: string
    success_text: string
    error_send: string
    error_unknown: string
  }
  blog: {
    title: string
    readMore: string
    readingTime: string
    publishedOn: string
    backToList: string
    relatedPosts: string
  }
  variety: {
    home: string
    sizes: string
    requestQuote: string
    description: string
    highlightedFeatures: string
    careGuide: string
    light: string
    water: string
    temperature: string
    soil: string
    checkAvailability: string
    stockAvailable: string
    stockLimited: string
    stockOutOfStock: string
  }
  orderForm: {
    // Cart step
    yourOrder: string
    product: string
    products: string
    notesPlaceholder: string
    remove: string
    taxBase: string
    estimatedVat: string
    estimatedTotalWithVat: string
    pricesExclVat: string
    shippingConfirmedInQuote: string
    vatExemptionNote: string
    continueToDetails: string
    // Mobile summary
    mobileSummaryNote: string
    // Details step
    billingDetails: string
    labelName: string
    labelCompany: string
    labelEmail: string
    labelPhone: string
    labelVatId: string
    labelCountry: string
    labelCity: string
    labelAddress: string
    labelNotes: string
    placeholderName: string
    placeholderCompany: string
    placeholderEmail: string
    placeholderPhone: string
    placeholderVatId: string
    placeholderCountry: string
    placeholderCity: string
    placeholderAddress: string
    placeholderNotes: string
    back: string
    reviewOrder: string
    // Confirm step
    confirmRequest: string
    productsLabel: string
    dataLabel: string
    nameLabel: string
    companyLabel: string
    emailLabel: string
    countryLabel: string
    vatIdLabel: string
    allPricesExclVat: string
    edit: string
    submitOrder: string
    submitting: string
    noChargeNow: string
    // Success
    requestSent: string
    requestSentMessage: string
    backToShop: string
    // Empty
    emptyOrder: string
    goToShop: string
    // Cart button
    orderButton: string
    // Error
    errorSubmit: string
    errorUnknown: string
    // Countries (EU-27 + UK, sorted alphabetically per locale)
    selectCountry: string
    countries: Array<{ code: string; name: string }>
  }
  orderPage: {
    orderTitle: string
    client: string
    address: string
    prePaymentMessage: string
    products: string
    productCol: string
    qtyCol: string
    priceCol: string
    totalCol: string
    taxBase: string
    discount: string
    shipping: string
    vat: string
    totalWithVat: string
    vatNote: string
    yourNotes: string
    shippingTracking: string
    paymentConfirmed: string
    preparing: string
    shipped: string
    delivered: string
    downloadInvoice: string
    cancelled: string
    anyQuestion: string
    writeTo: string
    // Status labels
    statusPending: string
    statusReviewing: string
    statusQuoted: string
    statusPaymentPending: string
    statusPaid: string
    statusPreparing: string
    statusShipped: string
    statusDelivered: string
    statusCancelled: string
    // Header
    headerSubtitle: string
  }
  paymentButtons: {
    title: string
    orderValidated: string
    selectMethod: string
    transferSent: string
    transferBtn: string
    transferSending: string
    transferDone: string
    redsysBtn: string
    redsysRedirecting: string
    stripeBtn: string
    stripeRedirecting: string
    methodsNote: string
    errorStripe: string
    errorRedsys: string
    errorTransfer: string
    errorConnection: string
  }
  common: {
    loading: string
    error: string
    success: string
    back: string
    next: string
    previous: string
    send: string
    required: string
  }
}
