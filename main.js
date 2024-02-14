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

// let totalSunk = 0;

function receiveAttack(x,y, battleShipGrid, placedShipRecord){
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
            console.log("Total hit count" + totalCount);
            // totalSunk++;
            // console.log("total sunk: " + totalSunk);
            console.log("placed ship record" + placedShipRecord);
            if ((0,_ship__WEBPACK_IMPORTED_MODULE_0__.allSunk)(totalCount)) {
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
function playerTurns(x,y,player,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks) {
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

    
// export function battleshipMainGridGenerated() {
//     battleshipMainGrid(player1,"board1");
//     battleshipMainGrid(cpu,"board2");
// }

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

async function gameProcess(player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks) {
    let currentPlayer = 'player1';

    while (currentPlayer != ("CPU wins!" || 0)) {
        if (currentPlayer === 'player1') {
            const {x,y} = await player1Turn();
            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(x,y,currentPlayer,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks);
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

            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(cpux,cpuy,currentPlayer,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks);
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
    }, 10);
});


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ1Y7O0FBRWxDO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDJEQUFrQjtBQUN0QixJQUFJLDJEQUFrQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0NBQU07O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFXO0FBQ25CLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9ub2RlXG4vLyBjb25zdCB7IFNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJyk7XG4vLyBjb25zdCB7IGlzU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKTtcbi8vIGNvbnN0IHsgYWxsU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKVxuXG4vL2plc3RcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgaXNTdW5rIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGFsbFN1bmsgfSBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsIDUsIDApO1xuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwKTtcbmNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcChcImNydWlzZXJcIiwgMywgMCk7XG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCAzLCAwKTtcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIDIsIDApO1xuXG5jb25zdCBhbGxTaGlwcyA9IFtjYXJyaWVyLGJhdHRsZXNoaXAsY3J1aXNlcixzdWJtYXJpbmUsZGVzdHJveWVyXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGk9MDsgaSA8IDEwOyBpKyspe1xuICAgICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgICAgZm9yKGxldCBqPTA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgICAgIHJvdy5wdXNoKCdPJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ3JpZC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuXG4vL3ggaXMgdmVydGljYWwgYW5kIHkgaXMgaG9yaXpvbnRhbFxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwLCBkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKSB7XG4gICAgY29uc3Qgc2hpcEVuZFggPSB4ICsgc2hpcC5zaXplO1xuICAgIGNvbnN0IHNoaXBFbmRZID0geSArIHNoaXAuc2l6ZTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBiPXk7IGIgPCBzaGlwRW5kWTsgYisrKXtcbiAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR3JpZFtiXVt4XSA9IFwiQlwiO1xuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbnMucHVzaCh7IFg6IHgsIFk6IGIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcERldGFpbHM6IHsgbmFtZTogc2hpcC5uYW1lLCBsZW5ndGg6IHNoaXAuc2l6ZSwgaGl0Q291bnQ6IHNoaXAuaGl0Q291bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBzaGlwUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlU2hpcEdyaWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgYj14OyBiIDwgc2hpcEVuZFg7IGIrKyl7XG4gICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1bYl0gPSBcIkJcIjtcbiAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb25zLnB1c2goeyBYOiBiLCBZOiB5IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlZFNoaXBSZWNvcmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBEZXRhaWxzOiB7IG5hbWU6IHNoaXAubmFtZSwgbGVuZ3RoOiBzaGlwLnNpemUsIGhpdENvdW50OiBzaGlwLmhpdENvdW50IH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uczogc2hpcFBvc2l0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVNoaXBHcmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkludmFsaWQgZGlyZWN0aW9uXCI7XG4gICAgfVxufVxuXG4vLyBsZXQgdG90YWxTdW5rID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCx5LCBiYXR0bGVTaGlwR3JpZCwgcGxhY2VkU2hpcFJlY29yZCl7XG4gICAgY29uc3Qgc2hpcEhpdCA9IHBsYWNlZFNoaXBSZWNvcmQuZmluZChzaGlwID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0geCAmJiBwb3NpdGlvbi5ZID09PSB5KTt9KTtcbiAgICBcbiAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50Kys7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdIJztcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IHNoaXBIaXQuc2hpcERldGFpbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzU3VuayhjdXJyZW50TGVuZ3RoLGN1cnJlbnRDb3VudCxwbGFjZWRTaGlwUmVjb3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG90YWxDb3VudCA9IHBsYWNlZFNoaXBSZWNvcmQucmVkdWNlKCh0b3RhbCxjdXJyZW50U2hpcE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGN1cnJlbnRTaGlwT2JqZWN0LnNoaXBEZXRhaWxzLmhpdENvdW50O30sMCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRvdGFsIGhpdCBjb3VudFwiICsgdG90YWxDb3VudCk7XG4gICAgICAgICAgICAvLyB0b3RhbFN1bmsrKztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidG90YWwgc3VuazogXCIgKyB0b3RhbFN1bmspO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGFjZWQgc2hpcCByZWNvcmRcIiArIHBsYWNlZFNoaXBSZWNvcmQpO1xuICAgICAgICAgICAgaWYgKGFsbFN1bmsodG90YWxDb3VudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJBbGwgeW91ciBzaGlwcyBoYXZlIHN1bmshXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdXIgc2hpcCBoYXMgc3Vua1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiWW91J3ZlIGdvdCBhIGhpdCFcIlxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBiYXR0bGVTaGlwR3JpZFt5XVt4XT0nWCc7XG4gICAgICAgIHJldHVybiBcIllvdSd2ZSBtaXNzZWRcIjtcbiAgICAgICAgICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGFjaW5nU2hpcHMoYmF0dGxlU2hpcEdyaWQpIHtcbiAgICBjb25zdCBwbGFjZWRTaGlwUmVjb3JkID0gW107XG4gICAgbGV0IGxvb3BDb3VudGVyID0gMDtcblxuICAgIGZvciAobGV0IGk9MDsgaSA8IGFsbFNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gYWxsU2hpcHNbaV07XG4gICAgICAgIGNvbnN0IG1heFNoaXBQbGFjZW1lbnQgPSAxMCAtIGN1cnJlbnRTaGlwLnNpemU7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBcIlwiO1xuICAgICAgICBsZXQgZXhpc3RpbmdSZWNvcmQ7XG4gICAgICAgIGxldCBzaGlwQ291bnQ7XG4gICAgICAgIGxldCByYW5kUG9zaXRpb25zID0gW107XG4gICAgICAgXG4gICAgICAgIGxldCByYW5kb21ZO1xuICAgICAgICBsZXQgcmFuZG9tWDtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjb25zdCByYW5kRGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cbiAgICAgICAgICAgIGlmIChyYW5kRGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhTaGlwUGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY3VycmVudFNoaXAuc2l6ZTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc1kgPSByYW5kb21ZICsgajtcbiAgICAgICAgICAgICAgICAgICAgcmFuZFBvc2l0aW9ucy5wdXNoKHsgWDogcmFuZG9tWCwgWTogcG9zWSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2hpcFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGN1cnJlbnRTaGlwLnNpemU7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NYID0gcmFuZG9tWCArIGs7XG4gICAgICAgICAgICAgICAgICAgIHJhbmRQb3NpdGlvbnMucHVzaCh7IFg6IHBvc1gsIFk6IHJhbmRvbVkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdSZWNvcmQgPSByYW5kUG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4ge3JldHVybiBwbGFjZWRTaGlwUmVjb3JkLnNvbWUoc2hpcEFycmF5ID0+c2hpcEFycmF5LnBvc2l0aW9ucy5zb21lKHAgPT4gcC5YID09PSBwb3NpdGlvbi5YICYmIHAuWSA9PT0gcG9zaXRpb24uWSkpfSlcblxuICAgICAgICAgICAgICAgIHNoaXBDb3VudCA9IHJhbmRQb3NpdGlvbnMuZmxhdCgpLmZpbHRlcihjZWxsID0+IGNlbGwgPT09ICdCJykubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICAgICAgICAgICAgICBpZiAobG9vcENvdW50ZXIgPiA1MDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmZpbml0ZSBsb29wIGRldGVjdGVkLiBCcmVha2luZyBvdXQuXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9IHdoaWxlIChleGlzdGluZ1JlY29yZCAmJiAoc2hpcENvdW50ID0gMTcpKTtcblxuICAgICAgICBwbGFjZVNoaXAocmFuZG9tWCxyYW5kb21ZLGN1cnJlbnRTaGlwLGRpcmVjdGlvbiwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQpO1xuICAgIH1cbiAgICByZXR1cm4ge2JhdHRsZVNoaXBHcmlkLHBsYWNlZFNoaXBSZWNvcmR9O1xufVxuIiwiLy9ub2RlXG4vLyBjb25zdCB7IHBsYWNpbmdTaGlwcyB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyByZWNlaXZlQXR0YWNrIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IGNyZWF0ZUdyaWQgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgcGxhY2VTaGlwIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG5cbi8vamVzdFxuaW1wb3J0IHsgcGxhY2luZ1NoaXBzIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcmVjZWl2ZUF0dGFjayB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBwbGFjZVNoaXAgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbi8vQ3JlYXRlIGdyaWRzIGFuZCBwbGFjaW5nIHNoaXBzIFxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllcigpIHtcbiAgICBjb25zdCBwbGF5ZXIxR3JpZCA9IGNyZWF0ZUdyaWQoKTtcbiAgICBjb25zdCBjcHVHcmlkID0gY3JlYXRlR3JpZCgpO1xuXG4gICAgY29uc3QgcGxheWVyMSA9IHBsYWNpbmdTaGlwcyhwbGF5ZXIxR3JpZCk7XG4gICAgY29uc3QgY3B1ID0gcGxhY2luZ1NoaXBzKGNwdUdyaWQpO1xuXG4gICAgY29uc3QgcGxheWVyMUJvYXJkID0gcGxheWVyMS5iYXR0bGVTaGlwR3JpZDtcbiAgICBjb25zdCBjcHVCb2FyZCA9IGNwdS5iYXR0bGVTaGlwR3JpZDtcblxuICAgIGNvbnN0IHBsYXllcjFTaGlwcyA9IHBsYXllcjEucGxhY2VkU2hpcFJlY29yZDtcbiAgICBjb25zdCBjcHVTaGlwcyA9IGNwdS5wbGFjZWRTaGlwUmVjb3JkO1xuXG4gICAgcmV0dXJuIHtwbGF5ZXIxQm9hcmQsY3B1Qm9hcmQscGxheWVyMVNoaXBzLGNwdVNoaXBzfTtcbn1cblxuLy8gY29uc3QgcGxheWVycyA9IHBsYXllcigpO1xuXG4vLyBjb25zdCBwbGF5ZXIxID0gcGxheWVycy5wbGF5ZXIxQm9hcmQ7XG4vLyBjb25zdCBjcHUgPSBwbGF5ZXJzLmNwdUJvYXJkO1xuXG4vLyBjb25zdCBwbGF5ZXIxU2hpcFBsYWNlbWVudHMgPSBwbGF5ZXJzLnBsYXllcjFTaGlwcztcbi8vIGNvbnN0IGNwdVNoaXBQbGFjZW1lbnRzID0gcGxheWVycy5jcHVTaGlwcztcblxuLy8gY29uc3QgcGxheWVyMUF0dGFja3MgPSBbXTtcbi8vIGNvbnN0IGNwdUF0dGFja3MgPSBbXTtcblxuLy90aGUgcGxheWVyIHdvdWxkIHRha2UgYSB0dXJuLCBhbmQgaXQgd291bGQgZWl0aGVyIGhpdCBvciBtaXNzXG5leHBvcnQgZnVuY3Rpb24gdHVybih4LHkscGxheWVyQm9hcmQsc2hpcFBsYWNlbWVudHMsYXR0YWNrcykge1xuICAgIGNvbnN0IGV4aXN0aW5nSGl0ID0gYXR0YWNrcy5maW5kKGhpdHMgPT4gaGl0cy5YID09PSB4ICYmIGhpdHMuWSA9PT0geSk7XG5cbiAgICBpZiAoZXhpc3RpbmdIaXQpIHtcbiAgICAgICAgcmV0dXJuIFwiQWxyZWFkeSBzZWxlY3RlZFwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0YWNrcy5wdXNoKHtYOiB4LCBZOiB5fSk7XG4gICAgICAgIHJldHVybiByZWNlaXZlQXR0YWNrKHgseSxwbGF5ZXJCb2FyZCxzaGlwUGxhY2VtZW50cyk7XG4gICAgfVxufVxuXG4vL0ZvciBlYWNoIHBsYXllcnMgdHVybiBpdCByZXR1cm5zIHdoYXQgaGFwcGVuZWQgd2l0aCBtaXNzaW5nIG9yIGhpdHRpbmdcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJUdXJucyh4LHkscGxheWVyLHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKSB7XG4gICAgaWYgKHBsYXllciA9PT0gJ3BsYXllcjEnKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgMXMgdHVybiFcIik7XG4gICAgICAgIGxldCBjcHVSZXN1bHQgPSB0dXJuKHgseSxjcHUsY3B1U2hpcFBsYWNlbWVudHMsY3B1QXR0YWNrcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicDEgZW5lbXkgZ3JpZDogXCIgKyBjcHUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBMYXllciAxIG91dGNvbWU6IFwiICsgY3B1UmVzdWx0KTtcbiAgICAgICAgaWYgKGNwdVJlc3VsdCA9PT0gXCJBbGwgeW91ciBzaGlwcyBoYXZlIHN1bmshXCIpIHsgXG4gICAgICAgICAgICByZXR1cm4gXCJQbGF5ZXIgMSB3aW5zIVwiO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnY3B1JztcbiAgICB9XG4gICAgZWxzZSBpZiAocGxheWVyID09PSAnY3B1Jyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3B1cydzIHR1cm4hXCIpO1xuICAgICAgICBsZXQgcGxheWVyMVJlc3VsdCA9IHR1cm4oeCx5LHBsYXllcjEscGxheWVyMVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcHUgZW5lbXkgZ3JpZDogXCIgKyBwbGF5ZXIxKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcHUgb3V0Y29tZTogXCIgKyBwbGF5ZXIxUmVzdWx0KTtcbiAgICAgICAgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiKSB7IFxuICAgICAgICAgICAgcmV0dXJuIFwiQ1BVIHdpbnMhXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdwbGF5ZXIxJztcbiAgICB9XG59XG5cbi8vQ3JlYXRlIGdyaWRzXG5leHBvcnQgZnVuY3Rpb24gYmF0dGxlc2hpcE1haW5HcmlkIChib2FyZHMsbmFtZSkge1xuICAgIGNvbnN0IG5ld0dyaWRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBuZXdHcmlkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLG5hbWUpO1xuICAgIG5ld0dyaWRTZWN0aW9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJib2FyZHNcIik7XG4gICAgcGxheUFyZWEuYXBwZW5kQ2hpbGQobmV3R3JpZFNlY3Rpb24pO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCAxMDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RpdnNSb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImlkXCIsXCJyb3dcIitpKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJyb3dzXCIpO1xuICAgICAgICAgICAgLy8gY29uc3QgcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlBcmVhXCIpO1xuICAgICAgICAgICAgbmV3R3JpZFNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3RGl2c1Jvd3MpO1xuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqIDwgMTA7IGorKyl7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGl2c0NvbHVtbnMgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBuZXdEaXZzQ29sdW1ucy5zZXRBdHRyaWJ1dGUoXCJpZFwiLGJvYXJkc1tpXVtqXSk7XG4gICAgICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcImNvbHVtbnNcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2c1Jvd3MuYXBwZW5kQ2hpbGQobmV3RGl2c0NvbHVtbnMpOyAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuLy8gZXhwb3J0IGZ1bmN0aW9uIGJhdHRsZXNoaXBNYWluR3JpZEdlbmVyYXRlZCgpIHtcbi8vICAgICBiYXR0bGVzaGlwTWFpbkdyaWQocGxheWVyMSxcImJvYXJkMVwiKTtcbi8vICAgICBiYXR0bGVzaGlwTWFpbkdyaWQoY3B1LFwiYm9hcmQyXCIpO1xuLy8gfSIsIi8vIGNvbnN0IHsgcGxheWVyLHBsYXllclR1cm5zIH0gPSBhd2FpdCBpbXBvcnQoJy4vcGxheWVyLmpzJyk7XG5cbmltcG9ydCB7IHBsYXllclR1cm5zIH0gZnJvbSAnLi9wbGF5ZXIuanMnO1xuXG5jb25zdCBwbGF5ZXIxQXR0YWNrcyA9IFtdO1xuY29uc3QgY3B1QXR0YWNrcyA9IFtdO1xuXG5cbi8vIGV4cG9ydCBcbmZ1bmN0aW9uIGNwdUF0dGFja0xvY2F0aW9uKCkge1xuICAgIGxldCBzZXRQYWlycyA9IFtdO1xuICAgIGxldCBleGlzdGluZ1BhaXI7XG4gICAgbGV0IGF0dGFja1g7XG4gICAgbGV0IGF0dGFja1k7XG5cbiAgICBkbyB7XG4gICAgYXR0YWNrWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBhdHRhY2tYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuXG4gICAgZXhpc3RpbmdQYWlyID0gcGxheWVyMUF0dGFja3MuZmluZChwb3NpdGlvbiA9PiBwb3NpdGlvbi5YID09PSBhdHRhY2tYICYmIHBvc2l0aW9uLlkgPT09IGF0dGFja1kpOyAgICBcblxuICAgIGlmICghZXhpc3RpbmdQYWlyKSB7XG4gICAgICAgIHNldFBhaXJzLnB1c2goeyBYOiBhdHRhY2tYLCBZOiBhdHRhY2tZIH0pO1xuICAgIH1cblxufSB3aGlsZSAoZXhpc3RpbmdQYWlyKTtcblxucmV0dXJuIHthdHRhY2tYLCBhdHRhY2tZfTtcblxufVxuXG5mdW5jdGlvbiBwbGF5ZXIxVHVybigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQyXCIpO1xuICAgICAgICBjb25zdCByb3dzQXJyYXkgPSBjZWxscy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicm93c1wiKTtcblxuICAgICAgICBmb3IgKGxldCBpPTA7IGk8MTA7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFJvdyA9IHJvd3NBcnJheVtpXTtcbiAgICAgICAgICAgIGNvbnN0IGNvbHVtbnNBcnJheSA9IGN1cnJlbnRSb3cuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbHVtbnNcIik7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGo9MDsgajwxMDsgaisrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IGo7XG4gICAgICAgICAgICAgICAgY29uc3QgeSA9IGk7XG4gICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2pdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7eCwgeX0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uc0FycmF5W2pdLmlkID09PSBcIkJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2pdLmlkID0gXCJIMVwiO31cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHVtbnNBcnJheVtqXS5pZCA9PT0gXCJPXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbal0uaWQgPSBcIlgxXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHsgY29uc29sZS5sb2cgKFwiRXJyb3JcIil9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO31cblxubGV0IGk9MDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdhbWVQcm9jZXNzKHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKSB7XG4gICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSAncGxheWVyMSc7XG5cbiAgICB3aGlsZSAoY3VycmVudFBsYXllciAhPSAoXCJDUFUgd2lucyFcIiB8fCBcIlBsYXllciAxIHdpbnMhXCIpKSB7XG4gICAgICAgIGlmIChjdXJyZW50UGxheWVyID09PSAncGxheWVyMScpIHtcbiAgICAgICAgICAgIGNvbnN0IHt4LHl9ID0gYXdhaXQgcGxheWVyMVR1cm4oKTtcbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUdXJucyh4LHksY3VycmVudFBsYXllcixwbGF5ZXIxLGNwdSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMsY3B1U2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MsY3B1QXR0YWNrcyk7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChjdXJyZW50UGxheWVyID09PSAnY3B1Jykge1xuICAgICAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkMVwiKTtcbiAgICAgICAgICAgIGNvbnN0IHJvd3NBcnJheSA9IGNlbGxzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3dzXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBDQUxyZXN1bHQgPSBjcHVBdHRhY2tMb2NhdGlvbigpO1xuICAgICAgICAgICAgY29uc3QgY3B1eCA9IENBTHJlc3VsdC5hdHRhY2tYO1xuICAgICAgICAgICAgY29uc3QgY3B1eSA9IENBTHJlc3VsdC5hdHRhY2tZO1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Um93ID0gcm93c0FycmF5W2NwdXldO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uc0FycmF5ID0gY3VycmVudFJvdy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sdW1uc1wiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGNvbHVtbnNBcnJheVtjcHV4XS5pZCA9PT0gXCJCXCIpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbY3B1eF0uaWQgPSBcIkgxXCI7fVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbHVtbnNBcnJheVtjcHV4XS5pZCA9PT0gXCJPXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2NwdXhdLmlkID0gXCJYMVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgY29uc29sZS5sb2cgKFwiRXJyb3JcIil9O1xuXG4gICAgICAgICAgICBjdXJyZW50UGxheWVyID0gcGxheWVyVHVybnMoY3B1eCxjcHV5LGN1cnJlbnRQbGF5ZXIscGxheWVyMSxjcHUscGxheWVyMVNoaXBQbGFjZW1lbnRzLGNwdVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLGNwdUF0dGFja3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgZG9lc24ndCBleGlzdFwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9fX1cbiIsImV4cG9ydCBjbGFzcyBTaGlwIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBzaXplLCBoaXRDb3VudCkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmhpdENvdW50ID0gaGl0Q291bnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWxsU3VuayAodG90YWxTdW5rKSB7XG4gICAgICAgIGlmICh0b3RhbFN1bmsgPT09IDE3KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3VuayAobGVuZ3RoLCBoaXRDb3VudCkge1xuICAgIGlmIChoaXRDb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdhbWVQcm9jZXNzIH0gZnJvbSBcIi4vcGxheWVyVHVybnNcIjtcbmltcG9ydCB7YmF0dGxlc2hpcE1haW5HcmlkfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCB7IHBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuXG5jb25zdCBwbGF5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnV0dG9uXCIpO1xuY29uc3QgcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlBcmVhXCIpO1xuXG5mdW5jdGlvbiBiYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWQocGxheWVyMSxwbGF5ZXIyKSB7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKHBsYXllcjEsXCJib2FyZDFcIik7XG4gICAgYmF0dGxlc2hpcE1haW5HcmlkKHBsYXllcjIsXCJib2FyZDJcIik7XG59XG5cbnBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHBsYXlBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGxheWVycyA9IHBsYXllcigpO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXJzLnBsYXllcjFCb2FyZDtcbiAgICAgICAgY29uc3QgY3B1ID0gcGxheWVycy5jcHVCb2FyZDtcblxuICAgICAgICBjb25zdCBwbGF5ZXIxU2hpcFBsYWNlbWVudHMgPSBwbGF5ZXJzLnBsYXllcjFTaGlwcztcbiAgICAgICAgY29uc3QgY3B1U2hpcFBsYWNlbWVudHMgPSBwbGF5ZXJzLmNwdVNoaXBzO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG4gICAgICAgIGNvbnN0IGNwdUF0dGFja3MgPSBbXTtcbiAgICAgICAgYmF0dGxlc2hpcE1haW5HcmlkR2VuZXJhdGVkKHBsYXllcjEsY3B1KTtcbiAgICAgICAgZ2FtZVByb2Nlc3MocGxheWVyMSxjcHUscGxheWVyMVNoaXBQbGFjZW1lbnRzLGNwdVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLGNwdUF0dGFja3MpO1xuICAgIH0sIDEwKTtcbn0pO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=