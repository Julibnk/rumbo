# Guia Completa de SEO para Developers - Rumbo Norte Asturias

---

## 1. Que es SEO y por que importa

SEO (Search Engine Optimization) es el conjunto de tecnicas para que Google (y otros buscadores) **encuentren, entiendan y recomienden** tu web. Para un negocio local como Rumbo Norte, esto es critico porque la mayoria de clientes buscan cosas como:

- "descenso del sella precio"
- "barranquismo asturias"
- "turismo activo arriondas"
- "bajar el sella en canoa"

Si no apareces en los primeros 5-10 resultados, **no existes** para esos clientes. El 75% de usuarios nunca pasa de la primera pagina de Google.

---

## 2. Los 3 Pilares del SEO

### Pilar 1: SEO Tecnico (que Google pueda rastrear e indexar tu web)

Es la base. Si esto falla, nada mas importa. Como developer, es donde mas impacto directo tienes.

#### 2.1.1 Rastreo (Crawling)

Google envia "bots" (Googlebot) que visitan URLs siguiendo enlaces. Necesitas:

**robots.txt** — Indica a los bots que pueden y que no pueden rastrear.

Sitio WordPress actual:
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Sitemap: https://rumbonorteasturias.com/sitemap_index.xml
```

Nueva web Astro (recomendado):
```
User-agent: *
Allow: /

Sitemap: https://rumbonorteasturias.com/sitemap.xml
```

**Sitemap XML** — Un "mapa" de todas las URLs para que Google las encuentre facilmente.

El WordPress (via Rank Math) genera 4 sitemaps: paginas, posts, categorias, y local. La nueva web con Astro puede usar `@astrojs/sitemap` para generar uno automaticamente en cada build.

**Problemas actuales del sitio WordPress:**
- La pagina `/confirmacion-de-reserva/` esta en el sitemap (es una thank-you page que **no deberia indexarse**)
- 27 posts de blog con fechas de 2024, contenido estancado

#### 2.1.2 Indexacion

Una vez Google rastrea una pagina, decide si la **indexa** (la guarda en su base de datos). Para verificar cuantas paginas tiene indexadas, busca en Google: `site:rumbonorteasturias.com`

**Canonical tags** — Le dicen a Google "esta es la URL oficial de este contenido". Evitan problemas de contenido duplicado.

```html
<link rel="canonical" href="https://rumbonorteasturias.com/descenso-del-sella/" />
```

**Problema actual:** La homepage y la pagina de contacto **no tienen canonical tag**. La nueva web en `Base.astro` tampoco lo tiene. Deberia anadirse:

```html
<!-- En Base.astro <head> -->
<link rel="canonical" href={Astro.url.href} />
```

#### 2.1.3 Rendimiento (Core Web Vitals)

Google mide 3 metricas de rendimiento que afectan directamente al ranking:

| Metrica | Que mide | Objetivo | WordPress vs Astro |
|---------|----------|----------|--------------------|
| **LCP** (Largest Contentful Paint) | Tiempo hasta que el elemento mas grande se pinta | < 2.5s | WordPress carga Elementor + jQuery + plugins = lento. Astro genera HTML estatico = rapido |
| **INP** (Interaction to Next Paint) | Respuesta a interacciones del usuario | < 200ms | WordPress con muchos scripts bloquea el hilo. Astro con zero JS por defecto = instantaneo |
| **CLS** (Cumulative Layout Shift) | Saltos visuales durante la carga | < 0.1 | Ambos pueden tener problemas si las imagenes no tienen width/height |

**Mayor ventaja con Astro**: Al generar HTML estatico sin framework JS del lado cliente, LCP e INP seran enormemente mejores que el WordPress actual con Elementor. Esto es un factor de ranking real.

#### 2.1.4 Mobile-First

Desde 2021, Google indexa primero la version movil. La web debe ser **responsive** (ya lo es con Tailwind) y:
- Tap targets de al menos 48x48px
- Sin scroll horizontal
- Viewport meta tag configurado (ya esta en Base.astro)

#### 2.1.5 HTTPS

Obligatorio. El dominio ya tiene SSL. Asegurar que la nueva web redirija HTTP a HTTPS.

#### 2.1.6 Estructura de URLs

```
BIEN:  /descenso-del-sella/
MAL:   /page?id=123&ref=sella
MAL:   /descenso_del_sella  (guiones bajos)
```

La estructura actual es buena. Importante: cuando se migre de WordPress a Astro, se necesitan **redirects 301** para las URLs que cambien. Por ejemplo:
```
/visita-lagos-de-covadonga/  →  /visita-lagos/    (la URL actual en Astro es mas corta)
/novedades/titulo-del-post/  →  (la URL que se decida para blog)
```

Sin estos redirects, se pierde todo el "link juice" (autoridad) que esas paginas hayan acumulado.

---

### Pilar 2: SEO On-Page (que Google entienda de que va cada pagina)

#### 2.2.1 Title Tag

El `<title>` es **el factor on-page mas importante**. Es lo que aparece como enlace azul en Google.

| Pagina | WordPress actual | Mejora sugerida |
|--------|-----------------|-----------------|
| Home | `Descenso del Sella en Canoa y Barranquismo \| Rumbo Norte Asturias` | Bien, 65 chars, keywords al principio |
| Sella | `Descenso del Sella en Canoa — Hasta 15 km de Aventura` | Bien, descriptivo y con keyword |
| Packs | `Paquetes de Aventura en Asturias: Descenso del Sella, Barranquismo y Mas \| Rumbo Norte Asturias` | **Demasiado largo (83 chars)** → Google lo trunca. Mejor: `Packs de Aventura en Asturias \| Rumbo Norte` |

**Reglas del title tag:**
- 50-60 caracteres (maximo visible en SERP)
- Keyword principal al principio
- Marca al final separada con `|` o `-`
- Unico por pagina
- Que invite al clic

El `Base.astro` actual genera: `${title} | Rumbo Norte Asturias`. Esta bien como patron, pero se deberian pasar titles mas especificos desde cada pagina.

#### 2.2.2 Meta Description

No es factor de ranking directo, pero afecta al **CTR** (Click-Through Rate), que si influye indirectamente.

```html
<meta name="description" content="Descenso del Sella en canoa desde Arriondas.
15 km de aventura por el rio mas famoso de Asturias. Desde 25€/persona." />
```

**Problema actual:** La pagina de contacto en WordPress **no tiene meta description**. Google inventara una (normalmente mal).

**Reglas:**
- 150-160 caracteres
- Incluir keyword principal
- Propuesta de valor clara
- Call to action ("Reserva ahora", "Desde 25€")
- Unica por pagina

#### 2.2.3 Headings (H1-H6)

Los headings le dicen a Google la jerarquia del contenido. Piensa en ellos como un indice de libro.

```
H1: Descenso del Sella en Canoa          ← 1 solo H1 por pagina
  H2: El rio mas famoso de Asturias      ← Secciones principales
  H2: Rutas disponibles
    H3: Ruta Completa                    ← Subsecciones
    H3: Ruta Parcial
  H2: Tarifas
  H2: Como funciona
  H2: Preguntas frecuentes
