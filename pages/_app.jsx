import React from "react";
import { Provider } from "react-redux";

import PrivateLayout from "../components/Layout/PrivateLayout";

import { useStore } from "../redux/store";
import "../sass/styles.scss";

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps, router }) {
  // eslint-disable-next-line react/prop-types
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      {router.pathname === "/" ? (
        <Component {...pageProps} />
      ) : (
        <PrivateLayout routerName={router.pathname} >
          <Component {...pageProps} />
          <style global jsx>{`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div {
              height: 100%;
            }
          `}</style>
        </PrivateLayout>
      )}
    </Provider>
  );
}

export default MyApp;
