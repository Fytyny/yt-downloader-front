/**
 *
 *
 * This module serves as replacement for defaultcontroller to do tests of advanced tab and stuff
 */

var app = angular.module('app');
app.controller('sessionCtrl', ['$scope','$interval','sessionFactory','downloadRequestFactory'
, function ($scope,$interval, SessionFactory,DownloadRequestFactory) {
    // Do something with myService
    console.log("sge");
    $scope.records = {}
    $scope.isAdvanced = false
    $scope.advanced = {}
    $scope.advanced.title = "TEST"
    $scope.advanced.time = stringValue(400);
    $scope.advanced.thumbnail = "https://www.wykop.pl/cdn/c3397993/link_rVUzj23QubhQcjw4wvkg9kA7pUBgfBXf,w400h200.jpg"
    $scope.advanced.slider = createSlider(450) 
   
    
    setTimeout(function(){
        $scope.isAdvanced = true;
   
    },5000)
    setTimeout(function(){
        
        var download = {
            title: "sefs",
            state:"sf",
            percentage: 80
        }; 
        $scope.downloads=[]
        $scope.downloads.push(download)
    },2000)

    $scope.priceSlider = 150;
   
   $scope.advancedClick = function(){
        var resp = DownloadRequestFactory.getAdvanced($scope.link, SessionFactory.get()).then(function(response){
            var data = response.data
            $scope.advanced.title = data.title
            $scope.advanced.time = stringValue(data.length)
            $scope.advanced.thumbnail = data.thumbnail;
            $scope.isAdvanced = true
            $scope.advanced.slider = createSlider(data.length)
        });
   }
    
    $scope.downloadClick = function(){
        var type = "audio"
        if ($scope.type != null){
            type = $scope.type;
        }
        
        console.log("download " + $scope.link);
        console.log("download " + type);
        var properties = {
            mediaType : type
        }

        if ($scope.link != null){
            var req = DownloadRequestFactory.get($scope.link,properties,SessionFactory.get());
            console.log(req);
            DownloadRequestFactory.initDownload(req).then(function(response){
                console.log(response);
                $scope.records[response.data.id] = response.data;    
            });
        } else {

        }
    }

    $scope.downloadAdvancedClick = function(){
        $scope.isAdvanced = false
        console.log($scope.advanced.slider.min)
        console.log($scope.advanced.slider.max)
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