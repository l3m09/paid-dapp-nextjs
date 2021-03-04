import React, { FC } from 'react'
import { Modal, ModalHeader } from 'reactstrap'
import ButtonCloseModal from '../reusable/ButtonCloseModal'

interface DetailAgreementModalProps {
  open: boolean;
  onClose: any;
}

const AgreementDetailModal: FC<DetailAgreementModalProps> = ({
  open,
  onClose,
}: DetailAgreementModalProps) => (
  <Modal
    isOpen={open}
    toggle={() => onClose()}
    className="template-agreement-selector-modal"
  >
    <ModalHeader
      toggle={() => onClose()}
      close={<ButtonCloseModal onClick={() => onClose()} />}
    >
      <h5>Consulting Agreement Details::</h5>
    </ModalHeader>
  </Modal>
)

export default AgreementDetailModal
