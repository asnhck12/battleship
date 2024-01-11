export class Ship {
    constructor(name, length, hitCount) {
        this.name = name;
        this.length = length;
        this.hitCount = hitCount;
    }
}

export function isSunk (length, hitCount) {
    if (hitCount === length) {
        return true;
    }
}

// module.exports = ship;