import * as React from "react";
import { ITodo } from "../store/mainStore.interface";
import IconButton from "./commons/IconButton";
import pen from "../images/pen.svg";
import bucket from "../images/bucket.svg";
import MainStore from "../store/mainStore";
import { action } from "mobx";
import { observer, inject } from "mobx-react";
import {Link} from "react-router-dom";

export interface ITodoProps {
    todo: ITodo;
}

@inject("store")
@observer
export default class Todo extends React.Component<ITodoProps> {
    mainStore = this.injected.store;

    private get injected() {
        return this.props as ITodoProps & { store: MainStore };
    }

    @action.bound
    public deleteTodo() {
        this.mainStore.deletePost(this.props.todo.id);
    }


    public render() {
        const { id, title } = this.props.todo;
        return (
            <div className="todo">
                <div className="todo_id">{id}</div>
                <div className="todo_title">{title}</div>
                <div className="todo_action">
                    <Link to={`/${id}`}>
                    	<IconButton isPrimary={true} icon={pen} />
                    </Link>
                    <IconButton
                        isSecondary={true}
                        icon={bucket}
                        onClick={this.deleteTodo}
                    />
                </div>
            </div>
        );
    }
}
