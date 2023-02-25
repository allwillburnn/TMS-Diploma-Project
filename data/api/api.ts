import axios, { AxiosResponse } from 'axios';

const initialUrl: string = "https://jsonplaceholder.typicode.com";

axios.defaults.validateStatus = (status) => {
    return status >= 200 && status < 500;
};

async function handleResponse(response: AxiosResponse<any>, expectedStatusCode?: number) {

    // if (expectedStatusCode) {
    //     expect(response?.status).toBe(expectedStatusCode);
    // } else if (response?.status >= 500) {
    //     throw new Error(`Error response with status ${response.status}`)
    // }

    // return response.data;

    if (expectedStatusCode && (response?.status === 200 || response?.status === 201)) {
        expect(response?.status).toBe(expectedStatusCode);
        return response.data;
    } else if (response?.status === 404) {
        return response?.status;
    } else if (response?.status >= 500) {
        throw new Error(`API response with status ${response?.status} error`);
    }

}

export async function getMethod(route: string, id?: number, query?: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}/${id}`;
    // console.log(await axios.get(url, { params: query }));
    // console.log(query);
    const response: AxiosResponse = await axios.get(url, { params: query });
    return handleResponse(response, expectedStatusCode);
}


export async function postMethod(route: string, query?: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}${query}`;
    const response: AxiosResponse = await axios.get(url, { params: query });
    return handleResponse(response, expectedStatusCode);
}


export async function putMethod(route: string, query?: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}${query}`;
    const response: AxiosResponse = await axios.get(url);
    return handleResponse(response, expectedStatusCode);
}


export async function patchMethod(route: string, query?: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}${query}`;
    const response: AxiosResponse = await axios.get(url);
    return handleResponse(response, expectedStatusCode);
}


export async function deleteMethod(route: string, query?: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}${query}`;
    const response: AxiosResponse = await axios.get(url);
    return handleResponse(response, expectedStatusCode);
}

