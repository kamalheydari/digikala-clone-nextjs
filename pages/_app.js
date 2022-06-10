import "/styles/globals.css";

import { Layout } from "components";

//? store
import { store } from "app/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }) {

//? Fix Hydration failed
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  
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
