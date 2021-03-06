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
/**
 * Displays a time series of the 12 months of Blue Marble imagery.
 */
var wwd;
var kl=1;
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);
        wwd = new WorldWind.WorldWindow("canvasOne");

	var screenText,textAttributes;
	var textLayer;
		textLayer= new WorldWind.RenderableLayer("Screen Text");	
		screenText = new WorldWind.ScreenText(new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0, WorldWind.OFFSET_FRACTION, 1), " ");
        textAttributes = new WorldWind.TextAttributes(textAttributes);
        textAttributes.offset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0, WorldWind.OFFSET_FRACTION, 1);
        screenText.attributes = textAttributes;
		textLayer.hide=true;
		
 textLayer.addRenderable(screenText);
		//wwd.addLayer(textLayer);
		
        var backgroundLayer = new WorldWind.BMNGOneImageLayer();
        backgroundLayer.hide = true; // Don't show it in the layer manager.
        wwd.addLayer(backgroundLayer);

        // Create the Blue Marble time series layer using REST tiles hosted at worldwind32.arc.nasa.gov.
        var blueMarbleTimeSeries = new WorldWind.BMNGRestLayer("https://worldwind32.arc.nasa.gov/standalonedata/Earth/BlueMarble256");
        blueMarbleTimeSeries.enabled = false;
        blueMarbleTimeSeries.showSpinner = true;
        wwd.addLayer(blueMarbleTimeSeries);

        // Create a compass and view controls.
        wwd.addLayer(new WorldWind.CompassLayer());
        wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
        wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);

        // Ensure that the background and other control layers are displayed while the blue marble layer is
        // being pre-populated.
        wwd.redraw();


        // Wait for the layer to pre-populate all its sub-layers before enabling it.
        var prePopulateInterval = window.setInterval(function () {
            if (!this.prePopulate) {
                // Pre-populate the layer's sub-layers so that we don't see flashing of their image tiles as they're
                // loaded.
                blueMarbleTimeSeries.prePopulate(wwd);
                this.prePopulate = true;
				
				
                return;
            }

            // See if the layer is pre-populated now. If so, enable it.
            if (blueMarbleTimeSeries.isPrePopulated(wwd)) {
                blueMarbleTimeSeries.showSpinner = false;
                window.clearInterval(prePopulateInterval);
                layerManager.synchronizeLayerList();
				
            $(document).ready(function () {  
				var cjc_layerListItem =document.getElementById("cjc_MoNiDongHua_button");
				//cjc_layerListItem.innerHTML="kkkk"
				cjc_layerListItem.addEventListener("click",function(e){
					if(blueMarbleTimeSeries.enabled){
						wwd.addLayer(textLayer);
					}else{
						wwd.removeLayer(textLayer);
					}
				});
			});

                // Increment the Blue Marble layer's time at a specified frequency.
                var currentIndex = 0;
                window.setInterval(function () {
                    if (blueMarbleTimeSeries.enabled) {
                        currentIndex = ++currentIndex % WorldWind.BMNGRestLayer.availableTimes.length;
                        blueMarbleTimeSeries.time = WorldWind.BMNGRestLayer.availableTimes[currentIndex];
						screenText.text=blueMarbleTimeSeries.time+"";

                        wwd.redraw();
                    }
                }, 1000);
            }
			
			
        }, 1000);

	
	
});
//

