# Sistema de Lotes B2B - Tricholand

## Concepto

Los productos se venden en **lotes mayoristas** con un sistema flexible que permite:
- Un **pedido mínimo obligatorio** (primera compra)
- **Incrementos adicionales** en cantidades menores
- **Múltiples lotes completos** cuando se necesite más volumen

Todo trabajando con **UNIDADES** directamente, no con fracciones de lote.

---

## Configuración del producto (Admin)

### Campos necesarios

En el panel de administración, cada producto tiene estos 3 campos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Unidades por lote** (`units_per_lot`) | Cuántas plantas incluye un lote completo | 750 |
| **Pedido mínimo** (`min_order_qty`) | Cuántas unidades DEBE comprar como mínimo (primera compra obligatoria) | 750 |
| **Incremento mínimo** (`qty_step`) | Cuántas unidades puede añadir después del pedido mínimo | 150 |

### Visualización en admin

**Tabla de productos** (`/administrator/products`):

```
Producto | SKU | Precio | €/unidad | Stock | Activo | Acciones
Lote T. Pachanoi 45-55 cm    TRI-PAC-025-50    2.775,00 €    3,70 €    ∞    [ON]    Editar
lotes de 750 uds                                                ↑
                                                          Color azul
```

**Detalle de pedido** (`/administrator/orders/{id}`):

```
750× Lote T. Pachanoi 45-55 cm
750 unidades (plantas)              ← Clarificación en verde
TRI-PAC-025-50
```

### Ejemplo de configuración

**Producto**: Trichocereus Pachanoi 35-45 cm  
**Precio**: 2775€ / lote

```
Unidades por lote: 750
Pedido mínimo: 750 unidades
Incremento mínimo: 150 unidades
```

Esto significa:
- Cliente DEBE comprar primero 750 uds
- Después puede añadir de 150 en 150 uds
- También puede añadir otro lote completo de 750 uds

---

## Experiencia del cliente

### 1. Primera vez (producto NO en carrito)

El cliente ve un solo botón:

```
┌─────────────────────────────────────┐
│  Añadir al pedido (750 uds)        │
└─────────────────────────────────────┘
```

Al hacer clic → añade **750 unidades** al carrito.

### 2. Después (producto YA en carrito)

El cliente ve **2 botones + selector**:

```
┌──────────────────┐  ┌──────────────────┐
│ + Lote (750)     │  │ + 150 uds       │
└──────────────────┘  └──────────────────┘

┌─────────────────────────────────────┐
│ ▼ Añadir 150 uds                   │
├─────────────────────────────────────┤
│   Añadir 150 uds                   │
│   Añadir 300 uds                   │
│   Añadir 450 uds                   │
│   Añadir 600 uds                   │
│   Añadir 750 uds                   │
└─────────────────────────────────────┘
```

- **Botón izquierdo**: añade otro lote completo (750 uds)
- **Botón derecho**: añade la cantidad seleccionada
- **Selector**: elige múltiplos del incremento (150, 300, 450...)

### 3. Indicador de cantidad

En la esquina de la imagen del producto aparece:

```
┌─────────────┐
│ 1050 plantas│
└─────────────┘
```

### 4. Página de pedido

**Input editable** para modificar cantidad directamente:

```
[-]  [ 750 ]  [+]  uds    2.775,00 €
      ↑
  Escribible
```

**Desglose visual** de lotes:

```
├─ 1× Lote completo (750 uds) = 750 plantas
└─ 150 uds adicionales
TOTAL: 900 plantas
```

**Precio por unidad** siempre visible:

```
Lote T. Pachanoi 45-55 cm
Precio por unidad: 3,70 €     ← En azul claro
```

---

## Cantidades válidas

Con la configuración: mínimo 750, incremento 150:

### ✅ Cantidades permitidas

| Unidades | Composición |
|----------|-------------|
| 750 | 1 lote inicial |
| 900 | 750 + 150 |
| 1050 | 750 + 150 + 150 |
| 1200 | 750 + 150 + 150 + 150 |
| 1500 | 750 + 750 (2 lotes) |
| 1650 | 750 + 750 + 150 |
| 2250 | 750 + 750 + 750 (3 lotes) |

### ❌ Cantidades NO permitidas

| Unidades | Motivo |
|----------|--------|
| 500 | Menor que el pedido mínimo |
| 800 | No es múltiplo válido (750 + X donde X no es múltiplo de 150) |
| 1000 | No es múltiplo válido |

---

## Cálculo de precios

### Precio por unidad

Se calcula automáticamente:

```
Precio por unidad = Precio del lote / Unidades por lote
```

Ejemplo:
```
2775€ / 750 uds = 3.70€ por unidad
```

### Total del carrito

```
Total = Precio por unidad × Cantidad de unidades
```

Ejemplos:

| Unidades | Cálculo | Total |
|----------|---------|-------|
| 750 | 3.70€ × 750 | 2775.00€ |
| 900 | 3.70€ × 900 | 3330.00€ |
| 1050 | 3.70€ × 1050 | 3885.00€ |
| 1500 | 3.70€ × 1500 | 5550.00€ |

---

