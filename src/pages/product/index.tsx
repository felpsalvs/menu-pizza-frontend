import Head from "next/head";
import styles from "./styles.module.scss";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { Header } from "../../components/Header";

export default function Product() {
  return (
    <>
      <Head>
        <title>Produto | Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Produto</h1>
          <form className={styles.form}>
            <select>
              <option value="0">Selecione uma categoria</option>
              <option value="0">Selecione uma categoria</option>
            </select>
            <input
              type="text"
              placeholder="Nome do produto"
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Descrição do produto"
              className={styles.input}
            />

            <textarea placeholder="Ingredientes" className={styles.input} />

            <button className={styles.buttonAdd} type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
