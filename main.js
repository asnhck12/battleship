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

const allShips = [carrier,battleship,cruiser,submarine,destroyer];

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

let totalSunk = 0;

function receiveAttack(x,y, battleShipGrid, placedShipRecord){
    const shipHit = placedShipRecord.find(ship => {
        return ship.positions.some(position => position.X === x && position.Y === y);});
    
    if (shipHit) {
        shipHit.shipDetails.hitCount++;
        battleShipGrid[y][x]='H';
        const currentLength = shipHit.shipDetails.length;
        const currentCount = shipHit.shipDetails.hitCount;
        if ((0,_ship__WEBPACK_IMPORTED_MODULE_0__.isSunk)(currentLength,currentCount,placedShipRecord)) {
            totalSunk++;
            console.log(totalSunk);
            if ((0,_ship__WEBPACK_IMPORTED_MODULE_0__.allSunk)(totalSunk)) {
                return "All your ships have sunk!";
            }
            else {
            return "Your ship has sunk";
            }
        }
        else {
            return "You've got a hit!"
        }
    }
    else {
        battleShipGrid[y][x]='X';
        return "You've missed";
                
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
                if (loopCounter > 5000) {
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
/* harmony export */   battleshipMainGridGenerated: () => (/* binding */ battleshipMainGridGenerated),
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

const players = player();

const player1 = players.player1Board;
const cpu = players.cpuBoard;

const player1ShipPlacements = players.player1Ships;
const cpuShipPlacements = players.cpuShips;

const player1Attacks = [];
const cpuAttacks = [];

//the player would take a turn, and it would either hit or miss
function turn(x,y,playerBoard,shipPlacements,attacks) {
    const existingHit = attacks.find(hits => hits.X === x && hits.Y === y);

    if (existingHit) {
        return "Already selected";
    }
    else {
        attacks.push({X: x, Y: y});
        return (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.receiveAttack)(x,y,playerBoard,shipPlacements);
    }
}

//For each players turn it returns what happened with missing or hitting
function playerTurns(x,y,player) {
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

    
function battleshipMainGridGenerated() {
    player();
    battleshipMainGrid(player1,"board1");
    battleshipMainGrid(cpu,"board2");
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

function player1Turn() {
    return new Promise((resolve, reject) => {
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
                    if (columnsArray[j].id === "B") {
                        columnsArray[j].id = "H1";}
                        else if (columnsArray[j].id === "O") {
                            columnsArray[j].id = "X1";
                        }
                        else { console.log ("Error")};
                    });
                }
            }
        });}

let i=0;

async function gameProcess() {
    let currentPlayer = 'player1';

    while (currentPlayer != ("CPU wins!" || 0)) {
        if (currentPlayer === 'player1') {
            const {x,y} = await player1Turn();
            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(x,y,currentPlayer);
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
                else { console.log ("Error")};

            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(cpux,cpuy,currentPlayer);
            console.log(i);
            i++;
            if (i === 100)  {
                break;
            }
            // return currentPlayer;
        }
        else {
            console.log("Player doesn't exist");
            break;
        }}}


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
        if (totalSunk === 4) {
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

playButton.addEventListener("click", function() {
    playArea.innerHTML = "";
    setTimeout(function() {
        (0,_player__WEBPACK_IMPORTED_MODULE_1__.battleshipMainGridGenerated)();
        (0,_playerTurns__WEBPACK_IMPORTED_MODULE_0__.gameProcess)();
    }, 10);
});


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNONEM7QUFDUztBQUNuQjs7QUFFbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9FQUEyQjtBQUNuQyxRQUFRLHlEQUFXO0FBQ25CLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9ub2RlXG4vLyBjb25zdCB7IFNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJyk7XG4vLyBjb25zdCB7IGlzU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKTtcbi8vIGNvbnN0IHsgYWxsU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKVxuXG4vL2plc3RcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgaXNTdW5rIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGFsbFN1bmsgfSBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsIDUsIDApO1xuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwKTtcbmNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcChcImNydWlzZXJcIiwgMywgMCk7XG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCAzLCAwKTtcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIDIsIDApO1xuXG5jb25zdCBhbGxTaGlwcyA9IFtjYXJyaWVyLGJhdHRsZXNoaXAsY3J1aXNlcixzdWJtYXJpbmUsZGVzdHJveWVyXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGk9MDsgaSA8IDEwOyBpKyspe1xuICAgICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgICAgZm9yKGxldCBqPTA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgICAgIHJvdy5wdXNoKCdPJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ3JpZC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuXG4vL3ggaXMgdmVydGljYWwgYW5kIHkgaXMgaG9yaXpvbnRhbFxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwLCBkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKSB7XG4gICAgY29uc3Qgc2hpcEVuZFggPSB4ICsgc2hpcC5zaXplO1xuICAgIGNvbnN0IHNoaXBFbmRZID0geSArIHNoaXAuc2l6ZTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBiPXk7IGIgPCBzaGlwRW5kWTsgYisrKXtcbiAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR3JpZFtiXVt4XSA9IFwiQlwiO1xuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbnMucHVzaCh7IFg6IHgsIFk6IGIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcERldGFpbHM6IHsgbmFtZTogc2hpcC5uYW1lLCBsZW5ndGg6IHNoaXAuc2l6ZSwgaGl0Q291bnQ6IHNoaXAuaGl0Q291bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBzaGlwUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlU2hpcEdyaWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgYj14OyBiIDwgc2hpcEVuZFg7IGIrKyl7XG4gICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1bYl0gPSBcIkJcIjtcbiAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb25zLnB1c2goeyBYOiBiLCBZOiB5IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlZFNoaXBSZWNvcmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBEZXRhaWxzOiB7IG5hbWU6IHNoaXAubmFtZSwgbGVuZ3RoOiBzaGlwLnNpemUsIGhpdENvdW50OiBzaGlwLmhpdENvdW50IH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uczogc2hpcFBvc2l0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVNoaXBHcmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkludmFsaWQgZGlyZWN0aW9uXCI7XG4gICAgfVxufVxuXG5sZXQgdG90YWxTdW5rID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCx5LCBiYXR0bGVTaGlwR3JpZCwgcGxhY2VkU2hpcFJlY29yZCl7XG4gICAgY29uc3Qgc2hpcEhpdCA9IHBsYWNlZFNoaXBSZWNvcmQuZmluZChzaGlwID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0geCAmJiBwb3NpdGlvbi5ZID09PSB5KTt9KTtcbiAgICBcbiAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50Kys7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdIJztcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IHNoaXBIaXQuc2hpcERldGFpbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50O1xuICAgICAgICBpZiAoaXNTdW5rKGN1cnJlbnRMZW5ndGgsY3VycmVudENvdW50LHBsYWNlZFNoaXBSZWNvcmQpKSB7XG4gICAgICAgICAgICB0b3RhbFN1bmsrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsU3Vuayk7XG4gICAgICAgICAgICBpZiAoYWxsU3Vuayh0b3RhbFN1bmspKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIHNoaXAgaGFzIHN1bmtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdSd2ZSBnb3QgYSBoaXQhXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1beF09J1gnO1xuICAgICAgICByZXR1cm4gXCJZb3UndmUgbWlzc2VkXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhY2luZ1NoaXBzKGJhdHRsZVNoaXBHcmlkKSB7XG4gICAgY29uc3QgcGxhY2VkU2hpcFJlY29yZCA9IFtdO1xuICAgIGxldCBsb29wQ291bnRlciA9IDA7XG5cbiAgICBmb3IgKGxldCBpPTA7IGkgPCBhbGxTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGFsbFNoaXBzW2ldO1xuICAgICAgICBjb25zdCBtYXhTaGlwUGxhY2VtZW50ID0gMTAgLSBjdXJyZW50U2hpcC5zaXplO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgbGV0IGV4aXN0aW5nUmVjb3JkO1xuICAgICAgICBsZXQgc2hpcENvdW50O1xuICAgICAgICBsZXQgcmFuZFBvc2l0aW9ucyA9IFtdO1xuICAgICAgIFxuICAgICAgICBsZXQgcmFuZG9tWTtcbiAgICAgICAgbGV0IHJhbmRvbVg7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc3QgcmFuZERpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuXG4gICAgICAgICAgICBpZiAocmFuZERpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2hpcFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRTaGlwLnNpemU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NZID0gcmFuZG9tWSArIGo7XG4gICAgICAgICAgICAgICAgICAgIHJhbmRQb3NpdGlvbnMucHVzaCh7IFg6IHJhbmRvbVgsIFk6IHBvc1kgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNoaXBQbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjdXJyZW50U2hpcC5zaXplOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zWCA9IHJhbmRvbVggKyBrO1xuICAgICAgICAgICAgICAgICAgICByYW5kUG9zaXRpb25zLnB1c2goeyBYOiBwb3NYLCBZOiByYW5kb21ZIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVjb3JkID0gcmFuZFBvc2l0aW9ucy5zb21lKHBvc2l0aW9uID0+IHtyZXR1cm4gcGxhY2VkU2hpcFJlY29yZC5zb21lKHNoaXBBcnJheSA9PnNoaXBBcnJheS5wb3NpdGlvbnMuc29tZShwID0+IHAuWCA9PT0gcG9zaXRpb24uWCAmJiBwLlkgPT09IHBvc2l0aW9uLlkpKX0pXG5cbiAgICAgICAgICAgICAgICBzaGlwQ291bnQgPSByYW5kUG9zaXRpb25zLmZsYXQoKS5maWx0ZXIoY2VsbCA9PiBjZWxsID09PSAnQicpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgaWYgKGxvb3BDb3VudGVyID4gNTAwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW5maW5pdGUgbG9vcCBkZXRlY3RlZC4gQnJlYWtpbmcgb3V0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfSB3aGlsZSAoZXhpc3RpbmdSZWNvcmQgJiYgKHNoaXBDb3VudCA9IDE3KSk7XG5cbiAgICAgICAgcGxhY2VTaGlwKHJhbmRvbVgscmFuZG9tWSxjdXJyZW50U2hpcCxkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIHtiYXR0bGVTaGlwR3JpZCxwbGFjZWRTaGlwUmVjb3JkfTtcbn1cbiIsIi8vbm9kZVxuLy8gY29uc3QgeyBwbGFjaW5nU2hpcHMgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgcmVjZWl2ZUF0dGFjayB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyBjcmVhdGVHcmlkIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IHBsYWNlU2hpcCB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuXG4vL2plc3RcbmltcG9ydCB7IHBsYWNpbmdTaGlwcyB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHJlY2VpdmVBdHRhY2sgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcGxhY2VTaGlwIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG4vL0NyZWF0ZSBncmlkcyBhbmQgcGxhY2luZyBzaGlwcyBcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXIoKSB7XG4gICAgY29uc3QgcGxheWVyMUdyaWQgPSBjcmVhdGVHcmlkKCk7XG4gICAgY29uc3QgY3B1R3JpZCA9IGNyZWF0ZUdyaWQoKTtcblxuICAgIGNvbnN0IHBsYXllcjEgPSBwbGFjaW5nU2hpcHMocGxheWVyMUdyaWQpO1xuICAgIGNvbnN0IGNwdSA9IHBsYWNpbmdTaGlwcyhjcHVHcmlkKTtcblxuICAgIGNvbnN0IHBsYXllcjFCb2FyZCA9IHBsYXllcjEuYmF0dGxlU2hpcEdyaWQ7XG4gICAgY29uc3QgY3B1Qm9hcmQgPSBjcHUuYmF0dGxlU2hpcEdyaWQ7XG5cbiAgICBjb25zdCBwbGF5ZXIxU2hpcHMgPSBwbGF5ZXIxLnBsYWNlZFNoaXBSZWNvcmQ7XG4gICAgY29uc3QgY3B1U2hpcHMgPSBjcHUucGxhY2VkU2hpcFJlY29yZDtcblxuICAgIHJldHVybiB7cGxheWVyMUJvYXJkLGNwdUJvYXJkLHBsYXllcjFTaGlwcyxjcHVTaGlwc307XG59XG5cbmNvbnN0IHBsYXllcnMgPSBwbGF5ZXIoKTtcblxuY29uc3QgcGxheWVyMSA9IHBsYXllcnMucGxheWVyMUJvYXJkO1xuY29uc3QgY3B1ID0gcGxheWVycy5jcHVCb2FyZDtcblxuY29uc3QgcGxheWVyMVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5wbGF5ZXIxU2hpcHM7XG5jb25zdCBjcHVTaGlwUGxhY2VtZW50cyA9IHBsYXllcnMuY3B1U2hpcHM7XG5cbmNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG5jb25zdCBjcHVBdHRhY2tzID0gW107XG5cbi8vdGhlIHBsYXllciB3b3VsZCB0YWtlIGEgdHVybiwgYW5kIGl0IHdvdWxkIGVpdGhlciBoaXQgb3IgbWlzc1xuZXhwb3J0IGZ1bmN0aW9uIHR1cm4oeCx5LHBsYXllckJvYXJkLHNoaXBQbGFjZW1lbnRzLGF0dGFja3MpIHtcbiAgICBjb25zdCBleGlzdGluZ0hpdCA9IGF0dGFja3MuZmluZChoaXRzID0+IGhpdHMuWCA9PT0geCAmJiBoaXRzLlkgPT09IHkpO1xuXG4gICAgaWYgKGV4aXN0aW5nSGl0KSB7XG4gICAgICAgIHJldHVybiBcIkFscmVhZHkgc2VsZWN0ZWRcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF0dGFja3MucHVzaCh7WDogeCwgWTogeX0pO1xuICAgICAgICByZXR1cm4gcmVjZWl2ZUF0dGFjayh4LHkscGxheWVyQm9hcmQsc2hpcFBsYWNlbWVudHMpO1xuICAgIH1cbn1cblxuLy9Gb3IgZWFjaCBwbGF5ZXJzIHR1cm4gaXQgcmV0dXJucyB3aGF0IGhhcHBlbmVkIHdpdGggbWlzc2luZyBvciBoaXR0aW5nXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyVHVybnMoeCx5LHBsYXllcikge1xuICAgIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXIxJyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIDFzIHR1cm4hXCIpO1xuICAgICAgICBsZXQgY3B1UmVzdWx0ID0gdHVybih4LHksY3B1LGNwdVNoaXBQbGFjZW1lbnRzLGNwdUF0dGFja3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInAxIGVuZW15IGdyaWQ6IFwiICsgY3B1KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJQTGF5ZXIgMSBvdXRjb21lOiBcIiArIGNwdVJlc3VsdCk7XG4gICAgICAgIGlmIChjcHVSZXN1bHQgPT09IFwiQWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiKSB7IFxuICAgICAgICAgICAgcmV0dXJuIFwiUGxheWVyIDEgd2lucyFcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKHBsYXllciA9PT0gJ2NwdScpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImNwdXMncyB0dXJuIVwiKTtcbiAgICAgICAgbGV0IHBsYXllcjFSZXN1bHQgPSB0dXJuKHgseSxwbGF5ZXIxLHBsYXllcjFTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3B1IGVuZW15IGdyaWQ6IFwiICsgcGxheWVyMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3B1IG91dGNvbWU6IFwiICsgcGxheWVyMVJlc3VsdCk7XG4gICAgICAgIGlmIChwbGF5ZXIxUmVzdWx0ID09PSBcIkFsbCB5b3VyIHNoaXBzIGhhdmUgc3VuayFcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIkNQVSB3aW5zIVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgfVxufVxuXG4vL0NyZWF0ZSBncmlkc1xuZXhwb3J0IGZ1bmN0aW9uIGJhdHRsZXNoaXBNYWluR3JpZCAoYm9hcmRzLG5hbWUpIHtcbiAgICBjb25zdCBuZXdHcmlkU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbmV3R3JpZFNlY3Rpb24uc2V0QXR0cmlidXRlKFwiaWRcIixuYW1lKTtcbiAgICBuZXdHcmlkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwiYm9hcmRzXCIpO1xuICAgIHBsYXlBcmVhLmFwcGVuZENoaWxkKG5ld0dyaWRTZWN0aW9uKTtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgMTA7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBuZXdEaXZzUm93cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdEaXZzUm93cy5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwicm93XCIraSk7XG4gICAgICAgICAgICBuZXdEaXZzUm93cy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicm93c1wiKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IHBsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QXJlYVwiKTtcbiAgICAgICAgICAgIG5ld0dyaWRTZWN0aW9uLmFwcGVuZENoaWxkKG5ld0RpdnNSb3dzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGo9MDsgaiA8IDEwOyBqKyspe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RpdnNDb2x1bW5zID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiaWRcIixib2FyZHNbaV1bal0pO1xuICAgICAgICAgICAgICAgIG5ld0RpdnNDb2x1bW5zLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJjb2x1bW5zXCIpO1xuICAgICAgICAgICAgICAgIG5ld0RpdnNSb3dzLmFwcGVuZENoaWxkKG5ld0RpdnNDb2x1bW5zKTsgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcbmV4cG9ydCBmdW5jdGlvbiBiYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWQoKSB7XG4gICAgcGxheWVyKCk7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKHBsYXllcjEsXCJib2FyZDFcIik7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKGNwdSxcImJvYXJkMlwiKTtcbn0iLCIvLyBjb25zdCB7IHBsYXllcixwbGF5ZXJUdXJucyB9ID0gYXdhaXQgaW1wb3J0KCcuL3BsYXllci5qcycpO1xuXG5pbXBvcnQgeyBwbGF5ZXJUdXJucyB9IGZyb20gJy4vcGxheWVyLmpzJztcblxuY29uc3QgcGxheWVyMUF0dGFja3MgPSBbXTtcbmNvbnN0IGNwdUF0dGFja3MgPSBbXTtcblxuXG4vLyBleHBvcnQgXG5mdW5jdGlvbiBjcHVBdHRhY2tMb2NhdGlvbigpIHtcbiAgICBsZXQgc2V0UGFpcnMgPSBbXTtcbiAgICBsZXQgZXhpc3RpbmdQYWlyO1xuICAgIGxldCBhdHRhY2tYO1xuICAgIGxldCBhdHRhY2tZO1xuXG4gICAgZG8ge1xuICAgIGF0dGFja1kgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgYXR0YWNrWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIGV4aXN0aW5nUGFpciA9IHBsYXllcjFBdHRhY2tzLmZpbmQocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0gYXR0YWNrWCAmJiBwb3NpdGlvbi5ZID09PSBhdHRhY2tZKTsgICAgXG5cbiAgICBpZiAoIWV4aXN0aW5nUGFpcikge1xuICAgICAgICBzZXRQYWlycy5wdXNoKHsgWDogYXR0YWNrWCwgWTogYXR0YWNrWSB9KTtcbiAgICB9XG5cbn0gd2hpbGUgKGV4aXN0aW5nUGFpcik7XG5cbnJldHVybiB7YXR0YWNrWCwgYXR0YWNrWX07XG5cbn1cblxuZnVuY3Rpb24gcGxheWVyMVR1cm4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkMlwiKTtcbiAgICAgICAgY29uc3Qgcm93c0FycmF5ID0gY2VsbHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJvd3NcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPDEwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3cgPSByb3dzQXJyYXlbaV07XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zQXJyYXkgPSBjdXJyZW50Um93LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb2x1bW5zXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8MTA7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBqO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBpO1xuICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe3gsIHl9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbnNBcnJheVtqXS5pZCA9PT0gXCJCXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5pZCA9IFwiSDFcIjt9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2x1bW5zQXJyYXlbal0uaWQgPT09IFwiT1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2pdLmlkID0gXCJYMVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IGNvbnNvbGUubG9nIChcIkVycm9yXCIpfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTt9XG5cbmxldCBpPTA7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnYW1lUHJvY2VzcygpIHtcbiAgICBsZXQgY3VycmVudFBsYXllciA9ICdwbGF5ZXIxJztcblxuICAgIHdoaWxlIChjdXJyZW50UGxheWVyICE9IChcIkNQVSB3aW5zIVwiIHx8IFwiUGxheWVyIDEgd2lucyFcIikpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdwbGF5ZXIxJykge1xuICAgICAgICAgICAgY29uc3Qge3gseX0gPSBhd2FpdCBwbGF5ZXIxVHVybigpO1xuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR1cm5zKHgseSxjdXJyZW50UGxheWVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFBsYXllciA9PT0gJ2NwdScpIHtcbiAgICAgICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZDFcIik7XG4gICAgICAgICAgICBjb25zdCByb3dzQXJyYXkgPSBjZWxscy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicm93c1wiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgQ0FMcmVzdWx0ID0gY3B1QXR0YWNrTG9jYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnN0IGNwdXggPSBDQUxyZXN1bHQuYXR0YWNrWDtcbiAgICAgICAgICAgIGNvbnN0IGNwdXkgPSBDQUxyZXN1bHQuYXR0YWNrWTtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFJvdyA9IHJvd3NBcnJheVtjcHV5XTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnNBcnJheSA9IGN1cnJlbnRSb3cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbHVtbnNcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb2x1bW5zQXJyYXlbY3B1eF0uaWQgPT09IFwiQlwiKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2NwdXhdLmlkID0gXCJIMVwiO31cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2x1bW5zQXJyYXlbY3B1eF0uaWQgPT09IFwiT1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtjcHV4XS5pZCA9IFwiWDFcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IGNvbnNvbGUubG9nIChcIkVycm9yXCIpfTtcblxuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR1cm5zKGNwdXgsY3B1eSxjdXJyZW50UGxheWVyKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEwMCkgIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJldHVybiBjdXJyZW50UGxheWVyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgZG9lc24ndCBleGlzdFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9fX1cbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzaXplLCBoaXRDb3VudCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmhpdENvdW50ID0gaGl0Q291bnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsU3VuayAodG90YWxTdW5rKSB7XG4gICAgICAgIGlmICh0b3RhbFN1bmsgPT09IDQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdW5rIChsZW5ndGgsIGhpdENvdW50KSB7XG4gICAgaWYgKGhpdENvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZVByb2Nlc3MgfSBmcm9tIFwiLi9wbGF5ZXJUdXJuc1wiO1xuaW1wb3J0IHtiYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWR9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IHBsYXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5jb25zdCBwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUFyZWFcIik7XG5cbnBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHBsYXlBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgYmF0dGxlc2hpcE1haW5HcmlkR2VuZXJhdGVkKCk7XG4gICAgICAgIGdhbWVQcm9jZXNzKCk7XG4gICAgfSwgMTApO1xufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==