const sketchPad = document.querySelector('#sketchpad');
let currentColor = 'black';
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'black'];
let colorNum = 7;


function makeDiv(divNum) {
    newDiv = document.createElement('div');
    newDiv.classList.add('drawingBox');
    newDiv.setAttribute('id',divNum);
    newDiv.style.backgroundColor = 'rgb(173, 173, 172)';
    sketchPad.appendChild(newDiv);
    newDiv.addEventListener('mouseover', function() {colorBox(divNum); })
    console.log()
}

for (i=0; i<256; i++) {
    makeDiv(i);
}

function colorBox(divId) {
    document.getElementById(divId).style.backgroundColor = currentColor;
}

document.getElementById('color-button').addEventListener('click', nextColor);
document.getElementById('clear-button').addEventListener('click', clearColor);
document.getElementById('eraser-button').addEventListener('click', eraser);
document.getElementById('rainbow-button').addEventListener('click', rainbow);



function changeColor() {
    if (colorNum ===7) {
        colorNum = 0;
    } else {
        colorNum++;
    }
    currentColor = colors[colorNum];
    document.getElementById('color-button').style.backgroundColor = currentColor;
    if (colorNum === 4 || colorNum === 5 || colorNum === 7) {
        document.getElementById('color-button').style.color = 'white';
    } else {
        document.getElementById('color-button').style.color = 'black';
    }
}

function nextColor() {
    clearInterval(window.rainbowTimer);
    changeColor();
}

function rainbow() {
    window.rainbowTimer = setInterval(function(){changeColor()}, 200);
}

function clearColor() {
    clearInterval(window.rainbowTimer);
    let boxes = document.querySelectorAll('.drawingBox');
    for (i =0; i < boxes.length; i++) {
    boxes[i].style.backgroundColor = 'rgb(173, 173, 172)';
    }
} 

function eraser() {
    clearInterval(window.rainbowTimer);
    currentColor = 'rgb(173, 173, 172)';
}


