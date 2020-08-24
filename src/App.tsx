import * as React from "react";
import { inject, observer } from "mobx-react";
import MainStore from "./store/mainStore";
import Edit from "./components/Edit";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route, RouteComponentProps } from "react-router-dom";

export interface IAppProps extends RouteComponentProps {}

@inject("store")
@observer
export default class App extends React.Component<IAppProps> {
    mainStore = this.injected.store;

    private get injected() {
        return this.props as IAppProps & { store: MainStore };
    }

    componentDidMount() {
        this.mainStore.getTasks();
    }
    public render() {
        return (
            <div className="wrapper">
                <BrowserRouter>
                    <Switch>
                        <Route path={'/'} exact component={Home}/>
                        <Route path={'/:id'} exact component={Edit}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}
