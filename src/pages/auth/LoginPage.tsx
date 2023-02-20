import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModuleRoutes } from '../../routes/config-routes';

import { useAppDispatch } from '../../context/context';
import { loginUser } from '../../context/action';
import { ILogin } from '../../interface/Login';

import { InputField } from '../../components';

const LoginPage = () => {
  const dispatchApp = useAppDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState<ILogin>({ user: '', password: '' });
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const isLogin = loginUser(dispatchApp, user);
    if (isLogin) return navigate(ModuleRoutes.Employees);

    setError(!isLogin);
  };

  return (
    <div id="wrapper" className="">
      <main id="login" className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="column is-4 is-offset-4">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <h1 className="title mt-0 has-text-centered">Log in to Dashboard</h1>

                      <InputField label="User" name="user" value={user.user} onChange={handleChange} />

                      <InputField
                        type="password"
                        label="Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                      />

                      <button
                        className="button is-block is-link is-medium is-fullwidth"
                        type="submit"
                        disabled={user.user === '' || user.password === ''}
                      >
                        Login
                      </button>

                      {error && (
                        <div className="notification is-danger is-light has-text-centered p-2 mt-4">
                          <p className="is-size-7">Incorrect username or password.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
