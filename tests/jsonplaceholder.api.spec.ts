import { expectedAlbum1 } from "../data/constants/jsonplaceholder/albumData";
import { expectedPhoto1 } from "../data/constants/jsonplaceholder/photoData";
import { expectedPost1 } from "../data/constants/jsonplaceholder/postData";
import { getPostById, getAlbumById, getPhotoById } from "../data/api/endpoints/getEndpoint";
import { ISinglePostModel } from "../data/api/models/SinglePostModel";


describe("JSONPlaceholder api tests", () => {

    test("The user can get the post by its Id", async () => {
        const actualPost: ISinglePostModel = await getPostById(1, 200);
        const expectedPost: ISinglePostModel = expectedPost1;

        expect(actualPost).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    userId: expectedPost.userId,
                    id: expectedPost.id,
                    title: expectedPost.title,
                    body: expectedPost.body
                })]
            ))
    })

    test.only("The user should get a 404 error when trying to get a post with a non-existent Id", async () => {
        const recievedStatusCode: number = await getPostById(1000, 404);
        expect(recievedStatusCode).toEqual(404);
    })

})