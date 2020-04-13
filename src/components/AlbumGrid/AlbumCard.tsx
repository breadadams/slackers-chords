import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MusicNote } from "@styled-icons/material/MusicNote";

import { AlbumType } from "@/types/album";

interface Props {
  album: AlbumType;
}

const CARD_VARIANTS = {
  initial: {
    scale: 1,
    boxShadow: "0 3px 9px 0 rgba(20, 20, 20, 0.12)",
    y: "0%"
  },
  hover: {
    scale: 0.95,
    boxShadow: "0 1px 6px 0 rgba(20, 20, 20, 0.08)",
    y: "6%"
  }
};

const COVER_VARIANTS = {
  initial: {
    scale: 1,
    boxShadow: "0 1px 4px rgba(14, 14, 14, 0)",
    y: "0%"
  },
  hover: {
    scale: 1.115,
    boxShadow: "0 3px 9px rgba(14, 14, 14, 0.3)",
    y: "-8%"
  }
};

const Card = styled(motion.a)`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 1px 8px 0 rgba(20, 20, 20, 0.18);
  border-radius: 18px;
  padding: 10px 10px 18px;
  text-decoration: none;
  backface-visibility: hidden;
  min-height: 100%;

  @media screen and (max-width: 500px) {
    flex-direction: row;
    padding-bottom: 10px;
  }
`;

const AlbumCover = styled(motion.div)<{ bg: string }>`
  background: url(${({ bg = "" }) => bg}) no-repeat center center / cover;
  border-radius: 10px;
  margin-bottom: 16px;
  position: relative;
  z-index: 5;

  &::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  @media screen and (max-width: 500px) {
    flex-basis: 90px;
    margin-bottom: 0;
    margin-right: 20px;
  }
`;

const CardFooter = styled.footer`
  padding: 0 4px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const AlbumName = styled.span`
  display: block;
  font-size: 20px;
  margin-bottom: 10px;
  font-family: SFProText-Semibold;
  color: #141414;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BottomMeta = styled.span`
  display: flex;
  align-items: flex-end;
  margin-top: auto;
`;

const ReleaseYear = styled.span`
  font-family: SFProText-Semibold;
  font-size: 14px;
  color: #acacac;
  opacity: 0.85;
`;

const TrackCount = styled.span`
  display: flex;
  align-items: center;
  font-family: SFProText-Bold;
  font-size: 12px;
  color: #acacac;
  margin-left: auto;
`;

const TrackCountIcon = styled(MusicNote)`
  width: 20px;
  margin-left: 3px;
`;

const AlbumCard = React.forwardRef<HTMLAnchorElement, Props>(
  ({ album, ...props }, ref) => {
    const trackCount = album?.setlist?.length ?? 0;
    return (
      <Card
        {...props}
        ref={ref}
        variants={CARD_VARIANTS}
        initial="initial"
        whileHover="hover"
        transition={{ duration: 0.25 }}
      >
        <AlbumCover
          bg={`/albums/${album.slug}/cover.jpg`}
          variants={COVER_VARIANTS}
          layoutId={`${album.slug}_cover`}
          transition={{ duration: 0.25 }}
        />
        <CardFooter>
          <AlbumName>{album.title}</AlbumName>
          <BottomMeta>
            <ReleaseYear>{album.year}</ReleaseYear>
            {!!trackCount && (
              <TrackCount>
                {album.trackCount} / {album.trackTotal}
                <TrackCountIcon />
              </TrackCount>
            )}
          </BottomMeta>
        </CardFooter>
      </Card>
    );
  }
);

AlbumCard.displayName = "AlbumCard";

export default AlbumCard;
