let canvas = document.getElementById('snowflake');
let ctx = canvas.getContext('2d');
let veins = 2;

// let length = Math.random() * 100 + 100;
let length = 200;

var gradient = ctx.createLinearGradient(0, 0, 170, 0);

var color1 = localStorage.getItem("storagecolor1");
var color2 = localStorage.getItem("storagecolor2");
var color3 = localStorage.getItem("storagecolor3");
let sides = localStorage.getItem("storagesides");

if (color1 == null){
    color1 = "#0525a6";
}
if (color2 == null){
    color2 = "#3c7fc7";
}
if (color3 == null){
    color3 = "#55effa";
}
if (sides == null){
    sides = 8;
}
document.getElementById('color1').value = color1;
document.getElementById('color2').value = color2;
document.getElementById('color3').value = color3;
document.getElementById('slidersides').value = sides;

gradient.addColorStop("0", color1);
gradient.addColorStop("0.5", color2);
gradient.addColorStop("1.0", color3);


// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = length*2 + 150;
canvas.height = length*2 + 150;

ctx.translate(canvas.width / 2, canvas.height / 2);

// let angle = Math.PI * 2 * Math.random();
let angle = Math.PI * Math.random() / 2;

for (let i = 0; i < sides; i++) {
    draw(0);
    ctx.rotate(Math.PI * 2 / sides);
}

function draw (k) {
    if (k > 5) return;
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();

    for (let i = 1; i < veins + 1; i++) {
        ctx.save();
        ctx.translate(length * i / (veins + 1), 0);
        ctx.scale(0.5, 0.5);
        ctx.save();
        ctx.rotate(angle);
        draw(k + 1);
        ctx.restore();
        ctx.save();
        ctx.rotate(-angle);
        draw(k + 1);
        ctx.restore();
        ctx.restore();
    }
}

draw(0);

//Create a png image from canvas
var image = canvas.toDataURL("image/png");
document.write('<img id="generated-image" src="'+image+'"/>');

// var color1 = (typeof color1 === 'undefined') ? "#333" : color1;

function dl(){
    var a = document.createElement('a');
    a.href = image;
    a.download = "snowflake.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function generate(){
    var color1 = document.getElementById('color1').value;
    localStorage.setItem("storagecolor1", color1);

    var color2 = document.getElementById('color2').value;
    localStorage.setItem("storagecolor2", color2);
    
    var color3 = document.getElementById('color3').value;
    localStorage.setItem("storagecolor3", color3);

    var sides = document.getElementById('slidersides').value;
    localStorage.setItem("storagesides", sides);
    
    location.reload();
}