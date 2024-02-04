//node
// const { placingShips } = await import('./gameboard.js');
// const { receiveAttack } = await import('./gameboard.js');
// const { createGrid } = await import('./gameboard.js');
// const { placeShip } = await import('./gameboard.js');

//jest
import { placingShips } from './gameboard';
import { receiveAttack } from './gameboard';
import { createGrid } from './gameboard';
import { placeShip } from './gameboard';

//Create grids and placing ships 
export function player() {
    const player1Grid = createGrid();
    const cpuGrid = createGrid();

    const player1 = placingShips(player1Grid);
    const cpu = placingShips(cpuGrid);

    const player1Board = player1.battleShipGrid;
    const cpuBoard = cpu.battleShipGrid;

    const player1Ships = player1.placedShipRecord;
    const cpuShips = cpu.placedShipRecord;

    return {player1Board,cpuBoard,player1Ships,cpuShips};
}

// const players = player();

// const player1 = players.player1Board;
// const cpu = players.cpuBoard;

// const player1ShipPlacements = players.player1Ships;
// const cpuShipPlacements = players.cpuShips;

// const player1Attacks = [];
// const cpuAttacks = [];

//the player would take a turn, and it would either hit or miss
export function turn(x,y,playerBoard,shipPlacements,attacks) {
    const existingHit = attacks.find(hits => hits.X === x && hits.Y === y);

    if (existingHit) {
        return "Already selected";
    }
    else {
        attacks.push({X: x, Y: y});
        return receiveAttack(x,y,playerBoard,shipPlacements);
    }
}

//For each players turn it returns what happened with missing or hitting
export function playerTurns(x,y,player) {
    if (player === 'player1'){
        console.log("Player 1s turn!");
        let cpuResult = turn(x,y,cpu,cpuShipPlacements,cpuAttacks);
        console.log(cpuResult);
        if (cpuResult === "All your ships have sunk!") { 
            return "Player 1 wins!";
        }
        return 'cpu';
    }
    else if (player === 'cpu'){
        console.log("cpus's turn!");
        let player1Result = turn(x,y,player1,player1ShipPlacements,player1Attacks);
        console.log(player1Result);
        if (player1Result === "All your ships have sunk!") { 
            return "CPU wins!";
        }
        return 'player1';
    }
}

//generates cpu attack
// export function cpuAttackLocation() {
//     let setPairs = [];

//     do {
//     attackY = Math.floor(Math.random() * 10);
//     attackX = Math.floor(Math.random() * 10);

//     existingPair = player1Attacks.find(position => position.X === attackX && position.Y === attackY);    

//     if (!existingPair) {
//         setPairs.push({ X: attackX, Y: attackY });
//     }

// } while (existingPair);

// return {attackX, attackY};

// }

//player1 attack location
function playerAttackLocation(x,y) {
    return {x,y};

}

let i = 0;

//turns are looped here
// export function gameProcess() {
//     let currentPlayer = 'player1';

//     while (currentPlayer != ("CPU wins!" || "Player 1 wins!")) {
//         if (currentPlayer === 'player1') {
//             // playersLocation = playerAttackLocation();
//             // let x = playersLocation.x;
//             // let y = playersLocation.y;
//             let x = 3;
//             let y = 2;
//             currentPlayer = playerTurns(x,y,currentPlayer);
//             currentPlayer = 'cpu';
//         }
//         else 
//         if (currentPlayer === 'cpu') {
//             const CALresult = cpuAttackLocation();
//             const x = CALresult.attackX;
//             const y = CALresult.attackY;
//             currentPlayer = playerTurns(x,y,currentPlayer);
//             console.log(i);
//             i++;
//             if (i === 100)  {
//                 break;
//             }
//         }
//         else {
//             console.log("Player doesn't exist");
//             break;
//         }
//     }
// }