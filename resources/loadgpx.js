// Autore: Marco Solinas
// Tutti i diritti sono riservati

var map = new ol.Map({
    // Configurazioni della mappa...
});

var canvas = document.querySelector('canvas');
if (canvas) {
    canvas.willReadFrequently = true;
}

function loadGPX() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            try {
                var gpxData = e.target.result;

                console.log('GPX Data:', gpxData);

                var format = new ol.format.GPX();
                var features = format.readFeatures(gpxData, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                });

                if (features.length === 0) {
                    console.error('Nessuna feature nel file GPX.');
                    return;
                }

                var vectorSource = new ol.source.Vector({
                    features: features
                });

                var vectorLayer = new ol.layer.Vector({
                    source: vectorSource,
                    style: new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: 'red', // Colore rosso
                            width: 3 // Spessore 3px
                        })
                    })
                });

                map.addLayer(vectorLayer);

                // Calcola il centro della traccia
                var center = ol.extent.getCenter(vectorSource.getExtent());

                // Imposta la vista della mappa sul centro della traccia
                map.getView().setCenter(center);

                // Imposta lo zoom per far sì che la traccia occupi solo l'85% della finestra del browser
                var extentWidth = ol.extent.getWidth(vectorSource.getExtent());
                var extentHeight = ol.extent.getHeight(vectorSource.getExtent());
                var resolution = Math.max(extentWidth / (map.getSize()[0] * 0.85), extentHeight / (map.getSize()[1] * 0.85));
                var zoom = map.getView().getZoomForResolution(resolution);
                map.getView().setZoom(zoom);
            } catch (error) {
                console.error('Errore lettura del file GPX:', error);
            }
        };

        reader.onerror = function (event) {
            console.error('Errore durante il caricamento del file:', event.target.error);
        };

        reader.readAsText(file);
    } else {
        console.error('Nessun file selezionato.');
    }
}


function calcolaLunghezzaTraccia() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        console.error('Nessun file selezionato.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var gpxData = e.target.result;

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(gpxData, 'text/xml');

            var coordinates = getGPXCoordinates(xmlDoc);
            
            if (coordinates.length > 0) {
                var lunghezzaTotale = calcolaLunghezza(coordinates);
                document.getElementById('lunghezzaTraccia').innerHTML = ' SVILUPPO PLANIMETRICO: ' + lunghezzaTotale.toFixed(2) + ' km ';
		
            } else {
                console.error('Nessuna coordinata trovata nel file GPX.');
                document.getElementById('lunghezzaTraccia').innerHTML = ' GEOMETRIE NON VALIDE ';
		
            }
        } catch (error) {
            console.error('Errore durante la lettura del file GPX:', error);
            document.getElementById('lunghezzaTraccia').innerHTML = ' ERRORE GPX ';
		
        }
    };

    reader.onerror = function (event) {
        console.error('Errore durante il caricamento del file:', event.target.error);
        document.getElementById('lunghezzaTraccia').innerHTML = ' Errore nel caricamento ';
	
    };

    reader.readAsText(file);
}

function getGPXCoordinates(xmlDoc) {
    var coordinates = [];

    var trackpoints = xmlDoc.querySelectorAll('trkpt');
    trackpoints.forEach(function (point) {
        var lat = parseFloat(point.getAttribute('lat'));
        var lon = parseFloat(point.getAttribute('lon'));
        coordinates.push([lon, lat]);
    });

    return coordinates;
}

function calcolaLunghezza(coordinates) {
    var lineString = new ol.geom.LineString(coordinates);
    var lunghezzaTotale = ol.sphere.getLength(lineString, { projection: 'EPSG:4326' });

    return lunghezzaTotale / 1000; // Converti da metri a chilometri
}



function calcolaDislivelloPositivo() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        console.error('Nessun file selezionato.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var gpxData = e.target.result;

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(gpxData, 'text/xml');

            var elevations = getGPXElevations(xmlDoc);

            if (elevations.length > 1) {
                var dislivelloPositivo = calcolaDislivelloPositivoTotale(elevations);
                document.getElementById('dislivelloPositivo').innerHTML = ' SALITE CUMULATE: ' + dislivelloPositivo.toFixed(0) + ' metri ';
		
            } else {
                console.error('Menouno punto di altitudine nella traccia GPX.');
                document.getElementById('dislivelloPositivo').innerHTML = ' DATI N/D ';
		
            }
        } catch (error) {
            console.error('Errore durante la lettura del file GPX:', error);
            document.getElementById('dislivelloPositivo').innerHTML = ' ERRORE GPX ';
		
        }
    };

    reader.onerror = function (event) {
        console.error('Errore durante il caricamento del file:', event.target.error);
        document.getElementById('dislivelloPositivo').innerHTML = ' Errore nel caricamento ';
	
    };

    reader.readAsText(file);
}

function getGPXElevations(xmlDoc) {
    var elevations = [];

    var trackpoints = xmlDoc.querySelectorAll('trkpt');
    trackpoints.forEach(function (point) {
        var elevation = parseFloat(point.querySelector('ele').textContent);
        elevations.push(elevation);
    });

    return elevations;
}

function calcolaDislivelloPositivoTotale(elevations) {
    var dislivelloPositivo = 0;

    for (var i = 1; i < elevations.length; i++) {
        var differenzaAltitudine = elevations[i] - elevations[i - 1];
        if (differenzaAltitudine > 0) {
            dislivelloPositivo += differenzaAltitudine;
        }
    }

    dislivelloPositivo = Math.round(dislivelloPositivo);
    return dislivelloPositivo;
}


