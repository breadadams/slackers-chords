import { NextPage, GetStaticProps } from "next";
import { AlbumGrid } from "@/components";
import { getAlbums } from "@/api/album";

import { AlbumsType } from "@/types/album";

interface Props {
  albums: AlbumsType;
}

const Albums: NextPage<Props> = ({ albums = [] }) => {
  return <AlbumGrid albums={albums} />;
};

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    albums: getAlbums()
  }
});

export default Albums;
