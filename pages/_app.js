import "../styles/globals.css";
import { Layout } from "antd";
import AppNavigationBar from "../components/AppNavigationBar/AppNavigationBar";

const { Header, Content } = Layout;

function MyApp({ Component, pageProps }) {
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
