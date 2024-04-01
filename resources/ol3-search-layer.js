function hasClass(el, cls) {
  return el.className && new RegExp('(\\s|^)' +
    cls + '(\\s|$)').test(el.className);
}

function addClass(elem, className) {
  if (!hasClass(elem, className)) {
    elem.className += ' ' + className;
  }
}

function removeClass(elem, className) {
  var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
  if (hasClass(elem, className)) {
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}








var horseyComponent; // Dichiarato globalmente


var SearchLayer = (function (Control) {
 function SearchLayer(optOptions) {
  var horseyComponent;
  var select;
  var options = optOptions || {};
  if (optOptions.layer) {
    options.layer = optOptions.layer;
  } else {
    throw new Error('error');
  }
  options.map = optOptions.map;

  var source;
  if (options.layer instanceof ol.layer.Image &&
      options.layer.getSource() instanceof ol.source.ImageVector) {
    source = options.layer.getSource().getSource();
  } else if (options.layer instanceof ol.layer.Vector) {
    source = options.layer.getSource();
  }
  options.colName = optOptions.colName;

  var button = document.createElement('button');
  var toogleHideShowInput = function() {
    var input = document.querySelector('form > .search-layer-input-search');
    if (hasClass(input, 'search-layer-collapsed')) {
      removeClass(input, 'search-layer-collapsed');
    } else {
      input.value = '';
      addClass(input, 'search-layer-collapsed');
      horseyComponent.hide();
      select.getFeatures().clear();
    }
  };

  button.addEventListener('click', toogleHideShowInput, false);
  button.addEventListener('touchstart', toogleHideShowInput, false);

  var form = document.createElement('form');
  form.setAttribute('id', 'random');
  form.onsubmit = undefined;
  // form.setAttribute('action', 'javascript:void(0);');

  var input = document.createElement('input');
  input.setAttribute('id', 'ol-search-input');
  var defaultInputClass = ['search-layer-input-search'];
  if (optOptions.collapsed) {
    defaultInputClass.push('search-layer-collapsed');
  }
  input.setAttribute('class', defaultInputClass.join(' '));
  input.setAttribute('placeholder', 'Cerca il Comune di...');
  input.setAttribute('type', 'text');

  form.appendChild(input);

  var element = document.createElement('div');
  element.className = 'search-layer ol-unselectable ol-control';

  element.appendChild(button);
  element.appendChild(form);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });

  select = new ol.interaction.Select({
    id: options.selectId || 'defaultSearchLayer',
    layers: [options.layer],
    condition: ol.events.condition.never
  });




// Stile per le feature selezionate
var selectedStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 0, 0, 0.5)',
  }),
  // ... altri stili ...
});

// Gestione dello stile delle feature selezionate
select.getFeatures().on('add', function(event) {
  console.log('Feature added to selection:', event.element.getProperties());
  event.element.setStyle(selectedStyle);
});

select.getFeatures().on('remove', function(event) {
  console.log('Feature removed from selection:', event.element.getProperties());
  event.element.setStyle(null);
});





  var map = options.map;

  map.addInteraction(select);

  var typesToZoomToExtent = [
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'MultiPolygon',
    'Polygon'
  ];

  var typesToZoomToCenterAndZoom = [
    'Point'
  ];
  var returnHorsey = function(input, source, map, select, options) {
    horsey(input, {
      source: [{
        list: source.getFeatures().map(function(el, i) {
          if (el.getId() === undefined) {
            el.setId(i);
          }
          return {
            text: el.get(options.colName),
            value: el.getId() // If GeoJSON has an id
          };
        })
      }],
      getText: 'text',
      getValue: 'value',







predictNextSearch: function (info) {
    var feat = source.getFeatureById(info.selection.value);

    // Rimuovi stili precedenti
    source.getFeatures().forEach(function (feature) {
        // Aggiungi uno stile alle feature non selezionate
        if (feature !== feat) {
            feature.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(167,248,21,0.2)', // Colore verde fluorescente
                    width: 1.0 // Spessore di 1.0 px
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 0, 0.75)' // Colore nero trasparente al 75%
                })
            }));
        } else {
            // Imposta uno stile per la feature selezionata
            feature.setStyle(new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: 'rgba(167,248,21,1)', // Colore verde fluorescente
                    width: 1.0 // Spessore di 1.0 px
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(0, 0, 0, 0.0)' // Colore nero trasparente 
                })
            }));
        }
    });

    var featureExtent = feat.getGeometry().getExtent();

    // Calcola il margine del 10%
    var marginX = (featureExtent[2] - featureExtent[0]) * 0.1;
    var marginY = (featureExtent[3] - featureExtent[1]) * 0.1;

    // Calcola il nuovo extent con il margine
    var paddedExtent = [
        featureExtent[0] - marginX,
        featureExtent[1] - marginY,
        featureExtent[2] + marginX,
        featureExtent[3] + marginY
    ];

    // Usa la funzione fit per centrare la mappa sul nuovo extent
    map.getView().fit(paddedExtent, {
        size: map.getSize(),
        duration: 500 // Durata dell'animazione in millisecondi
    });

    // Nascondi la barra di ricerca solo se horseyComponent è definito
    if (horseyComponent) {
        horseyComponent.hide();
        removeClass(input, 'search-layer-collapsed');
    }
}







    });
  }
  if (source.getState() === 'ready') {
    horseyComponent = returnHorsey(input, source, map, select, options);
  }
  source.once('change', function(e) {
    if (source.getState() === 'ready') {
      horseyComponent = returnHorsey(input, source, map, select, options);
    }
  });
 };
    if (Control) SearchLayer.__proto__ = Control;
    SearchLayer.prototype = Object.create(Control && Control.prototype);
    SearchLayer.prototype.constructor = SearchLayer;
    return SearchLayer;
}(ol.control.Control));
