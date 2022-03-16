import React, { useState } from "react";
import "../../App.css";
import { api } from "../../Services/ApiService";
import {
  IContestantInfo,
  ICurrentPlayingContestant,
  Roll,
} from "../../Interfaces/Interfaces";
import Table from "../Table";
import Constants from "../../Config/Constant";

interface State {
  contestants: IContestantInfo[];
  isGameStarted: boolean;
  framesData: any[];
  pins: number[];
  frameIndex:number,
  currentPlayingContestant: ICurrentPlayingContestant
}
interface Props {}
class Game extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      contestants: [],
      isGameStarted: false,
      framesData: [],
      frameIndex:1,
      pins: [],
      currentPlayingContestant: this.initialStateOfContestant
    };
  }

  initialStateOfContestant: ICurrentPlayingContestant = {
    index: 0,
    numberOfTimesPlayed: 0,
    remainingPins: Constants.MAX_PINS,
    rolls: [],
    contestantName: ''
  };
   frame:any[] = [] ; 

  componentDidMount() {
    api.Getcontestants().then((x) => {
      if (x) {
        this.setState({ contestants: x }, () => {
          this.setState({ isGameStarted: true });
        });
      }
    });
    this.setTotalPins(Constants.MAX_PINS);
  }

  setTotalPins(remmainingPins: number) {
    let pins: number[] = [];
    for (let index = 1; index < remmainingPins + 1; index++) {
      pins.push(index);
    }
    this.setState({
      pins,
    });
  }

  handleRollClick = (
    pin: number,
    contestant: IContestantInfo
  ) => {
    var r: Roll = {
      PinsKnocked: pin,
      contestantName:contestant.contestantName,
    };
    api.Roll(r).then(
      (res) => {
        //handle api response and show appropriate message
        console.log(res);
      },
      (err) => {
        //handle any api error response
        console.log(err);
      }
    );
    contestant.pinsLeft = contestant.pinsLeft - r.PinsKnocked;
    var cState = { ...this.state.currentPlayingContestant };
    cState.rolls.push(pin);
    cState.remainingPins -= pin;
    cState.numberOfTimesPlayed++;
    this.setTotalPins(cState.remainingPins);
    this.setState({ currentPlayingContestant: cState }, () => {
      this.validateNumberOfRolls();
    });
  };

  validateNumberOfRolls() {
    if (
      this.state.currentPlayingContestant.rolls.length ===
      Constants.ROLLS_PER_FRAME
    ) {
        this.frame.push(this.state.currentPlayingContestant.rolls);
      if(this.initialStateOfContestant.index === this.state.contestants.length -1){
        var framesDataCopy = this.state.framesData;
        framesDataCopy.push(this.frame);
        this.setState({framesData:framesDataCopy})
        this.frame = [];
        this.initialStateOfContestant.index = 0;
      }else{
        this.initialStateOfContestant.index++;
      }
      this.initialStateOfContestant.rolls = [];
      this.setState(
        { currentPlayingContestant: this.initialStateOfContestant },
        () => {
          this.setTotalPins(Constants.MAX_PINS);
        } );
    }
  }

  gamePlaying() {
      var playingContestant = this.state.contestants[this.state.currentPlayingContestant.index];
      if(!playingContestant){
        return <>
        <span>No playing Contestant</span>
        </>
      }
    return (
      <div id="game">
        <h2>
          {
           playingContestant.contestantName
          }{" "}
        </h2>
        <h4>is now playing.</h4>
        <p>
          Knock down{" "}
          {this.state.pins.map((pin, i) => {
            return (
              <div key={i} className="container-btn">
                <button
                  className="button roll-btn"
                  onClick={() => {
                    this.handleRollClick(pin,playingContestant);
                  }}
                >
                  {pin}
                </button>
              </div>
            );
          })}
          {" "}
          pins
        </p>
      </div>
    );
  }

  render() {
    //When all the members has played for all the frames
    if (this.state.framesData.length == Constants.MAX_FRAMES) {
      window.location.href = "/LeaderBoard";
    }
    return (
      <>
        <Table
          contestants={this.state.contestants}
          frames={this.state.framesData}
          isGameStarted={this.state.isGameStarted}
        />
        {this.state.contestants.length > 1 ? this.gamePlaying() : null}
      </>
    );
  }
}
export default Game;
