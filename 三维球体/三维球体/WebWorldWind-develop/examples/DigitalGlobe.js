/*
 * Copyright 2015-2017 WorldWind Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        var wwd = new WorldWind.WorldWindow("canvasOne");

        // The following access token is expired and it's given as example (2017-05-13).
        //var accessToken = "pk.eyJ1IjoiZGlnaXRhbGdsb2JlIiwiYSI6IjljZjQwNmEyMTNhOWUyMWM5NWUzYWIwOGNhYTY2ZDViIn0.Ju3tOUUUc0C_gcCSAVpFIA";
        var accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A#15/34.0610/119.7600";
//https://www.mapbox.com/api-documentation/#coordinates
        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {
                layer: new WorldWind.DigitalGlobeTiledImageLayer("卫星图", "mapbox.streets-satellite", accessToken),
                enabled: false
            },
			{
                layer: new WorldWind.DigitalGlobeTiledImageLayer("等高线", "mapbox.outdoors", accessToken),
                enabled: false
            },
			{
                layer: new WorldWind.DigitalGlobeTiledImageLayer("剪纸艺术", "mapbox.wheatpaste", accessToken),
                enabled: false
            },
			{
                layer: new WorldWind.DigitalGlobeTiledImageLayer("漫画风格", "mapbox.comic", accessToken),
                enabled: false
            },
						{
                layer: new WorldWind.DigitalGlobeTiledImageLayer("航海探险", "mapbox.pirates", accessToken),
                enabled: false
            },
			{
                layer: new WorldWind.DigitalGlobeTiledImageLayer("铅笔手绘", "mapbox.pencil", accessToken),
                enabled: false
            },
			{
                layer: new WorldWind.DigitalGlobeTiledImageLayer("经典图层", "mapbox.streets-basic", accessToken),
                enabled: false
            },
            {
                layer: new WorldWind.DigitalGlobeTiledImageLayer("数字化地图", "mapbox.streets", accessToken),
                enabled: false
            },
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });