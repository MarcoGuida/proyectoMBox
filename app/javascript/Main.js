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
	var demoMode = true, horaDemo = 19, minutosDemo = 00;
	var plantillaBodyPantallaDia;
	var TAG = "main.js";
	var listadoDiasSemanaESP=["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
	var listadoMesesESP=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
	
	function _onLoad() {
		try {
			addEventHandler(document, "keydown", _keyDown);
			_enableKeys();
			widgetAPI.sendReadyEvent();
			// plantillaBodyPantallaDia = document.getElementById("allContent");
			// alert("plantillaBodyPantallaDia"+plantillaBodyPantallaDia+"-"+plantillaBodyPantallaDia.childNodes.length);
			// importedJSON.prueba();
			// alert(importedJSON.miVariable);
			_pantallaDia();

			// alert(horaActual);
			// alert("fin onLoad");
		} catch (e) {
			miLog.e(TAG, "Error en el catch dl onLoad" + e);
		}
	}
	;

	
	function addEventHandler(obj, eventName, handler) {
		 alert("addEventHandler");
		if (document.attachEvent) {
			obj.attachEvent("on" + eventName, handler);
		} else if (document.addEventListener) {
			obj.addEventListener(eventName, handler, false);
		}
	}
	
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
			minutosDemo++;
		} else {
			minutosDemo = 0;
		}
	}

	function _decrementaMinutosDemo() {
		if (minutosDemo > 0) {
			minutosDemo--;
		} else {
			minutosDemo = 59;
		}
	}

	function _pantallaDia() {
		miLog.v(TAG, "pantallaDia");
		tareasDeHoy = [];
		// userList.init(Main.paintTareas);
		userList.init(Main.restablecePantallaDia);
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
		// miLog.v(TAG, "_pintaBarraHours" + tareasDeHoy.length);

		capaBarraHours = document.getElementById("hours");
		alert("capaBarraHours" + capaBarraHours);
		var escalaHoras = _getHora();

		 var ulBarraHours = "<ul>"
		 + "<li id=\"leftArrow\" class=\"arrows\"><img src=\"\"alt=\"leftArrow\"/></li>";
		// + "<li><a href=\"#\">Ahora<i class=\"mañana\"></i></a></li>";
		 ulBarraHours += "<ul><li><a href=\"#\">Ahora<span class=\"hour-icon hour-icon-"
				+ _getFranja(_getHora())
				+ "\" data-type=\"icon\" style=\"display: block; top: 30px; background-position: left top;\"></span></a></li>";

		// for ( var i = 1; i < 5; i++) {
		// ulBarraHours += "<li><a href=\"#\">" + escalaHoras++
		// + ":00</a></li>";
		// }

		// alert("tareasDeHoy"+tareasDeHoy[0].hora);

		var tareasBarra = 0;

		// miLog.v(TAG, "hora actal" + _getHora());
		// document.getElementById("fecha").innerHTML = _getHora();
		for ( var i = 0; i < tareasDeHoy.length; i++) {

			// alert("tareasDeHoy[i].hora"+tareasDeHoy[i].hora);
			var descomponeHora = (tareasDeHoy[i].hora).split(":");
			miLog.v(TAG, "descomponeHora[0] y de [1]" + descomponeHora[0]
					+ "***" + descomponeHora[1]);

			var minDiaTarea = Number(descomponeHora[0] * 60)
					+ Number(descomponeHora[1]);
			miLog.v(TAG, "minDiaTarea" + minDiaTarea);
			miLog.v(TAG, "minDiaActual" + _getMinutesTotalDia());

			if (minDiaTarea >= _getMinutesTotalDia()) {
				miLog.v(TAG, "tarea futura");
				// ulBarraHours += "<li><a href=\"#\">" + tareasDeHoy[i].hora +
				// "</a></li>";

				ulBarraHours += "<li><a href=\"#\">" + tareasDeHoy[i].hora
						+ "<span class=\"hour-icon hour-icon-"
						+ _getFranja(tareasDeHoy[i].hora)
						+ "\" data-type=\"icon\"></span></a></li>";

			} else {
				miLog.v(TAG, "tarea pasada");
			}
			if(i>=5)
				{
				break;
				}
		}

		ulBarraHours += "</ul><div id=\"rightArrow\" class=\"arrows\"><a href=\"#\"></a></div>"
				+ "<a class=\"hour_next\" href=\"#\"></a>"
				+ "<a class=\"hour_prev\" href=\"#\"></a>";

		capaBarraHours.innerHTML = ulBarraHours;
		alert("_pintaBarraHours");
	}

	function _borraTodoElBody() {
		miLog.d(TAG, "voy a vaciar el body: " + document.body.hasChildNodes());
		while (document.body.hasChildNodes()) {
			miLog.d(TAG, "eliminando en body");
			alert("eliminando...")
			document.body.removeChild(document.body.firstChild);
		}
		miLog.d(TAG, "body vacio");
	}

	function _creaDivHTML(id, inner, appendTo, claseAsociada) {
		var element = document.createElement("div");
		element.innerHTML = inner;
		element.setAttribute('id', id);

		if (claseAsociada.length > 0) {
			element.setAttribute('class', claseAsociada);

		}

		if (appendTo === document.body) {
			document.body.appendChild(element);
		} else {
			document.getElementById(appendTo).appendChild(element);
		}

	}

	function _creaImgHTML(classAtribute, source, appendTo) {
		var element = document.createElement("img");
		element.setAttribute('class', classAtribute);
		element.setAttribute('src', source);
		// unaIMG.setAttribute('alt', altName);
		document.getElementById(appendTo).appendChild(element);
	}

	function _restableceAnchor() {
		miLog.d(TAG, "restablece Anchor");
		//document.body.innerHTML = "<a href=\"javascript:void(0);\" id=\"anchor\" onkeydown=\"Main.keyDown();\"></a>";
		document.body.innerHTML = "<a href=\"javascript:void(0);\" id=\"anchor\"></a>";
		// alert(document.body.innerHTML);
		alert("anchor restablecido");
	}

	function _restableceIconoUsu(nombreUsu, iconoUsu) {
		_creaImgHTML("image-perfil", iconoUsu, "perfil");
	}

	function _restableceBotonera() {
		document.getElementById("nav").innerHTML = "<ul>"
				+ "<li id=\"botonDay\" class=\"boton animate\">Ahora</li>"
				+ "<li id=\"botonWeek\" class=\"boton animate\">Semana</li>"
				+ "<li id=\"botonAlerts\" class=\"boton animate\">Alertas</li>"
				+ "<li id=\"botonGames\" class=\"boton animate\">Diversión</li>"
				+ "<li id=\"botonSettings\" class=\"boton animate\">Ajustes</li>"
				+ "<li id=\"botonExit\" class=\"boton animate\">Salir</li>"
				+ "</ul>";
	}

	function _restableceHeader(nombreUsu, iconoUsu) {
		_creaDivHTML("header", "", document.body, "");
		_creaDivHTML("perfil", "", "header", "");

		_restableceIconoUsu(nombreUsu, iconoUsu);
		_creaDivHTML("name", nombreUsu, "perfil", "");

		_creaDivHTML("nav", "", "header", "");
		_restableceBotonera();

		
		_creaDivHTML("fechaActual", _getStringFechaActual(), "header", "");
		_creaDivHTML("horaActual","Son las "+_getHora()+" de la "+_getFranja(_getHora()), "header", "");
	}

	function _getStringFechaActual() {
		var stringFechaActual="";
		
		alert(listadoDiasSemanaESP[_getDiaSemana()]);
		stringFechaActual+=listadoDiasSemanaESP[_getDiaSemana()]+", "+fechaActual.getDate()+" de "+listadoMesesESP[fechaActual.getMonth()]+" de "+fechaActual.getFullYear();
		return stringFechaActual;
	}
	
	
	
	function _dibujaDigits(hora) {
		var creaDigits = "";

		var cadaDigitHora = (hora).split(":");// <------------------------

		var stringHora = cadaDigitHora[0] + cadaDigitHora[1];

		alert(stringHora + "/*/*" + stringHora.length);

		for ( var i = 0; i < stringHora.length; i++) {
			
			alert("LEO:-->"+stringHora[i]);
			creaDigits += "<div class=";
			switch (stringHora[i]) {
			case "0":
				creaDigits += "\"zero\">";
				break;

			case "1":
				creaDigits += "\"one\">";
				break;

			case "2":
				creaDigits += "\"two\">";
				break;

			case "3":
				creaDigits += "\"three\">";
				break;

			case "4":
				creaDigits += "\"four\">";
				break;

			case "5":
				creaDigits += "\"five\">";
				break;

			case "6":
				creaDigits += "\"six\">";
				break;

			case "7":
				creaDigits += "\"seven\">";
				break;

			case "8":
				creaDigits += "\"eight\">";
				break;

			case "9":
				creaDigits += "\"nine\">";
				break;

			default:
				creaDigits += "\"zero\">";

				break;
			}

			creaDigits += "<span class=\"d1\"></span>"
					+ "<span class=\"d2\"></span>"
					+ "<span class=\"d3\"></span>"
					+ "<span class=\"d4\"></span>"
					+ "<span class=\"d5\"></span>"
					+ "<span class=\"d6\"></span>"
					+ "<span class=\"d7\"></span>" + "</div>";

			if (i == 1) {
				creaDigits +="<div class=\"dots\"></div>";
			}

		}



		return creaDigits;

	}

	function _restableceContent(titulo, icono, desc, hora) {
		_creaDivHTML("content", "", document.body, "");
		_creaDivHTML("info", "", "content", "");
		_creaDivHTML("tituloActividad", "<h1>" + titulo + "</h1>", "info", "");
		_creaDivHTML("iconoActividad", "", "info", "");
		_creaImgHTML("", icono, "iconoActividad", "");
		_creaDivHTML("descripcionActividad", desc, "info", "");
		_creaDivHTML("horaActividad", "<h3>Hora:</h3>", "info", "");

		_creaDivHTML("clock", "", "horaActividad", "light");
		_creaDivHTML("display", "", "clock", "display");
		_creaDivHTML("", "", "display", "weekdays");
		_creaDivHTML("", "", "display", "ampm");
		_creaDivHTML("", "", "display", "alarm");
		_creaDivHTML("", _dibujaDigits(hora), "display", "digits");

		_creaDivHTML("hours", "", "content", "");
		// _creaDivHTML("hours", "", "content");

	}

	function _restablecePantallaDia(jsonDataRecv) {
		_borraTodoElBody();
		_restableceAnchor();

		var jsonArray = importedJSON.parseaJSON(jsonDataRecv);
		for ( var i = 2; i < jsonArray.length; i++) {
			tareasSemana.push(jsonArray[i]);
		}
		alert("json Array creado:" + jsonArray.length);

		// JsonArray de 0 y de 1 son nombre usuario e icono usuario
		_restableceHeader(jsonArray[0], jsonArray[1]);
		alert("Header Restablecido");

		// //////
		// 210414se puede optimizar, me hace falta para pintar solo la proxima
		// tarea

		for ( var i = 0; i < (tareasSemana[_getDiaSemana()].tarea).length; i++) {

			alert(tareasSemana[_getDiaSemana()].tarea[i].hora);
			tareasDeHoy.push(tareasSemana[_getDiaSemana()].tarea[i]);
		}

		var titulo, icono, desc, hora;

		for ( var i = 0; i < tareasDeHoy.length; i++) {

			// alert("tareasDeHoy[i].hora"+tareasDeHoy[i].hora);
			var descomponeHora = (tareasDeHoy[i].hora).split(":");
			miLog.v(TAG, "descomponeHora[0] y de [1]" + descomponeHora[0]
					+ "***" + descomponeHora[1]);

			var minDiaTarea = Number(descomponeHora[0] * 60)
					+ Number(descomponeHora[1]);
			miLog.v(TAG, "minDiaTarea" + minDiaTarea);
			miLog.v(TAG, "minDiaActual" + _getMinutesTotalDia());

			if (minDiaTarea >= _getMinutesTotalDia()) {
				miLog.v(TAG, "tarea futura");

				alert("prueba 2104");
				alert(tareasDeHoy[i].title);
				alert(tareasDeHoy[i].image);
				alert(tareasDeHoy[i].description);
				alert(tareasDeHoy[i].hora);

				titulo = tareasDeHoy[i].title;
				icono = tareasDeHoy[i].image;
				desc = tareasDeHoy[i].description;
				hora = tareasDeHoy[i].hora;
				alert("prueba 2104");
				break;

			} else {
				miLog.v(TAG, "tarea pasada");
			}

		}

		// 210414
		// //////

		// alert(titulo);
		// alert(icono);
		// alert(desc);
		// alert(hora);
		_restableceContent(titulo, icono, desc, hora);// <----------------------------
		alert("voy a pintar la barra de horas");
		_pintaBarraHours();
		alert("Content Restablecido");

	//	_creaDivHTML("id3", "prueba3");
	//	_creaImgHTML(
		//		"prueba",
		//		"http://rlv.zcache.es/pequeno_icono_del_ciclomotor_pegatina-r5c3585660891443c983ac62adf063005_v9waf_8byvr_512.jpg",
		//		"id3");
		// alert(document.body.innerHTML);
	}

	function _paintTareas(jsonDataRecv) {

		tareasSemana = [];
		for ( var i = 2; i < jsonArray.length; i++) {
			tareasSemana.push(jsonArray[i]);
			// alert(jsonArray[i].tarea);
		}

		// alert(diaSemana);
		miLog.v(TAG, "tarea semana length" + tareasSemana.length);
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

		// for ( var i = 0; i < numEnlaces; i++) {
		//
		// document.getElementById("enlace" + i).style.border = "0px";
		// }

	}

	function _keyDown() {
		var keyCode = event.keyCode;
		alert("keycode:" + keyCode);
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
			//resetButtons();
			_incrementaHoraDemo();
			//_pantallaDia();
			_onLoad();
			// widgetAPI.putInnerHTML(info, "Has pulsado 2");
			break;
		case tvKey.KEY_3:
			alert("3");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 3");
			break;
		case tvKey.KEY_4:
			alert("4");
			//resetButtons();
			_decrementaMinutosDemo();
			//_pantallaDia();
			_onLoad();
			// widgetAPI.putInnerHTML(info, "Has pulsado 4");
			break;
		case tvKey.KEY_5:
			alert("5");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 5");
			break;
		case tvKey.KEY_6:
			alert("6");
			//resetButtons();
			_incrementaMinutosDemo();
			//_pantallaDia();
			_onLoad();
			// widgetAPI.putInnerHTML(info, "Has pulsado 6");
			break;
		case tvKey.KEY_7:
			alert("7");
			resetButtons();
			// widgetAPI.putInnerHTML(info, "Has pulsado 7");
			break;
		case tvKey.KEY_8:
			alert("8");
			//resetButtons();
			_decrementaHoraDemo();
			//_pantallaDia();
			_onLoad();
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
		// paintTareas : function(jsonDataRecv) {
		// _paintTareas(jsonDataRecv);
		// }

		restablecePantallaDia : function(jsonDataRecv) {
			_restablecePantallaDia(jsonDataRecv);
		}
	};
})();