import { Router } from 'express';
import { createProject, getProjects, getProjectById } from '../controllers/project';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

router.use(authenticate);

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', requireRole(['OWNER', 'STAFF']), createProject);

export default router;
