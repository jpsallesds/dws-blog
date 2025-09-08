import { api } from "./api"

export const getCategories = async () => {
    const data = await api('/categories', {
        method: 'GET'
    });
    return data;
}