'use strict';
import context from "../context/context.js";
import * as utils from "../context/utils.js";


//Declaratie van de variabelen
let width = context.canvas.width;
let height = context.canvas.height;
let xPos = [];
let yPos = [];
let color = [];
let sat = [];
let light = [];
let moveX;
let moveY;


document.onmousemove = move;

//functies ophalen
setup();
update();

function setup() {
    for (let i = 0; i < 500; i++) {
        xPos[i] = utils.randomNumber(-150, width); //x-positie van ster wordt bepaald, moet getal tussen -150 en breedte zijn
        yPos[i] = utils.randomNumber(-150, height); //y-positie van ster wordt bepaald, moet getal tussen -150 en hoogte zijn
    }
}
/**
 * 
 * @param {MouseEvent} eventData 
 */

//on mousemove event
function move(eventData) {
    let xOffset = width / 2 - eventData.pageX;
    moveX = xOffset / 10;
    moveY = eventData.pageY / 8;
}


//update functie, hier worden de sterrren op het canvas geplaatst en ze krijgen een kleur
function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 200; i++) {
        drawStar(xPos[i] + moveX, yPos[i] + moveY, color[i], sat[i], light[i]);
        color[i] = utils.randomNumber(60, 150);
        sat[i] = utils.randomNumber(50, 160);
        light[i] = utils.randomNumber(30, 70);
        xPos[i] += utils.randomNumber(-1, 1);
        yPos[i] += utils.randomNumber(-1, 1);
    }
    drawName();
    requestAnimationFrame(update);
}


//functie voor de driehoekjes
function drawStar(x, y, hue, sat, light) {
    context.fillStyle = utils.hsl(hue, sat, light);
    context.strokeStyle = "yellow";
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 12.5, y + 50);
    context.lineTo(x + 62.5, y + 50);
    context.closePath();
    context.stroke();
    context.fillStyle = "black";
    context.fill();

}


//Naam centreren en bewerken
function drawName() {
    context.fillStyle = "yellow";
    context.font = "bold 78pt Roboto";
    context.textAlign = "center";
    context.fillText("ALEX TIREA", width / 2, height / 2);
}