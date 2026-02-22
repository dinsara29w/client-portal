import { Router } from 'express';
import { createClient, getClients } from '../controllers/client';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', getClients);
router.post('/', requireRole(['OWNER', 'STAFF']), createClient);

export default router;
