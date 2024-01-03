import axios from "axios";
import { setExpenses } from "../reducers/expenseSlice";
import { ADD_EXPENSE_ENDPOINT, DELETE_EXPENSE_ENDPOINT, GET_EXPENSES_ENDPOINT } from "../../constant/apiEndpoints";


// for storing a new expense
export const setExpensesAction = (expense) => {
    return async (dispatch, getState) => {

        try {
            const token = localStorage.getItem('token')

            const { data } = await axios.post(ADD_EXPENSE_ENDPOINT, expense, {
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


// for getting all the expenses
export const getExpensesAction = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(GET_EXPENSES_ENDPOINT, {
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



// for deleting the expense by using the  id 
export const deleteExpenseAction = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.delete(DELETE_EXPENSE_ENDPOINT, { data: { id: id } })
            if (data) {
                const allExpenses = getState().expenses.expenses
                const filteredExpenses = allExpenses.filter(val => val.id !== id)
                dispatch(setExpenses(filteredExpenses))
            }
        } catch (error) {
            console.log(error)
        }
    }
}

