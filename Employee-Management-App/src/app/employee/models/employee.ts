export interface EmployeeKey {
  empId: number;
  email: string
}

export interface Employee {
  key: EmployeeKey;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deptId: number;
  salary: number;
  status: 'ACTIVE';
  hireDate: Date;
}