```

**Problemas actuales del WordPress:**
- La homepage tiene H1 dividido en 2 elementos (`Rumbo hacia` / `Experiencias inolvidables`)
- La pagina de Viajes de Estudios tiene **2 H1s** (`Viajes de estudios en Asturias` + `VIAJES DE FIN DE CURSO`)
- Lagos de Covadonga salta de H2 a H3 sin logica

#### 2.2.4 Schema.org / Datos Estructurados (JSON-LD)

Codigo invisible para el usuario pero que Google lee para entender mejor el contenido. Permite generar "rich snippets" (estrellas, precios, FAQ desplegable en Google, horarios...).

WordPress actual tiene (via Rank Math):
```json
{
  "@type": "Organization",
  "name": "Rumbo Norte",
  "address": { "streetAddress": "Calle Inocencio del Valle 3", ... },
  "telephone": "+34985840693"
}
```

**Lo que deberia tener la nueva web:**

```json
// En la homepage
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Rumbo Norte Asturias",
  "image": "https://rumbonorteasturias.com/logo.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Inocencio del Valle 3",
    "addressLocality": "Arriondas",
    "postalCode": "33540",
    "addressRegion": "Asturias",
    "addressCountry": "ES"
  },
  "telephone": "+34648951599",
  "priceRange": "€€",
  "openingHours": "Mo-Su 09:00-20:00",
  "geo": { "@type": "GeoCoordinates", "latitude": 43.394, "longitude": -5.188 },
  "url": "https://rumbonorteasturias.com",
  "sameAs": ["instagram", "facebook", "youtube", "tripadvisor"]
}
```

```json
// En cada pagina de actividad
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Descenso del Sella en Canoa",
  "description": "15 km de descenso por el rio Sella...",
  "offers": {
    "@type": "Offer",
    "price": "25",
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

```json
// En las paginas con FAQ (genera FAQ desplegable DENTRO de Google)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Cual es la edad minima?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "No hay restriccion de edad; la altura minima es 1.15 metros."
    }
  }]
}
```

El schema de FAQPage es especialmente valioso: puede hacer que el resultado en Google ocupe **mucho mas espacio** mostrando preguntas desplegables directamente en la SERP.

#### 2.2.5 Open Graph y Twitter Cards

Controlan como se ve la web cuando alguien la comparte en redes sociales o WhatsApp.

**Problema actual:** El WordPress no tiene Twitter Cards en ninguna pagina. Y las paginas de Packs y Viajes de Estudios usan el **logo como og:image** en vez de una foto de la actividad.

```html
<!-- Lo que se necesita en Base.astro -->
<meta property="og:title" content={fullTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={ogImage} />
<meta property="og:url" content={Astro.url.href} />
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_ES" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={fullTitle} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />
```

#### 2.2.6 Imagenes

Las imagenes son un factor SEO infravalorado:

| Aspecto | WordPress | Astro (actual) | Ideal |
|---------|-----------|----------------|-------|
| Formato | Mezcla JPG/PNG/WebP | WebP | WebP (ya bien) |
| Alt text | Parcial | Si, en carousels y heroes | Alt descriptivo en TODAS las imagenes |
| Nombres archivo | `Blog9.webp`, `DescensoSella5.webp` | `descenso-sella-1.webp` | Descriptivos con keywords |
| Lazy loading | Via plugins | No implementado | `loading="lazy"` en todo excepto above-the-fold |
| Responsive | Parcial | Astro Image lo hace | `srcset` con multiples tamanos |

#### 2.2.7 Internal Linking

Cada enlace interno transfiere "autoridad" de una pagina a otra. La web actual tiene cross-linking basico ("Mas aventuras para ti" al final de algunas paginas). La nueva deberia tener:

- Desde home → todas las actividades
- Desde cada actividad → packs relacionados
- Desde cada actividad → las otras actividades ("Tambien te puede interesar")
- Breadcrumbs en todas las paginas
- Footer con enlaces a todas las paginas importantes

---

### Pilar 3: SEO Off-Page (autoridad y reputacion externa)

#### 2.3.1 Google Business Profile

Para un negocio local es **el factor mas importante**. La ficha de Google Maps con reviews, fotos, horarios... aparece en las busquedas locales ("descenso del sella cerca de mi").

#### 2.3.2 Backlinks

Cada enlace desde otra web hacia la tuya es un "voto de confianza". Para turismo activo: directorios de turismo, blogs de viajes, press releases, TripAdvisor, etc.

#### 2.3.3 Reviews y Resenas

Las resenas en Google, TripAdvisor, etc. influyen en el ranking local y en el CTR.

---

## 3. Costes Tipicos del SEO

### Opcion A: Lo haces tu como developer

| Tarea | Horas estimadas | Coste |
|-------|----------------|-------|
| SEO tecnico (meta tags, schema, sitemap, robots.txt, canonicals, OG tags) | 8-15h | 0€ (tu tiempo) |
| Optimizacion on-page (titles, descriptions, headings, alt texts) | 5-10h | 0€ |
| Redirects 301 de WordPress a Astro | 2-4h | 0€ |
| Core Web Vitals (ya resuelto con Astro) | 0h | 0€ |
| **Total setup inicial** | **15-30h** | **0€** |

### Opcion B: Contratar una agencia SEO

| Servicio | Coste mensual tipico |
|----------|---------------------|
| Auditoria tecnica inicial | 300-800€ (pago unico) |
| SEO tecnico + on-page mensual | 200-500€/mes |
| Creacion de contenido (blog) | 150-400€/mes (2-4 posts) |
| Link building | 200-600€/mes |
| SEO local (Google Business, directorios) | 100-200€/mes |
| **Pack completo para PYME** | **500-1500€/mes** |

### Opcion C: Herramientas de pago (para monitorizar)

| Herramienta | Coste | Para que |
|-------------|-------|---------|
| Google Search Console | Gratis | Ver keywords, errores, indexacion |
| Google Analytics | Gratis | Ver trafico y comportamiento |
| Ahrefs Lite / Semrush | ~100€/mes | Analisis de keywords, competencia, backlinks |
| Screaming Frog (free tier) | Gratis hasta 500 URLs | Auditar rastreo tecnico |
| PageSpeed Insights | Gratis | Core Web Vitals |

**Recomendacion:** Hacer uno mismo el SEO tecnico y on-page (siendo developer, se tiene ventaja). Usar Search Console (gratis) para monitorizar. Invertir tiempo en Google Business Profile. No se necesita agencia ni herramientas de pago para empezar.

---

## 4. Comparativa: WordPress Actual vs Nueva Web Astro

### Lo que el WordPress hace BIEN y hay que mantener

| Aspecto | Detalle |
|---------|---------|
| Schema Organization | Rank Math genera JSON-LD con datos de empresa, direccion, telefono |
| Sitemap XML | Automatico y bien estructurado (4 sitemaps) |
| Title tags | La mayoria estan bien optimizados |
| Meta descriptions | Presentes en casi todas las paginas |
| URLs | Estructura limpia y con keywords |
| Breadcrumbs | Presentes via schema |

### Lo que el WordPress hace MAL y hay que corregir

| Problema | WordPress actual | Solucion en Astro |
|----------|-----------------|-------------------|
| Rendimiento | Elementor + jQuery + plugins = LCP lento | HTML estatico, zero JS → LCP < 1s |
| H1 duplicados | Homepage y Viajes tienen 2 H1s | 1 H1 por pagina en HeroSection |
| Sin canonical en homepage | Falta `<link rel="canonical">` | Anadir en Base.astro |
| Sin Twitter Cards | Ninguna pagina las tiene | Anadir en Base.astro |
| og:image con logo | Packs y Viajes usan logo.png | Foto real de actividad por pagina |
| Contacto sin meta description | Pagina sin descripcion | Definir en cada pagina |
| Confirmacion-reserva indexada | Esta en sitemap y se indexa | `noindex` + excluir de sitemap |
| Blog estancado | 27 posts sin actualizar desde 2024 | Actualizar o consolidar contenido |
| Title demasiado largo | Packs: 83 chars → truncado | Maximo 60 chars |
| Heading hierarchy rota | Lagos salta H2→H3 sin logica | Estructura H1→H2→H3 consistente |

### Lo que la nueva Astro NO tiene todavia y necesita

| Falta | Prioridad | Impacto |
|-------|-----------|---------|
| Canonical tags | Alta | Evitar duplicados, consolidar autoridad |
| JSON-LD schema (LocalBusiness, FAQPage, TouristAttraction) | Alta | Rich snippets en Google |
| Open Graph + Twitter Cards | Alta | Compartir en redes con buena preview |
| Sitemap XML (`@astrojs/sitemap`) | Alta | Google encuentre todas las paginas |
| Robots.txt | Alta | Controlar rastreo |
| Redirects 301 (WordPress → Astro) | Critica en migracion | No perder ranking existente |
| Breadcrumbs | Media | Navegacion + schema |
| Alt text completo en todas las imagenes | Media | Accesibilidad + Google Images |
| `loading="lazy"` en imagenes below-the-fold | Media | Rendimiento |
| Pagina 404 personalizada | Baja | UX |

---

## 5. Auditoria SEO del Sitio WordPress Actual

### Datos de la auditoria (febrero 2026)

#### robots.txt
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Sitemap: https://rumbonorteasturias.com/sitemap_index.xml
```

#### Sitemap (Rank Math)
- **Paginas**: 11 URLs (incluye confirmacion-de-reserva que no deberia estar)
- **Posts**: 27 blog posts (todos con lastmod en 2024)
- **Categorias**: 7 (rumbasella, rumbonorte, turismo-activo, descenso-del-sella, lagos-de-covadonga, entrevistas, asturias)
- **Local**: 1 entrada KML

#### Analisis pagina por pagina

**Homepage (`/`)**
- Title: `Descenso del Sella en Canoa y Barranquismo | Rumbo Norte Asturias`
- Meta description: `Desciende el Sella y disfruta del barranquismo con Rumbo Norte Asturias. Reserva ahora y vive una experiencia unica en la naturaleza de Asturias!`
- og:image: `Blog9.webp`
- H1: Dividido en 2 elementos (problema)
- Canonical: NO PRESENTE (problema)
- Twitter Cards: NO PRESENTE

**Descenso del Sella (`/descenso-del-sella/`)**
- Title: `Descenso del Sella en Canoa — Hasta 15 km de Aventura`
- Meta description: `Vive el Descenso del Sella con Rumbo Norte. Salidas continuas hasta las 13:00 y traslado de vuelta inmediato al finalizar. Sin esperas ni complicaciones!`
- og:image: `DescensoSella5.webp`
- Canonical: Presente y correcto
- H1: 2 H1s (problema)
- Keywords meta: `descenso del sella, descenso del sella en canoa`

**Barranquismo (`/barranquismo/`)**
- Title: `Barranquismo en Asturias: Aventura y Diversion con Rumbo Norte`
- Meta description: `Vive la emocion del barranquismo en Asturias con Rumbo Norte. Reserva ahora y disfruta de la aventura en estado puro!`
- og:image: `Barranquismo.png` (formato PNG, no optimizado)
- Canonical: Presente y correcto
- H1: 2 H1s (problema)

**Visita Lagos de Covadonga (`/visita-lagos-de-covadonga/`)**
- Title: `Visita Guiada a los Lagos de Covadonga | Rumbo Norte Asturias`
- Meta description: `Explora la belleza de los Lagos de Covadonga con Rumbo Norte Asturias. Descubre su historia y misterio en una visita guiada. Reserva ahora!`
- Canonical: Presente y correcto
- H1: `Lagos de Covadonga`
- Heading hierarchy: Salta niveles (H2 → H3 sin logica)

**Packs (`/packs/`)**
- Title: `Paquetes de Aventura en Asturias: Descenso del Sella, Barranquismo y Mas | Rumbo Norte Asturias` **(83 chars - TRUNCADO en Google)**
- og:image: **Logo de empresa** (no foto real - problema)

**Descenso en Grupo (`/descenso-en-grupo/`)**
- Title: `Descenso del Sella en Grupo: Tarifas Especiales | Rumbo Norte Asturias`
- Canonical: Presente y correcto

**Viajes de Estudios (`/viajes-de-estudios/`)**
- Title: `Viajes de Estudios en Asturias: Aventuras Educativas con Rumbo Norte`
- og:image: **Logo de empresa** (no foto real - problema)
- H1: **2 H1s** (problema)

**Contacto (`/contacto/`)**
- Title: `Contacta con Rumbo Norte Asturias para Empezar tu Aventura`
- Meta description: **NO PRESENTE** (problema)
- Open Graph: **NO PRESENTE** (problema)
- Canonical: **NO PRESENTE** (problema)

#### Schema.org global (todas las paginas)
```json
{
  "@type": "Organization",
  "name": "Rumbo Norte",
  "vatID": "E52567070",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle Inocencio del Valle 3",
    "addressLocality": "Arriondas",
    "postalCode": "33540",
    "addressRegion": "Asturias",
    "addressCountry": "Spain"
  },
  "telephone": "+34985840693",
  "sameAs": ["Facebook", "Instagram", "YouTube", "TripAdvisor"]
}
```

Schemas adicionales por pagina: WebPage, Article, BreadcrumbList, Place/LocalBusiness.

---

## 6. Checklist de Implementacion SEO en Astro

En orden de prioridad:

```
1. [ ] Canonical tag dinamico en <head>
2. [ ] Open Graph meta tags (og:title, og:description, og:image, og:url)
3. [ ] Twitter Card meta tags
4. [ ] JSON-LD LocalBusiness en homepage
5. [ ] JSON-LD FAQPage en paginas con FAQ
6. [ ] JSON-LD TouristAttraction/Product en paginas de actividad
7. [ ] Instalar @astrojs/sitemap
8. [ ] Crear public/robots.txt
9. [ ] Verificar 1 solo H1 por pagina
10. [ ] Mapeo de redirects 301 para la migracion
11. [ ] Breadcrumbs con schema BreadcrumbList
12. [ ] Alt text descriptivo en todas las imagenes
```

---

## 7. Resumen

Como developer, la mayor ventaja es que el **SEO tecnico es codigo** — y Astro da una base excelente (HTML estatico, rapido, sin JS innecesario). Los CMS como WordPress compensan con plugins (Rank Math), pero introducen problemas de rendimiento y complejidad.

La web actual tiene una base SEO decente gracias a Rank Math, pero con errores corregibles. La migracion a Astro es una oportunidad para mejorar todo: rendimiento (Core Web Vitals), estructura (headings, canonicals), y datos estructurados (schema.org) — manteniendo las URLs y autoridad existentes con redirects 301.
