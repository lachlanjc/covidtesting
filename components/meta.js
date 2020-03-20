import Head from 'next/head'

export default ({
  title = 'COVID-19 Testing in the U.S.',
  description = 'A',
  // image = 'https://testing.predictcovid.com/card.png',
  url = 'https://testing.predictcovid.com/'
}) => (
  <Head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="twitter:title" content={title} />
    <meta name="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Predict COVID-19" />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta name="twitter:description" content={description} />
    {/* <meta property="og:image" content={image} /> */}
    {/* <meta name="twitter:card" content="summary_large_image" /> */}
    {/* <meta name="twitter:image" content={image} /> */}
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="https://predictcovid.com/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="https://predictcovid.com/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="https://predictcovid.com/favicon-16x16.png"
    />
    <link rel="manifest" href="https://predictcovid.com/site.webmanifest" />
    <link
      rel="mask-icon"
      href="https://predictcovid.com/safari-pinned-tab.svg"
      color="#e55934"
    />
    <meta name="apple-mobile-web-app-title" content="COVID-19" />
    <meta name="application-name" content="COVID-19" />
    <meta name="msapplication-TileColor" content="#e55934" />
    <meta name="theme-color" content="#e55934" />
  </Head>
)
