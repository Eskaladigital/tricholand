export interface Variety {
  slug: string
  code: string              // TRI-PAC, TRI-PER, etc.
  name: string              // T. Pachanoi
  scientificName: string    // Echinopsis pachanoi
  commonName: string        // San Pedro
  description: string
  image: string
  imageAlt: string
  gallery: string[]
  sizeRange: string         // "10–50 cm"
  stock: 'available' | 'limited' | 'out_of_stock'
  highlights: string[]      // Características clave
  care: {
    light: string
    water: string
    temperature: string
    soil: string
  }
}

export interface VarietyMeta {
  slug: string
  code: string
  name: string
  scientificName: string
  commonName: string
  image: string
  imageAlt: string
  sizeRange: string
  stock: 'available' | 'limited' | 'out_of_stock'
}
