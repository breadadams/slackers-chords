import { NextPage } from "next";

import { PageHeader, TrackList } from "@/components";
import { AlbumType } from "@/types/album";

export { getStaticPaths, getStaticProps } from "./static";

interface Props {
  album: AlbumType;
}

const Album: NextPage<Props> = ({ album }) => {
  return (
    <div>
      <PageHeader
        breadcrumbs={[
          {
            linkProps: {
              href: "/albums"
            },
            children: "Albums",
            layoutId: "albumsTitle"
          }
        ]}
        imageLinkProps={{
          href: "/albums/[album]",
          as: `/albums/${album.slug}`
        }}
        imagePath={`/albums/${album.slug}/cover.jpg`}
        imageProps={{ layoutId: `${album.slug}_cover` }}
        title={album.title}
        titleProps={{ layoutId: `${album.slug}_title` }}
      />

      <TrackList albumName={album.slug} tracks={album.setlist} />
    </div>
  );
};

export default Album;
