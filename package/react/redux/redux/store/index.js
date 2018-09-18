import { createStore } from "redux";
import rootReducer from '../reducer/combine';

export default createStore(rootReducer);