import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss'
import { sign } from 'crypto';

export function SignInButton(){
    const [session] = useSession();
    const username = session?.user.name;
    const avatar = session?.user.image;

    return !session ? (
        <button 
            onClick={() => signIn('github')}
            className={styles.signInButton}
            type="button"
        >
            <FaGithub color="#EBA417"/> 
            Sign in with Github
        </button>
    ):(
        <button 
            onClick={() => signOut()}
            className={styles.signInButton}
            type="button"
        >
            <img 
                src={avatar} 
                alt={username} 
            /> 
            {username}
            <FiX
                className={styles.closeIcon} 
                color="#737380"
            />
        </button>
    )
}