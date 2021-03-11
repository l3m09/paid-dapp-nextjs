import React, { FC } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import classNames from 'classnames'
import styles from './PdRedScrollbar.module.scss'

interface PdRedScrollbarProps {
  children: any;
  noScrollX?: boolean;
  noScrollY?: boolean;
  scrollYHeight: number;
}

const PdRedScrollbar: FC<PdRedScrollbarProps> = ({
  children,
  noScrollX,
  noScrollY,
  scrollYHeight,
}: PdRedScrollbarProps) => (
  <Scrollbars
    style={{ minHeight: 'inherit' }}
    renderView={
      // eslint-disable-next-line react/jsx-props-no-spreading
      (props) => <div {...props} className={`${styles.pdScrollbar}`} />
    }
    renderTrackHorizontal={
      (props) => (
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          className={
            classNames(
              `${styles.pdTrackHorizontal}`,
              noScrollX ? `${styles.hidden}` : '',
            )
          }
        />
      )
    }
    renderTrackVertical={
      (props) => (
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          // eslint-disable-next-line react/prop-types
          style={{ ...props.style, height: scrollYHeight }}
          className={
            classNames(
              `${styles.pdTrackVertical}`,
              noScrollY ? `${styles.hidden}` : '',
            )
          }
        />
      )
    }
    renderThumbVertical={
      (props) => (
        <div
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          className={`${styles.pdThumbVertical}`}
        />
      )
    }
  >
    { children}
  </Scrollbars>
)

PdRedScrollbar.defaultProps = {
  noScrollX: false,
  noScrollY: false,
}

export default PdRedScrollbar
