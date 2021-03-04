import React, { FC } from "react";
import { Modal, ModalHeader, Button, ModalBody } from "reactstrap";
import ButtonCloseModal from "../reusable/ButtonCloseModal";

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
    className="detail-agreement-modal"
  >
    <ModalHeader
      toggle={() => onClose()}
      close={<ButtonCloseModal onClick={() => onClose()} />}
    >
      <h5>Consulting Agreement Details:</h5>
    </ModalHeader>
    <ModalBody>
      <p className="info">Expires in 9 days</p>
      <div className="status">
        <span className="title">Status: </span>
        <Button color="info">pending</Button>
      </div>
      <div className="row details">
        <div className="col-12 info"> Details: </div>
        <div className="col-6 flex-column">
          <p className="title">Counterparty:</p>
          <div className="value">Jacob Jones</div>
        </div>
        <div className="col-6">
          <p className="title">Signed By:</p>
          <div className="value">0x9e81de93dC...47e6d64b70ff1dF</div>
        </div>
        <div className="col-6 flex-column">
          <p className="title">Last Modified:</p>
          <div className="value">12/21/2020 22:37:33</div>
        </div>
        <div className="col-6">
          <p className="title">Transaction Hash:</p>
          <div className="value">0x9e81de93dC...47e6d64b70ff1dF</div>
        </div>
        <div className="col-6 flex-column">
          <p className="title">Created:</p>
          <div className="value">12/21/2020 22:37:33</div>
        </div>
        <div className="col-6">
          <p className="title">Document Signature:</p>
          <div className="value">0x9e81de93dC...47e6d64b70ff1dF</div>
        </div>
        <div className="col-12 flex-column">
          <p className="title">Signed On:</p>
          <div className="value">12/21/2020 22:37:33</div>
        </div>
        <div className="col-12 text-left mt-4 buttons">
          <Button className="btn-transparent mr-3" color="primary">Close</Button>
          <Button className="btn btn-action mr-3">Open PDF</Button>
          <Button className="mr-3" color="success">Sign Agreement</Button>
        </div>
      </div>
    </ModalBody>
  </Modal>
);

export default AgreementDetailModal;
