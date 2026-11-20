import Employee, { EmployeeDocument } from '../models/employee.model';

export interface CreateEmployeeData {
  name: string;
  position: string;
  baseSalary: number;
  yearsOfService: number;
  finalSalary: number;
}

export class EmployeeRepository {
  async create(data: CreateEmployeeData): Promise<EmployeeDocument> {
    return Employee.create(data);
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return Employee.find().sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<EmployeeDocument | null> {
    return Employee.findById(id);
  }
}

export const employeeRepository = new EmployeeRepository();
export default EmployeeRepository;
