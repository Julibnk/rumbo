# Rumbo Norte Asturias - Web Rebuild

## Proyecto

Rediseno y reconstruccion de la web de Rumbo Norte Asturias (https://rumbonorteasturias.com), empresa de turismo activo en Arriondas, Asturias.

---

## Contenido de referencia

**IMPORTANTE**: El fichero `design/contenido.md` es la fuente de verdad para todo el contenido textual de la web (descripciones, tarifas, horarios, FAQ, etc.).

**Reglas de uso del contenido:**
- **SIEMPRE** usar el contenido de `design/contenido.md` para rellenar textos, a menos que se especifique explicitamente un texto concreto diferente
- **NUNCA** usar los textos que aparezcan en capturas de pantalla (screenshots) o ejemplos HTML de `design/` - estos son solo para referencia visual/de diseño
- Si una instruccion pide cambiar explicitamente el contenido, entonces se puede modificar
- Mantener todos los textos en **castellano** salvo indicacion contraria

El fichero contiene el scraping completo del sitio actual (WordPress + Elementor) con las 11 paginas: descripciones de actividades, tarifas completas, horarios, FAQ, material incluido, proceso paso a paso, y datos de empresa.

---

## Documentos de estrategia y planificacion

| Documento | Ruta | Descripcion |
|-----------|------|-------------|
| Plan UX | `mejoras-ux.md` | Plan completo de reorganizacion UX: nueva estructura de paginas, navegacion, capa de datos centralizada, estrategia de CTAs, homepage rediseñada (8 secciones), y secuencia de implementacion por fases |
| Informe SEO | `informe-seo.md` | Guia completa de SEO para developers: keywords objetivo, estructura de URLs, meta tags, JSON-LD schema, rendimiento, y recomendaciones especificas para negocio local de turismo activo |
| Plan animaciones | `animaciones.md` | Plan de animaciones sutiles: scroll animations con Intersection Observer, hover effects, accordion, y filosofia de movimiento coherente con el estilo brutalist |

**Consultar estos documentos antes de:**
- Crear paginas nuevas o reestructurar la navegacion → `mejoras-ux.md`
- Implementar meta tags, schema, sitemap o cualquier optimizacion para buscadores → `informe-seo.md`
- Anadir o modificar animaciones/transiciones → `animaciones.md`

---

## Stack tecnologico

- **Framework**: Astro 5.17.1 (static-first, zero JS por defecto)
- **Estilos**: Tailwind CSS 4.1.18 (via @tailwindcss/vite plugin)
- **TypeScript**: Modo strict
- **Contenido**: Pendiente Content Collections con MDX para blog
- **Interactividad**: Vanilla JS inline en componentes (carrusel, accordion, menu movil, mapa)
- **Mapas**: Leaflet 1.9.4 via CDN (unpkg.com), OpenStreetMap tiles
- **Deploy**: Pendiente (Cloudflare Pages o Vercel)
- **Imagenes**: WebP en `src/assets/images/`, optimizacion automatica de Astro (solo en homepage y grupos via `<Image>`)

---

## Estructura actual del proyecto

```
src/
  layouts/
    Base.astro                # Layout comun: SEO meta, Google Fonts, Header + Footer + WhatsAppFAB
  pages/                      # 6 paginas implementadas
    index.astro               # Homepage: hero video + elige aventura + packs + #RiosLimpios + mapa Leaflet
    descenso-del-sella.astro  # COMPLETA - hero split, specs, rutas, pricing comparativo, pasos, carousel, FAQ
    barranquismo.astro        # COMPLETA - hero split, specs, pricing por niveles, carousel, coastering, FAQ
    visita-lagos.astro        # COMPLETA - hero split (right), specs, features, pricing simple, FAQ
    grupos.astro              # COMPLETA - hero split, specs, viajes de estudios, tipos de grupo, pricing, FAQ
    contacto.astro            # COMPLETA - hero split (right), datos contacto, formulario presupuesto, mapa Leaflet
  components/                 # 13 componentes
    Header.astro              # Navbar fija con blur, dropdowns, menu movil hamburguesa
    Footer.astro              # Badges confianza + info empresa + links + legal
    HeroSection.astro         # 2 variantes: fullscreen (home) y split diagonal (actividades)
    CTABanner.astro           # Banner dark full-width con CTA centrado
    TechSpecs.astro           # Card lateral con specs tecnicas (duracion, dificultad, precio...)
    PricingTable.astro        # Tabla 3 columnas (nombre, detalles, precio) - barranquismo, lagos, grupos
    PricingComparison.astro   # Tabla comparativa Individual vs Grupo - sella
    Schedule.astro            # Cards de turnos/horarios con badge de hora
    FAQ.astro                 # Accordion colapsable con animacion suave
    ImageCarousel.astro       # Carrusel 3D con efecto polaroid, swipe, teclado
    ImageGallery.astro        # Grid masonry con lightbox (CREADO pero NO USADO en ninguna pagina)
    WhatsAppFAB.astro         # FAB flotante WhatsApp (activo en todas las paginas)
    BookingFAB.astro          # FAB de reserva alternativo (CREADO pero NO USADO)
  scripts/
    scrollAnimations.ts       # Intersection Observer para animaciones al scroll (.scroll-animate)
  styles/
    global.css                # Tailwind @theme + utilities custom (brutal shadows, clip-path, accordion, scroll anims)
  assets/images/
    actividades/              # 19 imagenes (sella x5, barranquismo x7, lagos x1, packs x2, grupos x1, viajes x1)
    blog/                     # 4 imagenes de blog
    branding/                 # logo-principal.png, header-principal.png, logo-rios-limpios.png, favicon.png
    varios/                   # contacto.webp
public/
  favicon.ico
  favicon.svg
  branding/                   # logo-rios-limpios.png (usado desde public/ en homepage)
design/
  contenido.md               # FUENTE DE VERDAD del contenido textual (421 lineas)
  code.html                   # Referencia visual del diseno (HTML/CSS)
  mejoras-ux.md               # Plan completo de reorganizacion UX (pendiente implementar)
  screenshots/                # Capturas de diseno de referencia
  images/                     # 195+ imagenes de referencia del sitio WordPress original
```

---

## Estado de implementacion

### Paginas completadas
- `/` (index) - Homepage con 5 secciones: hero fullscreen (video bg), "Elige tu aventura" (3 polaroid cards), "Combina y ahorra" (4 pack cards), #RiosLimpios (seccion dark con imagen rotada), "Encuentranos" (mapa Leaflet + datos contacto)
- `/descenso-del-sella` - Completa con hero split, TechSpecs, 2 rutas (15km/7.5km), PricingComparison (Individual vs Grupo), proceso 4 pasos, ImageCarousel (5 imgs), "que incluye" (7 items), Schedule, FAQ, callout Pet Friendly
- `/barranquismo` - Completa con hero split, TechSpecs, PricingTable (4 niveles + Coastering), ImageCarousel (7 imgs), seccion especial Coastering (dark theme con card rotada), Schedule, FAQ
- `/visita-lagos` - Completa con hero split (right), TechSpecs, 4 feature cards, PricingTable (adultos/ninos), "que llevar" (4 items), Schedule
- `/grupos` - Completa con hero split, TechSpecs, seccion Viajes de Estudios (Image + actividades + chips), tipos de grupo (2 cards: Cumpleanos, Empresas), PricingTable, "que incluye" (7 items), FAQ
- `/contacto` - Completa con hero split (right), datos contacto (4 items), formulario de presupuesto (mailto fallback), mapa Leaflet full-width

### Paginas pendientes (segun plan en mejoras-ux.md)
- `/packs` - Packs con calculo de ahorro visible (actualmente inline en homepage)
- `/nosotros` - Historia, equipo, valores, #RiosLimpios preview, badges
- `/novedades` - Blog (MDX content collection)
- `/iniciativa-rioslimpios` - Iniciativa medioambiental
- Paginas legales (privacidad, cookies, aviso legal)

### Sistema de animaciones - COMPLETADO
- Scroll animations con Intersection Observer (`scrollAnimations.ts`)
- 3 variantes: fadeInUp, fadeInLeft, fadeInRight
- Delays escalonados: 100ms, 200ms, 300ms
- Accordion con cubic-bezier para FAQ
- Hover effects en cards, botones, pricing, specs
- Soporte `prefers-reduced-motion` en todo

---

## Decisiones de diseno implementadas

- **Reservas externas**: Booking via `https://www.reservaonline.support/rumbonorte/index.html` (URL hardcodeada en Header y paginas)
- **Hero variantes**: `fullscreen` (home, video bg) y `split` (actividades, diagonal clip-path con splitPosition left/right)
- **Datos inline**: Todos los datos (precios, specs, FAQ, horarios) estan hardcodeados en cada pagina. Plan pendiente de crear capa centralizada en `src/data/`
- **WhatsApp como FAB principal**: Se usa WhatsAppFAB en lugar de BookingFAB. Mensaje pre-rellenado
- **Iconos**: Material Icons + Material Symbols Outlined (Google Fonts CDN)
- **Imagenes**: Importadas desde `src/assets/images/` para que Astro las optimice. Formatos WebP principalmente
- **Astro `<Image>`**: Solo se usa en homepage (polaroid cards) y grupos (viajes de estudios). El resto usa `<img>` estandar
- **Rutas internas**: Se usa `import.meta.env.BASE_URL.replace(/\/$/, '')` como `base` para construir hrefs entre paginas
- **Mapa interactivo**: Leaflet 1.9.4 via CDN (unpkg.com) en homepage y contacto, con marcador custom primary y scroll zoom tras click
- **Formulario contacto**: Usa mailto fallback (sin backend), construye email con datos del form
- **Sin Content Collections**: Aun no se ha configurado `src/content/` para blog ni datos

---

## Catalogo de componentes

### HeroSection
Props: `title`, `titleAccent`, `subtitle`, `badge`, `image`, `video`, `ctaText`, `ctaHref`, `variant` (fullscreen|split), `splitPosition` (left|right)
- Titulo con SVG underline decorativo en `titleAccent`
- Badge rotado en esquina
- Boton CTA con shadow-brutal

### TechSpecs
Props: `title?`, `specs[]` → `{icon: string (Material Symbols), label: string, value: string}`
- Card blanca con borde primary, animaciones scroll + hover

### PricingTable
Props: `title`, `columns` (3 headers), `rows[]` → `{name, details, price}`
- Header forest-dark, filas alternas, hover con borde izquierdo

### PricingComparison
Props: `title`, `subtitle`, `rows[]` → `{name, details?, individual, grupo}`
- Tabla 3 columnas: concepto, precio individual, precio grupo (+11 personas)

### Schedule
Props: `title`, `shifts[]` → `{name, description, time}`
- Cards con borde izquierdo primary, badge de hora

### FAQ
Props: `title`, `items[]` → `{question, answer}`
- Accordion con toggle JS, animacion max-height + opacity

### ImageCarousel
Props: `title`, `titleAccent`, `images[]` → `{src, alt, location, caption}`
- Card central grande (70%), laterales pequenas (55%) rotadas
- Navegacion flechas + dots + teclado + swipe tactil

### ImageGallery (sin usar)
Props: `title`, `subtitle`, `images[]`
- Grid masonry con featured image, lightbox fullscreen

### CTABanner
Props: `title`, `ctaText`, `ctaHref?`
- Seccion dark full-width con textura stardust overlay

### WhatsAppFAB
Sin props. Hardcoded: numero, mensaje, animacion de entrada + pulso

### BookingFAB (sin usar)
Sin props. Alternativa a WhatsAppFAB con icono calendario

---

## Patrones y convenciones del codigo

### Estructura de paginas de actividad
Todas las paginas de actividad siguen este patron:
1. Imports de componentes e imagenes
2. Datos hardcodeados como constantes (specs, pricing, shifts, faq, images)
3. `<Base title="..." description="...">`
4. `<HeroSection variant="split" .../>`
5. Seccion descripcion + `<TechSpecs />` en grid 7/5 o 8/4
6. Secciones especificas de la actividad (rutas, features, pasos...)
7. `<CTABanner />`
8. Pricing (PricingTable o PricingComparison)
9. `<ImageCarousel />` (si tiene galeria)
10. `<Schedule />`
11. `<FAQ />`

### Clases CSS custom disponibles (global.css)
- `.text-stroke-sm` - Texto outline sin relleno
- `.clip-slant-bottom` / `.clip-slant-top` - Cortes diagonales entre secciones
- `.shadow-brutal` / `.shadow-brutal-sm` - Sombras brutalist (4px/2px offset negro)
- `.fab-shadow` - Sombra verde para FABs
- `.no-scrollbar` - Ocultar scrollbar
- `.scroll-animate` + `data-animation` + `data-delay` - Animaciones al scroll
- `.accordion-content` / `.accordion-item.open` - Acordeon animado

### Scroll animations
Uso: `<div class="scroll-animate" data-animation="fadeInUp" data-delay="100">`
Variantes: `fadeInUp`, `fadeInLeft`, `fadeInRight`
Delays: `100`, `200`, `300`

---

## Guia de estilos

Referencia visual en `design/code.html` y `design/screenshots/`.

### Paleta de colores (definida en global.css @theme)

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--color-primary` | `#8cb950` | Color principal verde: CTAs, acentos, iconos, bordes activos |
| `--color-background-light` | `#f6f8f6` | Fondo general claro (casi blanco verdoso) |
| `--color-forest-dark` | `#225133` | Fondos oscuros: footer, secciones dark, header pricing |
| `--color-stone-gray` | `#e8ebe8` | Fondo de secciones alternas |

### Ritmo de fondos entre secciones

Las paginas alternan fondos para crear ritmo visual. Patron en paginas de actividad:

| Orden | Fondo | Ejemplo |
|-------|-------|---------|
| Hero | Imagen + overlay forest-dark | Todas las paginas |
| Seccion 1 | `bg-background-light` | Descripcion + TechSpecs |
| Seccion 2 | `bg-white` | Rutas/Features/Cards |
| CTA Banner | `bg-forest-dark` + stardust | Separador oscuro |
| Pricing | `bg-white` | Tabla de precios |
| Seccion N | `bg-background-light` | Carrusel, Incluye |
| Schedule+FAQ | `bg-white` | Cierre |

Homepage usa: `stone-gray` → `bg-white` → `bg-forest-dark` → `bg-primary` (unico, solo en homepage para "Encuentranos").

### Textura stardust overlay

Se usa una textura como overlay decorativo en secciones dark y destacadas:
```html
<div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
```
- Secciones `bg-forest-dark`: `opacity-10` (CTA Banner, Coastering, #RiosLimpios)
- Secciones `bg-stone-gray`: `opacity-10` (Elige tu aventura)
- Secciones `bg-primary`: `opacity-10` (Encuentranos)
- Hero fullscreen: `opacity-30`

**Nota**: URL externa, dependencia fragil. Considerar descargar como asset local.

### Tipografia

- **Familia**: `Space Grotesk` (var `--font-display`), pesos 300-700
- **Efecto especial**: `.text-stroke-sm` para palabras outline destacadas

#### Jerarquia de encabezados

**Titulos de seccion (h2):**
- Paginas de actividad: `text-4xl font-bold uppercase` (con o sin `md:text-5xl`)
- Homepage: `text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight`
- Secciones dark: `text-4xl md:text-5xl font-bold text-white leading-tight uppercase`

**Eyebrow labels (sobre titulos):**
`text-primary font-bold tracking-widest uppercase text-sm block mb-4`

**Subtitulos de seccion:**
`text-lg md:text-xl text-gray-600 font-light mt-6 max-w-2xl mx-auto leading-relaxed`

**Titulos de card (h3):**
- Cards grandes: `text-2xl font-bold` (sin uppercase)
- Polaroid cards: `text-lg md:text-xl font-bold uppercase tracking-tight`

**Cita italica (usada en barranquismo, lagos, grupos):**
`text-lg text-gray-600 italic border-l-4 border-primary pl-4 mt-6`

**Texto en secciones dark:**
- Cuerpo: `text-xl text-gray-300 font-light leading-relaxed`
- Datos/precios: `text-primary font-bold text-2xl`
- Unidad/contexto: `text-base text-gray-400 font-normal`

**Gradient text (titulos con degradado):**
`text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-dark`

#### Elemento decorativo SVG underline

SVG curvo reutilizable debajo de palabras accent:
```html
<svg class="absolute w-full h-3 -bottom-1 left-0" fill="none" viewBox="0 0 200 9">
  <path d="M2.00025 6.99999C18.4924 3.00001 77.5002 -3.49997 198 2.50001"
        stroke="currentColor" stroke-linecap="round" stroke-width="3" />
</svg>
```
- Hero (titleAccent): `text-white opacity-80`
- Seccion "Elige tu aventura": `text-forest-dark opacity-60`

#### Linea decorativa bajo titulos

En componentes (PricingTable, PricingComparison, secciones inline):
`<div class="w-20 h-1.5 bg-primary mt-4"></div>`

### Sistema de espaciado

**Padding de secciones:**
- Secciones grandes: `py-24 md:py-32` (homepage) o `py-24` (paginas de actividad)
- Secciones medias: `py-20` (CTA Banner, #RiosLimpios, Coastering)

**Container estandar:**
`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Excepcion homepage "Encuentranos": `max-w-6xl`
- Excepcion lagos Schedule: `max-w-3xl` centrado

**Gaps en grids:**
- `gap-16` → Grids principales (descripcion + TechSpecs, Schedule + FAQ)
- `gap-12` → Contenido denso (Coastering, #RiosLimpios, viajes estudios)
- `gap-8` → Cards medianas (rutas, features, polaroids)
- `gap-6` → Cards pequenas (process steps, packs)
- `gap-4` → Items compactos (incluye, que llevar)

**Card padding:**
- `p-8` → Cards grandes (rutas, TechSpecs, features, formulario)
- `p-6` → Cards medias (packs, process, schedule)
- `p-4` → Items pequenos (incluye, specs individuales, que llevar)
- `p-3 md:p-4` → Polaroid cards

### Sombras y bordes

- **Botones CTA**: `.shadow-brutal` (4px 4px negro) + `border-2 border-black`
- **Cards**: `shadow-xl` / `shadow-2xl` + `border border-gray-200`
- **FAB**: `.fab-shadow` (glow verde)
- **Border radius**: `--radius: 0.5rem`, `--radius-lg: 1rem`, `--radius-xl: 1.5rem`

### Variantes de botones CTA

**CTA principal (hero, secciones destacadas):**
```
bg-primary hover:bg-white text-black font-bold px-8 py-4 rounded-xl
shadow-brutal hover:shadow-brutal-sm hover:translate-x-[2px] hover:translate-y-[2px]
transition-all border-2 border-black uppercase tracking-wider
```

**CTA en CTABanner (grande, centrado):**
```
bg-primary hover:bg-white text-black font-black text-xl md:text-2xl
px-12 py-6 rounded-2xl hover:scale-105 transition-all shadow-2xl
uppercase tracking-tighter border-b-8 border-black/20
```

**CTA secundario (packs, formularios):**
```
bg-gray-900 hover:bg-primary text-white hover:text-black font-bold text-sm
py-3 rounded-xl transition-all duration-300 uppercase tracking-wider
```

**CTA pack destacado (forest-dark):**
```
bg-forest-dark hover:bg-primary text-white hover:text-black font-bold text-sm
py-3 rounded-xl transition-all duration-300 uppercase tracking-wider
```

**CTA en Header (desktop):**
```
bg-black text-white px-6 py-2 rounded-full font-bold uppercase text-sm
hover:bg-primary hover:text-black hover:-translate-y-0.5 shadow-lg border-2 border-black
```

### Patron de imagen rotada (polaroid/stacked)

Efecto de imagen con capa de fondo rotada, usado en Coastering, #RiosLimpios y carrusel:
```html
<div class="relative group">
  <div class="absolute inset-0 bg-primary rounded-xl transform rotate-3 translate-x-2 translate-y-2
              group-hover:rotate-6 transition-transform duration-300"></div>
  <div class="relative rounded-xl overflow-hidden border-4 border-white shadow-2xl
              transform -rotate-2 group-hover:rotate-0 transition-transform duration-300">
    <img ... />
  </div>
</div>
```

### Variantes de icono en circulo

**Grande (process steps, features):**
```html
<span class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
  <span class="material-symbols-outlined text-primary text-3xl">icon_name</span>
</span>
```

**Media (footer, contacto homepage):**
```html
<span class="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
  <span class="material-symbols-outlined text-primary text-xl">icon_name</span>
</span>
```

**Pequena (packs, incluye):**
```html
<span class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
  <span class="material-symbols-outlined text-primary text-base">icon_name</span>
</span>
```

### Sistema de badges y labels

**Badge rotado (hero, coastering):**
`inline-block px-3 py-1 bg-primary text-black font-bold text-xs uppercase tracking-widest rounded-full border-2 border-black`
En hero: anade `rotate-2 transform` y `px-4`

**Badge flotante (pack destacado):**
`absolute -top-3 left-1/2 -translate-x-1/2 bg-forest-dark text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider whitespace-nowrap`

**Badge de precio (polaroid cards):**
`absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-forest-dark font-bold text-sm px-3 py-1.5 rounded-full shadow-md`

**Badge de ahorro (packs):**
`text-primary text-xs font-bold`

### Interacciones / Hover por componente

- **Cards genericas**: `hover:-translate-y-1 hover:shadow-xl transition-all duration-300`
- **Polaroid cards**: `hover:scale-[1.03] hover:-translate-y-2 hover:z-10` + rotation reset
- **Cards con borde**: Default `border-2 border-gray-200`, hover `hover:border-primary/40`
- **Botones**: `-translate-y-0.5` para efecto lift
- **Imagenes en cards**: `scale-110` con `transition-transform duration-700`
- **Navbar**: `backdrop-blur-md` con fondo semitransparente
- **Pricing rows**: `hover:bg-primary/15 hover:border-l-4 hover:border-l-primary`, precio `group-hover:scale-110`
- **Schedule cards**: `hover:border-l-8` (expande de 4 a 8), `hover:-translate-y-1 hover:shadow-xl`
- **TechSpecs items**: `hover:bg-primary/10 hover:-translate-y-1 hover:shadow-md`, icon `group-hover:scale-110`, label `group-hover:text-primary`

### Hero overlay patterns

**Fullscreen (homepage):**
- Imagen/video: `brightness-[0.7] contrast-125`
- Overlay: `bg-forest-dark/40` + stardust `opacity-30`
- Contenido centrado

**Split (actividades):**
- Mobile: `bg-gradient-to-t from-forest-dark/90 via-forest-dark/40 to-transparent`
- Desktop left: `clip-path: polygon(0 0, 60% 0, 50% 100%, 0% 100%)` con gradiente 85%→60%→25%
- Desktop right: `clip-path: polygon(50% 0, 100% 0, 100% 100%, 40% 100%)` con gradiente inverso

### Iconografia

- **Material Icons + Material Symbols Outlined** (Google Fonts CDN)
- Estilo: iconos dentro de circulos con fondo primary y opacidad variable (ver variantes arriba)

### Elementos de diseno adicionales

- **Secciones diagonales**: `.clip-slant-bottom` / `.clip-slant-top`
- **Chips/tags**: `inline-flex items-center gap-1.5 bg-background-light text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200` (usado en grupos)

---

## Deuda tecnica y mejoras pendientes

### Arquitectura (plan completo en `mejoras-ux.md`)
1. **Booking URL duplicada** en Header, HeroSection, CTABanner, BookingFAB, y paginas → Centralizar en `src/data/empresa.ts`
2. **Datos hardcodeados** en cada pagina → Crear capa `src/data/` con TypeScript como single source of truth
3. **Navegacion** necesita refactor: eliminar dropdown "Grupos", anadir pagina `/nosotros`
4. **Badges de confianza** en footer → Mover a seccion dedicada en homepage y /nosotros
5. **Content Collections** no configuradas → Necesarias para blog

### Dependencias externas fragiles
- **Textura stardust**: `https://www.transparenttextures.com/patterns/stardust.png` → Descargar como asset local
- **Hero homepage**: imagen de Google `lh3.googleusercontent.com` + video de WordPress `rumbonorteasturias.com`
- **Coastering img**: imagen de Google `lh3.googleusercontent.com`
- **Leaflet**: CDN `unpkg.com/leaflet@1.9.4` (CSS + JS) → Considerar instalar via npm
- **Google Fonts**: CDN para Space Grotesk y Material Symbols → Considerar self-hosting

### Inconsistencias detectadas
- **Scroll animations**: Lagos tiene muchas menos animaciones que otras paginas (solo TechSpecs). Las feature cards y "que llevar" no usan `scroll-animate`
- **Astro `<Image>` vs `<img>`**: Solo homepage polaroids y grupos viajes usan `<Image>` optimizado. El resto usa `<img>` sin optimizar
- **Codigo Leaflet duplicado**: Mismo codigo de mapa copy-paste en homepage y contacto → Extraer componente `Map.astro`

### Funcionalidades pendientes
- Homepage: faltan secciones de testimonios, CTA final (de las 8 planeadas en mejoras-ux.md)
- 3 paginas por construir (packs, nosotros, novedades/blog) + pagina rioslimpios
- Paginas legales
- JSON-LD schema (LocalBusiness, TouristAttraction)
- OpenGraph meta tags por pagina
- Sitemap generation
- Redirects 301 para URLs antiguas de WordPress

### Componentes planificados pero no creados
- `ActivityCard.astro` - Card de actividad para homepage/cross-sell
- `ActivityComparison.astro` - Comparador de actividades
- `Testimonials.astro` + `TestimonialCard.astro` - Reviews
- `PackCard.astro` - Card de pack con ahorro calculado
- `ProcessSteps.astro` - Proceso paso a paso (actualmente inline en sella)
- `Map.astro` - Mapa Leaflet reutilizable (actualmente duplicado en homepage + contacto)
