import { ReactElement } from 'react';
import style from './loader.module.scss';

const Loader = (): ReactElement => {
  return (
    <div className={style.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
