// const { ship } = require("./ship");

// import { allSunk } from './ship.js';

// import { isSunk } from './ship.js';

//node
const { Ship } = await import('./ship.js');
const { isSunk } = await import('./ship.js');
const { allSunk } = await import('./ship.js')

//jest
// import { Ship } from './ship';
// import { isSunk } from './ship';
// import { allSunk } from './ship';

const battleFieldGrid = createGrid();
const placedShipRecord = [];
const missedHitRecord = [];

function createGrid() {
    const grid = [];
    for (let i=0; i < 10; i++){
        const row = [];
        for(let j=0; j < 10; j++){
            row.push('O');
        }
        grid.push(row);
    }
    return grid;
}

//x is vertical and y is horizontal
// export 
function placeShip(x, y, ship, direction) {
    const maxShipPlacement = 10 - ship.length;
    const existingRecord = placedShipRecord.find(shipArray => shipArray.shipDetails.name === ship.name
         && shipArray.positions.some(position => position.X === x && position.Y === y));
    
    if (direction === "vertical") {
        if (y <= maxShipPlacement){
            const shipEnd = y + ship.length;
            const shipPositions = [];

            for (let b=y; b < shipEnd; b++){
                battleFieldGrid[b][x] = "B";
                shipPositions.push({ X: x, Y: b });
            }
            if (existingRecord) {
                console.log("The ship has already been placed");
            } else {
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.length, hitCount: ship.hitCount },
                    positions: shipPositions
                });
            }
            return battleFieldGrid;
        }
        else {return "out of bounds"};
    }

    else if (direction === "horizontal") {
        if (x <= maxShipPlacement){
            const shipEnd = x + ship.length;
            const shipPositions = [];

            for (let b=x; b < shipEnd; b++){
                battleFieldGrid[y][b] = "B";
                shipPositions.push({ X: b, Y: y });
            }
            if (existingRecord) {
                console.log("The ship has already been placed");
            } else {
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.length, hitCount: ship.hitCount },
                    positions: shipPositions
                });
            }
            return battleFieldGrid;
        } else {
            return "Out of bounds";
        }
    } else {
        return "Invalid direction";
    }
}

// export 
function receiveAttack(x,y){
    const shipHit = placedShipRecord.find(ship => {
        return ship.positions.some(position => position.X === x && position.Y === y);});
    
    if (shipHit) {
        shipHit.shipDetails.hitCount++;
        battleFieldGrid[y][x]='H';
        const currentLength = shipHit.shipDetails.length;
        const currentCount = shipHit.shipDetails.hitCount;
        if (isSunk(currentLength,currentCount)) {
            return "Your ship has sunk";
        };
    }
    else {
        missedHitRecord.push (
        {position: {X: x, Y: y}});
        battleFieldGrid[y][x]='X';        
    }
    console.log(battleFieldGrid);
    // return [battleFieldGrid];
}

const carrier = new Ship("carrier", 5, 0);
const battleship = new Ship("battleship", 4, 0);
const cruiser = new Ship("cruiser", 3, 0);
const submarine = new Ship("submarine", 3, 0);
const destroyer = new Ship("destroyer", 2, 0);

allShips = [carrier, battleship,cruiser,submarine,destroyer];

// export 
function placingShips() {
    // for (const ship of allShips) 
    for (let i=0; i < allShips.length; i++) {
        const currentShip = allShips[i].name;
        const randomY = Math.floor(Math.random() * 10);
        const randomX = Math.floor(Math.random() * 10);
        const randDirection = Math.floor(Math.random() * 3);
        var direction = "";
        if (randDirection === 0) {
            direction = "vertical";
        }
        else {direction = "horizontal"};
        console.log ("x " + randomY);
        console.log ("y " + randomX);
        console.log ("ship " + currentShip);
        console.log ("direction " + direction);
        placeShip(randomX,randomY,currentShip,direction);
    }
}