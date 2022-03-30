import Head from 'next/head'
import axios from 'axios'
import Featured from '../component/Featured'
import CakeList from '../component/CakeList'
import styles from '../styles/Home.module.css'

export default function Home({cakeList}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Peterson's Cake</title>
        <meta name="description" content="The best online cake shop in Abuja. Your favorite cakes delivered to your doorstep just in time for your celebration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <CakeList cakeList={cakeList}/>
    </div>
  )
}

export const getServerSideProps = async () => {
  // const myCookie = ctx.req?.cookies || "";
  // let admin = false;

  // if (myCookie.token === process.env.TOKEN) {
  //   admin = true;
  // }

  const res = await axios.get("http://localhost:3000/api/products");
  console.log(res);
  return {
    props: {
      cakeList: res.data,
      // admin,
    },
  };
};

