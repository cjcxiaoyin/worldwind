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
		var canvas=document.getElementById("canvasOne");
        var wwd;
		var cjc_location;
		var annotationsLayer=[];
		var layerCount=0;
		var placemarkLayer=[];
		var layerCount_01=0;
		var layerCount_02=0;
		var clickRecognizer_cjc;
		var pathPositions = [];
		var pathsLayer=[];
		var starPush=false;
	
 requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        wwd = new WorldWind.WorldWindow("canvasOne");
		wwd.goTo(new WorldWind.Position(39.92, 116.37, 20000000));

        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialLayer(null), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }
		 var atmosphereLayer = new WorldWind.AtmosphereLayer();
		 atmosphereLayer.enabled=false;
        wwd.addLayer(atmosphereLayer);
        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
		
		 var handleClick = function (recognizer) {
            // Obtain the event location.
            var x = recognizer.clientX,
                y = recognizer.clientY;
            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

            // If only one thing is picked and it is the terrain, tell the WorldWindow to go to the picked location.
            if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
                var position = pickList.objects[0].position;
                wwd.goTo(new WorldWind.Location(position.latitude, position.longitude));
				cjc_location=new WorldWind.Location(position.latitude, position.longitude);
				
				
            }
			if(starPush){
				pathPositions.push(new WorldWind.Location(cjc_location.latitude, cjc_location.longitude, 1e4));
				var path = new WorldWind.Path(pathPositions, null);
				path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
				path.followTerrain = true;
				path.extrude = true; // make it a curtain
				path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode

				// Create and assign the path's attributes.
				var pathAttributes = new WorldWind.ShapeAttributes(null);
				pathAttributes.outlineColor = WorldWind.Color.BLUE;
				pathAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
				pathAttributes.drawVerticals = path.extrude; // draw verticals only when extruding
				path.attributes = pathAttributes;

				// Create and assign the path's highlight attributes.
				var highlightAttributes = new WorldWind.ShapeAttributes(pathAttributes);
				highlightAttributes.outlineColor = WorldWind.Color.RED;
				highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 0.5);
				path.highlightAttributes = highlightAttributes;

				// Add the path to a layer and the layer to the WorldWindow's layer list.
				pathsLayer[layerCount_02] = new WorldWind.RenderableLayer();
				//pathsLayer[layerCount_02].displayName = "Paths";
				pathsLayer[layerCount_02].addRenderable(path);
				wwd.addLayer(pathsLayer[layerCount_02]);
				layerCount_02++;
			}
        };

        // Listen for mouse clicks.
        var clickRecognizer = new WorldWind.ClickRecognizer(wwd, handleClick);

        // Listen for taps on mobile devices.
        var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleClick);
		document.getElementById("annotationList").style.display="none";
		
		var sunSimulationCheckBox = document.getElementById('sun-simulation');
        var sunInterval = 0;
        var timeStamp = Date.now();
        sunSimulationCheckBox.addEventListener("click", onSunCheckBoxClick);

        function onSunCheckBoxClick() {
            if (document.getElementById('sun-simulation').className=="list-group-item btn btn-block") {
                runSunSimulation();
				document.getElementById('sun-simulation').className="list-group-item btn btn-block active";
            }
            else {
                atmosphereLayer.time = null;
                clearInterval(sunInterval);
                wwd.redraw();
				document.getElementById('sun-simulation').className="list-group-item btn btn-block";
            }
        }

        function runSunSimulation() {
            sunInterval = setInterval(function () {
                timeStamp += 180 * 1000;
                atmosphereLayer.time = new Date(timeStamp);
                wwd.redraw();
            }, 64);
        }
		//clickRecognizer_cjc = new WorldWind.ClickRecognizer(wwd, handleClick_cjc);
		//wwd.addEventListener("clickRecognizer",handleClick_cjc);
    });
	
	function addZhushi(){
		var annotationAttributes = new WorldWind.AnnotationAttributes(null);
        annotationAttributes.cornerRadius = 14;
        annotationAttributes.backgroundColor = WorldWind.Color.BLUE;
        annotationAttributes.drawLeader = true;
        annotationAttributes.leaderGapWidth = 40;
        annotationAttributes.leaderGapHeight = 30;
        annotationAttributes.opacity = 1;
        annotationAttributes.scale = 1;
        annotationAttributes.width = 200;
        annotationAttributes.height = 100;
        annotationAttributes.textAttributes.color = WorldWind.Color.WHITE;
        annotationAttributes.insets = new WorldWind.Insets(10, 10, 10, 10);

        // Set a location for the annotation to point to and create it.
		if(cjc_location==null){
			var location = new WorldWind.Position(39.92, 116.37, 1e2);
		}
		else{
        var location = new WorldWind.Position(cjc_location.latitude, cjc_location.longitude, 1e2);
		}
		
        var annotation = new WorldWind.Annotation(location, annotationAttributes);
        // Text can be assigned to the annotation after creating it.
        annotation.label = "请填写注释内容";

        // Create and add the annotation layer to the WorldWindow's layer list
        annotationsLayer[layerCount] = new WorldWind.RenderableLayer("Annotations");
        annotationsLayer[layerCount].addRenderable(annotation);
        wwd.addLayer(annotationsLayer[layerCount]);
		layerCount++;
		hideMainview_layer();
		// Create UI controller to modify annotation properties interactively
        // and load the annotation to it so the UI elements can modify it.
       requirejs(['./WorldWindShim',
        './AnnotationController'],
    function (WorldWind,
              AnnotationController) {
        "use strict";
		        var annotationController = new AnnotationController(wwd);
        annotationController.load(annotation);
		    });
	}
	function removeZhushi(){
		for(var i=0;i<layerCount;i++){
		wwd.removeLayer(annotationsLayer[i]);
		}
		layerCount=0;
		annotationsLayer=[];
		hideMainview_layer_cancel();
	}
	
	function hideMainview_layer(){
		document.getElementById("layerList_cjc").style.display="none";
		document.getElementById("annotationList").style.display="inline";
	}
	function hideMainview_layer_cancel(){
		document.getElementById("layerList_cjc").style.display="inline";
		document.getElementById("annotationList").style.display="none";
	}
	function addDibiao(){
		var placemark,
            placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes,
            latitude ,
            longitude;
		
			placemarkLayer[layerCount_01] = new WorldWind.RenderableLayer("Placemarks");		
			
		if(cjc_location==null){
			latitude = 39.92;
			longitude = 116.37;
		}
		else{
			latitude = cjc_location.latitude;
			longitude = cjc_location.longitude;
		}
		
		// Set up the common placemark attributes.
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 0.5);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;

        // Create the custom image for the placemark.

        var canvas = document.createElement("canvas"),
            ctx2d = canvas.getContext("2d"),
            size = 64, c = size / 2 - 0.5, innerRadius = 5, outerRadius = 20;

        canvas.width = size;
        canvas.height = size;

        var gradient = ctx2d.createRadialGradient(c, c, innerRadius, c, c, outerRadius);
        gradient.addColorStop(0, 'rgb(255, 0, 0)');
        gradient.addColorStop(0.5, 'rgb(0, 255, 0)');
        gradient.addColorStop(1, 'rgb(255, 0, 0)');

        ctx2d.fillStyle = gradient;
        ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
        ctx2d.fill();

        // Create the placemark.
        placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude, 1e2), false, null);
        placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

        // Create the placemark attributes for the placemark.
        placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        // Wrap the canvas created above in an ImageSource object to specify it as the placemark image source.
        placemarkAttributes.imageSource = new WorldWind.ImageSource(canvas);
        placemark.attributes = placemarkAttributes;

        // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
        // the default highlight attributes so that all properties are identical except the image scale. You could
        // instead vary the color, image, or other property to control the highlight representation.
        highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
        highlightAttributes.imageScale = 1.2;
        placemark.highlightAttributes = highlightAttributes;

        // Add the placemark to the layer.
        placemarkLayer[layerCount_01].addRenderable(placemark);

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer[layerCount_01]);
		//wwd.removeLayer(placemarkLayer);
		layerCount_01++;
	}
	
	function removeDibiao(){
		for(var i=0;i<layerCount_01;i++){
			wwd.removeLayer(placemarkLayer[i]);
		}
		placemarkLayer=[];
		layerCount_01=0;
		//placemarkLayer.removeRenderable(placemark);
	}
	
	function addPath(){
		starPush=true;
		
	}
	function removePath(){
		starPush=false;
		for(var i=0;i<layerCount_02;i++){
			wwd.removeLayer(pathsLayer[i]);
		}
		pathsLayer=[];
		layerCount_02=0;
		pathPositions=[];
	}
//document.getElementById("annotationList").style.display="none";