# Churn Insight – Customer Intelligence & Retention

> Gestión inteligente de clientes con predicción de churn, priorización automática de intervención y estrategias sugeridas por IA.

## Descripción

**Churn Insight** es una plataforma web que permite a analistas y ejecutivos financieros identificar clientes en riesgo de cancelación, visualizar métricas de churn en tiempo real y recibir estrategias personalizadas de retención basadas en patrones de comportamiento.

### Características principales
- 📊 Dashboard con estadísticas de churn, intervenciones y balance en riesgo
- 🔍 Búsqueda de cliente con predicción individual y análisis de riesgo
- 📈 Visualizaciones interactivas: gráficos, mapas de calor, velocímetros
- ♿ Accesibilidad WCAG 2.1 AA: escalado de fuente, modo oscuro, selector de tipografía
- 🔐 Autenticación por roles (admin/user)
- 💾 Caché local con React Query
- 🎨 Diseño responsive con Tailwind CSS

## Stack tecnológico

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4.1
- **State & Query**: React Query (TanStack), React Router
- **Charts**: Nivo, AmCharts 5
- **Mocking**: MSW (Mock Service Worker)
- **Accesibilidad**: CSS variables, localStorage, tipografías Google Fonts

---

## Instalación y setup

### Requisitos previos
- Node.js 18+ y npm

### Pasos
```bash
git clone <repo-url>
cd churn-insight-app
npm install
```

### Desarrollo local
```bash
npm run dev
```

La app estará disponible en `http://localhost:5173` Local por ahora

### Build para producción
```bash
npm run build
npm run preview
```

---

## Acceso y autenticación

| Usuario | Contraseña | Rol   | Acceso                              |
|---------|------------|-------|------------------------------------|
| admin   | admin      | admin | Dashboard + Búsqueda + Perfil      |
| user    | user       | user  | Búsqueda + Perfil (sin Dashboard) |

---

## Uso de la aplicación

### 1. Login
Ingresa credenciales. La app redirige según tu rol.

### 2. Barra de accesibilidad (esquina derecha)
- **A−** / **A+**: Reducir/aumentar fuente (80%–160%)
- **A** (Bold): Activar texto más grueso
- **Tf/Dy/Rb/Gg**: Cambiar tipografía
  - Tf: Por defecto
  - Dy: OpenDyslexic (dislexia)
  - Rb: Roboto (sans-serif)
  - Gg: Georgia (serif)
- **◑** (Contraste): Modo alto contraste (solo en Dashboard)
- **↺** (Reset): Restablecer escala a 100%

Tus preferencias se guardan automáticamente.

### 3. Home
Bienvenida y descripción general del sistema.

### 4. Búsqueda de cliente
- Busca por ID de cliente
- Visualiza predicción de churn y riesgo
- Recibe estrategia de retención por IA

### 5. Dashboard (solo admin)
- Intervención por prioridad
- Dona de churn (balance seguro vs en riesgo)
- Clientes activos vs inactivos
- Distribución geográfica
- Velocímetros de transacciones y sesiones
- Métricas de promedios y desviaciones

---

## Documentación técnica

### Historias de usuario
Ver [docs/user-stories.md](docs/user-stories.md) para detalles de:
- **HU-11**: App Frontend base (requisitos, criterios, test plan)
- **HU-13**: Dashboard simple (métricas, contrato de datos, test plan)

### PRs y cambios
- [PR_ACCESSIBILITY.md](PR_ACCESSIBILITY.md): Documentación del sistema de accesibilidad WCAG implementado

### Estructura de directorios
```
src/
├── api/                  # Llamadas a API
├── auth/                 # Sistema de autenticación y guards
├── components/
│   ├── a11y/            # Toolbar y estilos de accesibilidad
│   ├── charts/          # Componentes de gráficos
│   ├── common/          # Componentes reutilizables
│   ├── header/          # Header y navegación
│   └── userMenu/        # Menú de usuario
├── hooks/               # React hooks (accesibilidad, queries)
├── layout/              # Páginas principales
│   ├── dashboard/
│   ├── home/
│   ├── login/
│   └── searchScreen/
├── mocks/               # MSW handlers y fixtures
├── index.css            # Estilos globales y CSS variables
└── main.jsx             # Entry point
```

