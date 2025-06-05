//

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import usersReducer from "./slices/users";
import productsReducer from "./slices/products";
import attachmentsReducer from "./slices/attachments";

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
  attachments: attachmentsReducer,
});

export { rootPersistConfig, rootReducer };
