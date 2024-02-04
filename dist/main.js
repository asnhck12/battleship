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

// const players = player();

// const player1 = players.player1Board;
// const cpu = players.cpuBoard;

// const player1ShipPlacements = players.player1Ships;
// const cpuShipPlacements = players.cpuShips;

// const player1Attacks = [];
// const cpuAttacks = [];

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
        console.log(cpuResult);
        if (cpuResult === "All your ships have sunk!") { 
            return "Player 1 wins!";
        }
        return 'cpu';
    }
    else if (player === 'cpu'){
        console.log("cpus's turn!");
        let player1Result = turn(x,y,player1,player1ShipPlacements,player1Attacks);
        console.log(player1Result);
        if (player1Result === "All your ships have sunk!") { 
            return "CPU wins!";
        }
        return 'player1';
    }
}

//generates cpu attack
// export function cpuAttackLocation() {
//     let setPairs = [];

//     do {
//     attackY = Math.floor(Math.random() * 10);
//     attackX = Math.floor(Math.random() * 10);

//     existingPair = player1Attacks.find(position => position.X === attackX && position.Y === attackY);    

//     if (!existingPair) {
//         setPairs.push({ X: attackX, Y: attackY });
//     }

// } while (existingPair);

// return {attackX, attackY};

// }

//player1 attack location
function playerAttackLocation(x,y) {
    return {x,y};

}

let i = 0;

//turns are looped here
// export function gameProcess() {
//     let currentPlayer = 'player1';

//     while (currentPlayer != ("CPU wins!" || "Player 1 wins!")) {
//         if (currentPlayer === 'player1') {
//             // playersLocation = playerAttackLocation();
//             // let x = playersLocation.x;
//             // let y = playersLocation.y;
//             let x = 3;
//             let y = 2;
//             currentPlayer = playerTurns(x,y,currentPlayer);
//             currentPlayer = 'cpu';
//         }
//         else 
//         if (currentPlayer === 'cpu') {
//             const CALresult = cpuAttackLocation();
//             const x = CALresult.attackX;
//             const y = CALresult.attackY;
//             currentPlayer = playerTurns(x,y,currentPlayer);
//             console.log(i);
//             i++;
//             if (i === 100)  {
//                 break;
//             }
//         }
//         else {
//             console.log("Player doesn't exist");
//             break;
//         }
//     }
// }

/***/ }),

/***/ "./src/playerTurns.js":
/*!****************************!*\
  !*** ./src/playerTurns.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   battleshipMainGrid: () => (/* binding */ battleshipMainGrid),
/* harmony export */   battleshipMainGridGenerated: () => (/* binding */ battleshipMainGridGenerated)
/* harmony export */ });
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ "./src/player.js");
// const { player,playerTurns } = await import('./player.js');



const players = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.player)();

const player1 = players.player1Board;
const cpu = players.cpuBoard;

const player1ShipPlacements = players.player1Ships;
const cpuShipPlacements = players.cpuShips;

const player1Attacks = [];
const cpuAttacks = [];


