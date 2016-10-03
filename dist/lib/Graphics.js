"use strict";
const Debug_1 = require("./Debug");
const { assert } = Debug_1.Debug;
class Graphics {
    constructor(aspectRatio = 1) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        assert(this.context !== null, "Browser must support Canvas 2d");
        this.aspectRatio = aspectRatio;
    }
    addToDom(targetDomElement = document.body) {
        targetDomElement.appendChild(this.canvas);
    }
    removeFromDom() {
        this.canvas.remove();
    }
    fitWindow() {
        this.canvas.style.display = "block";
        this.resizeCanvas();
        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });
    }
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    getLongestEdge() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        return width > height ? width : height;
    }
    getShortestEdge() {
        const width = this.canvas.width;
        const height = this.canvas.height;
        return width < height ? width : height;
    }
    worldVToScreen(v) {
        return {
            x: this.worldXToScreen(v.x),
            y: this.worldYToScreen(v.y),
        };
    }
    worldXToScreen(x) {
        let offset = 0;
        if (this.getShortestEdge() === this.canvas.height) {
            offset = (this.getLongestEdge() - this.getShortestEdge()) / 2;
        }
        return x * this.getShortestEdge() / 100 + offset;
    }
    worldYToScreen(y) {
        let offset = 0;
        if (this.getShortestEdge() === this.canvas.width) {
            offset = (this.getLongestEdge() - this.getShortestEdge()) / 2;
        }
        return y * this.getShortestEdge() / 100 + offset;
    }
    worldScalerToScreen(l) {
        return l * this.getShortestEdge() / 100;
    }
    letterBox() {
        this.push();
        const edge = this.getShortestEdge();
        const spaceRemaining = this.getLongestEdge() - this.getShortestEdge();
        const letterBoxSize = spaceRemaining / 2;
        this.context.fillStyle = "hsl(0, 0%, 0%)";
        if (edge === this.canvas.width) {
            this.context.fillRect(0, 0, this.canvas.width, letterBoxSize);
            this.context.fillRect(0, this.canvas.height - letterBoxSize, this.canvas.width, letterBoxSize);
        }
        else {
            this.context.fillRect(0, 0, letterBoxSize, this.canvas.height);
            this.context.fillRect(this.canvas.width - letterBoxSize, 0, this.canvas.width, this.canvas.height);
        }
        this.pop();
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    circle(worldV, worldRadius) {
        const screenV = this.worldVToScreen(worldV);
        const screenR = this.worldScalerToScreen(worldRadius);
        this.context.beginPath();
        this.context.arc(screenV.x, screenV.y, screenR, 0, 360);
        this.context.stroke();
    }
    polygon(vertices) {
        this.context.beginPath();
        vertices.forEach((worldV) => {
            const screenV = this.worldVToScreen(worldV);
            this.context.lineTo(screenV.x, screenV.y);
        });
        this.context.closePath();
        this.context.stroke();
    }
    line(v1, v2) {
        const worldV1 = this.worldVToScreen(v1);
        const worldV2 = this.worldVToScreen(v2);
        this.context.beginPath();
        this.context.moveTo(worldV1.x, worldV1.y);
        this.context.lineTo(worldV2.x, worldV2.y);
        this.context.stroke();
    }
    text(v, text) {
        const worldV = this.worldVToScreen(v);
        this.context.fillText(text, worldV.x, worldV.y);
    }
    textBoundingBox(text) {
        return this.context.measureText(text);
    }
    push() {
        this.context.save();
    }
    pop() {
        this.context.restore();
    }
}
exports.Graphics = Graphics;
//# sourceMappingURL=Graphics.js.map