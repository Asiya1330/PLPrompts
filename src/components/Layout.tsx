import Head from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <div className="relative">
        <div className="absolute opacity-10 left-0 top-0 w-full h-full bg-[url('/back.jpeg')] bg-cover bg-center bg-no-repeat overflow-hidden" />
        <div className="relative flex flex-col min-h-screen overflow-hidden">
          <Header />
          <div className="grow flex flex-col">{children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
}
