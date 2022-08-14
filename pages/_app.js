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
  RefreshTokenHandler,
  Modal,
  PageLoading,
  ErrorBoundary,
  Alert,
} from "components";
import { fetchCategories } from "app/slices/category.slice";

export default function MyApp({ Component, pageProps }) {
  //? Fix Hydration failed & fetch Categories
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);

    store.dispatch(fetchCategories());
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
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <RefreshTokenHandler />
          <Modal />
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
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <RefreshTokenHandler />
          <Modal />
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
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <RefreshTokenHandler />
          <Modal />
          <Alert />
        </ProfileLayout>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <PageLoading />
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <Modal />
      <Alert />
    </Provider>
  );
}
