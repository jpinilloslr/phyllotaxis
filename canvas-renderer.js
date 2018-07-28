class CanvasRenderer {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.screenMargin = 0;
        this.backgroundColor = "#fff"
        this.coordinatesSystem = {
            x: {
                min: 0,
                max: window.innerWidth,
                inverted: false
            },
            y: {
                min: 0,
                max: window.innerHeight,
                inverted: false
            }
        }

        this.init();
        this.draw();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.clear();
    }

    clear() {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawCircle(point, radius, color) {
        let x = this.coordinatesSystem.x.inverted 
            ? this.canvas.width - point.x 
            : point.x;
        let y = this.coordinatesSystem.y.inverted 
            ? this.canvas.height - point.y 
            : point.y;

        this.context.beginPath();
        this.context.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = '#000';
        this.context.stroke();
    }

    mapToScreenCoordinates(point) {
        return {
            x: this.mapRange(point.x, 
                this.coordinatesSystem.x.min, this.coordinatesSystem.x.max, 
                this.screenMargin, this.canvas.width - this.screenMargin),
            y: this.mapRange(point.y, 
                this.coordinatesSystem.y.min, this.coordinatesSystem.y.max, 
                this.screenMargin, this.canvas.height - this.screenMargin)
        }
    }

    mapRange(value, sourceMin, sourceMax, targetMin, targetMax) {
        return ((value - sourceMin) / (sourceMax - sourceMin)) * 
            (targetMax - targetMin) + targetMin;
    };

    draw() {
    }
}

module.exports = CanvasRenderer;