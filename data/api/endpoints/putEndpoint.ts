import { putMethod } from "../api";

export async function updatePostTitle(title: string, id?: number, expectedStatusCode?: number): Promise<any> {
    return await putMethod("/posts", id, { title: title }, expectedStatusCode);
}