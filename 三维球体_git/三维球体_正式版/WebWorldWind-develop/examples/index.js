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
		var canvas=document.getElementById("canvasOne");//读取canvas画布
        var wwd;//实例化一个世界风对象
		var cjc_location;
		var annotationsLayer=[];
		var layerCount=0;
		var placemarkLayer=[];
		var layerCount_01=0;
		var layerCount_02=0;
		var layerCount_03=0;
		var clickRecognizer_cjc;
		var pathPositions = [];
		var shapePositions=[];//存储图形点位信息的数组
		var pathsLayer=[];//存储路径图层的数组
		var shapeLayer=[];
		var starPush=false;
		var isNeedstop=false;
		var isStaraddshapes=false;
		var shapeFinish=false;
		var shapesLayer;//实例化一个图形图层全局变量
		var is_cjc_button_01_enable=false;//初始化按钮的状态是非选中的
		var is_cjc_button_02_enable=false;//这一组是控制二维图层的按钮
		var is_cjc_button_03_enable=false;
		var is_cjc_button_04_enable=false;
		var is_cjc_button_05_enable=false;
		var is_cjc_button_06_enable=false;
		var is_cjc_button_07_enable=false;
		var is_cjc_button_08_enable=false;
		var is_cjc_button_09_enable=false;
		var is_cjc_button_10_enable=false;
		var is_cjc_button_11_enable=false;
		var is_cjc_button_12_enable=false;
		var is_cjc_button_13_enable=false;
		var is_cjc_button_14_enable=false;
		var is_cjc_button_15_enable=false;
		var is_cjc_button_16_enable=false;
		var is_cjc_button_17_enable=false;
		var is_cjc_button_18_enable=false;
		var is_cjc_button_19_enable=false;
		var is_cjc_button_20_enable=false;
		var is_cjc_button_21_enable=false;
		var is_cjc_button_22_enable=false;
		
		var is_cjc_a_button_1_enable=false;//初始化按钮的状态是非选中的
		var is_cjc_a_button_2_enable=false;//这一组是控制三维模型的按钮
		var is_cjc_a_button_3_enable=false;
		var is_cjc_a_button_4_enable=false;
		var is_cjc_a_button_5_enable=false;
		var is_cjc_a_button_6_enable=false;
		var is_cjc_a_button_7_enable=false;
		
		var is_cjc_b_button_1_enable=false;//初始化按钮的状态是非选中的
		var is_cjc_b_button_2_enable=false;//这一组是控制视角的按钮
		var worldLayer;
		var worldLabelsLayer;
		var serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
		//var layerName = "MOD_LSTD_CLIM_M";
		var layerName =[];
		layerName[0]="MOD_LSTD_CLIM_M";//气候区划
		layerName[1]="MOD14A1_M_FIRE";//火灾地区
		layerName[2]="MODAL2_M_AER_RA";//气溶胶监测
		layerName[3]="MCD43C3_M_BSA";//地物反射率
		layerName[4]="AVHRR_CLIM_M";//海洋温度
		layerName[5]="GEBCO_BATHY";//海洋深度
		layerName[6]="MOP_CO_M";//一氧化碳浓度
		layerName[7]="MY1DMM_CHLORA";//海洋浮游植物
		layerName[8]="MODAL2_M_CLD_FR";//云层厚度
		layerName[9]="TRMM_3B43M";//降雨量
		layerName[10]="MCD12C1_T1";//土地覆盖分类
		layerName[11]="MOD15A2_M_LAI";//植被覆盖
		layerName[12]="AURA_NO2_M";//二氧化氮浓度
		layerName[13]="CERES_LWFLUX_M";//向外长波辐射
		layerName[14]="AURA_OZONE_M";//臭氧含量
		layerName[15]="SEDAC_POP";//世界人口
		layerName[16]="AQUARIUS_SSS_M";//海水盐度
		layerName[17]="CERES_INSOL_M";//太阳辐射量
		layerName[18]="SRTM_RAMP2_TOPO";//世界地貌
		layerName[19]="AURA_UVI_CLIM_M";//紫外线指数
		layerName[20]="MODAL2_M_SKY_WV";//水蒸气含量
		var wmsLayer=[];
		var currentButton;
		var currentButton_1;
		var currentButton_2;
		var currentLayer;
		var screenImage1;
		var screenImageLayer;
		var modelLayer;
		var feiXingMoNi;
		
		var screenText;//模拟动画的文字
		var textAttributes;//模拟动画的文字属性
		var textLayer;//模拟动画的文字图层
		
		var accessToken = "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NDg1bDA1cjYzM280NHJ5NzlvNDMifQ.d6e-nNyBDtmQCVwVNivz7A#15/34.0610/119.7600";
		var map = new AMap.Map('GaoDeMap', {});
		


//shart requirejs;		
 requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";
		
		
//实例化worldWind		
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_NONE);
        wwd = new WorldWind.WorldWindow("canvasOne");
		wwd.goTo(new WorldWind.Position(39.92, 116.37, 2e7));//设置worldWind的初始地址
		
		
        var layers = [
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            {layer: new WorldWind.BingRoadsLayer(null), enabled: false},
			{layer: new WorldWind.DigitalGlobeTiledImageLayer("卫星图", "mapbox.streets-satellite", accessToken),enabled: false},
			{layer: new WorldWind.DigitalGlobeTiledImageLayer("等高线", "mapbox.outdoors", accessToken),enabled: false},
			{layer: new WorldWind.DigitalGlobeTiledImageLayer("剪纸艺术", "mapbox.wheatpaste", accessToken),enabled: false},
			{layer: new WorldWind.DigitalGlobeTiledImageLayer("漫画风格", "mapbox.comic", accessToken),enabled: false},
			{layer: new WorldWind.DigitalGlobeTiledImageLayer("航海探险", "mapbox.pirates", accessToken),enabled: false},
			{layer: new WorldWind.DigitalGlobeTiledImageLayer("铅笔手绘", "mapbox.pencil", accessToken),enabled: false},
			{layer: new WorldWind.DigitalGlobeTiledImageLayer("经典图层", "mapbox.streets-basic", accessToken),enabled: false},
            {layer: new WorldWind.DigitalGlobeTiledImageLayer("数字化地图", "mapbox.streets", accessToken),enabled: false},
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];//添加图层

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }
		//模拟动画图层
		var blueMarbleTimeSeries = new WorldWind.BMNGRestLayer("https://worldwind32.arc.nasa.gov/standalonedata/Earth/BlueMarble256");
        blueMarbleTimeSeries.enabled = false;
        blueMarbleTimeSeries.showSpinner = true;
        wwd.addLayer(blueMarbleTimeSeries);
		//星空图层
		var starFieldLayer = new WorldWind.StarFieldLayer();
		wwd.addLayer(starFieldLayer);
		// 大气层的图层
		var atmosphereLayer = new WorldWind.AtmosphereLayer();
		atmosphereLayer.enabled=false;
        wwd.addLayer(atmosphereLayer);
		//实例化一个图层管理器
        var layerManager = new LayerManager(wwd);
		
		//屏幕文字图层
		textLayer= new WorldWind.RenderableLayer("Screen Text");	
		screenText = new WorldWind.ScreenText(new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0, WorldWind.OFFSET_FRACTION, 1), " ");
        textAttributes = new WorldWind.TextAttributes(textAttributes);
        textAttributes.offset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 0, WorldWind.OFFSET_FRACTION, 1);
        screenText.attributes = textAttributes;
		textLayer.hide=true;
		textLayer.addRenderable(screenText);
		
		
		//鼠标单击事件，并且与鼠标长按事件区分开来
		 var handleClick = function (recognizer) {
            var x = recognizer.clientX,
                y = recognizer.clientY;//获取单击位置在屏幕的坐标
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));//将获取到的坐标转化为worldWind的坐标
			if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
                var position = pickList.objects[0].position;
                wwd.goTo(new WorldWind.Location(position.latitude, position.longitude));
				cjc_location=new WorldWind.Location(position.latitude, position.longitude);	
            }
			if(starPush){//开始画路径的事件
				pathPositions.push(new WorldWind.Position(cjc_location.latitude, cjc_location.longitude, 1e4));
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
				pathsLayer[layerCount_02] = new WorldWind.RenderableLayer();
				pathsLayer[layerCount_02].addRenderable(path);
				wwd.addLayer(pathsLayer[layerCount_02]);
				layerCount_02++;
				isNeedstop=true;
			}
			if(isStaraddshapes){//开始画图形事件
				shapePositions.push(new WorldWind.Position(cjc_location.latitude, cjc_location.longitude, 1e4));
				var path = new WorldWind.Path(shapePositions, null);//实例化一个路径对象
				path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
				path.followTerrain = true;
				path.extrude = true; // make it a curtain
				path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode

				// 路径对象的参数
				var pathAttributes = new WorldWind.ShapeAttributes(null);
				pathAttributes.outlineColor = WorldWind.Color.YELLOW;
				pathAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);
				pathAttributes.drawVerticals = path.extrude; // draw verticals only when extruding
				path.attributes = pathAttributes;

				// Create and assign the path's highlight attributes.
				var highlightAttributes = new WorldWind.ShapeAttributes(pathAttributes);
				highlightAttributes.outlineColor = WorldWind.Color.RED;
				highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 0.5);
				path.highlightAttributes = highlightAttributes;

				//将路径对象转化为图形对象，渲染图形对象，并将它添加到worldWind图层当中去
				shapeLayer[layerCount_03] = new WorldWind.RenderableLayer();
				shapeLayer[layerCount_03].addRenderable(path);
				wwd.addLayer(shapeLayer[layerCount_03]);
				layerCount_03++;
				shapeFinish=true;
				isNeedstop=true;
			}
        };

		
        // 事件监听
        var clickRecognizer = new WorldWind.ClickRecognizer(wwd, handleClick);
        var tapRecognizer = new WorldWind.TapRecognizer(wwd, handleClick);
		
		var sunSimulationCheckBox = document.getElementById('sun-simulation');
        var sunInterval = 0;
        var timeStamp = Date.now();
		//var date = new Date();
		//starFieldLayer.time = date;
        //atmosphereLayer.time = date;
        sunSimulationCheckBox.addEventListener("click", onSunCheckBoxClick);
		wwd.addEventListener("contextmenu",isNeedstop_cjc);
		$("#searchText_01").keydown(function(e){			
            if(e.keyCode==13){
				cjcGetPo_01(document.getElementById("searchText_01").value);
			cjcPerformSearch($("#searchText_01")[0].value);
			}
        });
		$("#searchText_02").on("keypress", function (e) {
            if(e.keyCode==13){
				cjcGetPo_02(document.getElementById("searchText_02").value);
			cjcPerformSearch($("#searchText_02")[0].value);
			}
        });
		
		GunDong();
		changess();
		$(window).resize(function(){
			changess();
		});
		
		function isNeedstop_cjc(){
			if(isNeedstop){
				starPush=false;
				isNeedstop=false;
				isStaraddshapes=false;
			}
			if(shapeFinish){
				shapesLayer = new WorldWind.RenderableLayer("Surface Shapes");
				wwd.addLayer(shapesLayer);
				var attributes = new WorldWind.ShapeAttributes(null);
				attributes.outlineColor = WorldWind.Color.BLUE;
				attributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.5);

				var highlightAttributes = new WorldWind.ShapeAttributes(attributes);
				highlightAttributes.interiorColor = new WorldWind.Color(1, 1, 1, 1);

				var shape = new WorldWind.SurfacePolygon(shapePositions, attributes);
				shape.highlightAttributes = highlightAttributes;
				shapesLayer.addRenderable(shape);
				shapeFinish=false;
			}
		}
		
        function onSunCheckBoxClick() {
            if (document.getElementById('sun-simulation').className=="list-group-item btn btn-block") {
                runSunSimulation();
				document.getElementById('sun-simulation').className="list-group-item btn btn-block active";
            }
            else {
                atmosphereLayer.time = null;
               // clearInterval(sunInterval);
                wwd.redraw();
				document.getElementById('sun-simulation').className="list-group-item btn btn-block";
            }
        }

        function runSunSimulation() {
            //sunInterval = setInterval(function () {
                //timeStamp += 180 * 1000;
				var date = new Date(timeStamp);
                starFieldLayer.time = date;
                atmosphereLayer.time = date;
                //atmosphereLayer.time = new Date(timeStamp);
                wwd.redraw();
            //}, 64);
        }


		
