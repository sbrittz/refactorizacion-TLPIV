import { Router } from 'express';
import { employeeController } from '../controllers/employee.controller';

const router = Router();

router.post('/employees', employeeController.create);
router.get('/employees', employeeController.findAll);
router.get('/employees/:id', employeeController.findById);

export default router;
