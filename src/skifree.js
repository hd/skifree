(function(){
    // canvas
    var canvas = document.querySelector("canvas");
    var drawingSurface = canvas.getContext("2d");

    var LEFT_HORIZONTAL  = 0;
    var RIGHT_HORIZONTAL = 1;
    var LEFT_SLIGHT      = 2;
    var RIGHT_SLIGHT     = 3;
    var LEFT_DIAGONAL    = 4;
    var RIGHT_DIAGONAL   = 5;
    var STRAIGHT         = 6;

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
        vy:           0,
        state:        LEFT_HORIZONTAL,
        mirrored:     false,
    };

    var sprites = [];

    var skier = Object.create(spriteObject);
    sprites.push(skier);

    var image = new Image();
    image.addEventListener("load", loadHandler, false);
    image.src = "../images/SkiFreeStuff.png";

    var mirroredImage = new Image()
    mirroredImage.addEventListener("load", loadHandler, false);
    mirroredImage.src = "../images/SkiFreeStuffMirrored.png";

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
        changeSkierState(skier.state);
        update();
    }

    function changeSkierState(state){
        switch(state){
            case LEFT_HORIZONTAL:
                skier.sourceX      = 249;
                skier.sourceY      = 0;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 34;
                skier.width        = 25;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = LEFT_HORIZONTAL;
                skier.mirrored     = true;
                break;

            case RIGHT_HORIZONTAL:
                skier.sourceX      = 0;
                skier.sourceY      = 0;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 34;
                skier.width        = 25;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = RIGHT_HORIZONTAL;
                skier.mirrored     = false;
                break;

            case LEFT_SLIGHT:
                skier.sourceX      = 0;
                skier.sourceY      = 0;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 34;
                skier.width        = 25;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = RIGHT_HORIZONTAL;
                skier.mirrored     = true;
                break;
        }
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
                    sprite.mirrored ? mirroredImage : image,
                    sprite.sourceX, sprite.sourceY,
                    sprite.sourceWidth, sprite.sourceHeight,
                    Math.floor(sprite.x), Math.floor(sprite.y),
                    sprite.width, sprite.height
                );
            }

        }
    }
}());
