var Main = (function() {
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	var numEnlaces = 0;
	var capaBarraHours;
	// var enlaceMarcado=0;
	var fechaActual;
	var diaSemana;
	var tareasSemana = [];
	var tareasDeHoy = [];

	function _onLoad() {
		try {
			fechaActual = new Date();
			diaSemana = fechaActual.getDay() - 1;
			_enableKeys();
			widgetAPI.sendReadyEvent();

			// importedJSON.prueba();
			// alert(importedJSON.miVariable);
			_pantallaDia();

			// alert(horaActual);
			// alert("fin onLoad");
		} catch (e) {
			alert(e);
		}
	}
	;

	function _pantallaDia() {
		alert("pantallaDia");
		userList.init(Main.paintTareas);
	}

	function _pintaBarraHours() {
		alert("_pintaBarraHours" + tareasDeHoy.length);

		
		
		capaBarraHours = document.getElementById("hours");
		var escalaHoras = fechaActual.getHours();

//		var ulBarraHours = "<ul>"
//				+ "<li id=\"leftArrow\" class=\"arrows\"><img src=\"\" alt=\"leftArrow\"/></li>"
//				+ "<li><a href=\"#\">Ahora<i class=\"mañana\"></i></a></li>";
		var ulBarraHours = "<ul><li><a href=\"#\">Ahora<span class=\"hour-icon hour-icon-mañana\" data-type=\"icon\" style=\"display: block; top: 30px; background-position: left top;\"></span></a></li>";
		
		
		// for ( var i = 1; i < 5; i++) {
		// ulBarraHours += "<li><a href=\"#\">" + escalaHoras++
		// + ":00</a></li>";
		// }

		// alert("tareasDeHoy"+tareasDeHoy[0].hora);

		/**
		 * mñn 7-13
		 * tarde 14-20
		 * noche 21-6
		 */
		
		var tareasBarra = 0;

		 alert("horaactual"+fechaActual.getHours()+":"+fechaActual.getMinutes());
		 document.getElementById("fecha").innerHTML=fechaActual.getHours()+":"+fechaActual.getMinutes();
		for ( var i = 0; i < tareasDeHoy.length; i++) {

			// alert("tareasDeHoy[i].hora"+tareasDeHoy[i].hora);
			var descomponeHora = (tareasDeHoy[i].hora).split(":");
			 alert("descomponeHora0:"+descomponeHora[0]);
			 alert("descomponeHora1:"+descomponeHora[1]);

			 var minDiaTarea=Number(descomponeHora[0]*60)+Number(descomponeHora[1]);
			 alert("minDiaTarea"+minDiaTarea);
			 
			 var minDiaActual=Number(fechaActual.getHours()*60)+Number(fechaActual.getMinutes());
			 alert("minDiaActual"+minDiaActual);
			 
			 if (minDiaTarea>=minDiaActual) {
				alert("tareaFutura");
				 //ulBarraHours += "<li><a href=\"#\">" + tareasDeHoy[i].hora + "</a></li>";
				
				 
				ulBarraHours += "<li><a href=\"#\">"+ tareasDeHoy[i].hora+"<span class=\"hour-icon hour-icon-mañana\" data-type=\"icon\" style=\"display: block; top: 30px; background-position: left top;\"></span></a></li>";
					

			}
			 else {
				alert("tareapasada");
			}
			 
		}

		ulBarraHours +="</ul><div id=\"rightArrow\" class=\"arrows\"><a href=\"#\"></a></div>"+
		"<a class=\"hour_next\" href=\"#\"></a>"+
		"<a class=\"hour_prev\" href=\"#\"></a>";

		capaBarraHours.innerHTML = ulBarraHours;
	}

	function _paintTareas(jsonDataRecv) {
		alert("dentro de print data");

		var jsonArray = importedJSON.parseaJSON(jsonDataRecv);
		// alert(jsonArray);
		for ( var i = 2; i < jsonArray.length; i++) {
			tareasSemana.push(jsonArray[i]);
		}

		// for ( var i = 0; i < tareasSemana.length; i++) {
		// alert("i=" + i + " " + tareasSemana[i].tarea);
		//
		// }
		// alert("usuario:" + jsonArray[0]);
		// alert("hoy es: " + diaSemana);
		// alert("Numero tareas de hoy:");
		// alert((tareasSemana[diaSemana].tarea).length);

		var nombreUsu = jsonArray[0];

		var iconoUsu = jsonArray[1];
		var unaIMG = document.createElement("img");
		unaIMG.setAttribute('class', "image-perfil");
		unaIMG.setAttribute('src', iconoUsu);
		unaIMG.setAttribute('alt', 'name');
		//unaIMG.setAttribute('height', '100px');
		//unaIMG.setAttribute('width', '100px');
		document.getElementById("perfil").appendChild(unaIMG);
		document.getElementById("perfil").innerHTML = document.getElementById("perfil").innerHTML+"<div id=\"name\">"+nombreUsu+"</div>" ;

		
		alert("JSL" + jsonArray.length);
		tareasSemana = [];
		for ( var i = 2; i < jsonArray.length; i++) {
			alert("i=" + i);
			tareasSemana.push(jsonArray[i]);
			alert(tareasSemana.length);
			// alert(jsonArray[i].tarea);
		}

		// alert(diaSemana);
		alert("ts" + tareasSemana.length);

		// tareasDeHoy.push(tareasSemana[diaSemana]);
		alert("hoy" + diaSemana);
		alert("tareasSemana[hoy]" + tareasSemana[diaSemana].tarea[0].hora);
		alert((tareasSemana[diaSemana].tarea).length);
		for ( var i = 0; i < (tareasSemana[diaSemana].tarea).length; i++) {

			alert(tareasSemana[diaSemana].tarea[i].hora);
			tareasDeHoy.push(tareasSemana[diaSemana].tarea[i]);
		}

		alert("tareasDeHoy :" + tareasDeHoy.length);
		// document.getElementById("numTareas").innerHTML="Numero Tareas de
		// hoy:"+tareasDeHoy.length;

		// alert("EMPIEZA EL FOR TAREAS");
		
		/**/
		
		
//		for ( var i = 0; i < tareasDeHoy.length; i++) {
//			var imagenTarea = document.createElement("img");
//			// alert(tareasDeHoy[i].image);
//			imagenTarea.setAttribute('src', tareasDeHoy[i].image);
//			imagenTarea.setAttribute('alt', 'na');
//			imagenTarea.setAttribute('height', '50px');
//			imagenTarea.setAttribute('width', '50px');
//
//			var tarea = document.createElement("div");
//			var description = document.createElement("div");
//
//			// alert("tareasDeHoy[i] : "+tareasDeHoy[i].hora);
//
//			tarea.innerHTML = "<div id=\"tarea" + i + "\">"
//					+ tareasDeHoy[i].hora + " - " + tareasDeHoy[i].title
//					+ "</div>";
//			description.innerHTML = "<div>" + tareasDeHoy[i].description
//					+ "</div>";
//
//			document.getElementById("info").appendChild(tarea);
//			document.getElementById("info").appendChild(description);
//			document.getElementById("tarea" + i).appendChild(imagenTarea);
//		}
//		 alert("TERMINA EL FOR TAREAS");
		
		
		/**/
		
		
		///////////////////nueva creacion capas 250314 18:07
		
			
		var	tituloActividad= document.createElement("div");
		var	iconoActividad= document.createElement("div");
		var	descripcionActividad= document.createElement("div");
		var	horaActividad= document.createElement("div");
			
		alert("tareasDeHoy[0].title:"+tareasDeHoy[0].title);
		
		tituloActividad.innerHTML = "<div id=\"tituloActividad\">"+ tareasDeHoy[0].title +"</div>";
		iconoActividad.innerHTML = "<div id=\"iconoActividad\"></div>";
	
		descripcionActividad.innerHTML = "<div id=\"descripcionActividad\">"+ tareasDeHoy[0].description +"</div>";
		
		horaActividad.innerHTML = "<div id=\"horaActividad\">"+ tareasDeHoy[0].hora +"</div>";
		
		var imagenTarea = document.createElement("img");
		imagenTarea.setAttribute('src', tareasDeHoy[0].image);
		imagenTarea.setAttribute('alt', 'na');
		imagenTarea.setAttribute('height', '50px');
		imagenTarea.setAttribute('width', '50px');

		document.getElementById("info").appendChild(tituloActividad);
		document.getElementById("info").appendChild(iconoActividad);
		document.getElementById("iconoActividad").appendChild(imagenTarea);
		document.getElementById("info").appendChild(descripcionActividad);
		document.getElementById("info").appendChild(horaActividad);

		///////////////////FIN nueva creacion capas 250314 18:07
		
		_pintaBarraHours();
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
		paintTareas : function(jsonDataRecv) {
			_paintTareas(jsonDataRecv);
		}
	};
})();