export interface Dictionary {
  meta: {
    locale: string
    siteName: string
    siteDescription: string
  }
  nav: {
    home: string
    varieties: string
    catalog: string
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
    catalog_title: string
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
