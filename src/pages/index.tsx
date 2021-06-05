import { GetServerSideProps } from 'next'
import Head from 'next/head'

import styles from './home.module.scss'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'


export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>Get access to all the publications <br/>
            <span>for $ 9.90 month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe
  
  return {
    props: {
      name: "Gleydson"
    }
  }
}
