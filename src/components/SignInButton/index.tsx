import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton(){
    const [session] = useSession();
    return session ? (
        <button 
            onClick={() => signOut()}
            className={styles.signInButton}
            type="button"
        >
            <img 
                src={session.user.image} 
                alt={session.user.name} 
            /> 
            {session.user.name} 
            <FiX
                className={styles.closeIcon} 
                color="#737380"
            />
        </button>
    ):(
        <button 
            onClick={() => signIn('github')}
            className={styles.signInButton}
            type="button"
        >
            <FaGithub color="#EBA417"/> 
            Sign in with Github
        </button>
    )
}