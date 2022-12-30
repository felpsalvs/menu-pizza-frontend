import { canSSRAuth } from '../../utils/canSSRAuth';
import { AuthContext } from '../../contexts/AuthContext';
import Head from 'next/head';
import { useContext } from 'react';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';


export default function Dashboard() {
    const { signOut } = useContext(AuthContext);
    return (
        <>
            <Head>
                <title>Dashboard | Pizzaria</title>
            </Head>
            <div>
                <Header />
            <h1>Dashboard</h1>
            <button onClick={signOut}>Sair</button>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})