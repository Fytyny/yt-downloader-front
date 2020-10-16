describe('AdvancedDownloadTest', () => {
    var mockedSession, mockedDRF,$controller, $rootScope;
    const sessionName = "bla"
    let expected = "";
    const link = "wp.pl"

    const getAdvancedResponse = {
      title: "SPROBOWALAM FLOATINGU!",
      author: "UChjLWyTH8-4ooMacZO-P6Jw",
      length: "587",
      thumbnail: "https://i.ytimg.com/vi/jdqqx1Y78Gs/maxresdefault.jpg",
      formats: [
        "249 - audio only (DASH audio)",
        "250 - audio only (DASH audio)",
        "171 - audio only (DASH audio)",
        "251 - audio only (DASH audio)",
        "140 - audio only (DASH audio)",
        "160 - 256x144 (144p)",
        "278 - 256x144 (144p)",
        "133 - 426x240 (240p)",
        "242 - 426x240 (240p)",
        "243 - 640x360 (360p)",
        "134 - 640x360 (360p)",
        "244 - 854x480 (480p)",
        "135 - 854x480 (480p)",
        "247 - 1280x720 (720p)",
        "136 - 1280x720 (720p)",
        "43 - 640x360 (medium)",
        "18 - 640x360 (medium)",
        "22 - 1280x720 (hd720)",
        "136 - 1280x720 (720p)+140 - audio only (DASH audio)",
        "136 - 1280x720 (720p)",
        "140 - audio only (DASH audio)"
      ]
    }
    beforeEach(module('app', function($provide) {
        mockedDRF = {
          initDownload : jasmine.createSpy("initDownload").and.callFake(function(req){
            return {
              then : function(fun){
                var response = {
                  data : {
                    id : 0
                  }
                }
                fun(response)
            }
          }
          }),
          getAdvancedRequest : jasmine.createSpy("getAdvancedRequest").and.callFake(function(advanced,session){
            expect(advanced.duration).toBeDefined()
            expect(advanced.slider).toBeDefined()
            expect(advanced.url).toBeDefined()
            expect(advanced.slider.max).toBeDefined()
            expect(advanced.slider.min).toBeDefined()
            expect(advanced.mediaType).toBeDefined()
            expect(session).toEqual(sessionName)
          }),
          getAdvanced : jasmine.createSpy("getAdvanced").and.callFake(function (url,session){
            expect(session).toEqual(sessionName)

            return {
              then : function(fun){
                var reponse = {
                  data : getAdvancedResponse
                }
                fun(reponse)
              }
            }
          })
        }
        mockedSession = {
            firstCall : true,
            get : function(){
                if (this.firstCall){
                  this.firstCall = false
                  return {
                    then : function(){}
                  }
                } else{ 
                  return sessionName;
                }
            }
        }
        $provide.value('downloadRequestFactory', mockedDRF);
        $provide.value("sessionFactory",mockedSession);
     }))

    beforeEach(inject(function(_$controller_, _$rootScope_){

      // The injector unwraps the underscores (_) from around the parameter names when matching
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    }));
 
    it('should make request', () => {
       var $scope = $rootScope.$new();
       var controller = $controller('sessionCtrl', { $scope: $scope });
       $scope.advanced.title = "TEST"
       $scope.advanced.url = link
       $scope.advanced.duration = 400
       $scope.advanced.time = stringValue(400);
       $scope.advanced.mediaType = "video"
       $scope.advanced.thumbnail = "https://www.wykop.pl/cdn/c3397993/link_rVUzj23QubhQcjw4wvkg9kA7pUBgfBXf,w400h200.jpg"
       $scope.advanced.slider = createSlider(450) 
       $scope.downloadAdvancedClick()
       expect(mockedDRF.initDownload).toHaveBeenCalled()
       expect(mockedDRF.getAdvancedRequest).toHaveBeenCalled()
       expect($scope.isAdvanced).toEqual(false)
    });

    describe('getAdvanced should correctly assign advnaced values', () => {
      var $scope
      var type = "video"
      beforeEach(() =>{

        $scope = $rootScope.$new();
        var controller = $controller('sessionCtrl', { $scope: $scope });
        $scope.type = type
        $scope.link = link
        $scope.advancedClick()
        expect(mockedDRF.getAdvanced).toHaveBeenCalled()
      })
      
      it("duration should be defined", () =>{

        expect($scope.advanced.duration).toBeDefined()
      })
      it("duration should be equal", () =>{
        expect($scope.advanced.duration).toEqual(getAdvancedResponse.length)
      })
      it("mediaType should be type", () =>{
        expect($scope.advanced.mediaType).toEqual(type)
      })
      it("slider.min", () =>{
        expect($scope.advanced.slider.min).toEqual(0)
      })
      it("slider.max", () =>{
        expect($scope.advanced.slider.max).toEqual(getAdvancedResponse.length)
      })
      it("time",() => {
        expect($scope.advanced.time).toEqual(stringValue(getAdvancedResponse.length))
      })
    });
  });

  

