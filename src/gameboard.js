// const { ship } = require("./ship");

//node
// const { ship } = await import('./ship.js');

//jest
import { ship } from './ship';

// import { ship } from "./ship";

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

const carrier = new ship("carrier", 5, 0);
const battleship = new ship("battleship", 4, 0);
const cruiser = new ship("cruiser", 3, 0);
const submarine = new ship("submarine", 3, 0);
const destroyer = new ship("destroyer", 2, 0);


//x is vertical and y is horizontal
export function placeShip(x, y, ship, direction) {
    const battleFieldGrid = createGrid();

    var maxShipPlacement = 10 - ship.length;
    if (direction === "vertical") {
        if (y <= maxShipPlacement){
            var shipEnd = y + ship.length;
            for (let b=y; b < shipEnd; b++){
                console.log(b);
                console.log(shipEnd);
                battleFieldGrid[b][x] = "b";
            }
            return battleFieldGrid;
        }
        else {return "out of bounds"}
    }
    else if (direction === "horizontal") {
        if (x <= maxShipPlacement){
            var shipEnd = x + ship.length;
            for (let b=x; b < shipEnd; b++){
                console.log(b);
                console.log(shipEnd);
                battleFieldGrid[y][b] = "b";
            }
            return battleFieldGrid;
            }
            
            else {return "out of bounds";}
        }
    }
