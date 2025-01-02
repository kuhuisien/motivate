import "../styles/globals.css";
import { Layout } from "antd";
import AppNavigationBar from "../components/AppNavigationBar/AppNavigationBar";
import { AppProps } from "next/app";
import { initializeFirebase } from "lib/firebase/setup";
import { SessionProvider as NexthAuthProvider } from "next-auth/react";
import withRedux from "next-redux-wrapper";
import { makeStore } from "lib/redux/root/store";
import { Provider } from "react-redux";
import Head from "next/head";

initializeFirebase();

const { Header, Content } = Layout;

type Props = AppProps & { store: any };

function MyApp({ Component, pageProps, store }: Props) {
  return (
    <Provider store={store}>
      <Head>
        <title>Aspiro</title>
        <meta name="description" content="Set goals and stay motivated." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NexthAuthProvider session={pageProps?.session}>
        <Layout>
          <Header className="header">
            <AppNavigationBar />
          </Header>
          <Content>
            <Component {...pageProps} />
          </Content>
        </Layout>
      </NexthAuthProvider>
    </Provider>
  );
}

export default withRedux(makeStore, {
  debug: false,
})(MyApp);
