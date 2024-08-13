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
/* harmony export */   "createGrid": () => (/* binding */ createGrid),
/* harmony export */   "placeShip": () => (/* binding */ placeShip),
/* harmony export */   "placingShips": () => (/* binding */ placingShips),
/* harmony export */   "receiveAttack": () => (/* binding */ receiveAttack)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
//node
// const { Ship } = await import('./ship.js');
// const { isSunk } = await import('./ship.js');
// const { allSunk } = await import('./ship.js')

//jest




//all ships and their stats
const carrier = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("carrier", 5, 0);
const battleship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("battleship", 4, 0);
const cruiser = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("cruiser", 3, 0);
const submarine = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("submarine", 3, 0);
const destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship("destroyer", 2, 0);

const allShips = [destroyer,cruiser,submarine,battleship,carrier];

//creates a battleship grid for each player
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

//Below places ships on the grid
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

//Below records the hits or misses attempted
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
                gameLog.innerHTML = player + " has Won!";
                return "All sunk";
            }
            else {
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

//the ships placed automatically for the CPUs board
function placingShips(battleShipGrid) {
    const placedShipRecord = [];
    let loopCounter = 0;

    for (let i = 0; i < allShips.length; i++) {
        const currentShip = allShips[i];
        const maxShipPlacement = 10 - currentShip.size;
        let direction = "";
        let existingRecord;
        let randPositions;
        
        do {
            randPositions = []; // Reset positions at the start of each loop

            const randDirection = Math.floor(Math.random() * 2);

            if (randDirection === 0) {
                // Vertical placement
                direction = "vertical";
                const randomY = Math.floor(Math.random() * maxShipPlacement);
                const randomX = Math.floor(Math.random() * 10);
                for (let j = 0; j < currentShip.size; j++) {
                    randPositions.push({ X: randomX, Y: randomY + j });
                }
            } else {
                // Horizontal placement
                direction = "horizontal";
                const randomX = Math.floor(Math.random() * maxShipPlacement);
                const randomY = Math.floor(Math.random() * 10);
                for (let k = 0; k < currentShip.size; k++) {
                    randPositions.push({ X: randomX + k, Y: randomY });
                }
            }

            // Check if any position overlaps with previously placed ships
            existingRecord = randPositions.some(position => 
                placedShipRecord.some(shipArray =>
                    shipArray.positions.some(p => p.X === position.X && p.Y === position.Y)
                )
            );

            loopCounter++;
            if (loopCounter > 25000) {
                console.error("Infinite loop detected. Breaking out.");
                break;
            }

        } while (existingRecord);

        // Place the ship if a valid position was found
        placeShip(randPositions[0].X, randPositions[0].Y, currentShip, direction, battleShipGrid, placedShipRecord);
    }
    return { battleShipGrid, placedShipRecord };
}


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "battleshipMainGrid": () => (/* binding */ battleshipMainGrid),
/* harmony export */   "player": () => (/* binding */ player),
/* harmony export */   "playerTurns": () => (/* binding */ playerTurns),
/* harmony export */   "turn": () => (/* binding */ turn)
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
/* harmony export */   "gameProcess": () => (/* binding */ gameProcess)
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
/* harmony export */   "Ship": () => (/* binding */ Ship),
/* harmony export */   "allSunk": () => (/* binding */ allSunk),
/* harmony export */   "isSunk": () => (/* binding */ isSunk)
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

//Creates the two boards for each player
function battleshipMainGridGenerated(player1,player2) {
    (0,_player__WEBPACK_IMPORTED_MODULE_1__.battleshipMainGrid)(player1,"board1");
    (0,_player__WEBPACK_IMPORTED_MODULE_1__.battleshipMainGrid)(player2,"board2");
}

const startButton = document.getElementById("playButton");

//Generate the main playing boards, placements and scores
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ040QztBQUNBO0FBQ1Y7O0FBRWxDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksMkRBQWtCO0FBQ3RCLElBQUksMkRBQWtCO0FBQ3RCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLCtDQUFNOztBQUU5QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBVztBQUNuQjtBQUNBLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9ub2RlXG4vLyBjb25zdCB7IFNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJyk7XG4vLyBjb25zdCB7IGlzU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKTtcbi8vIGNvbnN0IHsgYWxsU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKVxuXG4vL2plc3RcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgaXNTdW5rIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGFsbFN1bmsgfSBmcm9tICcuL3NoaXAnO1xuXG4vL2FsbCBzaGlwcyBhbmQgdGhlaXIgc3RhdHNcbmNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIiwgNSwgMCk7XG5jb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDApO1xuY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKFwiY3J1aXNlclwiLCAzLCAwKTtcbmNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsIDMsIDApO1xuY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIiwgMiwgMCk7XG5cbmNvbnN0IGFsbFNoaXBzID0gW2Rlc3Ryb3llcixjcnVpc2VyLHN1Ym1hcmluZSxiYXR0bGVzaGlwLGNhcnJpZXJdO1xuXG4vL2NyZWF0ZXMgYSBiYXR0bGVzaGlwIGdyaWQgZm9yIGVhY2ggcGxheWVyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgZm9yIChsZXQgaT0wOyBpIDwgMTA7IGkrKyl7XG4gICAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgICBmb3IobGV0IGo9MDsgaiA8IDEwOyBqKyspe1xuICAgICAgICAgICAgcm93LnB1c2goJ08nKTtcbiAgICAgICAgfVxuICAgICAgICBncmlkLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG59XG5cbi8vQmVsb3cgcGxhY2VzIHNoaXBzIG9uIHRoZSBncmlkXG5leHBvcnQgZnVuY3Rpb24gcGxhY2VTaGlwKHgsIHksIHNoaXAsIGRpcmVjdGlvbiwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQpIHtcbiAgICBjb25zdCBzaGlwRW5kWCA9IHggKyBzaGlwLnNpemU7XG4gICAgY29uc3Qgc2hpcEVuZFkgPSB5ICsgc2hpcC5zaXplO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwUG9zaXRpb25zID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGI9eTsgYiA8IHNoaXBFbmRZOyBiKyspe1xuICAgICAgICAgICAgICAgIGJhdHRsZVNoaXBHcmlkW2JdW3hdID0gXCJCXCI7XG4gICAgICAgICAgICAgICAgc2hpcFBvc2l0aW9ucy5wdXNoKHsgWDogeCwgWTogYiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwbGFjZWRTaGlwUmVjb3JkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzaGlwRGV0YWlsczogeyBuYW1lOiBzaGlwLm5hbWUsIGxlbmd0aDogc2hpcC5zaXplLCBoaXRDb3VudDogc2hpcC5oaXRDb3VudCB9LFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IHNoaXBQb3NpdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVTaGlwR3JpZDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBiPXg7IGIgPCBzaGlwRW5kWDsgYisrKXtcbiAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR3JpZFt5XVtiXSA9IFwiQlwiO1xuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbnMucHVzaCh7IFg6IGIsIFk6IHkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcERldGFpbHM6IHsgbmFtZTogc2hpcC5uYW1lLCBsZW5ndGg6IHNoaXAuc2l6ZSwgaGl0Q291bnQ6IHNoaXAuaGl0Q291bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBzaGlwUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlU2hpcEdyaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBkaXJlY3Rpb25cIjtcbiAgICB9XG59XG5cbmNvbnN0IHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnV0dG9uXCIpO1xuY29uc3QgZ2FtZUxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2FtZUxvZ1wiKTtcblxuLy9CZWxvdyByZWNvcmRzIHRoZSBoaXRzIG9yIG1pc3NlcyBhdHRlbXB0ZWRcbmV4cG9ydCBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHgseSwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQsIHBsYXllcil7XG4gICAgY29uc3Qgc2hpcEhpdCA9IHBsYWNlZFNoaXBSZWNvcmQuZmluZChzaGlwID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0geCAmJiBwb3NpdGlvbi5ZID09PSB5KTt9KTtcbiAgICBcbiAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50Kys7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdIJztcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IHNoaXBIaXQuc2hpcERldGFpbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzU3VuayhjdXJyZW50TGVuZ3RoLGN1cnJlbnRDb3VudCxwbGFjZWRTaGlwUmVjb3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG90YWxDb3VudCA9IHBsYWNlZFNoaXBSZWNvcmQucmVkdWNlKCh0b3RhbCxjdXJyZW50U2hpcE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGN1cnJlbnRTaGlwT2JqZWN0LnNoaXBEZXRhaWxzLmhpdENvdW50O30sMCk7XG4gICAgICAgICAgICBpZiAoYWxsU3Vuayh0b3RhbENvdW50KSkge1xuICAgICAgICAgICAgICAgIHN0YXJ0QnV0dG9uLmlubmVySFRNTCA9IFwiUGxheSBBZ2FpbiFcIjtcbiAgICAgICAgICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIGdhbWVMb2cuaW5uZXJIVE1MID0gcGxheWVyICsgXCIgaGFzIFdvbiFcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJBbGwgc3Vua1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2FtZUxvZy5pbm5lckhUTUwgPSBwbGF5ZXIgKyBcIiBoYXMgc3VuayB0aGUgXCIgKyBzaGlwSGl0LnNoaXBEZXRhaWxzLm5hbWUgKyBcIiBzaGlwIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZ2FtZUxvZy5pbm5lckhUTUwgPSBwbGF5ZXIgKyBcIiBoYXMgYSBoaXQhXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJIaXQhXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdYJztcbiAgICAgICAgZ2FtZUxvZy5pbm5lckhUTUwgPSBwbGF5ZXIgKyBcIiBoYXMgbWlzc2VkIVwiO1xuICAgICAgICByZXR1cm4gXCJNaXNzZWQhXCJcbiAgICAgICAgICAgICAgICBcbiAgICB9XG59XG5cbi8vdGhlIHNoaXBzIHBsYWNlZCBhdXRvbWF0aWNhbGx5IGZvciB0aGUgQ1BVcyBib2FyZFxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNpbmdTaGlwcyhiYXR0bGVTaGlwR3JpZCkge1xuICAgIGNvbnN0IHBsYWNlZFNoaXBSZWNvcmQgPSBbXTtcbiAgICBsZXQgbG9vcENvdW50ZXIgPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbGxTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGFsbFNoaXBzW2ldO1xuICAgICAgICBjb25zdCBtYXhTaGlwUGxhY2VtZW50ID0gMTAgLSBjdXJyZW50U2hpcC5zaXplO1xuICAgICAgICBsZXQgZGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgbGV0IGV4aXN0aW5nUmVjb3JkO1xuICAgICAgICBsZXQgcmFuZFBvc2l0aW9ucztcbiAgICAgICAgXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHJhbmRQb3NpdGlvbnMgPSBbXTsgLy8gUmVzZXQgcG9zaXRpb25zIGF0IHRoZSBzdGFydCBvZiBlYWNoIGxvb3BcblxuICAgICAgICAgICAgY29uc3QgcmFuZERpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuXG4gICAgICAgICAgICBpZiAocmFuZERpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIFZlcnRpY2FsIHBsYWNlbWVudFxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICAgICAgICAgICAgICBjb25zdCByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2hpcFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRTaGlwLnNpemU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICByYW5kUG9zaXRpb25zLnB1c2goeyBYOiByYW5kb21YLCBZOiByYW5kb21ZICsgaiB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEhvcml6b250YWwgcGxhY2VtZW50XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNoaXBQbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjdXJyZW50U2hpcC5zaXplOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZFBvc2l0aW9ucy5wdXNoKHsgWDogcmFuZG9tWCArIGssIFk6IHJhbmRvbVkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBhbnkgcG9zaXRpb24gb3ZlcmxhcHMgd2l0aCBwcmV2aW91c2x5IHBsYWNlZCBzaGlwc1xuICAgICAgICAgICAgZXhpc3RpbmdSZWNvcmQgPSByYW5kUG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gXG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5zb21lKHNoaXBBcnJheSA9PlxuICAgICAgICAgICAgICAgICAgICBzaGlwQXJyYXkucG9zaXRpb25zLnNvbWUocCA9PiBwLlggPT09IHBvc2l0aW9uLlggJiYgcC5ZID09PSBwb3NpdGlvbi5ZKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgICAgICAgICBpZiAobG9vcENvdW50ZXIgPiAyNTAwMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmZpbml0ZSBsb29wIGRldGVjdGVkLiBCcmVha2luZyBvdXQuXCIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gd2hpbGUgKGV4aXN0aW5nUmVjb3JkKTtcblxuICAgICAgICAvLyBQbGFjZSB0aGUgc2hpcCBpZiBhIHZhbGlkIHBvc2l0aW9uIHdhcyBmb3VuZFxuICAgICAgICBwbGFjZVNoaXAocmFuZFBvc2l0aW9uc1swXS5YLCByYW5kUG9zaXRpb25zWzBdLlksIGN1cnJlbnRTaGlwLCBkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQgfTtcbn1cbiIsIi8vbm9kZVxuLy8gY29uc3QgeyBwbGFjaW5nU2hpcHMgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgcmVjZWl2ZUF0dGFjayB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyBjcmVhdGVHcmlkIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IHBsYWNlU2hpcCB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuXG4vL2plc3RcbmltcG9ydCB7IHBsYWNpbmdTaGlwcyB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHJlY2VpdmVBdHRhY2sgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcGxhY2VTaGlwIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG4vL0NyZWF0ZSBncmlkcyBhbmQgcGxhY2luZyBzaGlwcyBcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXIoKSB7XG4gICAgY29uc3QgcGxheWVyMUdyaWQgPSBjcmVhdGVHcmlkKCk7XG4gICAgY29uc3QgY3B1R3JpZCA9IGNyZWF0ZUdyaWQoKTtcblxuICAgIGNvbnN0IHBsYXllcjEgPSBwbGFjaW5nU2hpcHMocGxheWVyMUdyaWQpO1xuICAgIGNvbnN0IGNwdSA9IHBsYWNpbmdTaGlwcyhjcHVHcmlkKTtcblxuICAgIGNvbnN0IHBsYXllcjFCb2FyZCA9IHBsYXllcjEuYmF0dGxlU2hpcEdyaWQ7XG4gICAgY29uc3QgY3B1Qm9hcmQgPSBjcHUuYmF0dGxlU2hpcEdyaWQ7XG5cbiAgICBjb25zdCBwbGF5ZXIxU2hpcHMgPSBwbGF5ZXIxLnBsYWNlZFNoaXBSZWNvcmQ7XG4gICAgY29uc3QgY3B1U2hpcHMgPSBjcHUucGxhY2VkU2hpcFJlY29yZDtcblxuICAgIHJldHVybiB7cGxheWVyMUJvYXJkLGNwdUJvYXJkLHBsYXllcjFTaGlwcyxjcHVTaGlwc307XG59XG5cbi8vdGhlIHBsYXllciB3b3VsZCB0YWtlIGEgdHVybiwgYW5kIGl0IHdvdWxkIGVpdGhlciBoaXQgb3IgbWlzc1xuZXhwb3J0IGZ1bmN0aW9uIHR1cm4oeCx5LHBsYXllckJvYXJkLHNoaXBQbGFjZW1lbnRzLGF0dGFja3MscGxheWVyKSB7XG4gICAgY29uc3QgZXhpc3RpbmdIaXQgPSBhdHRhY2tzLmZpbmQoaGl0cyA9PiBoaXRzLlggPT09IHggJiYgaGl0cy5ZID09PSB5KTtcblxuICAgIGlmIChleGlzdGluZ0hpdCkge1xuICAgICAgICByZXR1cm4gXCJBbHJlYWR5IHNlbGVjdGVkXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRhY2tzLnB1c2goe1g6IHgsIFk6IHl9KTtcbiAgICAgICAgcmV0dXJuIHJlY2VpdmVBdHRhY2soeCx5LHBsYXllckJvYXJkLHNoaXBQbGFjZW1lbnRzLHBsYXllcik7XG4gICAgfVxufVxuXG4vL0ZvciBlYWNoIHBsYXllcnMgdHVybiBpdCByZXR1cm5zIHdoYXQgaGFwcGVuZWQgd2l0aCBtaXNzaW5nIG9yIGhpdHRpbmdcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJUdXJucyh4LHkscGxheWVyLHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKSB7XG4gICAgaWYgKHBsYXllciA9PT0gJ3BsYXllcjEnKXtcbiAgICAgICAgbGV0IGNwdVJlc3VsdCA9IHR1cm4oeCx5LGNwdSxjcHVTaGlwUGxhY2VtZW50cyxjcHVBdHRhY2tzLHBsYXllcik7XG4gICAgICAgIGlmIChjcHVSZXN1bHQgPT09IFwiQWxsIHN1bmtcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIlBsYXllciAxIHdpbnMhXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNwdVJlc3VsdCA9PT0gXCJBbHJlYWR5IHNlbGVjdGVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocGxheWVyID09PSAnY3B1Jyl7XG4gICAgICAgIGxldCBwbGF5ZXIxUmVzdWx0ID0gdHVybih4LHkscGxheWVyMSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MscGxheWVyKTtcbiAgICAgICAgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxsIHN1bmtcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIkNQVSB3aW5zIVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxyZWFkeSBzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vQ3JlYXRlIGdyaWRzXG5leHBvcnQgZnVuY3Rpb24gYmF0dGxlc2hpcE1haW5HcmlkIChib2FyZHMsbmFtZSkge1xuICAgIGNvbnN0IG5ld0dyaWRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBuZXdHcmlkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLG5hbWUpO1xuICAgIG5ld0dyaWRTZWN0aW9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJib2FyZHNcIik7XG4gICAgcGxheUFyZWEuYXBwZW5kQ2hpbGQobmV3R3JpZFNlY3Rpb24pO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCAxMDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RpdnNSb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImlkXCIsXCJyb3dcIitpKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJyb3dzXCIpO1xuICAgICAgICAgICAgbmV3R3JpZFNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3RGl2c1Jvd3MpO1xuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqIDwgMTA7IGorKyl7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGl2c0NvbHVtbnMgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBuZXdEaXZzQ29sdW1ucy5zZXRBdHRyaWJ1dGUoXCJpZFwiLGJvYXJkc1tpXVtqXSk7XG4gICAgICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcImNvbHVtbnNcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2c1Jvd3MuYXBwZW5kQ2hpbGQobmV3RGl2c0NvbHVtbnMpOyAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0iLCIvLyBjb25zdCB7IHBsYXllcixwbGF5ZXJUdXJucyB9ID0gYXdhaXQgaW1wb3J0KCcuL3BsYXllci5qcycpO1xuXG5pbXBvcnQgeyBwbGF5ZXJUdXJucyB9IGZyb20gJy4vcGxheWVyLmpzJztcblxuY29uc3QgcGxheWVyMUF0dGFja3MgPSBbXTtcbmNvbnN0IGNwdUF0dGFja3MgPSBbXTtcbmxldCBnYW1lT3ZlciA9IGZhbHNlOyBcbmxldCBQMXR1cm47XG5cbmZ1bmN0aW9uIGNwdUF0dGFja0xvY2F0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBzZXRQYWlycyA9IFtdO1xuICAgICAgICBsZXQgZXhpc3RpbmdQYWlyO1xuICAgICAgICBsZXQgYXR0YWNrWDtcbiAgICAgICAgbGV0IGF0dGFja1k7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgYXR0YWNrWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgIGF0dGFja1ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICAgICAgICAgIGV4aXN0aW5nUGFpciA9IHBsYXllcjFBdHRhY2tzLmZpbmQocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0gYXR0YWNrWCAmJiBwb3NpdGlvbi5ZID09PSBhdHRhY2tZKTtcblxuICAgICAgICAgICAgaWYgKCFleGlzdGluZ1BhaXIpIHtcbiAgICAgICAgICAgICAgICBzZXRQYWlycy5wdXNoKHsgWDogYXR0YWNrWCwgWTogYXR0YWNrWSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZXhpc3RpbmdQYWlyKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoeyBhdHRhY2tYLCBhdHRhY2tZIH0pO1xuICAgICAgICB9LCAxNTAwKTtcbiAgICB9KTtcbn1cblxubGV0IG49MDtcblxuZnVuY3Rpb24gcGxheWVyMVR1cm4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGdhbWVPdmVyKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkMlwiKTtcbiAgICAgICAgY29uc3Qgcm93c0FycmF5ID0gY2VsbHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJvd3NcIik7XG5cbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Um93ID0gcm93c0FycmF5W2ldO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uc0FycmF5ID0gY3VycmVudFJvdy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sdW1uc1wiKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gajtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gaTtcbiAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbal0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHt4LCB5fSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZ2FtZU92ZXIgJiYgUDF0dXJuKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zQXJyYXlbal0uaWQgPT09IFwiQlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2pdLmlkID0gXCJIMVwiO31cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sdW1uc0FycmF5W2pdLmlkID09PSBcIk9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5pZCA9IFwiWDFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX0pO1xuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO31cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdhbWVQcm9jZXNzKHBsYXllcjEsIGNwdSwgcGxheWVyMVNoaXBQbGFjZW1lbnRzLCBjcHVTaGlwUGxhY2VtZW50cywgcGxheWVyMUF0dGFja3MsIGNwdUF0dGFja3MpIHtcbiAgICBsZXQgY3VycmVudFBsYXllciA9ICdwbGF5ZXIxJztcbiAgICBnYW1lT3ZlciA9IGZhbHNlO1xuXG4gICAgd2hpbGUgKCFnYW1lT3Zlcikge1xuICAgICAgICBQMXR1cm4gPSB0cnVlO1xuICAgICAgICBpZiAoY3VycmVudFBsYXllciA9PT0gJ3BsYXllcjEnICkge1xuICAgICAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBhd2FpdCBwbGF5ZXIxVHVybigpOyBcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUdXJucyh4LCB5LCBjdXJyZW50UGxheWVyLCBwbGF5ZXIxLCBjcHUsIHBsYXllcjFTaGlwUGxhY2VtZW50cywgY3B1U2hpcFBsYWNlbWVudHMsIHBsYXllcjFBdHRhY2tzLCBjcHVBdHRhY2tzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGxheWVyID09PSAnY3B1Jykge1xuICAgICAgICAgICAgUDF0dXJuID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQxXCIpO1xuICAgICAgICAgICAgY29uc3Qgcm93c0FycmF5ID0gY2VsbHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJvd3NcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHsgYXR0YWNrWCwgYXR0YWNrWSB9ID0gYXdhaXQgY3B1QXR0YWNrTG9jYXRpb24oKTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFJvdyA9IHJvd3NBcnJheVthdHRhY2tZXTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnNBcnJheSA9IGN1cnJlbnRSb3cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbHVtbnNcIik7XG5cbiAgICAgICAgICAgIGlmIChjb2x1bW5zQXJyYXlbYXR0YWNrWF0uaWQgPT09IFwiQlwiKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2F0dGFja1hdLmlkID0gXCJIMVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb2x1bW5zQXJyYXlbYXR0YWNrWF0uaWQgPT09IFwiT1wiKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2F0dGFja1hdLmlkID0gXCJYMVwiO1xuICAgICAgICAgICAgfSBlbHNlIHt9O1xuXG4gICAgICAgICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyVHVybnMoYXR0YWNrWCwgYXR0YWNrWSwgY3VycmVudFBsYXllciwgcGxheWVyMSwgY3B1LCBwbGF5ZXIxU2hpcFBsYWNlbWVudHMsIGNwdVNoaXBQbGFjZW1lbnRzLCBwbGF5ZXIxQXR0YWNrcywgY3B1QXR0YWNrcyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50UGxheWVyLmluY2x1ZGVzKFwid2luc1wiKSkge1xuICAgICAgICAgICAgZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU2hpcCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgc2l6ZSwgaGl0Q291bnQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5oaXRDb3VudCA9IGhpdENvdW50O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsbFN1bmsgKHRvdGFsU3Vuaykge1xuICAgICAgICBpZiAodG90YWxTdW5rID09PSAxNykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N1bmsgKGxlbmd0aCwgaGl0Q291bnQpIHtcbiAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnYW1lUHJvY2VzcyB9IGZyb20gXCIuL3BsYXllclR1cm5zXCI7XG5pbXBvcnQge2JhdHRsZXNoaXBNYWluR3JpZH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgeyBwbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuY29uc3QgcGxheUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ1dHRvblwiKTtcbmNvbnN0IHBsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QXJlYVwiKTtcblxuLy9DcmVhdGVzIHRoZSB0d28gYm9hcmRzIGZvciBlYWNoIHBsYXllclxuZnVuY3Rpb24gYmF0dGxlc2hpcE1haW5HcmlkR2VuZXJhdGVkKHBsYXllcjEscGxheWVyMikge1xuICAgIGJhdHRsZXNoaXBNYWluR3JpZChwbGF5ZXIxLFwiYm9hcmQxXCIpO1xuICAgIGJhdHRsZXNoaXBNYWluR3JpZChwbGF5ZXIyLFwiYm9hcmQyXCIpO1xufVxuXG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ1dHRvblwiKTtcblxuLy9HZW5lcmF0ZSB0aGUgbWFpbiBwbGF5aW5nIGJvYXJkcywgcGxhY2VtZW50cyBhbmQgc2NvcmVzXG5wbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBwbGF5QXJlYS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHBsYXllcnMgPSBwbGF5ZXIoKTtcblxuICAgICAgICBjb25zdCBwbGF5ZXIxID0gcGxheWVycy5wbGF5ZXIxQm9hcmQ7XG4gICAgICAgIGNvbnN0IGNwdSA9IHBsYXllcnMuY3B1Qm9hcmQ7XG5cbiAgICAgICAgY29uc3QgcGxheWVyMVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5wbGF5ZXIxU2hpcHM7XG4gICAgICAgIGNvbnN0IGNwdVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5jcHVTaGlwcztcblxuICAgICAgICBjb25zdCBwbGF5ZXIxQXR0YWNrcyA9IFtdO1xuICAgICAgICBjb25zdCBjcHVBdHRhY2tzID0gW107XG4gICAgICAgIGJhdHRsZXNoaXBNYWluR3JpZEdlbmVyYXRlZChwbGF5ZXIxLGNwdSk7XG4gICAgICAgIGdhbWVQcm9jZXNzKHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKTtcbiAgICAgICAgc3RhcnRCdXR0b24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH0sIDEpO1xufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==