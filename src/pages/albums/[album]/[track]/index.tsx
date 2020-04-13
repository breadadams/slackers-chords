import { NextPage } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { css } from "styled-components";

import { PageHeader } from "@/components";
import { TrackType } from "@/types/track";

export { getStaticPaths, getStaticProps } from "./static";

interface Props {
  meta: TrackType;
  content: string;
}

const titleCSS = css`
  &::before {
    content: attr(data-index);
    font-size: 32px;
    display: inline-block;
    color: #acacac;
    margin-right: 12px;
  }
`;

const Track: NextPage<Props> = ({ meta, content }) => {
  const { query } = useRouter();
  const albumSlug = query.album as string;
  const trackNumber = query.track as string;

  if (!content) {
    return <ErrorPage statusCode={404} />;
  }

  const headerBreadcrumbs = [
    {
      linkProps: {
        href: "/albums"
      },
      children: "Albums",
      layoutId: "albumsTitle"
    },
    {
      linkProps: {
        href: "/albums/[album]",
        as: `/albums/${albumSlug}`
      },
      children: meta.album,
      layoutId: `${albumSlug}_title`
    }
  ];

  const headerTitleProps = {
    layoutId: meta.title,
    "data-index": `${trackNumber}.`,
    css: titleCSS
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={headerBreadcrumbs}
        imageLinkProps={{ href: "/albums/[album]", as: `/albums/${albumSlug}` }}
        imagePath={`/albums/${albumSlug}/cover.jpg`}
        title={meta.title}
        titleProps={headerTitleProps}
      />

      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </div>
  );
};

export default Track;
