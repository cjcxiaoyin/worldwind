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

require(['./WorldWindShim', './LayerManager'], function (WorldWind, LayerManager) {
    "use strict";

    WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

    var wwd = new WorldWind.WorldWindow("canvasOne");

    var layers = [
        {layer: new WorldWind.BMNGLayer(), enabled: true},
        {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
        {layer: new WorldWind.BingAerialLayer(null), enabled: false},
        {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: false},
        {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
        {layer: new WorldWind.CompassLayer(), enabled: true},
        {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
        {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
    ];

    for (var l = 0; l < layers.length; l++) {
        layers[l].layer.enabled = layers[l].enabled;
        wwd.addLayer(layers[l].layer);
    }

    var modelLayer = new WorldWind.RenderableLayer("Duck");
    wwd.addLayer(modelLayer);

    var position =new WorldWind.Position(48.86,2.29,500);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/埃菲尔铁塔/'});
	for(var i=1;i<63;i++){
    colladaLoader.load('https://cjcxiaoyin.oss-cn-shanghai.aliyuncs.com/dae/埃菲尔铁塔/埃菲尔铁塔'+i+'.dae', function (scene) {
        scene.scale = 0.1;
		//scene.zTranslation=-100000;
        modelLayer.addRenderable(scene);
    });
	}
/*	for(var i=1;i<16;i++){
		//var path="https://cjcxiaoyin.oss-cn-shanghai.aliyuncs.com/dae/埃菲尔铁塔/埃菲尔铁塔"+i+".dae";
	colladaLoader.load("https://cjcxiaoyin.oss-cn-shanghai.aliyuncs.com/dae/埃菲尔铁塔/埃菲尔铁塔"+i+".dae", function (scene) {
        scene.scale = 400;
		scene.zTranslation=-12000;
        modelLayer.addRenderable(scene);
    });
	}	
*/
    new LayerManager(wwd);
wwd.goTo(new WorldWind.Position(48.86, 2.29, 500));
//wwd.goTo(position);
});
