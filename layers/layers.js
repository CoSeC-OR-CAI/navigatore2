var wms_layers = [];

var lyr_VecchieIGMserie25obsolete_0 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://wms.pcn.minambiente.it/ogc?map%3D/ms_ogc/WMS_v1.3/raster/IGM_25000.map",
    attributions: ' ',
                              params: {
                                "LAYERS": "CB.IGM25000.32",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Vecchie IGM serie 25 (obsolete)",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_VecchieIGMserie25obsolete_0, 0]);
var lyr_OrtofotoIGM19541955_1 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserverraster/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "raster:ortofoto_1954_1955",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Ortofoto IGM 1954-1955",
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_OrtofotoIGM19541955_1, 0]);
var lyr_OrtofotoAGEA2010_2 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserverraster/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "raster:ortofoto_2010",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Ortofoto AGEA 2010",
                            opacity: 1.000000,
                            
                            
                          });
              wms_layers.push([lyr_OrtofotoAGEA2010_2, 0]);
var lyr_OrtofotoAGEA2019_3 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserverraster/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "raster:ortofoto_2019",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Ortofoto AGEA 2019",
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_OrtofotoAGEA2019_3, 0]);

        var lyr_GoogleSatellite_4 = new ol.layer.Tile({
            'title': 'Google Satellite',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
            })
        });

        var lyr_OpenStreetMap_5 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 0.900000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var lyr_Ortofoto1968_6 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserverraster/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "raster:ortofoto_1968",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Ortofoto 1968",
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto1968_6, 0]);
var lyr_Ortofoto19771978_7 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserverraster/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "raster:ortofoto_1977_1978",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Ortofoto 1977-1978",
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto19771978_7, 0]);
var lyr_Ortofoto1997_8 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserverraster/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "raster:ortofoto_1997",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Ortofoto 1997",
                            opacity: 0.700000,
                            
                            
                          });
              wms_layers.push([lyr_Ortofoto1997_8, 0]);
var lyr_DBGT2022110000_9 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserverraster/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "raster:Mosaico_DBGT_10K_22_V04",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "DBGT 2022 1:10.000",
                            opacity: 0.800000,
                            
                            
                          });
              wms_layers.push([lyr_DBGT2022110000_9, 0]);
var lyr_Mappali_10 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserver/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "dbu:CP.CadastralParcel",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Mappali",
                            opacity: 0.400000,
                            
                            
                          });
              wms_layers.push([lyr_Mappali_10, 0]);
var lyr_Fabbricati_11 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserver/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "dbu:fabbricati",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Fabbricati",
                            opacity: 0.400000,
                            
                            
                          });
              wms_layers.push([lyr_Fabbricati_11, 0]);
var lyr_Strade_12 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserver/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "dbu:strade",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Strade",
                            opacity: 0.400000,
                            
                            
                          });
              wms_layers.push([lyr_Strade_12, 0]);
var lyr_Fogli_13 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserver/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "dbu:CP.CadastralZoning",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Fogli",
                            opacity: 0.400000,
                            
                            
                          });
              wms_layers.push([lyr_Fogli_13, 0]);
var lyr_Acque_14 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserver/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "dbu:acque",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Acque",
                            opacity: 0.400000,
                            
                            
                          });
              wms_layers.push([lyr_Acque_14, 0]);
var lyr_Vestizioni_15 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://webgis.regione.sardegna.it/geoserver/ows",
    attributions: ' ',
                              params: {
                                "LAYERS": "dbu:vestizioni",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: "Vestizioni",
                            opacity: 0.400000,
                            
                            
                          });
              wms_layers.push([lyr_Vestizioni_15, 0]);
var format_Limitiamministrativi_16 = new ol.format.GeoJSON();
var features_Limitiamministrativi_16 = format_Limitiamministrativi_16.readFeatures(json_Limitiamministrativi_16, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Limitiamministrativi_16 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Limitiamministrativi_16.addFeatures(features_Limitiamministrativi_16);
var lyr_Limitiamministrativi_16 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Limitiamministrativi_16, 
                style: style_Limitiamministrativi_16,
                interactive: true,
            });
var group_CatastoAgenziadelleEntrate = new ol.layer.Group({
                                layers: [lyr_Mappali_10,lyr_Fabbricati_11,lyr_Strade_12,lyr_Fogli_13,lyr_Acque_14,lyr_Vestizioni_15,],
                                title: "Catasto (Agenzia delle Entrate)"});
var group_GeoportaleRegioneAutonomadellaSardegna = new ol.layer.Group({
                                layers: [lyr_Ortofoto1968_6,lyr_Ortofoto19771978_7,lyr_Ortofoto1997_8,lyr_DBGT2022110000_9,],
                                title: "Geoportale (Regione Autonoma della Sardegna)"});
var group_Sfondo = new ol.layer.Group({
                                layers: [lyr_VecchieIGMserie25obsolete_0,lyr_OrtofotoIGM19541955_1,lyr_OrtofotoAGEA2010_2,lyr_OrtofotoAGEA2019_3,lyr_GoogleSatellite_4,lyr_OpenStreetMap_5,],
                                title: "Sfondo cartografico"});

lyr_VecchieIGMserie25obsolete_0.setVisible(false);lyr_OrtofotoIGM19541955_1.setVisible(false);lyr_OrtofotoAGEA2010_2.setVisible(false);lyr_OrtofotoAGEA2019_3.setVisible(false);lyr_GoogleSatellite_4.setVisible(true);lyr_OpenStreetMap_5.setVisible(false);lyr_Ortofoto1968_6.setVisible(false);lyr_Ortofoto19771978_7.setVisible(false);lyr_Ortofoto1997_8.setVisible(false);lyr_DBGT2022110000_9.setVisible(false);lyr_Mappali_10.setVisible(false);lyr_Fabbricati_11.setVisible(false);lyr_Strade_12.setVisible(false);lyr_Fogli_13.setVisible(false);lyr_Acque_14.setVisible(false);lyr_Vestizioni_15.setVisible(false);lyr_Limitiamministrativi_16.setVisible(true);
var layersList = [group_Sfondo,group_GeoportaleRegioneAutonomadellaSardegna,group_CatastoAgenziadelleEntrate,lyr_Limitiamministrativi_16];
lyr_Limitiamministrativi_16.set('fieldAliases', {'Comune': 'Comune', });
lyr_Limitiamministrativi_16.set('fieldImages', {'Comune': 'TextEdit', });
lyr_Limitiamministrativi_16.set('fieldLabels', {'Comune': 'header label - always visible', });
lyr_Limitiamministrativi_16.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});