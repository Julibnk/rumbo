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

## Stack tecnologico

- **Framework**: Astro 5.17.1 (static-first, zero JS por defecto)
- **Estilos**: Tailwind CSS 4.1.18 (via @tailwindcss/vite plugin)
- **TypeScript**: Modo strict
- **Contenido**: Pendiente Content Collections con MDX para blog
- **Interactividad**: Vanilla JS inline en componentes (carrusel, accordion, menu movil)
- **Deploy**: Pendiente (Cloudflare Pages o Vercel)
- **Imagenes**: WebP en `src/assets/images/`, optimizacion automatica de Astro

---

## Estructura actual del proyecto

```
src/
  layouts/
    Base.astro                # Layout comun: SEO meta, Google Fonts, Header + Footer + WhatsAppFAB
  pages/                      # 4 paginas implementadas
    index.astro               # PLACEHOLDER - solo hero con video, necesita reconstruccion completa
    descenso-del-sella.astro  # COMPLETA - hero split, specs, rutas, pricing comparativo, pasos, carousel, FAQ
    barranquismo.astro        # COMPLETA - hero split, specs, pricing por niveles, carousel, coastering, FAQ
    visita-lagos.astro        # COMPLETA - hero split (right), specs, features, pricing simple, FAQ
  components/                 # 13 componentes
    Header.astro              # Navbar fija con blur, dropdowns, menu movil hamburguesa
    Footer.astro              # Badges confianza + info empresa + links + legal
    HeroSection.astro         # 2 variantes: fullscreen (home) y split diagonal (actividades)
    CTABanner.astro           # Banner dark full-width con CTA centrado
    TechSpecs.astro           # Card lateral con specs tecnicas (duracion, dificultad, precio...)
    PricingTable.astro        # Tabla 3 columnas (nombre, detalles, precio) - barranquismo, lagos
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
- `/descenso-del-sella` - Completa con hero split, TechSpecs, 2 rutas (15km/7.5km), PricingComparison (Individual vs Grupo), proceso 4 pasos, ImageCarousel (5 imgs), "que incluye" (7 items), Schedule, FAQ, callout Pet Friendly
- `/barranquismo` - Completa con hero split, TechSpecs, PricingTable (4 niveles + Coastering), ImageCarousel (7 imgs), seccion especial Coastering (dark theme con card rotada), Schedule, FAQ
- `/visita-lagos` - Completa con hero split (right), TechSpecs, 4 feature cards, PricingTable (adultos/ninos), "que llevar" (4 items), Schedule

### Paginas parciales
- `/` (index) - Solo tiene hero con video de fondo. Necesita reconstruccion completa con 8 secciones (ver plan en `design/mejoras-ux.md`)

### Paginas pendientes (segun plan en mejoras-ux.md)
- `/packs` - Packs con calculo de ahorro visible
- `/grupos` - Unifica "Descenso en Grupo" + "Viajes de Estudios" + Eventos
- `/nosotros` - Historia, equipo, valores, #RiosLimpios preview, badges
- `/contacto` - Datos de contacto + formulario de presupuesto
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

- **Reservas externas**: Booking via `https://www.reservaonline.support/rumbonorte/index.html` (URL hardcodeada en 5+ sitios)
- **Hero variantes**: `fullscreen` (home, video bg) y `split` (actividades, diagonal clip-path con splitPosition left/right)
- **Datos inline**: Todos los datos (precios, specs, FAQ, horarios) estan hardcodeados en cada pagina. Plan pendiente de crear capa centralizada en `src/data/`
- **WhatsApp como FAB principal**: Se usa WhatsAppFAB en lugar de BookingFAB. Mensaje pre-rellenado
- **Iconos**: Material Icons + Material Symbols Outlined (Google Fonts CDN)
- **Imagenes**: Importadas desde `src/assets/images/` para que Astro las optimice. Formatos WebP principalmente
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

### Tipografia
- **Familia**: `Space Grotesk` (var `--font-display`), pesos 300-700
- **Headlines**: Bold, uppercase, tracking-tight, tallas 6xl-9xl en hero
- **Labels/nav**: Uppercase, `tracking-widest`, text-sm, font-bold
- **Body**: font-light/medium, text-lg/xl, `leading-relaxed`
- **Efecto especial**: `.text-stroke-sm` para palabras outline destacadas

### Sombras y bordes
- **Botones CTA**: `.shadow-brutal` (4px 4px negro) + `border-2 border-black`
- **Cards**: `shadow-xl` / `shadow-2xl` + `border border-gray-200`
- **FAB**: `.fab-shadow` (glow verde)
- **Border radius**: `--radius: 0.5rem`, `--radius-lg: 1rem`, `--radius-xl: 1.5rem`

### Elementos de diseno
- **Secciones diagonales**: `.clip-slant-bottom` / `.clip-slant-top`
- **Cards rotadas**: `-rotate-1` a `rotate-2` que se endereza al hover (efecto polaroid)
- **Texturas de fondo**: Overlays stardust con `opacity-10/30`
- **Gradient text**: `text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-dark`

### Interacciones / Hover
- Cards: `rotate(0deg) + scale(1.05)` al hover
- Botones: `-translate-y-0.5` para efecto lift
- Imagenes en cards: `scale-110` con `transition-transform duration-700`
- Navbar: `backdrop-blur-md` con fondo semitransparente
- Pricing rows: border-left primary + price scale al hover
- TechSpecs items: lift + icon scale + color change

### Iconografia
- **Material Icons + Material Symbols Outlined** (Google Fonts CDN)
- Estilo: iconos dentro de circulos `bg-primary/20` con color `text-primary`

---

## Deuda tecnica y mejoras pendientes

### Arquitectura (plan completo en `design/mejoras-ux.md`)
1. **Booking URL duplicada** en Header, HeroSection, CTABanner, BookingFAB, y paginas → Centralizar en `src/data/empresa.ts`
2. **Datos hardcodeados** en cada pagina → Crear capa `src/data/` con TypeScript como single source of truth
3. **Navegacion** necesita refactor: eliminar dropdown "Grupos", anadir pagina `/nosotros`
4. **Badges de confianza** en footer → Mover a seccion dedicada en homepage y /nosotros
5. **Content Collections** no configuradas → Necesarias para blog

### Funcionalidades pendientes
- Homepage completa (8 secciones segun plan)
- 6 paginas por construir (packs, grupos, nosotros, contacto, novedades, rioslimpios)
- Paginas legales
- JSON-LD schema (LocalBusiness, TouristAttraction)
- OpenGraph meta tags por pagina
- Sitemap generation
- Redirects 301 para URLs antiguas de WordPress
- Formulario de contacto/presupuesto

### Componentes planificados pero no creados
- `ActivityCard.astro` - Card de actividad para homepage/cross-sell
- `ActivityComparison.astro` - Comparador de actividades
- `Testimonials.astro` + `TestimonialCard.astro` - Reviews
- `PackCard.astro` - Card de pack con ahorro calculado
- `ProcessSteps.astro` - Proceso paso a paso (actualmente inline en sella)
- `GroupTypeCard.astro` - Tipos de grupo
