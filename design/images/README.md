# Imágenes de Rumbo Norte Asturias

Scraping completo de todas las imágenes del sitio web https://rumbonorteasturias.com

**Fecha de descarga**: 13 de febrero de 2026

## Resumen

- **📁 Ubicación**: `design/images/`
- **📊 Total**: 195 archivos (166 MB)
- **📷 Distribución por formato**:
  - 125 WebP (formato moderno, optimizado)
  - 49 PNG (logos, iconos)
  - 14 JPG + 3 JPEG
  - 4 SVG (vectoriales)

## Contenido descargado

### 🎨 Branding y assets corporativos

**Logos principales:**
- `RumboNorte-Logo_verde-*.png` - Logo principal en verde (múltiples tamaños: 150x150 a 2048x2048)
- `logo_rumbo_norte_asturias_600.png` - Logo alternativo
- `cropped-RumboNorte-Icono-1-*.png` - Iconos/favicons (32x32 a 270x270)

**Headers:**
- `RumboNorte-Header1.png` (5600px de ancho) - Header principal
- `RumboNorte-Header1-*.png` - Versiones responsive (1536x549, 2048x731)
- `RumboNorte-Header-300x300-1.webp` - Header cuadrado

**Logos asociados:**
- `INICIATIVA-RIOSLIMPIOS_Logo-*.png` - Logo iniciativa medioambiental (150x150 a 768x768)
- `whatsapp_logo.svg` - Icono WhatsApp

**Iconografía:**
- `auxin-front.svg`, `auxin-front-2.svg` - Iconos del tema
- `symbols.svg` - Símbolos SVG

### 🚣 Actividades - Fotos principales

#### Descenso del Sella
Fotos de alta calidad (2550x2550px):
- `DescensoSella1-scaled.webp` a `DescensoSella4-scaled.webp`
- `descenso_rio_sella_rumbo_norte.webp` - Foto destacada
- `descenso-del-sella-rumbo-norte.webp` - Foto alternativa
- `piragua-sella-rumbo-norte.webp` - Detalle de piragua
- `DescensoDelSella_Grupo.webp` - Foto de grupos

Cada imagen incluye versiones en múltiples tamaños (40x, 150x150, 300x300, 768x768, 1024x1024, scaled)

#### Barranquismo
Fotos de alta calidad (1910x1910 a 2550x2550px):
- `Barranquismo1-scaled.webp` a `Barranquismo7-scaled.webp` (7 fotos principales)
- `Barranquismo.png` - Imagen destacada
- `Barranquismo1-1.png` - Versión PNG alternativa

Cada imagen con versiones responsive (150x150, 300x300, 768x768, 1024x1024)

#### Visita Lagos de Covadonga
- `Vaca-Cuadrado*.jpg` - Foto icónica con vacas (scaled: 2550x1434)
- Versiones: 150x150 a 2048x2048

### 📦 Packs Turísticos

- `Pack_DescensoSella1-scaled.webp` - Pack principal descenso (2550x2550)
- `pack_descenso_sella.webp` - Foto destacada pack
- `Pack_Barranquismo1.webp` - Pack barranquismo (610x610)
- `Packs.webp` - Imagen general de packs

### 👥 Grupos y Viajes de Estudios

- `DescensoDelSella_Grupo.webp` - Grupos en el Sella (1623x912 original)
- `ViajesDeEstudios.webp` - Foto de viajes escolares

### 📧 Contacto

- `Contacto_1.webp` - Imagen de contacto (1340x1340 original)
- `Titel_Contacto.png` - Título de contacto

### 📝 Blog

10 posts de blog con imágenes:
- `Blog1-*.jpeg` - Post 1 (máx 2000x1125)
- `Blog4.png` - Post 4
- `Blog5-*.png` - Post 5 (758x426)
- `Blog6-*.webp` - Post 6 (2178x1225)
- `Blog7-*.webp` - Post 7 (2000x1125)
- `Blog9.webp` - Post 9 (1024x1024)
- `Blog10-*.webp` - Post 10 (2000x1125)

### 🌿 Medioambiente y certificaciones

- `INICIATIVA-RIOSLIMPIOS.png` - Banner iniciativa (3062x3062)
- `IMG_0954-scaled*.jpg` - Fotos naturaleza (2550x1434)

## Estructura de tamaños

WordPress genera múltiples versiones de cada imagen para optimización responsive:

| Sufijo | Uso típico |
|--------|------------|
| `-40x*` | Thumbnails muy pequeños |
| `-150x150` | Thumbnails pequeños |
| `-200x200` | Iconos pequeños |
| `-300x300` | Thumbnails medianos |
| `-768x768` | Tablets |
| `-1024x1024` | Desktop estándar |
| `-1536x*` | Desktop grande |
| `-2048x*` | Desktop extra grande |
| `-scaled` o `-2550x*` | **Máxima calidad original** |

## Recomendaciones de uso

### Para el proyecto Astro:

1. **Logos**: Usar versiones PNG grandes (1024x1024 o 2048x2048) - Astro las optimizará automáticamente
2. **Fotos de actividades**: Usar las versiones `-scaled.webp` como originales
3. **Thumbnails**: Astro puede generar automáticamente desde las scaled, no hace falta usar las versiones pequeñas
4. **Hero images**: `RumboNorte-Header1.png` (5600px) para headers principales
5. **Blog**: Usar versiones 2000x1125 (formato landscape 16:9)

### Optimización:

- Astro optimizará automáticamente todas las imágenes a WebP/AVIF
- Generará srcset responsive automáticamente
- Las imágenes `-scaled` originales son de muy alta calidad (2550px) - ideales para pantallas retina

## Archivos destacados para usar primero

```
RumboNorte-Logo_verde-2048x2048.png       # Logo principal
RumboNorte-Header1.png                    # Header principal
DescensoSella1-scaled.webp                # Foto hero Descenso Sella
Barranquismo1-scaled.webp                 # Foto hero Barranquismo
Vaca-Cuadrado-scaled.jpg                  # Foto hero Lagos Covadonga
Pack_DescensoSella1-scaled.webp           # Foto hero Packs
DescensoDelSella_Grupo.webp               # Foto grupos
Contacto_1.webp                           # Foto contacto
INICIATIVA-RIOSLIMPIOS_Logo-1024x1024.png # Logo certificación medioambiental
```

## Notas

- Todos los archivos descargados desde https://rumbonorteasturias.com en febrero 2026
- Las imágenes mantienen los nombres originales de WordPress para trazabilidad
- Formato WebP es el predominante (moderno, 25-35% más ligero que JPG)
- SVG para iconos vectoriales escalables sin pérdida
