import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import componentReducer from "./categoryReducer";
export default combineReducers({
    category: categoryReducer,
    component: componentReducer
});