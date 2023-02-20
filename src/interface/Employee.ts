export interface IEmployee {
  id?: number;
  name: string;
  last_name: string;
  birthday: number;
}

export interface IData {
  employees: IEmployee[];
}

export interface IGetEmployeeResponse {
  success: boolean;
  data: IData;
}
export interface IEmployeeRequest extends Omit<IEmployee, 'birthday'> {
  birthday: string;
}
