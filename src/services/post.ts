import { api } from "./api"

export const getPosts = async () => {
    const data = await api('/posts', {
        method: 'GET'
    });
    return data;
}