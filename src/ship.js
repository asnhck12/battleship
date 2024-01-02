export class ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hitCount = hitCount;
    }
}

ship.isSunk = function (length, hitCount) {
    if (hitCount === length) {
        return true;
    }
}

ship.isHit = function () {
    if (ship.isSunk = false) {
        hitCount++;
    }
    else {
        console.log("Your ship has sunk");
    }
}
