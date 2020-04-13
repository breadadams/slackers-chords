import { NextPage, GetStaticProps } from "next";

import { AlbumGrid } from "@/components";
import { getAlbums } from "@/api/album";
import { AlbumsType } from "@/types/album";

interface Props {
  albums: AlbumsType;
}

const Home: NextPage<Props> = ({ albums = [] }) => (
  <AlbumGrid albums={albums} showViewAll />
);

export const getStaticProps: GetStaticProps = async () => ({
  props: { albums: getAlbums() }
});

export default Home;
