import { AppError } from '../errorHandler';
import { EmployeeDocument } from '../models/employee.model';
import { EmployeeRepository, employeeRepository } from '../repositories/employee.repository';

export interface CreateEmployeeInput {
  name?: unknown;
  position?: unknown;
  baseSalary?: unknown;
  yearsOfService?: unknown;
}

export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository = employeeRepository) {}

  async create(input: CreateEmployeeInput): Promise<EmployeeDocument> {
    const { name, position, baseSalary, yearsOfService } = input;

    if (!name || !position) {
      throw new AppError(400, 'Nombre y puesto son obligatorios');
    }

    if (typeof baseSalary !== 'number' || baseSalary <= 0) {
      throw new AppError(400, 'El salario base debe ser mayor a 0');
    }

    if (
      typeof yearsOfService !== 'number' ||
      yearsOfService < 0 ||
      !Number.isInteger(yearsOfService)
    ) {
      throw new AppError(400, 'La antigüedad debe ser un entero mayor o igual a 0');
    }

    const bonus = baseSalary * 0.02 * yearsOfService;
    const finalSalary = baseSalary + bonus;

    return this.repository.create({
      name: name as string,
      position: position as string,
      baseSalary,
      yearsOfService,
      finalSalary
    });
  }

  findAll(): Promise<EmployeeDocument[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<EmployeeDocument> {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new AppError(404, 'Empleado no encontrado');
    }

    return employee;
  }
}

export const employeeService = new EmployeeService();
export default EmployeeService;
