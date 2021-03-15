import React, { ButtonHTMLAttributes, FC } from 'react';

// eslint-disable-next-line no-undef
const ButtonCloseModal: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
// eslint-disable-next-line no-undef
}: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="btn btn-close-modal" onClick={onClick} type="button">
    <img src="/assets/icon/close.svg" alt="" />
  </button>
);

export default ButtonCloseModal;
