//

import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
// slices
import usersReducer from "./slices/users";
import productsReducer from "./slices/products";
import attachmentsReducer from "./slices/attachments";
import profilesReducer from "./slices/profile";
import cartsReducer from "./slices/cart";
import checkoutReducer from "./slices/checkout";
import orderReducer from "./slices/orders";

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
  profile: profilesReducer,
  cart: cartsReducer,
  checkout: checkoutReducer,
  orders: orderReducer,
});

export { rootPersistConfig, rootReducer };
