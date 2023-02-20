import { useEffect, useState, FC } from 'react';
import { toast } from 'react-toastify';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { IDropzoneFile } from '../interface/Dropzone';
import { storage } from '../firebase/config';
import BaseLayout from '../layout/BaseLayout';
import { Dropzone, ListImages, Loader, Thumbnail } from '../components';

const UploadPage: FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<IDropzoneFile[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const isSelectedImages = selectedImages.length > 0;
  const imagesListRef = ref(storage, 'images/');

  const uploadImage = async () => {
    if (!isSelectedImages) return;

    setLoadingImages(true);

    try {
      await Promise.all(
        selectedImages.map((image: any) => {
          const imageRef = ref(storage, `images/${image.name + v4()}`);

          uploadBytes(imageRef, image).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(snapshot.ref);

            setImageUrls((prev) => [...prev, downloadURL]);
            setSelectedImages([]);
            setLoadingImages(false);
          });
        })
      );

      toast.success('¡Successful upload!');
    } catch (error) {
      toast.error('An error occurred... :(');
    }
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <BaseLayout pageId="images">
      <div className="container">
        <h1 className="title">Upload images</h1>

        <Dropzone
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          uploadImage={uploadImage}
          loadingImages={loadingImages}
        >
          {isSelectedImages && <Thumbnail selectedImages={selectedImages} />}
        </Dropzone>

        {imageUrls.length > 0 ? <ListImages imageUrls={imageUrls} /> : <Loader />}
      </div>
    </BaseLayout>
  );
};

export default UploadPage;
