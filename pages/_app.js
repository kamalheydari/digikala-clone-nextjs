import { useEffect, useState } from "react";

import "/styles/globals.css";

import { ClientLayout, ProfileLayout } from "components";

//? Store
import { store } from "app/store";
import { Provider } from "react-redux";

//? Layouts
import { DashboardLayout, RefreshTokenHandler } from "components";


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
  if (Component.getClientLayout) {
    return Component.getClientLayout(
      <Provider store={store}>
        <ClientLayout>
          <Component {...pageProps} />
          <RefreshTokenHandler />
        </ClientLayout>
      </Provider>
    );
  }

  //? Lyout Config
  if (Component.getDashboardLayout) {
    return Component.getDashboardLayout(
      <Provider store={store}>
        <DashboardLayout>
          <Component {...pageProps} />
          <RefreshTokenHandler />
        </DashboardLayout>
      </Provider>
    );
  }
  //? Lyout Config
  if (Component.getProfileLayout) {
    return Component.getProfileLayout(
      <Provider store={store}>
        <ProfileLayout>
          <Component {...pageProps} />
          <RefreshTokenHandler />
        </ProfileLayout>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
