import React, { useEffect, useState } from "react";
import {
  IContestantInfo
} from "../Interfaces/Interfaces";

interface IProps {
  contestant: IContestantInfo[];
  numberOfTimesPlayed: number;
}

interface PlayingContestants {
  contestantName: string;
  pinsLeft: number;
  numberOfTimesPlayed: number;
}

const List: React.FC<IProps> = ({ contestant, numberOfTimesPlayed }) => {
  const [contestants, setContestants] = useState<PlayingContestants[]>([]);

  useEffect(() => {
    var players: PlayingContestants[] = [];
    contestant.map((c, i) => {
      players.push({
        contestantName: c.contestantName,
        pinsLeft: c.pinsLeft,
        numberOfTimesPlayed: numberOfTimesPlayed,
      });
      setContestants(players);
    });
  });
  const renderList = (): JSX.Element[] => {
    return contestants.map((c, i) => {
      return (
        <tr key={i}>
          <td>{c.contestantName}</td>
          <td>{c.pinsLeft}</td>
          <td>{c.numberOfTimesPlayed ? c.numberOfTimesPlayed : 0}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <h1>Game Begin ...</h1>
      <table id="contestants">
        <tr>
          <th>Name</th>
          <th>Pins Left</th>
          <th>Number Of Times Played</th>
        </tr>
        {renderList()}
      </table>
    </div>
  );
};

export default List;