//控制二维图层的按钮**start**
var shapefileLibrary = "https://worldwind.arc.nasa.gov/web/examples/data/shapefiles/naturalearth";
worldLayer = new WorldWind.RenderableLayer("Countries");
worldLabelsLayer = new WorldWind.RenderableLayer("Country Labels");
var worldShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_110m_admin_0_countries/ne_110m_admin_0_countries.shp");
worldShapefile.load(null, defaultAttributeCallback(worldLabelsLayer), worldLayer);
var worldBordersShapefile = new WorldWind.Shapefile(shapefileLibrary + "/ne_110m_admin_0_boundary_lines_land/ne_110m_admin_0_boundary_lines_land.shp");
worldBordersShapefile.load(null, defaultAttributeCallback(null), worldLayer);

document.getElementById("cjc_button_01").onclick=function(){
	if(!is_cjc_button_01_enable){
		cancelAllTools();
		$("#cjc_button_01").addClass("active");
		is_cjc_button_01_enable=true;
         wwd.addLayer(worldLayer);
        wwd.addLayer(worldLabelsLayer);
		currentButton="#cjc_button_01";
		//currentLayer=worldLabelsLayer;
	}else{
		wwd.removeLayer(worldLayer);
		wwd.removeLayer(worldLabelsLayer);
		$("#cjc_button_01").removeClass("active");
		is_cjc_button_01_enable=false;
	}
}

