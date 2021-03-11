import React, { FC } from 'react'
// eslint-disable-next-line import/no-unresolved
import PdScrollbar from '@/pdComponents/pdScrollbar/PdScrollbar'
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
        <PdScrollbar
          noScrollX
          scrollYHeight={665}
        >
          {templateHTML}
        </PdScrollbar>
      </div>
    </div>
  )
}

export default PreviewDocument
