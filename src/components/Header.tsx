import * as React from "react";
import Button from "./commons/Button";
import MainStore from "../store/mainStore";
import { observer, inject } from "mobx-react";

export interface IHeaderProps {
    title: string
    buttonValue: string
    buttonAction: () => void
}

@inject("store")
@observer
export default class Header extends React.Component<IHeaderProps> {
    mainStore = this.injected.store;

    private get injected() {
        return this.props as IHeaderProps & { store: MainStore };
    }

   
    public render() {
        const { title, buttonValue, buttonAction } = this.props
        return (
            <div className="header">
                <div>{title}</div>
                <Button
                    width="148px"
                    height="36px"
                    value={buttonValue}
                    isPrimary={true}
                    action={buttonAction}
                />
            </div>
        );
    }
}