document.getElementById("cjc_button_02").onclick=function(){
	if(!is_cjc_button_02_enable){
		cancelAllTools();
		$("#cjc_button_02").addClass("active");
		is_cjc_button_02_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[0]);
		currentButton="#cjc_button_02";
		currentLayer=wmsLayer[0];
		cjcAddTuLi("cjc_data/气候区划/modis_lst.png");
	}else{
		wwd.removeLayer(wmsLayer[0]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_02").removeClass("active");
		is_cjc_button_02_enable=false;
	}
}
document.getElementById("cjc_button_03").onclick=function(){
	if(!is_cjc_button_03_enable){
		cancelAllTools();
		$("#cjc_button_03").addClass("active");
		is_cjc_button_03_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[1]);
		cjcAddTuLi("cjc_data/火灾地区/modis_fire_l3.png");
		currentButton="#cjc_button_03";
		currentLayer=wmsLayer[1];
	}else{
		wwd.removeLayer(wmsLayer[1]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_03").removeClass("active");
		is_cjc_button_03_enable=false;
	}
}
document.getElementById("cjc_button_04").onclick=function(){
	if(!is_cjc_button_04_enable){
		cancelAllTools();
		$("#cjc_button_04").addClass("active");
		is_cjc_button_04_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[2]);
		cjcAddTuLi("cjc_data/气溶胶监测/modis_aer_ra.png");
		currentButton="#cjc_button_04";
		currentLayer=wmsLayer[2];
	}else{
		wwd.removeLayer(wmsLayer[2]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_04").removeClass("active");
		is_cjc_button_04_enable=false;
	}
}
document.getElementById("cjc_button_05").onclick=function(){
	if(!is_cjc_button_05_enable){
		cancelAllTools();
		$("#cjc_button_05").addClass("active");
		is_cjc_button_05_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[3]);
		cjcAddTuLi("cjc_data/地物反射率/modis_bs_albedo.png");
		currentButton="#cjc_button_05";
		currentLayer=wmsLayer[3];
	}else{
		wwd.removeLayer(wmsLayer[3]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_05").removeClass("active");
		is_cjc_button_05_enable=false;
	}
}		
document.getElementById("cjc_button_06").onclick=function(){
	if(!is_cjc_button_06_enable){
		cancelAllTools();
		$("#cjc_button_06").addClass("active");
		is_cjc_button_06_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[4]);
		cjcAddTuLi("cjc_data/海洋温度/sst_35.png");
		currentButton="#cjc_button_06";
		currentLayer=wmsLayer[4];
	}else{
		wwd.removeLayer(wmsLayer[4]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_06").removeClass("active");
		is_cjc_button_06_enable=false;
	}
}	
document.getElementById("cjc_button_07").onclick=function(){
	if(!is_cjc_button_07_enable){
		cancelAllTools();
		$("#cjc_button_07").addClass("active");
		is_cjc_button_07_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[5]);
		cjcAddTuLi("cjc_data/海洋深度/gebco_bathymetry.png");
		currentButton="#cjc_button_07";
		currentLayer=wmsLayer[5];
	}else{
		wwd.removeLayer(wmsLayer[5]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_07").removeClass("active");
		is_cjc_button_07_enable=false;
	}
}
document.getElementById("cjc_button_08").onclick=function(){
	if(!is_cjc_button_08_enable){
		cancelAllTools();
		$("#cjc_button_08").addClass("active");
		is_cjc_button_08_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[6]);
		cjcAddTuLi("cjc_data/一氧化碳浓度/mopitt_co.png");
		currentButton="#cjc_button_08";
		currentLayer=wmsLayer[6];
	}else{
		wwd.removeLayer(wmsLayer[6]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_08").removeClass("active");
		is_cjc_button_08_enable=false;
	}
}	
document.getElementById("cjc_button_09").onclick=function(){
	if(!is_cjc_button_09_enable){
		cancelAllTools();
		$("#cjc_button_09").addClass("active");
		is_cjc_button_09_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[7]);
		cjcAddTuLi("cjc_data/海洋浮游植物/modis_chlor.png");
		currentButton="#cjc_button_09";
		currentLayer=wmsLayer[7];
	}else{
		wwd.removeLayer(wmsLayer[7]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_09").removeClass("active");
		is_cjc_button_09_enable=false;
	}
}	
document.getElementById("cjc_button_10").onclick=function(){
	if(!is_cjc_button_10_enable){
		cancelAllTools();
		$("#cjc_button_10").addClass("active");
		is_cjc_button_10_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[8]);
		cjcAddTuLi("cjc_data/云层厚度/modis_cld_fr.png");
		currentButton="#cjc_button_10";
		currentLayer=wmsLayer[8];
	}else{
		wwd.removeLayer(wmsLayer[8]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_10").removeClass("active");
		is_cjc_button_10_enable=false;
	}
}	
document.getElementById("cjc_button_11").onclick=function(){
	if(!is_cjc_button_11_enable){
		cancelAllTools();
		$("#cjc_button_11").addClass("active");
		is_cjc_button_11_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[9]);
		cjcAddTuLi("cjc_data/降雨量/trmm_rainfall_m.png");
		currentButton="#cjc_button_11";
		currentLayer=wmsLayer[9];
	}else{
		wwd.removeLayer(wmsLayer[9]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_11").removeClass("active");
		is_cjc_button_11_enable=false;
	}
}	
document.getElementById("cjc_button_12").onclick=function(){
	if(!is_cjc_button_12_enable){
		cancelAllTools();
		$("#cjc_button_12").addClass("active");
		is_cjc_button_12_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[10]);
		currentButton="#cjc_button_12";
		currentLayer=wmsLayer[10];
	}else{
		wwd.removeLayer(wmsLayer[10]);
		$("#cjc_button_12").removeClass("active");
		is_cjc_button_12_enable=false;
	}
}	
document.getElementById("cjc_button_13").onclick=function(){
	if(!is_cjc_button_13_enable){
		cancelAllTools();
		$("#cjc_button_13").addClass("active");
		is_cjc_button_13_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[11]);
		cjcAddTuLi("cjc_data/植被覆盖/modis_lai.png");
		currentButton="#cjc_button_13";
		currentLayer=wmsLayer[11];
	}else{
		wwd.removeLayer(wmsLayer[11]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_13").removeClass("active");
		is_cjc_button_13_enable=false;
	}
}
document.getElementById("cjc_button_14").onclick=function(){
	if(!is_cjc_button_14_enable){
		cancelAllTools();
		$("#cjc_button_14").addClass("active");
		is_cjc_button_14_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[12]);
		cjcAddTuLi("cjc_data/二氧化氮浓度/omi_no2.png");
		currentButton="#cjc_button_14";
		currentLayer=wmsLayer[12];
	}else{
		wwd.removeLayer(wmsLayer[12]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_14").removeClass("active");
		is_cjc_button_14_enable=false;
	}
}
document.getElementById("cjc_button_15").onclick=function(){
	if(!is_cjc_button_15_enable){
		cancelAllTools();
		$("#cjc_button_15").addClass("active");
		is_cjc_button_15_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[13]);
		cjcAddTuLi("cjc_data/向外长波辐射/ceres_lw.png");
		currentButton="#cjc_button_15";
		currentLayer=wmsLayer[13];
	}else{
		wwd.removeLayer(wmsLayer[13]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_15").removeClass("active");
		is_cjc_button_15_enable=false;
	}
}
document.getElementById("cjc_button_16").onclick=function(){
	if(!is_cjc_button_16_enable){
		cancelAllTools();
		$("#cjc_button_16").addClass("active");
		is_cjc_button_16_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[14]);
		cjcAddTuLi("cjc_data/臭氧含量/omi_ozone_to3.png");
		currentButton="#cjc_button_16";
		currentLayer=wmsLayer[14];
	}else{
		wwd.removeLayer(wmsLayer[14]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_16").removeClass("active");
		is_cjc_button_16_enable=false;
	}
}
document.getElementById("cjc_button_17").onclick=function(){
	if(!is_cjc_button_17_enable){
		cancelAllTools();
		$("#cjc_button_17").addClass("active");
		is_cjc_button_17_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[15]);
		cjcAddTuLi("cjc_data/世界人口/sedac_pop.png");
		currentButton="#cjc_button_17";
		currentLayer=wmsLayer[15];
	}else{
		wwd.removeLayer(wmsLayer[15]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_17").removeClass("active");
		is_cjc_button_17_enable=false;
	}
}
document.getElementById("cjc_button_18").onclick=function(){
	if(!is_cjc_button_18_enable){
		cancelAllTools();
		$("#cjc_button_18").addClass("active");
		is_cjc_button_18_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[16]);
		cjcAddTuLi("cjc_data/海水盐度/aquarius_sss.png");
		currentButton="#cjc_button_18";
		currentLayer=wmsLayer[16];
	}else{
		wwd.removeLayer(wmsLayer[16]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_18").removeClass("active");
		is_cjc_button_18_enable=false;
	}
}
document.getElementById("cjc_button_19").onclick=function(){
	if(!is_cjc_button_19_enable){
		cancelAllTools();
		$("#cjc_button_19").addClass("active");
		is_cjc_button_19_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[17]);
		cjcAddTuLi("cjc_data/太阳辐射量/ceres_insol.png");
		currentButton="#cjc_button_19";
		currentLayer=wmsLayer[17];
	}else{
		wwd.removeLayer(wmsLayer[17]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_19").removeClass("active");
		is_cjc_button_19_enable=false;
	}
}
document.getElementById("cjc_button_20").onclick=function(){
	if(!is_cjc_button_20_enable){
		cancelAllTools();
		$("#cjc_button_20").addClass("active");
		is_cjc_button_20_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[18]);
		cjcAddTuLi("cjc_data/世界地貌/srtm_topography.png");
		currentButton="#cjc_button_20";
		currentLayer=wmsLayer[18];
	}else{
		wwd.removeLayer(wmsLayer[18]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_20").removeClass("active");
		is_cjc_button_20_enable=false;
	}
}
document.getElementById("cjc_button_21").onclick=function(){
	if(!is_cjc_button_21_enable){
		cancelAllTools();
		$("#cjc_button_21").addClass("active");
		is_cjc_button_21_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[19]);
		cjcAddTuLi("cjc_data/紫外线指数/omi_uvi.png");
		currentButton="#cjc_button_21";
		currentLayer=wmsLayer[19];
	}else{
		wwd.removeLayer(wmsLayer[19]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_21").removeClass("active");
		is_cjc_button_21_enable=false;
	}
}
document.getElementById("cjc_button_22").onclick=function(){
	if(!is_cjc_button_22_enable){
		cancelAllTools();
		$("#cjc_button_22").addClass("active");
		is_cjc_button_22_enable=true;
        //$.get(serviceAddress).done(createLayer).fail(logError);
		wwd.addLayer(wmsLayer[20]);
		cjcAddTuLi("cjc_data/水蒸气含量/modis_sky_wv.png");
		currentButton="#cjc_button_22";
		currentLayer=wmsLayer[20];
	}else{
		wwd.removeLayer(wmsLayer[20]);
		wwd.removeLayer(screenImageLayer);
		$("#cjc_button_22").removeClass("active");
		is_cjc_button_22_enable=false;
	}
}
//控制二维图层的按钮**end**



