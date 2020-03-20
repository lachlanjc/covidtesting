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
  </Head>
)
