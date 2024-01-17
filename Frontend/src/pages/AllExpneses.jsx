import React from "react";
import AddExpenseForm from "../components/expenses/ui/AddExpenseForm";
import ExpenseContainer from "../components/expenses/expenseContainer";

const AllExpenses = () => {
  return (
    <div>
      <AddExpenseForm />
      <ExpenseContainer />
    </div>
  );
};

export default AllExpenses;
