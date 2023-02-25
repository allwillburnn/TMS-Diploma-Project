import axios, { AxiosResponse } from 'axios';

const initialUrl: string = "https://jsonplaceholder.typicode.com";

axios.defaults.validateStatus = (status) => {
    console.log("Validating status:", status >= 200 && status <= 304);
    return status >= 200 && status < 500;
};

async function handleResponse(response: AxiosResponse<any>, expectedStatusCode?: number) {

    console.log(response.status);

    // if (expectedStatusCode) {
    //     expect(response?.status).toBe(expectedStatusCode);
    // } else if (response?.status >= 500) {
    //     throw new Error(`Error response with status ${response.status}`)
    // }

    // return response.data;

    if (expectedStatusCode) {
        expect(response?.status).toBe(expectedStatusCode);
        return response.data;
    } else if (response?.status === 404) {
        return response?.status;
    } else if (response?.status >= 400) {
        throw new Error(`API response with status ${response?.status} error`);
    }

}

export async function getMethod(route: string, query?: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}${query}`;
    const response: AxiosResponse = await axios.get(url);
    return handleResponse(response, expectedStatusCode);
}


export async function postMethod(route: string, query?: object, expectedStatusCode?: number) {
    const url: string = `${initialUrl}${route}${query}`;
    const response: AxiosResponse = await axios.get(url);
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

