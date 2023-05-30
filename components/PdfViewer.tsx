import { type FC, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { VariableSizeList as List } from 'react-window';
import { asyncMap } from '@wojtekmaj/async-array-utils';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type PdfViewerProps = { file: File };

const width = 800;
const height = width * 1.5;

function Row({ index, style }: { index: number, style: any }) {
  function onPageRenderSuccess(page: any) {
    console.log(`Page ${page.pageNumber} rendered`);
  }

  return (
    <div style={style}>
      <Page
        onRenderSuccess={onPageRenderSuccess}
        pageIndex={index}
        width={width}
      />
    </div>
  );
}

const PdfViewer: FC<PdfViewerProps> = (props) => {
  const { file } = props;

  const [pdf, setPdf] = useState<any>(null);
  const [pageViewports, setPageViewports] = useState<any[]|null>(null);



  /**
   * React-Window cannot get item size using async getter, therefore we need to
   * calculate them ahead of time.
   */
  useEffect(() => {
    setPageViewports(null);

    if (!pdf) {
      return;
    }

    (async () => {
      const pageNumbers = Array.from(new Array(pdf.numPages)).map(
        (_, index) => index + 1
      );

      const nextPageViewports: any[] = await asyncMap(pageNumbers, (pageNumber) =>
        pdf.getPage(pageNumber).then((page: any) => page.getViewport({ scale: 1 }))
      );

      setPageViewports(nextPageViewports);
      console.log(nextPageViewports);
    })();
  }, [pdf]);

  function onDocumentLoadSuccess(nextPdf: any) {
    console.log('load success');
    setPdf(nextPdf);
  }

  function getPageHeight(pageIndex: number) {
    console.log('getting page height');
    if (!pageViewports) {
      throw new Error('getPageHeight() called too early');
    }
    console.log(pageViewports, pageIndex);

    const pageViewport = pageViewports[pageIndex];
    const scale = width / pageViewport.width;
    return pageViewport.height * scale;
  }

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
      {pdf && pageViewports ? (
        <List
          width={width}
          height={height}
          estimatedItemSize={height}
          itemCount={pdf.numPages}
          itemSize={getPageHeight}
        >
          {Row}
        </List>
      ) : null}
    </Document>
  );
};

export default PdfViewer;
