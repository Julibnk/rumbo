# Rumbo Norte Asturias - Web Rebuild

## Proyecto

Rediseno y reconstruccion de la web de Rumbo Norte Asturias (https://rumbonorteasturias.com), empresa de turismo activo en Arriondas, Asturias.

## Contenido de referencia

El fichero `rumbonorteasturias-contenido.md` contiene el scraping completo del sitio actual (WordPress + Elementor) con todo el contenido, tarifas, estructura y textos de las 11 paginas.

## Stack tecnologico

- **Framework**: Astro (static-first, zero JS por defecto)
- **Estilos**: Tailwind CSS
- **Contenido**: Content Collections con MDX para blog y datos en YAML
- **Interactividad**: Astro Islands solo donde sea necesario (galeria, mapa)
- **Deploy**: Cloudflare Pages o Vercel (gratis, CDN global, deploy con git push)
- **Imagenes**: Optimizacion automatica de Astro (WebP, responsive)

## Estructura del proyecto

```
src/
  layouts/Base.astro          # Layout comun (header, footer, SEO)
  pages/                      # 1 fichero = 1 ruta
    index.astro
    descenso-del-sella.astro
    barranquismo.astro
    visita-lagos.astro
    packs.astro
    descenso-en-grupo.astro
    viajes-de-estudios.astro
    contacto.astro
    reserva.astro
  content/
    blog/                     # Posts en MDX
    actividades/              # Datos (tarifas, etc.) en YAML/JSON
  components/                 # Componentes reutilizables (.astro)
public/
  images/
  fonts/
```

## Decisiones de diseno

- Las reservas son externas (reservaonline.support), se enlazan o integran via iframe
- SEO critico: negocio local, HTML estatico + meta tags + schema.org
- Blog poco frecuente (~2-3 posts/ano), MDX es suficiente sin CMS
- Pet Friendly, accesibilidad, energias renovables y seguros son sellos que aparecen en todas las paginas

## Guia de estilos

Referencia visual en `design/code.html` y `design/screen.png`.

### Paleta de colores

| Token | Hex | Uso |
|-------|-----|-----|
| `primary` | `#8cb950` | Color principal verde, CTAs, acentos, iconos |
| `background-light` | `#f6f8f6` | Fondo claro (casi blanco verdoso) |
| `forest-dark` | `#225133` | Fondo oscuro, cards testimonios, footer |
| `stone-gray` | `#e8ebe8` | Fondo de secciones alternas |

### Tipografia

- **Familia**: `Space Grotesk` (pesos 300-700)
- **Headlines**: Bold, uppercase, tracking-tight, tallas grandes (6xl-9xl en hero)
- **Labels/nav**: Uppercase, `tracking-widest`, text-sm, font-bold
- **Body**: font-light/medium, text-lg/xl, `leading-relaxed`
- **Efecto especial**: `.text-stroke-sm` (texto outline sin relleno) para palabras destacadas

### Sombras y bordes

- **Botones principales**: Estilo brutalist `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` con `border-2 border-black`
- **Cards**: `shadow-xl` / `shadow-2xl` con `border border-gray-200`
- **FAB flotante**: `box-shadow: 0 10px 20px rgba(140, 185, 80, 0.4)`
- **Border radius**: `0.5rem` default, `1rem` lg, `1.5rem` xl

### Elementos de diseno clave

- **Secciones diagonales**: `clip-path: polygon()` para cortes oblicuos entre secciones
- **Cards rotadas**: Ligera rotacion (-1deg a 2deg) que se endereza al hover (efecto polaroid)
- **Texturas de fondo**: Overlays sutiles de patron (stardust, cubes, paper) con `opacity-10/30`
- **Blobs decorativos**: Circulos de color con `blur-3xl` como decoracion ambiental
- **Gradient text**: `text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-dark`

### Interacciones / Hover

- Cards: `rotate(0deg) + scale(1.05)` al hover
- Botones: `translate-y(-1/2px)` para efecto lift
- Imagenes dentro de cards: `scale-110` con `transition-transform duration-700`
- Testimonios: `hover:-translate-y-2`
- Navbar: `backdrop-blur-md` con fondo semitransparente

### Patrones de layout

- **Hero**: Fullscreen con imagen de fondo, overlay oscuro, texto centrado
- **Grid de actividades**: Asimetrico (7/5 columnas, cards solapadas)
- **Testimonios**: Scroll horizontal con `snap-x snap-mandatory`
- **FAB flotante**: Fijo bottom-right, boton de reserva que se expande en desktop
- **Navbar fija**: `fixed top-0` con blur de fondo

### Iconografia

- **Material Icons** (Google)
- Estilo: iconos dentro de circulos `bg-primary/20` con color `text-primary`

### Dark mode

- Soporte completo via clase `dark`
- Fondo dark: `forest-dark` (#225133)
- Textos claros: `gray-100/300`
- Cards: fondo `background-dark` con borders `gray-800`
