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
                skier.vx           = 0;
                skier.vy           = 0;
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
                skier.vx           = 0;
                skier.vy           = 0;
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
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = LEFT_SLIGHT;
                skier.mirrored     = true;
                break;
            case RIGHT_SLIGHT:
                skier.sourceX      = 25;
                skier.sourceY      = 0;
                skier.sourceWidth  = 22;
                skier.sourceHeight = 34;
                skier.width        = 22;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = RIGHT_SLIGHT;
                skier.mirrored     = false;
                break;
            case LEFT_DIAGONAL:
                skier.sourceX      = 206;
                skier.sourceY      = 0;
                skier.sourceWidth  = 20;
                skier.sourceHeight = 34;
                skier.width        = 20;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = LEFT_DIAGONAL;
                skier.mirrored     = true;
                break;
            case RIGHT_DIAGONAL:
                skier.sourceX      = 47;
                skier.sourceY      = 0;
                skier.sourceWidth  = 20;
                skier.sourceHeight = 34;
                skier.width        = 20;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = RIGHT_DIAGONAL;
                skier.mirrored     = false;
                break;
            case STRAIGHT_DOWN:
                skier.sourceX      = 66;
                skier.sourceY      = 0;
                skier.sourceWidth  = 18;
                skier.sourceHeight = 34;
                skier.width        = 18;
                skier.height       = 34;
                skier.vx           = 0;
                skier.vy           = 0;
                skier.state        = STRAIGHT_DOWN;
                skier.mirrored     = false;
                break;
            case WALK_RIGHT:
                skier.sourceX      = 32;
                skier.sourceY      = 40;
                skier.sourceWidth  = 25;
                skier.sourceHeight = 28;
                skier.width        = 25;
                skier.height       = 28;
                skier.vx           = 0;
                skier.vy           = 0;
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
                skier.vx           = 0;
                skier.vy           = 0;
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
                case LEFT_HORIZONTAL:
                    animateSkierState(WALK_LEFT);
                    break;
                case WALK_LEFT:
                    animateSkierState(LEFT_HORIZONTAL);
                    break;
                case RIGHT_HORIZONTAL:
                    animateSkierState(WALK_RIGHT);
                    break;
                case WALK_RIGHT:
                    animateSkierState(RIGHT_HORIZONTAL);
                    break;
                default:
                    skier.counter = 0;
                    changeSkierState(RIGHT_HORIZONTAL);
                    break;
            }
            skier.vy = -1;
        }
        else if(moveDown){
            if(skier.state !== STRAIGHT_DOWN){
                changeSkierState(STRAIGHT_DOWN);
            }
            skier.vy = 3;
        }
        else if(moveLeft){
            switch(skier.state){
                case LEFT_HORIZONTAL:
                    animateSkierState(WALK_LEFT);
                    skier.vx = -1;
                    skier.vy = 0;
                    break;
                case WALK_LEFT:
                    animateSkierState(LEFT_HORIZONTAL);
                    skier.vx = -1;
                    skier.vy = 0;
                    break;
                case STRAIGHT_DOWN:
                    animateSkierState(LEFT_SLIGHT);
                    skier.vx = -3;
                    skier.vy = 4;
                    break;
                case LEFT_SLIGHT:
                    animateSkierState(LEFT_DIAGONAL);
                    skier.vx = -4;
                    skier.vy = 3;
                    break;
                case LEFT_DIAGONAL:
                    animateSkierState(LEFT_HORIZONTAL);
                    skier.vx = 0;
                    skier.vy = 0;
                //default:
                    //skier.counter = 0;
                    //changeSkierState(LEFT_HORIZONTAL);
                    //skier.vx = -1;
                    //skier.vy = 0;
                    //break;
            }
        }
        else if(moveRight){
            switch(skier.state){
                case RIGHT_HORIZONTAL:
                    animateSkierState(WALK_RIGHT);
                    break;
                case WALK_RIGHT:
                    animateSkierState(RIGHT_HORIZONTAL);
                    break;
                default:
                    skier.counter = 0;
                    changeSkierState(RIGHT_HORIZONTAL);
                    break;
            }
            skier.vx = 1;
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
