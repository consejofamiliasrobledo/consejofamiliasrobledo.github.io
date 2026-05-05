# Cápsulas de Corresponsabilidad

Sitio estático inicial para publicar la campaña visual del Consejo de Familias 2026 · Robledo.

## Estructura

- `index.html`: portada del sitio.
- `consejo.html`: placeholders para explicar qué es el Consejo, cómo se conforma y perfiles de integrantes.
- `capsulas.html`: galería organizada por temas, con thumbnails y vista ampliada.
- `recursos.html`: enlaces externos útiles, especialmente Internet Matters.
- `assets/images/`: imágenes de las cápsulas.
- `data.js`: registro editable de cápsulas.
- `styles.css`: estilos visuales.
- `app.js`: navegación móvil y galería.

## Publicar en GitHub Pages

1. Crear un repositorio nuevo en GitHub.
2. Subir todos estos archivos a la rama `main`.
3. Ir a `Settings > Pages`.
4. En `Build and deployment`, elegir `Deploy from a branch`.
5. Seleccionar `main` y carpeta `/root`.
6. Guardar.

GitHub generará una URL pública para el sitio.

## Actualizar cápsulas

1. Agregar la imagen nueva en `assets/images/`.
2. Editar `data.js` y añadir un objeto con:
   - `category`
   - `title`
   - `question`
   - `image`
3. Subir cambios al repositorio.
