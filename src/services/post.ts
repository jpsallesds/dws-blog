import { api } from "./api"

export const getPosts = async () => {
    const data = await api('/posts', {
        method: 'GET'
    });
    return data;
}

export const getPostById = async (id: string) => {
    const data = await api(`/posts/${id}`, {
        method: 'GET'
    });
    return data;

}