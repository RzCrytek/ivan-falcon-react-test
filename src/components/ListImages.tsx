import { ReactElement } from 'react';

const ListImages = ({ imageUrls }: { imageUrls: string[] }): ReactElement => {
  return (
    <div className="columns is-multiline">
      {imageUrls.map((url: string, i: number) => (
        <div className="column is-one-fifth-desktop is-half-tablet" key={i}>
          <div className="card">
            <div className="card-image">
              <figure className="image is-3by2">
                <img className="is-fit-cover" src={url} />
              </figure>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default ListImages;
