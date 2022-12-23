import type { AppProps } from "next/app";
import "../../styles/globals.scss";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";
import { useScreenSize } from "react-screen-size-helper";

export default function App({ Component, pageProps }: AppProps) {
  const breakpoints = {
    small: 500,
    medium: 800,
    large: 1600,
  };

  const {
    isMobile,
    isTablet,
    isDesktop,
    currentHeight,
    currentWidth,
    isLargeDesktop,
  } = useScreenSize({breakpoints});
  return (
      <>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    <p>Current height: {currentHeight}</p>
    <p>Current width: {currentWidth}</p>
    {isMobile && <p>Mobile</p>}
    {isTablet && <p>Tablet</p>}
    {isDesktop && <p>Desktop</p>}
    {isLargeDesktop && <p>Large Desktop</p>}
  </>
  );
}
