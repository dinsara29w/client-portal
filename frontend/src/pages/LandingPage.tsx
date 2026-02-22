import React from 'react';
import { ArrowRight, Layers, ShieldCheck, Zap, CheckCircle2, Star, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col relative overflow-hidden font-sans">
            {/* Decorative blurred blobs */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            {/* Navigation */}
            <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
                <div className="flex items-center gap-2">
                    <Layers className="w-8 h-8 text-primary-600" />
                    <span className="text-xl font-bold tracking-tight text-slate-900">Antigravity</span>
                </div>
                <div className="flex gap-6 items-center">
                    <a href="#features" className="text-slate-600 font-medium hover:text-slate-900 transition-colors hidden md:block">Features</a>
                    <a href="#pricing" className="text-slate-600 font-medium hover:text-slate-900 transition-colors hidden md:block">Pricing</a>
                    <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
                    <Link to="/login" className="text-slate-600 font-medium hover:text-slate-900 transition-colors">
                        Login
                    </Link>
                    <Link to="/register" className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl shadow-lg hover:bg-slate-800 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                        Start Free Trial
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-grow pt-20 pb-32">
                <div className="flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-8 border border-primary-100 shadow-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        The Ultimate Client Portal for Modern Agencies
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-tight">
                        Stop Chaos. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
                            Start impressing clients.
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
                        Centralize projects, automate updates, and share files in a beautiful, personalized workspace that makes your agency look incredibly professional.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Link to="/register" className="px-8 py-4 bg-primary-600 text-white font-bold rounded-xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 hover:shadow-primary-500/40 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 text-lg">
                            Create your Portal <ArrowRight className="w-5 h-5" />
                        </Link>
                        <a href="#features" className="px-8 py-4 glass text-slate-800 font-bold rounded-xl shadow-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2 text-lg">
                            See how it works
                        </a>
                    </div>

                    {/* Feature Highlights Grid */}
                    <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto text-left relative z-20">
                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform group">
                            <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-900">Lightning Fast</h3>
                            <p className="text-slate-600 leading-relaxed">Built for speed. Navigate between projects and clients without ever waiting for a page reload. Everything feels instant.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform group">
                            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-900">Secure & Isolated</h3>
                            <p className="text-slate-600 leading-relaxed">True multi-tenant architecture ensures your agency data and client files are strictly separated and enterprise-level secure.</p>
                        </div>

                        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-transform group">
                            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 text-pink-600 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                                <Layers className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-slate-900">Premium Design</h3>
                            <p className="text-slate-600 leading-relaxed">Give your clients a 5-star digital experience with an interface that matches your high-quality work and professionalism.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Testimonial Section */}
            <section className="py-24 bg-slate-100 border-y border-slate-200 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Trusted by over 1,000+ Agencies</h2>
                        <p className="text-lg text-slate-600">See what others are saying about Antigravity Client Portal.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                            <div className="flex gap-1 mb-4 text-amber-400">
                                <Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" />
                            </div>
                            <p className="text-slate-700 text-lg mb-6 line-clamp-4">"Before Antigravity, we were drowning in long email threads and lost Google Drive links. Now, every client logs into their own portal and sees exactly where their project stands. It's been a game changer for our retention."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
                                    <p className="text-sm text-slate-500">Founder, Velocity Web</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                            <div className="flex gap-1 mb-4 text-amber-400">
                                <Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" /><Star className="fill-current w-5 h-5" />
                            </div>
                            <p className="text-slate-700 text-lg mb-6 line-clamp-4">"The multi-tenancy architecture is rock solid. We managed to onboard 40+ clients in our first week and the UI is so intuitive that we didn't have to send a single 'how-to' guide to any of them."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Mike Rossi</h4>
                                    <p className="text-sm text-slate-500">CEO, Digital Frontier</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple, transparent pricing</h2>
                    <p className="text-lg text-slate-600 mb-16">Start for free, upgrade when you need more power.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                        {/* Starter */}
                        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
                            <p className="text-slate-500 mb-6 text-sm">Perfect for freelancers starting out.</p>
                            <div className="mb-6"><span className="text-4xl font-extrabold text-slate-900">$9</span><span className="text-slate-500">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> 5 Active Clients</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> 10 Active Projects</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> 5GB Storage</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> Community Support</li>
                            </ul>
                            <Link to="/register" className="w-full py-3 rounded-xl border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 font-bold text-center transition-colors">Start Trial</Link>
                        </div>

                        {/* Pro */}
                        <div className="p-8 rounded-3xl border-2 border-primary-500 bg-white shadow-xl shadow-primary-500/10 flex flex-col relative transform md:-translate-y-4">
                            <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most Popular</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Pro</h3>
                            <p className="text-slate-500 mb-6 text-sm">For growing agencies that need more.</p>
                            <div className="mb-6"><span className="text-4xl font-extrabold text-slate-900">$29</span><span className="text-slate-500">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> 25 Active Clients</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> Unlimited Projects</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> 50GB Storage</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> Priority Email Support</li>
                            </ul>
                            <Link to="/register" className="w-full py-3 rounded-xl bg-primary-600 text-white hover:bg-primary-700 font-bold text-center transition-all shadow-md">Start Trial</Link>
                        </div>

                        {/* Agency */}
                        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Agency</h3>
                            <p className="text-slate-500 mb-6 text-sm">For established teams scaling up.</p>
                            <div className="mb-6"><span className="text-4xl font-extrabold text-slate-900">$79</span><span className="text-slate-500">/mo</span></div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> Unlimited Clients</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> Unlimited Projects</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> 250GB Storage</li>
                                <li className="flex items-center gap-3 text-slate-600"><CheckCircle2 className="w-5 h-5 text-primary-500" /> White-label Portal</li>
                            </ul>
                            <Link to="/register" className="w-full py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-center transition-colors">Start Trial</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Layers className="w-6 h-6 text-primary-500" />
                            <span className="text-xl font-bold tracking-tight text-white">Antigravity</span>
                        </div>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            The ultimate client portal designed specifically for modern agencies to eliminate chaos and impress their clients.
                        </p>
                        <p className="text-sm text-slate-500">&copy; 2026 MasterSoft Solutions. All rights reserved.</p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#features" className="hover:text-primary-400 transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-primary-400 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Changelog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
}
