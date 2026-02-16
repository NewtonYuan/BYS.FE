import type { AppProps } from "next/app";
import Head from "next/head";
import "@/app/globals.css";
import icon from "@/app/icon.png";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Before You Sign</title>
        <meta
          name="description"
          content="Free Contract Analyzer, Check for Contract Traps, Understand what you're Signing."
        />
        <link rel="icon" href={icon.src} />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
