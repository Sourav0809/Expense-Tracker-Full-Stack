import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../reducers/expenseSlice";
import authSlice from "../reducers/authSlice";

const store = configureStore({
    reducer: {
        expenses: expenseSlice,
        auth: authSlice
    }
})

export default store
