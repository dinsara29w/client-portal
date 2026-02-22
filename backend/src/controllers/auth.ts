import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name, workspaceName } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create workspace and owner user in a transaction
        const result = await prisma.$transaction(async (tx: any) => {
            const workspace = await tx.workspace.create({
                data: { name: workspaceName },
            });

            const user = await tx.user.create({
                data: {
                    email,
                    passwordHash,
                    name,
                    role: 'OWNER',
                    workspaceId: workspace.id,
                },
            });

            return { workspace, user };
        });

        const token = jwt.sign(
            { id: result.user.id, workspaceId: result.workspace.id, role: result.user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'Registration successful',
            token,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                role: result.user.role,
                workspaceId: result.workspace.id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, workspaceId: user.workspaceId, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                workspaceId: user.workspaceId,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};
