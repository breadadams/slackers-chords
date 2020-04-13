import { join } from "path";

export const albumsDir = join(process.cwd(), "public/albums");

export const isHidden = (s = ""): boolean => /^\./.test(s);
