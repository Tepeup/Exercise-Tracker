import Head from "next/head";
import styles from "../styles/Home.module.css";
import ChartContainer from "../components/ChartContainer";
import Calendar from "../components/Calendar";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Workout Tracker Yearly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Dashboard />
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  );
}
