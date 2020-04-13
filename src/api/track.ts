import fs from "fs";
import path from "path";
import { join } from "path";
import matter from "gray-matter";

import { AlbumSlugType } from "@/types/album";
import { TrackSlugType, TrackSlugsType, TrackType } from "@/types/track";

import { getAlbumMeta } from "./album";
import { albumsDir, isHidden } from "./utils";

const getChordsDir = (album: AlbumSlugType): string =>
  join(albumsDir, album, "chords");

export const getTrackSlugs = (albumSlug: AlbumSlugType): TrackSlugsType => {
  try {
    return fs
      .readdirSync(getChordsDir(albumSlug))
      .filter((t) => !isHidden(t) && /\.md$/.test(t))
      .map((slug) => slug.replace(/\.md$/, ""));
  } catch (e) {
    return [];
  }
};

export const getTrackMeta = (
  album: AlbumSlugType,
  track: TrackSlugType
): TrackType => {
  const { title, setlist } = getAlbumMeta(album);

  return {
    album: title,
    ...setlist[parseInt(track) - 1]
  };
};

export const getTrackContents = (
  album: AlbumSlugType,
  track: TrackSlugType
): string => {
  const trackPath = path.join(getChordsDir(album), `${track}.md`);
  const trackMd = fs.readFileSync(trackPath, "utf8");

  if (trackMd) {
    const { content } = matter(trackMd);

    return content;
  }

  return "";
};
