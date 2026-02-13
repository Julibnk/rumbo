# Plan: Reorganizacion de contenido y estructura - Rumbo Norte Asturias

## Contexto

El sitio actual (WordPress) tiene 11 paginas con problemas significativos: contenido duplicado entre paginas, precios dispersos e inconsistentes, navegacion confusa con paginas redundantes, y CTAs que llevan a 5 destinos distintos. La reconstruccion en Astro es el momento ideal para corregir la arquitectura de informacion antes de implementar mas paginas.

Solo estan implementadas 2 paginas (index placeholder + barranquismo completa). Hay 7 componentes reutilizables ya creados.

---

## 1. Nueva estructura de paginas (10 paginas, antes 11)

### Paginas que se mantienen (con mejoras)

| URL | Contenido |
|-----|-----------|
| `/` | Homepage rediseñada |
| `/descenso-del-sella` | Actividad Sella (absorbe precios de grupo) |
| `/barranquismo` | Actividad Barranquismo + Coastering (ya implementada, refactorizar) |
| `/visita-lagos` | Actividad Lagos de Covadonga |
| `/packs` | Packs con calculo de ahorro visible |
| `/contacto` | Contacto + formulario de presupuesto personalizado |
| `/novedades` | Blog (MDX content collection) |
| `/iniciativa-rioslimpios` | Iniciativa medioambiental |

### Paginas nuevas

| URL | Contenido |
|-----|-----------|
| `/grupos` | Unifica "Descenso en Grupo" + "Viajes de Estudios" + Eventos |
| `/nosotros` | Historia, equipo, valores, #RiosLimpios preview, badges de confianza |

### Paginas eliminadas (con redirects 301)

| URL antigua | Redirige a | Razon |
|-------------|-----------|-------|
| `/descenso-en-grupo` | `/grupos` | Consolidada en pagina unica de grupos |
| `/viajes-de-estudios` | `/grupos` | Consolidada en pagina unica de grupos |
| `/reserva-descenso-sella` | Booking externo | Pagina intermedia sin valor, solo anade un click |
| `/visita-lagos-de-covadonga` | `/visita-lagos` | URL acortada |

---

## 2. Nueva navegacion

```
[Logo RumboNorte]

Descenso del Sella        (link directo)
Lagos de Covadonga         (link directo)
Barranquismo               (link directo)
Packs                      (link directo)
Grupos                     (link directo, sin dropdown)
Nosotros >                 (dropdown)
    Quienes Somos          (/nosotros)
    #RiosLimpios           (/iniciativa-rioslimpios)
    Contacto               (/contacto)
    Blog                   (/novedades)

[CTA: RESERVA YA!]        (booking externo)
```

**Cambios clave:**
- Se elimina el dropdown "Grupos" (era 2 items, ahora es 1 pagina directa)
- "Nosotros" se expande con pagina real + #RiosLimpios (antes escondida)
- Solo queda 1 dropdown, reduciendo carga cognitiva

**Ficheros a modificar:**
- `src/components/Header.astro` - Actualizar arrays navLinks y aboutLinks, eliminar groupLinks

---

## 3. Capa de datos centralizada

### Problema actual
Los datos (precios, specs, FAQ, horarios) estan hardcodeados inline en `barranquismo.astro` (lineas 11-93). Si el mismo precio aparece en la pagina de actividad Y en packs, se duplica y desincroniza.

### Solucion: ficheros TypeScript como single source of truth

```
src/data/
  types.ts                    # Interfaces TypeScript
  empresa.ts                  # Datos empresa (contacto, booking URL, badges, social)
  testimonios.ts              # Reviews de TripAdvisor curadas
  packs.ts                    # Definicion de packs (referencia actividades)
  actividades/
    index.ts                  # Re-exporta todas las actividades
    sella.ts                  # Todo sobre Sella: desc, hero, specs, pricing, FAQ, includes, pasos
    barranquismo.ts           # Todo sobre Barranquismo + Coastering
    lagos.ts                  # Todo sobre Lagos de Covadonga
```

### Booking URL centralizada
Actualmente hardcodeada en 5 sitios (Header, BookingFAB, HeroSection, CTABanner, barranquismo.astro). Mover a `empresa.ts` e importar en todos los componentes.

---

## 4. Estrategia de precios: todo visible en la pagina de actividad

### Antes (fragmentado)
- Sella individual: pagina Sella (35€)
- Sella grupo: pagina separada "Descenso en Grupo" (30€)
- Packs: pagina Packs (precios "desde" sin explicar)

### Despues (consolidado)

**Cada pagina de actividad muestra TODOS sus precios** en una tabla con columnas Individual/Grupo:

```
                    Individual        Grupo (+11 pers.)
Adultos             35€               30€
Ninos (<15)         25€               20€
Picnic              +6€               +5€
```

Esto elimina la necesidad de `/descenso-en-grupo` como pagina separada.

**Pagina de Packs** muestra ahorro explicito:
```
Pack Sella + Lagos: 45€ (ahorras 25€ vs 70€ por separado)
Pack Sella + Barranquismo: desde 65€ (varia segun nivel barranquismo)
```

### Componentes necesarios
- **PricingComparison.astro** (nuevo) - Tabla multi-columna Individual vs Grupo
- **PackCard.astro** (nuevo) - Card de pack con ahorro calculado
- **PricingTable.astro** (existente) - Anadir soporte para notas al pie

---

## 5. Estrategia de CTAs: 2 caminos claros

### CTA Primario: "RESERVA YA"
- Destino: `https://www.reservaonline.support/rumbonorte/index.html`
- Donde: Header, BookingFAB, Hero de cada pagina, CTABanner, seccion pricing
- Visual: Boton verde primary, shadow-brutal, border-2 border-black

