//node
// const { Ship } = await import('./ship.js');
// const { isSunk } = await import('./ship.js');
// const { allSunk } = await import('./ship.js')

//jest
import { Ship } from './ship';
import { isSunk } from './ship';
import { allSunk } from './ship';

//all ships and their stats
const carrier = new Ship("carrier", 5, 0);
const battleship = new Ship("battleship", 4, 0);
const cruiser = new Ship("cruiser", 3, 0);
const submarine = new Ship("submarine", 3, 0);
const destroyer = new Ship("destroyer", 2, 0);

const allShips = [destroyer,cruiser,submarine,battleship,carrier];

//creates a battleship grid for each player
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

//Below places ships on the grid
export function placeShip(x, y, ship, direction, battleShipGrid, placedShipRecord) {
    const shipEndX = x + ship.size;
    const shipEndY = y + ship.size;

    if (direction === "vertical") {
            const shipPositions = [];

            for (let b=y; b < shipEndY; b++){
                battleShipGrid[b][x] = "B";
                shipPositions.push({ X: x, Y: b });
            }
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.size, hitCount: ship.hitCount },
                    positions: shipPositions
                });
            return battleShipGrid;
    }
    else if (direction === "horizontal") {
            const shipPositions = [];

            for (let b=x; b < shipEndX; b++){
                battleShipGrid[y][b] = "B";
                shipPositions.push({ X: b, Y: y });
            }
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.size, hitCount: ship.hitCount },
                    positions: shipPositions
                });
            return battleShipGrid;
    } else {
        return "Invalid direction";
    }
}

const startButton = document.getElementById("playButton");
const gameLog = document.getElementById("gameLog");

//Below records the hits or misses attempted
export function receiveAttack(x,y, battleShipGrid, placedShipRecord, player){
    const shipHit = placedShipRecord.find(ship => {
        return ship.positions.some(position => position.X === x && position.Y === y);});
    
    if (shipHit) {
        shipHit.shipDetails.hitCount++;
        battleShipGrid[y][x]='H';
        const currentLength = shipHit.shipDetails.length;
        const currentCount = shipHit.shipDetails.hitCount;
        
        if (isSunk(currentLength,currentCount,placedShipRecord)) {
            const totalCount = placedShipRecord.reduce((total,currentShipObject) => {
                return total + currentShipObject.shipDetails.hitCount;},0);
            if (allSunk(totalCount)) {
                startButton.innerHTML = "Play Again!";
                startButton.style.display = "block";
                gameLog.innerHTML = player + " has Won!";
                return "All sunk";
            }
            else {
                gameLog.innerHTML = player + " has sunk the " + shipHit.shipDetails.name + " ship!";
            }
        }
        else {
            gameLog.innerHTML = player + " has a hit!";
            return "Hit!";
        }
    }
    else {
        battleShipGrid[y][x]='X';
        gameLog.innerHTML = player + " has missed!";
        return "Missed!"
                
    }
}

//the ships placed automatically for the CPUs board
export function placingShips(battleShipGrid) {
    const placedShipRecord = [];
    let loopCounter = 0;

    for (let i = 0; i < allShips.length; i++) {
        const currentShip = allShips[i];
        const maxShipPlacement = 10 - currentShip.size;
        let direction = "";
        let existingRecord;
        let randPositions;
        
        do {
            randPositions = []; 

            const randDirection = Math.floor(Math.random() * 2);

            if (randDirection === 0) {
                // Vertical placement
                direction = "vertical";
                const randomY = Math.floor(Math.random() * maxShipPlacement);
                const randomX = Math.floor(Math.random() * 10);
                for (let j = 0; j < currentShip.size; j++) {
                    randPositions.push({ X: randomX, Y: randomY + j });
                }
            } else {
                // Horizontal placement
                direction = "horizontal";
                const randomX = Math.floor(Math.random() * maxShipPlacement);
                const randomY = Math.floor(Math.random() * 10);
                for (let k = 0; k < currentShip.size; k++) {
                    randPositions.push({ X: randomX + k, Y: randomY });
                }
            }

            // Check if any position overlaps with previously placed ships
            existingRecord = randPositions.some(position => 
                placedShipRecord.some(shipArray =>
                    shipArray.positions.some(p => p.X === position.X && p.Y === position.Y)
                )
            );

            loopCounter++;
            if (loopCounter > 25000) {
                console.error("Infinite loop detected. Breaking out.");
                break;
            }

        } while (existingRecord);

        // Place the ship if a valid position was found
        placeShip(randPositions[0].X, randPositions[0].Y, currentShip, direction, battleShipGrid, placedShipRecord);
    }
    return { battleShipGrid, placedShipRecord };
}
