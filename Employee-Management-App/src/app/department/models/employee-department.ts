export interface DepartmentResponseDTO {
  name: string;
  location: string;
}

export interface EmployeeKey{
  empId: number;
  email: string;
}

export interface Employee {
  key: EmployeeKey;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  deptId: number;
  departmentResponseDTO: DepartmentResponseDTO;
  salary: number;
  status: string;
  hireDate: Date;
}