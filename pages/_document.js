import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang='fa' dir='rtl'>
        <Head>
          <link
            rel='preload'
            href='/fonts/vazir/Vazir.woff2'
            as='font'
            crossOrigin='anonymous'
          ></link>
          <link rel='icon' href='/mini-logo.ico' />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
