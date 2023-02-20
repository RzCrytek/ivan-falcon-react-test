import { createContext, FC, useReducer, ReactNode, useContext } from 'react';
import { AppReducer, DispatchApp, IAppState, initialState } from './reducer';

const AppStateContext = createContext<IAppState | undefined>(undefined);
const AppDispatchContext = createContext<DispatchApp | undefined>(undefined);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

const useAppState = (): IAppState => {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateContext');
  }

  return context;
};

const useAppDispatch = (): DispatchApp => {
  const context = useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within a AppDispatchContext');
  }

  return context;
};

export { AppProvider, useAppState, useAppDispatch };
