import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Link to the Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Theme color used by the browser’s UI */}
        <meta name="theme-color" content="#0070f3" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
