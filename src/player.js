//node
const { placingShips } = await import('./gameboard.js');
const { receiveAttack } = await import('./gameboard.js');
const { createGrid } = await import('./gameboard.js');
const { placeShip } = await import('./gameboard.js');

//jest
// import { placingShips } from './gameboard';
// import { receiveAttack } from './gameboard';
// import { createGrid } from './gameboard';
// import { placeShip } from './gameboard';

// export 
function player() {
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

const players = player();

const player1 = players.player1Board;
const cpu = players.cpuBoard;

const player1ShipPlacements = players.player1Ships;
const cpuShipPlacements = players.cpuShips;

const player1Attacks = [];
const cpuAttacks = [];

//the player would take a turn, and it would either hit or miss
// export 
function turn(x,y,playerBoard,shipPlacements,attacks) {
    const existingHit = attacks.find(hits => hits.X === x && hits.Y === y);

    if (existingHit) {
        return "Already selected";
    }
    else {
        attacks.push({X: x, Y: y});
        return receiveAttack(x,y,playerBoard,shipPlacements);
    }
}

// export 
function playerTurns(x,y,player) {
    if (player === 'player1'){
        console.log("Player 1s turn!");
        cpuResult = turn(x,y,cpu,cpuShipPlacements,cpuAttacks);
        console.log(cpuResult);
        if (cpuResult === "All your ships have sunk!") { 
            return "You have won!";
        }
    }
    else if (player === 'cpu'){
        console.log("cpus's turn!");
        player1Result = turn(x,y,player1,player1ShipPlacements,player1Attacks);
        console.log(player1Result);
        if (player1Result === "All your ships have sunk!") { 
            return "You have won!";
        }
    }
}