import React, { FC, Fragment, useEffect, useState } from "react";
import Link from "next/link";
import {
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import templateAgreements from "../../data/templateAgreements";
import ButtonCloseModal from "../reusable/ButtonCloseModal";

interface TemplateAgreementSelectorModalProps {
  open: boolean;
  onClose: any;
}

const TemplateAgreementSelectorModal: FC<TemplateAgreementSelectorModalProps> = ({
  open,
  onClose,
}: TemplateAgreementSelectorModalProps) => {
  const templates = templateAgreements;
  const [templateSelected, setTemplateSelected] = useState("");

  useEffect(() => setTemplateSelected(""), [open]);

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
        <span className="title">Select Template to Create an Agreement:</span>
      </ModalHeader>
      <ModalBody>
        <ListGroup className="list-group-flush">
          {templates.map((template) => (
            <Fragment key={template.code}>
              <ListGroupItem
                active={templateSelected === template.code}
                className="list-item-grey"
                tag="button"
                action
                onClick={() => setTemplateSelected(template.code)}
              >
                {template.name}
              </ListGroupItem>
            </Fragment>
          ))}
        </ListGroup>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn btn-link btn-link-form-cancel mr-5"
          type="button"
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <Link href="/new-agreement?templateTypeCode=1">
          <button
            className="btn btn-primary btn-green"
            type="button"
            disabled={templateSelected === ""}
          >
            Create Agreement
          </button>
        </Link>
      </ModalFooter>
    </Modal>
  );
};

export default TemplateAgreementSelectorModal;
