import { Request, Response } from 'express';
import prisma from '../utils/prisma';

interface AuthRequest extends Request {
    user?: {
        id: string;
        workspaceId: string;
        role: string;
    };
}

export const getWorkspace = async (req: AuthRequest, res: Response) => {
    try {
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
            include: {
                users: {
                    select: { id: true, name: true, email: true, role: true }
                }
            }
        });

        if (!workspace) {
            return res.status(404).json({ error: 'Workspace not found' });
        }

        res.json(workspace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch workspace' });
    }
};

export const updateWorkspace = async (req: AuthRequest, res: Response) => {
    try {
        const workspaceId = req.user?.workspaceId;
        const { name, logoUrl } = req.body;

        if (!workspaceId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const updatedWorkspace = await prisma.workspace.update({
            where: { id: workspaceId },
            data: { name, logoUrl },
        });

        res.json(updatedWorkspace);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update workspace' });
    }
};
