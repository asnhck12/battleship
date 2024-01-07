// const gameboard = require('./placeShip')

// import { placeShip } from './gameboard'
// import { ship } from './ship';

import { placeShip } from './gameboard';
import { ship } from './ship';

const carrier = new ship("carrier", 5, 0);
const battleship = new ship("battleship", 4, 0);
const cruiser = new ship("cruiser", 3, 0);
const submarine = new ship("submarine", 3, 0);
const destroyer = new ship("destroyer", 2, 0);

var placedShip = 
[
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "b","b", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"]
]
var placedShip2 = 
[
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "b", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "b", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "b", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"]
]
var placedShip3 = 
[
    ["O", "O", "O", "O","O", "O", "O", "b","b", "b"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
    ["O", "O", "O", "O","O", "O", "O", "O","O", "O"]
]
// attackedCoOrd =
test('Placing ships in specific coordinates', () => { 
    expect(placeShip(3, 2, destroyer, "horizontal")).toEqual(placedShip);
})

test('Placing ships in specific coordinates 2', () => {
    expect(placeShip(2, 4, submarine, "vertical")).toEqual(placedShip2);
})

test('Placing ships in specific coordinates 3', () => {
    expect(placeShip(7, 0, cruiser, "horizontal")).toEqual(placedShip3);
})

test('Placing ships in specific coordinates 3', () => {
    expect(placeShip(8, 0, cruiser, "horizontal")).toEqual("out of bounds");
})

// test('Counting the number of hits', () => {
//     expect(receiveAttack(cruiser, 4).toMatch(hitcount === 4));
// })

// test('Missed attacks', () => {
//     expect(recordedAttacks(4).toMatch(attackedCoOrd))
// })

// test('All ships hit', () => {
//     expect(shipsSunk(5).toMatch(true))
// })
