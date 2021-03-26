import React from "react";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

import { Button } from "reactstrap";
import { useDispatch } from "react-redux";
import doConnectToWallet from "../redux/actions/wallet";

const Index: React.FC = () => {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();

  const onConnect = async () => {
    const providerOptions = {
      walletconnect: {
        display: {
          logo:
            "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgY2xhc3M9InNjLXBraElSIGhnRUNmUyI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iOCIgZmlsbD0iI2ZjNmU3NSI+PC9yZWN0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzFlMjAyNiIgc3R5bGU9ImZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtZmFtaWx5OkJpbmFuY2VQbGV4LCAtYXBwbGUtc3lzdGVtLCAmI3gyNzsuU0ZOU1RleHQtUmVndWxhciYjeDI3OywgJiN4Mjc7U2FuIEZyYW5jaXNjbyYjeDI3OywKQmxpbmtNYWNTeXN0ZW1Gb250LCAmI3gyNzsuUGluZ0ZhbmctU0MtUmVndWxhciYjeDI3OywgJiN4Mjc7TWljcm9zb2Z0IFlhSGVpJiN4Mjc7LCAmI3gyNztTZWdvZSBVSSYjeDI3OywgJiN4Mjc7SGVsdmV0aWNhIE5ldWUmI3gyNzssCkhlbHZldGljYSwgQXJpYWwsIHNhbnMtc2VyaWYiPkE8L3RleHQ+PC9zdmc+",
          name: "Binance Chain Wallet",
          description: "Connect to your Binance Wallet",
        },
        package: WalletConnectProvider,
        options: {
          rpc : {
            56: "https://bsc-dataseed1.defibit.io",
          },
          chainId: 56
          // infuraId: "bce97999b34a4b759ca27229313f96ec", // TODO: set as env variable
          // network: 56,
          // networkId: 88,
        },
      },
    };

    const web3Modal = new Web3Modal({
      //network: "mainnet", // optional
      cacheProvider: false, // optional
      providerOptions, // required
    });

    web3Modal.clearCachedProvider();
    const provider = await web3Modal.connect();
    const addresses = await provider.enable();

    // dispatch(doConnectToWallet(router));
  };

  return (
    <>
      <Head>
        <title>Paid-Dapp</title>
        <link rel="icon" href="/assets/icon/.ico" />
      </Head>
      <div className="index m-0 p-0 container-fluid">
        <div className="row h-100  justify-content-center align-items-center">
          <div className="col-12 text-center">
            <img
              className="logo d-block mx-auto pb-4"
              src="/assets/images/logo.png"
              alt=""
            />
            <Button color="danger" onClick={() => onConnect()}>
              Connect to Wallet
            </Button>
            <p className="info mt-4">
              By continuing you agree to our{" "}
              <span className="text-danger">T&#38;Cs</span>. We use your data to
              offer you a personalized experience.{" "}
              <span className="text-danger">Find out more</span>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