//控制三维模型的按钮**start**
document.getElementById("cjc_a_button_1").onclick=function(){
	if(!is_cjc_a_button_1_enable){
		cancelAllTools_1();
		$("#cjc_a_button_1").addClass("active");
		is_cjc_a_button_1_enable=true;
		currentButton_1="#cjc_a_button_1";
        cjcAddEffier();
	}else{
		cjcRemove();
		
		$("#cjc_a_button_1").removeClass("active");
		is_cjc_a_button_1_enable=false;
	}
}
document.getElementById("cjc_a_button_2").onclick=function(){
	if(!is_cjc_a_button_2_enable){
		cancelAllTools_1();
		$("#cjc_a_button_2").addClass("active");
		is_cjc_a_button_2_enable=true;
		currentButton_1="#cjc_a_button_2";
        cjcAddShui();
	}else{
		cjcRemove();
		
		$("#cjc_a_button_2").removeClass("active");
		is_cjc_a_button_2_enable=false;
	}
}
document.getElementById("cjc_a_button_3").onclick=function(){
	if(!is_cjc_a_button_3_enable){
		cancelAllTools_1();
		$("#cjc_a_button_3").addClass("active");
		is_cjc_a_button_3_enable=true;
		currentButton_1="#cjc_a_button_3";
        cjcAddXiYong();
	}else{
		cjcRemove();
		
		$("#cjc_a_button_3").removeClass("active");
		is_cjc_a_button_3_enable=false;
	}
}
document.getElementById("cjc_a_button_4").onclick=function(){
	if(!is_cjc_a_button_4_enable){
		cancelAllTools_1();
		$("#cjc_a_button_4").addClass("active");
		is_cjc_a_button_4_enable=true;
		currentButton_1="#cjc_a_button_4";
        cjcAddDaBenZhong();
	}else{
		cjcRemove();
		
		$("#cjc_a_button_4").removeClass("active");
		is_cjc_a_button_4_enable=false;
	}
}
document.getElementById("cjc_a_button_5").onclick=function(){
	if(!is_cjc_a_button_5_enable){
		cancelAllTools_1();
		$("#cjc_a_button_5").addClass("active");
		is_cjc_a_button_5_enable=true;
		currentButton_1="#cjc_a_button_5";
        cjcAddZiYou();
	}else{
		cjcRemove();
		
		$("#cjc_a_button_5").removeClass("active");
		is_cjc_a_button_5_enable=false;
	}
}
document.getElementById("cjc_a_button_6").onclick=function(){
	if(!is_cjc_a_button_6_enable){
		cancelAllTools_1();
		$("#cjc_a_button_6").addClass("active");
		is_cjc_a_button_6_enable=true;
		currentButton_1="#cjc_a_button_6";
        cjcAddZhongGuoZun();
	}else{
		cjcRemove();
		
		$("#cjc_a_button_6").removeClass("active");
		is_cjc_a_button_6_enable=false;
	}
}
document.getElementById("cjc_a_button_7").onclick=function(){
	if(!is_cjc_a_button_7_enable){
		cancelAllTools_1();
		$("#cjc_a_button_7").addClass("active");
		is_cjc_a_button_7_enable=true;
		currentButton_1="#cjc_a_button_7";
        cjcAddRenMinYingXiongJiNianBei();
	}else{
		cjcRemove();
		
		$("#cjc_a_button_7").removeClass("active");
		is_cjc_a_button_7_enable=false;
	}
}
//控制三维模型的按钮**end**	





	
	
	
	
	
	
	
	
//控制视角按钮**start**	
document.getElementById("cjc_b_button_1").onclick=function(){
	if(!is_cjc_b_button_1_enable){
		cancelAllTools_2();
		$("#cjc_b_button_1").addClass("active");
		is_cjc_b_button_1_enable=true;
		currentButton_2="#cjc_b_button_1";
        cjcStartFeiXingMoNi();
	}else{
		cjcEndFeiXingMoNi();
		
		$("#cjc_b_button_1").removeClass("active");
		is_cjc_b_button_1_enable=false;
	}
}
document.getElementById("cjc_b_button_2").onclick=function(){
	if(!is_cjc_b_button_2_enable){
		cancelAllTools_2();
		$("#cjc_b_button_2").addClass("active");
		is_cjc_b_button_2_enable=true;
		currentButton_2="#cjc_b_button_2";
        cjcStartDiYiRenCheng();
	}else{
		cjcEndDiYiRenCheng();
		
		$("#cjc_b_button_2").removeClass("active");
		is_cjc_b_button_2_enable=false;
	}
}
//控制视角按钮**end**










//添加三维模型的函数**start**
function cjcAddEffier(){//添加埃菲尔菲尔铁塔
	//倾斜视角
    //wwd.navigator.range = 1400;
    wwd.navigator.tilt = 60;
	
	wwd.surfaceOpacity = 0.5;
	
	modelLayer = new WorldWind.RenderableLayer();
	wwd.addLayer(modelLayer);
	    var position =new WorldWind.Position(48.86,2.295,0);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/埃菲尔铁塔/'});
	for(var i=1;i<94;i++){
    colladaLoader.load('https://yulonggis1.oss-cn-hangzhou.aliyuncs.com/dae/埃菲尔铁塔/埃菲尔铁塔'+i+'.dae', function (scene) {
        scene.scale = 0.05;
		//scene.zTranslation=-500;
		//scene.xRotation=-75;
        modelLayer.addRenderable(scene);
		
		
    });
	}
	wwd.goTo(new WorldWind.Position(48.863, 2.295, 2000));
}	
function cjcAddShui(){//添加水立方
	//倾斜视角
    wwd.navigator.tilt = 60;
	
	wwd.surfaceOpacity = 0.5;
	
	modelLayer = new WorldWind.RenderableLayer();
	wwd.addLayer(modelLayer);
	var position =new WorldWind.Position(39.99,116.384,45);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/水立方/'});
	for(var i=1;i<58;i++){
    colladaLoader.load('https://yulonggis1.oss-cn-hangzhou.aliyuncs.com/dae/水立方/水立方'+i+'.dae', function (scene) {
        scene.scale = 0.05;
		//scene.zTranslation=-500;
		//scene.xRotation=-75;
        modelLayer.addRenderable(scene);
		
		
    });
	}
	wwd.goTo(new WorldWind.Position(39.99, 116.384, 2000));
}
function cjcAddXiYong(){//添加西庸城堡
	//倾斜视角
    wwd.navigator.tilt = 60;
	
	wwd.surfaceOpacity = 0.5;
	
	modelLayer = new WorldWind.RenderableLayer();
	wwd.addLayer(modelLayer);
	var position =new WorldWind.Position(46.415,6.928,400);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/西庸城堡/'});
	for(var i=1;i<732;i++){
    colladaLoader.load('https://yulonggis1.oss-cn-hangzhou.aliyuncs.com/dae/西庸城堡/西庸城堡'+i+'.dae', function (scene) {
        scene.scale = 0.1;
		//scene.zTranslation=-500;
		//scene.xRotation=-75;
        modelLayer.addRenderable(scene);
		
		
    });
	}
	wwd.goTo(new WorldWind.Position(46.42, 6.928, 2000));
}
function cjcAddDaBenZhong(){//添加大本钟
	//倾斜视角
    wwd.navigator.tilt = 60;
	
	wwd.surfaceOpacity = 0.5;
	
	modelLayer = new WorldWind.RenderableLayer();
	wwd.addLayer(modelLayer);
	var position =new WorldWind.Position(51.5008,-0.125,0);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/大本钟/'});
	for(var i=1;i<217;i++){
    colladaLoader.load('https://yulonggis1.oss-cn-hangzhou.aliyuncs.com/dae/大本钟/大本钟'+i+'.dae', function (scene) {
        scene.scale = 0.1;
		//scene.zTranslation=-500;
		//scene.xRotation=-75;
        modelLayer.addRenderable(scene);
		
		
    });
	}
	wwd.goTo(new WorldWind.Position(51.5008, -0.125, 2000));
}
function cjcAddZiYou(){//添加自由女神像
	//倾斜视角
    wwd.navigator.tilt = 60;
	
	wwd.surfaceOpacity = 0.5;
	
	modelLayer = new WorldWind.RenderableLayer();
	wwd.addLayer(modelLayer);
	var position =new WorldWind.Position(40.69,-74.044,0);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/自由女神像/'});
    colladaLoader.load('https://yulonggis1.oss-cn-hangzhou.aliyuncs.com/dae/自由女神像/自由女神像.dae', function (scene) {
        scene.scale = 0.1;
		scene.zTranslation=-1000;
        modelLayer.addRenderable(scene);
		
		
    });
	wwd.goTo(new WorldWind.Position(40.69,-74.044, 2000));
}
function cjcAddZhongGuoZun(){//添加中国尊
	//倾斜视角
    wwd.navigator.tilt = 60;
	
	wwd.surfaceOpacity = 0.5;
	
	modelLayer = new WorldWind.RenderableLayer();
	wwd.addLayer(modelLayer);
	var position =new WorldWind.Position(39.91,116.46,0);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/中国尊/'});
	for(var i=1;i<12;i++){
    colladaLoader.load('https://yulonggis1.oss-cn-hangzhou.aliyuncs.com/dae/中国尊/中国尊'+i+'.dae', function (scene) {
        scene.scale = 0.05;
		//scene.zTranslation=-500;
		//scene.xRotation=-75;
        modelLayer.addRenderable(scene);
		
		
    });
	}
	wwd.goTo(new WorldWind.Position(39.91,116.46, 2000));
}
function cjcAddRenMinYingXiongJiNianBei(){//添加人民英雄纪念碑
	//倾斜视角
    wwd.navigator.tilt = 60;
	
	wwd.surfaceOpacity = 0.5;
	
	modelLayer = new WorldWind.RenderableLayer();
	wwd.addLayer(modelLayer);
	var position =new WorldWind.Position(39.9025,116.3905,45);
    var colladaLoader = new WorldWind.ColladaLoader(position);
    colladaLoader.init({dirPath: './data/dae/人民英雄纪念碑/'});
	for(var i=1;i<228;i++){
    colladaLoader.load('https://yulonggis1.oss-cn-hangzhou.aliyuncs.com/dae/人民英雄纪念碑/人民英雄纪念碑'+i+'.dae', function (scene) {
        scene.scale = 0.1;
		//scene.zTranslation=-500;
		//scene.xRotation=-75;
        modelLayer.addRenderable(scene);
		
		
    });
	}
	wwd.goTo(new WorldWind.Position(39.9025,116.3905, 2000));
}
//添加三维模型的函数**end**

