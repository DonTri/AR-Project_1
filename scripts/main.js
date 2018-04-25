var stream, lastTimeThatIpainted;
var canvas = document.getElementById('canvas');
var video = document.getElementById('video');
var context = canvas.getContext('2d');
var fps = 3;
var xronosPouPrepeiNaPeraseiGiaNaExwMaxFPS3 = 1000 / fps; // 1000ms dia fps



init();
animate();


// ! ************************************************************************* ! \\
// ! ***************************** init function ***************************** ! \\
// ! ************************************************************************* ! \\
function init() {

    if (hasUserMedia()) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        //enabling video and audio channels 
        navigator.getUserMedia({
            video: true,
            audio: false
        }, function(stream) {
            lastTimeThatIpainted = Date.now();

            //strech the video 

            video.oncanplay = function() {
                //set the size of the canvas same as video's

                setSizes();
                draw(video, context, canvas.width, canvas.height);

            }

            //inserting our stream to the video tag     
            video.srcObject = stream; //doing the same as the command infront: video.src = window.URL.createObjectURL(stream);


        }, function(err) {});

    } else {
        alert("WebRTC is not supported");
    }

}

// ! **************************************************************************** ! \\
// ! ********************************* Functions ******************************** ! \\
// ! **************************************************************************** ! \\

//check if the browser supports the WebRTC 
function hasUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);
}


//set same sizes for the video and canvas
function setSizes() {
    video.style.height = window.innerHeight + 'px';
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.style.height = window.innerHeight + 'px';
    canvas.style.width = (canvas.width / canvas.height) * window.innerHeight + 'px';

    var container = document.getElementById('container');

    container.style.height = window.innerHeight + 'px';
    container.style.width = (canvas.width / canvas.height) * window.innerHeight + 'px';

    placeInTheMiddle(container); // den leitourgei

}

//set videos position in the middle of the window   !!!! den douleuei !!!!
function placeInTheMiddle(con) {
    con.style.left = ((window.innerWidth / 2) - (con.width / 2)) + 'px';
    con.style.top = ((window.innerHeight / 2) - (con.height / 2)) + 'px';

}

// draw the canvas black and white
function draw(v, c, w, h) {
    // Draw the video feed
    if (Date.now() - lastTimeThatIpainted < xronosPouPrepeiNaPeraseiGiaNaExwMaxFPS3) {
        return;
    }

    lastTimeThatIpainted = Date.now();
    // First, draw it into the backing canvas
    c.drawImage(v, 0, 0, w, h);
    // Grab the pixel data from the backing canvas
    var idata = c.getImageData(0, 0, w, h);
    var data = idata.data;
    // Loop through the pixels, turning them grayscale
    for (var i = 0; i < data.length; i += 4) {
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        var brightness = (3 * r + 4 * g + b) >>> 3;
        data[i] = brightness;
        data[i + 1] = brightness;
        data[i + 2] = brightness;
    }
    idata.data = data;
    // Draw the pixels onto the visible canvas
    c.putImageData(idata, 0, 0);
    // Start over!
    setTimeout(function() {
        draw(v, c, w, h);
    }, 0);
}





// ! **************************************************************************** ! \\
// ! ********************************* Renderer ********************************* ! \\
// ! **************************************************************************** ! \\
function animate() {
    draw(video, context, canvas.width, canvas.height);
    requestAnimationFrame(animate);
}


//************************* BUTTONS *************************//
/*btnGetAudioTracks.addEventListener("click", function() {
    console.log("getAudioTracks");
    console.log(stream.getAudioTracks());
});*/