### Hooks principales
- `useAccessibility()`: Gestiona font-scale, bold, contraste, tipografía con localStorage
- `useBatch()`: Query de datos del dashboard
- `useCustomerPredict()`: Búsqueda y predicción de cliente

### Componentes de accesibilidad
- `AccessibilityToolbar`: Controles flotantes (derecha)
- CSS variables: `--font-scale`, `--font-family`
- Alto contraste: automático en dashboard, exento en login y sidebar

---

## Desarrollo

### Comandos
```bash
npm run dev      # Dev server
npm run build    # Build production
npm run lint     # ESLint check
npm run preview  # Preview build localmente
```

### Mocking (MSW)
En desarrollo, MSW intercepta:
- `POST /predict/integration/batch/pro/all`: Dashboard data
- `POST /predict/integration/{id}`: Customer prediction

Edita `src/mocks/handlers.js` y `src/mocks/browser.js` para modificar respuestas.

### Convenciones
- Componentes en PascalCase
- Hooks en camelCase con prefijo `use`
- Variables CSS con `--` (tailwind compatible)
- Clases de accesibilidad con prefijo `a11y-`

---

## Testing

### Plan de pruebas (MVP)
1. **Autenticación**: Login redirect según rol
2. **Accesibilidad**: Toolbar funciona; escalado responsive; tipografías cargan
3. **Dashboard**: Gráficos renderean; alto contraste legible
4. **Búsqueda**: Búsqueda devuelve datos; estrategia visible
5. **Responsive**: Sin solapamientos a 160% de escala

### Pasos manuales
```bash
# 1. Login
npm run dev
# Navega a http://localhost:5173
# Usuario: admin / admin

# 2. Test accesibilidad
# Haz clic en A+ varias veces (160%)
# Prueba selector tipografía (Dy = OpenDyslexic)
# Ve a Dashboard y activa alto contraste (◑)

# 3. Test Dashboard
# Visualiza gráficos; prueba alto contraste
# Navega a Home; verifica que contraste se desactiva

# 4. Test búsqueda
# Escribe "11" en barra de búsqueda
# Visualiza predicción y estrategia
```

---

## Contribución

### Pasos para contribuir
1. Crea una rama: `git checkout -b feature/tu-feature`
2. Realiza cambios y commits descriptivos
3. Push a rama: `git push origin feature/tu-feature`
4. Abre PR con descripción detallada

### Template de PR
Usa [.github/pull-request-template.md](.github/pull-request-template.md)

---

## Notas de desarrollo

- **Accesibilidad**: WCAG 2.1 AA es requisito; valida con herramientas como Axe DevTools
- **Performance**: React Query cachea 20 min; evita queries innecesarias
- **Estilo**: Usa variables CSS y Tailwind; evita estilos inline salvo excepciones
- **Errores**: Manejo centralizado en componentes (no silenciar en consola)

---

## FAQ

**P: ¿Por qué MSW en desarrollo?**
R: Permite desarrollo desacoplado del backend; evita bloqueos y facilita testing local.

**P: ¿Cómo personalizar colores de alto contraste?**
R: Edita `body.a11y-contrast` en `src/index.css`; busca reglas por página (`.dashboard-title`, `.home-page`, etc.).

**P: ¿Dónde persisten mis preferencias de accesibilidad?**
R: localStorage con claves `a11y:fontScale`, `a11y:bold`, `a11y:contrast`, `a11y:fontFamily`. Borra si quieres resetear.

**P: ¿El dashboard es tiempo real?**
R: En MVP usa datos mock con 500ms delay. Conecta a backend real reemplazando handlers en MSW.

---

## Roadmap futuro

- [ ] Fuente Dyslexia-Friendly mejorada
- [ ] Exportar reportes (PDF)
- [ ] Notificaciones en tiempo real
- [ ] Integración con CRM
- [ ] Dark mode global (no solo alto contraste)
- [ ] Telemetría y analytics

---

## Licencia

Proyecto desarrollado para hackathon 🚀

## Contacto

**Equipo**: Frontend / Backend
**Slack**: [canal-churn-insight]
**Issues**: GitHub Issues

---

**Última actualización**: Enero 2026
**Versión MVP**: 1.0 