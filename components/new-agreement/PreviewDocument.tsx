import React, { FC } from 'react';
import { Button } from 'reactstrap';
import Link from 'next/link';

import styles from './PreviewDocument.module.scss';
import PdScrollbar from '../reusable/pdScrollbar/PdScrollbar';

interface PreviewDocumentProps {
  templateName: string;
  templateComponent: any;
  isEditing: boolean;
  agreementReviewed: boolean;
  onEditMode: any;
  onSubmit: any;
}

const PreviewDocument: FC<PreviewDocumentProps> = ({
  templateName,
  templateComponent,
  isEditing,
  agreementReviewed,
  onEditMode,
  onSubmit,
}: PreviewDocumentProps) => (
  <div className={styles.previewDocumentContainer}>
    <div className={styles.previewDocumentHeader}>
      <span>{`Template: ${templateName}`}</span>
    </div>
    <div className={styles.previewDocumentBody}>
      <PdScrollbar noScrollX scrollYHeight={665}>
        {templateComponent}
      </PdScrollbar>
    </div>

    {!isEditing && !agreementReviewed && (
      <div className={styles.previewDocumentFooter}>
        <Link href="/agreements">
          <Button color="default">Close</Button>
        </Link>
        <Button onClick={() => onEditMode()} color="success">
          Create Agreement
        </Button>
      </div>
    )}

    {!isEditing && agreementReviewed && (
      <div className={styles.previewDocumentFooter}>
        <Button color="default" onClick={() => onEditMode()}>
          Back to Edit
        </Button>
        <Button color="success" onClick={() => onSubmit()}>Approve and Send</Button>
      </div>
    )}
  </div>
);

export default PreviewDocument;
