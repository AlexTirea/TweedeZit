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
    for (let i = 0; i < 250; i++) {
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
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    for (let i = 0; i < 250; i++) {
        drawStar(xPos[i] + moveX, yPos[i] + moveY, color[i], sat[i], light[i]);
        color[i] = utils.randomNumber(90, 150);
        sat[i] = utils.randomNumber(50, 100);
        light[i] = utils.randomNumber(60, 70);
        xPos[i] += utils.randomNumber(-1, 1);
        yPos[i] += utils.randomNumber(-1, 1);
    }
    drawName();
    requestAnimationFrame(update);
}


//functie die ster tekent
function drawStar(x, y, hue, sat, light) {
    context.fillStyle = utils.hsl(hue, sat, light);
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 12.5, y + 50);
    context.lineTo(x + 62.5, y + 50);
    context.lineTo(x + 25, y + 75);
    context.lineTo(x + 37.5, y + 125);
    context.lineTo(x, y + 100);
    context.lineTo(x - 37.5, y + 125);
    context.lineTo(x - 25, y + 75);
    context.lineTo(x - 62.5, y + 50);
    context.lineTo(x - 12.5, y + 50);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();
    context.fill();
}


//functie die naam in het midden van canvas plaatst
function drawName() {
    context.fillStyle = "black";
    context.font = "bold 78pt Corbel";
    context.textAlign = "center";
    context.fillText("Thomas Van Gheluwe", width / 2, height / 2);
}