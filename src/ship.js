export class Ship {
    constructor(name, size, hitCount) {
        this.name = name;
        this.size = size;
        this.hitCount = hitCount;
    }
}

export function allSunk (shipRecord) {
    for (let i=0;i < shipRecord.length; i++) {
        if (i === 4) {
            return "All your ships have sunk!"
        }
    }
}

export function isSunk (length, hitCount, shipRecord) {
    if (hitCount === length) {
        allSunk(shipRecord);
        return true;
    }
}

// module.exports = ship;