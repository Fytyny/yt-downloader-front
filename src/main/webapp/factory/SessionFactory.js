function SessionFactory($http) {

    var _token = null;
     var request = {
         method: 'GET',
         url: 'http://localhost:8080/DYT/rest/session/create',
         headers: {
          'Content-Type': 'application/json'
         }
     };
 
     function getSession(req) { 
         return http = $http(req).then(function successCallback(response){
             _token = response.data.token;
         },function failed(response){
             _token = 'error';
         });
     };
     return {
         get : function(){
             if (_token == null){
                 _started = true;
                 return getSession(request);
             } else {
                 return _token;
             }
         }
     }
 }
 var app = angular.module('app.FactoryModule');
app.factory("sessionFactory", SessionFactory);