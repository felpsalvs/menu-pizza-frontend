import styles from './styles.module.scss';

export function Button() {
    return (
        <button className={styles.button}>
            <a className={styles.buttonText}>Nome do botão</a>
        </button>
    );
    }