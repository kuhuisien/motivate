import "../styles/globals.css";
import { Layout } from "antd";
import AppNavigationBar from "../components/AppNavigationBar/AppNavigationBar";
import type { AppProps } from "next/app";
import { initializeFirebase } from "lib/firebase/setup";

initializeFirebase();

const { Header, Content } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header className="header">
        <AppNavigationBar />
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
    </Layout>
  );
}

export default MyApp;
