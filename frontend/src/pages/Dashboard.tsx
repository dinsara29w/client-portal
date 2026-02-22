import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, FolderOpen, Settings, Bell, Search, Plus, LogOut, X, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);
    const [projects, setProjects] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);

    // Modal states
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    // Forms
    const [newClient, setNewClient] = useState({ companyName: '', contactEmail: '', phone: '' });
    const [newProject, setNewProject] = useState({ title: '', description: '', clientId: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            toast.error('Please login first');
            navigate('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
        fetchDashboardData();
    }, [navigate]);

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

    const handleCreateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClient.companyName || !newClient.contactEmail) {
            return toast.error('Company Name and Email are required.');
        }
        setLoading(true);
        try {
            await api.post('/clients', newClient);
            toast.success('Client added successfully!');
            setIsClientModalOpen(false);
            setNewClient({ companyName: '', contactEmail: '', phone: '' });
            fetchDashboardData();
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create client');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title || !newProject.clientId) {
            return toast.error('Project Title and Client are required.');
        }
        setLoading(true);
        try {
            await api.post('/projects', newProject);
            toast.success('Project created successfully!');
            setIsProjectModalOpen(false);
            setNewProject({ title: '', description: '', clientId: '' });
            fetchDashboardData();
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const getInitials = (name: string) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'A';
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex relative">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">A</div>
                    <span className="font-bold text-slate-800 text-lg tracking-tight">Antigravity</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-primary-50 text-primary-700 rounded-xl font-medium transition-colors">
                        <LayoutDashboard className="w-5 h-5" /> Overview
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors font-medium">
                        <FolderOpen className="w-5 h-5" /> Projects
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors font-medium">
                        <Users className="w-5 h-5" /> Clients
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors font-medium">
                        <Settings className="w-5 h-5" /> Settings
                    </a>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-sm font-bold text-slate-600">
                            {getInitials(user.name)}
                        </div>
                        <div className="text-sm overflow-hidden flex-1">
                            <p className="font-semibold text-slate-800 truncate">{user.name}</p>
                            <p className="text-slate-500 text-xs truncate">{user.email}</p>
                        </div>
                        <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 w-full">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-md w-full">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search projects, clients..."
                                className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent focus:bg-white focus:border-primary-500 rounded-lg text-sm transition-all outline-none focus:ring-2 focus:ring-primary-500/20"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <button onClick={() => setIsClientModalOpen(true)} className="hidden md:flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                            <Building2 className="w-4 h-4" /> Add Client
                        </button>
                        <button onClick={() => setIsProjectModalOpen(true)} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                            <Plus className="w-4 h-4" /> New Project
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-8">Welcome back, {user.name.split(' ')[0]}! 👋</h1>

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
            </main>

            {/* --- MODALS --- */}

            {/* Add Client Modal */}
            {isClientModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-900">Add New Client</h3>
                            <button onClick={() => setIsClientModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateClient} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
                                <input
                                    type="text"
                                    value={newClient.companyName}
                                    onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="Acme Corp"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email *</label>
                                <input
                                    type="email"
                                    value={newClient.contactEmail}
                                    onChange={(e) => setNewClient({ ...newClient, contactEmail: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="contact@acme.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    value={newClient.phone}
                                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div className="pt-2 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsClientModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70">
                                    {loading ? 'Saving...' : 'Save Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Project Modal */}
            {isProjectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-900">Create New Project</h3>
                            <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleCreateProject} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Client *</label>
                                {clients.length === 0 ? (
                                    <div className="text-sm p-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 mb-2">
                                        You need to add a client first.
                                        <button type="button" onClick={() => { setIsProjectModalOpen(false); setIsClientModalOpen(true); }} className="ml-2 font-bold underline">Add Client</button>
                                    </div>
                                ) : (
                                    <select
                                        value={newProject.clientId}
                                        onChange={(e) => setNewProject({ ...newProject, clientId: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
                                        required
                                    >
                                        <option value="" disabled>Select a client...</option>
                                        {clients.map(c => (
                                            <option key={c.id} value={c.id}>{c.companyName}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Project Title *</label>
                                <input
                                    type="text"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                                    placeholder="E-commerce Redesign"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                                <textarea
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all min-h-[80px]"
                                    placeholder="Brief project outline..."
                                />
                            </div>
                            <div className="pt-2 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={loading || clients.length === 0} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors disabled:opacity-70">
                                    {loading ? 'Creating...' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
