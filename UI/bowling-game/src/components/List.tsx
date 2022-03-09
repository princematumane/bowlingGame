import React from 'react'
import { IContestantInfo, ICurrentPlayingContestant } from '../Interfaces/Interfaces';

interface IProps {
    contestant: IContestantInfo[]
    currentPlayingContestant:ICurrentPlayingContestant
}

const List: React.FC<IProps> = ({ contestant ,currentPlayingContestant}) => {
    const renderList = (): JSX.Element[] => {
      return contestant.map((c, i) => {
        return (
          <tr key={i}>
            <td>{c.contestantName}</td>
            <td>{c.pinsLeft}</td>
            <td>{(i == currentPlayingContestant.index) ? currentPlayingContestant.numberOfTimesPlayed : 0}</td>
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

export default List