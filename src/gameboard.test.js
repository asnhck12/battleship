// const gameboard = require('./placeShip')

// import { placeShip } from './gameboard'
// import { ship } from './ship';

import { placeShip } from './gameboard';
import { Ship } from './ship';
import { receiveAttack } from './gameboard';
import { allSunk } from './ship';

const carrier = new Ship("carrier", 5, 0);
const battleship = new Ship("battleship", 4, 0);
const cruiser = new Ship("cruiser", 3, 0);
const submarine = new Ship("submarine", 3, 0);
const destroyer = new Ship("destroyer", 2, 0);

//Place all ships for both player and cpu on two different gameboards
test('All ships placed without any boats overlapping', () => {
    expect(shipPlacing()).toEqual(/*number of 'B' on the grid*/);
})

test('Two gameboards with all ships', () => {
    expect(/*number of shipPlacing outcomes*/).toEqual(2);
})







// var placedShip = 
// [
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "B","B", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"]
// ]
// var placedShip2 = 
// [
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "B", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "B", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "B", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"]
// ]
// var placedShip3 = 
// [
//     ["O", "O", "O", "O","O", "O", "O", "B","B", "B"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"],
//     ["O", "O", "O", "O","O", "O", "O", "O","O", "O"]
// ]
// // attackedCoOrd =
// test('Placing ships in specific coordinates', () => { 
//     expect(placeShip(3, 2, destroyer, "horizontal")).toEqual(placedShip);
// })
// test('Placing ships in specific coordinates 2', () => {
//     expect(placeShip(2, 4, submarine, "vertical")).toEqual(placedShip2);
// })

// test('Placing ships in specific coordinates 3', () => {
//     expect(placeShip(7, 0, cruiser, "horizontal")).toEqual(placedShip3);
// })

// test('Placing ships in specific coordinates 3', () => {
//     expect(placeShip(8, 0, cruiser, "horizontal")).toEqual("out of bounds");
// })

// var placedShipExample = 
// [
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'B','H', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O']
// ]

// var placedShipExampleMissed = 
// [
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'X', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'B','B', 'B', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O'],
//     ['O', 'O', 'O', 'O','O', 'O', 'O', 'O','O', 'O']
// ]

// test('Testing ship being hit and the right hitcount', () => {
//     placeShip(3, 2, destroyer, "horizontal");
//     const [grid, hitRecord, missedRecord] = receiveAttack(4, 2);
//     expect(grid).toEqual(placedShipExample);
//     expect(hitRecord[0].shipDetails.hitCount).toEqual(1);
// })

// test('Recording missed hits', () => {
//     placeShip(3, 2, cruiser, "horizontal");
//     const [grid, hitRecord, missedRecord] = receiveAttack(1, 1);
//     console.log(JSON.stringify(missedRecord.position));
//     expect(grid).toEqual(placedShipExampleMissed);
//     expect(missedRecord[0].position).toEqual({"X":1,"Y":1})
// })

// test('The ship has sunk', () => {
//     // placeShip(5, 2, destroyer, "horizontal");
//     // receiveAttack(3,2);
//     // const result = receiveAttack(6,2);
//     expect(receiveAttack(3,2)).toEqual('Your ship has sunk');
// })

// const testArray = [
//     {
//       shipDetails: { name: 'destroyer', length: 2, hitCount: 2 },
//       positions: [ [Object], [Object] ]
//     },
//     {
//       shipDetails: { name: 'cruiser', length: 3, hitCount: 3 },
//       positions: [ [Object], [Object], [Object] ]
//     },
//     {
//       shipDetails: { name: 'submarine', length: 3, hitCount: 3 },
//       positions: [ [Object], [Object], [Object], [Object], [Object] ]
//     },
//     {
//         shipDetails: { name: 'battleship', length: 4, hitCount: 4 },
//         positions: [ [Object], [Object], [Object] ]
//       },
//       {
//         shipDetails: { name: 'carrier', length: 5, hitCount: 5 },
//         positions: [ [Object], [Object], [Object], [Object], [Object] ]
//       }
//   ]

// test('All the ships have sunk', () => {
//     // placeShip(5, 2, destroyer, "horizontal");
//     // receiveAttack(3,2);
//     // const result = receiveAttack(6,2);
//     expect(allSunk(testArray)).toEqual("All your ships have sunk!");
// })
