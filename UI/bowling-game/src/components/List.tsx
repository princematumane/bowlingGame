import React from 'react'
import { IState as Props } from "../components/Pages/Home";
import { IContestantInfo } from '../Interfaces/Interfaces';

interface IProps {
    contestant: IContestantInfo[]
}

const List: React.FC<IProps> = ({ contestant }) => {
    const renderList = (): JSX.Element[] => {
      return contestant.map((c, i) => {
        return (
          <tr key={i}>
            <td>{c.contestantName}</td>
            <td>{c.pinsLeft}</td>
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
          </tr>
            {renderList()}
      </table>
      </div>
    );
  };

export default List