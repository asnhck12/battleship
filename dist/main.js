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

// let totalSunk = 0;

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
            console.log("Hit!");
            gameLog.innerHTML = player + " has a hit!";
            return "Hit!";
        }
    }
    else {
        battleShipGrid[y][x]='X';
        console.log("Missed!");
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

    if (existingHit) {
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
        console.log("Player 1s turn!");
        let cpuResult = turn(x,y,cpu,cpuShipPlacements,cpuAttacks,player);
        console.log("P1 result: " + cpuResult);
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
        console.log("cpus's turn!");
        // setTimeout(() => {
        let player1Result = turn(x,y,player1,player1ShipPlacements,player1Attacks,player);
        console.log("cpu result: " + player1Result);
        if (player1Result === "All sunk") { 
            return "CPU wins!";
        }
        else if (player1Result === "Already selected") {
            return 'cpu';
        }
        else {
        return 'player1';
        }

    // }, 500);
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
        }, 1000);
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
        console.log("current player Return: " + currentPlayer)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFDQTtBQUNWOztBQUVsQztBQUNBOztBQUVBO0FBQ0EsSUFBSSwyREFBa0I7QUFDdEIsSUFBSSwyREFBa0I7QUFDdEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtDQUFNOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBVztBQUNuQjtBQUNBLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9ub2RlXG4vLyBjb25zdCB7IFNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJyk7XG4vLyBjb25zdCB7IGlzU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKTtcbi8vIGNvbnN0IHsgYWxsU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKVxuXG4vL2plc3RcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgaXNTdW5rIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGFsbFN1bmsgfSBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsIDUsIDApO1xuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwKTtcbmNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcChcImNydWlzZXJcIiwgMywgMCk7XG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCAzLCAwKTtcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIDIsIDApO1xuXG5jb25zdCBhbGxTaGlwcyA9IFtkZXN0cm95ZXIsY3J1aXNlcixzdWJtYXJpbmUsYmF0dGxlc2hpcCxjYXJyaWVyXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGk9MDsgaSA8IDEwOyBpKyspe1xuICAgICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgICAgZm9yKGxldCBqPTA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgICAgIHJvdy5wdXNoKCdPJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ3JpZC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuXG4vL3ggaXMgdmVydGljYWwgYW5kIHkgaXMgaG9yaXpvbnRhbFxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwLCBkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKSB7XG4gICAgY29uc3Qgc2hpcEVuZFggPSB4ICsgc2hpcC5zaXplO1xuICAgIGNvbnN0IHNoaXBFbmRZID0geSArIHNoaXAuc2l6ZTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBiPXk7IGIgPCBzaGlwRW5kWTsgYisrKXtcbiAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR3JpZFtiXVt4XSA9IFwiQlwiO1xuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbnMucHVzaCh7IFg6IHgsIFk6IGIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcERldGFpbHM6IHsgbmFtZTogc2hpcC5uYW1lLCBsZW5ndGg6IHNoaXAuc2l6ZSwgaGl0Q291bnQ6IHNoaXAuaGl0Q291bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBzaGlwUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlU2hpcEdyaWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgYj14OyBiIDwgc2hpcEVuZFg7IGIrKyl7XG4gICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1bYl0gPSBcIkJcIjtcbiAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb25zLnB1c2goeyBYOiBiLCBZOiB5IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlZFNoaXBSZWNvcmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBEZXRhaWxzOiB7IG5hbWU6IHNoaXAubmFtZSwgbGVuZ3RoOiBzaGlwLnNpemUsIGhpdENvdW50OiBzaGlwLmhpdENvdW50IH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uczogc2hpcFBvc2l0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVNoaXBHcmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkludmFsaWQgZGlyZWN0aW9uXCI7XG4gICAgfVxufVxuXG4vLyBsZXQgdG90YWxTdW5rID0gMDtcblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5jb25zdCBnYW1lTG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnYW1lTG9nXCIpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHgseSwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQsIHBsYXllcil7XG4gICAgY29uc3Qgc2hpcEhpdCA9IHBsYWNlZFNoaXBSZWNvcmQuZmluZChzaGlwID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0geCAmJiBwb3NpdGlvbi5ZID09PSB5KTt9KTtcbiAgICBcbiAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50Kys7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdIJztcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IHNoaXBIaXQuc2hpcERldGFpbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzU3VuayhjdXJyZW50TGVuZ3RoLGN1cnJlbnRDb3VudCxwbGFjZWRTaGlwUmVjb3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG90YWxDb3VudCA9IHBsYWNlZFNoaXBSZWNvcmQucmVkdWNlKCh0b3RhbCxjdXJyZW50U2hpcE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGN1cnJlbnRTaGlwT2JqZWN0LnNoaXBEZXRhaWxzLmhpdENvdW50O30sMCk7XG4gICAgICAgICAgICBpZiAoYWxsU3Vuayh0b3RhbENvdW50KSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0QnV0dG9uLmlubmVySFRNTCA9IFwiUGxheSBBZ2FpbiFcIjtcbiAgICAgICAgICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIkFsbCBzdW5rXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIgKyBcIiBoYXMgc3VuayB0aGUgXCIgKyBzaGlwSGl0LnNoaXBEZXRhaWxzLm5hbWUgKyBcIiBzaGlwIVwiKTtcbiAgICAgICAgICAgICAgICBnYW1lTG9nLmlubmVySFRNTCA9IHBsYXllciArIFwiIGhhcyBzdW5rIHRoZSBcIiArIHNoaXBIaXQuc2hpcERldGFpbHMubmFtZSArIFwiIHNoaXAhXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhpdCFcIik7XG4gICAgICAgICAgICBnYW1lTG9nLmlubmVySFRNTCA9IHBsYXllciArIFwiIGhhcyBhIGhpdCFcIjtcbiAgICAgICAgICAgIHJldHVybiBcIkhpdCFcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1beF09J1gnO1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1pc3NlZCFcIik7XG4gICAgICAgIGdhbWVMb2cuaW5uZXJIVE1MID0gcGxheWVyICsgXCIgaGFzIG1pc3NlZCFcIjtcbiAgICAgICAgcmV0dXJuIFwiTWlzc2VkIVwiXG4gICAgICAgICAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhY2luZ1NoaXBzKGJhdHRsZVNoaXBHcmlkKSB7XG4gICAgY29uc3QgcGxhY2VkU2hpcFJlY29yZCA9IFtdO1xuICAgIGxldCBsb29wQ291bnRlciA9IDA7XG5cbiAgICBmb3IgKGxldCBpPTA7IGkgPCBhbGxTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGFsbFNoaXBzW2ldO1xuICAgICAgICBjb25zdCBtYXhTaGlwUGxhY2VtZW50ID0gMTAgLSBjdXJyZW50U2hpcC5zaXplO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgbGV0IGV4aXN0aW5nUmVjb3JkO1xuICAgICAgICBsZXQgc2hpcENvdW50O1xuICAgICAgICBsZXQgcmFuZFBvc2l0aW9ucyA9IFtdO1xuICAgICAgIFxuICAgICAgICBsZXQgcmFuZG9tWTtcbiAgICAgICAgbGV0IHJhbmRvbVg7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc3QgcmFuZERpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuXG4gICAgICAgICAgICBpZiAocmFuZERpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2hpcFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRTaGlwLnNpemU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NZID0gcmFuZG9tWSArIGo7XG4gICAgICAgICAgICAgICAgICAgIHJhbmRQb3NpdGlvbnMucHVzaCh7IFg6IHJhbmRvbVgsIFk6IHBvc1kgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNoaXBQbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjdXJyZW50U2hpcC5zaXplOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zWCA9IHJhbmRvbVggKyBrO1xuICAgICAgICAgICAgICAgICAgICByYW5kUG9zaXRpb25zLnB1c2goeyBYOiBwb3NYLCBZOiByYW5kb21ZIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVjb3JkID0gcmFuZFBvc2l0aW9ucy5zb21lKHBvc2l0aW9uID0+IHtyZXR1cm4gcGxhY2VkU2hpcFJlY29yZC5zb21lKHNoaXBBcnJheSA9PnNoaXBBcnJheS5wb3NpdGlvbnMuc29tZShwID0+IHAuWCA9PT0gcG9zaXRpb24uWCAmJiBwLlkgPT09IHBvc2l0aW9uLlkpKX0pXG5cbiAgICAgICAgICAgICAgICBzaGlwQ291bnQgPSByYW5kUG9zaXRpb25zLmZsYXQoKS5maWx0ZXIoY2VsbCA9PiBjZWxsID09PSAnQicpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgaWYgKGxvb3BDb3VudGVyID4gMjUwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkluZmluaXRlIGxvb3AgZGV0ZWN0ZWQuIEJyZWFraW5nIG91dC5cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0gd2hpbGUgKGV4aXN0aW5nUmVjb3JkICYmIChzaGlwQ291bnQgPSAxNykpO1xuXG4gICAgICAgIHBsYWNlU2hpcChyYW5kb21YLHJhbmRvbVksY3VycmVudFNoaXAsZGlyZWN0aW9uLCBiYXR0bGVTaGlwR3JpZCwgcGxhY2VkU2hpcFJlY29yZCk7XG4gICAgfVxuICAgIHJldHVybiB7YmF0dGxlU2hpcEdyaWQscGxhY2VkU2hpcFJlY29yZH07XG59XG4iLCIvL25vZGVcbi8vIGNvbnN0IHsgcGxhY2luZ1NoaXBzIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IHJlY2VpdmVBdHRhY2sgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgY3JlYXRlR3JpZCB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyBwbGFjZVNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcblxuLy9qZXN0XG5pbXBvcnQgeyBwbGFjaW5nU2hpcHMgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyByZWNlaXZlQXR0YWNrIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHBsYWNlU2hpcCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcblxuLy9DcmVhdGUgZ3JpZHMgYW5kIHBsYWNpbmcgc2hpcHMgXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyKCkge1xuICAgIGNvbnN0IHBsYXllcjFHcmlkID0gY3JlYXRlR3JpZCgpO1xuICAgIGNvbnN0IGNwdUdyaWQgPSBjcmVhdGVHcmlkKCk7XG5cbiAgICBjb25zdCBwbGF5ZXIxID0gcGxhY2luZ1NoaXBzKHBsYXllcjFHcmlkKTtcbiAgICBjb25zdCBjcHUgPSBwbGFjaW5nU2hpcHMoY3B1R3JpZCk7XG5cbiAgICBjb25zdCBwbGF5ZXIxQm9hcmQgPSBwbGF5ZXIxLmJhdHRsZVNoaXBHcmlkO1xuICAgIGNvbnN0IGNwdUJvYXJkID0gY3B1LmJhdHRsZVNoaXBHcmlkO1xuXG4gICAgY29uc3QgcGxheWVyMVNoaXBzID0gcGxheWVyMS5wbGFjZWRTaGlwUmVjb3JkO1xuICAgIGNvbnN0IGNwdVNoaXBzID0gY3B1LnBsYWNlZFNoaXBSZWNvcmQ7XG5cbiAgICByZXR1cm4ge3BsYXllcjFCb2FyZCxjcHVCb2FyZCxwbGF5ZXIxU2hpcHMsY3B1U2hpcHN9O1xufVxuXG4vL3RoZSBwbGF5ZXIgd291bGQgdGFrZSBhIHR1cm4sIGFuZCBpdCB3b3VsZCBlaXRoZXIgaGl0IG9yIG1pc3NcbmV4cG9ydCBmdW5jdGlvbiB0dXJuKHgseSxwbGF5ZXJCb2FyZCxzaGlwUGxhY2VtZW50cyxhdHRhY2tzLHBsYXllcikge1xuICAgIGNvbnN0IGV4aXN0aW5nSGl0ID0gYXR0YWNrcy5maW5kKGhpdHMgPT4gaGl0cy5YID09PSB4ICYmIGhpdHMuWSA9PT0geSk7XG5cbiAgICBpZiAoZXhpc3RpbmdIaXQpIHtcbiAgICAgICAgcmV0dXJuIFwiQWxyZWFkeSBzZWxlY3RlZFwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0YWNrcy5wdXNoKHtYOiB4LCBZOiB5fSk7XG4gICAgICAgIHJldHVybiByZWNlaXZlQXR0YWNrKHgseSxwbGF5ZXJCb2FyZCxzaGlwUGxhY2VtZW50cyxwbGF5ZXIpO1xuICAgIH1cbn1cblxuLy9Gb3IgZWFjaCBwbGF5ZXJzIHR1cm4gaXQgcmV0dXJucyB3aGF0IGhhcHBlbmVkIHdpdGggbWlzc2luZyBvciBoaXR0aW5nXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyVHVybnMoeCx5LHBsYXllcixwbGF5ZXIxLGNwdSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMsY3B1U2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MsY3B1QXR0YWNrcykge1xuICAgIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXIxJyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIDFzIHR1cm4hXCIpO1xuICAgICAgICBsZXQgY3B1UmVzdWx0ID0gdHVybih4LHksY3B1LGNwdVNoaXBQbGFjZW1lbnRzLGNwdUF0dGFja3MscGxheWVyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQMSByZXN1bHQ6IFwiICsgY3B1UmVzdWx0KTtcbiAgICAgICAgaWYgKGNwdVJlc3VsdCA9PT0gXCJBbGwgc3Vua1wiKSB7IFxuICAgICAgICAgICAgcmV0dXJuIFwiUGxheWVyIDEgd2lucyFcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3B1UmVzdWx0ID09PSBcIkFscmVhZHkgc2VsZWN0ZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuICdwbGF5ZXIxJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnY3B1JztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChwbGF5ZXIgPT09ICdjcHUnKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcHVzJ3MgdHVybiFcIik7XG4gICAgICAgIC8vIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBsZXQgcGxheWVyMVJlc3VsdCA9IHR1cm4oeCx5LHBsYXllcjEscGxheWVyMVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLHBsYXllcik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3B1IHJlc3VsdDogXCIgKyBwbGF5ZXIxUmVzdWx0KTtcbiAgICAgICAgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxsIHN1bmtcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIkNQVSB3aW5zIVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxyZWFkeSBzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgICAgIH1cblxuICAgIC8vIH0sIDUwMCk7XG4gICAgfVxufVxuXG4vL0NyZWF0ZSBncmlkc1xuZXhwb3J0IGZ1bmN0aW9uIGJhdHRsZXNoaXBNYWluR3JpZCAoYm9hcmRzLG5hbWUpIHtcbiAgICBjb25zdCBuZXdHcmlkU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbmV3R3JpZFNlY3Rpb24uc2V0QXR0cmlidXRlKFwiaWRcIixuYW1lKTtcbiAgICBuZXdHcmlkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwiYm9hcmRzXCIpO1xuICAgIHBsYXlBcmVhLmFwcGVuZENoaWxkKG5ld0dyaWRTZWN0aW9uKTtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgMTA7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBuZXdEaXZzUm93cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdEaXZzUm93cy5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwicm93XCIraSk7XG4gICAgICAgICAgICBuZXdEaXZzUm93cy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicm93c1wiKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IHBsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QXJlYVwiKTtcbiAgICAgICAgICAgIG5ld0dyaWRTZWN0aW9uLmFwcGVuZENoaWxkKG5ld0RpdnNSb3dzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGo9MDsgaiA8IDEwOyBqKyspe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RpdnNDb2x1bW5zID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiaWRcIixib2FyZHNbaV1bal0pO1xuICAgICAgICAgICAgICAgIG5ld0RpdnNDb2x1bW5zLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJjb2x1bW5zXCIpO1xuICAgICAgICAgICAgICAgIG5ld0RpdnNSb3dzLmFwcGVuZENoaWxkKG5ld0RpdnNDb2x1bW5zKTsgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IiwiLy8gY29uc3QgeyBwbGF5ZXIscGxheWVyVHVybnMgfSA9IGF3YWl0IGltcG9ydCgnLi9wbGF5ZXIuanMnKTtcblxuaW1wb3J0IHsgcGxheWVyVHVybnMgfSBmcm9tICcuL3BsYXllci5qcyc7XG5cbmNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG5jb25zdCBjcHVBdHRhY2tzID0gW107XG5sZXQgZ2FtZU92ZXIgPSBmYWxzZTsgXG5sZXQgUDF0dXJuO1xuXG5mdW5jdGlvbiBjcHVBdHRhY2tMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgc2V0UGFpcnMgPSBbXTtcbiAgICAgICAgbGV0IGV4aXN0aW5nUGFpcjtcbiAgICAgICAgbGV0IGF0dGFja1g7XG4gICAgICAgIGxldCBhdHRhY2tZO1xuXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGF0dGFja1kgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICBhdHRhY2tYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgICAgICAgICBleGlzdGluZ1BhaXIgPSBwbGF5ZXIxQXR0YWNrcy5maW5kKHBvc2l0aW9uID0+IHBvc2l0aW9uLlggPT09IGF0dGFja1ggJiYgcG9zaXRpb24uWSA9PT0gYXR0YWNrWSk7XG5cbiAgICAgICAgICAgIGlmICghZXhpc3RpbmdQYWlyKSB7XG4gICAgICAgICAgICAgICAgc2V0UGFpcnMucHVzaCh7IFg6IGF0dGFja1gsIFk6IGF0dGFja1kgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGV4aXN0aW5nUGFpcik7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKHsgYXR0YWNrWCwgYXR0YWNrWSB9KTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG59XG5cbmxldCBuPTA7XG5cbmZ1bmN0aW9uIHBsYXllcjFUdXJuKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGlmIChnYW1lT3ZlcikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZDJcIik7XG4gICAgICAgIGNvbnN0IHJvd3NBcnJheSA9IGNlbGxzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3dzXCIpO1xuXG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8MTA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFJvdyA9IHJvd3NBcnJheVtpXTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnNBcnJheSA9IGN1cnJlbnRSb3cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbHVtbnNcIik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajwxMDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IGo7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IGk7XG4gICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2pdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7eCwgeX0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdhbWVPdmVyICYmIFAxdHVybil7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uc0FycmF5W2pdLmlkID09PSBcIkJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5pZCA9IFwiSDFcIjt9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHVtbnNBcnJheVtqXS5pZCA9PT0gXCJPXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbal0uaWQgPSBcIlgxXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwiRXJyb3JcIil9O1xuICAgICAgICAgICAgICAgICAgICB9fSk7XG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7fVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2FtZVByb2Nlc3MocGxheWVyMSwgY3B1LCBwbGF5ZXIxU2hpcFBsYWNlbWVudHMsIGNwdVNoaXBQbGFjZW1lbnRzLCBwbGF5ZXIxQXR0YWNrcywgY3B1QXR0YWNrcykge1xuICAgIGxldCBjdXJyZW50UGxheWVyID0gJ3BsYXllcjEnO1xuICAgIGdhbWVPdmVyID0gZmFsc2U7XG5cbiAgICB3aGlsZSAoIWdhbWVPdmVyKSB7XG4gICAgICAgIFAxdHVybiA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3VycmVudCBwbGF5ZXIgUmV0dXJuOiBcIiArIGN1cnJlbnRQbGF5ZXIpXG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyID09PSAncGxheWVyMScgKSB7XG4gICAgICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGF3YWl0IHBsYXllcjFUdXJuKCk7IFxuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR1cm5zKHgsIHksIGN1cnJlbnRQbGF5ZXIsIHBsYXllcjEsIGNwdSwgcGxheWVyMVNoaXBQbGFjZW1lbnRzLCBjcHVTaGlwUGxhY2VtZW50cywgcGxheWVyMUF0dGFja3MsIGNwdUF0dGFja3MpO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdjcHUnKSB7XG4gICAgICAgICAgICBQMXR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZDFcIik7XG4gICAgICAgICAgICBjb25zdCByb3dzQXJyYXkgPSBjZWxscy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicm93c1wiKTtcblxuICAgICAgICAgICAgY29uc3QgeyBhdHRhY2tYLCBhdHRhY2tZIH0gPSBhd2FpdCBjcHVBdHRhY2tMb2NhdGlvbigpO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Um93ID0gcm93c0FycmF5W2F0dGFja1ldO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uc0FycmF5ID0gY3VycmVudFJvdy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sdW1uc1wiKTtcblxuICAgICAgICAgICAgaWYgKGNvbHVtbnNBcnJheVthdHRhY2tYXS5pZCA9PT0gXCJCXCIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbYXR0YWNrWF0uaWQgPSBcIkgxXCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbHVtbnNBcnJheVthdHRhY2tYXS5pZCA9PT0gXCJPXCIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbYXR0YWNrWF0uaWQgPSBcIlgxXCI7XG4gICAgICAgICAgICB9IGVsc2Uge307XG5cbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUdXJucyhhdHRhY2tYLCBhdHRhY2tZLCBjdXJyZW50UGxheWVyLCBwbGF5ZXIxLCBjcHUsIHBsYXllcjFTaGlwUGxhY2VtZW50cywgY3B1U2hpcFBsYWNlbWVudHMsIHBsYXllcjFBdHRhY2tzLCBjcHVBdHRhY2tzKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQbGF5ZXIuaW5jbHVkZXMoXCJ3aW5zXCIpKSB7XG4gICAgICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzaXplLCBoaXRDb3VudCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmhpdENvdW50ID0gaGl0Q291bnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsU3VuayAodG90YWxTdW5rKSB7XG4gICAgICAgIGlmICh0b3RhbFN1bmsgPT09IDE3KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3VuayAobGVuZ3RoLCBoaXRDb3VudCkge1xuICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVQcm9jZXNzIH0gZnJvbSBcIi4vcGxheWVyVHVybnNcIjtcbmltcG9ydCB7YmF0dGxlc2hpcE1haW5HcmlkfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnV0dG9uXCIpO1xuY29uc3QgcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlBcmVhXCIpO1xuXG5mdW5jdGlvbiBiYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWQocGxheWVyMSxwbGF5ZXIyKSB7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKHBsYXllcjEsXCJib2FyZDFcIik7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKHBsYXllcjIsXCJib2FyZDJcIik7XG59XG5cbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnV0dG9uXCIpO1xuXG5wbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBwbGF5QXJlYS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHBsYXllcnMgPSBwbGF5ZXIoKTtcblxuICAgICAgICBjb25zdCBwbGF5ZXIxID0gcGxheWVycy5wbGF5ZXIxQm9hcmQ7XG4gICAgICAgIGNvbnN0IGNwdSA9IHBsYXllcnMuY3B1Qm9hcmQ7XG5cbiAgICAgICAgY29uc3QgcGxheWVyMVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5wbGF5ZXIxU2hpcHM7XG4gICAgICAgIGNvbnN0IGNwdVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5jcHVTaGlwcztcblxuICAgICAgICBjb25zdCBwbGF5ZXIxQXR0YWNrcyA9IFtdO1xuICAgICAgICBjb25zdCBjcHVBdHRhY2tzID0gW107XG4gICAgICAgIGJhdHRsZXNoaXBNYWluR3JpZEdlbmVyYXRlZChwbGF5ZXIxLGNwdSk7XG4gICAgICAgIGdhbWVQcm9jZXNzKHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKTtcbiAgICAgICAgc3RhcnRCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0sIDEpO1xufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==