import { Router } from 'express';
import WarehouseRoutes from './warehouse.routes';


const router = Router();

router.use('/warehouse', WarehouseRoutes);


export default router;
