import React from "react";
import Constants from "../Config/Constant";
import { IContestant } from "../Interfaces/Interfaces";

interface Props {
  contestants: IContestant[];
  frames: any[];
}

interface State {}

export class Body extends React.Component<Props, State> {
  state: State = {};
  constructor(props: any) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
  }

  framesForPlayer(
    allFrames: any[],
    contestantIndex: number,
    maxFrames: number
  ) {
    let frames = allFrames.map((frame) => frame[contestantIndex]);
    let numEmptyFrames = maxFrames - frames.length;
    let emptyFrames = Array.from({ length: numEmptyFrames }).map(() => []);

    return frames.concat(emptyFrames);
  }

  renderFrameCell(rolls: any[], index: number) {
    let scores = rolls.map((roll, i) => (
      <span key={i} className="roll-score">
        {roll} {"  | "}
      </span>
    ));
    return <td key={index}>{scores}</td>;
  }

  renderRow(contestant: any, index: number) {
    if (this.props) {
      let frames = this.framesForPlayer(
        this.props.frames,
        index,
        Constants.MAX_FRAMES
      );
      let rolls = frames.map(this.renderFrameCell);
      let score = 0; //api.getScore;
      return (
        <tr key={index}>
          <td>{contestant.contestantName}</td>
          {rolls}
          <td>{score}</td>
        </tr>
      );
    }
  }

  render(): React.ReactNode {
    return <tbody>{this.props.contestants.map(this.renderRow)}</tbody>;
  }
}
