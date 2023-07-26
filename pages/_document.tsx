import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='fa' dir='rtl'>
        <Head>
          <link
            rel='preload'
            href='/fonts/vazir/Vazirmatn-Light-300.woff2'
            as='font'
            crossOrigin='anonymous'
          ></link>

          <link
            rel='preload'
            href='/fonts/vazir/Vazirmatn-Regular-400.woff2'
            as='font'
            crossOrigin='anonymous'
          ></link>

          <link
            rel='preload'
            href='/fonts/vazir/Vazirmatn-Medium-500.woff2'
            as='font'
            crossOrigin='anonymous'
          ></link>

          <link
            rel='preload'
            href='/fonts/vazir/Vazirmatn-SemiBold-600.woff2'
            as='font'
            crossOrigin='anonymous'
          ></link>

          <link
            rel='preload'
            href='/fonts/vazir/Vazirmatn-Bold-700.woff2'
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
    )
  }
}

export default MyDocument
