(function(){
    // canvas
    var canvas = document.querySelector("canvas");
    var drawingSurface = canvas.getContext("2d");

    var spriteObject = {
        sourceX : 0,
        sourceY : 0,
        sourceWidth : 25,
        sourceHeight : 34,
        x: 0,
        y: 0,
        width: 25,
        height: 34
    };

    var sprites = [];

    var skier = Object.create(spriteObject);
    sprites.push(skier);

    var image = new Image();
    image.addEventListener("load", loadHandler, false);
    image.src = "../images/SkiFreeStuff.png";

    function loadHandler(){
        update();
    }

    function update(){
        window.requestAnimationFrame(update, canvas);
        if(skier.x < 240){
            skier.x++;
            render();
        }
    }

    function render(){
        drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
        if(sprites.length !== 0){
            for(var i = 0; i < sprites.length; i++){
                var sprite = sprites[i];
                drawingSurface.drawImage(
                    image,
                    sprite.sourceX, sprite.sourceY,
                    sprite.sourceWidth, sprite.sourceHeight,
                    Math.floor(sprite.x), Math.floor(sprite.y),
                    sprite.width, sprite.height
                );
            }

        }
    }
}());