//添加视角动画的函数**start**
function cjcStartFeiXingMoNi(){
	wwd.navigator.tilt = 60;
	var deg=Math.floor(Math.random()*360*0.017453293);
	var countuu=0;
	var aRandom=Math.random()*30+20;
	var bRandom=Math.random()*50+80;
	//console.log(aRandom+"      "+bRandom);
	wwd.goTo(new WorldWind.Position(aRandom,bRandom, 10000));
	feiXingMoNi=setInterval(FeiXingMoNi,50);
	function FeiXingMoNi(){
		
		countuu++;
		aRandom+=0.0001*Math.sin(deg);
		bRandom+=0.0001*Math.cos(deg);
		wwd.goTo(new WorldWind.Position(aRandom,bRandom, 16000));
		if(countuu==1000){
			countuu=0;
		deg=Math.floor(Math.random()*360*0.017453293);
		}
		//a++;
		//console.log("ok"+a);
	}
}
function cjcStartDiYiRenCheng(){
	wwd.navigator.tilt = 60;

	var cjc_6_3_latitude=wwd.navigator.lookAtLocation.latitude;
	var cjc_6_3_longitude=wwd.navigator.lookAtLocation.longitude;
	wwd.goTo(new WorldWind.Position(cjc_6_3_latitude,cjc_6_3_longitude, 10000));
}
//添加视角动画的函数**end**





