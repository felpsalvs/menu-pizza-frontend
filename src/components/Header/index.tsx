import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";


export function Header() {
    const { signOut } = useContext(AuthContext);

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <Image className={styles.logo} src="/logo.svg" alt="Pizzaria" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category">
            <a>Categoria</a>
          </Link>
          <Link href="/product">
            Cardapio
          </Link>

          <button onClick={signOut}>
            <FiLogOut color="fff" size={24} />
          </button>
        </nav>
      </div>
    </header>
  );
}
