import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { ModuleRoutes } from './config-routes';

interface IProps {
  children: ReactElement;
  isLogin: boolean;
}

const PrivateRoute: FC<IProps> = ({ children, isLogin }): ReactElement => {
  if (!isLogin) return <Navigate to={ModuleRoutes.Login} />;

  return children;
};

export default PrivateRoute;
