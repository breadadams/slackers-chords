import fs from "fs";
import { join } from "path";

import {
  AlbumMetaType,
  AlbumType,
  AlbumsType,
  AlbumSlugType,
  AlbumSlugsType
} from "@/types/album";

import { getTrackSlugs } from "./track";
import { albumsDir, isHidden } from "./utils";

const filterHidden = (l: string[]): string[] => l.filter((d) => !isHidden(d));

export const getAlbumSlugs = (): AlbumSlugsType => {
  try {
    return filterHidden(fs.readdirSync(albumsDir));
  } catch (e) {
    return [];
  }
};

export const getAlbumMetaJSON = (albumSlug: AlbumSlugType): AlbumMetaType => {
  try {
    const jsonFile = fs.readFileSync(join(albumsDir, albumSlug, "meta.json"));
    return JSON.parse(jsonFile.toString());
  } catch (e) {
    return {
      title: "",
      year: 0,
      setlist: []
    };
  }
};

export const getAlbumMeta = (albumSlug: AlbumSlugType): AlbumType => {
  const meta = getAlbumMetaJSON(albumSlug);
  const trackSlugs = getTrackSlugs(albumSlug);

  const trackTotal = meta.setlist.length;
  const trackCount = trackSlugs.length;

  return {
    ...meta,
    slug: albumSlug,
    trackCount,
    trackTotal
  };
};

export const getAlbums = (): AlbumsType =>
  getAlbumSlugs()
    .map(getAlbumMeta)
    .sort((a, b) => b.year - a.year);
