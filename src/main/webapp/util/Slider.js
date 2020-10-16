function minTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
  }

function stringValue(value){
    return minTwoDigits(parseInt(value/60/60)) + ":" + minTwoDigits(parseInt(value/60)) + ":" + minTwoDigits(value % 60);
}

function createSlider(duration){

    var slider = {
    value: 0,
    min: 0,
    max: duration,
    options: {
      floor: 0,
      ceil: duration,
      translate: function(value) {
        
        return stringValue(value);
      },
    },
    
  }
  return slider;
}