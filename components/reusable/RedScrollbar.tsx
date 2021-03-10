import React, { FC } from 'react'
import Scrollbar, { ScrollbarProps } from 'react-scrollbars-custom'

const RedScrollbar: FC<ScrollbarProps> = ({
  children,
  noScrollX,
  noScrollY = false,
}: ScrollbarProps) => (
  <Scrollbar
    noScrollX={noScrollX}
    noScrollY={noScrollY}
    style={{ minHeight: 'inherit' }}
    thumbYProps={{
      renderer: (props) => {
        // eslint-disable-next-line react/prop-types
        const { elementRef, ...restProps } = props;
        return (
          <span
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...restProps}
            ref={elementRef}
            style={{
              background: '#DA1E5E',
              borderRadius: '10px',
              left: '0px',
              bottom: '0px',
            }}
          />
        )
      },
    }}
  >
    { children}
  </Scrollbar>
)

export default RedScrollbar
