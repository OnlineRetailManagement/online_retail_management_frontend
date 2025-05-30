//

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import usersReducer from "./slices/users";
import productsReducer from "./slices/users";

// ----------------------------------------

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
};

const rootReducer = combineReducers({
  users: usersReducer,
  products: productsReducer,
});

export { rootPersistConfig, rootReducer };
