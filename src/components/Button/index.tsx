import styles from "./styles.module.scss";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
}

export function Button({ children, loading, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
        {loading ? (
            <FaSpinner color="#fff" size={20} />
        ) : (
      <a className={styles.buttonText}>{children}</a>
        )}
      </button>
  );
}
