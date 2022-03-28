import Head from 'next/head'
import Featured from '../component/Featured'
import CakeList from '../component/CakeList'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peterson's Cake</title>
        <meta name="description" content="The best online cake shop in Abuja. Your favorite cakes delivered to your doorstep just in time for your celebrations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <CakeList />
    </div>
  )
}
