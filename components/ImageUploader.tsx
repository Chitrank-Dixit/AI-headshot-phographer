
import React, { useCallback, useState } from 'react';
import type { UploadedImage } from '../types';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (image: UploadedImage) => void;
}

const fileToBase64 = (file: File): Promise<UploadedImage> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const mimeType = result.split(';')[0].split(':')[1];
      const data = result.split(',')[1];
      if (mimeType && data) {
        resolve({ data, mimeType });
      } else {
        reject(new Error('Failed to parse file data.'));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(async (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        try {
          const image = await fileToBase64(file);
          onImageUpload(image);
        } catch (error) {
          console.error("Error converting file to base64:", error);
          // You could add a user-facing error state here
        }
      } else {
        alert('Please upload a valid image file.');
      }
    }
  }, [onImageUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex justify-center items-center">
      <label
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        className={`w-full h-80 rounded-2xl border-4 border-dashed flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${isDragging ? 'border-blue-500 bg-gray-700' : 'border-gray-600 hover:border-gray-500 bg-gray-800'}`}
      >
        <div className="text-center p-8">
          <UploadIcon className="w-16 h-16 mx-auto text-gray-500 mb-4"/>
          <h3 className="text-2xl font-semibold text-gray-200">
            Drag & Drop your photo here
          </h3>
          <p className="text-gray-400 mt-2">or</p>
          <p className="mt-2 text-blue-400 font-semibold">
            Click to browse files
          </p>
          <p className="text-xs text-gray-500 mt-4">PNG, JPG, WEBP up to 10MB</p>
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => handleFileChange(e.target.files)}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
