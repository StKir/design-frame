import { PdfDocumentPreview } from '~/vault_app/components/PdfDocumentPreview';
import { IconChevronLeft } from '~/vault_app/components/icons';
import { ScreenShell } from '~/vault_app/components/ScreenShell';
import { StatusBar } from '~/vault_app/components/StatusBar';
import { pdfPreview } from '~/vault_app/data/filePreview';

export const FilePreviewScreen = () => (
  <ScreenShell>
    <StatusBar />

    <div className='vault-preview-topbar'>
      <button type='button' className='vault-icon-btn' aria-label='Назад'>
        <IconChevronLeft />
      </button>
    </div>

    <PdfDocumentPreview pages={pdfPreview.pages} />

    <div className='vault-preview-body px-5 pb-8'>
      <h1 className='vault-preview-title'>{pdfPreview.title}</h1>
      <p className='vault-preview-meta vault-tabular'>
        {pdfPreview.fileSize} · {pdfPreview.pages} стр. · {pdfPreview.date}
      </p>

      <div className='vault-preview-divider' />

      <p className='vault-preview-label'>Распознанный текст</p>
      <div className='vault-preview-text'>{pdfPreview.content}</div>
    </div>
  </ScreenShell>
);
