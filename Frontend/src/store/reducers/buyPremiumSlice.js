import { createSlice } from "@reduxjs/toolkit";

const buyPremiumSlice = createSlice({
    name: "premium slice",
    initialState: { isPremiumUser: false },
    reducers: {
        setIsPremium(state) {
            state.isPremiumUser = true
        }
    }
})


export default buyPremiumSlice.reducer
export const { setIsPremium } = buyPremiumSlice.actions