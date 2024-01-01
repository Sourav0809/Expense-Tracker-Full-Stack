import axios from "axios";
import { setExpenses } from "../reducers/expenseSlice";



// for storing a new expense
export const setExpensesAction = (expense) => {
    return async (dispatch, getState) => {

        try {
            const token = localStorage.getItem('token')

            const { data } = await axios.post("http://localhost:4000/user/addexpense", expense, {
                headers: { token: token }
            }
            )
            if (data) {
                expense.id = data.id
                const prevExpenses = getState().expenses.expenses
                const newExpenses = [...prevExpenses, expense]
                dispatch(setExpenses(newExpenses))
            }

        } catch (err) {
            console.log(err);
        }
    }
}


export const getExpensesAction = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.get("http://localhost:4000/user/getexpenses", {
                headers: { token: token }
            })
            if (data) {
                dispatch(setExpenses(data))
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const deleteExpenseAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.delete("http://localhost:4000/user/deleteexpense", { data: { id: id } })
            if (data) {
                const allExpenses = getState().expenses.expenses
                const filteredExpenses = allExpenses.filter(val => val.id !== id)
                dispatch(setExpenses(filteredExpenses))
            }
        } catch (error) {

        }
    }
}