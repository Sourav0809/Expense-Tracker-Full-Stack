import { useDispatch, useSelector } from "react-redux";
import Expense from "./ui/Expense";
import { useEffect, useState } from "react";
import { getExpensesAction } from "../../store/actions/expenseActions";
import {
  buyPremiumAction,
  downloadExpensesAction,
  getLeaderBoardAction,
} from "../../store/actions/PremiumActions";
import LeaderBoard from "../leaderboard/LeaderBoard";
import { useNavigate } from "react-router-dom";
import { logOutAction } from "../../store/actions/authActions";
import { getDownloadedExpensesAction } from "../../store/actions/PremiumActions";
const ExpenseContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLeaderboard, setShowLeaderBoard] = useState(false);
  const { expenses } = useSelector((state) => state.expenses);
  const { isPremiumUser, leaderBoard, downloadLinks } = useSelector(
    (state) => state.premium
  );

  // useffect for fetching all the expenses & download links on the page refresh
  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          dispatch(getExpensesAction()),
          dispatch(getDownloadedExpensesAction()),
        ]);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

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

  // download expenses
  const downlaodExpenseHandeler = () => {
    dispatch(downloadExpensesAction());
  };

  // on click on logout
  const logOutHandeler = () => {
    dispatch(logOutAction());
    navigate("/auth");
    localStorage.clear();
  };

  console.log(downloadLinks);

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
      <div>
        {isPremiumUser && (
          <button onClick={downlaodExpenseHandeler}>
            Downad Expense Report
          </button>
        )}
      </div>

      <div className=" flex flex-col gap-2">
        <h1 className=" text-center pb-4">Previous Download Reports</h1>
        {downloadLinks.map((link) => {
          return (
            <div
              key={link.id}
              className=" flex justify-center items-center gap-2"
            >
              <h1>{link.date}</h1>
              <h1>{link.time}</h1>
              <a
                href={link.downloadLink}
                target="_blank"
                className=" bg-blue-900 text-white px-3 py-1 rounded-md"
              >
                Donwload
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExpenseContainer;
