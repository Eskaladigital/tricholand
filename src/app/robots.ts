import type { MetadataRoute } from 'next'

/** Crawlers de asistentes de IA (GEO): molde Furgocasa / ACTTAX. */
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'Google-Extended',
  'PerplexityBot',
  'Perplexity-User',
  'Applebot-Extended',
  'meta-externalagent',
]

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/administrator/', '/api/']

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow,
      })),
    ],
    sitemap: 'https://www.tricholand.com/sitemap.xml',
  }
}
