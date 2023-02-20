import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './routes/AppRouter';
import { AppProvider } from './context/context';
import './styles/app.scss';

function App() {
  return (
    <>
      <AppProvider>
        <AppRouter />
      </AppProvider>

      <ToastContainer
        theme="light"
        position={toast.POSITION.TOP_RIGHT}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
