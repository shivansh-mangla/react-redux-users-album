import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const photosApi = createApi({
    reducerPath: 'photos',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints: (builder) => {
        return {
            fetchPhotos: builder.query({
                providesTags: (result=[], error, album) => {
                    let tags = result.map((photo) => {
                        return { type: 'Photo', id: photo.id }
                    });
                    tags.push({ type: 'AlbumsPhoto', id: album.id });
                    return tags;
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id
                        },
                        method: 'GET'
                    }
                }
            }),
            addPhoto: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'AlbumsPhoto', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: '/photos',
                        body: {
                            url: faker.image.abstract(150, 150, true),
                            albumId: album.id
                        },
                        method: 'POST'
                    }
                }
            }),
            removePhoto: builder.mutation({
                invalidatesTags: (result, error, photo) => {
                    return [{ type: 'Photo', id: photo.id }];
                },
                query: (photo) => {
                    return {
                        url: `/photos/${photo.id}`,
                        method: 'DELETE'
                    }
                } 
            })
        }
    }
});


export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;