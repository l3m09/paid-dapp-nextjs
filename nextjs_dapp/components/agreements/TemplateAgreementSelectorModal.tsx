import React, { FC } from 'react'
import { Modal, ModalHeader } from 'reactstrap'
import ButtonCloseModal from '../reusable/ButtonCloseModal'

interface TemplateAgreementSelectorModalProps {
  open: boolean;
  onClose: any;
}

const TemplateAgreementSelectorModal: FC<TemplateAgreementSelectorModalProps> = ({
  open,
  onClose,
}: TemplateAgreementSelectorModalProps) => (
  <Modal
    isOpen={open}
    toggle={() => onClose()}
    className="template-agreement-selector-modal"
  >
    <ModalHeader
      toggle={() => onClose()}
      close={<ButtonCloseModal onClick={() => onClose()} />}
    >
      <h5>Select Template to Create an Agreement:</h5>
    </ModalHeader>
  </Modal>
)

export default TemplateAgreementSelectorModal
