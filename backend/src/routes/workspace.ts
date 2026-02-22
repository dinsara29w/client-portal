import { Router } from 'express';
import { getWorkspace, updateWorkspace } from '../controllers/workspace';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', getWorkspace);
router.put('/', requireRole(['OWNER']), updateWorkspace);

export default router;
