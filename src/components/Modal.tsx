import { PropsWithChildren, ReactElement, FC } from 'react';

type IProps = PropsWithChildren<{
  setOpenModal: (...args: any[]) => void;
}>;

const Modal: FC<IProps> = ({ children, setOpenModal }): ReactElement => {
  const closeModal = () => setOpenModal((state: boolean) => !state);

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="box">{children}</div>
      </div>

      <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
    </div>
  );
};

export default Modal;
