describe('sessionFactory',function(){

    var sessionFactory;

    beforeEach(() => {
      module('app.FactoryModule');
      
      inject(function($injector){
        sessionFactory = $injector.get('sessionFactory');
      });

    });
  
    it('has to be defined',() => {
      var get = sessionFactory.get();
      expect(get).toBeDefined();
    })
  });

  describe('DownloadRequestFactoryTest',function(){
    var downloadRequestFactory,$httpBackend;
    var properties = {};
    var test;
    const link = "youtube link";

    beforeEach(() => {
      module('app.FactoryModule');
      
      properties.mediaType = "video";

      inject(function($injector){
        $httpBackend = $injector.get('$httpBackend');
        downloadRequestFactory = $injector.get('downloadRequestFactory');
        test = downloadRequestFactory.get(link,properties,'bla');
    
      });
    });

    it('null check session', () => {
      expect(() => {downloadRequestFactory.get(link,properties,null)}).toThrow('session not defined');
    });

    it('null check properties', () => {
      expect(() => {downloadRequestFactory.get(link,null,'ll')}).toThrow('properties not defined');
    });

    it('null check link', () => {
      expect(() => {downloadRequestFactory.get(null,properties,'ll')}).toThrow('link not defined');
    });

    it('null check mediaType', () => {
      var props = {};
      expect(() => {downloadRequestFactory.get(link,props,'ll')}).toThrow('properties not defined');
    });

    it('get has to be defined',() => {
      expect(test).toBeDefined();
    })

    it('get has to have data defined', () => {
      expect(test.data).toBeDefined();
    })

    it('test data isTimed should be defined', () => {
      expect(test.data['isTimed']).toBeDefined();
    })

    it('test data isTimed should be defined', () => {
      expect(test.data['isTimed']).toEqual(false);
    })

    it('data has to have mediaType defined', () => {
      expect(test.data['mediaType']).toBeDefined();
    })

    it('data has to have url defined', () => {
      expect(test.data['url']).toBeDefined();
    })

    it('mediaType has to equal properties.mediaType', () => {
      expect(test.data['mediaType']).toEqual(properties.mediaType);
    })

    it('url has to equal youtube link', () => {
      expect(test.data['url']).toEqual(link);
    })

    it('should get record', () => {
    var properties = {
      mediaType : "audio",
    }
    var url = 'http://localhost:8080/rest/download/initialize';
    var response =  { id: 'some uuid' };
 

     // console.log(r);

     $httpBackend.expect('POST',url).respond(response);
      downloadRequestFactory.initDownload(downloadRequestFactory.get(url,properties,"bla")).then(function(resp){
        //console.log(resp.data);
        expect(resp.data).toEqual(response);
      });
      
      $httpBackend.flush();

    })
    
    it('should get advanced', () => {
      console.log("should get start")
      var url = 'http://localhost:8080/DYT/rest/download/getInfo';

      var response = {
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
      
        $httpBackend.expectPOST().respond(function(method, url2, data, headers) {
          console.log(url2);
          console.log(headers);
          return [200, response];
     });

        downloadRequestFactory.getAdvanced("cyak","bla").then(function(resp){
          console.log("response");

          console.log(resp.data);
          expect(resp.data).toEqual(response);
        });
        $httpBackend.flush();

    })

  });

  describe('DownloadRequestFactoryAdvancedTimedTest',function(){
    var downloadRequestFactory,$httpBackend;
    var advanced = {}
    var test;
  
    const link = "youtube link";

    beforeEach(() => {
      module('app.FactoryModule');
      advanced = {
        title : "Piosenka",
        duration : 350,
        author : "Hołdys XD",
        slider : {
          min : 23,
          max :329
        },
        url : link,
        mediaType : 'video'
      }
      inject(function($injector){
        $httpBackend = $injector.get('$httpBackend');
        downloadRequestFactory = $injector.get('downloadRequestFactory');
        test = downloadRequestFactory.getAdvancedRequest(advanced,'bla');
      });
    });


  it('null check session', () => {
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,null)}).toThrow('session not defined');
    });

    it('null check advanced', () => {
      expect(() => {downloadRequestFactory.getAdvancedRequest(null,"bla")}).toThrow('advanced not defined');
    });

    it ('null check slider', () =>{
      advanced['slider'] = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('slider not defined')
    });

    it ('null check slider min', () =>{
      advanced.slider['min'] = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('slider.min not defined')
    });

    it ('null check slider max', () =>{
      advanced.slider['max'] = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('slider.max not defined')
    });
    it ('null check duration', () =>{
      advanced.duration = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('duration not defined')
    });

    it ('null check url', () =>{
      advanced.url = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('url not defined')
    });


    it('get has to be defined',() => {
      expect(test).toBeDefined();
    });

    it('get has to have data defined', () => {
      expect(test.data).toBeDefined();
    });

    it('test data isTimed should be defined', () => {
      expect(test.data['isTimed']).toBeDefined();
    });

    it('test data isTimed should be defined', () => {
      expect(test.data['isTimed']).toEqual(true);
    });

    it('data has to have mediaType defined', () => {
      expect(test.data['mediaType']).toBeDefined();
    });

    it('data has to have url defined', () => {
      expect(test.data['url']).toBeDefined();
    });

    it('mediaType has to equal advanced.mediaType', () => {
      expect(test.data['mediaType']).toEqual(advanced.mediaType);
    });

    it('url has to equal youtube link', () => {
      expect(test.data['url']).toEqual(link);
    });

    it('timeTo has to be defined', () => {
      expect(test.data['timeTo']).toBeDefined();
    });

    it('timeFrom has to be defined', () => {
      expect(test.data['timeFrom']).toBeDefined();
    });

    it('timeTo has to equal max', () => {
      expect(test.data['timeTo']).toEqual(advanced.slider.max)
    });
    
    it('timeTo has to equal min', () => {
      expect(test.data['timeFrom']).toEqual(advanced.slider.min)
    });
   

  });

  describe('DownloadRequestFactoryAdvancedNotTimedTest',function(){
    var downloadRequestFactory,$httpBackend;
    var advanced = {}
    var test;
  
    const link = "youtube link";

    beforeEach(() => {
      module('app.FactoryModule');
      advanced = {
        title : "Piosenka",
        duration : 350,
        author : "Hołdys XD",
        slider : {
          min : 0,
          max :350
        },
        url : link,
        mediaType : 'video'
      }
      inject(function($injector){
        $httpBackend = $injector.get('$httpBackend');
        downloadRequestFactory = $injector.get('downloadRequestFactory');
        test = downloadRequestFactory.getAdvancedRequest(advanced,'bla');
      });
    });


  it('null check session', () => {
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,null)}).toThrow('session not defined');
    });

    it('null check advanced', () => {
      expect(() => {downloadRequestFactory.getAdvancedRequest(null,"bla")}).toThrow('advanced not defined');
    });

    it ('null check slider', () =>{
      advanced['slider'] = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('slider not defined')
    });

    it ('null check slider min', () =>{
      advanced.slider['min'] = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('slider.min not defined')
    });

    it ('null check slider max', () =>{
      advanced.slider['max'] = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('slider.max not defined')
    });
    it ('null check duration', () =>{
      advanced.duration = null;
      expect(() => {downloadRequestFactory.getAdvancedRequest(advanced,'bla')}).toThrow('duration not defined')
    });

    it('get has to be defined',() => {
      expect(test).toBeDefined();
    });

    it('get has to have data defined', () => {
      expect(test.data).toBeDefined();
    });

    it('test data isTimed should be defined', () => {
      expect(test.data['isTimed']).toBeDefined();
    });

    it('test data isTimed should not be timed', () => {
      expect(test.data['isTimed']).toEqual(false);
    });

    it('timeTo has to equal max', () => {
      expect(test.data['timeTo']).not.toBeDefined()
    });
    
    it('timeTo has to equal min', () => {
      expect(test.data['timeFrom']).not.toBeDefined()
    });
   

  });