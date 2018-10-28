// 1 get canvas
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

// 2 set canvas size
autoSetCanvasSize()

eraserEnable = false

pen.onclick = function(){
    pen.classList.add('active')
    eraser.classList.remove('active')
    eraserEnable = false
}
eraser.onclick = function(){
    eraser.classList.add('active')
    pen.classList.remove('active')
    eraserEnable = true
}
clear.onclick = function(){
    context.fillStyle="#fff";
    context.beginPath()
    context.fillRect(0,0,canvas.width,canvas.height)
    context.closePath()
}

var using = false
var lastPoint = {}
canvas.onmousedown = function(ev){
    using = true
    var x = ev.clientX
    var y = ev.clientY
    if(eraserEnable){
        context.clearRect(x-10,y-10,20,20)
    }
    else{
        lastPoint = {x:x,y:y}
    }
}
canvas.onmousemove = function(ev){
    var x = ev.clientX
    var y = ev.clientY
    if(using){
        if(eraserEnable){
            context.clearRect(x-10,y-10,20,20)
        }
        else{
            var newPoint = {x:x,y:y}
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint
        }
    }
}
canvas.onmouseup = function(){
    using = false
}

function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)
    context.lineWidth = 5
    context.lineTo(x2,y2)
    context.stroke()
    context.closePath()
}
function autoSetCanvasSize(){
    setCanvasSize()
    window.onresize = function(){
        setCanvasSize()
    }

}
function setCanvasSize(){
    pageWidth = document.documentElement.clientWidth
    pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}

