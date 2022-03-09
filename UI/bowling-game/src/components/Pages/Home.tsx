import React, { useState } from "react";
import "../../App.css";
import { api } from "../../Services/ApiService";
import AddContestantToList from "../AddContestantToList";
import { IContestant } from "../../Interfaces/Interfaces";
import Constants from "../../Config/Constant";

export interface IState {
  contestant:IContestant[];
}

const Home = () => {
  const [contestant, setContestant] = useState<IContestant[]>([]);

  const handleResetGame = () => {
    api.ResetGame();
    setContestant([]);
  };

  const handleNext = () => {
    api.AddContestants( contestant,  succes =>{
      if(succes){
        window.location.href = "/game";
      }
    } ,  error =>{
      
    })
  };

  return (
    <div className="App">
      <h1>Welcome to bowling game!!</h1>
      <h4>Have fun!!</h4>
      {contestant.length >= Constants.MIN_PLAYERS ? (
        <button onClick={handleResetGame} className="AddToList-btn">
          Reset Game
        </button>
      ) : null}
       <AddContestantToList setContestant={setContestant} contestant={contestant} />
      {contestant.length > 1 ? (
        <button onClick={handleNext} className="AddToList-btn">
          Next
        </button>
      ) : null}
    </div>
  );
};

export default Home;
