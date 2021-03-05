import React, { FC, TextareaHTMLAttributes } from 'react'
import classNames from 'classnames'

// eslint-disable-next-line no-undef
interface StackedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  innerRef?: any;
  groupClassNames?: string;
  labelClassNames?: string;
  inputClassNames?: string;
  errorComponent?: any;
}

const StackedTextarea: FC<StackedTextareaProps> = ({
  label,
  name,
  placeholder,
  innerRef,
  groupClassNames,
  labelClassNames,
  inputClassNames,
  errorComponent,
  rows,
}: StackedTextareaProps) => (
  <div className={classNames('form-group stacked-group', groupClassNames)}>
    <label
      htmlFor={name}
      className={classNames('stacked-label', labelClassNames)}
    >
      {label}
    </label>
    <textarea name={name} placeholder={placeholder} className={classNames('form-control stacked-control', inputClassNames)} ref={innerRef} rows={rows} />
    {
      errorComponent
    }
  </div>
)

StackedTextarea.defaultProps = {
  innerRef: null,
  groupClassNames: '',
  labelClassNames: '',
  inputClassNames: '',
  errorComponent: null,
}

export default StackedTextarea
