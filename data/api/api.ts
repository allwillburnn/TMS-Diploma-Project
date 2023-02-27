import axios, { AxiosResponse } from 'axios';

const initialUrl: string = "https://jsonplaceholder.typicode.com";

axios.defaults.validateStatus = (status) => {
    return status >= 200 && status < 500;
};

async function handleResponse(response: AxiosResponse<any>, expectedStatusCode?: number) {

    if (expectedStatusCode && (response?.status === 200 || response?.status === 201)) {
        expect(response?.status).toBe(expectedStatusCode);
        return response.data;
    } else if (response?.status === 404) {
        return response?.status;
    } else if (response?.status >= 500) {
        throw new Error(`API response with status ${response?.status} error`);
    }

}

// Default get and query get? (*** paths on this site)

export async function getMethod(route: string, query?: object, expectedStatusCode?: number, id?: number) {

    let url: string = "";

    if (id === undefined) {
        url = `${initialUrl}${route}`
    } else {
        url = `${initialUrl}${route}${id}`
    }

    const response: AxiosResponse = await axios.get(url, { params: query } ?? {});
    return handleResponse(response, expectedStatusCode ?? 200);
}

export async function postMethod(route: string, body: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}`;
    const response: AxiosResponse = await axios.post(url, { params: body });
    return handleResponse(response, expectedStatusCode ?? 201);
}

export async function putMethod(route: string, id: number, body: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}/${id}`;
    const response: AxiosResponse = await axios.put(url, { params: body });
    return handleResponse(response, expectedStatusCode ?? 200);
}

export async function deleteMethod(route: string, id?: number, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}/${id}`;
    const response: AxiosResponse = await axios.delete(url);
    return handleResponse(response, expectedStatusCode);
}

