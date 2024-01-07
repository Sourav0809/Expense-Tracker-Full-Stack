import { useDispatch, useSelector } from "react-redux";
import Expense from "./ui/Expense";
import { useEffect, useState } from "react";
import { getExpensesAction } from "../../store/actions/expenseActions";
import {
  buyPremiumAction,
  getLeaderBoardAction,
} from "../../store/actions/PremiumActions";
import LeaderBoard from "../leaderboard/LeaderBoard";
import { useNavigate } from "react-router-dom";
import { logOutAction } from "../../store/actions/authActions";
const ExpenseContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLeaderboard, setShowLeaderBoard] = useState(false);
  const { expenses } = useSelector((state) => state.expenses);
  const { isPremiumUser, leaderBoard } = useSelector((state) => state.premium);

  // useffect for fetching all the expenses on the page refresh
  useEffect(() => {
    dispatch(getExpensesAction());
  }, []);

  console.log(leaderBoard);
  // when user want to buy premium
  const buyPremiumHandeler = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(buyPremiumAction(token));
    }
  };

  // showleaderBoard
  const showLeaderboardHandeler = () => {
    dispatch(getLeaderBoardAction());
    setShowLeaderBoard(true);
  };

  // on click on logout
  const logOutHandeler = () => {
    dispatch(logOutAction());
    navigate("/auth");
    localStorage.clear();
  };

  return (
    <div className=" mt-10 flex flex-col gap-2">
      <div className="flex justify-center items-center gap-2 ">
        {isPremiumUser ? (
          <button className=" bg-blue-800 text-white px-5 py-2 rounded-md">
            Premium User
          </button>
        ) : (
          <button
            className=" bg-blue-800 text-white px-5 py-2 rounded-md"
            onClick={buyPremiumHandeler}
          >
            Buy Premium
          </button>
        )}
        <button
          onClick={logOutHandeler}
          className=" bg-blue-800 text-white px-5 py-2 rounded-md"
        >
          Log Out
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
      {isPremiumUser && (
        <div>
          <button onClick={showLeaderboardHandeler}>Show LeaderBoard</button>
          {showLeaderboard &&
            leaderBoard.map((val) => {
              return (
                <LeaderBoard
                  key={Math.random()}
                  userName={val.userName}
                  totalAmount={val.totalTransaction}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default ExpenseContainer;
