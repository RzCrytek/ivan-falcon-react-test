import { FC, useState, useEffect } from 'react';

import BaseLayout from '../layout/BaseLayout';
import { EmployeeRegister, Loader, Modal, Table } from '../components';
import { useAppDispatch, useAppState } from '../context/context';
import { getEmployee } from '../context/action';

const EmployeesPage: FC = () => {
  const [openRegister, setOpenRegister] = useState<boolean>(false);

  const dispatchApp = useAppDispatch();
  const { employeeList, loading } = useAppState();

  useEffect(() => {
    getEmployee(dispatchApp);
  }, []);

  return (
    <BaseLayout pageId="employees">
      <div className="container">
        <div className="level">
          <div className="level-left">
            <h1 className="title">Employee List</h1>
          </div>

          <div className="level-right">
            <button type="button" className="button is-link is-light" onClick={() => setOpenRegister(!openRegister)}>
              Register employee
            </button>
          </div>
        </div>

        {loading ? <Loader /> : <Table data={employeeList} />}
      </div>

      <>
        {openRegister && (
          <Modal setOpenModal={setOpenRegister}>
            <EmployeeRegister setCloseRegister={setOpenRegister} />
          </Modal>
        )}
      </>
    </BaseLayout>
  );
};
export default EmployeesPage;
