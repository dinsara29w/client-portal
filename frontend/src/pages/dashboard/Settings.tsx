import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
    return (
        <div className="flex-1 overflow-auto p-4 md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>

            <div className="max-w-2xl space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <SettingsIcon className="w-5 h-5" /> Workspace Settings
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Workspace Name</label>
                            <input
                                type="text"
                                defaultValue="My Agency"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
                            <input
                                type="url"
                                placeholder="https://example.com/logo.png"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-2">Danger Zone</h2>
                    <p className="text-slate-500 text-sm mb-6">These actions are irreversible. Please proceed with caution.</p>
                    <button className="px-5 py-2.5 border border-red-200 bg-red-50 text-red-700 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors">
                        Delete Workspace
                    </button>
                </div>
            </div>
        </div>
    );
}
