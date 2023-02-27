import { postMethod } from "../api";

export async function createPost(body: object, expectedStatusCode?: number): Promise<any> {
    return await postMethod("/posts", body, expectedStatusCode);
}

export async function createAlbum(body: object, expectedStatusCode?: number): Promise<any> {
    return await postMethod("/albums", body, expectedStatusCode);
}

export async function createPhoto(body: object, expectedStatusCode?: number): Promise<any> {
    return await postMethod("/photos", body, expectedStatusCode);
}