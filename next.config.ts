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

      // === INGLÉS (Fase 2) ===
      // {
      //   source: '/en/posts',
      //   destination: '/en/blog',
      //   permanent: true,
      // },
      // {
      //   source: '/en/news',
      //   destination: '/en/blog',
      //   permanent: true,
      // },
      // {
      //   source: '/en/blog-en',
      //   destination: '/en/blog',
      //   permanent: true,
      // },
      // {
      //   source: '/en/blog-en/:slug',
      //   destination: '/en/blog/:slug',
      //   permanent: true,
      // },
      // {
      //   source: '/en/varieties/collectie-cactussen',
      //   destination: '/en/varieties/other-cacti',
      //   permanent: true,
      // },

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

  // Optimización de imágenes (solo locales, no se necesitan remotePatterns)
  images: {},
}

export default nextConfig
