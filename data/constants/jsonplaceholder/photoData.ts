import { ISinglePhotoModel } from "../../api/models/photosModel";

export const expectedPhoto1: ISinglePhotoModel = {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952"
}

export const dataForNewPhoto: ISinglePhotoModel = {
    albumId: 1,
    id: 1,
    title: "Test title",
    url: "Test url",
    thumbnailUrl: "Test thumbnailUrl"
}

export const wrongDataForNewPhoto: ISinglePhotoModel = {
    albumId: 9999,
    id: 1,
    title: "Test title",
    url: "Test url",
    thumbnailUrl: "Test thumbnailUrl"
}