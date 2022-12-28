import type { AppProps } from "next/app";
import "../../styles/globals.scss";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  </>
  );
}
