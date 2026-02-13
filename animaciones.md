# Plan: Añadir Animaciones Sutiles a Rumbo Norte Asturias

## Contexto

El usuario solicita añadir animaciones sutiles a las secciones de cada página que mejoren la experiencia visual sin sobrecargar. El sitio actual tiene un diseño brutalist/minimalista con animaciones muy limitadas:

- **Componentes sin animaciones**: TechSpecs, Schedule, PricingTable/PricingComparison (estáticos)
- **Componentes con animaciones básicas**: FAQ (accordion), HeroSection (solo hover en botón)
- **Componentes bien animados**: Header, BookingFAB, ImageCarousel, ImageGallery (no tocar)

**Stack actual**: Solo Tailwind CSS + custom CSS en `global.css`. Sin librerías de animación (AOS, Framer Motion, etc.)

**Filosofía de diseño**: Brutalist con sombras offset, bordes negros, transformaciones sutiles. Las animaciones existentes usan `duration-300` a `duration-700`.

## Enfoque Propuesto

Implementar animaciones en **3 fases incrementales**:

### Fase 1: Hover Animations (Prioridad ALTA)
Añadir estados hover sutiles a componentes estáticos usando solo clases de Tailwind.

### Fase 2: Mejorar Accordion (Prioridad MEDIA)
Refinar la animación del FAQ accordion con transiciones más suaves.

### Fase 3: Scroll Animations (OPCIONAL - Prioridad MEDIA)
Añadir fade-in cuando las secciones entran en viewport usando Intersection Observer.

## Implementación Detallada

### Fase 1: Hover Animations

#### 1. TechSpecs.astro
**Archivo**: `/src/components/TechSpecs.astro`

**Cambios**:
- Container card: añadir `hover:shadow-2xl transition-shadow duration-300`
- Items individuales: envolver en `group`, añadir:
  - `hover:bg-primary/10 hover:-translate-y-1 hover:shadow-md`
  - `transition-all duration-300 cursor-default`
- Iconos: `group-hover:scale-110 transition-transform duration-300`
- Labels: `group-hover:text-primary transition-colors duration-300`

**Resultado**: Cards con lift effect + escala de iconos + cambio de color en hover.

---

#### 2. Schedule.astro
**Archivo**: `/src/components/Schedule.astro`

**Cambios**:
- Cards: envolver en `group`, añadir:
  - `hover:border-l-8 hover:-translate-y-1 hover:shadow-xl`
  - `transition-all duration-300 cursor-default`
- Título: `group-hover:text-primary transition-colors duration-300`
- Badge de hora: `group-hover:scale-105 group-hover:shadow-lg transition-all duration-300`

**Resultado**: Borde izquierdo se expande, card sube, badge escala.

---

#### 3. PricingTable.astro
**Archivo**: `/src/components/PricingTable.astro`

**Cambios en filas `<tr>`**:
- Añadir `group cursor-default` a cada fila
- Hover states:
  - `hover:bg-primary/15 hover:border-l-4 hover:border-l-primary`
  - `transition-all duration-300`
- Nombre: `group-hover:text-primary transition-colors duration-300`
- Precio: envolver en `<span class="inline-block">` con `group-hover:scale-110 transition-transform duration-300`

**Resultado**: Fila se ilumina, borde izquierdo aparece, precio escala.

---

#### 4. PricingComparison.astro
**Archivo**: `/src/components/PricingComparison.astro`

**Cambios**: Idénticos a PricingTable pero aplicar a ambas columnas de precio (Individual y Grupo).

---

### Fase 2: Mejorar Accordion

#### global.css
**Archivo**: `/src/styles/global.css`

**Actualizar estilos de accordion** (líneas 62-72):

```css
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.3s ease-out,
              padding 0.3s ease-out;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.accordion-item.open .accordion-content {
  max-height: 500px;
  opacity: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.accordion-item {
  transition: all 0.3s ease;
}

.accordion-item.open {
  border-color: var(--color-primary);
  box-shadow: 0 4px 12px rgba(140, 185, 80, 0.15);
}
```

**Añadir al final del archivo**:

```css
/* Accessibility: Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .accordion-content,
  .accordion-item,
  .accordion-icon {
    transition: none;
  }
}
```

#### FAQ.astro
**Archivo**: `/src/components/FAQ.astro`

**Cambios en botón accordion** (línea ~20):
- Añadir: `hover:bg-background-light transition-colors duration-200`

**Resultado**: Transición más suave del accordion con opacity + padding + shadow cuando está abierto.

---

### Fase 3: Scroll Animations (OPCIONAL)

Esta fase añade animaciones cuando las secciones entran en viewport.

#### 3.1. Añadir keyframes a global.css
**Archivo**: `/src/styles/global.css`

**Añadir al final**:

```css
/* === SCROLL ANIMATIONS === */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.scroll-animate {
  opacity: 0;
}

.scroll-animate.animate-in {
  animation-duration: 0.6s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-animate[data-animation="fadeInUp"].animate-in {
  animation-name: fadeInUp;
}

.scroll-animate[data-animation="fadeInLeft"].animate-in {
  animation-name: fadeInLeft;
}

.scroll-animate[data-animation="fadeInRight"].animate-in {
  animation-name: fadeInRight;
}

/* Delays escalonados */
.scroll-animate[data-delay="100"].animate-in {
  animation-delay: 0.1s;
}
.scroll-animate[data-delay="200"].animate-in {
  animation-delay: 0.2s;
}
.scroll-animate[data-delay="300"].animate-in {
  animation-delay: 0.3s;
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .scroll-animate {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

#### 3.2. Crear script de Intersection Observer
**Archivo NUEVO**: `/src/scripts/scrollAnimations.ts`

```typescript
/**
 * Scroll-triggered animations usando Intersection Observer
 * Respeta prefers-reduced-motion
 */

