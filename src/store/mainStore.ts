import { ITodo } from "./mainStore.interface";
import { observable, action, computed } from "mobx";
import {
    getTasksReq,
    postNewTaskReq,
    deleteTaskReq,
    editTaskReq,
} from "../requests";

class MainStore {
    @observable
    public todos: ITodo[] = [];

    @observable
    public isLoading: boolean = false;

    @observable
    public error: string = "";

    @observable
    public isShowModal: boolean = false;

    @computed
    public get editingTodo() {
        return this.todos.find((todo) => todo.id === this.selectedId);
    }

    @observable
    public selectedId?: number;

    @observable
    public hasChangedTitle: boolean = false;

    @action.bound
    public getStore() {
        return this;
    }

    @action.bound
    public removeError() {
        this.error = "";
    }

    @action.bound
    public getTasks() {
        this.isLoading = true;
        getTasksReq()
            .then((res) => {
                this.todos = [...res.data.data];
            })
            .catch((err) => {
                this.error = err.data.error;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }

    @action.bound
    public showModal() {
        this.isShowModal = true;
    }

    @action.bound
    public closeModal() {
        this.isShowModal = false;
    }

    @action.bound
    public saveNewPost(title: string) {
        postNewTaskReq(title).then((res) => {
            if (res.data.success) {
                this.getTasks();
            } else {
                this.error = res.data.error;
            }
        });
    }

    @action.bound
    public deletePost(id: number) {
        deleteTaskReq(id).then((res) => {
            if (res.data.success) {
                this.getTasks();
            } else {
                this.error = res.data.error;
            }
        });
    }

 
    @action.bound
    public saveNewTitle(newTitle: string) {
        if (this.editingTodo) {
            this.editingTodo.title = newTitle.trim();
            this.hasChangedTitle = true;
        }
    }

    @action.bound
    public editTodo() {
        if (this.editingTodo) {
            editTaskReq(this.editingTodo).then((res) => {
                if (res.data.success) {
                    this.getTasks();
                    this.hasChangedTitle = false;
                } else {
                    this.error = res.data.error;
                }
            });
        }
    }
}

export default MainStore;
