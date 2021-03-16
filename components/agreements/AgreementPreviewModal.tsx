import React, { FC } from 'react';
import { Button } from 'reactstrap';
import {
  PdModal,
  PdModalBody,
  PdModalHeader,
  PdModalFooter,
} from '@/pdComponents';
import TemplateComponent from 'react-mustache-template-component';
import styles from './AgreementPreviewModal.module.scss';

interface AgreementPreviewModalProps {
  open: boolean;
  onClose: any;
  fileString: string;
}

const AgreementPreviewModal: FC<AgreementPreviewModalProps> = ({
  open,
  onClose,
  fileString,
}: AgreementPreviewModalProps) => (
  <PdModal isOpen={open} className={styles.modalPreview}>
    <PdModalHeader toggle={onClose} title="Template: " />
    <PdModalBody className={styles.modalBody}>
      <TemplateComponent template={fileString} />
    </PdModalBody>
    <PdModalFooter>
      <Button color="link" onClick={onClose} />
    </PdModalFooter>
  </PdModal>
);

export default AgreementPreviewModal;
