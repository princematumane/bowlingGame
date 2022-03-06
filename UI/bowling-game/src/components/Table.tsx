import React from 'react';
import Constants from '../Config/Constant';
import { IContestant } from '../Interfaces/Interfaces';
import { Body } from './Body';
import Head from './Head';

interface Props {
    contestants: IContestant[],
    frames: any[] ,
    isGameStarted : boolean,
 }
interface State {}

class Table extends React.Component<Props, State> {
    state: State = {}
    constructor(props: any) {
        super(props)
        
    }

    render(): React.ReactNode {
        return (
            <div id="scoreboard" className={(this.props.isGameStarted) ? '' : 'hidden'}>
              <h2>Scoreboard</h2>
              <table id="contestants">
                <Head />
                <Body contestants={this.props.contestants} frames={this.props.frames} />
              </table>
            </div>
          );
    }
}

export default Table;