import { canSSRAuth } from "../../utils/canSSRAuth";
import { useState } from "react";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";

type OrderProps = {
    id: string;
    table: string | number;
    status: boolean;
    draft: boolean;
    name: string | null;
}

interface HomeProps {
    orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {
    const [ordersList, setOrdersList] = useState(orders || []);

    function handleOpenModalView(id: string) {
        console.log(id);
    }

  return (
    <>
      <Head>
        <title>Dashboard | Pizzaria</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3afffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>

            {ordersList.map( item => (
            <section key={item.id} className={styles.orderItem}>
              <button onClick={() => handleOpenModalView(item.id)}>
                <div className={styles.tag}></div>
                <span>{item.table}</span>
              </button>
            </section>
            ))}
          </article>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/prders");

  return {
    props: {
        orders: response.data,
    },
  };
});
