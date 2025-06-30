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

    noFill();
    strokeCap(ROUND);
    strokeJoin(ROUND);

    p5Canvas.elt.classList.add('canvas');

    //wire the layout to something
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const bruhSizeValue = document.getElementById('sizeValue');
    const clear = document.getElementById('clear');
    const pen = document.getElementById('pen');
    const eraser = document.getElementById('eraser');

    colorPicker.addEventListener('input', (e) => {
        currentColor = e.target.value;
        if (eraserActive == true) {
            eraserActive = false;
            pen.classList.add("active");
            eraser.classList.remove("active");
        }
    })

    brushSize.addEventListener('input', (e) =>{
        currentBrushSize = parseInt(e.target.value);
        
    })

}