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
import { marked } from 'marked'
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
    image: '/images/blog/Tricholand_blog_1.webp',
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
    image: '/images/blog/Tricholand_blog_2.webp',
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
    image: '/images/blog/Tricholand_blog_3.webp',
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
  {
    slug: 'guia-de-enfermedades-fungicas-en-cactus-como-prevenir-y-tratarlas',
    title: 'Guía de enfermedades fúngicas en cactus: cómo prevenir y tratarlas',
    description:
      'Identifica las principales enfermedades por hongos en cactus (manchas, podredumbres y mohos), aprende a prevenirlas con buen riego y ventilación, y aplica tratamientos seguros y efectivos.',
    date: '2024-10-03',
    image: '/images/blog/Tricholand_blog_4.webp',
    image_alt: 'Cactus con síntomas de hongos y tratamiento preventivo',
    tags: ['cactus', 'hongos', 'enfermedades', 'prevención', 'tratamiento'],
    reading_time: 10,
    content: `Las enfermedades fúngicas (causadas por hongos) son una de las razones más comunes de pérdidas en colecciones y viveros de cactus. Suelen aparecer cuando se combinan **humedad alta**, **poco intercambio de aire**, **sustratos demasiado orgánicos** y/o **heridas** en el tejido.

En esta guía vas a aprender a reconocer los síntomas típicos, las causas más habituales y un protocolo práctico de prevención y tratamiento para minimizar recaídas.

## 1) Cómo reconocer un problema fúngico

Aunque no siempre es fácil distinguir hongos de bacterias o plagas, hay señales bastante típicas:

- **Manchas circulares** marrones/negras que crecen lentamente.
- **Áreas hundidas** (necrosis) y corchosidad (tejido “acorchado”).
- **Podredumbre blanda** en la base (cuello) o en raíces, con mal olor en fases avanzadas.
- **Moho gris** superficial en heridas o zonas blandas (especialmente en ambientes fríos y húmedos).
- **Detención del crecimiento** y decoloración general cuando el daño es interno.

Importante: un cactus puede “cicatrizar” (corchar) una lesión antigua. Lo preocupante es que la mancha **avance**, aparezca tejido **blando** o haya **exudados**.

## 2) Causas más frecuentes

En cactus, los hongos suelen aprovechar condiciones de estrés:

- **Riego excesivo** o riegos frecuentes sin secado completo.
- **Sustrato poco drenante** (demasiada turba, fibra de coco fina o tierra compacta).
- **Macetas sin buena aireación** o platos con agua.
- **Poca ventilación** en invernadero o interior (aire estancado).
- **Temperaturas bajas** con humedad alta (muy típico en otoño/invierno).
- **Heridas** por trasplantes, granizo, roces, insectos o cortes de esquejes.
- **Herramientas no desinfectadas** que transmiten patógenos.

## 3) Hongos habituales (y qué suelen provocar)

Sin entrar en diagnóstico de laboratorio, estas son categorías útiles:

- **Hongos de podredumbre de raíz/cuello**: suelen atacar cuando hay exceso de humedad. El cactus se ablanda desde la base y puede colapsar.
- **Hongos vasculares**: provocan decoloraciones internas y deterioro progresivo. A veces se ve un anillo marrón al cortar.
- **Mohos oportunistas en heridas**: aparecen en cortes recientes o zonas dañadas si no secan bien.

Si el daño avanza rápido, hay mal olor o el tejido se licúa, actúa cuanto antes.

## 4) Protocolo de prevención (lo que más funciona)

La prevención suele ser el 80% del éxito:

### Sustrato y maceta
- Usa un sustrato **muy drenante**: alto porcentaje mineral (pómice, grava volcánica, perlita, arena gruesa).
- Evita mezclas “de interior” muy orgánicas.
- Asegura **agujeros de drenaje** y no dejes agua acumulada.

### Riego
- Riega solo cuando el sustrato esté **completamente seco**.
- En frío, reduce mucho el riego (o suspéndelo según especie y temperaturas).
- Mejor un riego profundo y espaciado que “sorbos” frecuentes.

### Ventilación y luz
- Ventila bien: en interior, evita rincones sin movimiento de aire.
- Luz suficiente: cactus debilitados enferman más.

### Higiene
- Desinfecta herramientas (alcohol isopropílico) antes y después de cada planta.
- Aísla plantas nuevas 2–3 semanas para observar síntomas.

## 5) Qué hacer si ya hay síntomas

### Paso 1: Aislar y evaluar
Separa la planta para evitar contagios. Evalúa si la lesión está:
- **Superficial y seca** (mejor pronóstico).
- **Activa, blanda o extendiéndose** (hay que intervenir).

### Paso 2: Detener el riego
Si sospechas hongos, **para el riego inmediatamente**. Mantener el sustrato húmedo suele acelerar el problema.

### Paso 3: Revisar raíces y cuello (si aplica)
Si el problema parece venir de la base:

- Saca la planta de la maceta.
- Elimina todo el sustrato viejo.
- Revisa raíces: si hay partes **negras/blandas**, córtalas hasta tejido sano.

Deja secar al aire (sombra luminosa, buena ventilación) 24–72 horas antes de replantar.

### Paso 4: Saneado del tejido afectado
Si la lesión está en el cuerpo del cactus y avanza:

- Con una herramienta limpia, corta/raspa hasta llegar a tejido firme.
- Desinfecta la herramienta entre cortes.
- Deja la zona **secar** y formar una capa protectora.

### Paso 5: Tratamiento (opciones habituales)
El tratamiento exacto depende del país y del producto disponible. Aun así, el enfoque general es:

- **Fungicida de contacto** (preventivo): suele usarse en lesiones superficiales o como apoyo tras saneado.
- **Fungicida sistémico** (curativo): se reserva para casos más serios o recurrentes.

Sigue siempre la etiqueta del producto (dosis, frecuencia, compatibilidades) y evita tratar a pleno sol o con temperaturas extremas.

### Paso 6: Replantado y cuarentena
- Replanta en sustrato **nuevo y estéril**, con mayor proporción mineral.
- No riegues durante varios días (o incluso 1–2 semanas) para permitir cicatrización.
- Mantén la planta en **cuarentena** y observa si la mancha se estabiliza o continúa creciendo.

## 6) Caso típico: podredumbre en la base (salvar por corte)

Si el cactus está blando desde abajo, a menudo lo más efectivo es:

- Cortar por encima de la zona afectada hasta ver tejido limpio (sin decoloración).
- Dejar el esqueje **cicatrizar** en un lugar seco y ventilado.
- Enraizar en sustrato muy mineral, con riegos mínimos al inicio.

## 7) Checklist rápido (para no volver a caer)

- Sustrato más mineral y drenante
- Riego solo cuando seque al 100%
- Ventilación real (aire en movimiento)
- Herramientas desinfectadas
- Plantas nuevas en cuarentena

Con estos cambios, la mayoría de problemas fúngicos en cactus se reducen drásticamente y, cuando aparecen, se controlan mucho antes de que avancen.`,
    locale: 'es',
    status: 'published',
  },
]

async function main() {
  console.log('📝 Insertando posts del blog en Supabase...\n')

  for (const p of POSTS) {
    const contentHtml = typeof p.content === 'string' && p.content.trim().startsWith('<')
      ? p.content
      : (marked.parse(p.content, { async: false }))
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
        content: contentHtml,
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
