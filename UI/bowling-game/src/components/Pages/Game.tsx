import React, { useState } from "react";
import "../../App.css";
import { api } from "../../Services/ApiService";
import List from "../List";
import AddToList from "../AddContestantToList";
import { IContestant, IContestantInfo, Roll } from "../../Interfaces/Interfaces";
import Table from "../Table";
import Constants from "../../Config/Constant";

interface State {
  contestants: IContestantInfo[];
  isGameStarted: boolean;
  currentPlayingContestant: {
    index: number;
    rolls: number[];
    numberOfTimesPlayed: number;
    remainingPins: number;
  };
  pins: number[];
}
interface Props {}
class Game extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      contestants: [],
      isGameStarted: false,
      currentPlayingContestant: this.initialStateOfContestant,
      pins: [],
    };
  }

  setTotalPins(remmainingPins: number) {
    let pins: number[] = [];
    for (let index = 0; index < remmainingPins; index++) {
      pins.push(index);
    }
    this.setState({
      pins
    });
  }

  initialStateOfContestant = {
    index: 0,
    numberOfTimesPlayed: 0,
    remainingPins: Constants.MAX_PINS,
    rolls:[],
  };

  componentDidMount() {
    api.Getcontestants().then((x) => {
      if (x) {
        this.setState({ contestants: x }, () => {
          this.setState({ isGameStarted: true });
        });
      }
    });
    this.setTotalPins(Constants.MAX_PINS)
  }

  validateNumberOfRolls(){
    if (
        this.state.currentPlayingContestant.rolls.length ==
        Constants.ROLLS_PER_FRAME
      ) {
        this.initialStateOfContestant.index++;
        this.initialStateOfContestant.rolls = [];
          this.setState({currentPlayingContestant: this.initialStateOfContestant} , () =>{
                this.setTotalPins(Constants.MAX_PINS)
          })
      }
  }

  data = (contestants: IContestantInfo[]) => {

    if(this.state.currentPlayingContestant.index >= contestants.length){
        window.location.href ="/LeaderBoard"
        return <>
        All members played
        </>
    }
    return (
      <div className="App">
        {contestants.length > 1 ? (
          <>
            <List contestant={contestants} />
            {/* <Table
              contestants={contestants}
              frames={this.state.chances}
              isGameStarted={this.state.isGameStarted}
            /> */}
            <p>
              Knock down{" "}
              {this.state.pins.map((pin, i) => {
                return (
                  <div key={i}>
                    <button
                      onClick={() => {
                        var r:Roll ={
                            PinsKnocked:pin+1,
                            contestantName: contestants[this.state.currentPlayingContestant.index].contestantName
                        }
                        api.Roll(r).then((res) =>{
                            console.log(res)
                        })
                        var cState = { ...this.state.currentPlayingContestant };
                        cState.rolls.push(pin);
                        cState.remainingPins -= (pin);
                        cState.numberOfTimesPlayed++;
                        this.setTotalPins(cState.remainingPins)
                        this.setState(
                          { currentPlayingContestant: cState } , () =>{
                            this.validateNumberOfRolls();
                          }
                        );
                        
                      }}
                    >
                      {pin+1}
                    </button>
                  </div>
                );
              })}
              pins
            </p>
          </>
        ) : (
          <>
            <h1>No contestans found.</h1>
            <span>
              Please add contestants on the{" "}
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
    return <div>{this.data(this.state.contestants)}</div>;
  }
}

export default Game;
