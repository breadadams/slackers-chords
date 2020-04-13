import { GetStaticProps, GetStaticPaths } from "next";

import { getAlbumSlugs } from "@/api/album";
import { getTrackSlugs, getTrackMeta, getTrackContents } from "@/api/track";

export const getStaticPaths: GetStaticPaths = async () => {
  const albumSlugs = await getAlbumSlugs();

  const paths = albumSlugs.reduce((acc, album) => {
    const trackSlugs = getTrackSlugs(album) || [];

    const trackPaths = trackSlugs.map((track) => ({
      params: { album, track }
    }));

    return [...acc, ...trackPaths];
  }, []);

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const album = params.album as string;
  const track = params.track as string;

  return {
    props: {
      meta: getTrackMeta(album, track),
      content: getTrackContents(album, track)
    }
  };
};
