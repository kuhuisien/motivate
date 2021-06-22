import "../styles/globals.css";
import { Layout } from "antd";
import AppNavigationBar from "../components/AppNavigationBar/AppNavigationBar";
import App, { AppProps } from "next/app";
import { initializeFirebase } from "lib/firebase/setup";
import { Provider as NexthAuthProvider } from "next-auth/client";
import withRedux from "next-redux-wrapper";
import { makeStore } from "lib/redux/store/root/store";
import { Provider } from "react-redux";

initializeFirebase();

const { Header, Content } = Layout;

type Props = AppProps & { store: any };

function MyApp({ Component, pageProps, store }: Props) {
  return (
    <Provider store={store}>
      <NexthAuthProvider session={pageProps.session}>
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
