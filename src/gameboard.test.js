const gameboard = require('./gameboard')

// placedShip1 = 
// attackedCoOrd =

test('Placing ships in specific co ordinates', () => {
    expect(placeShip(2, 3, 5, 'horizon').toMatch(placedShip1));
})

test('Counting the number of hits', () => {
    expect(receiveAttack(ship3, 4).toMatch(hitcount === 4));
})

test('Missed attacks', () => {
    expect(recordedAttacks(4).toMatch(attackedCoOrd))
})

test('All ships hit', () => {
    expect(shipsSunk(5).toMatch(true))
})
