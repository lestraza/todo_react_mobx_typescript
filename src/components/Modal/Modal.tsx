import * as React from "react";
import Button from "../commons/Button";
import MainStore from "../../store/mainStore";
import { observer, inject } from "mobx-react";
import IconButton from "../commons/IconButton";
import close from "../../images/close.svg";
import { action } from "mobx";

export interface IModalProps {}

@inject("store")
@observer
export default class Modal extends React.Component<IModalProps> {
    mainStore = this.injected.store;

    private get injected() {
        return this.props as IModalProps & { store: MainStore };
    }

    state = {
        title: "",
    };
    componentWillUnmount() {
        this.mainStore.removeError();
    }

    @action.bound
    public onClickClose() {
        this.setState({ title: "" }, () => {
            this.mainStore.closeModal();
            this.mainStore.removeError();
        });
    }

    @action.bound
    private onChangeInputText(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.currentTarget.value;
        this.setState({ title: value }, () => {
        });
    }

    @action.bound
    public savePost() {
        if (this.state.title) {
            this.mainStore.saveNewPost(this.state.title);
            this.mainStore.removeError();
            this.mainStore.closeModal();
        } else {
            this.mainStore.error = "Заголовок не может быть пустым.";
        }
    }
    public render() {
        const { isShowModal, error } = this.mainStore;
        const { title } = this.state;
        return (
            <div className={`modal ${isShowModal ? "modal--show" : ""}`}>
                <div className="modal--header">
                    <div>Краткое описание</div>
                    <IconButton
                        isSecondary={true}
                        icon={close}
                        onClick={this.onClickClose}
                    />
                </div>
                <input
                    type="text"
                    value={title}
                    onChange={this.onChangeInputText}
                />
                <div className="error">{error && error}</div>
                <div className="modal--button">
                    <Button
                        value="Создать"
                        isPrimary={true}
                        action={this.savePost}
                    />
                </div>
            </div>
        );
    }
}
