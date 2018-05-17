//
//
//
//


// ! ************************************************************************* ! \\
// ! *************************** global variables **************************** ! \\
// ! ************************************************************************* ! \\
var stream, lastTimeThatIpainted;
var renderer, scene, camera, controls, mesh;

var canvas = document.getElementById('canvas');
var video = document.getElementById('video');
var context = canvas.getContext("experimental-webgl");




//var context = canvas.getContext('2d');
var fps = 3;
var xronosPouPrepeiNaPeraseiGiaNaExwMaxFPS3 = 1000 / fps; // 1000ms dia fps






init();
addScene();
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
            //lastTimeThatIpainted = Date.now(); 
            video.oncanplay = function() {
                    //set the size of the canvas same as video's
                    setSizes();
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

    //renderer.setSize(canvas.style.width, canvas.style.height);

    var container = document.getElementById('container');

    container.style.height = window.innerHeight + 'px';
    container.style.width = (canvas.width / canvas.height) * window.innerHeight + 'px';

    placeInTheMiddle(container); // den leitourgei

    var peos = container.style.height;
    peos = peos.substr(0, peos.length - 2)
    peos -= 30;
    console.log(document.getElementById("container").offsetWidth / 2);
    console.log(document.getElementById("buttonsInside").offsetWidth / 2);
    var mouni = (document.getElementById("container").offsetWidth / 2);
    console.log(mouni);

    placeButtons({
        id: "buttonsInside",
        top: peos + 'px',
        left: mouni
    });



}

//set videos position in the middle of the window   !!!! den douleuei !!!!
function placeInTheMiddle(con) {
    con.style.left = ((window.innerWidth / 2) - (con.width / 2)) + 'px';
    con.style.top = ((window.innerHeight / 2) - (con.height / 2)) + 'px';


}

//set videos position in the middle of the window   !!!! den douleuei !!!!
function placeButtons(params) {
    var obj = document.getElementById(params.id);
    obj.style.top = params.top;
    console.log(params.left);
    obj.style.left = params.left + 'px';

}


// function that takes the string of the filter and uses SERIOUSLY.js to paint
function drawWithSeriouslyEffects(filter) {

    var seriously = new Seriously();

    var src = seriously.source('#video');
    var target = seriously.target('#canvas');

    // variable that takes the effect
    var mix = seriously.effect(filter);

    mix.source = src;
    target.source = mix;

    seriously.go();
}



function addScene() {
    //////// 3d 
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000)

    camera.position.set(0, 0, 1000);
    camera.lookAt(scene.position);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    }); // init like this
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0); // second param is opacity, 0 => transparent

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();

    // on créé un  cube au quel on définie un matériau puis on l’ajoute à la scène 
    var geometry = new THREE.CubeGeometry(20, 20, 20);
    var material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 800);
    scene.add(mesh);

    // on effectue le rendu de la scène
    renderer.render(scene, camera);

    //document.getElementById('container').appendChild(renderer.domElement);


}





// ! **************************************************************************** ! \\
// ! ********************************* Renderer ********************************* ! \\
// ! **************************************************************************** ! \\
function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;
    controls.update();
    renderer.render(scene, camera);
}









//************************* BUTTONS *************************//
/*btnGetAudioTracks.addEventListener("click", function() {
    console.log("getAudioTracks");
    console.log(stream.getAudioTracks());
});*/



/*  function that draws black and white    // call it like this ----> draw(video, context, canvas.width, canvas.height);  ///

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

*/