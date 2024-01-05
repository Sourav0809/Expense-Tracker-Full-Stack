import { createSlice } from "@reduxjs/toolkit";

const premiumSlice = createSlice({
    name: "premium slice",
    initialState: { isPremiumUser: false, leaderBoard: [] },
    reducers: {
        setIsPremium(state) {
            state.isPremiumUser = true
        },
        setLeaderBoard(state, action) {
            state.leaderBoard = action.payload
        }
    }
})


export default premiumSlice.reducer
export const { setIsPremium, setLeaderBoard } = premiumSlice.actions