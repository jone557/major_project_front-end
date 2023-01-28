
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../Features/Auth/authSlice'
import categoryReducer from './reducers/categoryReducer'
import componentReducer from './reducers/componentReducer'
import allUsersSlice from '../Features/AllUsers/allUsersSlice'
import dashboardSlice from "../Features/Dashboard/dashboardSlice";
import allComponentSlice from "../Features/AllComponents/allComponentSlice";

const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      allUsers: allUsersSlice,
      dashboard: dashboardSlice,
      category: categoryReducer,
      component: componentReducer,
      allComponents: allComponentSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }),
    devTools: true
})

export default store;