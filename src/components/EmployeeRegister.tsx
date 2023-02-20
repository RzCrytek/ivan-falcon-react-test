import { ReactElement, useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';

import InputField from './InputField';
import { IEmployeeRequest } from '../interface/Employee';
import { getEmployee } from '../context/action';
import { useAppDispatch } from '../context/context';

interface IProps {
  setCloseRegister: (...args: any[]) => void;
}

const initialEmployee: IEmployeeRequest = {
  name: '',
  last_name: '',
  birthday: '',
};

const EmployeeRegister = ({ setCloseRegister }: IProps): ReactElement => {
  const dispatchApp = useAppDispatch();
  const [employeeForm, setEmployeeForm] = useState(initialEmployee);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const closeRegister = () => setCloseRegister((state: boolean) => !state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setEmployeeForm({ ...employeeForm, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingRegister(true);

    const api = `${import.meta.env.VITE_API_EMPLOYEES}/ivan_falcon`;

    const payload: IEmployeeRequest = {
      name: employeeForm.name,
      last_name: employeeForm.last_name,
      birthday: employeeForm.birthday.split('-').join('/'),
    };

    try {
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('algo falló');

      await response.json();

      toast.success('¡Registered employee!');
      getEmployee(dispatchApp);
      setEmployeeForm(initialEmployee);
      setLoadingRegister(false);
      closeRegister();
    } catch (error) {
      toast.error('An error occurred... :(');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h1 className="title mt-0 has-text-centered">Register Employee</h1>

            <InputField label="Name" name="name" value={employeeForm.name} maxLength={30} onChange={handleChange} />

            <InputField
              label="Last Name"
              name="last_name"
              value={employeeForm.last_name}
              maxLength={30}
              onChange={handleChange}
            />

            <InputField
              label="Birthday"
              type="date"
              name="birthday"
              value={employeeForm.birthday as string}
              onChange={handleChange}
            />

            <div className="field is-grouped">
              <div className="control">
                <button
                  className={`button is-link ${loadingRegister ? 'is-loading' : ''}`}
                  type="submit"
                  disabled={loadingRegister}
                >
                  Register
                </button>
              </div>

              <div className="control">
                <button type="button" className="button is-primary is-light" onClick={closeRegister}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmployeeRegister;
