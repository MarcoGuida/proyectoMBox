/**
 * M�dulo de log
 */
var miLog = (function() {
	// M�todos privados

	// privado
	const
	SELECTORTV = "capaDebug";
	const
	NODEBUG = -1, EMU = 0, TV = 1, PC = 2;
	/**
	 * Verbose Debug Info Warning Error
	 */
	const
	LOG_V = 0, LOG_D = 1, LOG_I = 2, LOG_W = 3, LOG_E = 4;
	
	/**
	 * configuracion de mi LOG
	 */
	var DebugDevice = TV,
	DebugLevel = LOG_D,
	
	
	
	divLogElement, count = 0;
	

    /*
	 * 
	 * @tag tag que identifica donde estamos @msg mensaje a mstrar @logLevel
	 * Determina el tipo de log
	 */
    function logger(tag, msg, logLevel) {    
        try {
            var log, logColor, logHtml;

            
            // Nivel de debug
            if ((logLevel >= DebugLevel) && (DebugDevice >= EMU)) {
                
                logColor = _getLogColor(logLevel);
                log = count + " -- "+ tag + " ---- " + msg;
              //  log = _.escape(log);
                
                count++;

                // Dispositivo
                switch (DebugDevice) {
                    case EMU:
                        // alerts para emulador samsung
                        alert(log);
                        break;
                        
                    case TV:
                        // añado elemento si no existe
                        logHtml = '<p style="color:'+ logColor +'">'+log+'</p>';
                        _muestraLogEnPantalla(logHtml);                        
                        break;

                    case PC:
                        // en tv y consola js
                        switch(logLevel){
                        case LOG_V:
                            console.log(log);
                            break;
                        case LOG_D:
                            console.debug(log);
                            break;
                        case LOG_I:
                            console.info(log);
                            break;
                        case LOG_W:
                            console.warn(log);
                            break;
                        case LOG_E:
                            console.error(log);
                            break;
                        }

                        // en pc tb mostramos en pantalla
                        // logHtml = '<p style="color:'+ logColor
						// +'">'+log+'</p>';
                        // _muestraLogEnPantalla(logHtml);
                        break;

                    default:
                        break;
                }                
            }
        } catch (e) {
            // dos formatos
            alert("error en util.log " + e);
            console.log("error en util.log " + e);
        }
    };
	               
    /*
     * Pinta el log en pantalla, crea div si no existe y pinta sobre el
     */
     function _muestraLogEnPantalla(log){
         if(!divLogElement){
             _creaElementoLog();                               
         }
         divLogElement.innerHTML=log+divLogElement.innerHTML;      
     };
     
     function _creaElementoLog(){
         try{
             var div = document.createElement("div");
             div.id=SELECTORTV;
             div.style.position="absolute"
             div.style.overflow="hidden";            
             div.style.top="0";
             div.style.left="0";
             div.style.width="100%";
             div.style.height="100%";  
             div.style.fontWeight="bold";          
             document.body.appendChild(div);
             divLogElement=document.getElementById(SELECTORTV);
         }catch(e){

         }
     };
	               
     /*
      *  Funcion que retorna un string con un color u otro para los logs
      * @logLevel el nivel de log
      * @return String con color
      */
      function _getLogColor(logLevel){
          var logColor = "green";
          
          switch(logLevel){
          case LOG_D:
              logColor="blue";
              break;
          case LOG_I:
              logColor="yellow";
              break;
          case LOG_W:
              logColor="orange";
              break;
          case LOG_E:
              logColor="red";
              break;        
          }
          return logColor;
      };

		
	

		
		
	// metodos publicos
	return {
		
		v : function(tag, msg) {
			logger(tag, msg, LOG_V);
		},
		d : function(tag, msg) {
			logger(tag, msg, LOG_D);
		},
		i : function(tag, msg) {
			logger(tag, msg, LOG_I);
		},
		w : function(tag, msg) {
			logger(tag, msg, LOG_W);
		},
		e : function(tag, msg) {
			logger(tag, msg, LOG_E);
		},
		hideLogs : function() {
			divLogElement.style.display = "none";
		},
		showLogs : function() {
			divLogElement.style.display = "block";
		}
	}
})();