var stream, video;
var canvas = document.getElementById('canvas');




if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    //enabling video and audio channels 
    navigator.getUserMedia({
        video: true,
        audio: false
    }, function(stream) {
        video = document.querySelector('video');

        //strech the video
        //video.width = 320;

        video.setAttribute('height', window.innerHeight);

        video.oncanplay = function() {
            //set the size of the canvas same as video's
            
            video.width = 100;
            canvas.width = video.videoWidth;
            canvas.style.width = video.width;
            console.log(video.width);
  			console.log(video.videoWidth);

        }

        /*//set the size of the canvas same as video's
        canvas.setAttribute('height', video.height);
        canvas.width = video.width + 'px';*/

        setVideosPosition();
        setCanvasPosition();

        //inserting our stream to the video tag     
        video.srcObject = stream; //doing the same as the command infront: video.src = window.URL.createObjectURL(stream);


    }, function(err) {});

} else {
    alert("WebRTC is not supported");
}


// ! ***************************** Functions ***************************** ! \\

//check if the browser supports the WebRTC 
function hasUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);
}



//set videos position in the middle of the window
function setVideosPosition() {
    video.style.left = ((window.innerWidth / 2) - (video.width / 2)) + 'px';
    video.style.top = ((window.innerHeight / 2) - (video.height / 2)) + 'px';

}

//set canvas position exact at video's position
function setCanvasPosition() {
    var rect = video.getBoundingClientRect();
    canvas.style.left = rect.left + "px";
    canvas.style.right = rect.right + "px";
    canvas.style.top = rect.top + "px";
    canvas.style.bottom = rect.bottom + "px";
}




//************************* BUTTONS *************************//
/*btnGetAudioTracks.addEventListener("click", function() {
    console.log("getAudioTracks");
    console.log(stream.getAudioTracks());
});*/