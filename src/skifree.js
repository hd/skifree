(function(){
    // canvas
    var canvas = document.querySelector("canvas");
    var drawingSurface = canvas.getContext("2d");

    var spriteObject = {
        sourceX:      0,
        sourceY:      0,
        sourceWidth:  25,
        sourceHeight: 34,
        x:            0,
        y:            0,
        width:        25,
        height:       34,
        vx:           0,
        vy:           0
    };

    var sprites = [];

    var skier = Object.create(spriteObject);
    sprites.push(skier);

    var image = new Image();
    image.addEventListener("load", loadHandler, false);
    image.src = "../images/SkiFreeStuff.png";

    var UP    = 38;
    var DOWN  = 40;
    var RIGHT = 39;
    var LEFT  = 37;

    var moveUp    = false;
    var moveDown  = false;
    var moveRight = false;
    var moveLeft  = false;

    window.addEventListener("keydown", function(event){
        switch(event.keyCode){
            case UP:
                moveUp = true;
                break;

            case DOWN:
                moveDown = true;
                break;

            case LEFT:
                moveLeft = true;
                break;

            case RIGHT:
                moveRight = true;
                break;
        }
    }, false);

    window.addEventListener("keyup", function(event){
        switch(event.keyCode){
            case UP:
                moveUp = false;
                break;

            case DOWN:
                moveDown = false;
                break;

            case LEFT:
                moveLeft = false;
                break;

            case RIGHT:
                moveRight = false;
                break;
        }
    }, false);

    function loadHandler(){
        update();
    }

    function update(){
        window.requestAnimationFrame(update, canvas);
        if(moveUp && !moveDown){
            skier.vy = -5;
        }
        if(moveDown && !moveUp){
            skier.vy = 5;
        }
        if(moveLeft && !moveRight){
            skier.vx = -5;
        }
        if(moveRight && !moveLeft){
            skier.vx = 5;
        }
        if(!moveUp && !moveDown){
            skier.vy = 0;
        }
        if(!moveLeft && !moveRight){
            skier.vx = 0;
        }
        skier.x = Math.max(0, Math.min(skier.x + skier.vx, canvas.width - skier.width));
        skier.y = Math.max(0, Math.min(skier.y + skier.vy, canvas.height - skier.height));
        render();
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
