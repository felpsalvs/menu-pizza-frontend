
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


export default function Dashboard() {
    const { signOut } = useContext(AuthContext);
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={signOut}>Sair</button>
        </>
    )
}