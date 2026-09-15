# Keuken Aonikenk · propuesta audiovisual

Sitio independiente para presentar una instalación de dos cámaras en el centro cultural Keuken Aonikenk, Lago Puelo, Chubut.

- **Página:** https://nikoalerce.github.io/keuken-aonikenk-propuesta/
- **Repositorio:** https://github.com/NikoAlerce/keuken-aonikenk-propuesta

## Contenido

La propuesta sigue un recorrido orientado al cliente: el recital online, el valor para Keuken, la distribución en el salón, la operación, la inversión y la puesta en marcha.

- Portada inspirada en YouTube, con fotografía real del salón y reacciones ilustrativas.
- Plano del lugar y demostración de un panel sencillo para operadores.
- Tres alternativas con dos cámaras, cálculo de gastos y audio opcional.
- Fotografías, precios y enlaces de compra agrupados en una lista desplegable.
- Montaje, óptica y documentación técnica disponibles a pedido durante la lectura.
- Diseño adaptable a computadoras y celulares. La demostración no se conecta a OBS ni transmite a YouTube.

## Datos y límites de la propuesta

Precios consultados el **14 de septiembre de 2026**, en pesos argentinos. No representan una reserva de stock ni una cotización de entrega. Los gastos de envío a domicilio en Lago Puelo por Andreani, los anclajes y las adaptaciones deben confirmarse.

| Alternativa | Productos, antes de gastos pendientes |
| --- | ---: |
| Esencial · objetivo $200.000 | $200.062 — supera el objetivo en $62 |
| Mejor imagen · objetivo $300.000 | $296.162 |
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

Configuración: **Deploy from a branch → main → / (root)**. El archivo `.nojekyll` permite servir los archivos estáticos directamente. Cada cambio subido a `main` actualiza el sitio cuando termina la publicación de Pages.

Este repositorio contiene exclusivamente la propuesta de Keuken. Las fotografías del lugar, el logo y las imágenes de productos se incluyen para esta presentación; no se concede una licencia adicional sobre esos materiales.
