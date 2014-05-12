var LEFT_HORIZONTAL  = 0;
var RIGHT_HORIZONTAL = 1;
var LEFT_SLIGHT      = 2;
var RIGHT_SLIGHT     = 3;
var LEFT_DIAGONAL    = 4;
var RIGHT_DIAGONAL   = 5;
var STRAIGHT_DOWN    = 6;
var WALK_LEFT        = 7;
var WALK_RIGHT       = 8;

//var SPEED      = 3;
//var COMPONENT1 = 1.5;
//var COMPONENT2 = 2.6;
var SPEED      = 1;
var COMPONENT1 = 0.5;
var COMPONENT2 = 0.87;

var smallTree = {
    sourceX:      0,
    sourceY:      30,
    sourceWidth:  28,
    sourceHeight: 32,
    x:            0,
    y:            0
};

var spriteObject = {
    sourceX:      0,
    sourceY:      6,
    sourceWidth:  25,
    sourceHeight: 28,
    x:            0,
    y:            0,
    vx:           0,
    vy:           0,
    state:        RIGHT_HORIZONTAL,
    mirrored:     false,
    counter:      0,
    step:         10,
};


function changeSkierState(skier, state) {
    switch (state) {
        case LEFT_HORIZONTAL:
            skier.sourceX      = 249;
            skier.sourceY      = 6;
            skier.sourceWidth  = 25;
            skier.sourceHeight = 28;
            skier.state        = LEFT_HORIZONTAL;
            skier.mirrored     = true;
            break;
        case RIGHT_HORIZONTAL:
            skier.sourceX      = 0;
            skier.sourceY      = 6;
            skier.sourceWidth  = 25;
            skier.sourceHeight = 28;
            skier.state        = RIGHT_HORIZONTAL;
            skier.mirrored     = false;
            break;
        case LEFT_SLIGHT:
            skier.sourceX      = 224;
            skier.sourceY      = 0;
            skier.sourceWidth  = 25;
            skier.sourceHeight = 34;
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
            skier.state        = WALK_RIGHT;
            skier.mirrored     = false;
            break;
        case WALK_LEFT:
            skier.sourceX      = 216;
            skier.sourceY      = 40;
            skier.sourceWidth  = 25;
            skier.sourceHeight = 28;
            skier.state        = WALK_LEFT;
            skier.mirrored     = true;
            break;
    }
}

function  animateSkierState(skier, state) {
    if (skier.counter === skier.step) {
        skier.counter = 0;
        changeSkierState(skier, state);
    } else {
        skier.counter += 1;
    }
}
