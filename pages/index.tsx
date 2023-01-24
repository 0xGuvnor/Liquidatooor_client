import type { NextPage } from "next";
import Head from "next/head";
import AccountDetails from "../components/AccountDetails";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LiquidationCard from "../components/LiquidationCard";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LiquidatooOr - Liquidation Tool for Aave</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="w-full px-4 mx-auto lg:max-w-7xl xl:px-8">
        <AccountDetails />
        <LiquidationCard />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
