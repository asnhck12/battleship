// import { placeShip } from './gameboard';
import { Ship } from '../ship';
import { receiveAttack } from '../gameboard';

import {player, turn} from '../player';
import { createGrid, placeShip } from '../gameboard';


const carrier = new Ship("carrier", 5, 0);

//boards exists for player1
test('player1 board exists', () => {
    const result = player();
    expect(Array.isArray(result.player1Board)).toBe(true);
})

//boards exists for cpu
test('player1 board exists', () => {
    const result2 = player();
    expect(Array.isArray(result2.cpuBoard)).toBe(true);
})

test('Counts the number of ships placed on the player1 board', () => {
    const result = player();
    // Count the number of 'B' on the player1 board
    const shipCount = result.player1Board.flat().filter(cell => cell === 'B').length;

    expect(shipCount).toBe(17);
});

test('Counts the number of ships placed on the cpu board', () => {
    const result = player();
    // Count the number of 'B' on the player1 board
    const shipCount = result.cpuBoard.flat().filter(cell => cell === 'B').length;

    expect(shipCount).toBe(17);
});

const attackRecord = [];
const shipRecord = [];
const testGrid = createGrid();
const placedShip = placeShip(3,2,carrier,"horizontal",testGrid,shipRecord);

//co ordinate for a miss made by a player
test('player takes a shot that misses', () => {
    expect(turn(7,1,placedShip,shipRecord,attackRecord)).toEqual("You've missed");
})

// //co ordinate for a hit made by a player
test('cpu takes a shot that hits', () => {
    expect(turn(3,2,placedShip,shipRecord,attackRecord)).toEqual("You've got a hit!");
})

test('repeating shot not allowed', () => {
    expect(turn(7,1,placedShip,shipRecord,attackRecord)).toEqual("Already selected");
})