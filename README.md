# Front end exercise
El ejercicio consiste en realizar un "accordion", con jQuery y CSS.
Abrir y cerrar capas es una tarea que suele usarse amenudo, por lo que he pensado en desarrollar un código lo más reutilizable posible. Para ello, he creado la utilidad "open-target" (`./src/js/utilities/open-target.js`). 

Éste script se basa en un disparador:

``` html
<button data-open-target="hidden-layer" class="js-open-target">Open Hidden layer</button>
```

y un contenido oculto:

``` html
<div data-target="hidden-layer">
    <!-- Content -->
</div>
```

El disparador apunta hacia el contenido mediante el atributo `data-open-target`, que tiene el mismo valor que el atributo `data-target` de la capa de contenido.

Al hacer click en el disparador, el script revisa si pertenece a algún grupo mediante el atributo `data-open-target-group`. 
En caso afirmativo, revisa si dentro del grupo hay algun disparador marcado como con contenido visible (`is-open`). En caso afirmativo lo cierra y  seguidamente abre el contenido del disparador accionado.

La ventaja de hacerlo de ésta manera, es que podemos utilizar el mismo script no sólo para abrir los "accordions", sino cualquier capa que tengamos oculta accionando un botón.

Me parece importante señalar que en este ejercicio, están separadas los selectores de estilos (SUIT naming convention) de los de funcionalidad (marcadas con el prefijo `js-*`). En los selectores de funcionalidad suelo separar las palabras en minúsculas con guiones, pero se podria utilizar cualquier convención.

## Ajax (bonus)
El segundo gupo se carga dinámicamente con datos del fichero `./dis/accordion-items.json` sobre la capa con clase `js-load-accordion-ajax` (ver fichero `./src/js/components/accordion-ajax.js`).
Mustache.js se encarga del templating de los datos cargados del fichero json y el componente "loading-bar" (`./src/js/components/loading-bar.js`) señaliza que la carga está en curso. Para simular la transferencia de datos dejo un setTimeout forzado de 3 segundos. 
Cuando la carga de items ha finalizado correctamente, inicializamos el script para los nuevos elementos (`openTarget.openTargetInit('.js-open-target-ajax');`).

## Animación
He decidido utilizar animaciones de CSS y evitar las de jQuery (siendo estas últimas más costosas de renderizar).
Para ello, al inicializar el plugin, este recorrerá todos los disparadores, medirá la altura de sus contenidos, y los guardará como atributo `data-itemheight`. Esta medida es la que asignaremos al contenido, cuando el disparador sea accionado. 

El navegador se encargará de realizar la animación mediante la instrucción CSS `transition: height $animation-duration $animation-transition;`, cuya duración y transición se definen en el fichero `./src/scss/variables.scss`.

No he realizado una nueva muestra de medidas en el evendo window.resize, pero seria conveniente hacerlo.

## Estilos
He utilizado SASS con sintaxis SCSS. 
En la carpeta `./src/scss` encontraréis:

```html
- styles.scss <!-- punto de entrada -->
- variables.scss <!--definiciónde colores y demás variables necesarias-->
- components/accordion-animated.scss
- components/loading-bar.scss
- components/loading-spinner.scss
- lib/buttons.scss
- lib/helpers.scss 
- lib/layout.scss
- lib/main.scss
- lib/typography.scss
- partials/header.scss
- partials/footer.scss
```

## Scripts
He utilizado jQuery y una estructura basada en componentes y utilidades.
En la carpeta `./src/js` encontraréis:

```html
- main.js <!-- punto de entrada -->
- components/accordion-ajax.js
- components/loading-bar.js 
- utilities/open-target.js
```

## compilación / entorno de desarrollo
El entorno del ejercicio está montado con npm, gulp y browserify.

Instrucciones:
`npm start` Incializa un servidor (para habilitar live-reload).
`gulp styles` Compila SCSS a CSS y minifica.
`gulp scripts` Compila JS y minifica.
`gulp watch` Busca cambios en los ficheros css y js de la carpeta `/src`, ejecuta tareas de compilación, y envia una señal al navegador para recargar los ficheros (live-reload).
`gulp` Tarea "default". Ejecuta `gulp styles`  y `gulp scripts`.
