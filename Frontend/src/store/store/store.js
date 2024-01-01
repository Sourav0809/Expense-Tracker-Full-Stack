import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../reducers/expenseSlice";

const store = configureStore({
    reducer: {
        expenses: expenseSlice
    }
})

export default store