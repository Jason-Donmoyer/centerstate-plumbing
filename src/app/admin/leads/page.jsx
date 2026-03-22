import { createServerSupabaseClient } from '@/lib/supabase-server'
import MarkAsRead from '@/components/admin/MarkAsRead'
 
export default async function ShowLeads() {
    const supabase = await createServerSupabaseClient()

    const {data, error} = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        if (error) {
            console.error('There was an error fetching leads:', error)
            return ( <p>{error.message}</p> )
        }
    

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-8">
            <h1 className="font-bold text-4xl text-brand-blue text-center mb-8">Leads</h1>
            <div className="flex flex-col items-center gap-6">
                {data.map(lead => {
                    const cardBase = "flex flex-col items-center justify-center py-12 px-8 gap-2 rounded-2xl m-6 w-2/3"
                    return (
                            <div 
                            key={lead.id}
                            className={`${cardBase} ${lead.urgency === 'emergency' ? 'bg-red-50 border-l-sky-400 border-brand-orange' : 'bg-white border-gray-200'}`}
                            >
                                <div className="flex items-center justify-between w-3/4">
                                    <h2 className="font-bold text-xl text-brand-blue">{lead.name}</h2>
                                    {lead.read 
                                    ? <p className="text-white bg-brand-light-blue font-bold rounded-full px-4 py-1 text-sm">Viewed</p> 
                                    :
                                    <p className="text-white bg-brand-orange font-bold rounded-full px-4 py-1 text-sm">New Lead</p>
                                    }
                                </div>
                                
                                <p className="font-semibold text-brand-gray">{lead.phone}</p>
                                <p className="text-sm text-brand-gray">{lead.email}</p>
                                <p className="text-sm font-semibold uppercase">{lead.service_type} - {lead.urgency}</p>
                                <p className="text-sm text-brand-gray">{lead.message}</p>
                                <p>{lead.urgency}</p>
                                <MarkAsRead leadId={lead.id} isRead={lead.read}></MarkAsRead>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
}