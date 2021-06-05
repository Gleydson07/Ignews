import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton(){
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true) 

    return !isUserLoggedIn ? (
        <button 
            className={styles.signInButton}
            type="button"
        >
            <FaGithub color="#EBA417"/> 
            Sign in with Github
        </button>
    ):(
        <button 
            className={styles.signInButton}
            type="button"
        >
            <FaGithub color="#04B361"/> 
            Gleydson Albuquerque
            <FiX
                className={styles.closeIcon} 
                color="#737380"
            />
        </button>
    )
}