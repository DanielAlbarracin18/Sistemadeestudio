// Cordova/Browser navigation helper — jerarquía fija por página
// Jerarquía: index.html → clases.html → tematizacion.html → contenido/glosario/etc
(function(){
  // Mapa de "desde qué página vengo" según la página actual
  // Todas las claves en minúscula: la comparación se hace sin distinguir mayúsculas/minúsculas
  // para que no importe cómo esté escrito el nombre real del archivo (Contenido.html, etc).
  var PARENT_MAP = {
    'clases.html':             'index.html',
    'tematizacion.html':       'clases.html',
    // páginas de materiales de una clase → SIEMPRE vuelven a tematizacion.html (materiales de esa clase)
    'contenido.html':          'tematizacion.html',
    'glosario.html':           'tematizacion.html',
    'cuestionario.html':       'tematizacion.html',
    'estudio.html':            'tematizacion.html',
    'tematizacion_vista.html': 'tematizacion.html',
    'dominio.html':            'tematizacion.html',
    'practica.html':           'clases.html',
    'pruebamix.html':          'tematizacion.html',
  };

  window.navBack = function() {
    var cur = window.location.pathname.split('/').pop().split('?')[0];
    var parent = PARENT_MAP[cur.toLowerCase()];

    if (parent) {
      // Reconstruir la URL del padre con los parámetros relevantes
      var params = new URLSearchParams(window.location.search);
      var sId = params.get('s');
      var cId = params.get('c');

      var dest = parent;
      if (parent === 'clases.html' && sId)       dest = 'clases.html?s=' + sId;
      if (parent === 'tematizacion.html' && sId && cId) dest = 'tematizacion.html?s=' + sId + '&c=' + cId;
      if (parent === 'index.html')                dest = 'index.html';

      window.location.replace(dest);
    } else {
      // Raíz — limpiar y volver al inicio
      sessionStorage.removeItem('__navStack');
      window.location.replace('index.html');
    }
  };

  // navTo sigue funcionando para ir hacia adelante
  window.navTo = function(url) {
    window.location.href = url;
  };

  // Limpiar stack legacy (ya no lo usamos)
  window.__navStack = [];
  sessionStorage.removeItem('__navStack');
})();
