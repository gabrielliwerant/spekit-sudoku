import React, { useState } from "react";
import axios from "axios";

const Main = () => {
  const [board, setBoard] = useState("");
  const onClick = () => {
    axios
      .get("https://vast-chamber-17969.herokuapp.com/generate?difficulty=easy")
      .then((response) => {
        setBoard(response.data.puzzle);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Spekit Sudoku</h1>
      <button onClick={onClick}>Get Sudoku</button>
      {board && (
        <ul>
          {Object.keys(board).map((key) => (
            <li key={key}>{`${key}, ${board[key]}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Main;
