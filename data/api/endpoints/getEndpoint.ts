import { getMethod } from "../api";

export async function getPostById(postId: number, expectedStatusCode?: number, id?: number): Promise<any> {
    return await getMethod("/posts", { id: postId }, expectedStatusCode, id);
}

export async function getPostsByUserId(userId: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/posts", { userId: userId }, expectedStatusCode);
}

export async function getAlbumByAlbumId(albumId: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/albums", { id: albumId }, expectedStatusCode);
}

export async function getAlbumsByUserId(userId: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/albums", { userId: userId }, expectedStatusCode);
}

export async function getCommentsById(postId: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/comments", { postId: postId }, expectedStatusCode);
}

export async function getAllPosts(): Promise<any> {
    return await getMethod("/posts");
}

export async function getAllAlbums(): Promise<any> {
    return await getMethod("/albums");
}

export async function getAllPhotosInAlbum(albumId: number): Promise<any> {
    return await getMethod("/photos", { albumId: albumId });
}

export async function getPhotoById(id: number): Promise<any> {
    return await getMethod("/photos", { id: id });
}

export async function getAlbumById(id: number, expectedStatusCode?: number): Promise<any> {
    return await getMethod("/albums", { id: id }, expectedStatusCode);
}