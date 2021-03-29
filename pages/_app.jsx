import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider, useSelector, useDispatch } from "react-redux";
import { useWallet, UseWalletProvider } from "use-wallet";
import {
  BscConnector,
  UserRejectedRequestError,
} from "@binance-chain/bsc-connector";

import PrivateLayout from "../components/Layout/PrivateLayout";
import { setCurrentWallet, doDisconnected,  } from "../redux/actions/wallet";
import { useStore } from "../redux/store";
import "../sass/styles.scss";

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps, router }) {
  // eslint-disable-next-line react/prop-types
  const store = useStore(pageProps.initialReduxState);

  const ConnectOptions = () => {
    const wallet = useWallet();
    const { account, connect, reset, status } = useWallet();

    const dispatch = useDispatch();
    const router = useRouter();
    const walletReducer = useSelector((state) => state.walletReducer);

    useEffect(() => {
      if (walletReducer.provider) {
        if (walletReducer.provider === "meta") {
          wallet.connect();
        } else {
          connect(walletReducer.provider);
        }
      }
    }, [walletReducer.provider]);

    useEffect(() => {
      if (!walletReducer.currentWallet && account && !walletReducer.isDisconnecting  ) {
        dispatch(setCurrentWallet(account, router));
      }
    }, [account, !walletReducer.currentWallet]);

    useEffect(() => {
      if (walletReducer.isDisconnecting) {
        reset();
        dispatch(doDisconnected());
        router.push("/");
      }
    }, [account, walletReducer.isDisconnecting]);

    // useEffect(() => {
    //   return () => {
    //     dispatch(doDisconnect());
    //   };
    // }, []);

    return (
      <>
        {router.pathname === "/" ? (
          <Component {...pageProps} />
        ) : (
          <PrivateLayout routerName={router.pathname}>
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
      </>
    );
  };

  return (
    <Provider store={store}>
      <UseWalletProvider
        connectors={{
          bsc: {
            web3ReactConnector() {
              return new BscConnector({ supportedChainIds: [56, 97] });
            },
            handleActivationError(err) {
              if (err instanceof UserRejectedRequestError) {
                return new ConnectionRejectedError();
              }
            },
          }
        }}
      >
        <ConnectOptions />
      </UseWalletProvider>
    </Provider>
  );
}

export default MyApp;
