var LEFT_HORIZONTAL  = 0;
var RIGHT_HORIZONTAL = 1;
var LEFT_SLIGHT      = 2;
var RIGHT_SLIGHT     = 3;
var LEFT_DIAGONAL    = 4;
var RIGHT_DIAGONAL   = 5;
var STRAIGHT_DOWN    = 6;
var WALK_LEFT        = 7;
var WALK_RIGHT       = 8;

var spriteObject = {
    sourceX:      0,
    sourceY:      6,
    sourceWidth:  25,
    sourceHeight: 28,
    x:            0,
    y:            0,
    width:        25,
    height:       28,
    vx:           0,
    vy:           0,
    state:        RIGHT_HORIZONTAL,
    mirrored:     false,
    counter:      0,
    step:         10,

    halfWidth: function(){
        return this.width / 2;
    },
    halfHeight: function(){
        return this.height / 2;
    },
    centerX: function(){
        return this.x + this.halfWidth();
    },
    centerY: function(){
        return this.y + this.halfHeight();
    }
};
