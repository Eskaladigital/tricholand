import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Redirects 301 desde el sitio Joomla antiguo
  async redirects() {
    return [
      // === ESPAÑOL ===
      {
        source: '/es/publicaciones',
        destination: '/es/blog',
        permanent: true,
      },
      {
        source: '/es/noticias',
        destination: '/es/blog',
        permanent: true,
      },

      // === INGLÉS — Redirects 301 para preservar SEO (URLs antiguas bien posicionadas) ===
      {
        source: '/en/posts',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/en/news',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/en/blog-en',
        destination: '/en/blog',
        permanent: true,
      },
      {
        source: '/en/blog-en/:slug',
        destination: '/en/blog/:slug',
        permanent: true,
      },

      // === VARIEDADES → VARIETIES (inglés: canonical /en/varieties/) ===
      {
        source: '/en/variedades',
        destination: '/en/varieties',
        permanent: true,
      },
      {
        source: '/en/variedades/:slug',
        destination: '/en/varieties/:slug',
        permanent: true,
      },

      // === TIENDA → SHOP ===
      {
        source: '/en/tienda',
        destination: '/en/shop',
        permanent: true,
      },
      {
        source: '/en/tienda/pedido',
        destination: '/en/shop/order',
        permanent: true,
      },
      {
        source: '/en/tienda/:slug',
        destination: '/en/shop/:slug',
        permanent: true,
      },

      // === CATÁLOGO → CATALOG ===
      {
        source: '/en/catalogo',
        destination: '/en/catalog',
        permanent: true,
      },

      // === CONTACTO → CONTACT ===
      {
        source: '/en/contacto',
        destination: '/en/contact',
        permanent: true,
      },

      // === SERVICIOS → SERVICES ===
      {
        source: '/en/servicios',
        destination: '/en/services',
        permanent: true,
      },

      // === SOBRE NOSOTROS → ABOUT-US ===
      {
        source: '/en/sobre-nosotros',
        destination: '/en/about-us',
        permanent: true,
      },

      // === CERTIFICACIONES → CERTIFICATIONS ===
      {
        source: '/en/certificaciones',
        destination: '/en/certifications',
        permanent: true,
      },

      // === POLÍTICA PRIVACIDAD → PRIVACY-POLICY ===
      {
        source: '/en/politica-privacidad',
        destination: '/en/privacy-policy',
        permanent: true,
      },

      // === AVISO LEGAL → LEGAL-NOTICE ===
      {
        source: '/en/aviso-legal',
        destination: '/en/legal-notice',
        permanent: true,
      },

      // === ALEMÁN (DE) ===
      { source: '/de/variedades', destination: '/de/sorten', permanent: true },
      { source: '/de/variedades/:slug', destination: '/de/sorten/:slug', permanent: true },
      { source: '/de/catalogo', destination: '/de/katalog', permanent: true },
      { source: '/de/tienda', destination: '/de/shop', permanent: true },
      { source: '/de/tienda/pedido', destination: '/de/shop/bestellung', permanent: true },
      { source: '/de/tienda/:slug', destination: '/de/shop/:slug', permanent: true },
      { source: '/de/servicios', destination: '/de/dienstleistungen', permanent: true },
      { source: '/de/sobre-nosotros', destination: '/de/uber-uns', permanent: true },
      { source: '/de/contacto', destination: '/de/kontakt', permanent: true },
      { source: '/de/certificaciones', destination: '/de/zertifizierungen', permanent: true },
      { source: '/de/politica-privacidad', destination: '/de/datenschutz', permanent: true },
      { source: '/de/aviso-legal', destination: '/de/impressum', permanent: true },

      // === FRANCÉS (FR) ===
      { source: '/fr/variedades', destination: '/fr/varietes', permanent: true },
      { source: '/fr/variedades/:slug', destination: '/fr/varietes/:slug', permanent: true },
      { source: '/fr/catalogo', destination: '/fr/catalogue', permanent: true },
      { source: '/fr/tienda', destination: '/fr/boutique', permanent: true },
      { source: '/fr/tienda/pedido', destination: '/fr/boutique/commande', permanent: true },
      { source: '/fr/tienda/:slug', destination: '/fr/boutique/:slug', permanent: true },
      { source: '/fr/servicios', destination: '/fr/services', permanent: true },
      { source: '/fr/sobre-nosotros', destination: '/fr/a-propos', permanent: true },
      { source: '/fr/contacto', destination: '/fr/contact', permanent: true },
      { source: '/fr/certificaciones', destination: '/fr/certifications', permanent: true },
      { source: '/fr/politica-privacidad', destination: '/fr/politique-confidentialite', permanent: true },
      { source: '/fr/aviso-legal', destination: '/fr/mentions-legales', permanent: true },

      // === ITALIANO (IT) ===
      { source: '/it/variedades', destination: '/it/varieta', permanent: true },
      { source: '/it/variedades/:slug', destination: '/it/varieta/:slug', permanent: true },
      { source: '/it/tienda', destination: '/it/shop', permanent: true },
      { source: '/it/tienda/pedido', destination: '/it/shop/ordine', permanent: true },
      { source: '/it/tienda/:slug', destination: '/it/shop/:slug', permanent: true },
      { source: '/it/servicios', destination: '/it/servizi', permanent: true },
      { source: '/it/sobre-nosotros', destination: '/it/chi-siamo', permanent: true },
      { source: '/it/contacto', destination: '/it/contatto', permanent: true },
      { source: '/it/certificaciones', destination: '/it/certificazioni', permanent: true },
      { source: '/it/politica-privacidad', destination: '/it/privacy', permanent: true },
      { source: '/it/aviso-legal', destination: '/it/note-legali', permanent: true },

      // === HOLANDÉS (NL) ===
      { source: '/nl/variedades', destination: '/nl/varieteiten', permanent: true },
      { source: '/nl/variedades/:slug', destination: '/nl/varieteiten/:slug', permanent: true },
      { source: '/nl/catalogo', destination: '/nl/catalogus', permanent: true },
      { source: '/nl/tienda', destination: '/nl/winkel', permanent: true },
      { source: '/nl/tienda/pedido', destination: '/nl/winkel/bestelling', permanent: true },
      { source: '/nl/tienda/:slug', destination: '/nl/winkel/:slug', permanent: true },
      { source: '/nl/servicios', destination: '/nl/diensten', permanent: true },
      { source: '/nl/sobre-nosotros', destination: '/nl/over-ons', permanent: true },
      { source: '/nl/contacto', destination: '/nl/contact', permanent: true },
      { source: '/nl/certificaciones', destination: '/nl/certificeringen', permanent: true },
      { source: '/nl/politica-privacidad', destination: '/nl/privacybeleid', permanent: true },
      { source: '/nl/aviso-legal', destination: '/nl/juridische-informatie', permanent: true },

      // === PORTUGUÉS (PT) ===
      { source: '/pt/tienda', destination: '/pt/loja', permanent: true },
      { source: '/pt/tienda/pedido', destination: '/pt/loja/pedido', permanent: true },
      { source: '/pt/tienda/:slug', destination: '/pt/loja/:slug', permanent: true },
      { source: '/pt/servicios', destination: '/pt/servicos', permanent: true },
      { source: '/pt/sobre-nosotros', destination: '/pt/sobre-nos', permanent: true },
      { source: '/pt/certificaciones', destination: '/pt/certificacoes', permanent: true },
      { source: '/pt/politica-privacidad', destination: '/pt/politica-privacidade', permanent: true },

      // === HOLANDÉS (Fase 2) ===
      // {
      //   source: '/nl/publicaties',
      //   destination: '/nl/blog',
      //   permanent: true,
      // },

      // === JOOMLA LEGACY ===
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/component/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Imágenes: locales + Supabase Storage (para admin blog, media, etc.)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lhxydsjssecudjzkodkc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
