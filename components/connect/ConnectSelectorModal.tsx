import React, {
  FC, Fragment, useEffect, useState,
} from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import {
  PdModal,
  PdModalBody,
  PdModalHeader,
  PdModalFooter,
} from '@/pdComponents';
import connectSelector from '../../data/connectSelector';
import styles from './ConnectSelectorModal.module.scss';

interface ConnectSelectorModalProps {
  open: boolean;
  onClose: any;
  onConnect: any;
}

const ConnectSelectorModal: FC<ConnectSelectorModalProps> = ({
  open,
  onClose,
  onConnect,
}: ConnectSelectorModalProps) => {
  const options = connectSelector;
  const [optionSelected, setOptionSelected] = useState('');

  useEffect(() => setOptionSelected(''), [open]);

  return (
    <PdModal isOpen={open} className={styles.modalConnect}>
      <PdModalHeader toggle={onClose} title="Please select an option: " />
      <PdModalBody className={styles.modalBody}>
        <div className="mb-3">
          <ListGroup className="list-group-flush">
            {options.map((option) => (
              <Fragment key={option.code}>
                <ListGroupItem
                  active={optionSelected === option.code}
                  className="list-item-grey"
                  tag="button"
                  action
                  onClick={() => setOptionSelected(option.code)}
                >
                  {option.name}
                </ListGroupItem>
              </Fragment>
            ))}
          </ListGroup>
        </div>
      </PdModalBody>
      <PdModalFooter>
        <Button color="link" onClick={onClose}>
          Close
        </Button>
        <Button color="danger" disabled={!optionSelected} onClick={() => optionSelected && onConnect(optionSelected)}>
          Connect
        </Button>
      </PdModalFooter>
    </PdModal>
  );
};

export default ConnectSelectorModal;
