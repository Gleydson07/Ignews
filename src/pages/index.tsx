import { GetStaticProps } from 'next'
import Head from 'next/head'

import styles from './home.module.scss'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import { browser } from 'process'

interface IHomeProps {
  product: {
    priceId: string;
    amount: string;
  }
}


export default function Home({product}: IHomeProps) {
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
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// SSR = SERVER-SIDE RENDERING
// Permite buscar dados no backend e montar a pagina HTML ainda neste backend antes 
// de renderizar no browser
// A vantagem é conseguimos visualizar o conteúdo da página (renderizar os dados da 
//   api) mesmo com o javascript desativado

// SSG = STATIC SITE GENERATION
// Tem praticamente as mesmas funcionalidades do SSR, porém, seu diferencial é guardar
// uma versão do HTML gerado e retornar este mesmo HTML sem precisar fazer uma nova 
// consulta à API, reduzindo o custo de processamento e o tempo de resposta do backend.
// Os dados podem ser revalidados de acordo com o prazo que definirmos no campo revalidate

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Iz7R1Fvt9vVC1qeGXNO7D6p');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format((price.unit_amount/100)),
  }

  return {
    props: {
      product
    },
    revalidate: 24 * 60 * 60 //24 hrs
  }
}
