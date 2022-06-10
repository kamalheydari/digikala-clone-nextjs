import "/styles/globals.css";

import { Layout } from "components";

//? store
import { store } from "app/store";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }) {
  //? Lyout Config
  if (Component.getLayout) {
    return Component.getLayout(
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  );
}
