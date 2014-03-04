var importedJSON = (function() {

	function _init() {
		
		

	};
	

function _prueba() {
	alert("prueba imported JSON");
	return 0;
}
	
	
function _parseaJSON(jsonImportado) {
	var arrayJSON= [];
	alert(jsonImportado.plan.lun);
	
	
	
	
	//var usuario=jsonImportado.user.nombre;
	//var enlaceIconUser=jsonImportado.user.icono;
	//alert(usuario+" - "+enlaceIconUser);
	//alert("usu y contras impostados "+usuario);
//	arrayJSON.push("1");
//	arrayJSON.push("2");
//	arrayJSON.push("3");
	
	
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
	
	init : function() {
		return _init();
	},	
	prueba: function() {
		return	_prueba();
	},
	parseaJSON: function(jsonImportado) {
		return	_parseaJSON(jsonImportado);
	}
};
})();