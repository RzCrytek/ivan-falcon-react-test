import { ReactElement, FC } from 'react';
import { Header } from '../components';

interface IProps {
  children: ReactElement | ReactElement[];
  pageId: string;
}

const BaseLayout: FC<IProps> = ({ children, pageId }) => {
  return (
    <div id="wrapper">
      <Header />

      <main id={pageId} className="py-5">
        {children}
      </main>
    </div>
  );
};
export default BaseLayout;
