// 1 get canvas
var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var eraserEnable = false
var using = false
var lastPoint = {}

autoSetCanvasSize()

if('ontouchstart' in document.body){
    canvas.ontouchstart = function(ev){
        using = true
        var x = ev.touches[0].clientX
        var y = ev.touches[0].clientY
        if(eraserEnable){
            context.clearRect(x-10,y-10,20,20)
        }
        else{
            lastPoint = {x:x,y:y}
        }
    }
    canvas.ontouchmove = function(ev){
        var x = ev.touches[0].clientX
        var y = ev.touches[0].clientY
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
    canvas.ontouchend = function(){
        using = false
    }
    pen.ontouch = function(){
        pen.classList.add('active')
        eraser.classList.remove('active')
        eraserEnable = false
    }
    eraser.ontouch = function(){
        eraser.classList.add('active')
        pen.classList.remove('active')
        eraserEnable = true
    }
    clear.ontouch = function(){
        context.fillStyle="#fff";
        context.beginPath()
        context.fillRect(0,0,canvas.width,canvas.height)
        context.closePath()
    }

}else{
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
    canvas.width = document.documentElement.clientWidth
    canvas.height = document.documentElement.clientHeight
}

