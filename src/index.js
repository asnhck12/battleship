import { gameProcess } from "./playerTurns";
import {battleshipMainGridGenerated} from "./player";
import { player } from "./player";

const playButton = document.getElementById("playButton");
const playArea = document.getElementById("playArea");

playButton.addEventListener("click", function() {
    playArea.innerHTML = "";
    setTimeout(function() {
        battleshipMainGridGenerated();
        gameProcess();
    }, 10);
});

