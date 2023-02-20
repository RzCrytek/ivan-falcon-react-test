import { toast } from 'react-toastify';

import { DispatchApp, AppActions } from './reducer';
import { ILogin } from '../interface/Login';

const loginUser = (dispatchApp: DispatchApp, payload: ILogin): boolean => {
  const setUserStorage = { user: payload.user, isLoggedIn: true };

  if (payload.user === 'IvanFalcon' && payload.password === 'Whiz') {
    dispatchApp({ type: AppActions.AUTH_LOGIN, payload: setUserStorage });
    localStorage.setItem('loggedUser', JSON.stringify(setUserStorage));
    toast.success(`¡Welcome, ${payload.user}!`);
    return true;
  }
  toast.warning('Incorrect username or password');
  return false;
};

const getEmployee = async (dispatchApp: DispatchApp): Promise<void> => {
  dispatchApp({ type: AppActions.LOADING });

  const api = `${import.meta.env.VITE_API_EMPLOYEES}/ivan_falcon`;

  try {
    const response = await fetch(api);

    if (!response.ok) throw new Error('algo falló');

    const data = await response.json();

    if (data.success) dispatchApp({ type: AppActions.GET_EMPLOYEES, payload: data });
  } catch (error) {
    console.error(error);
  }
};

const logoutUser = (dispatchApp: DispatchApp) => {
  localStorage.removeItem('loggedUser');
  dispatchApp({ type: AppActions.AUTH_LOGOUT });
};

export { loginUser, logoutUser, getEmployee };
