var stream, video;
var canvas = document.getElementById('canvas');


if (hasUserMedia()) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    //enabling video and audio channels 
    navigator.getUserMedia({
        video: true,
        audio: false
    }, function (stream) {
        video = document.querySelector('video');

        //strech the video 

        video.oncanplay = function () {
            //set the size of the canvas same as video's

            video.style.height = window.innerHeight + 'px';
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.style.height = window.innerHeight + 'px';
            canvas.style.width = (canvas.width / canvas.height) * window.innerHeight + 'px';

            console.log("plasmatiko height canva: "+ canvas.height +"   pragmatiko height canva: "+canvas.style.height);
            console.log("plasmatiko width canva: "+ canvas.width +"   pragmatiko width canva: "+canvas.style.height);

            console.log("plasmatiko height video: "+ video.videoHeight +"   pragmatiko height video: "+video.style.height);
            console.log("plasmatiko width video: "+ video.videoWidth +"   pragmatiko width video: "+video.style.width);

            document.getElementById('container').style.height = window.innerHeight + 'px';
            document.getElementById('container').style.width = (canvas.width / canvas.height) * window.innerHeight + 'px';

        }

        /*//set the size of the canvas same as video's
        canvas.setAttribute('height', video.height);
        canvas.width = video.width + 'px';*/

        // setVideosPosition();
        // setCanvasPosition();
        //inserting our stream to the video tag     
        video.srcObject = stream; //doing the same as the command infront: video.src = window.URL.createObjectURL(stream);


    }, function (err) {});

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