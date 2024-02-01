export class Ship {
    constructor(name, size, hitCount) {
        this.name = name;
        this.size = size;
        this.hitCount = hitCount;
    }
}

// let totalSunk = 0;

export function allSunk (totalSunk) {
    // for (let i=0;i < shipRecord.length; i++) {
    //     shipRecord.hitCount
        if (totalSunk === 4) {
            // console.log("All your ships have sunk!");
            // return "All your ships have sunk!";
            return true;
        }
    }
// }

export function isSunk (length, hitCount, shipRecord) {
    if (hitCount === length) {
        // totalSunk++;
        // console.log("total sunk: " + totalSunk);
        // if (totalSunk === 5) {
        //     console.log("All Sunk!!!!!");
        //     return "All your ships have sunk!";
        // }
        // allSunk(totalSunk);
        // console.log("ship sunk");
        return true;
    }
}

// module.exports = ship;