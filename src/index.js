import { gameProcess } from "./playerTurns";
import {battleshipMainGrid} from "./player";
import { player } from "./player";

const playButton = document.getElementById("playButton");
const playArea = document.getElementById("playArea");

//Creates the two boards for each player
function battleshipMainGridGenerated(player1,player2) {
    battleshipMainGrid(player1,"board1");
    battleshipMainGrid(player2,"board2");
}

const startButton = document.getElementById("playButton");

//Generate the main playing boards, placements and scores
playButton.addEventListener("click", function() {
    playArea.innerHTML = "";
    setTimeout(function() {
        const players = player();

        const player1 = players.player1Board;
        const cpu = players.cpuBoard;

        const player1ShipPlacements = players.player1Ships;
        const cpuShipPlacements = players.cpuShips;

        const player1Attacks = [];
        const cpuAttacks = [];
        battleshipMainGridGenerated(player1,cpu);
        gameProcess(player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks);
        startButton.style.display = "none";
    }, 1);
});

