let currentColor = '#000000';
        let currentBrushSize = 5;
        let p5Canvas;
        let isEraserActive = false;

        let lastTouchX = 0;
        let lastTouchY = 0;

        function setup() {
            const canvasWidth = Math.min(window.innerWidth * 0.9, 1000);
            const canvasHeight = Math.min(window.innerHeight * 0.7, 600);

            p5Canvas = createCanvas(canvasWidth, canvasHeight);
            p5Canvas.parent('canvas'); // Attaches the canvas directly to the body

            background(255);

            noFill();
            strokeCap(ROUND);
            strokeJoin(ROUND);

            p5Canvas.elt.classList.add('canvas-style');

            // --- Control Panel Element References (UPDATED IDs) ---
            const colorPicker = document.getElementById('colorPicker');
            const brushSizeSlider = document.getElementById('brushSize');
            const sizeValueSpan = document.getElementById('sizeValue'); // Corrected ID
            const clearButton = document.getElementById('clear'); // Corrected ID
            const penToolButton = document.getElementById('pen'); // Corrected ID
            const eraserToolButton = document.getElementById('eraser'); // Corrected ID

            // Set initial active tool class
            penToolButton.classList.add('active'); // Ensure 'Pen' is active on load

            colorPicker.addEventListener('input', (e) => {
                currentColor = e.target.value;
                if (isEraserActive) {
                    isEraserActive = false;
                    penToolButton.classList.add('active'); // Use 'active' class
                    eraserToolButton.classList.remove('active'); // Use 'active' class
                    blendMode(BLEND);
                }
            });

            brushSizeSlider.addEventListener('input', (e) => {
                currentBrushSize = parseInt(e.target.value);
                sizeValueSpan.textContent = e.target.value; // Corrected span reference
                console.log('Brush size changed to:', currentBrushSize);
            });

            clearButton.addEventListener('click', () => {
                background(255);
                isEraserActive = false;
                penToolButton.classList.add('active'); // Use 'active' class
                eraserToolButton.classList.remove('active'); // Use 'active' class
                blendMode(BLEND);
                colorPicker.value = "#000000";
                currentColor = "#000000";
            });

            penToolButton.addEventListener('click', () => {
                isEraserActive = false;
                penToolButton.classList.add('active'); // Use 'active' class
                eraserToolButton.classList.remove('active'); // Use 'active' class
                blendMode(BLEND);
            });

            eraserToolButton.addEventListener('click', () => {
                isEraserActive = true;
                eraserToolButton.classList.add('active'); // Use 'active' class
                penToolButton.classList.remove('active'); // Use 'active' class
                blendMode(REMOVE);
            });

            window.addEventListener('resize', () => {
                const newCanvasWidth = Math.min(window.innerWidth * 0.9, 1000);
                const newCanvasHeight = Math.min(window.innerHeight * 0.7, 600);
                resizeCanvas(newCanvasWidth, newCanvasHeight);
                background(255);
            });
        }

        function draw() {
            strokeWeight(currentBrushSize);

            if (mouseIsPressed) {
                if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
                    if (!isEraserActive) {
                        stroke(currentColor);
                    }
                    line(pmouseX, pmouseY, mouseX, mouseY);
                }
            }
        }

        function touchStarted() {
            if (touches.length > 0) {
                if (touches[0].x >= 0 && touches[0].x <= width && touches[0].y >= 0 && touches[0].y <= height) {
                    lastTouchX = touches[0].x;
                    lastTouchY = touches[0].y;
                    return false;
                }
            }
        }

        function touchMoved() {
            if (touches.length > 0) {
                if (touches[0].x >= 0 && touches[0].x <= width && touches[0].y >= 0 && touches[0].y <= height) {
                    strokeWeight(currentBrushSize);
                    if (!isEraserActive) {
                        stroke(currentColor);
                    }
                    line(lastTouchX, lastTouchY, touches[0].x, touches[0].y);
                    lastTouchX = touches[0].x;
                    lastTouchY = touches[0].y;
                    return false;
                }
            }
        }

        function touchEnded() {
            return false;
        }