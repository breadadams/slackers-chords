import Link from "next/link";
import styled, { css } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  background?: string;
  isAlbum?: boolean;
  isHome?: boolean;
}

const WRAP_VARIANTS = {
  initial: {
    paddingBottom: "320px"
  },
  small: {
    paddingBottom: "38px",
    transition: {
      ease: "easeOut",
      duration: 0.3
    }
  }
};

const BG_VARIANTS = {
  initial: {
    filter: "blur(0px)",
    scale: 1
  },
  small: {
    filter: "blur(4px)",
    scale: 1.25,
    transition: {
      duration: 0.3
    }
  }
};

const TITLE_VARIANTS = {
  enter: {
    color: "#000",
    textShadow: "0 1px 4px rgba(41, 41, 41, 0)",
    scale: 1,
    originX: 0,
    originY: 0
  },
  light: {
    color: "#fff",
    textShadow: "0 1px 6px rgba(41, 41, 41, 0.25)",
    scale: 0.8,
    originX: 0,
    originY: 0
  }
};

const SUBTITLE_VARIANTS = {
  initial: {
    opacity: 0,
    y: "10%"
  },
  enter: {
    opacity: 1,
    y: "0%"
  },
  exit: {
    opacity: 0,
    y: "10%",
    transition: {
      duration: 0.15
    }
  }
};

const Wrap = styled(motion.header)<Props>`
  padding: 36px 34px 0;
  position: relative;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  background: ${({ isAlbum }) => (!isAlbum ? "#fff" : "#000")};

  @media screen and (max-width: 720px) {
    padding: 38px 24px 0;
  }
`;

const BackgroundImage = styled(motion.div)<Props>`
  background: #fff url(${({ background }) => background}) no-repeat center
    center / cover;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transform-origin: top center;

  ${({ isHome }) =>
    !isHome &&
    css`
      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background: rgba(41, 41, 41, 0.35);
      }
    `}
`;

const TitleLink = styled(motion.a)`
  text-decoration: none;
  display: inline-block;
  color: #141414;

  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-family: SFProText-Bold;
  font-size: 52px;
  margin: 0;

  @media screen and (max-width: 720px) {
    font-size: 38px;
  }
`;

const Subtitle = styled(motion.h4)`
  padding-left: 10px;
  font-family: SFProText-Semibold;
  font-size: 22px;
  color: #141414;
  margin: 18px 0 0;
  width: 720px;
  max-width: 100%;
`;

export const AppHeader: React.FC<Props> = ({
  background,
  isAlbum = false,
  isHome = false
}) => (
  <Wrap
    isAlbum={isAlbum}
    variants={WRAP_VARIANTS}
    initial={false}
    animate={isHome ? "initial" : "small"}
  >
    <BackgroundImage
      variants={BG_VARIANTS}
      background={background}
      isHome={isHome}
    />
    <AnimatePresence initial={false}>
      <Link key="homeLink" href="/" passHref>
        <TitleLink
          variants={TITLE_VARIANTS}
          initial={false}
          animate={isHome ? "enter" : "light"}
          title="Slackers Chords"
        >
          <Title>Slackers&apos; Chords</Title>
        </TitleLink>
      </Link>

      {isHome && (
        <Subtitle
          key="subtitle"
          variants={SUBTITLE_VARIANTS}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          molestias repellendus quas soluta iste? Minima nam nobis quis.
        </Subtitle>
      )}
    </AnimatePresence>
  </Wrap>
);
