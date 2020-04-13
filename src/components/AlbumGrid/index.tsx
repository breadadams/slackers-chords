import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

import { AlbumsType } from "@/types/album";

import AlbumCard from "./AlbumCard";

interface Props {
  albums: AlbumsType;
  showViewAll?: boolean;
}

const OuterWrap = styled.div``;

const AlbumsHeader = styled.header`
  display: flex;
  align-items: baseline;
  margin-bottom: 30px;
`;

const AlbumsTitle = styled(motion.h2)`
  font-family: SFProText-Bold;
  font-size: 42px;
  color: #141414;
  margin: 0;
  margin-right: auto;
`;

const ViewAllLink = styled.a`
  font-family: SFProText-Semibold;
  font-size: 22px;
  color: #141414;
  text-decoration: underline;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;

  @media screen and (max-width: 1120px) {
    margin: 0 -10px;
  }

  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

const GridItem = styled.div`
  flex: 0 0 25%;
  padding: 0 15px;
  margin-bottom: 30px;
  min-width: 0;

  @media screen and (min-width: 1400px) {
    flex-basis: 20%;
  }

  @media screen and (max-width: 1120px) {
    flex-basis: calc(33.3345% - 0.5px);
    padding: 0 10px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 720px) {
    flex-basis: 50%;
  }

  @media screen and (max-width: 500px) {
    flex-basis: 100%;
    padding: 0;
    margin-bottom: 15px;
  }
`;

export const AlbumGrid: React.FC<Props> = ({ albums, showViewAll = false }) => (
  <OuterWrap>
    <AlbumsHeader>
      <AlbumsTitle layoutId="albumsTitle">Albums</AlbumsTitle>

      {showViewAll && (
        <Link href="/albums" passHref>
          <ViewAllLink>View all</ViewAllLink>
        </Link>
      )}
    </AlbumsHeader>

    <Grid>
      {albums.map((a) => (
        <GridItem key={a.slug}>
          <Link href="/albums/[album]" as={`/albums/${a.slug}`} passHref>
            <AlbumCard album={a} />
          </Link>
        </GridItem>
      ))}
    </Grid>
  </OuterWrap>
);