export function initScrollAnimations() {
  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Si el usuario prefiere menos movimiento, mostrar todo inmediatamente
    document.querySelectorAll('.scroll-animate').forEach((el) => {
      el.classList.add('animate-in');
    });
    return;
  }

  // Configurar Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  // Observar todos los elementos con clase .scroll-animate
  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el);
  });
}

// Auto-init
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}
```

#### 3.3. Importar script en layout
**Archivo**: `/src/layouts/Base.astro`

**Añadir antes del cierre de `</body>`**:

```astro
<!-- Scroll animations script -->
<script>
  import '../scripts/scrollAnimations';
</script>
```

#### 3.4. Aplicar clases a componentes

**Ejemplos de uso**:

**TechSpecs.astro** - Container:
```astro
<div
  class="scroll-animate bg-white p-8 rounded-2xl ..."
  data-animation="fadeInUp"
>
```

**TechSpecs.astro** - Items con delay escalonado:
```astro
{specs.map((spec, i) => (
  <div
    class="scroll-animate group flex items-center ..."
    data-animation="fadeInLeft"
    data-delay={i * 100}
  >
```

**Schedule.astro** - Cards:
```astro
{shifts.map((shift, i) => (
  <div
    class="scroll-animate group bg-white ..."
    data-animation="fadeInRight"
    data-delay={i * 100}
  >
```

**Aplicar patrón similar** a títulos de sección, pricing tables, etc.

---

## Archivos a Modificar

### Fase 1 (Hover Animations):
1. `/src/components/TechSpecs.astro` - Añadir clases hover
2. `/src/components/Schedule.astro` - Añadir clases hover
3. `/src/components/PricingTable.astro` - Añadir clases hover en filas
4. `/src/components/PricingComparison.astro` - Añadir clases hover en filas

### Fase 2 (Accordion):
5. `/src/styles/global.css` - Mejorar estilos accordion + accessibility
6. `/src/components/FAQ.astro` - Añadir hover en botón

### Fase 3 (Scroll - OPCIONAL):
7. `/src/styles/global.css` - Añadir keyframes + utilities
8. `/src/scripts/scrollAnimations.ts` - NUEVO archivo
9. `/src/layouts/Base.astro` - Importar script
10. Todos los componentes anteriores - Añadir clases `scroll-animate`

---

## Principios de Diseño

1. **Sutileza**: `duration-300` como estándar (300ms es perceptible pero no intrusivo)
2. **Coherencia**: Seguir patrones existentes (lift effect, scale, color transitions)
3. **Performance**: Solo animar propiedades performantes (`transform`, `opacity`, `color`)
4. **Accesibilidad**: Respetar `prefers-reduced-motion` en todas las animaciones
5. **Progressive enhancement**: Hover funciona sin JS, scroll animations son opcional

---

## Plan de Testing

### Testing Visual
- [ ] Probar hover en TechSpecs (páginas: descenso-del-sella, barranquismo, visita-lagos)
- [ ] Probar hover en Schedule (todas las páginas de actividades)
- [ ] Probar hover en PricingTable (barranquismo, visita-lagos)
- [ ] Probar hover en PricingComparison (descenso-del-sella)
- [ ] Probar accordion FAQ (abrir/cerrar, verificar timing)
- [ ] Si Fase 3: Scrollear páginas y verificar fade-ins

### Testing Performance
```bash
npm run dev
npm run build
npm run preview
npx lighthouse http://localhost:4321/descenso-del-sella --view
```

**Objetivos**:
- Lighthouse Performance > 90
- No jank al hacer hover (60fps constante)
- Transiciones suaves sin saltos

### Testing Accesibilidad
- [ ] Activar "Reduce motion" en sistema operativo
- [ ] Verificar que animaciones se deshabilitan
- [ ] Probar keyboard navigation (Tab sigue funcionando)
- [ ] Lighthouse Accessibility: 100

### Testing Responsive
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)

---

## Implementación Incremental

**Orden recomendado**:

1. **Empezar con TechSpecs.astro** (1 componente)
   - Implementar hover animations
   - Testing visual
   - Ajustar si es necesario

2. **Replicar a Schedule, PricingTable, PricingComparison**
   - Aplicar mismo patrón
   - Testing de cada uno

3. **Mejorar FAQ accordion**
   - Actualizar global.css
   - Testing abrir/cerrar

4. **Fase 3 (opcional): Scroll animations**
   - Crear script
   - Añadir keyframes
   - Integrar en componentes
   - Testing scroll

5. **Testing completo final**

**Tiempo estimado**:
- Fase 1: 1-2 horas
- Fase 2: 30 min
- Fase 3 (opcional): 2-3 horas
- Testing: 1-2 horas
- **Total: 3-8 horas** (dependiendo si se incluye Fase 3)

---

## Verificación End-to-End

**Después de implementar cada fase**:

1. Abrir `/descenso-del-sella` en navegador
2. Verificar hover en TechSpecs (iconos deben escalar, cards subir)
3. Verificar hover en Schedule (borde se expande, badge escala)
4. Verificar hover en PricingComparison (filas se iluminan, precios escalan)
5. Verificar FAQ accordion (transición suave al abrir/cerrar)
6. Si Fase 3: Scrollear y ver fade-ins progresivos
7. Activar "Reduce motion" → todas las animaciones deben desaparecer
8. Revisar Lighthouse scores (Performance + Accessibility)

**Criterio de éxito**: Animaciones sutiles, perceptibles, coherentes con el diseño brutalist, sin degradar performance ni accesibilidad.
