# Cumpleaños de Abel Coras Borda 🏍️🎂

**Fecha:** miércoles 11 de noviembre de 2026.

**Página principal:** https://ayarang.github.io/cumpleanos-abel-coras-borda/

Este repositorio está dedicado exclusivamente al álbum de cumpleaños de Abel. La versión anterior del simulador de jugos fue eliminada. La página principal ahora redirige a la tarjeta.

## Qué contiene

- Nueva portada cinematográfica aprobada con Abel y su motocicleta en carretera, óvalo dorado, globos y título. La foto está integrada en WebP optimizado y tiene una cajita de regalo interactiva delante del botón «Abrir mi regalo»; mantiene dedicatoria y el secreto 11:11.
- Galería de tres recuerdos: collage original ampliable en el centro, fotografía nocturna del mirador a la izquierda y fotografía de la pasarela a la derecha. En celular se muestra primero el collage y luego las dos fotos. Cualquiera se puede ampliar y descargar.
- Torta interactiva con velas y humo, además de un mensaje final.
- **Linda Rosita**, canción de Chinito del Ande, integrada mediante un reproductor visible del video publicado por Radio Picaflor en YouTube: https://www.youtube.com/watch?v=d2_XXIqX1No
- Al pulsar «Abrir mi regalo», se presenta inmediatamente un video flotante en una esquina; no hace falta tocar un segundo botón musical. El iframe de YouTube intenta iniciar «Linda Rosita» en aproximadamente 0:24 (entrada vocal estimada). Se activa la repetición del mismo video con loop=1 y playlist=videoId conforme a YouTube. La reproducción con sonido depende del navegador: si se bloquea, se puede pulsar Play dentro del video. Al cerrar el video aparece un botón ♫ solo para volver a mostrarlo.

## Archivos

- Raíz: index.html redirige hacia el cumpleaños.
- tarjeta-cumpleanos/index.html: estructura de la tarjeta.
- tarjeta-cumpleanos/assets/: collage y portada `abel-ruta-dorada.webp`, más `abel_mirador_noche.webp` y `abel_pasarela_noche.webp`.
- tarjeta-cumpleanos/css/: diseño, fecha, torta y música.
- tarjeta-cumpleanos/js/app.js: lógica principal.
- tarjeta-cumpleanos/js/music.js: integración del reproductor oficial.
- tarjeta-cumpleanos/js/cake.js y confetti.js: animaciones.

La canción no está alojada ni copiada en el repositorio: sigue siendo un video de YouTube publicado por Radio Picaflor. El detalle de regalo es una animación original liviana. El sitio no utiliza el micrófono.

## Mensajes emotivos (11/11/2026)

La carta «Unas palabras para ti», las tres frases de las fotos originales, «Valiente» y el cierre «No todos dejan huella. Tú sí.» aparecen en el álbum sin crear una página adicional. El cierre se revela al apagar las velas y se oculta si se vuelven a encender. La animación de apertura dice «Este detalle es para recordarte lo valioso que eres, Abel». Se mantiene el código modular: `css/emotion.css` para estilos y `js/emotion.js` para el cierre; `cake.js` emite el cambio de estado mediante una devolución opcional, sin alterar la galería ni el reproductor musical.

## Ajustes finales en Android (11/11/2026)

Se creó `tarjeta-cumpleanos/css/mobile.css` como capa de estilos exclusivos para móviles (cargada después de los otros CSS). La portada queda centrada y de ancho contenido, y la galería mantiene las tres fotos **en una misma fila**: mirador a la izquierda, collage al centro y pasarela a la derecha, incluso en pantallas angostas. El collage se redujo proporcionalmente sin perder el visor táctil. El reproductor flotante de `Linda Rosita` mantiene la reproducción automática solicitada y conserva un iframe de 200 × 200 px, tamaño mínimo exigido por YouTube; se eliminaron márgenes y textos adicionales del marco móvil. No se modificaron archivos de escritorio ni las fotografías.
