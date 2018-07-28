require("linqjs");
let AnimatedCanvasRenderer = require("./animated-canvas-renderer");

class PhyllotaxisRenderer extends AnimatedCanvasRenderer {

    init() {
        this.backgroundColor = "#000";
        this.coordinatesSystem.x.min = -400;
        this.coordinatesSystem.x.max = 400;
        this.coordinatesSystem.y.min = -300;
        this.coordinatesSystem.y.max = 300;
        this.frame = 0;
        super.init();
    }

    drawFrame() {
        let angle = this.frame * 120 * 180 / Math.PI;
        let radius = 7 * Math.sqrt(this.frame);

        var point = {
            x: radius * Math.cos(angle),
            y: radius * Math.sin(angle)
        };
        
        var mappedPoint = this.mapToScreenCoordinates(point)
        this.drawCircle(mappedPoint, 18, this.getColor(point));
        this.frame++;
    }

    getColor(point) {
        let r = parseInt(this.mapRange(Math.cos(point.x * 10), -1, 1, 200, 255));
        let g = parseInt(this.mapRange(Math.sin(point.y), -1, 1, 255, 200));
        let b = parseInt(this.mapRange(Math.cos(point.x * 10), -1, 1, 255, 200));
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }

}

new PhyllotaxisRenderer();