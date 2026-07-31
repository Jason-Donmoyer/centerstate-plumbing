// app/admin/leads/page.jsx
import { createServerSupabaseClient } from '@/lib/supabase-server'
import MarkAsRead from '@/components/admin/MarkAsRead'

export default async function ShowLeads() {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('There was an error fetching leads:', error)
        return <p className="text-red-500 p-8">{error.message}</p>
    }

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-extrabold text-3xl text-text mb-8">Leads</h1>

                <div className="flex flex-col gap-4">
                    {data.map(lead => {
                        const isEmergency = lead.urgency === 'emergency'
                        const isUnread = !lead.read

                        return (
                            <div key={lead.id}
                                 className={`bg-surface rounded-2xl border p-6 transition-all
                                     ${isEmergency
                                         ? 'border-l-4 border-l-accent border-gray-200'
                                         : 'border-border'
                                     }`}
                            >
                                {/* Header row */}
                                <div className="flex items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h2 className="font-bold text-xl text-text">{lead.name}</h2>
                                        <p className="text-sm text-muted mt-0.5">
                                            {new Date(lead.created_at).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {isEmergency && (
                                            <span className="bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                                                Emergency
                                            </span>
                                        )}
                                        <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full
                                            ${isUnread
                                                ? 'bg-accent text-white'
                                                : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {isUnread ? 'New Lead' : 'Viewed'}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact info */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-0.5">Phone</p>
                                        <p className="text-[14px] font-semibold text-text">{lead.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-0.5">Email</p>
                                        <p className="text-[14px] text-text">{lead.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-0.5">Service</p>
                                        <p className="text-[14px] text-text capitalize">{lead.service_type?.replace(/_/g, ' ')}</p>
                                    </div>
                                </div>

                                {/* Message */}
                                {lead.message && (
                                    <div className="bg-background rounded-xl px-4 py-3 mb-4">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">Message</p>
                                        <p className="text-[14px] text-gray-700 leading-relaxed">{lead.message}</p>
                                    </div>
                                )}

                                <MarkAsRead leadId={lead.id} isRead={lead.read} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
