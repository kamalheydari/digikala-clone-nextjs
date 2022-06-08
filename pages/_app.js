import "/styles/globals.css";

import { Toaster } from "react-hot-toast";

//? store
import { store } from "app/store";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster
        position='top-right'
        toastOptions={{ style: { fontSize: "1rem" } }}
      />
    </Provider>
  );
}
