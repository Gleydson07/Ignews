import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface ISubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: ISubscribeButtonProps){
    const router = useRouter();
    const [session] = useSession()

    async function handleSubscribe(){
        if(!session){
            signIn('github');
            return
        }

        if(session?.activeSubscription) {
            router.push('/posts')
        
            return
        }

        try {
            const response = await api.post('/subscribe');

            const { sessionId } = response.data;

            const stripe = await getStripeJs();

            await stripe.redirectToCheckout({sessionId});
        }catch(err){
            alert(err.message);
        }
    }
    return (
        <button
            onClick={() => handleSubscribe()}
            className={styles.subscribeButton}
            type="button"
        >
            Subscribe now
        </button>
    )
}