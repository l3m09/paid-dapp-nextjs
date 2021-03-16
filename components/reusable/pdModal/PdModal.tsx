import React, { FC } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  ModalHeaderProps,
  ModalFooterProps,
  ModalBodyProps,
} from 'reactstrap';
import styles from './PdModal.module.scss';

export const PdModal: FC<ModalProps> = ({ children, className, ...props }) => (
  <Modal className={`${styles.pdModal} ${className}`} centered {...props}>
    {children}
  </Modal>
);

interface PdModalHeaderProps extends ModalHeaderProps {
  subtitle?: string;
}

export const PdModalHeader: FC<PdModalHeaderProps> = ({
  className,
  title,
  subtitle,
  ...props
}) => (
  <ModalHeader className={`${styles.pdModalHeader} ${className}`} {...props}>
    <span className={`h4 ${styles.pdModalTitle}`}>{title}</span>
    {subtitle && <span className="pdModalTitle">{subtitle}</span>}
  </ModalHeader>
);

export const PdModalBody: FC<ModalBodyProps> = ({ children, ...props }) => (
  <ModalBody {...props}>{children}</ModalBody>
);

export const PdModalFooter: FC<ModalFooterProps> = ({
  children,
  className,
  ...props
}) => (
  <ModalFooter className={`${styles.pdModalFooter} ${className}`} {...props}>
    {children}
  </ModalFooter>
);
