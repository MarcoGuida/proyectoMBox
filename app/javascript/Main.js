var Main = (function() {
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	var numEnlaces = 0;
	// var enlaceMarcado=0;

	function _onLoad() {
		try {
			_enableKeys();
			widgetAPI.sendReadyEvent();
			userList.init(Main.paintData);

			// importedJSON.prueba();
			// alert(importedJSON.miVariable);

			alert("fin onLoad");
		} catch (e) {
			alert(e);
		}
	}
	;

	function _paintData(jsonDataRecv) {
		alert("dentro de print data");
		var tareasSemana = [];
		var jsonArray = importedJSON.parseaJSON(jsonDataRecv);
		// alert(jsonArray);
		for ( var i = 2; i < jsonArray.length; i++) {
			tareasSemana.push(jsonArray[i]);
		}

		var fechaActual = new Date();
		var diaSemana = fechaActual.getDay() - 1;

		for ( var i = 0; i < tareasSemana.length; i++) {
			 alert("i="+i+" "+tareasSemana[i].tarea);

		}
		 alert("usuario:"+jsonArray[0]);
		 alert("hoy es: "+diaSemana);
		 alert("Numero tareas de hoy:");
		 alert((tareasSemana[diaSemana].tarea).length);
	
		 var nombreUsu=jsonArray[0];
		 document.getElementById("perfil").innerHTML=nombreUsu;

		 var iconoUsu=jsonArray[1];
		 var unaIMG=document.createElement("img");
		 unaIMG.setAttribute('src', iconoUsu);
		 unaIMG.setAttribute('alt', 'na');
		 unaIMG.setAttribute('height', '100px');
		 unaIMG.setAttribute('width', '100px');
		 document.getElementById("perfil").appendChild(unaIMG);

		 for ( var i = 2; i < jsonArray.length; i++) {
		 tareasSemana.push(jsonArray[i]);
		 //alert(jsonArray[i].tarea.hora);
		 }
				
		 var tareasDeHoy=tareasSemana[diaSemana].tarea;
		 //alert("tareasDeHoy :"+tareasDeHoy.length);
		// document.getElementById("numTareas").innerHTML="Numero Tareas de hoy:"+tareasDeHoy.length;

		 alert("EMPIEZA EL FOR TAREAS");
		 for ( var i = 0; i < tareasDeHoy.length; i++) {
		 var imagenTarea=document.createElement("img");
		 alert(tareasDeHoy[i].image);
		 imagenTarea.setAttribute('src', tareasDeHoy[i].image );
		 imagenTarea.setAttribute('alt', 'na');
		 imagenTarea.setAttribute('height', '50px');
		 imagenTarea.setAttribute('width', '50px');
		
		 var tarea= document.createElement("div");
		 var description= document.createElement("div");
					
		 //alert("tareasDeHoy[i] : "+tareasDeHoy[i].hora);
					
		 tarea.innerHTML = "<div id=\"tarea"+i+"\">"+tareasDeHoy[i].hora+" - "+tareasDeHoy[i].title+"</div>";
		 description.innerHTML = "<div>"+tareasDeHoy[i].description+"</div>";
					
					
		 document.getElementById("info").appendChild(tarea);
		 document.getElementById("info").appendChild(description);
		 document.getElementById("tarea"+i).appendChild(imagenTarea);
		 }
		 alert("TERMINA EL FOR TAREAS");

	}
	;

	function _onUnload() {

	}
	;

	function _enableKeys() {
		document.getElementById("anchor").focus();
	}
	;

	/*
	 * Funcion llamada cuiando hay eventos de teclado
	 */

	function resetButtons() {

		for ( var i = 0; i < numEnlaces; i++) {

			document.getElementById("enlace" + i).style.border = "0px";
		}

	}

	function _keyDown() {
		var keyCode = event.keyCode;
		switch (keyCode) {
		case tvKey.KEY_RETURN:
		case tvKey.KEY_PANEL_RETURN:
			alert("RETURN");
			widgetAPI.sendReturnEvent();
			break;
		case tvKey.KEY_LEFT:
			alert("LEFT");
			// widgetAPI.putInnerHTML(info, "Has pulsado Izquierda");
			break;
		case tvKey.KEY_RIGHT:
			alert("RIGHT");
			// widgetAPI.putInnerHTML(info, "Has pulsado Derecha");
			break;
		case tvKey.KEY_UP:
			alert("UP");
			// widgetAPI.putInnerHTML(info, "Has pulsado Arriba");
			if (enlaceMarcado > 0) {
				resetButtons();
				enlaceMarcado--;
				document.getElementById("enlace" + enlaceMarcado).style.border = "8px solid blue";

			}
			break;
		case tvKey.KEY_DOWN:
			alert("DOWN");
			// widgetAPI.putInnerHTML(info, "Has pulsado Abajo");
			if (enlaceMarcado < numEnlaces - 1) {
				resetButtons();
				enlaceMarcado++;
				document.getElementById("enlace" + enlaceMarcado).style.border = "8px solid blue";

			}

			break;
		case tvKey.KEY_ENTER:
			// widgetAPI.putInnerHTML(info, "Has pulsado Intro");
		case tvKey.KEY_PANEL_ENTER:
			alert("ENTER");
			// widgetAPI.putInnerHTML(info, "Has pulsado Panel Intro");
			break;

		case tvKey.KEY_GREEN:
			alert("GREEN");
			resetButtons();
			document.getElementById("greenButton").style.border = "8px solid pink";
			// widgetAPI.putInnerHTML(info, "Has pulsado VERDE");
			break;
		case tvKey.KEY_RED:
			alert("RED");
			resetButtons();
			document.getElementById("redButton").style.border = "8px solid pink";
			// widgetAPI.putInnerHTML(info, "Has pulsado ROJO");
			break;
		case tvKey.KEY_YELLOW:
			alert("YELLOW");
			resetButtons();
			document.getElementById("yellowButton").style.border = "8px solid pink";
			// .putInnerHTML(info, "Has pulsado AMARILLO");
			break;
		case tvKey.KEY_BLUE:
			alert("BLUE");
			// importedJSON.prueba();
			// importedJSON.parseaJSON("jsonImportadoooooooooooo");
			resetButtons();
			// document.getElementById("blueButton").style.border = "8px solid
			// pink";
			// widgetAPI.putInnerHTML(info, "Has pulsado AZUL");
			break;

		case tvKey.KEY_0:
			alert("0");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 0 Volume: " + volume);
			break;
		case tvKey.KEY_1:
			alert("1");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 1");
			break;
		case tvKey.KEY_2:
			alert("2");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 2");
			break;
		case tvKey.KEY_3:
			alert("3");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 3");
			break;
		case tvKey.KEY_4:
			alert("4");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 4");
			break;
		case tvKey.KEY_5:
			alert("5");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 5");
			break;
		case tvKey.KEY_6:
			alert("6");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 6");
			break;
		case tvKey.KEY_7:
			alert("7");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 7");
			break;
		case tvKey.KEY_8:
			alert("8");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 8");
			break;
		case tvKey.KEY_9:
			alert("9");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 9");
			break;

		default:
			alert("Unhandled key");
			resetButtons();
			break;

		}
	}
	;

	// metodos publicos
	return {
		onLoad : function() {
			_onLoad();
		},
		onUnload : function() {
			_onUnload();
		},
		keyDown : function() {
			_keyDown();
		},
		paintData : function(jsonDataRecv) {
			_paintData(jsonDataRecv);
		}
	};
})();