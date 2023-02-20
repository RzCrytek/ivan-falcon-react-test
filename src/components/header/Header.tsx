import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ModuleRoutes } from '../../routes/config-routes';
import { useAppDispatch, useAppState } from '../../context/context';
import { logoutUser } from '../../context/action';

import './header.scss';

const pages = [
  {
    name: 'Employees',
    linkTo: ModuleRoutes.Employees,
  },
  {
    name: 'Images',
    linkTo: ModuleRoutes.Upload,
  },
];

const Header: FC = () => {
  const { user } = useAppState();
  const dispatchApp = useAppDispatch();
  const navigate = useNavigate();

  const logout = (): void => {
    logoutUser(dispatchApp);
    navigate(ModuleRoutes.Login);
  };

  return (
    <header id="header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="container">
          <ul id="" className="navbar-menu">
            <li className="navbar-start">
              {pages.map((page, _) => (
                <NavLink className="navbar-item" to={page.linkTo} key={page.name}>
                  {page.name}
                </NavLink>
              ))}
            </li>

            <div className="navbar-end">
              <div className="navbar-item">
                <p className="mr-5">{user}</p>

                <button type="button" className="button is-danger is-light" onClick={logout}>
                  Sign up
                </button>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Header;
