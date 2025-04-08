import React from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import '@cyntler/react-doc-viewer/dist/index.css'

const PDFViewer = ({ openedFile }) => {
  console.log('openedFile:', openedFile)
  return (
    <DocViewer
      // className='w-[40vw] absolute hidden'
      style={{
        width: '50vw',
        height: '90vh',
      }}
      // documents={[
      //   {
      //     uri: '/sample_pdf.pdf',
      //     fileType: 'pdf',
      //   },
      // ]}
      documents={openedFile}
      pluginRenderers={DocViewerRenderers}
      // style={{ height: '80vh' }}
      config={
        {
          // header: {
          //   disableHeader: false,
          //   disableFileName: false,
          //   retainURLParams: false,
          // },
          // csvDelimiter: ',', // "," as default,
          // pdfZoom: {
          //   defaultZoom: 1.1, // 1 as default,
          //   zoomJump: 0.2, // 0.1 as default,
          // },
          // pdfVerticalScrollByDefault: true, // false as default
        }
      }
    />
  )
}

export default PDFViewer
