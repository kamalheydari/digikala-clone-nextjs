import { useEffect, useState } from "react";

import "/styles/globals.css";
import "/styles/scrollbar.css";

//? Store
import { store } from "app/store";
import { Provider } from "react-redux";

//? Layouts & Components
import {
  DashboardLayout,
  ClientLayout,
  ProfileLayout,
  ValidationToken,
  PageLoading,
  Alert,
} from "components";

import { fetchCategories } from "app/slices/category.slice";
import { fetchUser } from "app/slices/user.slice";

import Cookies from "js-cookie";

export default function MyApp({ Component, pageProps }) {
  //? Fix Hydration failed & fetch Categories & fetch user
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);

    store.dispatch(fetchCategories());

    if (Cookies.get("token")) store.dispatch(fetchUser());
  }, []);

  if (!showChild) {
    return null;
  }

  //? Lyout Config
  if (Component.getClientLayout) {
    return Component.getClientLayout(
      <Provider store={store}>
        <ClientLayout>
          <PageLoading />
          <Component {...pageProps} />
          <ValidationToken />
          <Alert />
        </ClientLayout>
      </Provider>
    );
  }

  //? Lyout Config
  if (Component.getDashboardLayout) {
    return Component.getDashboardLayout(
      <Provider store={store}>
        <DashboardLayout>
          <PageLoading />
          <Component {...pageProps} />
          <ValidationToken />
          <Alert />
        </DashboardLayout>
      </Provider>
    );
  }
  //? Lyout Config
  if (Component.getProfileLayout) {
    return Component.getProfileLayout(
      <Provider store={store}>
        <ProfileLayout>
          <PageLoading />
          <Component {...pageProps} />
          <ValidationToken />

          <Alert />
        </ProfileLayout>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PageLoading />
      <Component {...pageProps} />
      <Alert />
    </Provider>
  );
}
