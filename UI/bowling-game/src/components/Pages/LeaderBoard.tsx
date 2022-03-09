import React, { useState } from "react";
import "../../App.css";
import { api } from "../../Services/ApiService";
import { IContestant, Leader } from "../../Interfaces/Interfaces";

interface State {
  LeaderBoardData: Leader[];
}
interface Props {}
class LeaderBoard extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      LeaderBoardData: [],
    };
  }

  componentDidMount() {
    api.Leaderboard().then((x) => {
      console.log(x);
      if (x) {
        this.setState({ LeaderBoardData: x });
      }
    });
  }

  data = (LeaderBoardData: any[]) => {
    return (
      <div className="App">
        {LeaderBoardData.length > 1 ? (
          <div>
            <table id="contestants">
              <tr>
                <th>Contestant Name</th>
                <th>Score</th>
                <th>Score Frame</th>
              </tr>
              {LeaderBoardData.map((contestant, index) => {
                return (
                    <tr key={index}>
                    <td>{contestant.contestantName}</td>
                    <td>{contestant.score}</td>
                    <td>{contestant.scoreFrame}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : (
          <>
            <h1>No contestans found.</h1>
            <span>
              Please add contestants on the {" "}
              <a
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Home Page
              </a>
            </span>
          </>
        )}
      </div>
    );
  };
  render() {
    return <div>{this.data(this.state.LeaderBoardData)}</div>;
  }
}

export default LeaderBoard;
