import * as React from "react";
import { observer, inject } from "mobx-react";
import MainStore from "../store/mainStore";
import Header from "./Header";
import { action } from "mobx";
import Button from "./commons/Button";
import { RouteComponentProps, Link } from "react-router-dom";

export interface IEditProps extends RouteComponentProps<{ id?: string }> {}

@inject("store")
@observer
export default class Edit extends React.Component<IEditProps> {
    mainStore = this.injected.store;

    private get injected() {
        return this.props as IEditProps & { store: MainStore };
    }

    constructor(props: IEditProps) {
        super(props);
        const { id } = this.props.match.params;
        if (id) {
            this.mainStore.selectedId = parseInt(id);
        }
    }

    componentWillUnmount() {
        this.mainStore.selectedId = undefined;
        this.mainStore.removeError();
    }

    @action.bound
    public onClickDeleteTodo() {
        const { selectedId } = this.mainStore;
        if (selectedId) {
            this.mainStore.deletePost(selectedId);
        }
    }

    @action.bound
    private onChangeInputText(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        this.mainStore.saveNewTitle(value);
    }

    @action.bound
    private onClickEditTodo() {
        if (this.mainStore.editingTodo?.title) {
            this.mainStore.editTodo();
            this.mainStore.removeError()
        } else {
            this.mainStore.error = "Это поле не может быть пустым";
        }
    }

    public render() {
        const {
            hasChangedTitle,
            isLoading,
            editingTodo,
            error,
        } = this.mainStore;
        return (
            !isLoading &&
            (editingTodo ? (
                <div>
                    <Header
                        title={`Задача №${editingTodo?.id}`}
                        buttonValue="Удалить"
                        buttonAction={this.onClickDeleteTodo}
                    />
                    <div className="edit">
                        <div className="edit--header">
                            <div>Краткое описание</div>
                        </div>
                        <input
                            type="text"
                            value={this.mainStore.editingTodo?.title}
                            onChange={this.onChangeInputText}
                        />
                        <div className="error">{error}</div>
                        {!hasChangedTitle ? (
                            <div className="back">
                                <Link to="/">
                                    <Button
                                        value="Вернуться к списку"
                                        width="180px"
                                        isInfo={true}
                                    />
                                </Link>
                            </div>
                        ) : (
                            <Button
                                value="Сохранить"
                                action={this.onClickEditTodo}
                                isInfo={true}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <div className="back">
                    <div className="back--title">
                        Такой задачи не существует, попробуйте открыть другую
                    </div>
                    <div className="back--button">
                        <Link to="/">
                            <Button
                                value="Вернуться к списку"
                                width="180px"
                                isInfo={true}
                            />
                        </Link>
                    </div>
                </div>
            ))
        );
    }
}
