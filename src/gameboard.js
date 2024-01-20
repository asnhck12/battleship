//node
// const { Ship } = await import('./ship.js');
// const { isSunk } = await import('./ship.js');
// const { allSunk } = await import('./ship.js')

//jest
import { Ship } from './ship';
import { isSunk } from './ship';
import { allSunk } from './ship';

const battleFieldGrid = createGrid();
const placedShipRecord = [];
const missedHitRecord = [];

const carrier = new Ship("carrier", 5, 0);
const battleship = new Ship("battleship", 4, 0);
const cruiser = new Ship("cruiser", 3, 0);
const submarine = new Ship("submarine", 3, 0);
const destroyer = new Ship("destroyer", 2, 0);

const allShips = [carrier,battleship,cruiser,submarine,destroyer];

export function createGrid() {
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
export function placeShip(x, y, ship, direction) {
    const shipEndX = x + ship.size;
    const shipEndY = y + ship.size;

    if (direction === "vertical") {
            const shipPositions = [];

            for (let b=y; b < shipEndY; b++){
                battleFieldGrid[b][x] = "B";
                shipPositions.push({ X: x, Y: b });
            }
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.size, hitCount: ship.hitCount },
                    positions: shipPositions
                });
                console.log(battleFieldGrid);
            return battleFieldGrid;
    }
    else if (direction === "horizontal") {
            const shipPositions = [];

            for (let b=x; b < shipEndX; b++){
                battleFieldGrid[y][b] = "B";
                shipPositions.push({ X: b, Y: y });
            }
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.size, hitCount: ship.hitCount },
                    positions: shipPositions
                });
                console.log(battleFieldGrid);
            return battleFieldGrid;
    } else {
        return "Invalid direction";
    }
}

export function receiveAttack(x,y){
    const shipHit = placedShipRecord.find(ship => {
        return ship.positions.some(position => position.X === x && position.Y === y);});
    
    if (shipHit) {
        shipHit.shipDetails.hitCount++;
        battleFieldGrid[y][x]='H';
        const currentLength = shipHit.shipDetails.size;
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
    return [battleFieldGrid];
}

export function placingShips() {
    for (let i=0; i < allShips.length; i++) {
        const currentShip = allShips[i];
        const maxShipPlacement = 10 - currentShip.size;
        var direction = "";
        let existingRecord;
        let randPositions = [];
       
        const randDirection = Math.floor(Math.random() * 2);

        let randomY;
        let randomX;

        do {
            if (randDirection === 0) {
                direction = "vertical";
                randomY = Math.floor(Math.random() * maxShipPlacement);
                randomX = Math.floor(Math.random() * 10);
                for (let j = 0; j < currentShip.size; j++) {
                    const posY = randomY + j;
                    console.log("random Y: " + randomY);
                    randPositions.push({ X: randomX, Y: posY });
                }
            }
            else {
                direction = "horizontal";
                randomX = Math.floor(Math.random() * maxShipPlacement);
                randomY = Math.floor(Math.random() * 10);
                for (let k = 0; k < currentShip.size; k++) {
                    const posX = randomX + k;
                    console.log("random X: " + randomX);
                    randPositions.push({ X: posX, Y: randomY });
                }
            };
            
            console.log("random positions: " + randPositions);

            // for (let p = 0; p < randPositions.length; p++)
            // {
                // existingRecord = placedShipRecord.some(shipArray => shipArray.positions.some(position => position.X === Xpos && position.Y === Ypos));

                existingRecord = randPositions.some(position => {return placedShipRecord.some(shipArray =>shipArray.positions.some(p => p.X === position.X && p.Y === position.Y))})
            // };
                   
        } while (existingRecord);

        placeShip(randomX,randomY,currentShip,direction);
    }
    return battleFieldGrid;
}