### CTA Secundario: "PIDE PRESUPUESTO"
- Destino: `/contacto`
- Donde: Seccion de precios grupo, pagina `/grupos`, pie de paginas de actividad
- Visual: Boton outline (borde blanco/negro, sin relleno)

Se elimina la pagina intermedia `/reserva-descenso-sella` y cualquier otro destino.

---

## 6. Homepage rediseñada (8 secciones)

```
1. HERO - Imagen Sella, titulo "Rumbo hacia experiencias inolvidables", 2 CTAs
2. CARDS DE ACTIVIDAD - Grid asimetrico: Sella | Barranquismo | Lagos (con "desde X€")
3. COMPARADOR - "Cual es tu aventura?" tabla comparativa Sella vs Barranquismo vs Lagos
4. PACKS - "Combina y ahorra" con 2-3 packs destacados + link a /packs
5. BADGES DE CONFIANZA - Pet Friendly, Accesible, Seguros, Renovable
6. TESTIMONIOS - Scroll horizontal de 6-8 reviews de TripAdvisor
7. #RIOSLIMPIOS - Seccion dark: "300 kg de basura retirados del Sella" + link
8. CTA FINAL - Banner "Listos para la aventura?" + Reserva + telefono
```

**Eliminado del home actual:**
- Descripcion duplicada del Sella (ya esta en su pagina)
- Seccion "Nuevos Precios Temporada" (precios en paginas de actividad)
- Seccion "Reserva tu canoa" que llevaba a pagina intermedia

---

## 7. Contenido nuevo a anadir

| Contenido | Donde | Componente nuevo |
|-----------|-------|-----------------|
| Comparador de actividades | Homepage | `ActivityComparison.astro` |
| Testimonios/Reviews | Homepage, opcionalmente actividades | `Testimonials.astro` + `TestimonialCard.astro` |
| "Que incluye" visual | Paginas de actividad | `IncludesGrid.astro` |
| Proceso paso a paso | Paginas de actividad | `ProcessSteps.astro` |
| Cards de actividad | Homepage, Packs, cross-sell | `ActivityCard.astro` |
| Cards de grupo | /grupos | `GroupTypeCard.astro` |

### Badges de confianza
- **Sacar del footer** (actualmente se repiten en TODAS las paginas)
- **Poner en**: Homepage (seccion dedicada) y `/nosotros`
- Modificar: `Footer.astro` (eliminar seccion badges)

---

## 8. Secuencia de implementacion

### Fase 1: Capa de datos
1. Crear `src/data/types.ts` con interfaces
2. Crear `src/data/empresa.ts` (booking URL, contacto, badges, social)
3. Crear `src/data/actividades/sella.ts`, `barranquismo.ts`, `lagos.ts`
4. Crear `src/data/packs.ts` y `src/data/testimonios.ts`
5. Refactorizar `barranquismo.astro` para consumir datos de la capa

### Fase 2: Componentes
1. Modificar `Header.astro` (nueva navegacion)
2. Modificar `Footer.astro` (quitar badges, importar datos empresa)
3. Actualizar `BookingFAB.astro`, `HeroSection.astro`, `CTABanner.astro` (importar bookingUrl de empresa.ts)
4. Crear nuevos: `ActivityCard`, `ActivityComparison`, `Testimonials`, `PackCard`, `IncludesGrid`, `ProcessSteps`, `PricingComparison`

### Fase 3: Paginas de actividad
1. Construir `/descenso-del-sella` (con seccion de precios grupo integrada)
2. Construir `/visita-lagos`
3. Verificar `/barranquismo` tras refactor

### Fase 4: Paginas secundarias
1. Construir `/grupos` (despedidas, cumples, estudios)
2. Construir `/nosotros` (historia, equipo, badges, #RiosLimpios preview)
3. Construir `/contacto` (datos + formulario)
4. Construir `/packs` (con ahorro visible)

### Fase 5: Homepage
1. Implementar las 8 secciones de la homepage

### Fase 6: Blog e iniciativa
1. Configurar content collection MDX para blog
2. Construir `/novedades` (listado)
3. Construir `/iniciativa-rioslimpios`

### Fase 7: SEO y redirects
1. Configurar redirects en `astro.config.mjs`
2. Anadir JSON-LD schema (LocalBusiness, TouristAttraction)
3. Meta tags y OpenGraph por pagina
4. Sitemap

---

## 9. Ficheros criticos a modificar

| Fichero | Cambio |
|---------|--------|
| `src/components/Header.astro` | Nueva nav: eliminar groupLinks, actualizar aboutLinks |
| `src/components/Footer.astro` | Eliminar seccion badges, importar de empresa.ts |
| `src/components/BookingFAB.astro` | Importar bookingUrl de empresa.ts |
| `src/components/HeroSection.astro` | Importar bookingUrl de empresa.ts |
| `src/components/CTABanner.astro` | Importar bookingUrl, anadir CTA secundario opcional |
| `src/components/PricingTable.astro` | Anadir soporte para notas al pie |
| `src/pages/barranquismo.astro` | Refactorizar para usar capa de datos |
| `src/pages/index.astro` | Reconstruir completamente (8 secciones) |
| `astro.config.mjs` | Anadir redirects 301 |

---

## 10. Verificacion

- `npm run build` compila sin errores
- Todas las rutas de navegacion resuelven a paginas reales (sin 404)
- Redirects 301 funcionan para URLs antiguas
- Precios consistentes: mismo dato en actividad, packs y homepage
- Booking URL centralizada: cambiar en empresa.ts se refleja en todo el sitio
- Responsive: verificar mobile en todas las paginas
- Lighthouse: score >90 en Performance, SEO, Accessibility
