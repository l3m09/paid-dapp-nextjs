import React, { FC } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps,
  ModalHeaderProps,
  ModalFooterProps,
  ModalBodyProps,
} from "reactstrap";
import styles from "./PdModal.module.scss";

export const PdModal: FC<ModalProps> = ({ children, className, ...props }) => {
  return (
    <Modal className={`${styles.pdModal} ${className}`} centered {...props}>
      {children}
    </Modal>
  );
};

interface PdModalHeaderProps extends ModalHeaderProps {
  subtitle?: string;
}

export const PdModalHeader: FC<PdModalHeaderProps> = ({
  children,
  className,
  title,
  subtitle,
  ...props
}) => {
  return (
    <ModalHeader className={`${styles.pdModalHeader} ${className}`} {...props}>
      <h4 className={styles.pdModalTitle}>{title}</h4>
      {subtitle && <span className="pdModalTitle">{subtitle}</span>}
    </ModalHeader>
  );
};

export const PdModalBody: FC<ModalBodyProps> = ({ children, ...props }) => {
  return <ModalBody {...props}>{children}</ModalBody>;
};

export const PdModalFooter: FC<ModalFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <ModalFooter className={`${styles.pdModalFooter} ${className}`} {...props}>
      {children}
    </ModalFooter>
  );
};
