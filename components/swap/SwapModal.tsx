import React, { FC } from 'react';
import { ConnextModal } from '@connext/vector-modal';

type SwapModalProps = {
  showModal: boolean;
  transferAmount?: string;
  loginProvider?: any;
  onClose: () => void;
  onReady?: (params: {
      depositChannelAddress: string;
      withdrawChannelAddress: string;
  }) => any;
  onSwap?: (inputSenderAmountWei: string, node: any) => Promise<void>;
  onDepositTxCreated?: (txHash: string) => void;
  onFinished?: (txHash: string, amountWei: string) => void;
  generateCallData?: (toWithdraw: string, toAssetId: string, node: BrowserNode) => Promise<{
      callData?: string;
  }>;
};

const SwapModal: FC<SwapModalProps> = ({
  loginProvider,
  showModal,
  onReady,
  onClose,
}) => (
  <div className="swap-modal-wrapper">
    <ConnextModal
      loginProvider={loginProvider}
      showModal={showModal}
      onReady={onReady}
      onClose={onClose}
      withdrawalAddress={process.env.WITHDRAWALADDRESS}
      routerPublicIdentifier={process.env.ROUTERPUBLICIDENTIFIER}
      depositAssetId={process.env.DEPOSITASSETID}
      depositChainProvider={process.env.DEPOSITCHAINPROVIDER}
      withdrawAssetId={process.env.WITHDRAWASSETID}
      withdrawChainProvider={process.env.WITHDRAWCHAINPROVIDER}
    />
  </div>
);

export default SwapModal;
