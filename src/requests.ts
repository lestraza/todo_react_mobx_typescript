import { ITodo } from './store/mainStore.interface';
import axios from 'axios'

export interface IGetTasksResponse {
    data: ITodo[]
    error: string
    success: string
}

let url = 'https://test.megapolis-it.ru/api/list'

export function getTasksReq() {
    return axios.get<IGetTasksResponse>(url)
}
export function postNewTaskReq(title: string) {
    return axios.post(url, {title})
}
export function editTaskReq(todo:ITodo) {
    const { id, title } = todo
    return axios.post(`${url}/${id}`, {title})
}
export function deleteTaskReq(id:number) {
    return axios.delete(`${url}/${id}`)
}

