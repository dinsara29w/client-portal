import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layers } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/auth/login', formData);
            toast.success('Welcome back!');

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            <div className="glass max-w-md w-full p-8 rounded-3xl relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-4">
                        <Layers className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
                    <p className="text-slate-500">Sign in to your client portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Work Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white/50"
                            placeholder="you@agency.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white/50"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-slate-600 cursor-pointer">
                            <input type="checkbox" className="mr-2 rounded text-primary-600 focus:ring-primary-500" />
                            Remember me
                        </label>
                        <a href="#" className="text-primary-600 font-medium hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center disabled:opacity-70"
                    >
                        {loading ? <span className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin"></span> : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-slate-500 text-sm mt-8">
                    Don't have an account? <Link to="/register" className="text-primary-600 font-medium hover:underline">Create a Portal</Link>
                </p>
            </div>
        </div>
    );
}
