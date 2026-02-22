import React, { useEffect, useState } from 'react';
import { FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function Overview({ user, setIsProjectModalOpen }: any) {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [projRes, clientRes] = await Promise.all([
                api.get('/projects').catch(() => ({ data: [] })),
                api.get('/clients').catch(() => ({ data: [] }))
            ]);
            setProjects(projRes.data);
            setClients(clientRes.data);
        } catch (error) {
            console.error('Failed to fetch dashboard data', error);
        }
    };

    return (
        <div className="flex-1 overflow-auto p-4 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <p className="text-slate-500 font-medium text-sm mb-1 relative z-10">Active Projects</p>
                    <h3 className="text-3xl font-bold text-slate-900 relative z-10">{projects.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <p className="text-slate-500 font-medium text-sm mb-1 relative z-10">Total Clients</p>
                    <h3 className="text-3xl font-bold text-slate-900 relative z-10">{clients.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                    <p className="text-slate-500 font-medium text-sm mb-1 relative z-10">Tasks Due</p>
                    <h3 className="text-3xl font-bold text-slate-900 relative z-10">0</h3>
                </div>
            </div>

            {/* Recent Projects */}
            <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Projects</h2>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
                {projects.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 flex flex-col items-center">
                        <FolderOpen className="w-12 h-12 text-slate-300 mb-3" />
                        <p className="mb-4">No projects found. Create your first project to get started!</p>
                        <button
                            onClick={() => setIsProjectModalOpen(true)}
                            className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium border border-primary-100 hover:bg-primary-100 transition-colors"
                        >
                            Create Project
                        </button>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100 text-sm font-medium text-slate-500">
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Created Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {projects.map((proj) => (
                                <tr key={proj.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => navigate(`/dashboard/projects/${proj.id}`)}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{proj.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{proj.client?.companyName || 'No Client Info'}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                            {proj.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">
                                        {new Date(proj.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
