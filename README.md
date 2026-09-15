# Keuken Aonikenk · propuesta audiovisual

Sitio independiente para presentar una instalación de dos cámaras en el centro cultural Keuken Aonikenk, Lago Puelo, Chubut.

- **Página:** https://nikoalerce.github.io/keuken-aonikenk-propuesta/
- **Repositorio:** https://github.com/NikoAlerce/keuken-aonikenk-propuesta
- **Soluciones:** https://nikoalerce.github.io/keuken-aonikenk-propuesta/soluciones/

## Soluciones · 15 de septiembre de 2026

`soluciones/` desarrolla la respuesta a las necesidades de Keuken: distribución en YouTube y web, gestión de covers, apoyo económico, captación de amplificadores/acústicos/teatro, montaje reubicable, compras por necesidad y una sesión piloto. La página inicial enlaza esta ampliación y conserva sus presupuestos de referencia del 14/09.

Los nueve productos de `soluciones/productos.json` fueron consultados directamente en Mercado Libre el 15/09. Sus imágenes se guardan en `assets/`. Las cantidades, subtotales y gastos se calculan en centavos enteros; un campo de gastos vacío significa **sin cotizar**, no envío gratuito. Elegir un escenario reemplaza la selección y borra la cotización de gastos anterior.

| Ampliación | Productos de referencia, antes de gastos |
| --- | ---: |
| Un amplificador: SL 75C + SMC10 + MISQ22 | $142.121 |
| Acústico con consola: par C-2 + 2 SMC10 + 2 MISQ22 | $347.202 |
| Grabadora H1essential, sin accesorios | $290.900 |
| Dos soportes R094, para cámaras y apoyos compatibles | $85.778 |

Son módulos alternativos y condicionales, no un presupuesto completo nuevo de cámaras. Hay que descontar los equipos existentes y no duplicar los ya incluidos en otra propuesta. Envío a Lago Puelo, Andreani, puntos de sujeción, accesorios específicos, trabajo técnico, desarrollo y derechos/licencias se confirman aparte.

### Verificación de esta ampliación

- Comprobación real en navegador de precio, vendedor y stock de cada publicación. Se descartó una H1essential sin stock y una oferta internacional de C920; la cámara elegida mantiene el filtro nacional.
- Sumatorias en navegador: $347.202 + $10.000,50 + $5.000 = $362.202,50; DI400P + SMC10 = $107.261,76. Gastos negativos invalidan el total. Cantidades de C-2: un par, dos cables y dos pies.
- Interacción real con las pestañas de audio, navegación por teclado, selección de escenarios y resumen móvil. Imágenes locales verificadas como archivos válidos.
- Diseño comprobado en navegador a 320, 390, 1440, 1920 y 2560 píxeles sin desborde horizontal. En pantallas grandes se mantiene un contenido de hasta 1500 píxeles. Accesos desde la portada comprobados en escritorio y celular; las nueve fotos responden HTTP 200.
- Ninguna prueba en el salón ni validación física del montaje se presenta como realizada. El panel de operador sigue siendo una propuesta/demostración.

### Próximo paso operativo

Relevar modelos y existencias con Keuken, ensayar captación y dos encuadres en el salón, resolver repertorio/permisos de la sesión piloto y cotizar únicamente los faltantes comprobados. Las fuentes oficiales de YouTube, fabricantes y Cloudflare están enlazadas junto a las decisiones dentro de la página.

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
