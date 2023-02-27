import { expectedAlbum1 } from "../data/constants/jsonplaceholder/albumData";
import { expectedPhoto1 } from "../data/constants/jsonplaceholder/photoData";
import { expectedPost1, expectedPostsForUserId1 } from "../data/constants/jsonplaceholder/postData";
import { getPostById, getAlbumById, getPhotoById, getAllPosts, getPostsByUserId } from "../data/api/endpoints/getEndpoint";
import { ISinglePostModel } from "../data/api/models/postsModel";


describe("JSONPlaceholder api tests", () => {

    test("User can get all posts", async () => {
        const actualPosts: ISinglePostModel[] = await getAllPosts();
        expect(Object.keys(actualPosts).length).toEqual(100);
    })

    test("The user can get the post by its Id", async () => {
        const actualPost: ISinglePostModel = await getPostById(1, 200);
        const expectedPost: ISinglePostModel = expectedPost1;

        expect(actualPost).toEqual(
            expect.objectContaining({
                userId: expectedPost.userId,
                id: expectedPost.id,
                title: expectedPost.title,
                body: expectedPost.body
            }
            ))
    })

    test("The user should get a 404 error when trying to get a post with a non-existent Id", async () => {
        const recievedStatusCode: number = await getPostById(1000, 404);
        expect(recievedStatusCode).toEqual(404);
    })

    test("The user can get all the posts for a specific user", async () => {
        const recievedPostsByUserId: ISinglePostModel[] = await getPostsByUserId(1);
        const expectedPosts: ISinglePostModel[] = expectedPostsForUserId1;
        expect(Object.keys(recievedPostsByUserId).length).toEqual(10);
        expect(recievedPostsByUserId).toEqual(expectedPosts);
    })

    test.only("The user will receive an empty array when trying to get posts for a non-existent user", async () => {
        const actualPost: [] = await getPostById(155);
        expect(actualPost.length).toEqual(0);
    })

})