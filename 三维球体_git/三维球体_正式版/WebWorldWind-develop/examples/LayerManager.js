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
 * @exports LayerManager
 */
define(function () {
    "use strict";

    /**
     * Constructs a layer manager for a specified {@link WorldWindow}.
     * @alias LayerManager
     * @constructor
     * @classdesc Provides a layer manager to interactively control layer visibility for a WorldWindow.
     * @param {WorldWindow} worldWindow The WorldWindow to associated this layer manager with.
     */
    var LayerManager = function (worldWindow) {
        var thisExplorer = this;
        this.wwd = worldWindow;

        this.roundGlobe = this.wwd.globe;

        this.createProjectionList();
        $("#projectionDropdown").find(" li").on("click", function (e) {
            thisExplorer.onProjectionClick(e);
        });

        this.synchronizeLayerList();

        $("#searchBox").find("button").on("click", function (e) {
            thisExplorer.onSearchButton(e);
        });

        this.geocoder = new WorldWind.NominatimGeocoder();
        this.goToAnimator = new WorldWind.GoToAnimator(this.wwd);
        $("#searchText").on("keypress", function (e) {
            thisExplorer.onSearchTextKeyPress($(this), e);
        });
		/*$("#searchText_01").on("keypress", function (e) {
            thisExplorer.onSearchTextKeyPress_01($(this), e);
        });
		$("#searchText_02").on("keypress", function (e) {
            thisExplorer.onSearchTextKeyPress_02($(this), e);
        });*/

        //
        //this.wwd.redrawCallbacks.push(function (worldWindow, stage) {
        //    if (stage == WorldWind.AFTER_REDRAW) {
        //        thisExplorer.updateVisibilityState(worldWindow);
        //    }
        //});
    };

    LayerManager.prototype.onProjectionClick = function (event) {
        var projectionName = event.target.innerText || event.target.innerHTML;
        $("#projectionDropdown").find("button").html(projectionName + ' <span class="caret"></span>');

        if (projectionName === "三维") {
            if (!this.roundGlobe) {
                this.roundGlobe = new WorldWind.Globe(new WorldWind.EarthElevationModel());
            }

            if (this.wwd.globe !== this.roundGlobe) {
                this.wwd.globe = this.roundGlobe;
            }
        } else {
            if (!this.flatGlobe) {
                this.flatGlobe = new WorldWind.Globe2D();
            }

            if (projectionName === "球面投影") {
                this.flatGlobe.projection = new WorldWind.ProjectionEquirectangular();
            } else if (projectionName === "墨卡托投影") {
                this.flatGlobe.projection = new WorldWind.ProjectionMercator();
            } else if (projectionName === "北极") {
                this.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("North");
            } else if (projectionName === "南极") {
                this.flatGlobe.projection = new WorldWind.ProjectionPolarEquidistant("South");
            } else if (projectionName === "UPS北") {
                this.flatGlobe.projection = new WorldWind.ProjectionUPS("North");
            } else if (projectionName === "UPS南") {
                this.flatGlobe.projection = new WorldWind.ProjectionUPS("South");
            } else if (projectionName === "北极切面") {
                this.flatGlobe.projection = new WorldWind.ProjectionGnomonic("North");
            } else if (projectionName === "南极切面") {
                this.flatGlobe.projection = new WorldWind.ProjectionGnomonic("South");
            }

            if (this.wwd.globe !== this.flatGlobe) {
                this.wwd.globe = this.flatGlobe;
            }
        }

        this.wwd.redraw();
    };

    LayerManager.prototype.onLayerClick = function (layerButton) {
        var layerName = layerButton.text();

        // Update the layer state for the selected layer.
        for (var i = 0, len = this.wwd.layers.length; i < len; i++) {
            var layer = this.wwd.layers[i];
            if (layer.hide) {
                continue;
            }

            if (layer.displayName === layerName) {
                layer.enabled = !layer.enabled;
                if (layer.enabled) {
                    layerButton.addClass("active");
                } else {
                    layerButton.removeClass("active");
                }
                this.wwd.redraw();
                break;
            }
        }
    };

    LayerManager.prototype.synchronizeLayerList = function () {
        var layerListItem = $("#layerList");

        layerListItem.find("button").off("click");
        layerListItem.find("button").remove();

        // Synchronize the displayed layer list with the WorldWindow's layer list.
        for (var i = 0, len = this.wwd.layers.length; i < len; i++) {
            var layer = this.wwd.layers[i];
            if (layer.hide) {
                continue;
            }
            var layerItem = $('<button class="list-group-item btn btn-block">' + layer.displayName + '</button>');
			if(layer.displayName=="模拟动画"){
				layerItem=$('<button class="list-group-item btn btn-block" id="cjc_MoNiDongHua_button">' + layer.displayName + '</button>');
			}
            layerListItem.append(layerItem);

            if (layer.showSpinner && Spinner) {
                var opts = {
                    scale: 0.9,
                };
                var spinner = new Spinner(opts).spin();
                layerItem.append(spinner.el);
            }

            if (layer.enabled) {
                layerItem.addClass("active");
            } else {
                layerItem.removeClass("active");
            }
        }

        var self = this;
        layerListItem.find("button").on("click", function (e) {
            self.onLayerClick($(this));
        });
    };
    //
    //LayerManager.prototype.updateVisibilityState = function (worldWindow) {
    //    var layerButtons = $("#layerList").find("button"),
    //        layers = worldWindow.layers;
    //
    //    for (var i = 0; i < layers.length; i++) {
    //        var layer = layers[i];
    //        for (var j = 0; j < layerButtons.length; j++) {
    //            var button = layerButtons[j];
    //
    //            if (layer.displayName === button.innerText) {
    //                if (layer.inCurrentFrame) {
    //                    button.innerHTML = "<em>" + layer.displayName + "</em>";
    //                } else {
    //                    button.innerHTML = layer.displayName;
    //                }
    //            }
    //        }
    //    }
    //};

    LayerManager.prototype.createProjectionList = function () {
        var projectionNames = [
            "三维",
            "球面投影",
            "墨卡托投影",
            "北极",
            "南极",
            "UPS北",
            "UPS南",
            "北极切面",
            "南极切面"
        ];
        var projectionDropdown = $("#projectionDropdown");

        var dropdownButton = $('<button class="btn btn-info btn-block dropdown-toggle" type="button" data-toggle="dropdown">三维<span class="caret"></span></button>');
        projectionDropdown.append(dropdownButton);

        var ulItem = $('<ul class="dropdown-menu">');
        projectionDropdown.append(ulItem);

        for (var i = 0; i < projectionNames.length; i++) {
            var projectionItem = $('<li><a >' + projectionNames[i] + '</a></li>');
            ulItem.append(projectionItem);
        }

        ulItem = $('</ul>');
        projectionDropdown.append(ulItem);
    };

    LayerManager.prototype.onSearchButton = function (event) {
        this.performSearch($("#searchText")[0].value)
    };

    LayerManager.prototype.onSearchTextKeyPress = function (searchInput, event) {
        if (event.keyCode === 13) {
            searchInput.blur();
            this.performSearch($("#searchText")[0].value)
        }
    };
	//cjc模仿
	/*LayerManager.prototype.onSearchTextKeyPress_01 = function (searchInput, event) {
        if (event.keyCode == 13) {			
			if(document.getElementById("searchText_02").value){
				if(!searchLat_01){
				this.cjcGetPo_01(document.getElementById("searchText_01").value);
				}
				if(!searchLat_02){			
				this.cjcGetPo_02(document.getElementById("searchText_02").value);
				}
				var pathPositions=[];
				pathPositions.push(new WorldWind.Position(searchLat_01, searchLon_01, 1e4));
				pathPositions.push(new WorldWind.Position(searchLat_02, searchLon_02, 1e4));
				//将鼠标点击事件获取到的坐标传入坐标数组当中
				var path = new WorldWind.Path(pathPositions, null);//实例化一个路径对象
				path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
				path.followTerrain = true;
				path.extrude = true; // make it a curtain
				path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode

				//路径对象的参数
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

				// 渲染路径对象，并将它添加到worldWind图层中
				var pathsLayer = new WorldWind.RenderableLayer();
				pathsLayer.addRenderable(path);
				wwd.addLayer(pathsLayer);
			}
			this.performSearch($("#searchText_01")[0].value);
        }
    };
	LayerManager.prototype.onSearchTextKeyPress_02 = function (searchInput, event) {
        if (event.keyCode == 13) {           				
			if(document.getElementById("searchText_01").value){
				if(!searchLat_01){
				this.cjcGetPo_01(document.getElementById("searchText_01").value);	
				}
				if(!searchLat_02){
				this.cjcGetPo_02(document.getElementById("searchText_02").value);
				}
				var pathPositions=[];
				pathPositions.push(new WorldWind.Position(searchLat_01, searchLon_01, 1e4));
				pathPositions.push(new WorldWind.Position(searchLat_02, searchLon_02, 1e4));
				//将鼠标点击事件获取到的坐标传入坐标数组当中
				var path = new WorldWind.Path(pathPositions, null);//实例化一个路径对象
				path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
				path.followTerrain = true;
				path.extrude = true; // make it a curtain
				path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode

				//路径对象的参数
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

				// 渲染路径对象，并将它添加到worldWind图层中
				var pathsLayer = new WorldWind.RenderableLayer();
				pathsLayer.addRenderable(path);
				wwd.addLayer(pathsLayer);
			}
			this.performSearch($("#searchText_02")[0].value);
        }
    };*/

    LayerManager.prototype.performSearch = function (queryString) {
        if (queryString) {
            var thisLayerManager = this,
                latitude, longitude;

            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                var tokens = queryString.split(",");
                latitude = parseFloat(tokens[0]);
                longitude = parseFloat(tokens[1]);
                thisLayerManager.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
            } else {
                this.geocoder.lookup(queryString, function (geocoder, result) {
                    if (result.length > 0) {
                        latitude = parseFloat(result[0].lat);
                        longitude = parseFloat(result[0].lon);

                        WorldWind.Logger.log(
                            WorldWind.Logger.LEVEL_INFO, queryString + ": " + latitude + ", " + longitude);

                        thisLayerManager.goToAnimator.goTo(new WorldWind.Location(latitude, longitude));
                    }
                });
            }
        }
    };
	/*LayerManager.prototype.cjcGetPo_01 = function (queryString) {
        if (queryString) {
            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                var tokens = queryString.split(",");
                searchLat_01 = parseFloat(tokens[0]);
                searchLon_01 = parseFloat(tokens[1]);
				console.log("1_1_"+searchLat_01);
            } else {
                this.geocoder.lookup(queryString, function (geocoder, result) {
                    if (result.length > 0) {
                        searchLat_01 = parseFloat(result[0].lat);
                        searchLon_01 = parseFloat(result[0].lon);
                    }
                });
				console.log("1_2_"+searchLat_01);
            }
        }
    };
	LayerManager.prototype.cjcGetPo_02 = function (queryString) {
        if (queryString) {
            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                var tokens = queryString.split(",");
                searchLat_02 = parseFloat(tokens[0]);
                searchLon_02 = parseFloat(tokens[1]);
				console.log("2_1_"+searchLat_02);
            } else {
				var geocoder = new WorldWind.NominatimGeocoder();
                geocoder.lookup(queryString, function (geocoder, result) {
                    if (result.length > 0) {
                        searchLat_02 = parseFloat(result[0].lat);
                        searchLon_02 = parseFloat(result[0].lon);							
                    }
                });
				console.log("2_2_"+searchLat_02+accessToken);
            }
        }
    };*/

    return LayerManager;
});