import NextApp from "next/app";
import Head from "next/head";
import { withRouter } from "next/router";
import { createGlobalStyle } from "styled-components";
// @ts-ignore
import { AnimateSharedLayout } from "framer-motion";

import { AppHeader, Footer, MainWrap } from "@/components";

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    background: #fff;
    color: #000;
  }

  * {
    box-sizing: border-box;
  }
`;

class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps, router } = this.props;
    const { album } = router.query;

    const isHome = router.route === "/";
    const isAlbum = !!album;
    const headerBackground = !isAlbum
      ? "/images/hero-bg.jpg"
      : `/albums/${album}/cover.jpg`;

    return (
      <>
        <Head key="fallbackHead">
          <title>The Slackers Chords</title>
        </Head>
        <GlobalStyles />

        <AppHeader
          isHome={isHome}
          isAlbum={isAlbum}
          background={headerBackground}
        />
        <MainWrap>
          <AnimateSharedLayout>
            <Component {...pageProps} />
          </AnimateSharedLayout>

          <Footer />
        </MainWrap>
      </>
    );
  }
}

export default withRouter(App);
