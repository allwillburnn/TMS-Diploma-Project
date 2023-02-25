import { getMethod } from "../api";

export async function getPostById(id: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/posts", { id: id }, expectedStatusCode);
}

export async function getAlbumById(id: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/albums", { id: id }, expectedStatusCode);
}

export async function getPhotoById(id: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/photos", { id: id }, expectedStatusCode);
}
