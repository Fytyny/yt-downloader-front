var app = angular.module('app');
app.controller('sessionCtrl', ['$scope','$interval','sessionFactory','downloadRequestFactory'
, function ($scope,$interval, SessionFactory,DownloadRequestFactory) {
    $scope.overwrite = $scope.$eval(window.localStorage.getItem("overwrite"))
    $scope.audio = true;
    $scope.video = false;
    $scope.records = {}
    $scope.isAdvanced = false
    $scope.advanced = {}
    $scope.advanced.time = stringValue(400);
    $scope.advanced.slider = createSlider(450)
     $scope.closeAdvancedClick = function(){
            console.log("closing " +  $scope.isAdvanced )
            $scope.isAdvanced = false
        }

    $scope.overwriteOnChange = function(){
            console.log("overwrite on change " + $scope.overwrite)
            var overwriteBool = $scope.overwrite
            console.log("changed to " + overwriteBool)

        window.localStorage.setItem('overwrite',overwriteBool)
    }
   $scope.advancedClick = function(){
       console.log("advanced")
       var url = $scope.link;
       var resp = DownloadRequestFactory.getAdvanced(url, SessionFactory.get()).then(function(response){
            console.log(response)

            var data = response.data
            $scope.advanced.mediaType = getType()
            $scope.advanced.title = data.title
            $scope.advanced.duration = data.length
            $scope.advanced.time = stringValue(data.length)
            $scope.advanced.thumbnail = data.thumbnail;
            $scope.advanced.slider = createSlider(data.length)
            $scope.advanced.url = url
            console.log($scope.advanced)
            $scope.isAdvanced = true;
            console.log($scope.isAdvanced)

        });
   }

    var getType = function(){
        var type;
        if ($scope.audio && $scope.video)
        {
            type = "audiovideo";
        }
        else if ($scope.audio){
            type = "audio";
        }
        else
        {
            type = "video";
        }
        return type
    }

    $scope.updateMediaType = function(mediaType,val)
    {
        if ("audio" === mediaType && val == false && $scope.video == false)
        {
            $scope.video = true;
        }
        else if ("video" === mediaType && val == false && $scope.audio == false)
        {
            $scope.audio = true;
        }
    }

    $scope.downloadClick = function(){
        var type = getType()
        
        console.log("download " + $scope.link);
        console.log("download " + type);
        var properties = {
            mediaType : type,
            overwrite : $scope.overwrite
        }

        if ($scope.link != null){
            var req = DownloadRequestFactory.get($scope.link,properties,SessionFactory.get());
            console.log(req);
            DownloadRequestFactory.initDownload(req).then(function(response){
                console.log(response);
                $scope.records[response.data.id] = response.data;    
            });
        }
    }

    $scope.downloadAdvancedClick = function(){
        $scope.isAdvanced = false
        console.log($scope.advanced.slider.min)
        console.log($scope.advanced.slider.min)
        $scope.advanced.overwrite = $scope.overwrite
        var req = DownloadRequestFactory.getAdvancedRequest($scope.advanced,SessionFactory.get())
        DownloadRequestFactory.initDownload(req).then(function(response){
            console.log(response);
            $scope.records[response.data.id] = response.data;    
        });
    }


    var updateDownloads = function(){
        console.log("update");
        DownloadRequestFactory.getCurrentDownloads(SessionFactory.get()).then (function(response){

            var list = response.data.logObserversDTOList;

            if ($scope.downloads == null){
                $scope.downloads = list;

            } else {
                var finished = [];
                for (j = 0; j<$scope.downloads.length; j++ ){
                    if ($scope.downloads[j].state === 'finished'){
                        finished.push(j);
                    }
                }

                for (i = 0; i< finished.length; i++){
                    $scope.downloads.splice(finished[i],1);
                }

                for (i=0; i<list.length; i++){
                    var e = -1;
                    for (j = 0; j<$scope.downloads.length; j++ ){
                        if ($scope.downloads[j].recordUUID === list[i].recordUUID){
                            e = j;
                        }
                    }

                    if (e < 0){
                        $scope.downloads.push(list[i]);
                    } else {
                        $scope.downloads[e].state = list[i].state;
                        $scope.downloads[e].title = list[i].title;
                        $scope.downloads[e].percentage = list[i].percentage;
                    }

                }

                for (j = 0; j<$scope.downloads.length; j++ ){
                    var e = -1;
                    for (i=0; i<list.length; i++){
                        if ($scope.downloads[j].recordUUID === list[i].recordUUID){
                            e = j;
                        }
                    }
                    if (e < 0){
                        $scope.downloads[j].percentage = 100;
                        $scope.downloads[j].state = 'finished';
                    }
                }

            }
            console.log($scope.downloads);
        });
       }
    
    $scope.useInterval = function() {
        //Show current seconds value 5 times after every 1000 ms
        $interval(updateDownloads, 1000);
  
      };

    $scope.useInterval();
    $scope.enableDownload = true;
  
    
    SessionFactory.get().then(function (response){
        var token = SessionFactory.get();
        var result = token == null || token == 'error';
        
        if (!result){
            $scope.enableDownload = result;
            var $loadingIcon = $('#loadingIcon');
            $loadingIcon.hide('slow', function(){ $loadingIcon.remove(); });
        } else {
            $scope.errorBand = {
                title: "Error!",
                message: "Could not reach the server. Please refresh to try again!"
            };
            $scope.isError =true;
        }
    });

}]);