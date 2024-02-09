// const { player,playerTurns } = await import('./player.js');

import { player,playerTurns } from './player.js';

const players = player();

const player1 = players.player1Board;
const cpu = players.cpuBoard;

const player1ShipPlacements = players.player1Ships;
const cpuShipPlacements = players.cpuShips;

const player1Attacks = [];
const cpuAttacks = [];


// export 
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

let i=0;


export function gameProcess(x,y) {
    const cells = document.getElementById("board2");
    let currentPlayer = 'player1';

    while (currentPlayer != ("CPU wins!" || "Player 1 wins!")) {
        if (currentPlayer === 'player1') {
            // let x = x;
            // let y = y;
            const rowsArray = cells.getElementsByClassName("rows");
            const columnsArray = cells.getElementsByClassName("columns");
            for (let i=0; i<10; i++) {
                
                for (let j=0; j<10; j++) {
                    // console.log("test" + i + ": " + rowsArray[i].id + "test" + j + ": " + columnsArray[j].id);
                    columnsArray[j].addEventListener("click", function() {
                        console.log(i + " " + j);
                    })
            }
        }



            currentPlayer = playerTurns(x,y,currentPlayer);
        }
        else if (currentPlayer === 'cpu') {
            const CALresult = cpuAttackLocation();
            const cpux = CALresult.attackX;
            const cpuy = CALresult.attackY;
            currentPlayer = playerTurns(cpux,cpuy,currentPlayer);
            console.log(i);
            i++;
            if (i === 100)  {
                break;
            }
        }
        else {
            console.log("Player doesn't exist");
            break;
        }
    }
}


// function selectingCell(j,i,board) {
//     let x = j;
//     let y = i;
//     return { x, y };
// }

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
        console.log(newDivsRows);
        const playArea = document.getElementById("playArea");
        newGridSection.appendChild(newDivsRows);
        for (let j=0; j < 10; j++){
            const newDivsColumns =  document.createElement("div");
            newDivsColumns.setAttribute("id",boards[j][i]);
            newDivsColumns.setAttribute("class","columns"); 
            console.log(newDivsColumns);
            newDivsRows.appendChild(newDivsColumns);
            // if (gameProcess.currentPlayer === "player1") {
            // newDivsColumns.addEventListener("click", function() {
            //     const x = j;
            //     const y = i;
            //     gameProcess (x,y);

            //     // console.log(i);
            //     // console.log(j);
            // }
            // // selectingCell(j,i,boards)
            // );
            // }           
        }
    }
}

export function battleshipMainGridGenerated() {
    battleshipMainGrid(player1,"board1");
    battleshipMainGrid(cpu,"board2");
}


//assign ids for each div