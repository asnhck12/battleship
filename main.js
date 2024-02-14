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
        if (cpuResult === "Already selected") {
            return 'player1';
        }
        else {
            return 'cpu';
        }
    }
    else if (player === 'cpu'){
        console.log("cpus's turn!");
        let player1Result = turn(x,y,player1,player1ShipPlacements,player1Attacks);
        console.log("cpu enemy grid: " + player1);
        console.log("cpu outcome: " + player1Result);
        if (player1Result === "All your ships have sunk!") { 
            return "CPU wins!";
        }
        if (player1Result === "Already selected") {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDJEQUFrQjtBQUN0QixJQUFJLDJEQUFrQjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0NBQU07O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFXO0FBQ25CLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJUdXJucy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9ub2RlXG4vLyBjb25zdCB7IFNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9zaGlwLmpzJyk7XG4vLyBjb25zdCB7IGlzU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKTtcbi8vIGNvbnN0IHsgYWxsU3VuayB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKVxuXG4vL2plc3RcbmltcG9ydCB7IFNoaXAgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgaXNTdW5rIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IGFsbFN1bmsgfSBmcm9tICcuL3NoaXAnO1xuXG5jb25zdCBjYXJyaWVyID0gbmV3IFNoaXAoXCJjYXJyaWVyXCIsIDUsIDApO1xuY29uc3QgYmF0dGxlc2hpcCA9IG5ldyBTaGlwKFwiYmF0dGxlc2hpcFwiLCA0LCAwKTtcbmNvbnN0IGNydWlzZXIgPSBuZXcgU2hpcChcImNydWlzZXJcIiwgMywgMCk7XG5jb25zdCBzdWJtYXJpbmUgPSBuZXcgU2hpcChcInN1Ym1hcmluZVwiLCAzLCAwKTtcbmNvbnN0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFwiZGVzdHJveWVyXCIsIDIsIDApO1xuXG5jb25zdCBhbGxTaGlwcyA9IFtjYXJyaWVyLGJhdHRsZXNoaXAsY3J1aXNlcixzdWJtYXJpbmUsZGVzdHJveWVyXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGk9MDsgaSA8IDEwOyBpKyspe1xuICAgICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgICAgZm9yKGxldCBqPTA7IGogPCAxMDsgaisrKXtcbiAgICAgICAgICAgIHJvdy5wdXNoKCdPJyk7XG4gICAgICAgIH1cbiAgICAgICAgZ3JpZC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufVxuXG4vL3ggaXMgdmVydGljYWwgYW5kIHkgaXMgaG9yaXpvbnRhbFxuZXhwb3J0IGZ1bmN0aW9uIHBsYWNlU2hpcCh4LCB5LCBzaGlwLCBkaXJlY3Rpb24sIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKSB7XG4gICAgY29uc3Qgc2hpcEVuZFggPSB4ICsgc2hpcC5zaXplO1xuICAgIGNvbnN0IHNoaXBFbmRZID0geSArIHNoaXAuc2l6ZTtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgICAgICAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBiPXk7IGIgPCBzaGlwRW5kWTsgYisrKXtcbiAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR3JpZFtiXVt4XSA9IFwiQlwiO1xuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbnMucHVzaCh7IFg6IHgsIFk6IGIgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcERldGFpbHM6IHsgbmFtZTogc2hpcC5uYW1lLCBsZW5ndGg6IHNoaXAuc2l6ZSwgaGl0Q291bnQ6IHNoaXAuaGl0Q291bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBzaGlwUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlU2hpcEdyaWQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJob3Jpem9udGFsXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgYj14OyBiIDwgc2hpcEVuZFg7IGIrKyl7XG4gICAgICAgICAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1bYl0gPSBcIkJcIjtcbiAgICAgICAgICAgICAgICBzaGlwUG9zaXRpb25zLnB1c2goeyBYOiBiLCBZOiB5IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsYWNlZFNoaXBSZWNvcmQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBEZXRhaWxzOiB7IG5hbWU6IHNoaXAubmFtZSwgbGVuZ3RoOiBzaGlwLnNpemUsIGhpdENvdW50OiBzaGlwLmhpdENvdW50IH0sXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uczogc2hpcFBvc2l0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGJhdHRsZVNoaXBHcmlkO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcIkludmFsaWQgZGlyZWN0aW9uXCI7XG4gICAgfVxufVxuXG4vLyBsZXQgdG90YWxTdW5rID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2soeCx5LCBiYXR0bGVTaGlwR3JpZCwgcGxhY2VkU2hpcFJlY29yZCl7XG4gICAgY29uc3Qgc2hpcEhpdCA9IHBsYWNlZFNoaXBSZWNvcmQuZmluZChzaGlwID0+IHtcbiAgICAgICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0geCAmJiBwb3NpdGlvbi5ZID09PSB5KTt9KTtcbiAgICBcbiAgICBpZiAoc2hpcEhpdCkge1xuICAgICAgICBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50Kys7XG4gICAgICAgIGJhdHRsZVNoaXBHcmlkW3ldW3hdPSdIJztcbiAgICAgICAgY29uc3QgY3VycmVudExlbmd0aCA9IHNoaXBIaXQuc2hpcERldGFpbHMubGVuZ3RoO1xuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBzaGlwSGl0LnNoaXBEZXRhaWxzLmhpdENvdW50O1xuICAgICAgICBcbiAgICAgICAgaWYgKGlzU3VuayhjdXJyZW50TGVuZ3RoLGN1cnJlbnRDb3VudCxwbGFjZWRTaGlwUmVjb3JkKSkge1xuICAgICAgICAgICAgY29uc3QgdG90YWxDb3VudCA9IHBsYWNlZFNoaXBSZWNvcmQucmVkdWNlKCh0b3RhbCxjdXJyZW50U2hpcE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0b3RhbCArIGN1cnJlbnRTaGlwT2JqZWN0LnNoaXBEZXRhaWxzLmhpdENvdW50O30sMCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlRvdGFsIGhpdCBjb3VudFwiICsgdG90YWxDb3VudCk7XG4gICAgICAgICAgICAvLyB0b3RhbFN1bmsrKztcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwidG90YWwgc3VuazogXCIgKyB0b3RhbFN1bmspO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJwbGFjZWQgc2hpcCByZWNvcmRcIiArIHBsYWNlZFNoaXBSZWNvcmQpO1xuICAgICAgICAgICAgaWYgKGFsbFN1bmsodG90YWxDb3VudCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJBbGwgeW91ciBzaGlwcyBoYXZlIHN1bmshXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdXIgc2hpcCBoYXMgc3Vua1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiWW91J3ZlIGdvdCBhIGhpdCFcIlxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBiYXR0bGVTaGlwR3JpZFt5XVt4XT0nWCc7XG4gICAgICAgIHJldHVybiBcIllvdSd2ZSBtaXNzZWRcIjtcbiAgICAgICAgICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGFjaW5nU2hpcHMoYmF0dGxlU2hpcEdyaWQpIHtcbiAgICBjb25zdCBwbGFjZWRTaGlwUmVjb3JkID0gW107XG4gICAgbGV0IGxvb3BDb3VudGVyID0gMDtcblxuICAgIGZvciAobGV0IGk9MDsgaSA8IGFsbFNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTaGlwID0gYWxsU2hpcHNbaV07XG4gICAgICAgIGNvbnN0IG1heFNoaXBQbGFjZW1lbnQgPSAxMCAtIGN1cnJlbnRTaGlwLnNpemU7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSBcIlwiO1xuICAgICAgICBsZXQgZXhpc3RpbmdSZWNvcmQ7XG4gICAgICAgIGxldCBzaGlwQ291bnQ7XG4gICAgICAgIGxldCByYW5kUG9zaXRpb25zID0gW107XG4gICAgICAgXG4gICAgICAgIGxldCByYW5kb21ZO1xuICAgICAgICBsZXQgcmFuZG9tWDtcblxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBjb25zdCByYW5kRGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7XG5cbiAgICAgICAgICAgIGlmIChyYW5kRGlyZWN0aW9uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhTaGlwUGxhY2VtZW50KTtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgY3VycmVudFNoaXAuc2l6ZTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvc1kgPSByYW5kb21ZICsgajtcbiAgICAgICAgICAgICAgICAgICAgcmFuZFBvc2l0aW9ucy5wdXNoKHsgWDogcmFuZG9tWCwgWTogcG9zWSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcbiAgICAgICAgICAgICAgICByYW5kb21YID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2hpcFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGN1cnJlbnRTaGlwLnNpemU7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NYID0gcmFuZG9tWCArIGs7XG4gICAgICAgICAgICAgICAgICAgIHJhbmRQb3NpdGlvbnMucHVzaCh7IFg6IHBvc1gsIFk6IHJhbmRvbVkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZXhpc3RpbmdSZWNvcmQgPSByYW5kUG9zaXRpb25zLnNvbWUocG9zaXRpb24gPT4ge3JldHVybiBwbGFjZWRTaGlwUmVjb3JkLnNvbWUoc2hpcEFycmF5ID0+c2hpcEFycmF5LnBvc2l0aW9ucy5zb21lKHAgPT4gcC5YID09PSBwb3NpdGlvbi5YICYmIHAuWSA9PT0gcG9zaXRpb24uWSkpfSlcblxuICAgICAgICAgICAgICAgIHNoaXBDb3VudCA9IHJhbmRQb3NpdGlvbnMuZmxhdCgpLmZpbHRlcihjZWxsID0+IGNlbGwgPT09ICdCJykubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgbG9vcENvdW50ZXIrKztcbiAgICAgICAgICAgICAgICBpZiAobG9vcENvdW50ZXIgPiA1MDAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmZpbml0ZSBsb29wIGRldGVjdGVkLiBCcmVha2luZyBvdXQuXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9IHdoaWxlIChleGlzdGluZ1JlY29yZCAmJiAoc2hpcENvdW50ID0gMTcpKTtcblxuICAgICAgICBwbGFjZVNoaXAocmFuZG9tWCxyYW5kb21ZLGN1cnJlbnRTaGlwLGRpcmVjdGlvbiwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQpO1xuICAgIH1cbiAgICByZXR1cm4ge2JhdHRsZVNoaXBHcmlkLHBsYWNlZFNoaXBSZWNvcmR9O1xufVxuIiwiLy9ub2RlXG4vLyBjb25zdCB7IHBsYWNpbmdTaGlwcyB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyByZWNlaXZlQXR0YWNrIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IGNyZWF0ZUdyaWQgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgcGxhY2VTaGlwIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG5cbi8vamVzdFxuaW1wb3J0IHsgcGxhY2luZ1NoaXBzIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgcmVjZWl2ZUF0dGFjayB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IGNyZWF0ZUdyaWQgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyBwbGFjZVNoaXAgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5cbi8vQ3JlYXRlIGdyaWRzIGFuZCBwbGFjaW5nIHNoaXBzIFxuZXhwb3J0IGZ1bmN0aW9uIHBsYXllcigpIHtcbiAgICBjb25zdCBwbGF5ZXIxR3JpZCA9IGNyZWF0ZUdyaWQoKTtcbiAgICBjb25zdCBjcHVHcmlkID0gY3JlYXRlR3JpZCgpO1xuXG4gICAgY29uc3QgcGxheWVyMSA9IHBsYWNpbmdTaGlwcyhwbGF5ZXIxR3JpZCk7XG4gICAgY29uc3QgY3B1ID0gcGxhY2luZ1NoaXBzKGNwdUdyaWQpO1xuXG4gICAgY29uc3QgcGxheWVyMUJvYXJkID0gcGxheWVyMS5iYXR0bGVTaGlwR3JpZDtcbiAgICBjb25zdCBjcHVCb2FyZCA9IGNwdS5iYXR0bGVTaGlwR3JpZDtcblxuICAgIGNvbnN0IHBsYXllcjFTaGlwcyA9IHBsYXllcjEucGxhY2VkU2hpcFJlY29yZDtcbiAgICBjb25zdCBjcHVTaGlwcyA9IGNwdS5wbGFjZWRTaGlwUmVjb3JkO1xuXG4gICAgcmV0dXJuIHtwbGF5ZXIxQm9hcmQsY3B1Qm9hcmQscGxheWVyMVNoaXBzLGNwdVNoaXBzfTtcbn1cblxuLy90aGUgcGxheWVyIHdvdWxkIHRha2UgYSB0dXJuLCBhbmQgaXQgd291bGQgZWl0aGVyIGhpdCBvciBtaXNzXG5leHBvcnQgZnVuY3Rpb24gdHVybih4LHkscGxheWVyQm9hcmQsc2hpcFBsYWNlbWVudHMsYXR0YWNrcykge1xuICAgIGNvbnN0IGV4aXN0aW5nSGl0ID0gYXR0YWNrcy5maW5kKGhpdHMgPT4gaGl0cy5YID09PSB4ICYmIGhpdHMuWSA9PT0geSk7XG5cbiAgICBpZiAoZXhpc3RpbmdIaXQpIHtcbiAgICAgICAgcmV0dXJuIFwiQWxyZWFkeSBzZWxlY3RlZFwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0YWNrcy5wdXNoKHtYOiB4LCBZOiB5fSk7XG4gICAgICAgIHJldHVybiByZWNlaXZlQXR0YWNrKHgseSxwbGF5ZXJCb2FyZCxzaGlwUGxhY2VtZW50cyk7XG4gICAgfVxufVxuXG4vL0ZvciBlYWNoIHBsYXllcnMgdHVybiBpdCByZXR1cm5zIHdoYXQgaGFwcGVuZWQgd2l0aCBtaXNzaW5nIG9yIGhpdHRpbmdcbmV4cG9ydCBmdW5jdGlvbiBwbGF5ZXJUdXJucyh4LHkscGxheWVyLHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKSB7XG4gICAgaWYgKHBsYXllciA9PT0gJ3BsYXllcjEnKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgMXMgdHVybiFcIik7XG4gICAgICAgIGxldCBjcHVSZXN1bHQgPSB0dXJuKHgseSxjcHUsY3B1U2hpcFBsYWNlbWVudHMsY3B1QXR0YWNrcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicDEgZW5lbXkgZ3JpZDogXCIgKyBjcHUpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBMYXllciAxIG91dGNvbWU6IFwiICsgY3B1UmVzdWx0KTtcbiAgICAgICAgaWYgKGNwdVJlc3VsdCA9PT0gXCJBbGwgeW91ciBzaGlwcyBoYXZlIHN1bmshXCIpIHsgXG4gICAgICAgICAgICByZXR1cm4gXCJQbGF5ZXIgMSB3aW5zIVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjcHVSZXN1bHQgPT09IFwiQWxyZWFkeSBzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3BsYXllcjEnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdjcHUnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHBsYXllciA9PT0gJ2NwdScpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImNwdXMncyB0dXJuIVwiKTtcbiAgICAgICAgbGV0IHBsYXllcjFSZXN1bHQgPSB0dXJuKHgseSxwbGF5ZXIxLHBsYXllcjFTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3B1IGVuZW15IGdyaWQ6IFwiICsgcGxheWVyMSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3B1IG91dGNvbWU6IFwiICsgcGxheWVyMVJlc3VsdCk7XG4gICAgICAgIGlmIChwbGF5ZXIxUmVzdWx0ID09PSBcIkFsbCB5b3VyIHNoaXBzIGhhdmUgc3VuayFcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIkNQVSB3aW5zIVwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwbGF5ZXIxUmVzdWx0ID09PSBcIkFscmVhZHkgc2VsZWN0ZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuICdjcHUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gJ3BsYXllcjEnO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vL0NyZWF0ZSBncmlkc1xuZXhwb3J0IGZ1bmN0aW9uIGJhdHRsZXNoaXBNYWluR3JpZCAoYm9hcmRzLG5hbWUpIHtcbiAgICBjb25zdCBuZXdHcmlkU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbmV3R3JpZFNlY3Rpb24uc2V0QXR0cmlidXRlKFwiaWRcIixuYW1lKTtcbiAgICBuZXdHcmlkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwiYm9hcmRzXCIpO1xuICAgIHBsYXlBcmVhLmFwcGVuZENoaWxkKG5ld0dyaWRTZWN0aW9uKTtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgMTA7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBuZXdEaXZzUm93cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBuZXdEaXZzUm93cy5zZXRBdHRyaWJ1dGUoXCJpZFwiLFwicm93XCIraSk7XG4gICAgICAgICAgICBuZXdEaXZzUm93cy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLFwicm93c1wiKTtcbiAgICAgICAgICAgIC8vIGNvbnN0IHBsYXlBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QXJlYVwiKTtcbiAgICAgICAgICAgIG5ld0dyaWRTZWN0aW9uLmFwcGVuZENoaWxkKG5ld0RpdnNSb3dzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGo9MDsgaiA8IDEwOyBqKyspe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0RpdnNDb2x1bW5zID0gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiaWRcIixib2FyZHNbaV1bal0pO1xuICAgICAgICAgICAgICAgIG5ld0RpdnNDb2x1bW5zLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJjb2x1bW5zXCIpO1xuICAgICAgICAgICAgICAgIG5ld0RpdnNSb3dzLmFwcGVuZENoaWxkKG5ld0RpdnNDb2x1bW5zKTsgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IiwiLy8gY29uc3QgeyBwbGF5ZXIscGxheWVyVHVybnMgfSA9IGF3YWl0IGltcG9ydCgnLi9wbGF5ZXIuanMnKTtcblxuaW1wb3J0IHsgcGxheWVyVHVybnMgfSBmcm9tICcuL3BsYXllci5qcyc7XG5cbmNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG5jb25zdCBjcHVBdHRhY2tzID0gW107XG5cblxuLy8gZXhwb3J0IFxuZnVuY3Rpb24gY3B1QXR0YWNrTG9jYXRpb24oKSB7XG4gICAgbGV0IHNldFBhaXJzID0gW107XG4gICAgbGV0IGV4aXN0aW5nUGFpcjtcbiAgICBsZXQgYXR0YWNrWDtcbiAgICBsZXQgYXR0YWNrWTtcblxuICAgIGRvIHtcbiAgICBhdHRhY2tZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIGF0dGFja1ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG5cbiAgICBleGlzdGluZ1BhaXIgPSBwbGF5ZXIxQXR0YWNrcy5maW5kKHBvc2l0aW9uID0+IHBvc2l0aW9uLlggPT09IGF0dGFja1ggJiYgcG9zaXRpb24uWSA9PT0gYXR0YWNrWSk7ICAgIFxuXG4gICAgaWYgKCFleGlzdGluZ1BhaXIpIHtcbiAgICAgICAgc2V0UGFpcnMucHVzaCh7IFg6IGF0dGFja1gsIFk6IGF0dGFja1kgfSk7XG4gICAgfVxuXG59IHdoaWxlIChleGlzdGluZ1BhaXIpO1xuXG5yZXR1cm4ge2F0dGFja1gsIGF0dGFja1l9O1xuXG59XG5cbmZ1bmN0aW9uIHBsYXllcjFUdXJuKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJib2FyZDJcIik7XG4gICAgICAgIGNvbnN0IHJvd3NBcnJheSA9IGNlbGxzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3dzXCIpO1xuXG4gICAgICAgIGZvciAobGV0IGk9MDsgaTwxMDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Um93ID0gcm93c0FycmF5W2ldO1xuICAgICAgICAgICAgY29uc3QgY29sdW1uc0FycmF5ID0gY3VycmVudFJvdy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29sdW1uc1wiKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqPDEwOyBqKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gajtcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gaTtcbiAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbal0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHt4LCB5fSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW5zQXJyYXlbal0uaWQgPT09IFwiQlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbal0uaWQgPSBcIkgxXCI7fVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sdW1uc0FycmF5W2pdLmlkID09PSBcIk9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5pZCA9IFwiWDFcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgeyBjb25zb2xlLmxvZyAoXCJFcnJvclwiKX07XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7fVxuXG5sZXQgaT0wO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2FtZVByb2Nlc3MocGxheWVyMSxjcHUscGxheWVyMVNoaXBQbGFjZW1lbnRzLGNwdVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLGNwdUF0dGFja3MpIHtcbiAgICBsZXQgY3VycmVudFBsYXllciA9ICdwbGF5ZXIxJztcblxuICAgIHdoaWxlIChjdXJyZW50UGxheWVyICE9IChcIkNQVSB3aW5zIVwiIHx8IFwiUGxheWVyIDEgd2lucyFcIikpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdwbGF5ZXIxJykge1xuICAgICAgICAgICAgY29uc3Qge3gseX0gPSBhd2FpdCBwbGF5ZXIxVHVybigpO1xuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR1cm5zKHgseSxjdXJyZW50UGxheWVyLHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdjcHUnKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQxXCIpO1xuICAgICAgICAgICAgY29uc3Qgcm93c0FycmF5ID0gY2VsbHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJvd3NcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IENBTHJlc3VsdCA9IGNwdUF0dGFja0xvY2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBjcHV4ID0gQ0FMcmVzdWx0LmF0dGFja1g7XG4gICAgICAgICAgICBjb25zdCBjcHV5ID0gQ0FMcmVzdWx0LmF0dGFja1k7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3cgPSByb3dzQXJyYXlbY3B1eV07XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zQXJyYXkgPSBjdXJyZW50Um93LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb2x1bW5zXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29sdW1uc0FycmF5W2NwdXhdLmlkID09PSBcIkJcIikge1xuICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtjcHV4XS5pZCA9IFwiSDFcIjt9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sdW1uc0FycmF5W2NwdXhdLmlkID09PSBcIk9cIikge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbY3B1eF0uaWQgPSBcIlgxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyBjb25zb2xlLmxvZyAoXCJFcnJvclwiKX07XG5cbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUdXJucyhjcHV4LGNwdXksY3VycmVudFBsYXllcixwbGF5ZXIxLGNwdSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMsY3B1U2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MsY3B1QXR0YWNrcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciBkb2Vzbid0IGV4aXN0XCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH19fVxuIiwiZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHNpemUsIGhpdENvdW50KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuaGl0Q291bnQgPSBoaXRDb3VudDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxTdW5rICh0b3RhbFN1bmspIHtcbiAgICAgICAgaWYgKHRvdGFsU3VuayA9PT0gMTcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdW5rIChsZW5ndGgsIGhpdENvdW50KSB7XG4gICAgaWYgKGhpdENvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZVByb2Nlc3MgfSBmcm9tIFwiLi9wbGF5ZXJUdXJuc1wiO1xuaW1wb3J0IHtiYXR0bGVzaGlwTWFpbkdyaWR9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IHBsYXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5jb25zdCBwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUFyZWFcIik7XG5cbmZ1bmN0aW9uIGJhdHRsZXNoaXBNYWluR3JpZEdlbmVyYXRlZChwbGF5ZXIxLHBsYXllcjIpIHtcbiAgICBiYXR0bGVzaGlwTWFpbkdyaWQocGxheWVyMSxcImJvYXJkMVwiKTtcbiAgICBiYXR0bGVzaGlwTWFpbkdyaWQocGxheWVyMixcImJvYXJkMlwiKTtcbn1cblxucGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgcGxheUFyZWEuaW5uZXJIVE1MID0gXCJcIjtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zdCBwbGF5ZXJzID0gcGxheWVyKCk7XG5cbiAgICAgICAgY29uc3QgcGxheWVyMSA9IHBsYXllcnMucGxheWVyMUJvYXJkO1xuICAgICAgICBjb25zdCBjcHUgPSBwbGF5ZXJzLmNwdUJvYXJkO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcjFTaGlwUGxhY2VtZW50cyA9IHBsYXllcnMucGxheWVyMVNoaXBzO1xuICAgICAgICBjb25zdCBjcHVTaGlwUGxhY2VtZW50cyA9IHBsYXllcnMuY3B1U2hpcHM7XG5cbiAgICAgICAgY29uc3QgcGxheWVyMUF0dGFja3MgPSBbXTtcbiAgICAgICAgY29uc3QgY3B1QXR0YWNrcyA9IFtdO1xuICAgICAgICBiYXR0bGVzaGlwTWFpbkdyaWRHZW5lcmF0ZWQocGxheWVyMSxjcHUpO1xuICAgICAgICBnYW1lUHJvY2VzcyhwbGF5ZXIxLGNwdSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMsY3B1U2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MsY3B1QXR0YWNrcyk7XG4gICAgfSwgMTApO1xufSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==