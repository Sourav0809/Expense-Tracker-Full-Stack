import React from "react";

const LeaderBoard = ({ name, totalAmount }) => {
  return (
    <div className="flex gap-2">
      <h1>Name : {name}</h1>
      <h1>Total Transaction: {totalAmount}</h1>
    </div>
  );
};

export default LeaderBoard;
