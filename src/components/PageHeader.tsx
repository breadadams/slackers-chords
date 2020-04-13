import Link, { LinkProps } from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

type Breadcrumb = {
  linkProps: LinkProps;
  children: string;
  [key: string]: any;
};

interface Props {
  breadcrumbs: Breadcrumb[];
  imageLinkProps: LinkProps;
  imagePath: string;
  imageProps?: any;
  title: string;
  titleProps?: any;
}

const Wrap = styled.header`
  display: flex;
`;

const TitleWrap = styled.div`
  flex: 1;
  padding-right: 38px;
`;

const Breadcrumb = styled(motion.a)`
  display: inline-block;
  font-family: SFProText-Bold;
  font-size: 26px;
  color: #141414;

  &:not(:hover) {
    text-decoration: none;
  }

  &:not(:last-of-type) {
    &::after {
      content: "/";
      display: inline-block;
      margin: 0 8px;
    }
  }
`;

const Title = styled(motion.h1)`
  display: inline-block;
  font-family: SFProText-Bold;
  font-size: 52px;
  color: #141414;
  margin: 20px 0 0;
`;

const SideImage = styled(motion.a)<{ bg: string }>`
  width: 240px;
  background: url(${({ bg }) => bg}) no-repeat center center / cover;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  z-index: 5;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`;

export const PageHeader: React.FC<Props> = ({
  breadcrumbs,
  imageLinkProps,
  imagePath,
  imageProps = {},
  title,
  titleProps
}) => {
  return (
    <Wrap>
      <TitleWrap>
        <div>
          {breadcrumbs.map(({ linkProps, ...props }) => (
            <Link key={props.children} {...linkProps} passHref>
              <Breadcrumb {...props} />
            </Link>
          ))}
        </div>

        <Title {...titleProps} css={titleProps?.css || ""}>
          {title}
        </Title>
      </TitleWrap>

      <Link {...imageLinkProps} passHref>
        <SideImage {...imageProps} bg={imagePath} />
      </Link>
    </Wrap>
  );
};
