import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, FolderOpen, Settings, Bell, Search, Plus, LogOut, X, Building2 } from 'lucide-react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import Overview from './dashboard/Overview';
import ProjectDetails from './dashboard/ProjectDetails';

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);

    // Modal states shared across dashboard components
    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    // Forms & required options for Projects
    const [newClient, setNewClient] = useState({ companyName: '', contactEmail: '', phone: '' });
    const [newProject, setNewProject] = useState({ title: '', description: '', clientId: '' });
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!storedUser || !token) {
            toast.error('Please login first');
            navigate('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
        fetchClients();
    }, [navigate]);

    const fetchClients = async () => {
        try {
            const res = await api.get('/clients');
            setClients(res.data);
        } catch (e) { console.error('Error fetching clients'); }
    }

    const handleCreateClient = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClient.companyName || !newClient.contactEmail) return toast.error('Company Name and Email are required.');

        setLoading(true);
        try {
            await api.post('/clients', newClient);
            toast.success('Client added successfully!');
            setIsClientModalOpen(false);
            setNewClient({ companyName: '', contactEmail: '', phone: '' });
            fetchClients();
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create client');
        } finally { setLoading(false); }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProject.title || !newProject.clientId) return toast.error('Project Title and Client are required.');

        setLoading(true);
        try {
            const res = await api.post('/projects', newProject);
            toast.success('Project created successfully!');
            setIsProjectModalOpen(false);
            setNewProject({ title: '', description: '', clientId: '' });
            // Redirect to the new project
            navigate(`/dashboard/projects/${res.data.id}`);
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create project');
        } finally { setLoading(false); }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const getInitials = (name: string) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) : 'A';

    const navClass = (path: string) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${location.pathname === path || (path !== '/dashboard' && location.pathname.startsWith(path))
            ? 'bg-primary-50 text-primary-700'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`;

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
                    <Link to="/dashboard" className={navClass('/dashboard')}>
                        <LayoutDashboard className="w-5 h-5" /> Overview
                    </Link>
                    <Link to="/dashboard" className={navClass('/dashboard/projects')}>
                        <FolderOpen className="w-5 h-5" /> Projects
                    </Link>
                    <Link to="/dashboard" className={navClass('/dashboard/clients')}>
                        <Users className="w-5 h-5" /> Clients
                    </Link>
                    <Link to="/dashboard" className={navClass('/dashboard/settings')}>
                        <Settings className="w-5 h-5" /> Settings
                    </Link>
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

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 w-full shrink-0">
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

                {/* Dynamic Nested Routes */}
                <div className="flex-1 overflow-auto bg-slate-50 relative">
                    <Routes>
                        <Route path="/" element={<Overview user={user} setIsProjectModalOpen={setIsProjectModalOpen} />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="*" element={<Overview user={user} setIsProjectModalOpen={setIsProjectModalOpen} />} />
                    </Routes>
                </div>
            </main>

            {/* --- MODALS (Shared across all dashboard views) --- */}
            {/* ... [Client Modal Same as before but minimized] */}
            {isClientModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-900">Add New Client</h3>
                            <button onClick={() => setIsClientModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleCreateClient} className="p-6 space-y-4">
                            <div><label className="text-sm font-medium text-slate-700">Company Name</label><input required className="w-full px-4 py-2 mt-1 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" value={newClient.companyName} onChange={e => setNewClient({ ...newClient, companyName: e.target.value })} /></div>
                            <div><label className="text-sm font-medium text-slate-700">Contact Email</label><input type="email" required className="w-full px-4 py-2 mt-1 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" value={newClient.contactEmail} onChange={e => setNewClient({ ...newClient, contactEmail: e.target.value })} /></div>
                            <div><label className="text-sm font-medium text-slate-700">Phone</label><input className="w-full px-4 py-2 mt-1 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} /></div>
                            <div className="pt-2 flex justify-end gap-3"><button type="button" onClick={() => setIsClientModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button><button type="submit" disabled={loading} className="px-4 py-2 bg-primary-600 text-white rounded-lg">{loading ? 'Saving...' : 'Save'}</button></div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Project Modal */}
            {isProjectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="font-bold text-lg text-slate-900">Create New Project</h3>
                            <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleCreateProject} className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Client</label>
                                {clients.length === 0 ? <p className="text-amber-600 text-sm mt-1">Please add a client first.</p> :
                                    <select required className="w-full px-4 py-2 mt-1 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" value={newProject.clientId} onChange={e => setNewProject({ ...newProject, clientId: e.target.value })}>
                                        <option value="" disabled>Select a client...</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                                    </select>
                                }
                            </div>
                            <div><label className="text-sm font-medium text-slate-700">Project Title</label><input required className="w-full px-4 py-2 mt-1 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} /></div>
                            <div><label className="text-sm font-medium text-slate-700">Description</label><textarea className="w-full px-4 py-2 mt-1 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} /></div>
                            <div className="pt-2 flex justify-end gap-3"><button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button><button type="submit" disabled={loading || clients.length === 0} className="px-4 py-2 bg-slate-900 text-white rounded-lg">{loading ? 'Creating...' : 'Create Project'}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
