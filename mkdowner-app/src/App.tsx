import { Container } from './components/Container/Container';
import { Header } from './components/Header/Header';
import { UploadArea } from './components/UploadArea/UploadArea';
import { FileList } from './components/FileList/FileList';
import { SupportedFormats } from './components/SupportedFormats/SupportedFormats';
import { useFileUpload } from './hooks/useFileUpload';

function App() {
  const {
    selectedFiles,
    isUploading,
    progress,
    handleFilesSelected,
    handleUpload
  } = useFileUpload();

  return (
    <Container>
      <Header />
      <UploadArea
        onFilesSelected={handleFilesSelected}
        onSubmit={handleUpload}
        isUploading={isUploading}
        progress={progress}
        selectedFiles={selectedFiles}
      />
      <FileList files={selectedFiles} />
      <SupportedFormats />
    </Container>
  );
}

export default App;
