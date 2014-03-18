var importedJSON = (function() {
	
	var _miVariable=0;
	
	function _init() {


	};
	

function _prueba() {
	alert("prueba imported JSON");

	_miVariable=10;
	alert("Ahora mi variable vale: "+_miVariable);
	return 0;
}
	
	
function _parseaJSON(jsonImportado) {
	alert("parseaJSON");
	//alert(jsonImportado.user.nombre);
	var arrayJSON= [];
	
	//var usuario=jsonImportado.user.nombre;
	//var enlaceIconUser=jsonImportado.user.icono;
	//alert(usuario+" - "+enlaceIconUser);
	//alert("usu y contras impostados "+usuario);

	arrayJSON.push(jsonImportado.user.nombre);
	arrayJSON.push(jsonImportado.user.icono);
	

	arrayJSON.push(jsonImportado.plan.lun);
	arrayJSON.push(jsonImportado.plan.mar);
	arrayJSON.push(jsonImportado.plan.mie);
	arrayJSON.push(jsonImportado.plan.jue);
	arrayJSON.push(jsonImportado.plan.vie);
	arrayJSON.push(jsonImportado.plan.sab);
	arrayJSON.push(jsonImportado.plan.dom);

	

//	for ( var int = 0; int < arrayJSON.length; int++) {
//		alert("numero: "+int+" valor: "+arrayJSON[int]);
//	}
	return arrayJSON;
	
};




	

	// metodos publicos
return {

	miVariable : _miVariable,
	
	init : function() {
		return _init();
	},	
	prueba : function() {
		return	_prueba();
	},
	parseaJSON : function(jsonImportado) {
		return	_parseaJSON(jsonImportado);
	}
};
})();