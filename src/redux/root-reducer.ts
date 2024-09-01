import { combineReducers } from "redux";
import { gameReducer } from "./reducers/gameSlice";

const RootReducer = combineReducers({
    game : gameReducer
})

export default RootReducer;