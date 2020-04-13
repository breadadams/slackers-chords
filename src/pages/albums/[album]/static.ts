import { GetStaticPaths, GetStaticProps } from "next";

import { getAlbumSlugs, getAlbumMeta } from "@/api/album";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAlbumSlugs().map((s) => ({ params: { album: s } })),
  fallback: false
});

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    album: getAlbumMeta(params.album as string)
  }
});
