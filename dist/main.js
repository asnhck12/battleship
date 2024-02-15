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
                if (loopCounter > 10000) {
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
const startButton = document.getElementById("playButton");


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
                else {};

            currentPlayer = (0,_player_js__WEBPACK_IMPORTED_MODULE_0__.playerTurns)(cpux,cpuy,currentPlayer,player1,cpu,player1ShipPlacements,cpuShipPlacements,player1Attacks,cpuAttacks);
        }
        else {
            startButton.style.display = "block";
            break;
        }
    
    
    }}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RWxDO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLDJEQUFrQjtBQUN0QixJQUFJLDJEQUFrQjtBQUN0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsK0NBQU07O0FBRTlCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlEQUFXO0FBQ25CO0FBQ0EsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllclR1cm5zLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL25vZGVcbi8vIGNvbnN0IHsgU2hpcCB9ID0gYXdhaXQgaW1wb3J0KCcuL3NoaXAuanMnKTtcbi8vIGNvbnN0IHsgaXNTdW5rIH0gPSBhd2FpdCBpbXBvcnQoJy4vc2hpcC5qcycpO1xuLy8gY29uc3QgeyBhbGxTdW5rIH0gPSBhd2FpdCBpbXBvcnQoJy4vc2hpcC5qcycpXG5cbi8vamVzdFxuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBpc1N1bmsgfSBmcm9tICcuL3NoaXAnO1xuaW1wb3J0IHsgYWxsU3VuayB9IGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IGNhcnJpZXIgPSBuZXcgU2hpcChcImNhcnJpZXJcIiwgNSwgMCk7XG5jb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXCJiYXR0bGVzaGlwXCIsIDQsIDApO1xuY29uc3QgY3J1aXNlciA9IG5ldyBTaGlwKFwiY3J1aXNlclwiLCAzLCAwKTtcbmNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFwic3VibWFyaW5lXCIsIDMsIDApO1xuY29uc3QgZGVzdHJveWVyID0gbmV3IFNoaXAoXCJkZXN0cm95ZXJcIiwgMiwgMCk7XG5cbmNvbnN0IGFsbFNoaXBzID0gW2Rlc3Ryb3llcixjcnVpc2VyLHN1Ym1hcmluZSxiYXR0bGVzaGlwLGNhcnJpZXJdO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgZm9yIChsZXQgaT0wOyBpIDwgMTA7IGkrKyl7XG4gICAgICAgIGNvbnN0IHJvdyA9IFtdO1xuICAgICAgICBmb3IobGV0IGo9MDsgaiA8IDEwOyBqKyspe1xuICAgICAgICAgICAgcm93LnB1c2goJ08nKTtcbiAgICAgICAgfVxuICAgICAgICBncmlkLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG59XG5cbi8veCBpcyB2ZXJ0aWNhbCBhbmQgeSBpcyBob3Jpem9udGFsXG5leHBvcnQgZnVuY3Rpb24gcGxhY2VTaGlwKHgsIHksIHNoaXAsIGRpcmVjdGlvbiwgYmF0dGxlU2hpcEdyaWQsIHBsYWNlZFNoaXBSZWNvcmQpIHtcbiAgICBjb25zdCBzaGlwRW5kWCA9IHggKyBzaGlwLnNpemU7XG4gICAgY29uc3Qgc2hpcEVuZFkgPSB5ICsgc2hpcC5zaXplO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICAgICAgICBjb25zdCBzaGlwUG9zaXRpb25zID0gW107XG5cbiAgICAgICAgICAgIGZvciAobGV0IGI9eTsgYiA8IHNoaXBFbmRZOyBiKyspe1xuICAgICAgICAgICAgICAgIGJhdHRsZVNoaXBHcmlkW2JdW3hdID0gXCJCXCI7XG4gICAgICAgICAgICAgICAgc2hpcFBvc2l0aW9ucy5wdXNoKHsgWDogeCwgWTogYiB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwbGFjZWRTaGlwUmVjb3JkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzaGlwRGV0YWlsczogeyBuYW1lOiBzaGlwLm5hbWUsIGxlbmd0aDogc2hpcC5zaXplLCBoaXRDb3VudDogc2hpcC5oaXRDb3VudCB9LFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbnM6IHNoaXBQb3NpdGlvbnNcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBiYXR0bGVTaGlwR3JpZDtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImhvcml6b250YWxcIikge1xuICAgICAgICAgICAgY29uc3Qgc2hpcFBvc2l0aW9ucyA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBiPXg7IGIgPCBzaGlwRW5kWDsgYisrKXtcbiAgICAgICAgICAgICAgICBiYXR0bGVTaGlwR3JpZFt5XVtiXSA9IFwiQlwiO1xuICAgICAgICAgICAgICAgIHNoaXBQb3NpdGlvbnMucHVzaCh7IFg6IGIsIFk6IHkgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGxhY2VkU2hpcFJlY29yZC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcERldGFpbHM6IHsgbmFtZTogc2hpcC5uYW1lLCBsZW5ndGg6IHNoaXAuc2l6ZSwgaGl0Q291bnQ6IHNoaXAuaGl0Q291bnQgfSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb25zOiBzaGlwUG9zaXRpb25zXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gYmF0dGxlU2hpcEdyaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBkaXJlY3Rpb25cIjtcbiAgICB9XG59XG5cbi8vIGxldCB0b3RhbFN1bmsgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayh4LHksIGJhdHRsZVNoaXBHcmlkLCBwbGFjZWRTaGlwUmVjb3JkKXtcbiAgICBjb25zdCBzaGlwSGl0ID0gcGxhY2VkU2hpcFJlY29yZC5maW5kKHNoaXAgPT4ge1xuICAgICAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMuc29tZShwb3NpdGlvbiA9PiBwb3NpdGlvbi5YID09PSB4ICYmIHBvc2l0aW9uLlkgPT09IHkpO30pO1xuICAgIFxuICAgIGlmIChzaGlwSGl0KSB7XG4gICAgICAgIHNoaXBIaXQuc2hpcERldGFpbHMuaGl0Q291bnQrKztcbiAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1beF09J0gnO1xuICAgICAgICBjb25zdCBjdXJyZW50TGVuZ3RoID0gc2hpcEhpdC5zaGlwRGV0YWlscy5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudCA9IHNoaXBIaXQuc2hpcERldGFpbHMuaGl0Q291bnQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoaXNTdW5rKGN1cnJlbnRMZW5ndGgsY3VycmVudENvdW50LHBsYWNlZFNoaXBSZWNvcmQpKSB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbENvdW50ID0gcGxhY2VkU2hpcFJlY29yZC5yZWR1Y2UoKHRvdGFsLGN1cnJlbnRTaGlwT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRvdGFsICsgY3VycmVudFNoaXBPYmplY3Quc2hpcERldGFpbHMuaGl0Q291bnQ7fSwwKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVG90YWwgaGl0IGNvdW50XCIgKyB0b3RhbENvdW50KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGxhY2VkIHNoaXAgcmVjb3JkXCIgKyBwbGFjZWRTaGlwUmVjb3JkKTtcbiAgICAgICAgICAgIGlmIChhbGxTdW5rKHRvdGFsQ291bnQpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiQWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJZb3VyIHNoaXAgaGFzIHN1bmtcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIllvdSd2ZSBnb3QgYSBoaXQhXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYmF0dGxlU2hpcEdyaWRbeV1beF09J1gnO1xuICAgICAgICByZXR1cm4gXCJZb3UndmUgbWlzc2VkXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxhY2luZ1NoaXBzKGJhdHRsZVNoaXBHcmlkKSB7XG4gICAgY29uc3QgcGxhY2VkU2hpcFJlY29yZCA9IFtdO1xuICAgIGxldCBsb29wQ291bnRlciA9IDA7XG5cbiAgICBmb3IgKGxldCBpPTA7IGkgPCBhbGxTaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2hpcCA9IGFsbFNoaXBzW2ldO1xuICAgICAgICBjb25zdCBtYXhTaGlwUGxhY2VtZW50ID0gMTAgLSBjdXJyZW50U2hpcC5zaXplO1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgbGV0IGV4aXN0aW5nUmVjb3JkO1xuICAgICAgICBsZXQgc2hpcENvdW50O1xuICAgICAgICBsZXQgcmFuZFBvc2l0aW9ucyA9IFtdO1xuICAgICAgIFxuICAgICAgICBsZXQgcmFuZG9tWTtcbiAgICAgICAgbGV0IHJhbmRvbVg7XG5cbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgY29uc3QgcmFuZERpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpO1xuXG4gICAgICAgICAgICBpZiAocmFuZERpcmVjdGlvbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcbiAgICAgICAgICAgICAgICByYW5kb21ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4U2hpcFBsYWNlbWVudCk7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGN1cnJlbnRTaGlwLnNpemU7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb3NZID0gcmFuZG9tWSArIGo7XG4gICAgICAgICAgICAgICAgICAgIHJhbmRQb3NpdGlvbnMucHVzaCh7IFg6IHJhbmRvbVgsIFk6IHBvc1kgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gXCJob3Jpem9udGFsXCI7XG4gICAgICAgICAgICAgICAgcmFuZG9tWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heFNoaXBQbGFjZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJhbmRvbVkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBjdXJyZW50U2hpcC5zaXplOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9zWCA9IHJhbmRvbVggKyBrO1xuICAgICAgICAgICAgICAgICAgICByYW5kUG9zaXRpb25zLnB1c2goeyBYOiBwb3NYLCBZOiByYW5kb21ZIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGV4aXN0aW5nUmVjb3JkID0gcmFuZFBvc2l0aW9ucy5zb21lKHBvc2l0aW9uID0+IHtyZXR1cm4gcGxhY2VkU2hpcFJlY29yZC5zb21lKHNoaXBBcnJheSA9PnNoaXBBcnJheS5wb3NpdGlvbnMuc29tZShwID0+IHAuWCA9PT0gcG9zaXRpb24uWCAmJiBwLlkgPT09IHBvc2l0aW9uLlkpKX0pXG5cbiAgICAgICAgICAgICAgICBzaGlwQ291bnQgPSByYW5kUG9zaXRpb25zLmZsYXQoKS5maWx0ZXIoY2VsbCA9PiBjZWxsID09PSAnQicpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIGxvb3BDb3VudGVyKys7XG4gICAgICAgICAgICAgICAgaWYgKGxvb3BDb3VudGVyID4gMTAwMDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkluZmluaXRlIGxvb3AgZGV0ZWN0ZWQuIEJyZWFraW5nIG91dC5cIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0gd2hpbGUgKGV4aXN0aW5nUmVjb3JkICYmIChzaGlwQ291bnQgPSAxNykpO1xuXG4gICAgICAgIHBsYWNlU2hpcChyYW5kb21YLHJhbmRvbVksY3VycmVudFNoaXAsZGlyZWN0aW9uLCBiYXR0bGVTaGlwR3JpZCwgcGxhY2VkU2hpcFJlY29yZCk7XG4gICAgfVxuICAgIHJldHVybiB7YmF0dGxlU2hpcEdyaWQscGxhY2VkU2hpcFJlY29yZH07XG59XG4iLCIvL25vZGVcbi8vIGNvbnN0IHsgcGxhY2luZ1NoaXBzIH0gPSBhd2FpdCBpbXBvcnQoJy4vZ2FtZWJvYXJkLmpzJyk7XG4vLyBjb25zdCB7IHJlY2VpdmVBdHRhY2sgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcbi8vIGNvbnN0IHsgY3JlYXRlR3JpZCB9ID0gYXdhaXQgaW1wb3J0KCcuL2dhbWVib2FyZC5qcycpO1xuLy8gY29uc3QgeyBwbGFjZVNoaXAgfSA9IGF3YWl0IGltcG9ydCgnLi9nYW1lYm9hcmQuanMnKTtcblxuLy9qZXN0XG5pbXBvcnQgeyBwbGFjaW5nU2hpcHMgfSBmcm9tICcuL2dhbWVib2FyZCc7XG5pbXBvcnQgeyByZWNlaXZlQXR0YWNrIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgY3JlYXRlR3JpZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IHBsYWNlU2hpcCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcblxuLy9DcmVhdGUgZ3JpZHMgYW5kIHBsYWNpbmcgc2hpcHMgXG5leHBvcnQgZnVuY3Rpb24gcGxheWVyKCkge1xuICAgIGNvbnN0IHBsYXllcjFHcmlkID0gY3JlYXRlR3JpZCgpO1xuICAgIGNvbnN0IGNwdUdyaWQgPSBjcmVhdGVHcmlkKCk7XG5cbiAgICBjb25zdCBwbGF5ZXIxID0gcGxhY2luZ1NoaXBzKHBsYXllcjFHcmlkKTtcbiAgICBjb25zdCBjcHUgPSBwbGFjaW5nU2hpcHMoY3B1R3JpZCk7XG5cbiAgICBjb25zdCBwbGF5ZXIxQm9hcmQgPSBwbGF5ZXIxLmJhdHRsZVNoaXBHcmlkO1xuICAgIGNvbnN0IGNwdUJvYXJkID0gY3B1LmJhdHRsZVNoaXBHcmlkO1xuXG4gICAgY29uc3QgcGxheWVyMVNoaXBzID0gcGxheWVyMS5wbGFjZWRTaGlwUmVjb3JkO1xuICAgIGNvbnN0IGNwdVNoaXBzID0gY3B1LnBsYWNlZFNoaXBSZWNvcmQ7XG5cbiAgICByZXR1cm4ge3BsYXllcjFCb2FyZCxjcHVCb2FyZCxwbGF5ZXIxU2hpcHMsY3B1U2hpcHN9O1xufVxuXG4vL3RoZSBwbGF5ZXIgd291bGQgdGFrZSBhIHR1cm4sIGFuZCBpdCB3b3VsZCBlaXRoZXIgaGl0IG9yIG1pc3NcbmV4cG9ydCBmdW5jdGlvbiB0dXJuKHgseSxwbGF5ZXJCb2FyZCxzaGlwUGxhY2VtZW50cyxhdHRhY2tzKSB7XG4gICAgY29uc3QgZXhpc3RpbmdIaXQgPSBhdHRhY2tzLmZpbmQoaGl0cyA9PiBoaXRzLlggPT09IHggJiYgaGl0cy5ZID09PSB5KTtcblxuICAgIGlmIChleGlzdGluZ0hpdCkge1xuICAgICAgICByZXR1cm4gXCJBbHJlYWR5IHNlbGVjdGVkXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRhY2tzLnB1c2goe1g6IHgsIFk6IHl9KTtcbiAgICAgICAgcmV0dXJuIHJlY2VpdmVBdHRhY2soeCx5LHBsYXllckJvYXJkLHNoaXBQbGFjZW1lbnRzKTtcbiAgICB9XG59XG5cbi8vRm9yIGVhY2ggcGxheWVycyB0dXJuIGl0IHJldHVybnMgd2hhdCBoYXBwZW5lZCB3aXRoIG1pc3Npbmcgb3IgaGl0dGluZ1xuZXhwb3J0IGZ1bmN0aW9uIHBsYXllclR1cm5zKHgseSxwbGF5ZXIscGxheWVyMSxjcHUscGxheWVyMVNoaXBQbGFjZW1lbnRzLGNwdVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLGNwdUF0dGFja3MpIHtcbiAgICBpZiAocGxheWVyID09PSAncGxheWVyMScpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciAxcyB0dXJuIVwiKTtcbiAgICAgICAgbGV0IGNwdVJlc3VsdCA9IHR1cm4oeCx5LGNwdSxjcHVTaGlwUGxhY2VtZW50cyxjcHVBdHRhY2tzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJwMSBlbmVteSBncmlkOiBcIiArIGNwdSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUExheWVyIDEgb3V0Y29tZTogXCIgKyBjcHVSZXN1bHQpO1xuICAgICAgICBpZiAoY3B1UmVzdWx0ID09PSBcIkFsbCB5b3VyIHNoaXBzIGhhdmUgc3VuayFcIikgeyBcbiAgICAgICAgICAgIHJldHVybiBcIlBsYXllciAxIHdpbnMhXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNwdVJlc3VsdCA9PT0gXCJBbHJlYWR5IHNlbGVjdGVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAocGxheWVyID09PSAnY3B1Jyl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3B1cydzIHR1cm4hXCIpO1xuICAgICAgICBsZXQgcGxheWVyMVJlc3VsdCA9IHR1cm4oeCx5LHBsYXllcjEscGxheWVyMVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcHUgZW5lbXkgZ3JpZDogXCIgKyBwbGF5ZXIxKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJjcHUgb3V0Y29tZTogXCIgKyBwbGF5ZXIxUmVzdWx0KTtcbiAgICAgICAgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxsIHlvdXIgc2hpcHMgaGF2ZSBzdW5rIVwiKSB7IFxuICAgICAgICAgICAgcmV0dXJuIFwiQ1BVIHdpbnMhXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYXllcjFSZXN1bHQgPT09IFwiQWxyZWFkeSBzZWxlY3RlZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NwdSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAncGxheWVyMSc7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vQ3JlYXRlIGdyaWRzXG5leHBvcnQgZnVuY3Rpb24gYmF0dGxlc2hpcE1haW5HcmlkIChib2FyZHMsbmFtZSkge1xuICAgIGNvbnN0IG5ld0dyaWRTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBuZXdHcmlkU2VjdGlvbi5zZXRBdHRyaWJ1dGUoXCJpZFwiLG5hbWUpO1xuICAgIG5ld0dyaWRTZWN0aW9uLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJib2FyZHNcIik7XG4gICAgcGxheUFyZWEuYXBwZW5kQ2hpbGQobmV3R3JpZFNlY3Rpb24pO1xuICAgICAgICBmb3IgKGxldCBpPTA7IGkgPCAxMDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RpdnNSb3dzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImlkXCIsXCJyb3dcIitpKTtcbiAgICAgICAgICAgIG5ld0RpdnNSb3dzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsXCJyb3dzXCIpO1xuICAgICAgICAgICAgLy8gY29uc3QgcGxheUFyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlBcmVhXCIpO1xuICAgICAgICAgICAgbmV3R3JpZFNlY3Rpb24uYXBwZW5kQ2hpbGQobmV3RGl2c1Jvd3MpO1xuICAgICAgICAgICAgZm9yIChsZXQgaj0wOyBqIDwgMTA7IGorKyl7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3RGl2c0NvbHVtbnMgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBuZXdEaXZzQ29sdW1ucy5zZXRBdHRyaWJ1dGUoXCJpZFwiLGJvYXJkc1tpXVtqXSk7XG4gICAgICAgICAgICAgICAgbmV3RGl2c0NvbHVtbnMuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixcImNvbHVtbnNcIik7XG4gICAgICAgICAgICAgICAgbmV3RGl2c1Jvd3MuYXBwZW5kQ2hpbGQobmV3RGl2c0NvbHVtbnMpOyAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0iLCIvLyBjb25zdCB7IHBsYXllcixwbGF5ZXJUdXJucyB9ID0gYXdhaXQgaW1wb3J0KCcuL3BsYXllci5qcycpO1xuXG5pbXBvcnQgeyBwbGF5ZXJUdXJucyB9IGZyb20gJy4vcGxheWVyLmpzJztcblxuY29uc3QgcGxheWVyMUF0dGFja3MgPSBbXTtcbmNvbnN0IGNwdUF0dGFja3MgPSBbXTtcblxuXG4vLyBleHBvcnQgXG5mdW5jdGlvbiBjcHVBdHRhY2tMb2NhdGlvbigpIHtcbiAgICBsZXQgc2V0UGFpcnMgPSBbXTtcbiAgICBsZXQgZXhpc3RpbmdQYWlyO1xuICAgIGxldCBhdHRhY2tYO1xuICAgIGxldCBhdHRhY2tZO1xuXG4gICAgZG8ge1xuICAgIGF0dGFja1kgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgYXR0YWNrWCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcblxuICAgIGV4aXN0aW5nUGFpciA9IHBsYXllcjFBdHRhY2tzLmZpbmQocG9zaXRpb24gPT4gcG9zaXRpb24uWCA9PT0gYXR0YWNrWCAmJiBwb3NpdGlvbi5ZID09PSBhdHRhY2tZKTsgICAgXG5cbiAgICBpZiAoIWV4aXN0aW5nUGFpcikge1xuICAgICAgICBzZXRQYWlycy5wdXNoKHsgWDogYXR0YWNrWCwgWTogYXR0YWNrWSB9KTtcbiAgICB9XG5cbn0gd2hpbGUgKGV4aXN0aW5nUGFpcik7XG5cbnJldHVybiB7YXR0YWNrWCwgYXR0YWNrWX07XG5cbn1cblxuZnVuY3Rpb24gcGxheWVyMVR1cm4oKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJvYXJkMlwiKTtcbiAgICAgICAgY29uc3Qgcm93c0FycmF5ID0gY2VsbHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJvd3NcIik7XG5cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpPDEwOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3cgPSByb3dzQXJyYXlbaV07XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zQXJyYXkgPSBjdXJyZW50Um93LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb2x1bW5zXCIpO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBqPTA7IGo8MTA7IGorKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHggPSBqO1xuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBpO1xuICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe3gsIHl9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbHVtbnNBcnJheVtqXS5pZCA9PT0gXCJCXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtqXS5pZCA9IFwiSDFcIjt9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2x1bW5zQXJyYXlbal0uaWQgPT09IFwiT1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uc0FycmF5W2pdLmlkID0gXCJYMVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7IGNvbnNvbGUubG9nIChcIkVycm9yXCIpfTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTt9XG5cbmxldCBpPTA7XG5jb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ1dHRvblwiKTtcblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2FtZVByb2Nlc3MocGxheWVyMSxjcHUscGxheWVyMVNoaXBQbGFjZW1lbnRzLGNwdVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLGNwdUF0dGFja3MpIHtcbiAgICBsZXQgY3VycmVudFBsYXllciA9ICdwbGF5ZXIxJztcblxuICAgIHdoaWxlIChjdXJyZW50UGxheWVyICE9IChcIkNQVSB3aW5zIVwiIHx8IFwiUGxheWVyIDEgd2lucyFcIikpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdwbGF5ZXIxJykge1xuICAgICAgICAgICAgY29uc3Qge3gseX0gPSBhd2FpdCBwbGF5ZXIxVHVybigpO1xuICAgICAgICAgICAgY3VycmVudFBsYXllciA9IHBsYXllclR1cm5zKHgseSxjdXJyZW50UGxheWVyLHBsYXllcjEsY3B1LHBsYXllcjFTaGlwUGxhY2VtZW50cyxjcHVTaGlwUGxhY2VtZW50cyxwbGF5ZXIxQXR0YWNrcyxjcHVBdHRhY2tzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRQbGF5ZXIgPT09ICdjcHUnKSB7XG4gICAgICAgICAgICBjb25zdCBjZWxscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYm9hcmQxXCIpO1xuICAgICAgICAgICAgY29uc3Qgcm93c0FycmF5ID0gY2VsbHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInJvd3NcIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IENBTHJlc3VsdCA9IGNwdUF0dGFja0xvY2F0aW9uKCk7XG4gICAgICAgICAgICBjb25zdCBjcHV4ID0gQ0FMcmVzdWx0LmF0dGFja1g7XG4gICAgICAgICAgICBjb25zdCBjcHV5ID0gQ0FMcmVzdWx0LmF0dGFja1k7XG5cbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRSb3cgPSByb3dzQXJyYXlbY3B1eV07XG4gICAgICAgICAgICBjb25zdCBjb2x1bW5zQXJyYXkgPSBjdXJyZW50Um93LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb2x1bW5zXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29sdW1uc0FycmF5W2NwdXhdLmlkID09PSBcIkJcIikge1xuICAgICAgICAgICAgICAgIGNvbHVtbnNBcnJheVtjcHV4XS5pZCA9IFwiSDFcIjt9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sdW1uc0FycmF5W2NwdXhdLmlkID09PSBcIk9cIikge1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zQXJyYXlbY3B1eF0uaWQgPSBcIlgxXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge307XG5cbiAgICAgICAgICAgIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUdXJucyhjcHV4LGNwdXksY3VycmVudFBsYXllcixwbGF5ZXIxLGNwdSxwbGF5ZXIxU2hpcFBsYWNlbWVudHMsY3B1U2hpcFBsYWNlbWVudHMscGxheWVyMUF0dGFja3MsY3B1QXR0YWNrcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICBcbiAgICBcbiAgICB9fVxuIiwiZXhwb3J0IGNsYXNzIFNoaXAge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHNpemUsIGhpdENvdW50KSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuaGl0Q291bnQgPSBoaXRDb3VudDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGxTdW5rICh0b3RhbFN1bmspIHtcbiAgICAgICAgaWYgKHRvdGFsU3VuayA9PT0gMTcpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaXNTdW5rIChsZW5ndGgsIGhpdENvdW50KSB7XG4gICAgaWYgKGhpdENvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2FtZVByb2Nlc3MgfSBmcm9tIFwiLi9wbGF5ZXJUdXJuc1wiO1xuaW1wb3J0IHtiYXR0bGVzaGlwTWFpbkdyaWR9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IHsgcGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5cbmNvbnN0IHBsYXlCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5jb25zdCBwbGF5QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUFyZWFcIik7XG5cbmZ1bmN0aW9uIGJhdHRsZXNoaXBNYWluR3JpZEdlbmVyYXRlZChwbGF5ZXIxLHBsYXllcjIpIHtcbiAgICBiYXR0bGVzaGlwTWFpbkdyaWQocGxheWVyMSxcImJvYXJkMVwiKTtcbiAgICBiYXR0bGVzaGlwTWFpbkdyaWQocGxheWVyMixcImJvYXJkMlwiKTtcbn1cblxuY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdXR0b25cIik7XG5cbnBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHBsYXlBcmVhLmlubmVySFRNTCA9IFwiXCI7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc3QgcGxheWVycyA9IHBsYXllcigpO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcjEgPSBwbGF5ZXJzLnBsYXllcjFCb2FyZDtcbiAgICAgICAgY29uc3QgY3B1ID0gcGxheWVycy5jcHVCb2FyZDtcblxuICAgICAgICBjb25zdCBwbGF5ZXIxU2hpcFBsYWNlbWVudHMgPSBwbGF5ZXJzLnBsYXllcjFTaGlwcztcbiAgICAgICAgY29uc3QgY3B1U2hpcFBsYWNlbWVudHMgPSBwbGF5ZXJzLmNwdVNoaXBzO1xuXG4gICAgICAgIGNvbnN0IHBsYXllcjFBdHRhY2tzID0gW107XG4gICAgICAgIGNvbnN0IGNwdUF0dGFja3MgPSBbXTtcbiAgICAgICAgYmF0dGxlc2hpcE1haW5HcmlkR2VuZXJhdGVkKHBsYXllcjEsY3B1KTtcbiAgICAgICAgZ2FtZVByb2Nlc3MocGxheWVyMSxjcHUscGxheWVyMVNoaXBQbGFjZW1lbnRzLGNwdVNoaXBQbGFjZW1lbnRzLHBsYXllcjFBdHRhY2tzLGNwdUF0dGFja3MpO1xuICAgICAgICBzdGFydEJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfSwgMSk7XG59KTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9