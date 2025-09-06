import { api } from "./api"

export const getAuthors = async () => {
    const data = await api('/authors', {
        method: 'GET'
    });
    return data;
}