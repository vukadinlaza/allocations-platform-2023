import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface UploadProps {
  loading?: boolean | null;
  disabled?: boolean | null;
  initialFiles?: File[]; // Added prop for initial files
  onFileAdd?: (file: File) => void;
  onFileRemove?: (index: number) => void;
}

export default function Upload({
  loading,
  disabled = false,
  initialFiles = [], // Set default value for initial files
  onFileAdd,
  onFileRemove
}: UploadProps) {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newFiles: File[] = [];
    if (!event.target.files) return;
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      if (file.type === 'application/pdf') {
        // Check for PDF files
        newFiles.push(file);
        if (onFileAdd) {
          onFileAdd(file);
        }
      }
    }
    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    const removedFile = files[index];
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    if (onFileRemove) {
      onFileRemove(index);
    }
  };

  const renderFiles = () => {
    return files.map((file, index) => (
      <div
        key={index}
        className="flex items-center justify-between px-3 py-3 border-b file"
      >
        <div className="flex items-center">
          <Image
            src="/attach.svg"
            alt="Add File"
            className="cursor-pointer text-primary"
            width={24}
            height={24}
          />
          <p className="text-xs">{file.name}</p>
        </div>
        <div className="transition opacity-75 hover:opacity-100">
          <Image
            alt="Remove"
            onClick={() => handleRemoveFile(index)}
            src="/bin.svg"
            className="cursor-pointer"
            width={24}
            height={24}
          />
        </div>
      </div>
    ));
  };

  const handleUploadClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  return (
    <div className={`upload relative ${loading ? 'disabled' : ''}`}>
      {loading && (
        <div className="absolute top-[50] left-[50]">
          <div className="p-1">
            <CircularProgress color="success" size={32} />
          </div>
        </div>
      )}
      <input
        disabled={disabled ? disabled : false}
        type="file"
        accept=".pdf"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={inputRef}
      />
      {files.length > 0 && <div className="w-full files">{renderFiles()}</div>}
      <div
        className={`${
          disabled ? 'disabled' : ''
        } flex flex-col items-center upload--zone`}
        onClick={handleUploadClick}
      >
        <div className="text-primary">
          <Image
            alt="upload"
            src="/upload.svg"
            className="cursor-pointer text-primary"
            width={48}
            height={48}
          />
        </div>
      </div>
    </div>
  );
}
