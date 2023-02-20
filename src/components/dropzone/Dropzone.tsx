import { useDropzone } from 'react-dropzone';
import { useCallback, ReactElement, FC, PropsWithChildren } from 'react';

import { IDropzoneFile } from '../../interface/Dropzone';

type IProps = PropsWithChildren<{
  selectedImages: IDropzoneFile[];
  setSelectedImages: (...args: any[]) => void;
  uploadImage: () => void;
  loadingImages: boolean;
}>;

const Dropzone: FC<IProps> = ({
  children,
  selectedImages,
  setSelectedImages,
  uploadImage,
  loadingImages,
}): ReactElement => {
  const onDrop = useCallback((acceptedFiles: any) => {
    setSelectedImages(
      acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
  });

  return (
    <div className="box p-4">
      <div
        className={`box drag-drop border-dashed has-text-centered py-5 mb-4 ${isDragActive ? 'active' : 'default'}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the images here ...</p>
        ) : (
          <p>Drag and drop your images here or click to select files</p>
        )}
      </div>

      {selectedImages.length > 0 && (
        <button
          type="button"
          className={`button is-primary  mb-5 ${loadingImages ? 'is-loading' : 'is-light'}`}
          onClick={uploadImage}
          disabled={loadingImages}
        >
          Upload
        </button>
      )}

      {children}
    </div>
  );
};
export default Dropzone;
