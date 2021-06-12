import "../styles/globals.css";
import { Layout } from "antd";
import AppNavigationBar from "../components/AppNavigationBar/AppNavigationBar";
import App, { AppProps } from "next/app";
import { initializeFirebase } from "lib/firebase/setup";
import { Provider } from "next-auth/client";

initializeFirebase();

const { Header, Content } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Header className="header">
          <AppNavigationBar />
        </Header>
        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </Provider>
  );
}

// MyApp.getInitialProps = async (
//   appContext: AppContext,
//   res: NextApiResponse
// ) => {
//   const appProps = await App.getInitialProps(appContext);
//   const req = appContext.ctx.req;
//   const session = await getSession({ req });
//   console.log(session);
//   console.log(appContext.router.route);

//   const currentRoute = appContext.router.route;
//   if (session) {
//     if (publicRoutes.includes(currentRoute)) {
//       appContext.ctx.res?.writeHead(302), { Location: routes.home };
//     }
//   }

//   return {
//     pageProps: {
//       ...appProps.pageProps,
//     },
//   };
// };

export default MyApp;
