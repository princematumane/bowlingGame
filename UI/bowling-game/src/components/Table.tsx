import React from 'react';
import { IContestant } from '../Interfaces/Interfaces';
import { Body } from './Body';
import Head from './Head';
import "../App.css";

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
            <div id="game" className={(this.props.isGameStarted) ? '' : 'hidden'}>
              <h1>Game Begin ...</h1>
              <p>Note : Results per frame shows after frame game completion:</p><br/>
              <table id="contestants">
                <Head />
                <Body contestants={this.props.contestants} frames={this.props.frames} />
              </table>
            </div>
          );
    }
}

export default Table;