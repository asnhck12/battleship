export class ship {
    constructor(name, length, hitCount) {
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

// module.exports = ship;