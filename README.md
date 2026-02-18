# Eco-op Artesanos Verdes

Aplicación React + Vite para explorar un catálogo de productos sostenibles.

## Estructura base

- `src/components`: componentes UI reutilizables.
- `src/pages`: vistas principales por ruta.
- `src/context`: estado global (favoritos y carrito).
- `src/hooks`: hooks de aplicación para separar lógica de UI (filtros y persistencia localStorage).
- `src/data`: datos semilla del catálogo.
- `src/utils`: utilidades de filtrado y orden.

## Principios aplicados

- **Single Responsibility**: lógica de catálogo movida a `useCatalogFilters`.
- **Dependency inversion (simple front-end)**: Context y páginas dependen de hooks reutilizables, no de detalles de almacenamiento.
- **Clean architecture ligera**: separación entre capa de presentación (componentes/páginas), estado (context/hooks) y utilidades de dominio (filtros).

## Scripts

- `npm run dev`: entorno local de desarrollo.
- `npm run build`: build de producción.
- `npm run preview`: previsualizar build local.
