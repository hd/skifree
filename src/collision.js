// which side r1 has collided with r2 also readjust so they don't overlap
function rectCollisionDetection(r1, r2) {
    var collisionSide = "";

    var vx = r1.x + r1.sourceWidth/2 - r2.x  - r2.sourceWidth/2;
    var vy = r1.y + r1.sourceHeight/2 - r2.y - r2.sourceHeight/2;

    var combinedHalfWidths = r1.sourceWidth/2 + r2.sourceWidth/2;
    var combinedHalfHeights = r1.sourceHeight/2 + r2.sourceHeight/2;

    if (Math.abs(vx) < combinedHalfWidths) {
        if (Math.abs(vy) < combinedHalfHeights) {
            var overlapX = combinedHalfWidths - Math.abs(vx);
            var overlapY = combinedHalfHeights - Math.abs(vy);

            if (overlapX >= overlapY) {
                if (vy > 0) {
                    collisionSide = "top";
                    r1.y = r1.y + overlapY;
                } else {
                collisionSide = "bottom";
                r1.y = r1.y - overlapY;
                }
            } else {
                if (vx > 0) {
                    collisionSide = "left";
                    r1.x = r1.x + overlapX;
                } else {
                    collisionSide = "right";
                    r1.x = r1.x - overlapX;
                }
            }
        } else {
            collisionSide = "none";
        }
    } else {
        collisionSide = "none";
    }
    return collisionSide;
}