// export 
function cpuAttackLocation() {
    let setPairs = [];

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
// export 
function gameProcess() {
    let currentPlayer = 'player1';

    while (currentPlayer != ("CPU wins!" || 0)) {
        if (currentPlayer === 'player1') {
            // playersLocation = playerAttackLocation();
            // let x = playersLocation.x;
            // let y = playersLocation.y;
            let x = 3;
            let y = 2;
            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(x,y,currentPlayer);
        }
        else if (currentPlayer === 'cpu') {
            const CALresult = cpuAttackLocation();
            const x = CALresult.attackX;
            const y = CALresult.attackY;
            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(x,y,currentPlayer);
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
        console.log(newDivsRows);
        const playArea = document.getElementById("playArea");
        newGridSection.appendChild(newDivsRows);
        for (let j=0; j < 10; j++){
            const newDivsColumns =  document.createElement("div");
            newDivsColumns.setAttribute("id",boards[j][i]);
            newDivsColumns.setAttribute("class","columns"); 
            console.log(newDivsColumns);
            newDivsRows.appendChild(newDivsColumns);           
        }
    }
}

function battleshipMainGridGenerated() {
    battleshipMainGrid(player1,"board1");
    battleshipMainGrid(cpu,"board2");
}


//assign ids for each div

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


(0,_playerTurns__WEBPACK_IMPORTED_MODULE_0__.battleshipMainGridGenerated)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNONEQ7O0FBRTVELHlFQUEyQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9ub2RlXG4vLyBjb25zdCB7IFNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJyk7XG4vLyBjb25zdCB7IGlzU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKTtcbi8vIGNvbnN0IHsgYWxsU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKVxuXG4vL2plc3RcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgaXNTdW5rIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGFsbFN1bmsgfSBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsIDUsIDApO1xuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwKTtcbmNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcChcImNydWlzZXJcIiwgMywgMCk7XG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCAzLCAwKTtcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIDIsIDApO1xuXG5jb25zdCBhbGxTaGlwcyA9IFtjYXJyaWVyLGJhdHRsZXNoaXAsY3J1aXNlcixzdWJtYXJpbmUsZGVzdHJveWVyXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGk9MDsgaSA8IDEwOyBpKyspe1xuICAgICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgICAgZm9yKGxldCBqPTA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgICAgIHJvdy5wdXNoKCdPJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ3JpZC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuXG4vL3ggaXMgdmVydGljYWwgYW5kIHkgaXMgaG9yaXpvbnRhbFxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwLCBkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKSB7XG4gICAgY29uc3Qgc2hpcEVuZFggPSB4ICsgc2hpcC5zaXplO1xuICAgIGNvbnN0IHNoaXBFbmRZID0geSArIHNoaXAuc2l6ZTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBiPXk7IGIgPCBzaGlwRW5kWTsgYisrKXtcbiAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR3JpZFtiXVt4XSA9IFwiQlwiO1xuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbnMucHVzaCh7IFg6IHgsIFk6IGIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcERldGFpbHM6IHsgbmFtZTogc2hpcC5uYW1lLCBsZW5ndGg6IHNoaXAuc2l6ZSwgaGl0Q291bnQ6IHNoaXAuaGl0Q291bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBzaGlwUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlU2hpcEdyaWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgYj14OyBiIDwgc2hpcEVuZFg7IGIrKyl7XG4gICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1bYl0gPSBcIkJcIjtcbiAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb25zLnB1c2goeyBYOiBiLCBZOiB5IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlZFNoaXBSZWNvcmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBEZXRhaWxzOiB7IG5hbWU6IHNoaXAubmFtZSwgbGVuZ3RoOiBzaGlwLnNpemUsIGhpdENvdW50OiBzaGlwLmhpdENvdW50IH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uczogc2hpcFBvc2l0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVNoaXBHcmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkludmFsaWQgZGlyZWN0aW9uXCI7XG4gICAgfVxufVxuXG5sZXQgdG90YWxTdW5rID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCx5LCBiYXR0bGVTaGlwR3JpZCwgcGxhY2VkU2hpcFJlY29yZCl7XG4gICAgY29uc3Qgc2hpcEhpdCA9IHBsYWNlZFNoaXBSZWNvcmQuZmluZChzaGlwID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0geCAmJiBwb3NpdGlvbi5ZID09PSB5KTt9KTtcbiAgICBcbiAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50Kys7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdIJztcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IHNoaXBIaXQuc2hpcERldGFpbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50O1xuICAgICAgICBpZiAoaXNTdW5rKGN1cnJlbnRMZW5ndGgsY3VycmVudENvdW50LHBsYWNlZFNoaXBSZWNvcmQpKSB7XG4gICAgICAgICAgICB0b3RhbFN1bmsrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvdGFsU3Vuayk7XG4gICAgICAgICAgICBpZiAoYWxsU3Vuayh0b3RhbFN1bmspKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIHNoaXAgaGFzIHN1bmtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdSd2ZSBnb3QgYSBoaXQhXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1beF09J1gnO1xuICAgICAgICByZXR1cm4gXCJZb3UndmUgbWlzc2VkXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhY2luZ1NoaXBzKGJhdHRsZVNoaXBHcmlkKSB7XG4gICAgY29uc3QgcGxhY2VkU2hpcFJlY29yZCA9IFtdO1xuICAgIGxldCBsb29wQ291bnRlciA9IDA7XG5cbiAgICBmb3IgKGxldCBpPTA7IGkgPCBhbGxTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGFsbFNoaXBzW2ldO1xuICAgICAgICBjb25zdCBtYXhTaGlwUGxhY2VtZW50ID0gMTAgLSBjdXJyZW50U2hpcC5zaXplO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgbGV0IGV4aXN0aW5nUmVjb3JkO1xuICAgICAgICBsZXQgc2hpcENvdW50O1xuICAgICAgICBsZXQgcmFuZFBvc2l0aW9ucyA9IFtdO1xuICAgICAgIFxuICAgICAgICBsZXQgcmFuZG9tWTtcbiAgICAgICAgbGV0IHJhbmRvbVg7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc3QgcmFuZERpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuXG4gICAgICAgICAgICBpZiAocmFuZERpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2hpcFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRTaGlwLnNpemU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NZID0gcmFuZG9tWSArIGo7XG4gICAgICAgICAgICAgICAgICAgIHJhbmRQb3NpdGlvbnMucHVzaCh7IFg6IHJhbmRvbVgsIFk6IHBvc1kgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNoaXBQbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjdXJyZW50U2hpcC5zaXplOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zWCA9IHJhbmRvbVggKyBrO1xuICAgICAgICAgICAgICAgICAgICByYW5kUG9zaXRpb25zLnB1c2goeyBYOiBwb3NYLCBZOiByYW5kb21ZIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVjb3JkID0gcmFuZFBvc2l0aW9ucy5zb21lKHBvc2l0aW9uID0+IHtyZXR1cm4gcGxhY2VkU2hpcFJlY29yZC5zb21lKHNoaXBBcnJheSA9PnNoaXBBcnJheS5wb3NpdGlvbnMuc29tZShwID0+IHAuWCA9PT0gcG9zaXRpb24uWCAmJiBwLlkgPT09IHBvc2l0aW9uLlkpKX0pXG5cbiAgICAgICAgICAgICAgICBzaGlwQ291bnQgPSByYW5kUG9zaXRpb25zLmZsYXQoKS5maWx0ZXIoY2VsbCA9PiBjZWxsID09PSAnQicpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgaWYgKGxvb3BDb3VudGVyID4gNTAwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiSW5maW5pdGUgbG9vcCBkZXRlY3RlZC4gQnJlYWtpbmcgb3V0LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfSB3aGlsZSAoZXhpc3RpbmdSZWNvcmQgJiYgKHNoaXBDb3VudCA9IDE3KSk7XG5cbiAgICAgICAgcGxhY2VTaGlwKHJhbmRvbVgscmFuZG9tWSxjdXJyZW50U2hpcCxkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKTtcbiAgICB9XG4gICAgcmV0dXJuIHtiYXR0bGVTaGlwR3JpZCxwbGFjZWRTaGlwUmVjb3JkfTtcbn1cbiIsIi8vbm9kZVxuLy8gY29uc3QgeyBwbGFjaW5nU2hpcHMgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgcmVjZWl2ZUF0dGFjayB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyBjcmVhdGVHcmlkIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IHBsYWNlU2hpcCB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuXG4vL2plc3RcbmltcG9ydCB7IHBsYWNpbmdTaGlwcyB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHJlY2VpdmVBdHRhY2sgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBjcmVhdGVHcmlkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcGxhY2VTaGlwIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuXG4vL0NyZWF0ZSBncmlkcyBhbmQgcGxhY2luZyBzaGlwcyBcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXIoKSB7XG4gICAgY29uc3QgcGxheWVyMUdyaWQgPSBjcmVhdGVHcmlkKCk7XG4gICAgY29uc3QgY3B1R3JpZCA9IGNyZWF0ZUdyaWQoKTtcblxuICAgIGNvbnN0IHBsYXllcjEgPSBwbGFjaW5nU2hpcHMocGxheWVyMUdyaWQpO1xuICAgIGNvbnN0IGNwdSA9IHBsYWNpbmdTaGlwcyhjcHVHcmlkKTtcblxuICAgIGNvbnN0IHBsYXllcjFCb2FyZCA9IHBsYXllcjEuYmF0dGxlU2hpcEdyaWQ7XG4gICAgY29uc3QgY3B1Qm9hcmQgPSBjcHUuYmF0dGxlU2hpcEdyaWQ7XG5cbiAgICBjb25zdCBwbGF5ZXIxU2hpcHMgPSBwbGF5ZXIxLnBsYWNlZFNoaXBSZWNvcmQ7XG4gICAgY29uc3QgY3B1U2hpcHMgPSBjcHUucGxhY2VkU2hpcFJlY29yZDtcblxuICAgIHJldHVybiB7cGxheWVyMUJvYXJkLGNwdUJvYXJkLHBsYXllcjFTaGlwcyxjcHVTaGlwc307XG59XG5cbi8vIGNvbnN0IHBsYXllcnMgPSBwbGF5ZXIoKTtcblxuLy8gY29uc3QgcGxheWVyMSA9IHBsYXllcnMucGxheWVyMUJvYXJkO1xuLy8gY29uc3QgY3B1ID0gcGxheWVycy5jcHVCb2FyZDtcblxuLy8gY29uc3QgcGxheWVyMVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5wbGF5ZXIxU2hpcHM7XG4vLyBjb25zdCBjcHVTaGlwUGxhY2VtZW50cyA9IHBsYXllcnMuY3B1U2hpcHM7XG5cbi8vIGNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG4vLyBjb25zdCBjcHVBdHRhY2tzID0gW107XG5cbi8vdGhlIHBsYXllciB3b3VsZCB0YWtlIGEgdHVybiwgYW5kIGl0IHdvdWxkIGVpdGhlciBoaXQgb3IgbWlzc1xuZXhwb3J0IGZ1bmN0aW9uIHR1cm4oeCx5LHBsYXllckJvYXJkLHNoaXBQbGFjZW1lbnRzLGF0dGFja3MpIHtcbiAgICBjb25zdCBleGlzdGluZ0hpdCA9IGF0dGFja3MuZmluZChoaXRzID0+IGhpdHMuWCA9PT0geCAmJiBoaXRzLlkgPT09IHkpO1xuXG4gICAgaWYgKGV4aXN0aW5nSGl0KSB7XG4gICAgICAgIHJldHVybiBcIkFscmVhZHkgc2VsZWN0ZWRcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF0dGFja3MucHVzaCh7WDogeCwgWTogeX0pO1xuICAgICAgICByZXR1cm4gcmVjZWl2ZUF0dGFjayh4LHkscGxheWVyQm9hcmQsc2hpcFBsYWNlbWVudHMpO1xuICAgIH1cbn1cblxuLy9Gb3IgZWFjaCBwbGF5ZXJzIHR1cm4gaXQgcmV0dXJucyB3aGF0IGhhcHBlbmVkIHdpdGggbWlzc2luZyBvciBoaXR0aW5nXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyVHVybnMoeCx5LHBsYXllcikge1xuICAgIGlmIChwbGF5ZXIgPT09ICdwbGF5ZXIxJyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIDFzIHR1cm4hXCIpO1xuICAgICAgICBsZXQgY3B1UmVzdWx0ID0gdHVybih4LHksY3B1LGNwdVNoaXBQbGFjZW1lbnRzLGNwdUF0dGFja3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhjcHVSZXN1bHQpO1xuICAgICAgICBpZiAoY3B1UmVzdWx0ID09PSBcIkFsbCB5b3VyIHNoaXBzIGhhdmUgc3VuayFcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIlBsYXllciAxIHdpbnMhXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdjcHUnO1xuICAgIH1cbiAgICBlbHNlIGlmIChwbGF5ZXIgPT09ICdjcHUnKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcHVzJ3MgdHVybiFcIik7XG4gICAgICAgIGxldCBwbGF5ZXIxUmVzdWx0ID0gdHVybih4LHkscGxheWVyMSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MpO1xuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIxUmVzdWx0KTtcbiAgICAgICAgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiKSB7IFxuICAgICAgICAgICAgcmV0dXJuIFwiQ1BVIHdpbnMhXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdwbGF5ZXIxJztcbiAgICB9XG59XG5cbi8vZ2VuZXJhdGVzIGNwdSBhdHRhY2tcbi8vIGV4cG9ydCBmdW5jdGlvbiBjcHVBdHRhY2tMb2NhdGlvbigpIHtcbi8vICAgICBsZXQgc2V0UGFpcnMgPSBbXTtcblxuLy8gICAgIGRvIHtcbi8vICAgICBhdHRhY2tZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuLy8gICAgIGF0dGFja1ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbi8vICAgICBleGlzdGluZ1BhaXIgPSBwbGF5ZXIxQXR0YWNrcy5maW5kKHBvc2l0aW9uID0+IHBvc2l0aW9uLlggPT09IGF0dGFja1ggJiYgcG9zaXRpb24uWSA9PT0gYXR0YWNrWSk7ICAgIFxuXG4vLyAgICAgaWYgKCFleGlzdGluZ1BhaXIpIHtcbi8vICAgICAgICAgc2V0UGFpcnMucHVzaCh7IFg6IGF0dGFja1gsIFk6IGF0dGFja1kgfSk7XG4vLyAgICAgfVxuXG4vLyB9IHdoaWxlIChleGlzdGluZ1BhaXIpO1xuXG4vLyByZXR1cm4ge2F0dGFja1gsIGF0dGFja1l9O1xuXG4vLyB9XG5cbi8vcGxheWVyMSBhdHRhY2sgbG9jYXRpb25cbmZ1bmN0aW9uIHBsYXllckF0dGFja0xvY2F0aW9uKHgseSkge1xuICAgIHJldHVybiB7eCx5fTtcblxufVxuXG5sZXQgaSA9IDA7XG5cbi8vdHVybnMgYXJlIGxvb3BlZCBoZXJlXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2FtZVByb2Nlc3MoKSB7XG4vLyAgICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSAncGxheWVyMSc7XG5cbi8vICAgICB3aGlsZSAoY3VycmVudFBsYXllciAhPSAoXCJDUFUgd2lucyFcIiB8fCBcIlBsYXllciAxIHdpbnMhXCIpKSB7XG4vLyAgICAgICAgIGlmIChjdXJyZW50UGxheWVyID09PSAncGxheWVyMScpIHtcbi8vICAgICAgICAgICAgIC8vIHBsYXllcnNMb2NhdGlvbiA9IHBsYXllckF0dGFja0xvY2F0aW9uKCk7XG4vLyAgICAgICAgICAgICAvLyBsZXQgeCA9IHBsYXllcnNMb2NhdGlvbi54O1xuLy8gICAgICAgICAgICAgLy8gbGV0IHkgPSBwbGF5ZXJzTG9jYXRpb24ueTtcbi8vICAgICAgICAgICAgIGxldCB4ID0gMztcbi8vICAgICAgICAgICAgIGxldCB5ID0gMjtcbi8vICAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUdXJucyh4LHksY3VycmVudFBsYXllcik7XG4vLyAgICAgICAgICAgICBjdXJyZW50UGxheWVyID0gJ2NwdSc7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSBcbi8vICAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdjcHUnKSB7XG4vLyAgICAgICAgICAgICBjb25zdCBDQUxyZXN1bHQgPSBjcHVBdHRhY2tMb2NhdGlvbigpO1xuLy8gICAgICAgICAgICAgY29uc3QgeCA9IENBTHJlc3VsdC5hdHRhY2tYO1xuLy8gICAgICAgICAgICAgY29uc3QgeSA9IENBTHJlc3VsdC5hdHRhY2tZO1xuLy8gICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR1cm5zKHgseSxjdXJyZW50UGxheWVyKTtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKGkpO1xuLy8gICAgICAgICAgICAgaSsrO1xuLy8gICAgICAgICAgICAgaWYgKGkgPT09IDEwMCkgIHtcbi8vICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIHtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUGxheWVyIGRvZXNuJ3QgZXhpc3RcIik7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0iLCIvLyBjb25zdCB7IHBsYXllcixwbGF5ZXJUdXJucyB9ID0gYXdhaXQgaW1wb3J0KCcuL3BsYXllci5qcycpO1xuXG5pbXBvcnQgeyBwbGF5ZXIscGxheWVyVHVybnMgfSBmcm9tICcuL3BsYXllci5qcyc7XG5cbmNvbnN0IHBsYXllcnMgPSBwbGF5ZXIoKTtcblxuY29uc3QgcGxheWVyMSA9IHBsYXllcnMucGxheWVyMUJvYXJkO1xuY29uc3QgY3B1ID0gcGxheWVycy5jcHVCb2FyZDtcblxuY29uc3QgcGxheWVyMVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5wbGF5ZXIxU2hpcHM7XG5jb25zdCBjcHVTaGlwUGxhY2VtZW50cyA9IHBsYXllcnMuY3B1U2hpcHM7XG5cbmNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG5jb25zdCBjcHVBdHRhY2tzID0gW107XG5cblxuLy8gZXhwb3J0IFxuZnVuY3Rpb24gY3B1QXR0YWNrTG9jYXRpb24oKSB7XG4gICAgbGV0IHNldFBhaXJzID0gW107XG5cbiAgICBkbyB7XG4gICAgYXR0YWNrWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBhdHRhY2tYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgZXhpc3RpbmdQYWlyID0gcGxheWVyMUF0dGFja3MuZmluZChwb3NpdGlvbiA9PiBwb3NpdGlvbi5YID09PSBhdHRhY2tYICYmIHBvc2l0aW9uLlkgPT09IGF0dGFja1kpOyAgICBcblxuICAgIGlmICghZXhpc3RpbmdQYWlyKSB7XG4gICAgICAgIHNldFBhaXJzLnB1c2goeyBYOiBhdHRhY2tYLCBZOiBhdHRhY2tZIH0pO1xuICAgIH1cblxufSB3aGlsZSAoZXhpc3RpbmdQYWlyKTtcblxucmV0dXJuIHthdHRhY2tYLCBhdHRhY2tZfTtcblxufVxuXG5sZXQgaT0wO1xuLy8gZXhwb3J0IFxuZnVuY3Rpb24gZ2FtZVByb2Nlc3MoKSB7XG4gICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSAncGxheWVyMSc7XG5cbiAgICB3aGlsZSAoY3VycmVudFBsYXllciAhPSAoXCJDUFUgd2lucyFcIiB8fCBcIlBsYXllciAxIHdpbnMhXCIpKSB7XG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyID09PSAncGxheWVyMScpIHtcbiAgICAgICAgICAgIC8vIHBsYXllcnNMb2NhdGlvbiA9IHBsYXllckF0dGFja0xvY2F0aW9uKCk7XG4gICAgICAgICAgICAvLyBsZXQgeCA9IHBsYXllcnNMb2NhdGlvbi54O1xuICAgICAgICAgICAgLy8gbGV0IHkgPSBwbGF5ZXJzTG9jYXRpb24ueTtcbiAgICAgICAgICAgIGxldCB4ID0gMztcbiAgICAgICAgICAgIGxldCB5ID0gMjtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUdXJucyh4LHksY3VycmVudFBsYXllcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3VycmVudFBsYXllciA9PT0gJ2NwdScpIHtcbiAgICAgICAgICAgIGNvbnN0IENBTHJlc3VsdCA9IGNwdUF0dGFja0xvY2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCB4ID0gQ0FMcmVzdWx0LmF0dGFja1g7XG4gICAgICAgICAgICBjb25zdCB5ID0gQ0FMcmVzdWx0LmF0dGFja1k7XG4gICAgICAgICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyVHVybnMoeCx5LGN1cnJlbnRQbGF5ZXIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMTAwKSAge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgZG9lc24ndCBleGlzdFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8vQ3JlYXRlIGdyaWRzXG5leHBvcnQgZnVuY3Rpb24gYmF0dGxlc2hpcE1haW5HcmlkIChib2FyZHMsbmFtZSkge1xuY29uc3QgbmV3R3JpZFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xubmV3R3JpZFNlY3Rpb24uc2V0QXR0cmlidXRlKFwiaWRcIixuYW1lKTtcbm5ld0dyaWRTZWN0aW9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJib2FyZHNcIik7XG5wbGF5QXJlYS5hcHBlbmRDaGlsZChuZXdHcmlkU2VjdGlvbik7XG4gICAgZm9yIChsZXQgaT0wOyBpIDwgMTA7IGkrKyl7XG4gICAgICAgIGNvbnN0IG5ld0RpdnNSb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3RGl2c1Jvd3Muc2V0QXR0cmlidXRlKFwiaWRcIixcInJvd1wiK2kpO1xuICAgICAgICBuZXdEaXZzUm93cy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicm93c1wiKTtcbiAgICAgICAgY29uc29sZS5sb2cobmV3RGl2c1Jvd3MpO1xuICAgICAgICBjb25zdCBwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUFyZWFcIik7XG4gICAgICAgIG5ld0dyaWRTZWN0aW9uLmFwcGVuZENoaWxkKG5ld0RpdnNSb3dzKTtcbiAgICAgICAgZm9yIChsZXQgaj0wOyBqIDwgMTA7IGorKyl7XG4gICAgICAgICAgICBjb25zdCBuZXdEaXZzQ29sdW1ucyA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiaWRcIixib2FyZHNbal1baV0pO1xuICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcImNvbHVtbnNcIik7IFxuICAgICAgICAgICAgY29uc29sZS5sb2cobmV3RGl2c0NvbHVtbnMpO1xuICAgICAgICAgICAgbmV3RGl2c1Jvd3MuYXBwZW5kQ2hpbGQobmV3RGl2c0NvbHVtbnMpOyAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWQoKSB7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKHBsYXllcjEsXCJib2FyZDFcIik7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKGNwdSxcImJvYXJkMlwiKTtcbn1cblxuXG4vL2Fzc2lnbiBpZHMgZm9yIGVhY2ggZGl2IiwiZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHNpemUsIGhpdENvdW50KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuaGl0Q291bnQgPSBoaXRDb3VudDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxTdW5rICh0b3RhbFN1bmspIHtcbiAgICAgICAgaWYgKHRvdGFsU3VuayA9PT0gNCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N1bmsgKGxlbmd0aCwgaGl0Q291bnQpIHtcbiAgICBpZiAoaGl0Q291bnQgPT09IGxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBiYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWQgfSBmcm9tIFwiLi9wbGF5ZXJUdXJuc1wiO1xuXG5iYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=