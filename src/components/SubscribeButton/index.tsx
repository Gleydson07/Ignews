import { signIn, useSession } from 'next-auth/client';
import React from 'react';
import styles from './styles.module.scss'

interface ISubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: ISubscribeButtonProps){
    const [session] = useSession()

    function handleSubscribe(){
        if(!session){
            signIn('github');
            return
        }

        
    }
    return (
        <button
            className={styles.subscribeButton}
            type="button"
        >
            Subscribe now
        </button>
    )
}