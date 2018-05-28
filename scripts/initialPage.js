//						Function						//
//						  that							//
//						 creates						//
//						   the							//
//					   initial Page						//



function waitingScene() {
    var
    // Obtain a reference to the canvas element
    // using its id.
        container = document.getElementById('container-start'),
        canvas = document.getElementById('canvas-start'),

        // Obtain a graphics context on the
        // canvas element for drawing.
        context = canvas.getContext('2d');

        //loader = document.getElementById('loader');

    // Start listening to resize events and
    // draw canvas.
    initialize();

    function initialize() {
        // Register an event listener to
        // call the resizeCanvas() function each time 
        // the window is resized.
        window.addEventListener('resize', resizeCanvas, false);

        // Draw canvas border for the first time.
        resizeCanvas();
    }

    // Display custom canvas.
    // In this case it's a blue, 5 pixel border that 
    // resizes along with the browser window.					
    function redraw() {
        context.fillStyle = "black";
        context.fillRect(0,0,window.innerWidth,window.innerHeight);
        context.strokeStyle = "#FF0000";
        context.lineWidth = '5';
        context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function redraw3d() {
        context.fillStyle = "black";
        context.strokeStyle = "#FF0000";
        context.lineWidth = '5';
        context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }

    // Runs each time the DOM window resize event fires.
    // Resets the canvas dimensions to match window,
    // then draws the new borders accordingly.
    function resizeCanvas() {


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        redraw();
    }
}