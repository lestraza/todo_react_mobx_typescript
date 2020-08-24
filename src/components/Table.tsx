import * as React from "react";
import { observer, inject } from "mobx-react";
import MainStore from "../store/mainStore";
import { action } from "mobx";
import Todo from "./Todo";

export interface ITableProps {}

@inject("store")
@observer
export default class Table extends React.Component<ITableProps> {
    mainStore = this.injected.store;

    private get injected() {
        return this.props as ITableProps & { store: MainStore };
    }

    @action.bound
    private renderTodos() {
        return this.mainStore.todos.map((todo) => {
            return <Todo todo={todo} key={todo.id} />;
        });
    }

    public render() {
        const { todos } = this.mainStore;
        return (
            <div className="table">
                {todos.length &&
                    this.renderTodos()}
            </div>
        );
    }
}
