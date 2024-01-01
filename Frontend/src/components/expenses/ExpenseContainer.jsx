import { useDispatch, useSelector } from "react-redux";
import Expense from "./ui/Expense";
import { useEffect } from "react";
import { getExpensesAction } from "../../store/actions/expenseActions";
const ExpenseContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExpensesAction());
  }, []);

  const { expenses } = useSelector((state) => state.expenses);
  console.log(expenses);
  return (
    <div className=" mt-10 flex flex-col gap-2">
      {expenses.map((values) => {
        return (
          <Expense
            key={values.id}
            name={values.name}
            id={values.id}
            price={values.price}
            category={values.category}
            date={values.date}
          />
        );
      })}
    </div>
  );
};

export default ExpenseContainer;
