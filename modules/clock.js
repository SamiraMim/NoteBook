const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;

setInterval(drawClock, 1000);

drawClock();

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    const grad = ctx.createRadialGradient(0, 0 ,radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, 'white');
    grad.addColorStop(0.3, '#244c58');
    grad.addColorStop(1, '#4e9fb7');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#4e9fb7';
    ctx.fill();

    ctx.strokeStyle = grad;
    ctx.lineWidth = radius*0.04;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.075, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.2 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(let num = 1; num < 13; num++) {
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    //hour
    hour = hour%12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.05);
    //minute
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.05);
    // second
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}
  
function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}


