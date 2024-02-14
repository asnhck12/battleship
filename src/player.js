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
export function playerTurns(x,y,player,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks) {
    if (player === 'player1'){
        console.log("Player 1s turn!");
        let cpuResult = turn(x,y,cpu,cpuShipPlacements,cpuAttacks);
        console.log("p1 enemy grid: " + cpu);
        console.log("PLayer 1 outcome: " + cpuResult);
        if (cpuResult === "All your ships have sunk!") { 
            return "Player 1 wins!";
        }
        return 'cpu';
    }
    else if (player === 'cpu'){
        console.log("cpus's turn!");
        let player1Result = turn(x,y,player1,player1ShipPlacements,player1Attacks);
        console.log("cpu enemy grid: " + player1);
        console.log("cpu outcome: " + player1Result);
        if (player1Result === "All your ships have sunk!") { 
            return "CPU wins!";
        }
        return 'player1';
    }
}

//Create grids
export function battleshipMainGrid (boards,name) {
    const newGridSection = document.createElement("div");
    newGridSection.setAttribute("id",name);
    newGridSection.setAttribute("class","boards");
    playArea.appendChild(newGridSection);
        for (let i=0; i < 10; i++){
            const newDivsRows = document.createElement("div");
            newDivsRows.setAttribute("id","row"+i);
            newDivsRows.setAttribute("class","rows");
            // const playArea = document.getElementById("playArea");
            newGridSection.appendChild(newDivsRows);
            for (let j=0; j < 10; j++){
                const newDivsColumns =  document.createElement("div");
                newDivsColumns.setAttribute("id",boards[i][j]);
                newDivsColumns.setAttribute("class","columns");
                newDivsRows.appendChild(newDivsColumns);       
            }
        }
    }

    
// export function battleshipMainGridGenerated() {
//     battleshipMainGrid(player1,"board1");
//     battleshipMainGrid(cpu,"board2");
// }