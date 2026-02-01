import { useFetchAlbumsQuery } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";

const AlbumsList = ({ user }) => {

    const {data, error, isLoading} = useFetchAlbumsQuery(user);

    console.log(data, error, isLoading);

    let content;
    if(isLoading){
        content = <Skeleton times={3} className="h-10 w-full"/>
    }
    else if(error){
        content = <div>Error Fetching albums data</div>
    }
    else{
        content = data.map((album) => {

            const header = <div>{album.title}</div>

            return <ExpandablePanel key={album.id} header={header}>
                List of photos in the album
            </ExpandablePanel>
        });
    }

  return <div>
        <div>
            Albums for {user.name}
        </div>
        <div>
            {content}
        </div>
    </div>;
}

export default AlbumsList;
