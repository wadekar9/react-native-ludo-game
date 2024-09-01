const player1InitialState = [
    { id: 'A1', pos: 0, travelCount: 0 },
    { id: 'A2', pos: 0, travelCount: 0 },
    { id: 'A3', pos: 0, travelCount: 0 },
    { id: 'A4', pos: 0, travelCount: 0 },
]

const player2InitialState = [
    { id: 'B1', pos: 0, travelCount: 0 },
    { id: 'B2', pos: 0, travelCount: 0 },
    { id: 'B3', pos: 0, travelCount: 0 },
    { id: 'B4', pos: 0, travelCount: 0 },
]

const player3InitialState = [
    { id: 'C1', pos: 0, travelCount: 0 },
    { id: 'C2', pos: 0, travelCount: 0 },
    { id: 'C3', pos: 0, travelCount: 0 },
    { id: 'C4', pos: 0, travelCount: 0 },
]

const player4InitialState = [
    { id: 'D1', pos: 0, travelCount: 0 },
    { id: 'D2', pos: 0, travelCount: 0 },
    { id: 'D3', pos: 0, travelCount: 0 },
    { id: 'D4', pos: 0, travelCount: 0 },
]

export const initialState : INITIAL_STATE = {
    player1: player1InitialState,
    player2: player2InitialState,
    player3: player3InitialState,
    player4: player4InitialState,
    chancePlayer: 1,
    diceNo: 1,
    isDiceRolled: false,
    pileSelectionPlayer: -1,
    cellSelectionPlayer: -1,
    touchDiceBlock: false,
    currentPosition: [],
    fireworks: false,
    winner: null
}