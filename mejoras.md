# Mejoras y optimizaciones

## Imágenes y assets

- **Optimización automática de imágenes con Astro**: En lugar de mantener 195 archivos con múltiples tamaños manualmente, se usan solo las imágenes originales de alta calidad (~30 archivos en `src/assets/images/`) y Astro genera automáticamente todas las versiones responsive (WebP, AVIF, srcset) en build time. Reduce el tamaño del repo y mejora el rendimiento.
