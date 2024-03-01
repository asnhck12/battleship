// const { player,playerTurns } = await import('./player.js');

import { playerTurns } from './player.js';

const player1Attacks = [];
const cpuAttacks = [];
let gameOver = false; 

function cpuAttackLocation() {
    let setPairs = [];
    let existingPair;
    let attackX;
    let attackY;

    do {
    attackY = Math.floor(Math.random() * 10);
    attackX = Math.floor(Math.random() * 10);

    existingPair = player1Attacks.find(position => position.X === attackX && position.Y === attackY);    

    if (!existingPair) {
        setPairs.push({ X: attackX, Y: attackY });
    }

} while (existingPair);

return {attackX, attackY};

}

let n=0;

function player1Turn() {
    return new Promise((resolve, reject) => {
        if (gameOver) return;

        const cells = document.getElementById("board2");
        const rowsArray = cells.getElementsByClassName("rows");

        // while (!gameOver) {

        for (let i=0; i<10; i++) {
            const currentRow = rowsArray[i];
            const columnsArray = currentRow.getElementsByClassName("columns");

            for (let j=0; j<10; j++) {
                const x = j;
                const y = i;
                columnsArray[j].addEventListener("click", function() {
                    resolve({x, y});
                    if (!gameOver){
                        if (columnsArray[j].id === "B") {
                            columnsArray[j].id = "H1";}
                        
                        else if (columnsArray[j].id === "O") {
                            columnsArray[j].id = "X1";
                        }
                        else {
                             console.log ("Error")};
                    }});
                } 
            }
        // }
        });}

export async function gameProcess(player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks) {
    let currentPlayer = 'player1';
    gameOver = false;

    while (!gameOver) {
        console.log("current player Return: " + currentPlayer)
        if (currentPlayer === 'player1') {
            const {x,y} = await player1Turn();
            currentPlayer = playerTurns(x,y,currentPlayer,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks);
            console.log("current player1 return 1: " + currentPlayer)
        }

        else if (currentPlayer === 'cpu') {
            const cells = document.getElementById("board1");
            const rowsArray = cells.getElementsByClassName("rows");
            
            const CALresult = cpuAttackLocation();
            const cpux = CALresult.attackX;
            const cpuy = CALresult.attackY;

            const currentRow = rowsArray[cpuy];
            const columnsArray = currentRow.getElementsByClassName("columns");
            
            if (columnsArray[cpux].id === "B") {
                columnsArray[cpux].id = "H1";}
                else if (columnsArray[cpux].id === "O") {
                    columnsArray[cpux].id = "X1";
                }
                else {};

            currentPlayer = playerTurns(cpux,cpuy,currentPlayer,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks);
            console.log("current cpu return 2: " + currentPlayer)
        }
        else if (currentPlayer.includes("wins")) {
            gameOver = true;
            break;
        }
    }

}
