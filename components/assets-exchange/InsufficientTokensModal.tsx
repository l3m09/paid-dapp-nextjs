import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'reactstrap';
import {
  PdModal,
  PdModalBody,
  PdModalHeader,
  PdModalFooter,
  PdBadge,
} from '@/pdComponents';
import styles from './InsufficientTokensModal.module.scss';

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
}: InsufficientTokensModalProps) => (
  <PdModal isOpen={open} className={styles.insufficientTokensModal}>
    <PdModalHeader
      toggle={onClose}
      title="Insufficient Binance PAID Tokens"
    />
    <PdModalBody className={styles.modalBody}>
      <div className={styles.mB20}>
        <p className={styles.mainText}>
          You need
          {' '}
          {neededTokens}
          {' '}
          more Binance PAID tokens to create contract
          Wallet addr:
          {' '}
          {walletAddress}
          {' '}
        </p>
      </div>
      <div className={styles.secondarySection}>
        <Image
          src="/assets/icon/paidToken.svg"
          alt="paid token icon"
          width={24}
          height={24}
        />
        <span className={styles.mL5}>
          {currentPaidTokens}
          {' '}
          PAID
        </span>
        <PdBadge color="warning">BEP20</PdBadge>
      </div>
      <div className={styles.mB20}>
        <p>You need to transfer PAID Tokens to asset exchange</p>
      </div>
    </PdModalBody>
    <PdModalFooter>
      <Button color="link" onClick={onClose}>
        Close
      </Button>
      <Link href="/assets-exchange">
        <Button color="danger" onClick={onClose}>
          Transfer PAID
        </Button>
      </Link>
    </PdModalFooter>
  </PdModal>
);

export default InsufficientTokensModal;
