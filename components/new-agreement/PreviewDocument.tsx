import React, { FC } from 'react';
import PdScrollbar from '../reusable/pdScrollbar/PdScrollbar';
import styles from './PreviewDocument.module.scss';

interface PreviewDocumentProps {
  templateName: string;
  templateHTML: any;
}

const PreviewDocument: FC<PreviewDocumentProps> = ({
  templateName,
  templateHTML,
}: PreviewDocumentProps) => (
  <div className={styles.previewDocumentContainer}>
    <div className={styles.previewDocumentHeader}>
      <span>{`Template: ${templateName}`}</span>
      <button className="btn btn-grey-small" type="button">
        Edit
      </button>
    </div>
    <div className={styles.previewDocumentBody}>
      <PdScrollbar noScrollX scrollYHeight={665}>
        {templateHTML}
      </PdScrollbar>
    </div>
  </div>
);

export default PreviewDocument;
