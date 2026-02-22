import { Request, Response } from 'express';
import prisma from '../utils/prisma';

interface AuthRequest extends Request {
    user?: {
        id: string;
        workspaceId: string;
        role: string;
    };
}

export const createClient = async (req: AuthRequest, res: Response) => {
    try {
        const { companyName, contactEmail, phone } = req.body;
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const client = await prisma.client.create({
            data: {
                companyName,
                contactEmail,
                phone,
                workspaceId,
            },
        });

        res.status(201).json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create client' });
    }
};

export const getClients = async (req: AuthRequest, res: Response) => {
    try {
        const workspaceId = req.user?.workspaceId;

        if (!workspaceId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const clients = await prisma.client.findMany({
            where: { workspaceId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch clients' });
    }
};
