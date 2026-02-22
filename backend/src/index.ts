import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './utils/prisma';
import authRoutes from './routes/auth';
import workspaceRoutes from './routes/workspace';
import projectRoutes from './routes/project';
import clientRoutes from './routes/client';
import taskRoutes from './routes/task';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workspace', workspaceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/projects/:projectId/tasks', taskRoutes);

// Main health-check route
app.get('/api/health', async (req, res) => {
    try {
        // Quick db test
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'healthy', db: 'connected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'unhealthy', error: 'Database connection failed' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
