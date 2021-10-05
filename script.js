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
};

function colorBox(divId) {
    document.getElementById(divId).style.backgroundColor = currentColor;
}

document.getElementById('color-button').addEventListener('click', nextColor);
document.getElementById('clear-button').addEventListener('click', clearColor);
document.getElementById('eraser-button').addEventListener('click', eraser);
document.getElementById('rainbow-button').addEventListener('click', rainbow);
document.getElementById('gridNum').addEventListener('mousemove', function(){updateNum(document.getElementById('gridNum').value)});
document.getElementById('gridNum').addEventListener('change', function(){makeGrid(document.getElementById('gridNum').value)});


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

function clearOldGrid () {
    const parent = document.getElementById('sketchpad');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function makeGrid (gridNum) {
    clearOldGrid();
    clearColor();
    
    let grid = gridNum*gridNum;
    document.getElementById('sketchpad').style.gridTemplateColumns = `repeat(${gridNum}, 1fr)`;
    document.getElementById('sketchpad').style.gridTemplateRows = `repeat(${gridNum}, 1fr)`;
    for (i=0; i<grid; i++) {
        makeDiv(i);
    }
}

function updateNum(gridNum) {
    document.getElementById('numPerSide').textContent = `Brush Size: ${100-gridNum}`;
};

makeGrid(16);
updateNum(16);