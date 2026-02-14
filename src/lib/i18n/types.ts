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
    professional: string
    pro_nursery: string
    pro_distributor: string
    pro_landscaper: string
    pro_other: string
    step2_title: string
    // ... se expandirá cuando construyamos el formulario
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
