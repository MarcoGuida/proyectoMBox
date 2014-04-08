var Main = (function() {
	var widgetAPI = new Common.API.Widget();
	var tvKey = new Common.API.TVKeyValue();
	var numEnlaces = 0;
	var capaBarraHours;
	// var enlaceMarcado=0;
	var fechaActual;
	var tareasSemana = [];
	var tareasDeHoy = [];
	var MINMANHANA = 7, MAXMANHANA = 13, MINTARDE = MAXMANHANA + 1, MAXTARDE = 20, MINNOCHE = MAXTARDE + 1, MAXNOCHE = 6;
	var demoMode = true, horaDemo = 15, minutosDemo = 40;
	var plantillaBodyPantallaDia;

	function _onLoad() {
		try {
			_enableKeys();
			widgetAPI.sendReadyEvent();
			plantillaBodyPantallaDia = document.getElementById("allContent");
			alert("plantillaBodyPantallaDia"+plantillaBodyPantallaDia+"-"+plantillaBodyPantallaDia.childNodes.length);
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

	function _getDiaSemana() {
		fechaActual = new Date();
		if (demoMode) {
			return 1;
		} else {
			return fechaActual.getDay() - 1;
		}
	}

	function _getMinutesTotalDia() {
		var descomponeHora = (_getHora()).split(":");
		descomponeHora[0] = Number(descomponeHora[0]);
		descomponeHora[1] = Number(descomponeHora[1]);
		return Number(descomponeHora[0] * 60 + descomponeHora[1]);
	}

	function _getHora() {
		var horas, minutos;
		// alert("_getHora");
		if (demoMode) {
			if (horaDemo < 10) {
				horas = "0" + horaDemo;
				// alert("horas"+horas);
			} else {
				horas = horaDemo;
				// alert("horas"+horas);
			}
			if (minutosDemo < 10) {
				minutos = "0" + minutosDemo;
				// alert("minutos"+minutos);
			} else {
				minutos = minutosDemo;
				// alert("minutos"+minutos);
			}

			// alert("demomode getHora"+horas + ":" + minutos);
			return horas + ":" + minutos;
		} else {
			fechaActual = new Date();
			horas = fechaActual.getHours();
			minutos = fechaActual.getMinutes();
			if (horas < 10) {
				horas = "0" + horas;
			}
			if (minutos < 10) {
				minutos = "0" + minutos;
			}
			return horas + ":" + minutos;
		}

	}

	function _incrementaHoraDemo() {

		if (horaDemo < 23) {
			horaDemo++;
		} else {
			horaDemo = 0;
		}

	}

	function _decrementaHoraDemo() {
		if (horaDemo > 0) {
			horaDemo--;
		} else {
			horaDemo = 23;
		}

	}

	function _incrementaMinutosDemo() {
		if (minutosDemo < 59) {
			horaDemo++;
		} else {
			minutosDemo = 0;
		}
	}

	function _decrementaMinutosDemo() {
		if (minutosDemo > 0) {
			horaDemo--;
		} else {
			minutosDemo = 59;
		}
	}

	function _pantallaDia() {
		alert("pantallaDia");
		userList.init(Main.paintTareas);
	}

	function _getFranja(hora) {

		/**
		 * mñn 7-13 tarde 14-20 noche 21-6
		 */
		var descomponeHora = (hora).split(":");
		hora = descomponeHora[0];
		// alert("hora getFranja:"+hora);
		if (hora >= MINMANHANA && hora <= MAXMANHANA) {
			return "mañana";
		}

		else if (hora >= MINTARDE && hora <= MAXTARDE) {
			return "tarde";
		}

		else {
			return "noche";
		}

	}

	function _pintaBarraHours() {
		alert("_pintaBarraHours" + tareasDeHoy.length);

		capaBarraHours = document.getElementById("hours");
		var escalaHoras = _getHora();

		// var ulBarraHours = "<ul>"
		// + "<li id=\"leftArrow\" class=\"arrows\"><img src=\"\"
		// alt=\"leftArrow\"/></li>"
		// + "<li><a href=\"#\">Ahora<i class=\"mañana\"></i></a></li>";
		var ulBarraHours = "<ul><li><a href=\"#\">Ahora<span class=\"hour-icon hour-icon-"
				+ _getFranja(_getHora())
				+ "\" data-type=\"icon\" style=\"display: block; top: 30px; background-position: left top;\"></span></a></li>";

		// for ( var i = 1; i < 5; i++) {
		// ulBarraHours += "<li><a href=\"#\">" + escalaHoras++
		// + ":00</a></li>";
		// }

		// alert("tareasDeHoy"+tareasDeHoy[0].hora);

		var tareasBarra = 0;

		alert("horaactual" + _getHora());
		document.getElementById("fecha").innerHTML = _getHora();
		for ( var i = 0; i < tareasDeHoy.length; i++) {

			// alert("tareasDeHoy[i].hora"+tareasDeHoy[i].hora);
			var descomponeHora = (tareasDeHoy[i].hora).split(":");
			alert("descomponeHora0:" + descomponeHora[0]);
			alert("descomponeHora1:" + descomponeHora[1]);

			var minDiaTarea = Number(descomponeHora[0] * 60)
					+ Number(descomponeHora[1]);
			alert("minDiaTarea" + minDiaTarea);
			alert("minDiaActual" + _getMinutesTotalDia());

			if (minDiaTarea >= _getMinutesTotalDia()) {
				alert("tareaFutura");
				// ulBarraHours += "<li><a href=\"#\">" + tareasDeHoy[i].hora +
				// "</a></li>";

				ulBarraHours += "<li><a href=\"#\">" + tareasDeHoy[i].hora
						+ "<span class=\"hour-icon hour-icon-"
						+ _getFranja(tareasDeHoy[i].hora)
						+ "\" data-type=\"icon\"></span></a></li>";

			} else {
				alert("tareapasada");
			}

		}

		ulBarraHours += "</ul><div id=\"rightArrow\" class=\"arrows\"><a href=\"#\"></a></div>"
				+ "<a class=\"hour_next\" href=\"#\"></a>"
				+ "<a class=\"hour_prev\" href=\"#\"></a>";

		capaBarraHours.innerHTML = ulBarraHours;
	}

	function _restablecePantallaDia() {
		alert("voy a vaciar el body");
//		while (document.body.hasChildNodes()) {
//			alert("while:"+document.body.hasChildNodes());
//			document.body.removeChild(0);
//			alert("eliminando en body");
//		}
		
		document.body.replaceChild(plantillaBodyPantallaDia, document.getElementById("allContent"));
		alert("body vacio");
		//document.body=plantillaBodyPantallaDia;
		//var todoBody=document.getElementById("allContent");
		todoBody
//		for ( var i = 0; i < plantillaBodyPantallaDia.childNodes.length; i++) {
//			document.body.appendChild(plantillaBodyPantallaDia.childNodes.item(i));
//			alert("elemento "+i);
//		}
		
		//document.body.appendChild(plantillaBodyPantallaDia);
		
	}

	function _paintTareas(jsonDataRecv) {
		alert("dentro de print data");

		//_restablecePantallaDia();
		alert("despues de restablecer");
		
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
		// unaIMG.setAttribute('height', '100px');
		// unaIMG.setAttribute('width', '100px');
		document.getElementById("perfil").appendChild(unaIMG);
		document.getElementById("perfil").innerHTML = document
				.getElementById("perfil").innerHTML
				+ "<div id=\"name\">" + nombreUsu + "</div>";

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
		alert("hoy" + _getDiaSemana());
		alert("tareasSemana[hoy]" + tareasSemana[_getDiaSemana()].tarea[0].hora);
		alert((tareasSemana[_getDiaSemana()].tarea).length);
		for ( var i = 0; i < (tareasSemana[_getDiaSemana()].tarea).length; i++) {

			alert(tareasSemana[_getDiaSemana()].tarea[i].hora);
			tareasDeHoy.push(tareasSemana[_getDiaSemana()].tarea[i]);
		}

		alert("tareasDeHoy :" + tareasDeHoy.length);
		// document.getElementById("numTareas").innerHTML="Numero Tareas de
		// hoy:"+tareasDeHoy.length;

		// alert("EMPIEZA EL FOR TAREAS");

		/**/

		// for ( var i = 0; i < tareasDeHoy.length; i++) {
		// var imagenTarea = document.createElement("img");
		// // alert(tareasDeHoy[i].image);
		// imagenTarea.setAttribute('src', tareasDeHoy[i].image);
		// imagenTarea.setAttribute('alt', 'na');
		// imagenTarea.setAttribute('height', '50px');
		// imagenTarea.setAttribute('width', '50px');
		//
		// var tarea = document.createElement("div");
		// var description = document.createElement("div");
		//
		// // alert("tareasDeHoy[i] : "+tareasDeHoy[i].hora);
		//
		// tarea.innerHTML = "<div id=\"tarea" + i + "\">"
		// + tareasDeHoy[i].hora + " - " + tareasDeHoy[i].title
		// + "</div>";
		// description.innerHTML = "<div>" + tareasDeHoy[i].description
		// + "</div>";
		//
		// document.getElementById("info").appendChild(tarea);
		// document.getElementById("info").appendChild(description);
		// document.getElementById("tarea" + i).appendChild(imagenTarea);
		// }
		// alert("TERMINA EL FOR TAREAS");
		/**/

		// /////////////////nueva creacion capas 250314 18:07
		var tituloActividad = document.createElement("div");
		var iconoActividad = document.createElement("div");
		var descripcionActividad = document.createElement("div");
		var horaActividad = document.createElement("div");

		alert("tareasDeHoy[0].title:" + tareasDeHoy[0].title);

		tituloActividad.innerHTML = "<div id=\"tituloActividad\">"
				+ tareasDeHoy[0].title + "</div>";
		iconoActividad.innerHTML = "<div id=\"iconoActividad\"></div>";

		descripcionActividad.innerHTML = "<div id=\"descripcionActividad\">"
				+ tareasDeHoy[0].description + "</div>";

		horaActividad.innerHTML = "<div id=\"horaActividad\">"
				+ tareasDeHoy[0].hora + "</div>";

		var imagenTarea = document.createElement("img");
		imagenTarea.setAttribute('src', tareasDeHoy[0].image);
		imagenTarea.setAttribute('alt', 'na');
		// imagenTarea.setAttribute('height', '50px');
		// imagenTarea.setAttribute('width', '50px');

		document.getElementById("info").appendChild(tituloActividad);
		document.getElementById("info").appendChild(iconoActividad);
		document.getElementById("iconoActividad").appendChild(imagenTarea);
		document.getElementById("info").appendChild(descripcionActividad);
		document.getElementById("info").appendChild(horaActividad);

		// /////////////////FIN nueva creacion capas 250314 18:07

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

//		for ( var i = 0; i < numEnlaces; i++) {
//
//			document.getElementById("enlace" + i).style.border = "0px";
//		}

	}

	function _keyDown() {
		var keyCode = event.keyCode;
		alert("keycode:"+keyCode);
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
			_incrementaHoraDemo();
			_pantallaDia();
			
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
			_decrementaMinutosDemo();
			_pantallaDia();
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
			_incrementaMinutosDemo();
			_pantallaDia();
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
			_decrementaHoraDemo();
			_pantallaDia();
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