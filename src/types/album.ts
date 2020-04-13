import { TracksType } from "./track";

export type AlbumSlugType = string;

export type AlbumSlugsType = AlbumSlugType[];

export interface AlbumMetaType {
  title: string;
  year: number;
  setlist: TracksType;
}

export interface AlbumType extends AlbumMetaType {
  slug: AlbumSlugType;
  trackTotal: number;
  trackCount: number;
}

export type AlbumsType = AlbumType[];
