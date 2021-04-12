import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { NextRouter, useRouter } from 'next/router';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import ConnectSelectorModal from '@/components/connect/ConnectSelectorModal';
import doConnectToWallet from '../redux/actions/wallet';
import { ConnextModal } from "@connext/vector-modal";


const Index: React.FC = () => {
  const router: NextRouter = useRouter();
  const dispatch = useDispatch();

  const [showModalConnext, setShowModalConnext] = useState(false);

  const [openConnectSelector, setOpenConnectSelector] = useState(false);

  const [ether,setEther] = useState(null)

  useEffect(()=>{
    window.ethereum.enable();
    setEther(window.ethereum)
  },[])

  const onConnect = (optionSelected) => {
    dispatch(doConnectToWallet({ router, scenarioCode: optionSelected }));
    setOpenConnectSelector(false);
  };

  const onOpenConnectSelector = () => {
    //setOpenConnectSelector(true);
    setShowModalConnext(true);

  };

  const onCloseConnectSelector = () => {
    setOpenConnectSelector(false);
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
            <Button color="danger" onClick={() => onOpenConnectSelector()}>
              Use Connext
            </Button>
            <p className="info mt-4">
              By continuing you agree to our
              {' '}
              <span className="text-danger">T&#38;Cs</span>
              . We use your data to
              offer you a personalized experience.
              {' '}
              <span className="text-danger">Find out more</span>
              .
            </p>
          </div>
        </div>
        <ConnectSelectorModal
          open={openConnectSelector}
          onClose={onCloseConnectSelector}
          onConnect={onConnect}
        />


        <ConnextModal
          loginProvider={ether}
          showModal={showModalConnext}
          onClose={() => setShowModalConnext(false)}
          onReady={(params) => console.log("MODAL IS READY =======>", params)}
          withdrawalAddress={"0xaCf5ABBB75c4B5bA7609De6f89a4d0466483225a"}
          routerPublicIdentifier="vector6qeYVCr9gXGTdspU35isiu5TZ2pVPEYssQovJdTqFcMSxKsy5c"
          depositAssetId={"0xB4a04eCF1855FBccf5C770BA6DB1dde7c96b17Be"}
          depositChainProvider="https://rinkeby.infura.io/v3/bce97999b34a4b759ca27229313f96ec"
          withdrawAssetId={"0xc825e75837a3f10e6cc7bda1b85eaac572ac3b8d"}
          withdrawChainProvider="https://data-seed-prebsc-1-s1.binance.org:8545"
        />

        
      </div>

      
    </>
  );
};

export default Index;
