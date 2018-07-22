
/**
* basic proxy for http calls for CRUD server
* maps create, read, update and delete requests to http post, get, put and delete calls respectively
*/
class CRUDService {
    constructor($http, $rootScope) {        
        var url = window.location.href;
        var homePosition = url.indexOf('/', window.location.origin.length+1)
        this._serverUrl = url.substring(0,homePosition);
        // test if we in "debug" mode and change url for debuggin: 
       
        let debugRegex = /localhost:\d+/;        
        if(debugRegex.test(url))
        {           
            this._serverUrl = 'http://'+window.location.hostname+'/PhyManagementServerWeb';
        }
        this.$http = $http;
        this.$rootScope = $rootScope;
    }

    //generic (private) CRUD requests
    _create(request, data) {
        return this.$http.post(this._serverUrl + request, data,  {withCredentials: true,}).error((exception, status)=>{this._errorCallback(exception, status)}).then(result => result.data);
    }
    _read(request) {
        return this.$http.get(this._serverUrl + request,  {withCredentials: true,}).error((exception, status)=>{this._errorCallback(exception, status)}).then(result => result.data);
    }
    _update(request, data) {
        return this.$http.put(this._serverUrl + request, data,  {withCredentials: true,}).error((exception, status)=>{this._errorCallback(exception, status)}).then(result => result.data);
    }
    _delete(request, data) {
        return this.$http.delete(this._serverUrl + request, {withCredentials: true,}).error((exception, status)=>{this._errorCallback(exception, status)}).then(result => result.data);
    }
    _post(request, data) {       
        return this.$http.post(this._serverUrl + request, data,  {withCredentials: true,}).error((exception, status)=>{this._errorCallback(exception, status)});
    }
    _getUrl() { return this._serverUrl; }

    _uploadFile(request, data) 
    {
        var request = {
            method: 'POST',
            url: this._serverUrl + request,
            data: data,
            headers: {
                'Content-Type': undefined
            }
        };

        // SEND THE FILES.
        this.$http(request).error((exception, status)=>{this._errorCallback(exception, status)});
    }

    _successCallback(response)
    {
        console.log("_successCallback " + response)
    }
    _errorCallback(exception, status)
    {
        if(status == 401) //not authenticated
        {
            alert('TBD TRANSLATE RE-LOGIN');
            window.location.href = '#/';
            location.reload(true);
        }

        if(exception)
        {
            if(exception.ExceptionMessage)
                this.$rootScope.$emit(Event.serverError, exception.ExceptionMessage);
            else
                this.$rootScope.$emit(Event.serverError, exception);
        }
    }
}

export default CRUDService;