//模拟动画实现函数
var prePopulateInterval = window.setInterval(function () {
    if (!this.prePopulate) {
		blueMarbleTimeSeries.prePopulate(wwd);
		this.prePopulate = true;
		return;
    }
    if (blueMarbleTimeSeries.isPrePopulated(wwd)) {
        blueMarbleTimeSeries.showSpinner = false;
        window.clearInterval(prePopulateInterval);
        layerManager.synchronizeLayerList();				
        $(document).ready(function () {  
			var cjc_layerListItem =document.getElementById("cjc_MoNiDongHua_button");
			cjc_layerListItem.addEventListener("click",function(e){
				if(blueMarbleTimeSeries.enabled){
					wwd.addLayer(textLayer);
				}else{
					wwd.removeLayer(textLayer);
				}
			});
		});
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
//end requirejs;


function cjcRemove(){
	wwd.removeLayer(modelLayer);	
    wwd.navigator.tilt = 0;	
	wwd.surfaceOpacity = 1;
	wwd.goTo(new WorldWind.Position(39.92, 116.37, 2e7));
}
function cjcEndFeiXingMoNi(){
	wwd.navigator.tilt = 0;	
	window.clearInterval(feiXingMoNi);
	wwd.goTo(new WorldWind.Position(39.92, 116.37, 2e7));
}
function cjcEndDiYiRenCheng(){
	wwd.navigator.tilt = 0;	
	wwd.goTo(new WorldWind.Position(39.92, 116.37, 2e7));
}
	function addZhushi(){//添加注释
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
		$("#cjc_4_24_panel").css("display","block");
		//document.getElementById("annotationList").style.display="inline";
	}
	function hideMainview_layer_cancel(){
		$("#cjc_4_24_panel").css("display","none");
		//document.getElementById("annotationList").style.display="none";
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
	function quanFu(){
		wwd.goTo(new WorldWind.Position(39.92, 116.37, 20000000));
	}
	function shuaXin(){
		window.location.reload();
	}
	function addShapes_cjc(){
		isStaraddshapes=true;
	}
	function removeShapes_cjc(){
		wwd.removeLayer(shapesLayer);
		for(var i=0;i<layerCount_03;i++){
			wwd.removeLayer(shapeLayer[i]);
		}
		shapeLayer=[];
		layerCount_03=0;
		shapePositions=[];
	}
	/*function ipDingwei(){	
		if (navigator.geolocation)
		{
			//alert("nono");
			navigator.geolocation.getCurrentPosition(showPosition);
			//alert("ok");
		}
		else{
			alert("Geolocation is not supported by this browser.");
		}
		function showPosition(position)
		{
		//	alert("nono");
			//alert("Latitude: " + position.coords.latitude +"Longitude: " + position.coords.longitude);
			wwd.goTo(new WorldWind.Position(position.coords.latitude, position.coords.longitude, 2000));
		}	
	}*/
	function cjcKeHuDingWei(){
		  map.plugin('AMap.Geolocation', function() {
			geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				showButton:false,
				zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			});
			//map.addControl(geolocation);
			
			//wwd.goTo(new WorldWind.Position(geolocation));
			geolocation.getCurrentPosition();
			//console.log(geolocation[0]);
			AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
			AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		});
		//解析定位结果
		function onComplete(data) {
			console.log("定位成功");
			console.log(data.position.lat+"   "+data.position.lng);
			wwd.goTo(new WorldWind.Position(data.position.lat,data.position.lng,2000));
		}
		//解析定位错误信息
		function onError(data) {
			console.log("定位失败");
		}
	}
	
	function jiePing(){
		window.print();
	}
$.fn.scrollUnique = function() {
    return $(this).each(function() {
        var eventType = 'mousewheel';
        // 火狐是DOMMouseScroll事件
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0? 0: scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
				changess()
            }        
        });
    });	
};
function GunDong(){
$(".span2").css({"overflow":"auto"});
	 $(".span2").css("height",window.innerHeight+"px");
	$(".span2").scrollUnique();
 $(document.body).css({
   "overflow-x":"hidden",
   "overflow-y":"hidden"
 });
}
function changess(){
	$(".span2").css("height",window.innerHeight+"px");
}
function cancelAllTools_1(){
	$(currentButton_1).removeClass("active");
	is_cjc_a_button_1_enable=false;
	is_cjc_a_button_2_enable=false;
	is_cjc_a_button_3_enable=false;
	is_cjc_a_button_4_enable=false;
	is_cjc_a_button_5_enable=false;
	is_cjc_a_button_6_enable=false;
	is_cjc_a_button_7_enable=false;
	
	//wwd.removeLayer(modelLayer);
	cjcRemove();
}
function cancelAllTools_2(){
	$(currentButton_2).removeClass("active");
	is_cjc_b_button_1_enable=false;
	is_cjc_b_button_2_enable=false;
	
	cjcEndFeiXingMoNi();
	cjcEndDiYiRenCheng();
}
function cancelAllTools(){
	/*$("#cjc_button_01").removeClass("active");
	$("#cjc_button_02").removeClass("active");
	$("#cjc_button_03").removeClass("active");
	$("#cjc_button_04").removeClass("active");
	$("#cjc_button_05").removeClass("active");
	$("#cjc_button_06").removeClass("active");
	$("#cjc_button_07").removeClass("active");
	$("#cjc_button_08").removeClass("active");
	$("#cjc_button_09").removeClass("active");
	$("#cjc_button_10").removeClass("active");
	$("#cjc_button_11").removeClass("active");
	$("#cjc_button_12").removeClass("active");
	$("#cjc_button_13").removeClass("active");*/
	$(currentButton).removeClass("active");
	is_cjc_button_01_enable=false;
	is_cjc_button_02_enable=false;
	is_cjc_button_03_enable=false;
	is_cjc_button_04_enable=false;
	is_cjc_button_05_enable=false;
	is_cjc_button_06_enable=false;
	is_cjc_button_07_enable=false;
	is_cjc_button_08_enable=false;
	is_cjc_button_09_enable=false;
	is_cjc_button_10_enable=false;
	is_cjc_button_11_enable=false;
	is_cjc_button_12_enable=false;
	is_cjc_button_13_enable=false;
	is_cjc_button_14_enable=false;
	is_cjc_button_15_enable=false;
	is_cjc_button_16_enable=false;
	is_cjc_button_17_enable=false;
	is_cjc_button_18_enable=false;
	is_cjc_button_19_enable=false;
	is_cjc_button_20_enable=false;
	is_cjc_button_21_enable=false;
	is_cjc_button_22_enable=false;

	
	
	wwd.removeLayer(currentLayer);
	wwd.removeLayer(worldLayer);
	wwd.removeLayer(worldLabelsLayer);
	wwd.removeLayer(screenImageLayer);
/*	for(var i=0;i<wmsLayer.length;i++){
		wwd.removeLayer(wmsLayer[i]);
	}*/
	/*wwd.removeLayer(wmsLayer[0]);
	wwd.removeLayer(wmsLayer[1]);
	wwd.removeLayer(wmsLayer[2]);
	wwd.removeLayer(wmsLayer[3]);
	wwd.removeLayer(wmsLayer[4]);
	wwd.removeLayer(wmsLayer[5]);
	wwd.removeLayer(wmsLayer[6]);
	wwd.removeLayer(wmsLayer[7]);
	wwd.removeLayer(wmsLayer[8]);
	wwd.removeLayer(wmsLayer[9]);
	wwd.removeLayer(wmsLayer[10]);*/
}
var addLabelForName = function (attributes, record, layer) {
     var name = attributes.values.name || attributes.values.Name || attributes.values.NAME;
     if (!!name) {
         var bounds = record.boundingRectangle;
         var position = new WorldWind.Position(
             0.5 * (bounds[0] + bounds[1]),
             0.5 * (bounds[2] + bounds[3]),
             100);
         var namePlacemark = new WorldWind.Placemark(position);
         namePlacemark.label = name;
         namePlacemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
         layer.addRenderable(namePlacemark);
     }
};
var defaultAttributeCallback = function (layer) {
    return function (attributes, record) {
    if (!!layer) {
       addLabelForName(attributes, record, layer);
    }
    if (record.isPolylineType()) {
       var pathAttributes = new WorldWind.ShapeAttributes(null);
            pathAttributes.drawVerticals = true;
            pathAttributes.outlineColor = WorldWind.Color.RED;
            return {attributes: pathAttributes};
    }
    else if (record.isPolygonType()) {
       var polygonAttributes = new WorldWind.ShapeAttributes(null);
       var interiorColor = new WorldWind.Color(
            0.375 + 0.5 * Math.random(),
            0.375 + 0.5 * Math.random(),
            0.375 + 0.5 * Math.random(),
            1.0);
       polygonAttributes.interiorColor = interiorColor;
       polygonAttributes.outlineColor = new WorldWind.Color(
            0.5 * interiorColor.red,
            0.5 * interiorColor.green,
            0.5 * interiorColor.blue,
            1.0);
       return {attributes: polygonAttributes};
    }
    if (record.isPointType()) {
       var currentPlacemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
			return {attributes: currentPlacemarkAttributes};
   }else {
       alert("Invalid record type was encountered!");
       return null;
	}
   }
};
var createLayer = function (xmlDom) {
    var wms = new WorldWind.WmsCapabilities(xmlDom);
	for(var i=0;i<layerName.length;i++){
    var wmsLayerCapabilities = wms.getNamedLayer(layerName[i]);
    var wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    wmsConfig.title = "Average Surface Temp";
    var wmsLayerTemp = new WorldWind.WmsLayer(wmsConfig);
	wmsLayer.push(wmsLayerTemp);
	}
};
var logError = function (jqXhr, text, exception) {
    console.log("There was a failure retrieving the capabilities document: " + text + " exception: " + exception);
};
function cjcAddTuLi(url){
	var screenOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 1, WorldWind.OFFSET_FRACTION, 0);
	screenImage1 = new WorldWind.ScreenImage(screenOffset, url);
	screenImage1.imageOffset = new WorldWind.Offset(WorldWind.OFFSET_FRACTION, 1, WorldWind.OFFSET_FRACTION, 0);
	screenImageLayer = new WorldWind.RenderableLayer();
	screenImageLayer.addRenderable(screenImage1);
	wwd.addLayer(screenImageLayer);
}
//Tooltips效果**start**
new jBox('Tooltip', {    
            attach: '#cjc_button_11',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '降雨对地球上的生命至关重要。雨水是植物和动物淡水的主要来源。这些地图显示了世界各地的降雨量。注意，大部分的雨水落在赤道附近。还要注意的是，海洋上的雨水比陆地上的还要多。美国国家航空和宇宙航行局(NASA)的仪器在地球赤道附近的卫星上运行，所以它只测量赤道附近的降雨量，而不是在高纬度地区，也不是在地球的极地地区。'
});
new jBox('Tooltip', {    
            attach: '#cjc_button_20',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '陆地地形使我们能够绘制地球表面特征的地图。地形图显示了山脉、峡谷、河流、甚至火山的火山口等地貌的位置、高度和形状。另一种考虑地形图的方法是，它们是地球表面三维结构的图片。平面地图可以通过使地图的某些部分黑暗和其他部分发光而产生3d效果。这被称为“阴影”，因为它使表面上的特征看起来像是投射阴影。这个地形图是由美国宇航局的航天飞机，加拿大的Radarsat卫星和美国地质勘探局绘制的地形图收集而成的。'
});
new jBox('Tooltip', {    
            attach: '#cjc_button_17',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '这张地图显示了地球上不同地区的人口数量。地图被分成许多小盒子，叫做“网格”。每个方格长约1公里，宽1公里，彩色编码显示有多少人住在那里。较轻的地区人口较少。大多数国家散布的红点显示城市，许多人居住在一个小区域。'
});
new jBox('Tooltip', {    
            attach: '#cjc_button_02',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '如果你想知道某一特定季节的温度是否异常温暖或寒冷，你需要将它们与多年来的平均气温进行比较。这些地图显示了2001年至2010年的平均周或月日间地面温度。'
});
new jBox('Tooltip', {    
            attach: '#cjc_button_06',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '在很长一段时间内平均海面温度被称为海洋表面温度“气候学”。一个地区的气候学是决定气候变化的基准。要做一个气候学数据集，你需要在很长一段时间内进行平均测量。这些数据是由美国国家海洋和大气管理局(NOAA)的卫星于1985年至1997年收集的。观察结果分为5天期。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_button_07',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '在世界海洋的水下，地球的表面并不像玻璃或大碗的底部那样平坦。这里有巨大的山脉和巨大的裂缝，海底正在裂开。水下的火山正在慢慢地形成山脉，可能有一天会在海面上以岛屿的形式上升。由于这些特征，海洋中海水的深度并不相同。水深测量是测量水在不同地方的深度和水下的形状。在这些地图中，不同颜色代表不同的水深。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_button_18',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '这些地图显示了咸味，也就是我们所知的盐度。海洋的盐度是研究水循环和海洋环流的关键，它们对地球的气候都很重要。在整个地球的历史中，岩石的风化作用将包括盐在内的矿物运送到海洋中。几十年来，海洋盆地的盐含量相对稳定。然而，水循环运行的时间尺度要快得多，导致盐度模式发生变化。例如，淡水(融化的冰，雨和雪)从河流进入海洋。这些过程使海洋变得不那么咸。另一方面，海水蒸发和形成海洋冰的过程;使海洋更咸。'   
});
new jBox('Tooltip', {    
            attach: '#cjc_button_10',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '从外太空看地球，云很容易被发现。整个大地都笼罩着云，就像明亮的白色装饰。云对科学家来说很重要，因为它们将太阳的光反射回太空，给表面提供阴影。它们也带来雨水，这很重要，因为所有的动植物都需要淡水才能生存。这些由美国国家航空航天局(NASA)卫星观测所绘制的地图显示，在某一天或某一段时间内，云层覆盖了多少地球表面。'  
});
new jBox('Tooltip', {    
            attach: '#cjc_button_13',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '你曾经坐过飞机飞过森林，或者看到过从上面拍摄的森林树冠的照片吗?如果是这样的话，你可能会注意到林冠是深绿色的颜色。树木和植物的叶子赋予森林繁茂的绿色外观。森林里的树叶越多，树冠就越绿。你有没有想过森林里有多少树叶?今天，科学家们利用NASA的卫星绘制了"叶面积指数"图像以显示树叶覆盖了多少区域。例如，一种叶面积指数表示该区域完全被一层树叶覆盖。了解树叶覆盖的总面积有助于科学家监测树木和植物与地面和地面之间的空气交换量。'   
});
new jBox('Tooltip', {    
            attach: '#cjc_button_16',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '臭氧是由氧气构成的气体。我们呼吸的氧气是两个氧原子结合在一起。臭氧是三个氧原子连在一起。靠近地面，人类活动如燃烧煤炭或汽油会产生臭氧。导致地面臭氧含量高，危害植物生命，危害人民生活。如果臭氧在距地表几英里地球大气中，在那里，臭氧对地球上的生命有益，因为它可以保护我们免受紫外线的侵害，而紫外线会导致皮肤晒伤、皮肤癌和眼睛受损。所以，人类想要限制地面附近的臭氧，并且希望在大气中有一层健康的臭氧层，以保护我们星球上的生命。'  
});
new jBox('Tooltip', {    
            attach: '#cjc_button_03',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '火是自然循环的一部分。森林火灾可能是由闪电袭击森林树冠，或者在一些孤立的情况下，由熔岩或火山喷发出的热岩石引起的。世界范围内的大多数火灾都是由人类发动的，有时是偶然的，有时是故意的。并非所有的火都是坏的。火可以清除死亡和死亡的灌木丛，这有助于恢复森林生态系统的健康。人类在刀耕火种的农业中使用火作为工具，以加速将不需要的植物分解到土壤中的过程。人类也用火来清除旧的森林，以腾出空间来居住空间、道路和田地来种植庄稼和牲畜。但并非所有的火灾都是好的。野火会破坏自然资源和人类结构。在全球范围内，火在地球的碳循环中扮演着重要的角色，通过将碳排放到空气中，并通过消耗树木在光合作用过程中吸收空气中的碳。这些地图显示了美国国家航空航天局(NASA)卫星上的仪器探测到的世界各地积极燃烧的火的位置。'   
});
new jBox('Tooltip', {    
            attach: '#cjc_button_04',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '在大气中悬浮的微小固体和液体颗粒称为气溶胶。这些粒子对科学家来说很重要，因为它们能影响气候、天气和人们的健康。一些气溶胶来自自然资源，如灰尘、火山爆发和海盐。一些气溶胶是由人类产生的，例如工业或汽车的污染，或火灾中的烟雾。利用卫星，科学家可以判断出某一给定的气溶胶是否来自于自然来源，或者是由人产生的污染。关于气溶胶来源的两个重要线索是粒子的大小和羽流的位置。天然气溶胶(如灰尘和海盐)往往比人造气溶胶(如烟雾和工业污染)更大。'
});
new jBox('Tooltip', {    
            attach: '#cjc_button_05',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '当阳光到达地球表面时，一部分被吸收，一部分被反射。光的相对数量(比率)，一个反映地球表面的总阳光被称为反射率。反射大量光线的表面是明亮的，它们有很高的反照率。不反光的表面是暗的，而且它们的反照率很低。雪有很高的反射率，而森林的反照率很低。'
});
new jBox('Tooltip', {    
            attach: '#cjc_button_21',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '紫外线指数是量度太阳紫外线强度的指标。暴露在阳光下是有益的，因为它可以帮助我们的身体产生维生素d，但是过多的暴露在紫外线下会产生有害的影响。在短期内，暴露在紫外线下的皮肤会被灼伤。灼伤可以在几分钟内或几小时内发生。长期来看，紫外线照射会导致皮肤过早老化、皮肤癌和眼睛受损。紫外线指数气候学显示一个人在每个月的平均紫外线照射量。该指数为0到16+，0代表最小的紫外线暴露风险，高于11的值构成极端风险。'   
});
new jBox('Tooltip', {    
            attach: '#cjc_button_19',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '这些地图显示了在时间周期内，太阳在地球表面的位置和光照强度。科学家们称这种测量方法为“太阳日晒”。了解有多少太阳的能量到达地表，有助于科学家了解气候和气候模式以及世界各地植物生长的模式。太阳能日晒地图对设计太阳能电池板和电池的工程师也很有用，这些太阳能电池板和电池的设计目的是将太阳能转化为电能，用于家庭和工作场所的电力设备。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_button_22',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '根据它的温度，水有三种不同的形式:固体(冰)、液体(雨滴)和气体(肉眼看不见)。随着水变得越来越热，它最终会从液体变成气体。这种气体叫做水蒸汽。水蒸汽是地球大气中非常重要的一部分，因为它能在地表附近吸收热量，并使地球保持温暖。当水蒸汽上升到大气中时，它就会冷却，然后变成水滴。随着更多水滴的出现，它们最终形成了一片云。有些云产生雨雪，将淡水带回地面。因此科学家们监测水蒸汽，因为它影响地球的气候模式，而且因为它是我们世界气候系统的一个非常重要的组成部分。这些地图显示了某一天或几天内的水汽的卫星测量数据。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_button_08',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '无色、无味、有毒的一氧化碳是一种燃烧化石燃料的气体，就像汽车和燃烧的植物的气体。一氧化碳不是导致全球变暖的气体，但它是导致烟雾的空气污染物之一。这些数据集显示了地球上每个月的一氧化碳平均水平。不同的颜色在对流层中显示出不同数量的气体。'    
});
new jBox('Tooltip', {    
            attach: '#cjc_button_14',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '二氧化氮(NO2)是一种天然存在于大气中的气体。NO2对我们呼吸的空气中臭氧(O3)的形成起着重要作用。大气中的臭氧对我们有帮助。就像防晒霜一样，它保护我们免受太阳紫外线的伤害。然而，在靠近地面的地方，臭氧是一种污染物。它破坏我们的肺，伤害植物，包括我们吃的植物。臭氧在我们呼吸的空气中自然发生，但它不足以伤害我们。当空气中有大量的NO2时，臭氧就会形成不健康的水平。NO2和O3通常在城市中浓度是最高的，因为我们的汽车或发电厂燃烧汽油时，NO2被释放到大气中，这两件事在城市中发生的更多。夏天的臭氧污染更严重。高浓度的NO2对呼吸也不健康，比如在繁忙的街道和高速公路上，那里有大量的汽车和卡车。在开车的时候，最好把车窗摇起来，把汽车的通风设备放好，然后再循环。这样可以防止汽车内部的污染。'  
});
new jBox('Tooltip', {    
            attach: '#cjc_button_09',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '这张地图显示了海洋中微小的漂浮植物的位置。这些植物，被称为浮游植物，是海洋食物链的重要组成部分，因为许多动物(如小鱼和鲸鱼)都以它们为食。通过观察浮游植物大量生长的地点和时间，科学家可以对海洋了解很多。科学家们利用卫星来测量浮游植物在海洋中生长的数量，通过观察从浅水深处反射的光的颜色。浮游植物中含有一种名为叶绿素的光合色素，使其具有绿色的颜色。当浮游植物大量繁殖时，它们使海洋呈现绿色。这些由卫星观测所绘制的地图显示了在某一天或几天内浮游植物的数量和数量。黑色区域显示了卫星无法测量浮游植物的地方。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_button_12',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '地图帮助我们理解事物的位置。科学家利用卫星绘制地球上许多不同事物的地图，帮助他们了解我们的世界和我们的世界是如何变化的。从陆地表面的样子来看，科学家们把地球分成了17个不同的类别。不同类型的陆地表面的例子有城市，农田，森林，沙漠等等。通过卫星观测，科学家们绘制了这17个陆地表面分类的地图。这张地图上的不同颜色显示了每一种陆地表面的位置。科学家正在监测这些土地覆盖类型随着时间的变化。'
});
new jBox('Tooltip', {    
            attach: '#cjc_button_15',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '光能以波的形式传播，但不是所有的波都是相同的。我们眼睛所能看到的光只是宇宙中存在的一小部分能量。其他种类的能量是看不见的，比如当我们把双手放在火上时，让我们的手感到温暖的能量。当地球吸收阳光时，它会升温、发热，或称“即将发射的长波辐射”;然后辐射回太空。卫星测量这种离开地球大气层顶部的辐射。一个地方越热，它散发的能量就越多。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_button_01',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '世界各地区的矢量图层' 
});
//三维模型**start**
new jBox('Tooltip', {    
            attach: '#cjc_a_button_1',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '埃菲尔铁塔矗立在塞纳河南岸法国巴黎的战神广场，于1889年建成，当年建成后的埃菲尔铁塔还曾是世界上最高的建筑物，得名于设计它的著名建筑师、结构工程师古斯塔夫·埃菲尔，全部由施耐德铁器建造。埃菲尔铁塔高300米，天线高24米，总高324米，铁塔是由很多分散的钢铁构件组成的——看起来就像一堆模型的组件。钢铁构件有18038个，重达10000吨，施工时共钻孔700万个，使用1.2万个金属部件，用铆钉250万个。除了四个脚是用钢筋水泥之外，全身都用钢铁构成，共用去熟铁7300吨。'  
});
new jBox('Tooltip', {    
            attach: '#cjc_a_button_2',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '国家游泳中心又称“水立方”位于北京奥林匹克公园内，是北京为2008年夏季奥运会修建的主游泳馆，也是2008年北京奥运会标志性建筑物之一。它的设计方案，是经全球设计竞赛产生的“水的立方”方案。其与国家体育场(俗称鸟巢)分列于北京城市中轴线北端的两侧，共同形成相对完整的北京历史文化名城形象。国家游泳中心规划建设用地62950平方米，总建筑面积65000-80000平方米，其中地下部分的建筑面积不少于15000平方米,长宽高分别为 177m ×177m ×30m。2008年奥运会期间，国家游泳中心承担游泳、跳水、花样游泳、水球等比赛，可容纳观众坐席17000座，其中永久观众坐席为6000座，奥运会期间增设临时性座位11000个(赛后将拆除)。赛后成为具有国际先进水平的、集游泳、运动、健身、休闲于一体的中心。'  
});
new jBox('Tooltip', {    
            attach: '#cjc_a_button_3',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '西庸城堡(又译“石庸城堡”)是一座雄伟的中世纪水上城堡，位于沃州蒙特勒附近的Veytaux镇，四周环绕着美丽的日内瓦湖与雄伟的阿尔贝斯山脉，由于它建立在日内瓦湖畔的岩石上，远观给人以漂浮在水面的奇异感觉，故被称之为建筑史上一颗奇异的珍珠，也是瑞士最负盛名的古迹之一，在民间素有“欧洲10大古堡”之称。'
});
new jBox('Tooltip', {    
            attach: '#cjc_a_button_4',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '伊丽莎白塔，旧称大本钟，即威斯敏斯特宫钟塔，世界上著名的哥特式建筑之一，伦敦的标志性建筑，英国国会会议厅附属的钟楼的大报时钟，2012年6月，英国宣布把伦敦著名地标“大本钟”的钟楼改名为“伊丽莎白塔”。伊丽莎白塔是坐落在英国伦敦泰晤士河畔的一座钟楼，是伦敦的标志性建筑之一。钟楼高95米，钟直径7米，重13.5吨。每15分钟响一次，敲响威斯敏斯特钟声。自从兴建地铁Jubilee线之后，大本钟受到影响，测量显示大本钟朝西北方向倾斜约半米。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_a_button_5',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '自由女神像，全名为“自由女神铜像国家纪念碑”，正式名称是“自由照耀世界”，位于美国纽约海港内自由岛的哈德逊河口附近。是法国于1876年为纪念美国独立战争胜利一百周年而建造的，1886年10月28日铜像落成。自由女神穿着古希腊风格服装，头戴光芒四射冠冕，七道尖芒象征七大洲。右手高举象征自由的火炬，左手捧着一块铭牌，上面刻着July IV MDCCLXXVI（1776年7月4日，《独立宣言》颁发的日期）；脚下是打碎的手铐、脚镣和锁链，象征着挣脱暴政的约束和自由。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_a_button_6',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '中国尊，位于北京商务中心区核心区Z15地块，东至金和东路，南邻规划中的绿地，西至金和路，北至光华路，是北京市最高的地标建筑。该项目用地面积11478平方米，总建筑面积43.7万平方米，其中地上35万平方米，地下8.7万平方米，建筑总高528米，建筑层数地上108层、地下7层（不含夹层），可容纳1.2万人办公，为中信集团总部大楼。中国尊由北京中信和业有限公司投资，预计总投资达240亿元。' 
});
new jBox('Tooltip', {    
            attach: '#cjc_a_button_7',   
			delayOpen:3000,
			position: {
				x: 'right',
				y: 'center'
			},
			outside: 'x',
            content: '人民英雄纪念碑位于北京天安门广场中心，在天安门南约463米，正阳门北约440米的南北中轴线上，是中华人民共和国政府为纪念中国近现代史上的革命烈士而修建的纪念碑。1949年9月30日，中国人民政治协商会议第一届全体会议决定，为了纪念在人民解放战争和人民革命中牺牲的人民英雄，在首都北京建立人民英雄纪念碑。1949年9月30日奠基，1952年8月1日开工，1958年4月22日建成，1958年5月1日揭幕，1961年被中华人民共和国国务院公布为第一批全国重点文物保护单位之一。人民英雄纪念碑通高37.94米，正面（北面）碑心是一整块花岗岩，长14.7米、宽2.9米、厚1米、重60.23吨，镌刻着毛泽东同志1955年6月9日所题写的“人民英雄永垂不朽”八个金箔大字。背面碑心由7块石材构成，内容为毛泽东起草、周恩来书写的150字小楷字体碑文。' 
});
//三维模型**end**
//Tooltips效果**end**