## Implementación técnica

### Modelo de datos

```typescript
interface Product {
  // ...otros campos
  units_per_lot: number    // 750
  min_order_qty: number    // 750  
  qty_step: number         // 150
  price_cents: number      // 277500 (2775.00€)
}
```

### Carrito

```typescript
interface CartItem {
  product: Product
  quantity: number  // Cantidad en UNIDADES (no lotes)
  notes: string
}
```

La cantidad se guarda siempre en **unidades**, no en lotes:
- `quantity: 750` = 750 unidades (1 lote)
- `quantity: 900` = 900 unidades (1 lote + 150 uds)
- `quantity: 1500` = 1500 unidades (2 lotes)

### Cálculo de precio en el carrito

```typescript
// Precio por unidad
const pricePerUnit = product.price_cents / product.units_per_lot

// Total del item
const itemTotal = pricePerUnit * item.quantity

// Total del carrito
const cartTotal = items.reduce(
  (sum, item) => sum + (item.product.price_cents / item.product.units_per_lot) * item.quantity,
  0
)
```

### Creación de pedidos (CRÍTICO)

Al enviar el pedido al backend, **el `unit_price_cents` DEBE ser el precio por unidad**, no el precio del lote:

```typescript
// ✅ CORRECTO
unit_price_cents: Math.round(product.price_cents / product.units_per_lot)
// Ejemplo: Math.round(277500 / 750) = 370 cents (3,70€/ud)

// ❌ INCORRECTO (causa precios astronómicos)
unit_price_cents: product.price_cents
// Esto causa que 750 uds × 2775€ = 2.081.250€
```

**Backend** luego calcula:
```typescript
total_cents = quantity * unit_price_cents
// 750 × 370 = 277500 cents = 2775€ ✓
```

---

## Visualización de precios

### Frontend (cliente)

| Ubicación | Muestra |
|-----------|---------|
| **Product card** | Precio/ud: 3,70 € (azul) |
| **Cart badge** | Total plantas + total € |
| **OrderForm - Lista** | Precio/ud + Desglose lotes + Total € |
| **OrderForm - Confirmación** | Precio/ud + Desglose + Total con IVA (grande) |
| **OrderForm - Sidebar** | Precio/ud + Desglose + Total con IVA (grande) |

### Backend (admin)

| Ubicación | Muestra |
|-----------|---------|
| **Tabla productos** | Precio lote + €/unidad (azul) |
| **Detalle pedido** | Cantidad × Producto + "X unidades (plantas)" (verde) |
| **PDF/Proforma** | Columna "Cant. (uds)" con valor "750 uds" |

---

## Casos de uso comunes

### Cliente mayorista estándar

- Primera compra: 750 uds
- Repite con cantidades similares: 750-900 uds por pedido

### Cliente con demanda variable

- Primera compra: 750 uds (obligatorio)
- Luego ajusta según demanda:
  - 900 uds (750 + 150)
  - 1200 uds (750 + 150 + 150 + 150)
  - 1500 uds (750 + 750) cuando hay alta demanda

### Cliente con gran volumen

- Compra múltiples lotes: 2250 uds (3 lotes)
- Añade incrementos para ajustar: 2400 uds (3 lotes + 150)

---

## Ventajas del sistema

1. **Flexibilidad**: permite ajustar cantidades sin obligar a lotes completos siempre
2. **Mínimo garantizado**: asegura volumen mínimo rentable (750 uds)
3. **Simplicidad**: el cliente entiende que trabaja con unidades, no con fracciones de lote
4. **Escalabilidad**: fácil añadir más sin cálculos complejos
5. **UX clara**: botones distintos para lote completo vs incremento adicional
6. **Transparencia**: precio por unidad siempre visible

---

## Preguntas frecuentes

### ¿Por qué no usar fracciones de lote?

Trabajar con fracciones (ej: 0.2 lotes) es confuso para el cliente. Es más intuitivo decir "añadir 150 unidades" que "añadir 0.2 lotes".

### ¿Puede un cliente comprar 600 uds directamente?

No. El **pedido mínimo es obligatorio** (750 uds). Después puede añadir incrementos de 150.

### ¿Puede añadir 100 uds extra?

No. Solo puede añadir múltiplos del **incremento mínimo** (150, 300, 450...).

### ¿Se puede configurar diferente por producto?

Sí. Cada producto tiene su propia configuración de:
- Unidades por lote
- Pedido mínimo
- Incremento mínimo

### ¿Qué pasa si quiere comprar 2000 uds exactas?

Con incremento de 150, no es posible. Las opciones más cercanas serían:
- 1950 uds (750 + 750 + 150 + 150 + 150)
- 2250 uds (750 + 750 + 750)

Si se necesita exactamente 2000, se debe ajustar la configuración del producto o hacer un pedido personalizado.

### ¿Por qué algunos pedidos antiguos tienen precios incorrectos?

Los pedidos creados **antes del commit `204e005`** (16/02/2026) tienen un bug donde `unit_price_cents` era el precio del lote completo en lugar del precio por unidad, causando cálculos incorrectos. Los nuevos pedidos se calculan correctamente.
