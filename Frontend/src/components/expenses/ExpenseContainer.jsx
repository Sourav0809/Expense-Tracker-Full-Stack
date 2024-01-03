import { useDispatch, useSelector } from "react-redux";
import Expense from "./ui/Expense";
import { useEffect } from "react";
import { getExpensesAction } from "../../store/actions/expenseActions";
import buyPremiumAction from "../../store/actions/buyPremiumAction";
const ExpenseContainer = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const { isPremiumUser } = useSelector((state) => state.premiumUser);

  // useffect for fetching all the expenses on the page refresh
  useEffect(() => {
    dispatch(getExpensesAction());
  }, []);

  // when user want to buy premium
  const buyPremiumHandeler = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(buyPremiumAction(token));
    }
  };

  return (
    <div className=" mt-10 flex flex-col gap-2">
      <div className="flex justify-center items-center ">
        <button
          className=" bg-blue-800 text-white px-5 py-2 rounded-md"
          onClick={buyPremiumHandeler}
        >
          {isPremiumUser ? "Premium Member" : "Buy Premium"}
        </button>
      </div>

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
