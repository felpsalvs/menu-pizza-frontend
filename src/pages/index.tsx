import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo.svg";

import { Input } from "../components/ui/Input";
import { Button } from "../components/Button";
import Link from "next/link";

export default function Home() {
  return <>
    <Head>
      <title>Pizzaria</title>
    </Head>
    <div className={styles.containerCenter}>
      <Image src={logoImg} alt="Logo" />
      <div className={styles.login}>
        <form>
          <Input placeholder="Digite seu email" type="text" />

          <Input placeholder="Digite sua senha" type="password" />

          <Button
           type="submit"
           loading={true}
          >
            Acessar
            </Button>
        </form>
        <Link href="/signup" className={styles.text}>
        Não possui uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  </>;
}
