import './FileList.css';

interface FileListProps {
  files: File[];
}

export const FileList = ({ files }: FileListProps) => {
  if (files.length === 0) return null;

  return (
    <div className="file-list">
      <h4>Selected files:</h4>
      <div className="selected-files">
        {files.map((file, index) => (
          <div key={index} className="file-item">
            {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        ))}
      </div>
    </div>
  );
};
