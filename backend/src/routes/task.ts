import { Router } from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controllers/task';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router({ mergeParams: true });

router.use(authenticate);

router.get('/', getTasks);
router.post('/', requireRole(['OWNER', 'STAFF']), createTask);
router.put('/:id/status', requireRole(['OWNER', 'STAFF']), updateTaskStatus);

export default router;
