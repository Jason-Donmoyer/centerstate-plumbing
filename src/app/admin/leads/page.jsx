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
        <div>
            <h1>Leads</h1>
            <div>
                {data.map(lead => (
                    <div 
                        key={lead.id}
                        className="flex flex-col items-center justify-center py-12 px-8 gap-2 bg-brand-silver"
                    >
                        <h2 className="font-bold text-2xl">{lead.name}</h2>
                        <h3 className="font-semibold">{lead.phone}</h3>
                        <p>{lead.email}</p>
                        <p>{lead.urgency}</p>
                        <div className="flex text-center py-12 px-8 gap-8 w-full">
                            <h4>{lead.service_type}</h4>
                            <p>{lead.message}</p>
                        </div>
                        <div>
                            {lead.read 
                            ? <p className="text-white bg-brand-light-blue font-bold rounded p-5">Viewed</p> 
                            :
                            <p className="text-white bg-brand-orange font-bold rounded p-5">New Lead</p>
                            }
                        </div>
                        <MarkAsRead leadId={lead.id} isRead={lead.read}></MarkAsRead>
                    </div>

                ))}
            </div>
        </div>
    )
}