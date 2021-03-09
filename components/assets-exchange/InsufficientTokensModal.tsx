import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Badge,
} from "reactstrap";

interface InsufficientTokensModalProps {
  open: boolean;
  neededTokens: number;
  walletAddress: string;
  currentPaidTokens: number;
  onClose: () => {};
}

const InsufficientTokensModal: FC<InsufficientTokensModalProps> = ({
  open,
  neededTokens,
  walletAddress,
  currentPaidTokens,
  onClose,
}: InsufficientTokensModalProps) => {
  return (
    <Modal isOpen={open}>
      <ModalHeader toggle={onClose}>
        Insufficient BINANCE PAID Tokens
      </ModalHeader>
      <ModalBody>
        <p>
          You need {neededTokens} more to create contract wallet addr:{" "}
          {walletAddress}{" "}
        </p>
        <div>
          <Image
            src="/assets/icon/paidToken.svg"
            alt="paid token icon"
            width={24}
            height={24}
          />
          <span>{currentPaidTokens} PAID</span>{" "}
          <Badge color="warning">BEP20</Badge>
        </div>
        <Link href="/assets-exchange">
          Click here to acquire more BINANCE paid Tokens
        </Link>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onClose}>
          Close
        </Button>{" "}
        <Button color="secondary">Ok</Button>
      </ModalFooter>
    </Modal>
  );
};

export default InsufficientTokensModal;
