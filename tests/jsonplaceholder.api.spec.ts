import { dataForNewAlbum, expectedAlbum1, expectedAlbumsForUser1 } from "../data/constants/jsonplaceholder/albumData";
import { dataForNewPhoto, expectedPhoto1, wrongDataForNewPhoto } from "../data/constants/jsonplaceholder/photoData";
import { expectedPost1, expectedPostsForUserId1, dataForNewPost, dataForUpdatePost } from "../data/constants/jsonplaceholder/postData";
import { getPostById, getPhotoById, getAllPosts, getPostsByUserId, getCommentsById, getAllAlbums, getAlbumByAlbumId, getAlbumsByUserId, getAllPhotosInAlbum } from "../data/api/endpoints/getEndpoint";
import { ISinglePostModel } from "../data/api/models/postsModel";
import { ISingleAlbumModel } from "../data/api/models/albumsModel";
import { createAlbum, createPhoto, createPost } from "../data/api/endpoints/postEndpoint";
import { updatePostTitle } from "../data/api/endpoints/putEndpoint";
import { deletePostById } from "../data/api/endpoints/deleteEndpoint";
import { ISinglePhotoModel } from "../data/api/models/photosModel";


describe("JSONPlaceholder, Posts category api tests", () => {

    test("User can get all posts", async () => {
        const recievedPosts: ISinglePostModel[] = await getAllPosts();
        expect(Object.keys(recievedPosts).length).toEqual(100);
    })

    test("The user can get the post by its Id", async () => {
        const recievedPost: ISinglePostModel = await getPostById(1);
        expect(recievedPost).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    userId: expectedPost1.userId,
                    id: expectedPost1.id,
                    title: expectedPost1.title,
                    body: expectedPost1.body
                })
            ])
        )
    })

    test("The user should get a 404 error when trying to get a post with a non-existent Id", async () => {
        const recievedStatusCode: number = await getPostById(undefined, 404, -1);
        expect(recievedStatusCode).toEqual(404);
    })

    test("The user can get all the posts for a specific user", async () => {
        const recievedPostsByUserId: ISinglePostModel[] = await getPostsByUserId(1);
        const expectedPosts: ISinglePostModel[] = expectedPostsForUserId1;
        expect(recievedPostsByUserId.length).toEqual(10);
        expect(recievedPostsByUserId).toEqual(expectedPosts);
    })

    test("The user will receive an empty array when trying to get posts for a non-existent user", async () => {
        const actualPost: [] = await getPostById(155);
        expect(actualPost.length).toEqual(0);
    })

    test("The user can get all the comments on a post by its Id", async () => {
        const actualComments: [] = await getCommentsById(1);
        expect(actualComments.length).toEqual(5);
    })


    test("The user will get an empty array when trying to get comments on a non-existent post", async () => {
        const actualComments: [] = await getCommentsById(-1);
        expect(actualComments.length).toEqual(0);
    })

    test("The user can create new post", async () => {
        const recievedPost: object = await createPost(dataForNewPost);
        expect(recievedPost).toEqual(expect.objectContaining({
            id: 101,
            params: {
                userId: dataForNewPost.userId,
                id: dataForNewPost.id,
                title: dataForNewPost.title,
                body: dataForNewPost.body
            }
        }));
    })

    test("The user can update the title of an existing post", async () => {
        const updatedTitle: object = await updatePostTitle(dataForUpdatePost.title, 1, 200);
        expect(updatedTitle).toEqual(expect.objectContaining({
            params: { title: dataForUpdatePost.title }
        }));
    })

    test("User can delete post by Id", async () => {
        expect(Object.keys(await deletePostById(1, 200)).length).toBe(0);
    })

})

describe("JSONPlaceholder, Albums category api tests", () => {

    test("User can get all albums", async () => {
        const recievedAlbums: ISingleAlbumModel[] = await getAllAlbums();
        expect(Object.keys(recievedAlbums).length).toEqual(100);
    })

    test("User can get album by id", async () => {
        const recievedAlbum: ISingleAlbumModel = await getAlbumByAlbumId(1);
        const expectedAlbum: ISingleAlbumModel = expectedAlbum1;
        expect(recievedAlbum).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    userId: expectedAlbum.userId,
                    id: expectedAlbum.id,
                    title: expectedAlbum.title
                })
            ]));
    })

    test("User can get all albums of a specific user by userId", async () => {
        const recievedAlbums: ISingleAlbumModel[] = await getAlbumsByUserId(1);
        const expectedAlbums: ISingleAlbumModel[] = expectedAlbumsForUser1;
        expect(recievedAlbums.length).toEqual(10);
        expect(recievedAlbums).toEqual(expectedAlbums);
    })

    test("User can add new album", async () => {
        const recievedAlbum: object = await createAlbum(dataForNewAlbum);
        expect(recievedAlbum).toEqual(expect.objectContaining({
            id: 101,
            params: {
                userId: dataForNewAlbum.userId,
                id: dataForNewAlbum.id,
                title: dataForNewAlbum.title,
            }
        }));
    })

})

describe("JSONPlaceholder, Photos category api tests", () => {

    test("The user can get all the photos in the album by his Id", async () => {
        const recievedPhotos: ISinglePhotoModel[] = await getAllPhotosInAlbum(1);
        expect(Object.keys(recievedPhotos).length).toEqual(50);
    })


    test("The user can get a specific photo by its Id", async () => {
        const recievedPhoto: ISinglePhotoModel = await getPhotoById(1);
        expect(recievedPhoto).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    albumId: expectedPhoto1.albumId,
                    id: expectedPhoto1.id,
                    title: expectedPhoto1.title,
                    url: expectedPhoto1.url,
                    thumbnailUrl: expectedPhoto1.thumbnailUrl
                })
            ]));
    })


    test("The user can upload a new photo", async () => {
        const recievedPhoto: object = await createPhoto(dataForNewPhoto);
        expect(recievedPhoto).toEqual(expect.objectContaining({
            id: 5001,
            params: {
                albumId: dataForNewPhoto.albumId,
                id: dataForNewPhoto.id,
                title: dataForNewPhoto.title,
                url: dataForNewPhoto.url,
                thumbnailUrl: dataForNewPhoto.thumbnailUrl
            }
        }));
    })


    test.skip("User can't upload new photo without albumId", async () => {
        const { albumId, ...photoWIthoutAlbumId } = dataForNewPhoto;
        const recievedPhoto: object = await createPhoto(photoWIthoutAlbumId);
        // Actually api doesnt care about missing params, it will be created anyway
    })


    test.skip("The user cannot upload a new photo by specifying the Id of a non-existent album.", async () => {
        await createPhoto(wrongDataForNewPhoto);
        // Actually api doesnt care about wrong id, returns 201 anyway
    })

})