import React, { useEffect, useState } from 'react';
import { Users, Mail, Phone } from 'lucide-react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function Clients() {
    const [clients, setClients] = useState<any[]>([]);

    useEffect(() => {
        api.get('/clients')
            .then(res => setClients(res.data))
            .catch(() => toast.error('Failed to load clients'));
    }, []);

    return (
        <div className="flex-1 overflow-auto p-4 md:p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
            </div>

            {clients.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center">
                    <Users className="w-16 h-16 text-slate-300 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">No clients yet</h3>
                    <p className="text-slate-500 text-sm">Click "Add Client" in the header to add your first client.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clients.map((client) => (
                        <div key={client.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl mb-4">
                                {client.companyName[0]}
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-3">{client.companyName}</h3>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <a href={`mailto:${client.contactEmail}`} className="hover:text-primary-600 transition-colors">{client.contactEmail}</a>
                                </div>
                                {client.phone && (
                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <span>{client.phone}</span>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                                Added {new Date(client.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
