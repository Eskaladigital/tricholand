/**
 * Script para insertar posts de ejemplo del blog en Supabase.
 *
 * Uso:
 *   node scripts/seed-blog-posts.mjs
 *
 * Requiere en .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Ejecutar primero: supabase/blog-posts-schema.sql en Supabase SQL Editor
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const envPath = join(ROOT, '.env.local')
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8')
  for (const line of content.split('\n')) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error('❌ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(url, serviceKey)

const POSTS = [
  {
    slug: 'guia-completa-cultivo-trichocereus',
    title: 'Guía completa de cultivo de Trichocereus',
    description: 'Todo lo que necesitas saber para cultivar Trichocereus con éxito: sustrato, riego, luz, temperatura y prevención de plagas.',
    date: '2024-12-15',
    image: '/images/blog/Tricholand_blog_1.png',
    image_alt: 'Cultivo de Trichocereus en vivero',
    tags: ['cultivo', 'guía', 'cuidados'],
    reading_time: 8,
    content: `El cultivo de Trichocereus es relativamente sencillo si se respetan unas condiciones básicas. Estos cactus columnares originarios de Sudamérica se han adaptado perfectamente al clima mediterráneo europeo, lo que facilita su cultivo tanto en interior como en exterior.

## Sustrato

El sustrato es quizás el factor más crítico para el éxito del cultivo. Los Trichocereus necesitan un sustrato muy drenante que evite el encharcamiento de las raíces. Una mezcla recomendada es: 40% tierra vegetal, 30% perlita y 30% arena gruesa de río. Para especies que requieren un sustrato más mineral (como T. terscheckii), aumentar la proporción de arena y grava.

## Riego

El riego debe adaptarse a la estación. En primavera y verano, durante el período de crecimiento activo, regar cada 7-10 días permitiendo que el sustrato se seque completamente entre riegos. En otoño, reducir gradualmente. En invierno, suspender el riego casi por completo, especialmente si las temperaturas bajan de 10°C.

## Luz

Los Trichocereus necesitan abundante luz solar directa, idealmente un mínimo de 6 horas diarias. La falta de luz provoca etiolación (estiramiento y debilitamiento del tallo). Si se cultivan en interior, colocar junto a la ventana más luminosa, preferiblemente orientada al sur.

## Temperatura

La mayoría de Trichocereus toleran un rango amplio de temperaturas (5-40°C). Muchas especies soportan heladas ligeras (-2 a -4°C) si el sustrato está completamente seco. El T. terscheckii es el más resistente al frío, soportando hasta -8°C.

## Prevención de plagas

Las plagas más comunes son la cochinilla algodonosa y los ácaros. Inspeccionar regularmente las plantas y actuar ante los primeros síntomas. El aceite de neem es un tratamiento preventivo eficaz y respetuoso con el medio ambiente.`,
    locale: 'es',
    status: 'published',
  },
  {
    slug: 'como-injertar-trichocereus',
    title: 'Cómo injertar Trichocereus: técnicas y consejos',
    description: 'Aprende las técnicas de injerto más efectivas para Trichocereus, incluyendo injerto plano y de cuña. Guía paso a paso con fotos.',
    date: '2024-11-28',
    image: '/images/blog/Tricholand_blog_2.png',
    image_alt: 'Técnicas de injerto en cactus',
    tags: ['injertos', 'técnicas', 'propagación'],
    reading_time: 6,
    content: `El injerto es una técnica fundamental en el cultivo profesional de cactus. Permite acelerar el crecimiento de variedades lentas, salvar plantas dañadas y producir formas ornamentales únicas. El T. spachianus y el T. pachanoi son los portainjertos más utilizados por su vigor y compatibilidad.

## Tipos de injerto

### Injerto plano
Es el método más sencillo y efectivo. Consiste en cortar horizontalmente tanto el portainjerto como el injerto y unirlos presionando firmemente. La clave es que los anillos vasculares de ambas piezas coincidan al máximo.

### Injerto de cuña
Se utiliza para esquejes delgados o pencas. Se hace una incisión en V en el portainjerto y se inserta el esqueje tallado en cuña. Se sujeta con bandas elásticas o clips.

## Época ideal

La mejor época para injertar es la primavera tardía y el verano temprano, cuando las plantas están en pleno crecimiento activo y la cicatrización es más rápida.

## Cuidados post-injerto

Mantener la planta injertada en sombra parcial durante 1-2 semanas. No regar durante los primeros 5-7 días. Proteger del viento y la lluvia directa.`,
    locale: 'es',
    status: 'published',
  },
  {
    slug: 'diferencias-pachanoi-peruvianus-bridgesii',
    title: 'Diferencias entre T. Pachanoi, T. Peruvianus y T. Bridgesii',
    description: 'Aprende a distinguir las tres especies principales de Trichocereus: Pachanoi (San Pedro), Peruvianus (Antorcha Peruana) y Bridgesii (Achuma).',
    date: '2024-11-10',
    image: '/images/blog/Tricholand_blog_3.png',
    image_alt: 'Comparativa de especies de Trichocereus',
    tags: ['variedades', 'identificación', 'comparativa'],
    reading_time: 7,
    content: `Una de las preguntas más frecuentes que recibimos es cómo distinguir entre las tres especies principales de Trichocereus. Aunque comparten muchas características, existen diferencias claras que permiten su identificación.

## T. Pachanoi (San Pedro)

- Costillas: 6-8, poco profundas y redondeadas
- Espinas: Cortas o ausentes en muchas variedades
- Color: Verde azulado brillante
- Crecimiento: Rápido, hasta 30 cm/año
- Areolas: Pequeñas, espaciadas regularmente

## T. Peruvianus (Antorcha Peruana)

- Costillas: 6-8, más profundas y angulosas
- Espinas: Largas y prominentes, hasta 4 cm
- Color: Verde grisáceo con matices azulados
- Crecimiento: Moderado a rápido
- Areolas: Grandes, con lana abundante

## T. Bridgesii (Achuma)

- Costillas: 4-8, muy profundas
- Espinas: Variables, de cortas a largas
- Color: Verde oscuro
- Crecimiento: Rápido
- Areolas: Grandes con lana marrón
- Característica única: Secciones que se estrechan y ensanchan

## En resumen

Si el cactus tiene pocas espinas y color azulado, probablemente es un Pachanoi. Si tiene espinas largas y prominentes, un Peruvianus. Si las costillas son muy profundas y el color es verde oscuro con secciones variables, un Bridgesii.`,
    locale: 'es',
    status: 'published',
  },
]

async function main() {
  console.log('📝 Insertando posts del blog en Supabase...\n')

  for (const p of POSTS) {
    const { error } = await supabase.from('blog_posts').upsert(
      {
        slug: p.slug,
        source_slug: p.slug,
        locale: p.locale,
        title: p.title,
        description: p.description,
        date: p.date,
        image: p.image,
        image_alt: p.image_alt,
        tags: p.tags,
        reading_time: p.reading_time,
        content: p.content,
        status: p.status,
      },
      { onConflict: 'source_slug,locale' }
    )

    if (error) {
      console.error(`❌ ${p.slug}: ${error.message}`)
    } else {
      console.log(`✓ ${p.slug} — ${p.title}`)
    }
  }

  console.log('\n✅ Seed de blog completado.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
