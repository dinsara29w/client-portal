import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderOpen, Plus } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function Projects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        api.get('/projects')
            .then(res => setProjects(res.data))
            .catch(() => toast.error('Failed to load projects'));
    }, []);

    return (
        <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Projects</h1>
            </div>

            {projects.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center">
                    <FolderOpen className="w-16 h-16 text-slate-300 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No projects yet</h3>
                    <p className="text-slate-500 text-sm">Create a client first, then start a project.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                        <div
                            key={proj.id}
                            onClick={() => navigate(`/dashboard/projects/${proj.id}`)}
                            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-lg group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                    {proj.title[0]}
                                </div>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${proj.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                    {proj.status}
                                </span>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-1 text-lg">{proj.title}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{proj.description || 'No description.'}</p>
                            <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
                                <span className="font-medium">{proj.client?.companyName}</span>
                                <span>{new Date(proj.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
