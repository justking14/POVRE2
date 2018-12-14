function BufferLoader(context, urlList, callback) {
    this.context = context;
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
  }
  
  BufferLoader.prototype.loadBuffer = function(url, index) {
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
  
    var loader = this;
  
    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            return;
          }
          loader.bufferList[index] = buffer;
          if (++loader.loadCount == loader.urlList.length)
            loader.onload(loader.bufferList);
        },
        function(error) {
          console.error('decodeAudioData error', error);
        }
      );
    }
  
    request.onerror = function() {
      alert('BufferLoader: XHR error');
    }
  
    request.send();
  }
  
  BufferLoader.prototype.load = function() {
    for (var i = 0; i < this.urlList.length; ++i)
    this.loadBuffer(this.urlList[i], i);
  }



  function initAudio() {
    bufferLoader = new BufferLoader(
      context,
      [
        'jump.wav',
        'jumpR.wav',
        'fall.wav',
        'fallR.wav'
      ],
      finishedLoading
      );
  
    bufferLoader.load();
  }
  
  function finishedLoading(bufferList) {
    jumpNormalBuffer = bufferList[0];
    jumpReverseBuffer = bufferList[1];
  
    fallNormalBuffer = bufferList[2];
    fallReverseBuffer = bufferList[3];
  }
  
  
  function playSound(buffer) {
      var source = context.createBufferSource(); // creates a sound source
      source.buffer = buffer;                    // tell the source which sound to play
      source.playbackRate.value =(Math.random() * (1.5 - 0.5) + 0.5)
      // Connect the source to the gain node.
      source.connect(gainNode);
      // Connect the gain node to the destination.
      gainNode.connect(bassFilter)
      bassFilter.connect(context.destination)
  
      source.start(0);                       
  }


  window.frequencies = {
    'C3' : 130.812782650299317,
    'C#3' : 138.59131548843604,
    'D3' :  146.832383958703780,
    'D#3' :  155.563491861040455,
    'E3' :  164.813778456434964,
    'F3' : 174.614115716501942,
    'F#3' : 184.997211355817199,
    'G3' : 195.997717990874647,
    'G#3' : 207.652348789972569,
    'A3' : 220.0,
    'A#3' : 233.081880759044958,
    'B3' : 246.941650628062055,



    'E4': 329.628,
    'C4': 261.626,
};
window.playNote = function (note, time, duration) { 
    var osc = context.createOscillator();
    osc.frequency.value = frequencies[note];

    var gain = context.createGain();
    osc.connect(gain);
    gain.connect(gainNode);
    gainNode.connect(bassFilter)
    bassFilter.connect(context.destination)

    gain.gain.setValueAtTime(0, context.currentTime);
    gain.gain.linearRampToValueAtTime(1, context.currentTime + 0.1);   

    osc.start(context.currentTime + time);

    gain.gain.linearRampToValueAtTime(0, context.currentTime + time + duration - 0.1);
    osc.stop(context.currentTime + time + duration);
    return osc; 

}
var currentNote = 0;
var noteArray = ['C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3', 'B3']//['G3', 'E4', 'C4']
function nextNote(){
    //console.log(noteArray[currentNote])
    //playNote(noteArray[Math.floor(Math.random()*noteArray.length)], 0.0, 1.0)
    playNote(noteArray[currentNote], 0.0, 1.0);

    currentNote+=1*worldDirection
    if(currentNote >= noteArray.length){
        currentNote = 0;
    }
    if(currentNote < 0){
        currentNote = noteArray.length - 1
    }
}