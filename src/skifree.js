(function(){
    var canvas = document.querySelector("canvas");
    var drawingSurface = canvas.getContext("2d");
    AnimationFrame.shim();

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

    var SPEED      = 3;
    var COMPONENT1 = 1.5;
    var COMPONENT2 = 2.6;

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

    function changeSkierState(state){
        switch(state){
            case LEFT_HORIZONTAL:
                skier.sourceX      = 249;
                skier.sourceY      = 6;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 28;
                skier.width        = 25;
                skier.height       = 28;
                skier.state        = LEFT_HORIZONTAL;
                skier.mirrored     = true;
                break;
            case RIGHT_HORIZONTAL:
                skier.sourceX      = 0;
                skier.sourceY      = 6;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 28;
                skier.width        = 25;
                skier.height       = 28;
                skier.state        = RIGHT_HORIZONTAL;
                skier.mirrored     = false;
                break;
            case LEFT_SLIGHT:
                skier.sourceX      = 224;
                skier.sourceY      = 0;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 34;
                skier.width        = 25;
                skier.height       = 34;
                skier.vx           = -COMPONENT1;
                skier.vy           = COMPONENT2;
                skier.state        = LEFT_SLIGHT;
                skier.mirrored     = true;
                skier.counter      = 0;
                break;
            case RIGHT_SLIGHT:
                skier.sourceX      = 25;
                skier.sourceY      = 0;
                skier.sourceWidth  = 22;
                skier.sourceHeight = 34;
                skier.width        = 22;
                skier.height       = 34;
                skier.vx           = COMPONENT1;
                skier.vy           = COMPONENT2;
                skier.state        = RIGHT_SLIGHT;
                skier.mirrored     = false;
                skier.counter      = 0;
                break;
            case LEFT_DIAGONAL:
                skier.sourceX      = 206;
                skier.sourceY      = 0;
                skier.sourceWidth  = 20;
                skier.sourceHeight = 34;
                skier.width        = 20;
                skier.height       = 34;
                skier.vx           = -COMPONENT2;
                skier.vy           = COMPONENT1;
                skier.state        = LEFT_DIAGONAL;
                skier.mirrored     = true;
                skier.counter      = 0;
                break;
            case RIGHT_DIAGONAL:
                skier.sourceX      = 47;
                skier.sourceY      = 0;
                skier.sourceWidth  = 20;
                skier.sourceHeight = 34;
                skier.width        = 20;
                skier.height       = 34;
                skier.vx           = COMPONENT2;
                skier.vy           = COMPONENT1;
                skier.state        = RIGHT_DIAGONAL;
                skier.mirrored     = false;
                skier.counter      = 0;
                break;
            case STRAIGHT_DOWN:
                skier.sourceX      = 66;
                skier.sourceY      = 0;
                skier.sourceWidth  = 18;
                skier.sourceHeight = 34;
                skier.width        = 18;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = SPEED;
                skier.state        = STRAIGHT_DOWN;
                skier.mirrored     = false;
                skier.counter      = 0;
                break;
            case WALK_RIGHT:
                skier.sourceX      = 32;
                skier.sourceY      = 40;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 28;
                skier.width        = 25;
                skier.height       = 28;
                skier.state        = WALK_RIGHT;
                skier.mirrored     = false;
                break;
            case WALK_LEFT:
                skier.sourceX      = 216;
                skier.sourceY      = 40;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 28;
                skier.width        = 25;
                skier.height       = 28;
                skier.state        = WALK_LEFT;
                skier.mirrored     = true;
                break;
        }
    }

    function  animateSkierState(state){
        if(skier.counter === skier.step){
            skier.counter = 0;
            changeSkierState(state);
        }
        else{
            skier.counter += 1;
        }
    }

    function update(){
        window.requestAnimationFrame(update, canvas);
        if(moveUp){
            switch(skier.state){
            }
            moveUp = false;
        }
        else if(moveDown){
            if(skier.state !== STRAIGHT_DOWN){
                changeSkierState(STRAIGHT_DOWN);
            }
            moveDown = false;
        }
        else if(moveLeft){
            switch(skier.state){
                case LEFT_HORIZONTAL:
                    animateSkierState(WALK_LEFT);
                    skier.vx = -SPEED;
                    skier.vy = 0;
                    break;
                case WALK_LEFT:
                    animateSkierState(LEFT_HORIZONTAL);
                    skier.vx = -SPEED;
                    skier.vy = 0;
                    break;
                case STRAIGHT_DOWN:
                    changeSkierState(LEFT_SLIGHT);
                    break;
                case LEFT_SLIGHT:
                    changeSkierState(LEFT_DIAGONAL);
                    break;
                case LEFT_DIAGONAL:
                    changeSkierState(LEFT_HORIZONTAL);
                    break;
                case RIGHT_HORIZONTAL:
                    changeSkierState(RIGHT_DIAGONAL);
                    break;
                case RIGHT_DIAGONAL:
                    changeSkierState(RIGHT_SLIGHT);
                    break;
                case RIGHT_SLIGHT:
                    changeSkierState(STRAIGHT_DOWN);
                    break;
            }
            moveLeft = false;
        }
        else if(moveRight){
            switch(skier.state){
                case RIGHT_HORIZONTAL:
                    animateSkierState(WALK_RIGHT);
                    skier.vx = SPEED;
                    skier.vy = 0;
                    break;
                case WALK_RIGHT:
                    animateSkierState(RIGHT_HORIZONTAL);
                    skier.vx = SPEED;
                    skier.vy = 0;
                    break;
                case STRAIGHT_DOWN:
                    changeSkierState(RIGHT_SLIGHT);
                    break;
                case RIGHT_SLIGHT:
                    changeSkierState(RIGHT_DIAGONAL);
                    break;
                case RIGHT_DIAGONAL:
                    changeSkierState(RIGHT_HORIZONTAL);
                    break;
                case LEFT_HORIZONTAL:
                    changeSkierState(LEFT_DIAGONAL);
                    break;
                case LEFT_DIAGONAL:
                    changeSkierState(LEFT_SLIGHT);
                    break;
                case LEFT_SLIGHT:
                    changeSkierState(STRAIGHT_DOWN);
                    break;
            }
            moveRight = false;
        }
        else{
            switch(skier.state){
                case LEFT_HORIZONTAL:
                case WALK_LEFT:
                case RIGHT_HORIZONTAL:
                case WALK_RIGHT:
                    skier.vx = 0;
                    skier.vy = 0;
                    break;
            }
        }
        //console.log(count);
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
