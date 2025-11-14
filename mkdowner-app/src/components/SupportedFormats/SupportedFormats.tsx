import './SupportedFormats.css';

export const SupportedFormats = () => {
  return (
    <div className="supported">
      <h3>📋 Supported Formats (Powered by Microsoft MarkItDown)</h3>
      <ul>
        <li><strong>Text documents</strong> (.txt) - Direct content</li>
        <li><strong>Word documents</strong> (.docx) - Preserves formatting and structure</li>
        <li><strong>PowerPoint</strong> (.pptx) - Extracts slides and content</li>
        <li><strong>PDF files</strong> (.pdf) - Advanced text extraction with layout</li>
        <li><strong>Excel files</strong> (.xlsx) - Converts to Markdown tables</li>
        <li><strong>CSV files</strong> (.csv) - Converts to Markdown tables</li>
        <li><strong>JSON files</strong> (.json) - Formats as code blocks</li>
        <li><strong>HTML files</strong> (.html) - Converts to clean Markdown</li>
        <li><strong>Images</strong> (.png, .jpg) - OCR text extraction</li>
        <li><strong>Audio files</strong> (.wav, .mp3) - Speech-to-text conversion</li>
        <li><strong>Other formats</strong> - XML, RTF, and more</li>
      </ul>
      <p><em>💡 Tip: MarkItDown uses AI-powered conversion for better formatting preservation. Multiple files are packaged in a ZIP.</em></p>
    </div>
  );
};
