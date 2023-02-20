import { ReactElement } from 'react';
import { IDropzoneFile } from '../../interface/Dropzone';

import style from './dropzone.module.scss';

export const Thumbnail = ({ selectedImages }: { selectedImages: IDropzoneFile[] }): ReactElement => {
  return (
    <div className={style.thumbnail}>
      {selectedImages.map((file: IDropzoneFile, _) => (
        <div className="box mb-0 p-2" key={file.preview}>
          <figure className="image  is-64x64">
            <img className="is-fit-cover" src={file.preview} />
          </figure>
        </div>
      ))}
    </div>
  );
};
