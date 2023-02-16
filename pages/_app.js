import "../styles/globals.css";
import Menu from "../components/menu";
import { ThemeProvider } from "next-themes";
import Background from "../components/background";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class' value={{ dark: "dark-theme" }}>
      <>
        <Component {...pageProps} />
        <Menu />
        <Background />
        <Menu />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
