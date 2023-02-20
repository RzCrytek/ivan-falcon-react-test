import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { useAppState } from '../context/context';
import { ModuleRoutes } from './config-routes';
import PrivateRoute from './PrivateRoute';
import { Fallback } from '../components';

const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const EmployeesPage = lazy(() => import('../pages/EmployeesPage'));
const UploadPage = lazy(() => import('../pages/UploadPage'));

const AppRouter: FC = () => {
  const { isLoggedIn } = useAppState();

  return (
    <BrowserRouter>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route path={ModuleRoutes.Login} element={<LoginPage />} />
          <Route
            path={ModuleRoutes.Employees}
            element={
              <PrivateRoute isLogin={isLoggedIn}>
                <EmployeesPage />
              </PrivateRoute>
            }
          />

          <Route
            path={ModuleRoutes.Upload}
            element={
              <PrivateRoute isLogin={isLoggedIn}>
                <UploadPage />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? ModuleRoutes.Employees : ModuleRoutes.Login} replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default AppRouter;
