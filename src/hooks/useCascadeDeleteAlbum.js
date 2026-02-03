import { useFetchPhotosQuery, useRemoveAlbumMutation, useRemovePhotoMutation } from "../store";

export const useCascadeDeleteAlbum = (album) => {
  const { data: photos = [] } = useFetchPhotosQuery(album);
  const [removeAlbum, albumResult] = useRemoveAlbumMutation();
  const [removePhoto, photoResult] = useRemovePhotoMutation();

  const isLoading = albumResult.isLoading || photoResult.isLoading;

  const deleteAlbum = async () => {
    await Promise.all(photos.map(removePhoto));
    await removeAlbum(album);
  };

  return { deleteAlbum, isLoading };
};

