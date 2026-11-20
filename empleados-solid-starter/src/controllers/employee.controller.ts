import { NextFunction, Request, Response } from 'express';
import { EmployeeService, employeeService } from '../services/employee.service';

export class EmployeeController {
  constructor(private readonly service: EmployeeService = employeeService) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employee = await this.service.create(req.body);
      console.log(`Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`);
      res.status(201).json(employee);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(await this.service.findAll());
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      res.json(await this.service.findById(id));
    } catch (error) {
      next(error);
    }
  };
}

export const employeeController = new EmployeeController();
export default EmployeeController;
