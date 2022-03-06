import * as React from "react";
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import Home from "./components/Pages/Home";
import { hot } from 'react-hot-loader/root'
import LeaderBoard from "./components/Pages/LeaderBoard";
import Game from "./components/Pages/Game";

interface Props { }
interface State {}

class App extends React.Component<Props, State> {
    state: State = {}

    constructor(props: any) {
        super(props)
    }

    render() {

        return (
            <div>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={Home}>
                            </Route>
                            <Route exact path='/game' component={Game} />
                            <Route exact path='/LeaderBoard' component={LeaderBoard} />
                            <Route>
                                Error 404 Not found
                                </Route>
                        </Switch>
                    </BrowserRouter>
            </div>
        )
    }
}
export default hot(App)