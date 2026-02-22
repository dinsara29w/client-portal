import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, FolderOpen, Settings, Bell, Search, Plus, LogOut, X, Building2 } from 'lucide-react';
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import Overview from './dashboard/Overview';
import ProjectDetails from './dashboard/ProjectDetails';
import ProjectsList from './dashboard/ProjectsList';
import ClientsPage from './dashboard/Clients';
import SettingsPage from './dashboard/Settings';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);

    const [isClientModalOpen, setIsClientModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

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
    };

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
            toast.success('Project created!');
            setIsProjectModalOpen(false);
            setNewProject({ title: '', description: '', clientId: '' });
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

    // Active nav link style helper
    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`;

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex relative">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex-col hidden md:flex shrink-0">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center font-bold">A</div>
                    <span className="font-bold text-slate-800 text-lg tracking-tight">Antigravity</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <NavLink to="/dashboard" end className={navLinkClass}>
                        <LayoutDashboard className="w-5 h-5" /> Overview
                    </NavLink>
                    <NavLink to="/dashboard/projects" className={navLinkClass}>
                        <FolderOpen className="w-5 h-5" /> Projects
                    </NavLink>
                    <NavLink to="/dashboard/clients" className={navLinkClass}>
                        <Users className="w-5 h-5" /> Clients
                    </NavLink>
                    <NavLink to="/dashboard/settings" className={navLinkClass}>
                        <Settings className="w-5 h-5" /> Settings
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
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
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10 shrink-0">
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
                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsClientModalOpen(true)} className="hidden md:flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                            <Building2 className="w-4 h-4" /> Add Client
                        </button>
                        <button onClick={() => setIsProjectModalOpen(true)} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                            <Plus className="w-4 h-4" /> New Project
                        </button>
                    </div>
                </header>

                {/* Nested Page Routes */}
                <div className="flex-1 overflow-auto bg-slate-50 flex flex-col">
                    <Routes>
                        <Route path="/" element={<Overview user={user} setIsProjectModalOpen={setIsProjectModalOpen} />} />
                        <Route path="/projects" element={<ProjectsList />} />
                        <Route path="/projects/:id" element={<ProjectDetails />} />
                        <Route path="/clients" element={<ClientsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        <Route path="*" element={<Overview user={user} setIsProjectModalOpen={setIsProjectModalOpen} />} />
                    </Routes>
                </div>
            </main>

            {/* ===== MODALS ===== */}

            {/* Add Client Modal */}
            {isClientModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-900">Add New Client</h3>
                            <button onClick={() => setIsClientModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleCreateClient} className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">Company Name *</label>
                                <input required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Acme Corp" value={newClient.companyName} onChange={e => setNewClient({ ...newClient, companyName: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">Contact Email *</label>
                                <input type="email" required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="contact@acme.com" value={newClient.contactEmail} onChange={e => setNewClient({ ...newClient, contactEmail: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">Phone</label>
                                <input className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="+1 (555) 000-0000" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} />
                            </div>
                            <div className="pt-2 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsClientModalOpen(false)} className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                                <button type="submit" disabled={loading} className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-70">{loading ? 'Saving...' : 'Save Client'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* New Project Modal */}
            {isProjectModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-900">Create New Project</h3>
                            <button onClick={() => setIsProjectModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleCreateProject} className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">Client *</label>
                                {clients.length === 0 ? (
                                    <p className="text-amber-700 text-sm p-3 bg-amber-50 rounded-lg border border-amber-200">
                                        Please <button type="button" onClick={() => { setIsProjectModalOpen(false); setIsClientModalOpen(true) }} className="font-bold underline">add a client</button> first.
                                    </p>
                                ) : (
                                    <select required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white" value={newProject.clientId} onChange={e => setNewProject({ ...newProject, clientId: e.target.value })}>
                                        <option value="" disabled>Select a client...</option>
                                        {clients.map(c => <option key={c.id} value={c.id}>{c.companyName}</option>)}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">Project Title *</label>
                                <input required className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Website Redesign" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 block mb-1">Description (optional)</label>
                                <textarea rows={3} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none resize-none" placeholder="Brief project outline..." value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })} />
                            </div>
                            <div className="pt-2 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Cancel</button>
                                <button type="submit" disabled={loading || clients.length === 0} className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-70">{loading ? 'Creating...' : 'Create Project'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
