import { Request, Response } from 'express';
import prisma from '../utils/prisma';

interface AuthRequest extends Request {
    user?: { id: string; workspaceId: string; role: string; };
}

export const createTask = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, status, priority } = req.body;
        const { projectId } = req.params;
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) return res.status(401).json({ error: 'Unauthorized' });

        const task = await prisma.task.create({
            data: {
                title,
                description,
                status: status || 'TODO',
                priority: priority || 'Medium',
                projectId,
                workspaceId,
            },
        });

        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create task' });
    }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
    try {
        const { projectId } = req.params;
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) return res.status(401).json({ error: 'Unauthorized' });

        const tasks = await prisma.task.findMany({
            where: { projectId, workspaceId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
};

export const updateTaskStatus = async (req: AuthRequest, res: Response) => {
    try {
        const { id, projectId } = req.params;
        const { status } = req.body;
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) return res.status(401).json({ error: 'Unauthorized' });

        const task = await prisma.task.update({
            where: { id, projectId, workspaceId },
            data: { status },
        });

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task' });
    }
};
