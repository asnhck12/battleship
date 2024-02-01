export class Ship {
    constructor(name, size, hitCount) {
        this.name = name;
        this.size = size;
        this.hitCount = hitCount;
    }
}

export function allSunk (totalSunk) {
        if (totalSunk === 4) {
            return true;
        }
    }
// }

export function isSunk (length, hitCount) {
    if (hitCount === length) {
        return true;
    }
}