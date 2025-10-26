// pages/_app.tsx - UPDATED
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Cine Seek - Discover and explore movies" />
        <title>Cine Seek - Movie Discovery</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}