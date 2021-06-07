import { GetStaticProps } from 'next'
import Head from 'next/head'

import styles from './home.module.scss'

import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'

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

// JAMStack = Menor dependência de um backend
// Javascript = Funcionalidades da aplicação
// API = API de terceiros (Fauna, CMS)
// Markup = HTML (Estrutura da página)

// CMS (Content Management System)
// - Wordpress
// - Drupal (caiu em desuso)
// - Joomla (caiu em desuso)
// - Magento (pouco recomendado)

// HEADLESS CMS (Não possui a parte visual, possuem apenas o painel de administração 
//   e todos os seus dados são servidos através de uma API HTTP, GraphQL ou SDK )

// Grátis
// - Strapi (Qualquer conteúdo)
// - Ghost (Blog)
// - Keystone (Qualquer conteúdo)

// Pagos
// - GraphCMS
// - Prismic CMS 
// - Contentful

// Para e-commerce
// - Shopify
// - Saleor


// CLIENT-SIDE = É o ideal na maioria das vezes, a não ser que haja
// a necessidade de já trazer os dados e o HTML montados, geralmente necessários
// por conta dos motores de buscas(crowlers) que normalmente fazem essa "varredura"
// com o JAVASCRIPT desativado, ou quando essa chamada é altamente custosa, dai podemos
// já trazer os dados de forma estática.

// SSR = SERVER-SIDE RENDERING
// Permite buscar dados no backend e montar a pagina HTML ainda neste backend antes 
// de renderizar no browser
// A vantagem é conseguimos visualizar o conteúdo da página (renderizar os dados da 
//   api) mesmo com o javascript desativado

// SSG = STATIC SITE GENERATION
// Tem praticamente as mesmas funcionalidades do SSR, porém, seu diferencial é guardar
// uma versão do HTML gerado e retornar este mesmo HTML(estático) sem precisar fazer uma nova 
// consulta à API, reduzindo o custo de processamento e o tempo de resposta do backend.

// Os dados podem ser revalidados de acordo com o prazo que definirmos no campo revalidate
// Esta opção é interessante no momento de renderizar dados comuns aos usuários, caso 
// a consulta tenha de retornar uma informação específica de cada usuário, o SSG não serve, pois 
// só será feita uma nova consulta à API de acordo com o prazo definido no revalidate

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
    revalidate: 24 * 60 * 60 // 24 hours
  }
}
