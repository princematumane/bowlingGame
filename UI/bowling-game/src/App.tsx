import * as React from "react";
import { BrowserRouter, Route, Link, NavLink, Switch } from "react-router-dom";
import { hot } from 'react-hot-loader/root'
import { Suspense } from "react";

interface Props { }
interface State {}

class App extends React.Component<Props, State> {
    state: State = {}

    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        this.setState({isLoading: false})
    }

 home = React.lazy(() => import('./components/Pages/Home'))
 game = React.lazy(() => import('./components/Pages/Game'))
 leaderBoard = React.lazy(() => import('./components/Pages/LeaderBoard'))

    render() {
        return (
            <div>
                    <BrowserRouter>
                    <Suspense fallback={<div className="loader"></div>}>
                        <Switch>
                            <Route exact path='/' component={this.home}>
                            </Route>
                            <Route exact path='/game' component={this.game} />
                            <Route exact path='/LeaderBoard' component={this.leaderBoard} />
                            <Route>
                                Error 404 Not found
                                </Route>
                        </Switch>
                        </Suspense>
                    </BrowserRouter>
            </div>
        )
    }
}
export default hot(App)