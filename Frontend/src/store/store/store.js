import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "../reducers/expenseSlice";
import authSlice from "../reducers/authSlice";
import buyPremiumSlice from "../reducers/buyPremiumSlice";

const store = configureStore({
    reducer: {
        expenses: expenseSlice,
        auth: authSlice,
        premiumUser: buyPremiumSlice
    }
})

export default store
