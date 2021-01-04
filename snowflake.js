let canvas = document.getElementById('snowflake');
let ctx = canvas.getContext('2d');
let veins = 2;
let sides = 8;
let length = Math.random() * 100 + 100;

var gradient = ctx.createLinearGradient(0, 0, 170, 0);
gradient.addColorStop("0", "#59baff");
gradient.addColorStop("0.5" ,"#bdf8ff");
gradient.addColorStop("1.0", "#fff");


// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
canvas.width = length*2+150;
canvas.height = length*2+150;

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

function download(){
    var a = document.createElement('a');
    a.href = image;
    a.download = "snowflake.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function generate(){
    location.reload();
}