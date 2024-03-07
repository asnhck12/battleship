/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createGrid: () => (/* binding */ createGrid),
/* harmony export */   placeShip: () => (/* binding */ placeShip),
/* harmony export */   placingShips: () => (/* binding */ placingShips),
/* harmony export */   receiveAttack: () => (/* binding */ receiveAttack)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
//node
// const { Ship } = await import('./ship.js');
// const { isSunk } = await import('./ship.js');
// const { allSunk } = await import('./ship.js')

//jest




const carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("carrier", 5, 0);
const battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("battleship", 4, 0);
const cruiser = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("cruiser", 3, 0);
const submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("submarine", 3, 0);
const destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("destroyer", 2, 0);

const allShips = [destroyer,cruiser,submarine,battleship,carrier];

function createGrid() {
    const grid = [];
    for (let i=0; i < 10; i++){
        const row = [];
        for(let j=0; j < 10; j++){
            row.push('O');
        }
        grid.push(row);
    }
    return grid;
}

//x is vertical and y is horizontal
function placeShip(x, y, ship, direction, battleShipGrid, placedShipRecord) {
    const shipEndX = x + ship.size;
    const shipEndY = y + ship.size;

    if (direction === "vertical") {
            const shipPositions = [];

            for (let b=y; b < shipEndY; b++){
                battleShipGrid[b][x] = "B";
                shipPositions.push({ X: x, Y: b });
            }
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.size, hitCount: ship.hitCount },
                    positions: shipPositions
                });
            return battleShipGrid;
    }
    else if (direction === "horizontal") {
            const shipPositions = [];

            for (let b=x; b < shipEndX; b++){
                battleShipGrid[y][b] = "B";
                shipPositions.push({ X: b, Y: y });
            }
                placedShipRecord.push({
                    shipDetails: { name: ship.name, length: ship.size, hitCount: ship.hitCount },
                    positions: shipPositions
                });
            return battleShipGrid;
    } else {
        return "Invalid direction";
    }
}

const startButton = document.getElementById("playButton");
const gameLog = document.getElementById("gameLog");


function receiveAttack(x,y, battleShipGrid, placedShipRecord, player){
    const shipHit = placedShipRecord.find(ship => {
        return ship.positions.some(position => position.X === x && position.Y === y);});
    
    if (shipHit) {
        shipHit.shipDetails.hitCount++;
        battleShipGrid[y][x]='H';
        const currentLength = shipHit.shipDetails.length;
        const currentCount = shipHit.shipDetails.hitCount;
        
        if ((0,_ship__WEBPACK_IMPORTED_MODULE_0__.isSunk)(currentLength,currentCount,placedShipRecord)) {
            const totalCount = placedShipRecord.reduce((total,currentShipObject) => {
                return total + currentShipObject.shipDetails.hitCount;},0);
            if ((0,_ship__WEBPACK_IMPORTED_MODULE_0__.allSunk)(totalCount)) {
                startButton.innerHTML = "Play Again!";
                startButton.style.display = "block";
                return "All sunk";
            }
            else {
                console.log(player + " has sunk the " + shipHit.shipDetails.name + " ship!");
                gameLog.innerHTML = player + " has sunk the " + shipHit.shipDetails.name + " ship!";
            }
        }
        else {
            gameLog.innerHTML = player + " has a hit!";
            return "Hit!";
        }
    }
    else {
        battleShipGrid[y][x]='X';
        gameLog.innerHTML = player + " has missed!";
        return "Missed!"
                
    }
}

