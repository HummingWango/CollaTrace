let currentColor = '#000000';
let currentBrushSize = 5;
let p5Canvas;
let eraserActive = false;

//coordinates for the strokes of drawing
    let x = 0;
    let y = 0;

//creating the canvas and other buttons functionality
function setUp() {

    //how to display flex? can't.
    const canvasWidth = Math.min(window.innerWidth*0.9, 1000);
    const canvasHeight = Math.min(window.innerHeight*0.9, 1000);

    p5Canvas = createCanvas(canvasWidth, canvasHeight);
    p5Canvas.parent(document.body);

    background(255);
    //created the actual canvas, placed where?

    
}