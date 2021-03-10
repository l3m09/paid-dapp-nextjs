import React, { FC } from 'react'
import RedScrollbar from '../reusable/RedScrollbar'
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
        <RedScrollbar noScrollX>
          <div style={{height: 900}}>
            <p>Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
            {templateHTML}
          </div>
        </RedScrollbar>
      </div>
    </div>
  )
}

export default PreviewDocument
