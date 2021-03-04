import React, { FC, Fragment } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap'
import templateAgreements from '../../data/templateAgreements'
import ButtonCloseModal from '../reusable/ButtonCloseModal'

interface TemplateAgreementSelectorModalProps {
  open: boolean;
  onClose: any;
}

const TemplateAgreementSelectorModal: FC<TemplateAgreementSelectorModalProps> = ({
  open,
  onClose,
}: TemplateAgreementSelectorModalProps) => {
  const templates = templateAgreements

  return (
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
      <ModalBody>
        <ListGroup flush>
          {
            templates.map((template) => (
              <Fragment key={template.code}>
                <ListGroupItem
                  tag="button"
                  action
                >
                  {template.name}
                </ListGroupItem>
              </Fragment>
            ))
          }
        </ListGroup>
      </ModalBody>
    </Modal>
  )
}

export default TemplateAgreementSelectorModal
