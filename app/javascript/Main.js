var Main = (function() {
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	var textFirmware = "";
	var volume = "";
	var numEnlaces=0;
	var enlaceMarcado=0;
	
	function _onLoad() {

		try {

			_enableKeys();
			widgetAPI.sendReadyEvent();
			//var nnavi = document.getElementById("pluginNnavi");
			//var audio = document.getElementById("pluginAudio");
			//var firmware = nnavi.GetFirmware();
			//document.getElementById("info").innerHTML = firmware;
			//textFirmware = firmware;

			//volumen = audio.GetVolume();
			audioList.init(Main.paintData);
			alert("fin onLoad");

			
		} catch (e) {
			alert(e);
		}
	};

	function _paintData(jsonDataRecv)
	{
		alert("_paintData");
		numEnlaces=jsonDataRecv.length;
		for(var i=0;i<numEnlaces;i++)
		{
		alert(i+" - "+jsonDataRecv[i]);
		var enlace= document.createElement("div");        
		var imagen=document.createElement("img");
		imagen.innerHTML = "<img src=\""+jsonDataRecv[i].thumbnail+"\"  height=\"160\" width=\"90\" > ";
		
		var enlaceCorto=(jsonDataRecv[i].qualities.filePath).split("/");
		enlace.innerHTML = "<div id=\"enlace"+i+"\">"+jsonDataRecv[i].shortTitle+" <->  "+enlaceCorto[enlaceCorto.length-1]+"</div>";     
		document.getElementById("info").appendChild(imagen);
		document.getElementById("info").appendChild(enlace);
		document.getElementById("enlace0").style.border = "8px solid blue";
		}
	};
	
	function _onUnload() {

	};

	function _enableKeys() {
		document.getElementById("anchor").focus();
	};

	/*
	 * Funcion llamada cuiando hay eventos de teclado
	 */

	function resetButtons() {
//		document.getElementById("greenButton").style.border = "0px";
//		document.getElementById("redButton").style.border = "0px";
//		document.getElementById("yellowButton").style.border = "0px";
//		document.getElementById("blueButton").style.border = "0px";
//
//		widgetAPI.putInnerHTML(info, textFirmware);
		
		for(var i=0;i<numEnlaces;i++)
			{
			
			document.getElementById("enlace"+i).style.border = "0px";
			}

	}

	function _keyDown() {
		var keyCode=event.keyCode;
			switch(keyCode) {
			case tvKey.KEY_RETURN:
			case tvKey.KEY_PANEL_RETURN:
				alert("RETURN");
				widgetAPI.sendReturnEvent();
				break;
			case tvKey.KEY_LEFT:
				alert("LEFT");
				//widgetAPI.putInnerHTML(info, "Has pulsado Izquierda");
				break;
			case tvKey.KEY_RIGHT:
				alert("RIGHT");
				//widgetAPI.putInnerHTML(info, "Has pulsado Derecha");
				break;
			case tvKey.KEY_UP:
				alert("UP");
				//widgetAPI.putInnerHTML(info, "Has pulsado Arriba");
				if(enlaceMarcado>0)
				{
				resetButtons();
				enlaceMarcado--;
				document.getElementById("enlace"+enlaceMarcado).style.border = "8px solid blue";
				
				}
				break;
			case tvKey.KEY_DOWN:
				alert("DOWN");
				//widgetAPI.putInnerHTML(info, "Has pulsado Abajo");
				if(enlaceMarcado<numEnlaces-1)
					{
					resetButtons();
					enlaceMarcado++;
					document.getElementById("enlace"+enlaceMarcado).style.border = "8px solid blue";
					
					}

				break;
			case tvKey.KEY_ENTER:
			//	widgetAPI.putInnerHTML(info, "Has pulsado Intro");
			case tvKey.KEY_PANEL_ENTER:
				alert("ENTER");
			//	widgetAPI.putInnerHTML(info, "Has pulsado Panel Intro");
				break;

			case tvKey.KEY_GREEN:
				alert("GREEN");
				resetButtons();
				document.getElementById("greenButton").style.border = "8px solid pink";
				//widgetAPI.putInnerHTML(info, "Has pulsado VERDE");
				break;
			case tvKey.KEY_RED:
				alert("RED");
				resetButtons();
				document.getElementById("redButton").style.border = "8px solid pink";
			//	widgetAPI.putInnerHTML(info, "Has pulsado ROJO");
				break;
			case tvKey.KEY_YELLOW:
				alert("YELLOW");
				resetButtons();
				document.getElementById("yellowButton").style.border = "8px solid pink";
				//.putInnerHTML(info, "Has pulsado AMARILLO");
				break;
			case tvKey.KEY_BLUE:
				alert("BLUE");
				resetButtons();
				document.getElementById("blueButton").style.border = "8px solid pink";
				//widgetAPI.putInnerHTML(info, "Has pulsado AZUL");
				break;

			case tvKey.KEY_0:
				alert("0");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 0 Volume: " + volume);
				break;
			case tvKey.KEY_1:
				alert("1");
				resetButtons();
				//widgetAPI.putInnerHTML(info, "Has pulsado 1");
				break;
			case tvKey.KEY_2:
				alert("2");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 2");
				break;
			case tvKey.KEY_3:
				alert("3");
				resetButtons();
				//widgetAPI.putInnerHTML(info, "Has pulsado 3");
				break;
			case tvKey.KEY_4:
				alert("4");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 4");
				break;
			case tvKey.KEY_5:
				alert("5");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 5");
				break;
			case tvKey.KEY_6:
				alert("6");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 6");
				break;
			case tvKey.KEY_7:
				alert("7");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 7");
				break;
			case tvKey.KEY_8:
				alert("8");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 8");
				break;
			case tvKey.KEY_9:
				alert("9");
				resetButtons();
			//	widgetAPI.putInnerHTML(info, "Has pulsado 9");
				break;

			default:
				alert("Unhandled key");
				resetButtons();
				break;
			
	}};
	

	// metodos publicos
	return {
		onLoad: function() {
			_onLoad();
		},
		onUnload: function() {
			_onUnload();
		},
		keyDown: function() {
			_keyDown();
		},
		paintData: function(jsonDataRecv) {
			_paintData(jsonDataRecv);
		}
	};
})();