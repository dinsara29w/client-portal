import { Request, Response } from 'express';
import prisma from '../utils/prisma';

interface AuthRequest extends Request {
    user?: {
        id: string;
        workspaceId: string;
        role: string;
    };
}

export const createProject = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, clientId } = req.body;
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const project = await prisma.project.create({
            data: {
                title,
                description,
                clientId,
                workspaceId,
            },
        });

        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
};

export const getProjects = async (req: AuthRequest, res: Response) => {
    try {
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const projects = await prisma.project.findMany({
            where: { workspaceId },
            include: {
                client: {
                    select: { companyName: true, contactEmail: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const project = await prisma.project.findFirst({
            where: { id, workspaceId },
            include: {
                client: true,
                tasks: true,
                files: true,
                comments: {
                    include: { user: { select: { name: true } } }
                }
            }
        });

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
};