function placingShips(battleShipGrid) {
    const placedShipRecord = [];
    let loopCounter = 0;

    for (let i=0; i < allShips.length; i++) {
        const currentShip = allShips[i];
        const maxShipPlacement = 10 - currentShip.size;
        var direction = "";
        let existingRecord;
        let shipCount;
        let randPositions = [];
       
        let randomY;
        let randomX;

        do {
            const randDirection = Math.floor(Math.random() * 2);

            if (randDirection === 0) {
                direction = "vertical";
                randomY = Math.floor(Math.random() * maxShipPlacement);
                randomX = Math.floor(Math.random() * 10);
                for (let j = 0; j < currentShip.size; j++) {
                    const posY = randomY + j;
                    randPositions.push({ X: randomX, Y: posY });
                }
            }
            else {
                direction = "horizontal";
                randomX = Math.floor(Math.random() * maxShipPlacement);
                randomY = Math.floor(Math.random() * 10);
                for (let k = 0; k < currentShip.size; k++) {
                    const posX = randomX + k;
                    randPositions.push({ X: posX, Y: randomY });
                }
            };
                          
                existingRecord = randPositions.some(position => {return placedShipRecord.some(shipArray =>shipArray.positions.some(p => p.X === position.X && p.Y === position.Y))})

                shipCount = randPositions.flat().filter(cell => cell === 'B').length;

                loopCounter++;
                if (loopCounter > 25000) {
                    console.error("Infinite loop detected. Breaking out.");
                    break; }
                   
        } while (existingRecord && (shipCount = 17));

        placeShip(randomX,randomY,currentShip,direction, battleShipGrid, placedShipRecord);
    }
    return {battleShipGrid,placedShipRecord};
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   battleshipMainGrid: () => (/* binding */ battleshipMainGrid),
/* harmony export */   player: () => (/* binding */ player),
/* harmony export */   playerTurns: () => (/* binding */ playerTurns),
/* harmony export */   turn: () => (/* binding */ turn)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
//node
// const { placingShips } = await import('./gameboard.js');
// const { receiveAttack } = await import('./gameboard.js');
// const { createGrid } = await import('./gameboard.js');
// const { placeShip } = await import('./gameboard.js');

//jest





//Create grids and placing ships 
function player() {
    const player1Grid = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.createGrid)();
    const cpuGrid = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.createGrid)();

    const player1 = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.placingShips)(player1Grid);
    const cpu = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.placingShips)(cpuGrid);

    const player1Board = player1.battleShipGrid;
    const cpuBoard = cpu.battleShipGrid;

    const player1Ships = player1.placedShipRecord;
    const cpuShips = cpu.placedShipRecord;

    return {player1Board,cpuBoard,player1Ships,cpuShips};
}

//the player would take a turn, and it would either hit or miss
function turn(x,y,playerBoard,shipPlacements,attacks,player) {
    const existingHit = attacks.find(hits => hits.X === x && hits.Y === y);

    if (!existingHit) {
        return "Already selected";
    }
    else {
        attacks.push({X: x, Y: y});
        return (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.receiveAttack)(x,y,playerBoard,shipPlacements,player);
    }
}

//For each players turn it returns what happened with missing or hitting
function playerTurns(x,y,player,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks) {
    if (player === 'player1'){
        let cpuResult = turn(x,y,cpu,cpuShipPlacements,cpuAttacks,player);
        if (cpuResult === "All sunk") { 
            return "Player 1 wins!";
        }
        if (cpuResult === "Already selected") {
            return 'player1';
        }
        else {
            return 'cpu';
        }
    }
    else if (player === 'cpu'){
        let player1Result = turn(x,y,player1,player1ShipPlacements,player1Attacks,player);
        if (player1Result === "All sunk") { 
            return "CPU wins!";
        }
        else if (player1Result === "Already selected") {
            return 'cpu';
        }
        else {
        return 'player1';
        }
    }
}

//Create grids
function battleshipMainGrid (boards,name) {
    const newGridSection = document.createElement("div");
    newGridSection.setAttribute("id",name);
    newGridSection.setAttribute("class","boards");
    playArea.appendChild(newGridSection);
        for (let i=0; i < 10; i++){
            const newDivsRows = document.createElement("div");
            newDivsRows.setAttribute("id","row"+i);
            newDivsRows.setAttribute("class","rows");
            newGridSection.appendChild(newDivsRows);
            for (let j=0; j < 10; j++){
                const newDivsColumns =  document.createElement("div");
                newDivsColumns.setAttribute("id",boards[i][j]);
                newDivsColumns.setAttribute("class","columns");
                newDivsRows.appendChild(newDivsColumns);       
            }
        }
    }

/***/ }),

/***/ "./src/playerTurns.js":
/*!****************************!*\
  !*** ./src/playerTurns.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gameProcess: () => (/* binding */ gameProcess)
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
// const { player,playerTurns } = await import('./player.js');



const player1Attacks = [];
const cpuAttacks = [];
let gameOver = false; 
let P1turn;

function cpuAttackLocation() {
    return new Promise((resolve, reject) => {
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

        setTimeout(() => {
            resolve({ attackX, attackY });
        }, 1500);
    });
}

let n=0;