//加载二维数据图层**start**
$.get(serviceAddress).done(createLayer).fail(logError);
//加载二维数据图层**end**
//路线函数**star**
var cjcPerformSearch= function (queryString) {
        if (queryString) {
            var latitude, longitude;

            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                var tokens = queryString.split(",");
                latitude = parseFloat(tokens[0]);
                longitude = parseFloat(tokens[1]);
                wwd.goTo(new WorldWind.Location(latitude, longitude));
            } else {
				var geocoder=new WorldWind.NominatimGeocoder();
                geocoder.lookup(queryString, function (geocoder, result) {
                    if (result.length > 0) {
                        latitude = parseFloat(result[0].lat);
                        longitude = parseFloat(result[0].lon);

                        WorldWind.Logger.log(
                            WorldWind.Logger.LEVEL_INFO, queryString + ": " + latitude + ", " + longitude);

                        wwd.goTo(new WorldWind.Location(latitude, longitude));
                    }
                });
            }
        }
    };
var cjcGetPo_01 = function (queryString) {
        if (queryString) {			
            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                var tokens = queryString.split(",");
                wwd.searchLat_01 = parseFloat(tokens[0]);
                wwd.searchLon_01 = parseFloat(tokens[1]);
            } else {
				var geocoder=new WorldWind.NominatimGeocoder();
                geocoder.lookup(queryString, function (geocoder, result) {
                    if (result.length > 0) {
                        wwd.searchLat_01 = parseFloat(result[0].lat);
                        wwd.searchLon_01 = parseFloat(result[0].lon);
						cjc_6_9_draw_02();
                    }
                });
            }
        }
    };
