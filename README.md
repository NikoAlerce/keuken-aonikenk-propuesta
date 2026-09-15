# Keuken Aonikenk · propuesta audiovisual

Sitio independiente para presentar una instalación de dos cámaras en el centro cultural Keuken Aonikenk, Lago Puelo, Chubut.

## Contenido

- Portada inspirada en YouTube, con una fotografía real del salón. Reacciones, audiencia y chat ilustrativos.
- Tres alternativas de equipamiento, fotografías de productos y enlaces a Mercado Libre Argentina.
- Presupuesto interactivo que suma cantidades, audio opcional y gastos pendientes.
- Plano del salón, comparación de encuadres y explicación del montaje.
- Demostración de un panel sencillo para operadores. No se conecta a OBS ni transmite a YouTube.
- Diseño adaptable a computadoras y celulares.

## Datos y límites de la propuesta

Precios consultados el **14 de septiembre de 2026**, en pesos argentinos. No representan una reserva de stock ni una cotización de entrega. Los gastos de envío a domicilio en Lago Puelo por Andreani, los anclajes y las adaptaciones deben confirmarse.

| Alternativa | Productos, antes de gastos pendientes |
| --- | ---: |
| Objetivo $200.000 | $200.062 — supera el objetivo en $62 |
| Objetivo $300.000 | $296.162 |
| Óptimo con interfaz de audio | $791.438 |
| Óptimo si la consola ya tiene USB estéreo verificado | $558.547 |

Cada alternativa incluye dos cámaras. La sala mide 6 × 10 m; la orientación, la ubicación exacta de las columnas y los puntos de anclaje requieren relevamiento. La compatibilidad del montaje de las cámaras económicas sigue pendiente. Consultar las advertencias y fuentes dentro de la página antes de comprar.

## Desarrollo

HTML, CSS y JavaScript estáticos, sin compilación ni dependencias de ejecución. Las imágenes utilizadas están en `assets/`. Todos los archivos del sitio están en la raíz para que funcionen también bajo una subruta de GitHub Pages.

Para previsualizar desde esta carpeta:

```sh
python -m http.server 4184 --bind 127.0.0.1
```

Abrir `http://127.0.0.1:4184/`. La fuente de esta versión publicable es este repositorio; las modificaciones futuras deben realizarse aquí y subirse mediante Git.

## GitHub Pages

Configuración prevista: **Deploy from a branch → main → / (root)**. El archivo `.nojekyll` permite servir los archivos estáticos directamente. Cada cambio subido a `main` actualiza el sitio cuando termina la publicación de Pages.

Este repositorio contiene exclusivamente la propuesta de Keuken. Las fotografías del lugar, el logo y las imágenes de productos se incluyen para esta presentación; no se concede una licencia adicional sobre esos materiales.