function calcolaTempoIntercorso() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        console.error('Nessun file selezionato.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var gpxData = e.target.result;

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(gpxData, 'text/xml');

            var tempi = getGPXTempi(xmlDoc);

            if (tempi.length >= 2) {
                var tempoIntercorso = calcolaTempoIntercorsoTotale(tempi);
                document.getElementById('tempoIntercorso').innerHTML = ' TEMPISTICA: ' + formattaTempoIntercorso(tempoIntercorso);
            } else {
                console.error('Menouno punto di tempo nella traccia GPX.');
                document.getElementById('tempoIntercorso').innerHTML = ' DATI N/D ';
            }
        } catch (error) {
            console.error('Errore durante la lettura del file GPX:', error);
            document.getElementById('tempoIntercorso').innerHTML = ' ERRORE GPX ';
        }
    };

    reader.onerror = function (event) {
        console.error('Errore durante il caricamento del file:', event.target.error);
        document.getElementById('tempoIntercorso').innerHTML = ' Errore nel caricamento ';
    };

    reader.readAsText(file);
}

function getGPXTempi(xmlDoc) {
    var tempi = [];

    var trackpoints = xmlDoc.querySelectorAll('trkpt');
    trackpoints.forEach(function (point) {
        var tempo = new Date(point.querySelector('time').textContent);
        tempi.push(tempo);
    });

    return tempi;
}

function calcolaTempoIntercorsoTotale(tempi) {
    var tempoInizio = tempi[0];
    var tempoFine = tempi[tempi.length - 1];

    return tempoFine - tempoInizio;
}






function calcolaQuoteInizialeFinale() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        console.error('Nessun file selezionato.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var gpxData = e.target.result;

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(gpxData, 'text/xml');

            var elevations = getGPXElevations(xmlDoc);

            if (elevations.length >= 2) {
                var quoteIniziale = elevations[0];
                var quoteFinale = elevations[elevations.length - 1];
                document.getElementById('quoteInizialeFinale').innerHTML = ' QUOTA di partenza: ' + quoteIniziale.toFixed(0) + ' metri &nbsp;&nbsp;&nbsp; QUOTA di arrivo: ' + quoteFinale.toFixed(0) + ' metri';
            } else {
                console.error('Menouno punto di altitudine nella traccia GPX.');
                document.getElementById('quoteInizialeFinale').innerHTML = ' DATI N/D ';
            }
        } catch (error) {
            console.error('Errore durante la lettura del file GPX:', error);
            document.getElementById('quoteInizialeFinale').innerHTML = ' ERRORE GPX ';
        }
    };

    reader.onerror = function (event) {
        console.error('Errore durante il caricamento del file:', event.target.error);
        document.getElementById('quoteInizialeFinale').innerHTML = ' Errore nel caricamento ';
    };

    reader.readAsText(file);
}

function calcolaQuoteMinMax() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];

    if (!file) {
        console.error('Nessun file selezionato.');
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        try {
            var gpxData = e.target.result;

            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(gpxData, 'text/xml');

            var elevations = getGPXElevations(xmlDoc);

            if (elevations.length >= 2) {
                var quoteMinMax = calcolaQuoteMinMaxTotale(elevations);
                document.getElementById('quoteMinMax').innerHTML = ' QUOTA minima: ' + quoteMinMax.min.toFixed(0) + ' metri &nbsp;&nbsp;&nbsp; QUOTA massima: ' + quoteMinMax.max.toFixed(0) + ' metri';
            } else {
                console.error('Menouno punto di altitudine nella traccia GPX.');
                document.getElementById('quoteMinMax').innerHTML = ' DATI N/D ';
            }
        } catch (error) {
            console.error('Errore durante la lettura del file GPX:', error);
            document.getElementById('quoteMinMax').innerHTML = ' ERRORE GPX ';
        }
    };

    reader.onerror = function (event) {
        console.error('Errore durante il caricamento del file:', event.target.error);
        document.getElementById('quoteMinMax').innerHTML = ' Errore nel caricamento ';
    };

    reader.readAsText(file);
}
function calcolaQuoteMinMaxTotale(elevations) {
    var quoteMin = Math.min(...elevations);
    var quoteMax = Math.max(...elevations);
    return { min: quoteMin, max: quoteMax };
}






function formattaTempoIntercorso(diffTempo) {
    var giorni = Math.floor(diffTempo / (1000 * 60 * 60 * 24));
    var oreResidue = Math.floor((diffTempo % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutiResidui = Math.floor((diffTempo % (1000 * 60 * 60)) / (1000 * 60));

    if (giorni >= 1) {
        return giorni + ' giorni, ' + oreResidue + ' ore e ' + minutiResidui + ' minuti';
    } else {
        return oreResidue + ' ore e ' + minutiResidui + ' minuti';
    }
}


function LeggilaTraccia() {
calcolaLunghezzaTraccia();
calcolaDislivelloPositivo();
calcolaTempoIntercorso();
calcolaQuoteMinMax();
calcolaQuoteInizialeFinale(); 
}




function popup() {

document.getElementById('schermo').style.display = 'block';
document.getElementById('creditsmappe').style.display = 'block';

}

function closepopup() {

document.getElementById('schermo').style.display = 'none';
document.getElementById('creditsmappe').style.display = 'none';

}
