import * as React from "react";
import Modal from "./Modal/Modal";
import Table from "./Table";
import Header from "./Header";
import MainStore from "../store/mainStore";
import { observer, inject } from "mobx-react";
import { action } from "mobx";

export interface IHomeProps {}

@inject("store")
@observer
export default class Home extends React.Component<IHomeProps> {
    mainStore = this.injected.store;

    private get injected() {
        return this.props as IHomeProps & { store: MainStore };
    }

    @action.bound
    public onClickShowModal() {
		this.mainStore.showModal()
	}
    public render() {
        return (
            <div>
                <Header title="Список задач" buttonValue="Создать" buttonAction={this.onClickShowModal}/>
                <Table />
                <Modal />
            </div>
        );
    }
}
