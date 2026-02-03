import React from 'react'
import ExpandablePanel from './ExpandablePanel'
import Button from './Button.js'
import { GoTrashcan } from 'react-icons/go'
import { useRemoveAlbumMutation } from '../store'
import PhotosList from './PhotosList.jsx'
import { useCascadeDeleteAlbum } from '../hooks/useCascadeDeleteAlbum'

const AlbumsListItem = ({album}) => {

    // const [removeAlbum, results] = useRemoveAlbumMutation();
    const { deleteAlbum, isLoading } = useCascadeDeleteAlbum(album);


    const handleRemoveAlbum = () => {
        // removeAlbum(album);
        deleteAlbum();
    }

    const header = <>
        {/* <Button className='mr-2' onClick={handleRemoveAlbum} loading={results.isLoading}> */}
        <Button className='mr-2' onClick={handleRemoveAlbum} loading={isLoading}>
            <GoTrashcan />
        </Button>
        {album.title}
    </>

    return <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album} />
    </ExpandablePanel>
}

export default AlbumsListItem