function DownloadRequestFactory($http){
    var preparedRequest = {
        method: 'POST',
        url: 'http://localhost:8080/DYT/rest/download/initialize',
        headers: {
         'Content-Type': 'application/json'
        }
        //data needed
    };

    function initDownload(req){

        return http = $http(req)

    }

    return {
        get : function(link, properties, session){
            if (link == null){
                throw "link not defined";
            }
            if (session == null){
                throw "session not defined";
            }
            if (properties == null || properties.mediaType == null){
                throw "properties not defined";
            }

            var req = {
                method: preparedRequest.method,
                url : preparedRequest.url,
                headers : preparedRequest.headers
            }
            req.headers['X-session-token'] = session;
            var data = {}
            data['mediaType'] = properties.mediaType;
            if (properties.overwrite != null){
                data['overwrite'] = properties.overwrite;
            }
            data['url'] = link;
            data['isTimed'] = false;
            req.data = data;
            return req;
        },
        initDownload : function(req){
            if (req == null){
                throw "request not defined";
            }
            return initDownload(req);
        },
        getCurrentDownloads : function(session){
            var req = {
                method: 'GET',
                url: 'http://localhost:8080/DYT/rest/download/current/all',
                headers: {
                    'X-session-token': session
                }
            }
            return http = $http(req);

        },
        getAdvanced : function (url,session){
            var req = {
                method: preparedRequest.method,
                url : 'http://localhost:8080/DYT/rest/download/getInfo',
                headers : preparedRequest.headers,
                data : url
            }
            if (session == null){
                throw "session not defined";
            }

            req.headers['X-session-token'] = session;
            return $http(req);
        },
        getAdvancedRequest : function(advanced,session){
            var req = {
                method: preparedRequest.method,
                url : preparedRequest.url,
                headers : preparedRequest.headers,
                data : {}
            }

            if (session == null){
                throw "session not defined"
            }

            if (advanced == null){
                throw "advanced not defined"
            }

            if (advanced.slider == null){
                throw "slider not defined"
            }

            if (advanced.slider.min == null){
                throw "slider.min not defined"

            }

            if (advanced.slider.max == null){
                throw "slider.max not defined"

            }
            
            if (advanced.duration == null){
                throw "duration not defined"

            }

            if (advanced.url == null){
                throw "url not defined"
            }

            var isTimed = function(min,max,duration){
                return min != 0 || max != duration;
            }
            req.data.url = advanced.url
            req.data['mediaType'] = advanced.mediaType;
          
            req.data['isTimed'] = isTimed(advanced.slider.min,advanced.slider.max, advanced.duration)
            if (req.data.isTimed){
                req.data['timeFrom'] = advanced.slider.min
                req.data['timeTo'] = advanced.slider.max
            }

            if (advanced.overwrite != null){
                req.data['overwrite'] = advanced.overwrite;
            }
            
            return req
            
        }
    }
}
var app = angular.module('app.FactoryModule');
app.factory("downloadRequestFactory", DownloadRequestFactory);

