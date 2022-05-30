import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { dehydrate, QueryClient, useQuery } from 'react-query';

const fetchData = async () => {
  const res = await axios.get('https://dog.ceo/api/breeds/image/random');
  return res.data
};

export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["fetchData"], 
    () => fetchData()
  );  

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  };
};

const Home: NextPage = () => {
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["fetchData"],
    () => fetchData(),
    {
			refetchOnWindowFocus: false,
			keepPreviousData: true,
		}
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image src={data.message} width={200} height={200} />
      </main>
    </div>
  )
}

export default Home
