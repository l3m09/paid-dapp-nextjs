import React, { FC } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import classNames from 'classnames';
import styles from './PdScrollbar.module.scss';

interface PdScrollbarProps {
  children: any;
  noScrollX?: boolean;
  noScrollY?: boolean;
  scrollYHeight: number;
  color?: string;
}

const PdScrollbar: FC<PdScrollbarProps> = ({
  children,
  noScrollX,
  noScrollY,
  scrollYHeight,
  color,
}: PdScrollbarProps) => {
  const getThumbVerticalStyle = () => {
    const mapThumbVertical = new Map([
      ['red', `${styles.pdThumbVerticalRed}`],
      ['blue', `${styles.pdThumbVerticalBlue}`],
    ]);

    return mapThumbVertical.get(color ?? 'red');
  };

  return (
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
            className={getThumbVerticalStyle()}
          />
        )
      }
    >
      { children}
    </Scrollbars>
  );
};

PdScrollbar.defaultProps = {
  noScrollX: false,
  noScrollY: false,
  color: 'red',
};

export default PdScrollbar;
