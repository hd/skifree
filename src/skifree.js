(function() {
    var canvas = document.querySelector("canvas");
    var drawingSurface = canvas.getContext("2d");
    AnimationFrame.shim();

    var gameWorld = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: 9600
    };
    var camera = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height
    };
    camera.x = (gameWorld.x + gameWorld.width/2) - camera.width/2;
    camera.y = (gameWorld.y + canvas.height/2) - camera.height/2;

    var sprites = [];
    var skier = Object.create(spriteObject);
    skier.x = (gameWorld.x + gameWorld.width/2) - skier.sourceWidth/2;
    skier.y = (gameWorld.y + canvas.height/2) - skier.sourceHeight/2;
    sprites.push(skier);

    var staticObjs = [];
    // creating small trees objects
    for (var i = 0; i < 10; i++) {
        var tree = Object.create(smallTree);
        newRandomLocation(tree, 2, 0, 0);
        staticObjs.push(tree);
    }

    var image = new Image();
    image.addEventListener("load", loadHandler, false);
    image.src = "./images/SkiFreeStuff.png";

    var mirroredImage = new Image();
    mirroredImage.addEventListener("load", loadHandler, false);
    mirroredImage.src = "./images/SkiFreeStuffMirrored.png";

    var objImage = new Image();
    objImage.addEventListener("load", loadHandler, false);
    objImage.src = "./images/SkiFreeObjects.png"

    var REACHED_END = false;

    var UP    = 38;
    var DOWN  = 40;
    var RIGHT = 39;
    var LEFT  = 37;
    var moveUp    = false;
    var moveDown  = false;
    var moveRight = false;
    var moveLeft  = false;

    window.addEventListener("keydown", function(event) {
        switch(event.keyCode) {
            case UP:
                moveUp = true;
                break;;
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

    window.addEventListener("keyup", function(event) {
        switch (event.keyCode) {
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

    function loadHandler() {
        update();
    }

    function isObjVisibleOrAhead(obj) {
        var xOk =  false;
        var yOk = false;

        if ((obj.x + obj.sourceWidth) > camera.x) {
            xOk = true;
        }
        if ((obj.y + obj.sourceHeight) > camera.y) {
            yOk = true;
        }
        return (xOk && yOk);
    }

    function isObjVisible(obj) {
        var xOk = false;
        var yOk = false;
        var xdelta = obj.x - camera.x;
        var ydelta = obj.y - camera.y;
        if ((xdelta > -obj.sourceWidth) && (xdelta < canvas.width)) {
            xOk = true;
        }
        if ((ydelta > -obj.sourceHeight) && (ydelta < canvas.height)) {
            yOk = true;
        }
        return (xOk && yOk);
    }

    function newRandomLocation(obj, factor, offsetx, offsety) {
        var x = (Math.random() * (factor*canvas.width - obj.sourceWidth)) + camera.x + offsetx;
        var y = (Math.random() * (factor*canvas.height - obj.sourceHeight)) +  camera.y + offsety;
        obj.x = x;
        obj.y = y;
    }

    function update(){
        window.requestAnimationFrame(update, canvas);
        if (moveUp) {
            moveUp = false;
        } else if (moveDown) {
            if (skier.state !== STRAIGHT_DOWN && skier.state !== DISABLED) {
                changeSkierState(skier, STRAIGHT_DOWN);
            }
            moveDown = false;
        } else if(moveLeft) {
            switch (skier.state) {
                case LEFT_HORIZONTAL:
                    animateSkierState(skier, WALK_LEFT);
                    skier.vx = -SPEED;
                    skier.vy = 0;
                    break;
                case WALK_LEFT:
                    animateSkierState(skier, LEFT_HORIZONTAL);
                    skier.vx = -SPEED;
                    skier.vy = 0;
                    break;
                case STRAIGHT_DOWN:
                    changeSkierState(skier, LEFT_SLIGHT);
                    break;
                case LEFT_SLIGHT:
                    changeSkierState(skier, LEFT_DIAGONAL);
                    break;
                case LEFT_DIAGONAL:
                    changeSkierState(skier, LEFT_HORIZONTAL);
                    break;
                case RIGHT_HORIZONTAL:
                    changeSkierState(skier, RIGHT_DIAGONAL);
                    break;
                case WALK_RIGHT:
                    changeSkierState(skier, RIGHT_DIAGONAL);
                    break;
                case RIGHT_DIAGONAL:
                    changeSkierState(skier, RIGHT_SLIGHT);
                    break;
                case RIGHT_SLIGHT:
                    changeSkierState(skier, STRAIGHT_DOWN);
                    break;
                case COLLISION:
                    changeSkierState(skier, LEFT_HORIZONTAL);
                    break;
            }
            moveLeft = false;
        } else if (moveRight) {
            switch (skier.state) {
                case RIGHT_HORIZONTAL:
                    animateSkierState(skier, WALK_RIGHT);
                    skier.vx = SPEED;
                    skier.vy = 0;
                    break;
                case WALK_RIGHT:
                    animateSkierState(skier, RIGHT_HORIZONTAL);
                    skier.vx = SPEED;
                    skier.vy = 0;
                    break;
                case STRAIGHT_DOWN:
                    changeSkierState(skier, RIGHT_SLIGHT);
                    break;
                case RIGHT_SLIGHT:
                    changeSkierState(skier, RIGHT_DIAGONAL);
                    break;
                case RIGHT_DIAGONAL:
                    changeSkierState(skier, RIGHT_HORIZONTAL);
                    break;
                case LEFT_HORIZONTAL:
                    changeSkierState(skier, LEFT_DIAGONAL);
                    break;
                case WALK_LEFT:
                    changeSkierState(skier, LEFT_DIAGONAL);
                    break;
                case LEFT_DIAGONAL:
                    changeSkierState(skier, LEFT_SLIGHT);
                    break;
                case LEFT_SLIGHT:
                    changeSkierState(skier, STRAIGHT_DOWN);
                    break;
                case COLLISION:
                    changeSkierState(skier, RIGHT_HORIZONTAL);
                    break;
            }
            moveRight = false;
        } else {
            switch (skier.state) {
                case LEFT_HORIZONTAL:
                case WALK_LEFT:
                case RIGHT_HORIZONTAL:
                case WALK_RIGHT:
                    skier.vx = 0;
                    skier.vy = 0;
                    break;
            }
        }

        skier.x = Math.max(0, Math.min(skier.x + skier.vx, gameWorld.width - skier.sourceWidth));
        skier.y = Math.max(0, Math.min(skier.y + skier.vy, gameWorld.height - skier.sourceHeight));
        camera.x = Math.max(0, Math.min(
            Math.floor(skier.x + (skier.sourceWidth/2) - (camera.width/2)),
            gameWorld.width - camera.width
        ));
        camera.y = Math.max(0, Math.min(
            Math.floor(skier.y + (skier.sourceHeight/2) - (camera.height/2)),
            gameWorld.height - camera.height
        ));

        for (var i = 0; i < staticObjs.length; i++) {
            var obj = staticObjs[i];
            if (isObjVisible(obj)) {
                if (rectCollisionDetection(skier, obj) !== "none") {
                    skier.vx = 0;
                    skier.vy = 0;
                    changeSkierState(skier, COLLISION);
                    break;
                }
            }
        }

        for (var i = 0; i < staticObjs.length; i++) {
            var obj = staticObjs[i];
            if (! isObjVisibleOrAhead(obj)) {
                newRandomLocation(obj, 2, 0, canvas.height);
            }
        }

        if (!REACHED_END &&
            (skier.y >= (gameWorld.height - skier.sourceHeight))) {
            skier.vx = 0;
            skier.vy = 0;
            changeSkierState(skier, DISABLED);
            REACHED_END = true;
        }

        render();
    }

    function render() {
        drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
        drawingSurface.save();
        drawingSurface.translate(-camera.x, -camera.y);

        for (var i = 0; i < staticObjs.length; i++) {
            var  obj = staticObjs[i];
            if (isObjVisible(obj)) {
                drawingSurface.drawImage(
                    objImage, obj.sourceX, obj.sourceY,
                    obj.sourceWidth, obj.sourceHeight,
                    Math.floor(obj.x), Math.floor(obj.y),
                    obj.sourceWidth, obj.sourceHeight
                );
            }
        }
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            drawingSurface.drawImage(
                sprite.mirrored ? mirroredImage : image,
                sprite.sourceX, sprite.sourceY,
                sprite.sourceWidth, sprite.sourceHeight,
                Math.floor(sprite.x), Math.floor(sprite.y),
                sprite.sourceWidth, sprite.sourceHeight
            );
        }

        drawingSurface.restore();
    }
}());
