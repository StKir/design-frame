type PdfDocumentPreviewProps = {
  pages: number;
};

const PdfPage = ({ pageNum }: { pageNum: number }) => (
  <div className='vault-pdf-page'>
    <div className='vault-pdf-page__header'>
      <span className='vault-pdf-page__badge'>PDF</span>
      <span className='vault-pdf-page__num vault-tabular'>{pageNum}</span>
    </div>
    <div className='vault-pdf-page__body'>
      <div className='vault-pdf-page__title-line' />
      <div className='vault-pdf-page__line' />
      <div className='vault-pdf-page__line' />
      <div className='vault-pdf-page__line vault-pdf-page__line--short' />
      <div className='vault-pdf-page__gap' />
      <div className='vault-pdf-page__line' />
      <div className='vault-pdf-page__line' />
      <div className='vault-pdf-page__line vault-pdf-page__line--medium' />
      <div className='vault-pdf-page__line' />
      <div className='vault-pdf-page__line vault-pdf-page__line--short' />
      <div className='vault-pdf-page__gap' />
      <div className='vault-pdf-page__line' />
      <div className='vault-pdf-page__line vault-pdf-page__line--medium' />
      <div className='vault-pdf-page__line' />
    </div>
  </div>
);

export const PdfDocumentPreview = ({ pages }: PdfDocumentPreviewProps) => (
  <div className='vault-pdf-viewer'>
    <div className='vault-pdf-viewer__scroll'>
      {Array.from({ length: Math.min(pages, 2) }, (_, i) => (
        <PdfPage key={i} pageNum={i + 1} />
      ))}
    </div>
  </div>
);
