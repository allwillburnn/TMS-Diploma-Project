import { deleteMethod } from "../api";

export async function deletePostById(postId: number, expectedStatusCode?: number): Promise<any> {
    return await deleteMethod("/posts", postId, expectedStatusCode);
}