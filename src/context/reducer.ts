import { Dispatch } from 'react';
import { IEmployee } from '../interface/Employee';

const loggedUser = localStorage.getItem('loggedUser') ? JSON.parse(localStorage.getItem('loggedUser') || '') : '';

export type DispatchApp = Dispatch<IActionReducer>;

export enum AppActions {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  LOADING = 'LOADING',
  GET_EMPLOYEES = 'GET_EMPLOYEES',
}

export interface IAppState {
  user: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  employeeList: IEmployee[];
}

export const initialState: IAppState = {
  user: loggedUser?.user || null,
  isLoggedIn: loggedUser?.isLoggedIn || false,
  loading: false,
  employeeList: [],
};

interface IActionReducer {
  type: AppActions;
  payload?: any;
  error?: any;
}

export const AppReducer = (initialState: IAppState, action: IActionReducer) => {
  switch (action.type) {
    case AppActions.AUTH_LOGIN:
      return {
        ...initialState,
        user: action.payload.user,
        isLoggedIn: action.payload.isLoggedIn,
      };

    case AppActions.LOADING:
      return {
        ...initialState,
        loading: true,
      };

    case AppActions.GET_EMPLOYEES:
      return {
        ...initialState,
        loading: false,
        employeeList: action.payload.data.employees,
      };

    case AppActions.AUTH_LOGOUT:
      return initialState;

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