var cjcGetPo_02 = function (queryString) {
        if (queryString) {
			var ccu;
            if (queryString.match(WorldWind.WWUtil.latLonRegex)) {
                var tokens = queryString.split(",");
                wwd.searchLat_02 = parseFloat(tokens[0]);
                wwd.searchLon_02 = parseFloat(tokens[1]);
            } else {
				var geocoder = new WorldWind.NominatimGeocoder();
                geocoder.lookup(queryString, function (geocoder, result) {
                    if (result.length > 0) {
                        wwd.searchLat_02 = parseFloat(result[0].lat);
                        wwd.searchLon_02 = parseFloat(result[0].lon);		
						cjc_6_9_draw_01();						
                    }
                });
            }
        }
    };
function cjc_6_9_draw_01(){
	if(document.getElementById("searchText_01").value){
				if(!wwd.searchLat_01){
				cjcGetPo_01(document.getElementById("searchText_01").value);
				return;				
				}
				if(!wwd.searchLat_02){
				cjcGetPo_02(document.getElementById("searchText_02").value);
				return;
				}
				var pathPositions_6_9=[];
				pathPositions_6_9.push(new WorldWind.Position(wwd.searchLat_01, wwd.searchLon_01, 1e4));
				pathPositions_6_9.push(new WorldWind.Position(wwd.searchLat_02, wwd.searchLon_02, 1e4));
				//将鼠标点击事件获取到的坐标传入坐标数组当中
				var path = new WorldWind.Path(pathPositions_6_9, null);//实例化一个路径对象
				path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
				path.followTerrain = true;
				path.extrude = true; // make it a curtain
				path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode

				//路径对象的参数
				var pathAttributes = new WorldWind.ShapeAttributes(null);
				pathAttributes.outlineColor = WorldWind.Color.CYAN ;
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
}
function cjc_6_9_draw_02(){
	if(document.getElementById("searchText_02").value){
				if(!wwd.searchLat_01){
				cjcGetPo_01(document.getElementById("searchText_01").value);	
				return;
				}
				if(!wwd.searchLat_02){
				cjcGetPo_02(document.getElementById("searchText_02").value);
				return;
				}
				var pathPositions_6_9=[];
				pathPositions_6_9.push(new WorldWind.Position(wwd.searchLat_01, wwd.searchLon_01, 1e4));
				pathPositions_6_9.push(new WorldWind.Position(wwd.searchLat_02, wwd.searchLon_02, 1e4));
				//将鼠标点击事件获取到的坐标传入坐标数组当中
				var path = new WorldWind.Path(pathPositions_6_9, null);//实例化一个路径对象
				path.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
				path.followTerrain = true;
				path.extrude = true; // make it a curtain
				path.useSurfaceShapeFor2D = true; // use a surface shape in 2D mode

				//路径对象的参数
				var pathAttributes = new WorldWind.ShapeAttributes(null);
				pathAttributes.outlineColor = WorldWind.Color.CYAN ;
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
}
//路线函数**end**
//帮助文档**start**
function cjcHelp(){
	window.open("help.html");
}
//帮助文档**end**