import Link from "next/link";
import styled from "styled-components";
import { ChevronRight } from "@styled-icons/material/ChevronRight";
import { motion } from "framer-motion";

import { TracksType } from "@/types/track";

interface Props {
  albumName: string;
  tracks: TracksType;
}

const Wrap = styled.div``;

const ListTitle = styled.h5`
  font-family: SFProText-Semibold;
  font-size: 20px;
  color: #acacac;
  margin: 0 0 10px;
`;

const ListWrap = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 800px;
  max-width: 100%;
`;

const ListItem = styled.li`
  border-bottom: 1px solid #cbcbcb;
`;

const TrackLink = styled.a<{ hasChords: boolean }>`
  display: flex;
  align-items: center;
  padding: 20px;
  text-decoration: none;
  color: ${({ hasChords }) =>
    hasChords ? "#141414" : "rgba(20, 20, 20, 0.50)"};

  &:hover {
    text-decoration: underline;
  }
`;

const TrackLabel = styled(motion.span)`
  font-family: SFProText-Semibold;
  font-size: 24px;

  &::before {
    content: attr(data-index);
    font-size: 16px;
    color: #acacac;
    display: inline-block;
    margin-right: 8px;
  }
`;

const Chevron = styled(ChevronRight)`
  width: 32px;
  margin-left: auto;

  ${TrackLink}:not(:hover) & {
    opacity: 0;
  }
`;

const ContributeLabel = styled.span`
  font-family: SFProText-Medium;
  font-size: 16px;
  color: #141414;
  margin-left: auto;

  ${TrackLink}:not(:hover) & {
    opacity: 0;
  }
`;

export const TrackList: React.FC<Props> = ({ albumName, tracks = [] }) => {
  return (
    <Wrap>
      <ListTitle>Chords</ListTitle>
      <ListWrap>
        {tracks.map(({ chords, title }, i) => {
          const index = `${i + 1}`.padStart(2, "0");

          return (
            <ListItem key={title}>
              <Link
                href="/albums/[album]/[track]"
                as={`/albums/${albumName}/${index}`}
                passHref
              >
                <TrackLink hasChords={chords} title={`${title} Chords`}>
                  <TrackLabel data-index={`${index}.`} layoutId={title}>
                    {title}
                  </TrackLabel>

                  {chords ? (
                    <Chevron />
                  ) : (
                    <ContributeLabel>Add Chords</ContributeLabel>
                  )}
                </TrackLink>
              </Link>
            </ListItem>
          );
        })}
      </ListWrap>
    </Wrap>
  );
};