function player1Turn() {
    return new Promise((resolve, reject) => {
        if (gameOver) return;

        const cells = document.getElementById("board2");
        const rowsArray = cells.getElementsByClassName("rows");

        
        for (let i=0; i<10; i++) {
            const currentRow = rowsArray[i];
            const columnsArray = currentRow.getElementsByClassName("columns");

            for (let j=0; j<10; j++) {
                const x = j;
                const y = i;
                columnsArray[j].addEventListener("click", function() {
                    resolve({x, y});
                    if (!gameOver && P1turn){
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
        });}

async function gameProcess(player1, cpu, player1ShipPlacements, cpuShipPlacements, player1Attacks, cpuAttacks) {
    let currentPlayer = 'player1';
    gameOver = false;

    while (!gameOver) {
        P1turn = true;
        if (currentPlayer === 'player1' ) {
            const { x, y } = await player1Turn(); 
            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(x, y, currentPlayer, player1, cpu, player1ShipPlacements, cpuShipPlacements, player1Attacks, cpuAttacks);
        } else if (currentPlayer === 'cpu') {
            P1turn = false;
            const cells = document.getElementById("board1");
            const rowsArray = cells.getElementsByClassName("rows");

            const { attackX, attackY } = await cpuAttackLocation();

            const currentRow = rowsArray[attackY];
            const columnsArray = currentRow.getElementsByClassName("columns");

            if (columnsArray[attackX].id === "B") {
                columnsArray[attackX].id = "H1";
            } else if (columnsArray[attackX].id === "O") {
                columnsArray[attackX].id = "X1";
            } else {};

            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(attackX, attackY, currentPlayer, player1, cpu, player1ShipPlacements, cpuShipPlacements, player1Attacks, cpuAttacks);

        } else if (currentPlayer.includes("wins")) {
            gameOver = true;
            break;
        }
    }
}


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship),
/* harmony export */   allSunk: () => (/* binding */ allSunk),
/* harmony export */   isSunk: () => (/* binding */ isSunk)
/* harmony export */ });
class Ship {
    constructor(name, size, hitCount) {
        this.name = name;
        this.size = size;
        this.hitCount = hitCount;
    }
}

function allSunk (totalSunk) {
        if (totalSunk === 17) {
            return true;
        }
    }
// }

function isSunk (length, hitCount) {
    if (hitCount === length) {
        return true;
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _playerTurns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./playerTurns */ "./src/playerTurns.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/player.js");




const playButton = document.getElementById("playButton");
const playArea = document.getElementById("playArea");

function battleshipMainGridGenerated(player1,player2) {
    (0,_player__WEBPACK_IMPORTED_MODULE_1__.battleshipMainGrid)(player1,"board1");
    (0,_player__WEBPACK_IMPORTED_MODULE_1__.battleshipMainGrid)(player2,"board2");
}

const startButton = document.getElementById("playButton");

playButton.addEventListener("click", function() {
    playArea.innerHTML = "";
    setTimeout(function() {
        const players = (0,_player__WEBPACK_IMPORTED_MODULE_1__.player)();

        const player1 = players.player1Board;
        const cpu = players.cpuBoard;

        const player1ShipPlacements = players.player1Ships;
        const cpuShipPlacements = players.cpuShips;

        const player1Attacks = [];
        const cpuAttacks = [];
        battleshipMainGridGenerated(player1,cpu);
        (0,_playerTurns__WEBPACK_IMPORTED_MODULE_0__.gameProcess)(player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks);
        startButton.style.display = "none";
    }, 1);
});


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjRDO0FBQ0E7QUFDVjs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBLElBQUksMkRBQWtCO0FBQ3RCLElBQUksMkRBQWtCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QiwrQ0FBTTs7QUFFOUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEseURBQVc7QUFDbkI7QUFDQSxLQUFLO0FBQ0wsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyVHVybnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vbm9kZVxuLy8gY29uc3QgeyBTaGlwIH0gPSBhd2FpdCBpbXBvcnQoJy4vc2hpcC5qcycpO1xuLy8gY29uc3QgeyBpc1N1bmsgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJyk7XG4vLyBjb25zdCB7IGFsbFN1bmsgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJylcblxuLy9qZXN0XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGlzU3VuayB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBhbGxTdW5rIH0gZnJvbSAnLi9zaGlwJztcblxuY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFwiY2FycmllclwiLCA1LCAwKTtcbmNvbnN0IGJhdHRsZXNoaXAgPSBuZXcgU2hpcChcImJhdHRsZXNoaXBcIiwgNCwgMCk7XG5jb25zdCBjcnVpc2VyID0gbmV3IFNoaXAoXCJjcnVpc2VyXCIsIDMsIDApO1xuY29uc3Qgc3VibWFyaW5lID0gbmV3IFNoaXAoXCJzdWJtYXJpbmVcIiwgMywgMCk7XG5jb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcChcImRlc3Ryb3llclwiLCAyLCAwKTtcblxuY29uc3QgYWxsU2hpcHMgPSBbZGVzdHJveWVyLGNydWlzZXIsc3VibWFyaW5lLGJhdHRsZXNoaXAsY2Fycmllcl07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcbiAgICBmb3IgKGxldCBpPTA7IGkgPCAxMDsgaSsrKXtcbiAgICAgICAgY29uc3Qgcm93ID0gW107XG4gICAgICAgIGZvcihsZXQgaj0wOyBqIDwgMTA7IGorKyl7XG4gICAgICAgICAgICByb3cucHVzaCgnTycpO1xuICAgICAgICB9XG4gICAgICAgIGdyaWQucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JpZDtcbn1cblxuLy94IGlzIHZlcnRpY2FsIGFuZCB5IGlzIGhvcml6b250YWxcbmV4cG9ydCBmdW5jdGlvbiBwbGFjZVNoaXAoeCwgeSwgc2hpcCwgZGlyZWN0aW9uLCBiYXR0bGVTaGlwR3JpZCwgcGxhY2VkU2hpcFJlY29yZCkge1xuICAgIGNvbnN0IHNoaXBFbmRYID0geCArIHNoaXAuc2l6ZTtcbiAgICBjb25zdCBzaGlwRW5kWSA9IHkgKyBzaGlwLnNpemU7XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgYj15OyBiIDwgc2hpcEVuZFk7IGIrKyl7XG4gICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdyaWRbYl1beF0gPSBcIkJcIjtcbiAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb25zLnB1c2goeyBYOiB4LCBZOiBiIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlZFNoaXBSZWNvcmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBEZXRhaWxzOiB7IG5hbWU6IHNoaXAubmFtZSwgbGVuZ3RoOiBzaGlwLnNpemUsIGhpdENvdW50OiBzaGlwLmhpdENvdW50IH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uczogc2hpcFBvc2l0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVNoaXBHcmlkO1xuICAgIH1cbiAgICBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwUG9zaXRpb25zID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGI9eDsgYiA8IHNoaXBFbmRYOyBiKyspe1xuICAgICAgICAgICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW2JdID0gXCJCXCI7XG4gICAgICAgICAgICAgICAgc2hpcFBvc2l0aW9ucy5wdXNoKHsgWDogYiwgWTogeSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwbGFjZWRTaGlwUmVjb3JkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzaGlwRGV0YWlsczogeyBuYW1lOiBzaGlwLm5hbWUsIGxlbmd0aDogc2hpcC5zaXplLCBoaXRDb3VudDogc2hpcC5oaXRDb3VudCB9LFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IHNoaXBQb3NpdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVTaGlwR3JpZDtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJJbnZhbGlkIGRpcmVjdGlvblwiO1xuICAgIH1cbn1cblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5jb25zdCBnYW1lTG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lTG9nXCIpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHgseSwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQsIHBsYXllcil7XG4gICAgY29uc3Qgc2hpcEhpdCA9IHBsYWNlZFNoaXBSZWNvcmQuZmluZChzaGlwID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0geCAmJiBwb3NpdGlvbi5ZID09PSB5KTt9KTtcbiAgICBcbiAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50Kys7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdIJztcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IHNoaXBIaXQuc2hpcERldGFpbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzU3VuayhjdXJyZW50TGVuZ3RoLGN1cnJlbnRDb3VudCxwbGFjZWRTaGlwUmVjb3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG90YWxDb3VudCA9IHBsYWNlZFNoaXBSZWNvcmQucmVkdWNlKCh0b3RhbCxjdXJyZW50U2hpcE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGN1cnJlbnRTaGlwT2JqZWN0LnNoaXBEZXRhaWxzLmhpdENvdW50O30sMCk7XG4gICAgICAgICAgICBpZiAoYWxsU3Vuayh0b3RhbENvdW50KSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0QnV0dG9uLmlubmVySFRNTCA9IFwiUGxheSBBZ2FpbiFcIjtcbiAgICAgICAgICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIkFsbCBzdW5rXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIgKyBcIiBoYXMgc3VuayB0aGUgXCIgKyBzaGlwSGl0LnNoaXBEZXRhaWxzLm5hbWUgKyBcIiBzaGlwIVwiKTtcbiAgICAgICAgICAgICAgICBnYW1lTG9nLmlubmVySFRNTCA9IHBsYXllciArIFwiIGhhcyBzdW5rIHRoZSBcIiArIHNoaXBIaXQuc2hpcERldGFpbHMubmFtZSArIFwiIHNoaXAhXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBnYW1lTG9nLmlubmVySFRNTCA9IHBsYXllciArIFwiIGhhcyBhIGhpdCFcIjtcbiAgICAgICAgICAgIHJldHVybiBcIkhpdCFcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1beF09J1gnO1xuICAgICAgICBnYW1lTG9nLmlubmVySFRNTCA9IHBsYXllciArIFwiIGhhcyBtaXNzZWQhXCI7XG4gICAgICAgIHJldHVybiBcIk1pc3NlZCFcIlxuICAgICAgICAgICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNpbmdTaGlwcyhiYXR0bGVTaGlwR3JpZCkge1xuICAgIGNvbnN0IHBsYWNlZFNoaXBSZWNvcmQgPSBbXTtcbiAgICBsZXQgbG9vcENvdW50ZXIgPSAwO1xuXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgYWxsU2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNoaXAgPSBhbGxTaGlwc1tpXTtcbiAgICAgICAgY29uc3QgbWF4U2hpcFBsYWNlbWVudCA9IDEwIC0gY3VycmVudFNoaXAuc2l6ZTtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IFwiXCI7XG4gICAgICAgIGxldCBleGlzdGluZ1JlY29yZDtcbiAgICAgICAgbGV0IHNoaXBDb3VudDtcbiAgICAgICAgbGV0IHJhbmRQb3NpdGlvbnMgPSBbXTtcbiAgICAgICBcbiAgICAgICAgbGV0IHJhbmRvbVk7XG4gICAgICAgIGxldCByYW5kb21YO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGNvbnN0IHJhbmREaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKTtcblxuICAgICAgICAgICAgaWYgKHJhbmREaXJlY3Rpb24gPT09IDApIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBcInZlcnRpY2FsXCI7XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNoaXBQbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBjdXJyZW50U2hpcC5zaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zWSA9IHJhbmRvbVkgKyBqO1xuICAgICAgICAgICAgICAgICAgICByYW5kUG9zaXRpb25zLnB1c2goeyBYOiByYW5kb21YLCBZOiBwb3NZIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwiaG9yaXpvbnRhbFwiO1xuICAgICAgICAgICAgICAgIHJhbmRvbVggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhTaGlwUGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAwOyBrIDwgY3VycmVudFNoaXAuc2l6ZTsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc1ggPSByYW5kb21YICsgaztcbiAgICAgICAgICAgICAgICAgICAgcmFuZFBvc2l0aW9ucy5wdXNoKHsgWDogcG9zWCwgWTogcmFuZG9tWSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBleGlzdGluZ1JlY29yZCA9IHJhbmRQb3NpdGlvbnMuc29tZShwb3NpdGlvbiA9PiB7cmV0dXJuIHBsYWNlZFNoaXBSZWNvcmQuc29tZShzaGlwQXJyYXkgPT5zaGlwQXJyYXkucG9zaXRpb25zLnNvbWUocCA9PiBwLlggPT09IHBvc2l0aW9uLlggJiYgcC5ZID09PSBwb3NpdGlvbi5ZKSl9KVxuXG4gICAgICAgICAgICAgICAgc2hpcENvdW50ID0gcmFuZFBvc2l0aW9ucy5mbGF0KCkuZmlsdGVyKGNlbGwgPT4gY2VsbCA9PT0gJ0InKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICBsb29wQ291bnRlcisrO1xuICAgICAgICAgICAgICAgIGlmIChsb29wQ291bnRlciA+IDI1MDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmZpbml0ZSBsb29wIGRldGVjdGVkLiBCcmVha2luZyBvdXQuXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9IHdoaWxlIChleGlzdGluZ1JlY29yZCAmJiAoc2hpcENvdW50ID0gMTcpKTtcblxuICAgICAgICBwbGFjZVNoaXAocmFuZG9tWCxyYW5kb21ZLGN1cnJlbnRTaGlwLGRpcmVjdGlvbiwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQpO1xuICAgIH1cbiAgICByZXR1cm4ge2JhdHRsZVNoaXBHcmlkLHBsYWNlZFNoaXBSZWNvcmR9O1xufVxuIiwiLy9ub2RlXG4vLyBjb25zdCB7IHBsYWNpbmdTaGlwcyB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyByZWNlaXZlQXR0YWNrIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IGNyZWF0ZUdyaWQgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgcGxhY2VTaGlwIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG5cbi8vamVzdFxuaW1wb3J0IHsgcGxhY2luZ1NoaXBzIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcmVjZWl2ZUF0dGFjayB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBwbGFjZVNoaXAgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbi8vQ3JlYXRlIGdyaWRzIGFuZCBwbGFjaW5nIHNoaXBzIFxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllcigpIHtcbiAgICBjb25zdCBwbGF5ZXIxR3JpZCA9IGNyZWF0ZUdyaWQoKTtcbiAgICBjb25zdCBjcHVHcmlkID0gY3JlYXRlR3JpZCgpO1xuXG4gICAgY29uc3QgcGxheWVyMSA9IHBsYWNpbmdTaGlwcyhwbGF5ZXIxR3JpZCk7XG4gICAgY29uc3QgY3B1ID0gcGxhY2luZ1NoaXBzKGNwdUdyaWQpO1xuXG4gICAgY29uc3QgcGxheWVyMUJvYXJkID0gcGxheWVyMS5iYXR0bGVTaGlwR3JpZDtcbiAgICBjb25zdCBjcHVCb2FyZCA9IGNwdS5iYXR0bGVTaGlwR3JpZDtcblxuICAgIGNvbnN0IHBsYXllcjFTaGlwcyA9IHBsYXllcjEucGxhY2VkU2hpcFJlY29yZDtcbiAgICBjb25zdCBjcHVTaGlwcyA9IGNwdS5wbGFjZWRTaGlwUmVjb3JkO1xuXG4gICAgcmV0dXJuIHtwbGF5ZXIxQm9hcmQsY3B1Qm9hcmQscGxheWVyMVNoaXBzLGNwdVNoaXBzfTtcbn1cblxuLy90aGUgcGxheWVyIHdvdWxkIHRha2UgYSB0dXJuLCBhbmQgaXQgd291bGQgZWl0aGVyIGhpdCBvciBtaXNzXG5leHBvcnQgZnVuY3Rpb24gdHVybih4LHkscGxheWVyQm9hcmQsc2hpcFBsYWNlbWVudHMsYXR0YWNrcyxwbGF5ZXIpIHtcbiAgICBjb25zdCBleGlzdGluZ0hpdCA9IGF0dGFja3MuZmluZChoaXRzID0+IGhpdHMuWCA9PT0geCAmJiBoaXRzLlkgPT09IHkpO1xuXG4gICAgaWYgKCFleGlzdGluZ0hpdCkge1xuICAgICAgICByZXR1cm4gXCJBbHJlYWR5IHNlbGVjdGVkXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRhY2tzLnB1c2goe1g6IHgsIFk6IHl9KTtcbiAgICAgICAgcmV0dXJuIHJlY2VpdmVBdHRhY2soeCx5LHBsYXllckJvYXJkLHNoaXBQbGFjZW1lbnRzLHBsYXllcik7XG4gICAgfVxufVxuXG4vL0ZvciBlYWNoIHBsYXllcnMgdHVybiBpdCByZXR1cm5zIHdoYXQgaGFwcGVuZWQgd2l0aCBtaXNzaW5nIG9yIGhpdHRpbmdcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJUdXJucyh4LHkscGxheWVyLHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKSB7XG4gICAgaWYgKHBsYXllciA9PT0gJ3BsYXllcjEnKXtcbiAgICAgICAgbGV0IGNwdVJlc3VsdCA9IHR1cm4oeCx5LGNwdSxjcHVTaGlwUGxhY2VtZW50cyxjcHVBdHRhY2tzLHBsYXllcik7XG4gICAgICAgIGlmIChjcHVSZXN1bHQgPT09IFwiQWxsIHN1bmtcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIlBsYXllciAxIHdpbnMhXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNwdVJlc3VsdCA9PT0gXCJBbHJlYWR5IHNlbGVjdGVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocGxheWVyID09PSAnY3B1Jyl7XG4gICAgICAgIGxldCBwbGF5ZXIxUmVzdWx0ID0gdHVybih4LHkscGxheWVyMSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MscGxheWVyKTtcbiAgICAgICAgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxsIHN1bmtcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIkNQVSB3aW5zIVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxyZWFkeSBzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vQ3JlYXRlIGdyaWRzXG5leHBvcnQgZnVuY3Rpb24gYmF0dGxlc2hpcE1haW5HcmlkIChib2FyZHMsbmFtZSkge1xuICAgIGNvbnN0IG5ld0dyaWRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBuZXdHcmlkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLG5hbWUpO1xuICAgIG5ld0dyaWRTZWN0aW9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJib2FyZHNcIik7XG4gICAgcGxheUFyZWEuYXBwZW5kQ2hpbGQobmV3R3JpZFNlY3Rpb24pO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCAxMDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RpdnNSb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImlkXCIsXCJyb3dcIitpKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJyb3dzXCIpO1xuICAgICAgICAgICAgbmV3R3JpZFNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3RGl2c1Jvd3MpO1xuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqIDwgMTA7IGorKyl7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGl2c0NvbHVtbnMgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBuZXdEaXZzQ29sdW1ucy5zZXRBdHRyaWJ1dGUoXCJpZFwiLGJvYXJkc1tpXVtqXSk7XG4gICAgICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcImNvbHVtbnNcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2c1Jvd3MuYXBwZW5kQ2hpbGQobmV3RGl2c0NvbHVtbnMpOyAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0iLCIvLyBjb25zdCB7IHBsYXllcixwbGF5ZXJUdXJucyB9ID0gYXdhaXQgaW1wb3J0KCcuL3BsYXllci5qcycpO1xuXG5pbXBvcnQgeyBwbGF5ZXJUdXJucyB9IGZyb20gJy4vcGxheWVyLmpzJztcblxuY29uc3QgcGxheWVyMUF0dGFja3MgPSBbXTtcbmNvbnN0IGNwdUF0dGFja3MgPSBbXTtcbmxldCBnYW1lT3ZlciA9IGZhbHNlOyBcbmxldCBQMXR1cm47XG5cbmZ1bmN0aW9uIGNwdUF0dGFja0xvY2F0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBzZXRQYWlycyA9IFtdO1xuICAgICAgICBsZXQgZXhpc3RpbmdQYWlyO1xuICAgICAgICBsZXQgYXR0YWNrWDtcbiAgICAgICAgbGV0IGF0dGFja1k7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgYXR0YWNrWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGF0dGFja1ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgICAgICAgIGV4aXN0aW5nUGFpciA9IHBsYXllcjFBdHRhY2tzLmZpbmQocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0gYXR0YWNrWCAmJiBwb3NpdGlvbi5ZID09PSBhdHRhY2tZKTtcblxuICAgICAgICAgICAgaWYgKCFleGlzdGluZ1BhaXIpIHtcbiAgICAgICAgICAgICAgICBzZXRQYWlycy5wdXNoKHsgWDogYXR0YWNrWCwgWTogYXR0YWNrWSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZXhpc3RpbmdQYWlyKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoeyBhdHRhY2tYLCBhdHRhY2tZIH0pO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICB9KTtcbn1cblxubGV0IG49MDtcblxuZnVuY3Rpb24gcGxheWVyMVR1cm4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGdhbWVPdmVyKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkMlwiKTtcbiAgICAgICAgY29uc3Qgcm93c0FycmF5ID0gY2VsbHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJvd3NcIik7XG5cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Um93ID0gcm93c0FycmF5W2ldO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uc0FycmF5ID0gY3VycmVudFJvdy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sdW1uc1wiKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gajtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gaTtcbiAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbal0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHt4LCB5fSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZU92ZXIgJiYgUDF0dXJuKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zQXJyYXlbal0uaWQgPT09IFwiQlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2pdLmlkID0gXCJIMVwiO31cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sdW1uc0FycmF5W2pdLmlkID09PSBcIk9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5pZCA9IFwiWDFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJFcnJvclwiKX07XG4gICAgICAgICAgICAgICAgICAgIH19KTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTt9XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnYW1lUHJvY2VzcyhwbGF5ZXIxLCBjcHUsIHBsYXllcjFTaGlwUGxhY2VtZW50cywgY3B1U2hpcFBsYWNlbWVudHMsIHBsYXllcjFBdHRhY2tzLCBjcHVBdHRhY2tzKSB7XG4gICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSAncGxheWVyMSc7XG4gICAgZ2FtZU92ZXIgPSBmYWxzZTtcblxuICAgIHdoaWxlICghZ2FtZU92ZXIpIHtcbiAgICAgICAgUDF0dXJuID0gdHJ1ZTtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdwbGF5ZXIxJyApIHtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gYXdhaXQgcGxheWVyMVR1cm4oKTsgXG4gICAgICAgICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyVHVybnMoeCwgeSwgY3VycmVudFBsYXllciwgcGxheWVyMSwgY3B1LCBwbGF5ZXIxU2hpcFBsYWNlbWVudHMsIGNwdVNoaXBQbGFjZW1lbnRzLCBwbGF5ZXIxQXR0YWNrcywgY3B1QXR0YWNrcyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYXllciA9PT0gJ2NwdScpIHtcbiAgICAgICAgICAgIFAxdHVybiA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkMVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHJvd3NBcnJheSA9IGNlbGxzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3dzXCIpO1xuXG4gICAgICAgICAgICBjb25zdCB7IGF0dGFja1gsIGF0dGFja1kgfSA9IGF3YWl0IGNwdUF0dGFja0xvY2F0aW9uKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3cgPSByb3dzQXJyYXlbYXR0YWNrWV07XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zQXJyYXkgPSBjdXJyZW50Um93LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb2x1bW5zXCIpO1xuXG4gICAgICAgICAgICBpZiAoY29sdW1uc0FycmF5W2F0dGFja1hdLmlkID09PSBcIkJcIikge1xuICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVthdHRhY2tYXS5pZCA9IFwiSDFcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29sdW1uc0FycmF5W2F0dGFja1hdLmlkID09PSBcIk9cIikge1xuICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVthdHRhY2tYXS5pZCA9IFwiWDFcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7fTtcblxuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR1cm5zKGF0dGFja1gsIGF0dGFja1ksIGN1cnJlbnRQbGF5ZXIsIHBsYXllcjEsIGNwdSwgcGxheWVyMVNoaXBQbGFjZW1lbnRzLCBjcHVTaGlwUGxhY2VtZW50cywgcGxheWVyMUF0dGFja3MsIGNwdUF0dGFja3MpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBsYXllci5pbmNsdWRlcyhcIndpbnNcIikpIHtcbiAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHNpemUsIGhpdENvdW50KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuaGl0Q291bnQgPSBoaXRDb3VudDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxTdW5rICh0b3RhbFN1bmspIHtcbiAgICAgICAgaWYgKHRvdGFsU3VuayA9PT0gMTcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdW5rIChsZW5ndGgsIGhpdENvdW50KSB7XG4gICAgaWYgKGhpdENvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZVByb2Nlc3MgfSBmcm9tIFwiLi9wbGF5ZXJUdXJuc1wiO1xuaW1wb3J0IHtiYXR0bGVzaGlwTWFpbkdyaWR9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IHBsYXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5jb25zdCBwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUFyZWFcIik7XG5cbmZ1bmN0aW9uIGJhdHRsZXNoaXBNYWluR3JpZEdlbmVyYXRlZChwbGF5ZXIxLHBsYXllcjIpIHtcbiAgICBiYXR0bGVzaGlwTWFpbkdyaWQocGxheWVyMSxcImJvYXJkMVwiKTtcbiAgICBiYXR0bGVzaGlwTWFpbkdyaWQocGxheWVyMixcImJvYXJkMlwiKTtcbn1cblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5cbnBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHBsYXlBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGxheWVycyA9IHBsYXllcigpO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXJzLnBsYXllcjFCb2FyZDtcbiAgICAgICAgY29uc3QgY3B1ID0gcGxheWVycy5jcHVCb2FyZDtcblxuICAgICAgICBjb25zdCBwbGF5ZXIxU2hpcFBsYWNlbWVudHMgPSBwbGF5ZXJzLnBsYXllcjFTaGlwcztcbiAgICAgICAgY29uc3QgY3B1U2hpcFBsYWNlbWVudHMgPSBwbGF5ZXJzLmNwdVNoaXBzO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG4gICAgICAgIGNvbnN0IGNwdUF0dGFja3MgPSBbXTtcbiAgICAgICAgYmF0dGxlc2hpcE1haW5HcmlkR2VuZXJhdGVkKHBsYXllcjEsY3B1KTtcbiAgICAgICAgZ2FtZVByb2Nlc3MocGxheWVyMSxjcHUscGxheWVyMVNoaXBQbGFjZW1lbnRzLGNwdVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLGNwdUF0dGFja3MpO1xuICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSwgMSk7XG59KTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9