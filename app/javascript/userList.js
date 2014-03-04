var userList = (function() {
    /*
     * Constante para el log
     */
    var TAG = "server.js";	
    /*
     * Constante peticion ajax finalizada
     */
    var STATE_FINISH = 4;
    /*
     * Constante Status ok descarga
     */
    var STATUS_OK = 200;
    /*
     * Constante URL acceso a Audios
     */
    //const URL = "audioList.json";
    //const URL = "https://pre.orbyt.tv/stb_static/smarttv/playlist.xml";
    //const URL = "https://pre.orbyt.tv/stb_static/smarttv/playlist.json";
	var URL = "./data/data.json";
    
    /*
     * Indice, Lista de Audios y funcion de callback
     */
    var index = 0,
    	pagina=1,
        userList = [],
        _callback;

    /*
    * Funcion privada inicializa y adquiere lista Audio
    * @callback funcion que sera llamada cuando se descargue
    *  la lista de forma correcta
    */
    function _init(callback){
		
        _callback=callback;
        _fetchUserList();
    };

    /*
     * Funcion privada que obtiene el audioList    
     */

    function _fetchUserList() {
        try {
            var xhrObj = new XMLHttpRequest();
            xhrObj.onreadystatechange =  function _xhrReadyStateChange() {
        		//alert("xhrObj.status"+xhrObj.status);
            	try {
            		//alert("entra en el try"+xhrObj.readyState+"---"+xhrObj.status);
            		//No usamos switch porque hay que tratar codigo y estado
            		
            		if (STATE_FINISH === xhrObj.readyState && STATUS_OK === xhrObj.status) {
            		//	alert("userList:"+xhrObj.responseText);
            			userList = JSON.parse(xhrObj.responseText).xml;
            		//	alert("userList:"+userList);
            		//	alert("_fetchUserList");
            			_callback(userList);
            		}
            		
            	} catch (e) {
            		alert("error tratando estados objeto xhr");
            	}

            }
            xhrObj.open("GET", URL);
            xhrObj.send(null);
        } catch (e) {
            alert("Failed to create XHR");
        }
    };

    /*
     * Funcion privada retorna Audio actual
     * @return objeto js Audio o null
     *   objJS.title objJS.link objJS.description
     */

    function _getUser(index) {
        var retorno=null,
		
            aux = userList[index];
        if (aux) {
            retorno = aux;
        } else {
            retorno = null;
        }
        return retorno;
    }

    /*
     * Funcion privada obtiene url Audio actual
     * @return url Audio actual o null
     */

    function _getActualUserURL() {
        var retorno = null,
            aux = _getUser(index);        
       
        if (aux) {
            retorno = aux.link;
        }
        return retorno;
    }
	
	/*
     * Funcion privada obtiene url Audio que indiquemos
     * @return url Audio indicado o null
     */

    function _getUserURL(indice) {
        var retorno = null,
            aux = _getUser(indice);        
       
        if (aux) {
            retorno = aux.link;
        }
        return retorno;
    }
	

    /*
     * Funcion privada incrementa el numero de Audio
     */

    function _nextUser() {
        log.d("nextUser","valor de index/length "+index+"/"+userList.length);
        if (index < userList.length-1) {
            index++;
        } else {
            index = 0;
        }
    }

    
    /*
     * Funcion privada incrementa el numero de Audio
     */

    function _getUserCount() {
        return userList.length; 
    }    

    // Parte publica
    return {
        init: function(callback) {
            _init(callback);
        },
        getUserCount: function() {
            return userList.length;
        },
        getUser: function(index) {
            return _getUser(index);
        },
        getActualUserURL: function() {
            return _getActualUserURL();
        },
        nextUser: function() {
            return _nextUser();
        },
        getUserURL: function() {
            return _getUserURL();
        }		
		
    }

})();