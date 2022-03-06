import React from 'react';
import Constants from '../Config/Constant';

interface Props { }
interface State {}

class Head extends React.Component<Props, State> {
    state: State = {}
    constructor(props: any) {
        super(props)
    }
render(): React.ReactNode {
    let frameCells = Array.from({length: Constants.MAX_FRAMES}).map(
        (frameCell, index) => (<td key={index}>Frame {index + 1}</td>)
      );
    return (
        <thead>
          <tr>
            <td>Player</td>
            {frameCells}
            <td>Score</td>
          </tr>
        </thead>
      );
}
}
export default Head;