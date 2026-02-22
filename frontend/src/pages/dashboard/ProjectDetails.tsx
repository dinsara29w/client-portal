import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle2, Circle } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function ProjectDetails() {
    const { id } = useParams();
    const [project, setProject] = useState<any>(null);
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // New task form state
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isAddingTask, setIsAddingTask] = useState(false);

    useEffect(() => {
        fetchProjectDetails();
        fetchTasks();
    }, [id]);

    const fetchProjectDetails = async () => {
        try {
            const res = await api.get(`/projects/${id}`);
            setProject(res.data);
        } catch (error) {
            toast.error('Failed to load project details');
        } finally {
            setLoading(false);
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/projects/${id}/tasks`);
            setTasks(res.data);
        } catch (error) {
            console.error('Failed to load tasks', error);
        }
    };

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle) return;
        try {
            await api.post(`/projects/${id}/tasks`, { title: newTaskTitle });
            setNewTaskTitle('');
            setIsAddingTask(false);
            fetchTasks();
            toast.success('Task added');
        } catch (error) {
            toast.error('Failed to create task');
        }
    };

    const toggleTaskStatus = async (task: any) => {
        try {
            const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';
            await api.put(`/projects/${id}/tasks/${task.id}/status`, { status: newStatus });
            fetchTasks();
        } catch (error) {
            toast.error('Failed to update task');
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;
    if (!project) return <div className="p-8">Project not found</div>;

    return (
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50 flex flex-col h-full">
            <div className="mb-6">
                <Link to="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 mb-1">{project.title}</h1>
                        <p className="text-slate-600">{project.client?.companyName} • Created {new Date(project.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-bold rounded-full border border-emerald-200">
                        {project.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">

                {/* Main Workspace Area (Tasks) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Tasks</h2>
                            <button
                                onClick={() => setIsAddingTask(!isAddingTask)}
                                className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-lg hover:bg-primary-100 transition-colors flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" /> Add Task
                            </button>
                        </div>

                        {isAddingTask && (
                            <form onSubmit={handleCreateTask} className="mb-6 flex gap-2 animate-in fade-in slide-in-from-top-2">
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="What needs to be done?"
                                    className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                                    value={newTaskTitle}
                                    onChange={e => setNewTaskTitle(e.target.value)}
                                />
                                <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">Save</button>
                            </form>
                        )}

                        <div className="space-y-2">
                            {tasks.length === 0 && !isAddingTask ? (
                                <div className="text-center py-8 text-slate-400 text-sm">No tasks added yet. Get started by adding a task.</div>
                            ) : (
                                tasks.map(task => (
                                    <div key={task.id} className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100 group">
                                        <button onClick={() => toggleTaskStatus(task)} className="text-slate-400 group-hover:text-primary-500 transition-colors focus:outline-none">
                                            {task.status === 'DONE' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6" />}
                                        </button>
                                        <span className={`text-slate-800 flex-1 ${task.status === 'DONE' ? 'line-through text-slate-400' : ''}`}>
                                            {task.title}
                                        </span>
                                        <span className="text-xs font-semibold text-slate-400 px-2 py-1 bg-slate-100 rounded-md">
                                            {task.priority}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info & Files */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Project Info</h2>
                        <div className="space-y-4 text-sm">
                            <div>
                                <p className="text-slate-500 mb-1">Description</p>
                                <p className="text-slate-800">{project.description || 'No description provided.'}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-slate-500 mb-1">Client Content POC</p>
                                <p className="font-medium text-slate-800">{project.client?.contactEmail}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold text-slate-900">Files</h2>
                            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">Upload</button>
                        </div>
                        <div className="text-center py-6 text-slate-500">
                            <p className="text-sm">No files uploaded yet.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
