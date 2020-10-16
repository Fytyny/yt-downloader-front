
function helloWorld() {
    return 'Hello world!';
}
 function error2(){
        var $errorBand = $('#errorBand');
        var $errorMessage = $('#errorMessage');
        $errorMessage.html("<strong>Error</strong> Could not reach the server. Please refresh to try again.");
        $errorBand.fadeTo(1000,1);
      }
 function error(){
        var $errorBand = $('#errorBand');
        var $errorMessage = $('#errorMessage');
        $errorMessage.html("<strong>Error</strong> Could not reach the server. Please refresh to try again.");
        $errorBand.fadeTo(1000,1);
}