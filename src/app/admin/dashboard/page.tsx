import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'

export default async function Dashboard() {
    const supabase = await createServerSupabaseClient()

    const [
        { count: unreadCount, error: leadError },
        { count: emergencyCount, error: emergencyError }
    ] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('read', false),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('urgency', 'emergency')
    ])
        if (leadError) return <p>There was an error getting unread leads.</p>
        if (emergencyError) return <p>There was an error getting emergency.</p>


    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-8">
            <h1 className="p-8 text-2xl font-bold">Dashboard</h1>
            <div className="flex flex-col bg-brand-blue items-center justify-center py-12 px-8 gap-2 rounded-2xl m-6 w-2/3">
                <h2 className="text-white font-extrabold text-2xl">Unread Leads: {unreadCount}</h2>
            </div>
            <div className="flex flex-col bg-brand-orange items-center justify-center py-12 px-8 gap-2 rounded-2xl m-6 w-2/3">
                <h2 className="text-white font-extrabold text-2xl">Emergency Leads: {emergencyCount}</h2>
            </div>
            <Link 
                href="./leads"
                className="rounded-2xl bg-brand-orange text-white font-semibold p-4 hover:bg-brand-light-blue"
            >
                Go To Leads
            </Link>
        </div>
    ) 
}