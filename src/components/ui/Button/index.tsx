import { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

import { FaSpinner } from 'react-icons/fa'
import Link from 'next/link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
  children: ReactNode,
}

export function Button({ loading, children, ...rest }: ButtonProps){
  return(
    <button 
    className={styles.button}
    disabled={loading}
    {...rest}
    >
      { loading ? (
        <FaSpinner color="#FFF" size={16} />
      ) : (
        <Link className={styles.buttonText} href={''}>
          {children}
        </Link>
      )}
    </button>
  )
}