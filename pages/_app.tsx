import "../styles/globals.css";
import { Layout } from "antd";
import AppNavigationBar from "../components/AppNavigationBar/AppNavigationBar";
import { AppProps } from "next/app";
import { initializeFirebase } from "lib/firebase/setup";
import { SessionProvider as NexthAuthProvider } from "next-auth/react";
import withRedux from "next-redux-wrapper";
import { makeStore } from "lib/redux/root/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Head from "next/head";
import { useRef } from "react";
import { AppStore } from "lib/redux/root/redux.types";

initializeFirebase();

const { Header, Content } = Layout;

type Props = AppProps & { store: any };

function MyApp({ Component, pageProps, store }: Props) {
  const storeRef = useRef<AppStore>();
  const persisterRef = useRef();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    persisterRef.current = makeStore().__persistor;
  }

  return (
    <Provider store={storeRef.current as any}>
      <PersistGate persistor={persisterRef.current as any}>
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
            <Content className="content">
              <Component {...pageProps} />
            </Content>
          </Layout>
        </NexthAuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default withRedux(makeStore, {
  debug: false,
})(MyApp);
