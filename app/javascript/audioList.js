/********************************************************************
 *********************************************************************
 **
 **  Autor ilopez@magicbox.es
 **
 **  Modulo encargado de adquirir el fichero json de Audios y gestionarlo
 ** 
 **
 *********************************************************************
 ********************************************************************/
var audioList = (function() {
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
        audioList = [],
        _callback;

    /*
    * Funcion privada inicializa y adquiere lista Audio
    * @callback funcion que sera llamada cuando se descargue
    *  la lista de forma correcta
    */
    function _init(callback){
		
        _callback=callback;
        _fetchAudioList();
    };

    /*
     * Funcion privada que obtiene el audioList    
     */

    function _fetchAudioList() {
        try {
            var xhrObj = new XMLHttpRequest();
            xhrObj.onreadystatechange =  function _xhrReadyStateChange() {
            	try {
            		//No usamos switch porque hay que tratar codigo y estado
            		if (STATE_FINISH === xhrObj.readyState && STATUS_OK === xhrObj.status) {
            			audioList = JSON.parse(xhrObj.responseText).page.items;
            			_callback(audioList);
            		}
            	} catch (e) {
            		alert("error tratando estados objeto xhr")
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

    function _getAudio(index) {
        var retorno=null,
		
            aux = audioList[index];
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

    function _getActualAudioURL() {
        var retorno = null,
            aux = _getAudio(index);        
       
        if (aux) {
            retorno = aux.link;
        }
        return retorno;
    }
	
	/*
     * Funcion privada obtiene url Audio que indiquemos
     * @return url Audio indicado o null
     */

    function _getAudioURL(indice) {
        var retorno = null,
            aux = _getAudio(indice);        
       
        if (aux) {
            retorno = aux.link;
        }
        return retorno;
    }
	

    /*
     * Funcion privada incrementa el numero de Audio
     */

    function _nextAudio() {
        log.d("nextAudio","valor de index/length "+index+"/"+audioList.length);
        if (index < audioList.length-1) {
            index++;
        } else {
            index = 0;
        }
    }

    
    /*
     * Funcion privada incrementa el numero de Audio
     */

    function _getAudioCount() {
        return audioList.length; 
    }    

    // Parte publica
    return {
        init: function(callback) {
            _init(callback);
        },
        getAudioCount: function() {
            return audioList.length;
        },
        getAudio: function(index) {
            return _getAudio(index);
        },
        getActualAudioURL: function() {
            return _getActualAudioURL();
        },
        nextAudio: function() {
            return _nextAudio();
        },
        getAudioURL: function() {
            return _getAudioURL();
        }		
		
    }

})();