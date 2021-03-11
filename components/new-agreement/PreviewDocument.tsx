import React, { FC } from 'react'
// eslint-disable-next-line import/no-unresolved
import PdRedScrollbar from '@/pdComponents/pdRedScrollbar/PdRedScrollbar'
import styles from './PreviewDocument.module.scss'

interface PreviewDocumentProps {
  templateName: string;
  templateHTML: string;
}

const PreviewDocument: FC<PreviewDocumentProps> = ({
  templateName,
  templateHTML,
}: PreviewDocumentProps) => {
  console.log('template html', templateHTML)

  return (
    <div className={styles.previewDocumentContainer}>
      <div className={styles.previewDocumentHeader}>
        <span>
          {`Template: ${templateName}`}
        </span>
        <button
          className="btn btn-grey-small"
          type="button"
        >
          Edit
        </button>
      </div>
      <div className={styles.previewDocumentBody}>
        <PdRedScrollbar noScrollX scrollYHeight={665}>
          {templateHTML}
        </PdRedScrollbar>
      </div>
    </div>
  )
}

export default PreviewDocument
