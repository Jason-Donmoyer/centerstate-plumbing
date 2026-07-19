// app/admin/page.jsx (Dashboard)
import { createServerSupabaseClient } from '@/lib/supabase-server'
import FloatingEmergencyToggle from '@/components/admin/FloatingEmergencyToggle'
import Link from 'next/link'

export default async function Dashboard() {
    const supabase = await createServerSupabaseClient()

    const [
        { count: unreadCount, error: leadError },
        { count: emergencyCount, error: emergencyError },
        { count: totalCount }
    ] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('read', false),
        supabase.from('leads').select('*', { count: 'exact', head: true }).eq('urgency', 'emergency').eq('read', false),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
    ])

    if (leadError) return <p className="text-red-500 p-8">Error loading leads.</p>
    if (emergencyError) return <p className="text-red-500 p-8">Error loading emergency leads.</p>

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-extrabold text-3xl text-text mb-2">Dashboard</h1>
                <p className="text-muted text-[15px] mb-10">Centerstate Plumbing & Heating — Admin</p>

                {/* Stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <div className="bg-surface border border-border rounded-2xl p-6">
                        <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted mb-2">Unread Leads</p>
                        <p className="font-black text-4xl text-primary">{unreadCount ?? 0}</p>
                    </div>
                    <div className={`rounded-2xl p-6 border ${(emergencyCount ?? 0) > 0 ? 'bg-red-50 border-red-200' : 'bg-surface border-border'}`}>
                        <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted mb-2">Emergency (Unread)</p>
                        <p className={`font-black text-4xl ${(emergencyCount ?? 0) > 0 ? 'bg-red-50 border-red-200' : 'bg-surface border-border'}`}>
                            {emergencyCount ?? 0}
                        </p>
                    </div>
                    <div className="bg-surface border border-border rounded-2xl p-6">
                        <p className="text-[11px] font-bold uppercase tracking-[2px] text-muted mb-2">Total Leads</p>
                        <p className="font-black text-4xl text-primary">{totalCount ?? 0}</p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                    <Link href="./leads"
                          className="bg-primary hover:bg-primary-light text-white font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-3 rounded-lg transition-colors">
                        View All Leads
                    </Link>
                </div>

                <FloatingEmergencyToggle />
            </div>
        </div>
    )
}

// import { createServerSupabaseClient } from '@/lib/supabase-server'
// import FloatingEmergencyToggle from '@/components/admin/FloatingEmergencyToggle'
// import Link from 'next/link'

// export default async function Dashboard() {
//     const supabase = await createServerSupabaseClient()

//     const [
//         { count: unreadCount, error: leadError },
//         { count: emergencyCount, error: emergencyError }
//     ] = await Promise.all([
//         supabase.from('leads').select('*', { count: 'exact', head: true }).eq('read', false),
//         supabase.from('leads').select('*', { count: 'exact', head: true }).eq('urgency', 'emergency')
//     ])
//         if (leadError) return <p>There was an error getting unread leads.</p>
//         if (emergencyError) return <p>There was an error getting emergency.</p>


//     return (
//         <div className="flex flex-col items-center min-h-screen bg-gray-50 py-12 px-8">
//             <h1 className="p-8 text-2xl font-bold">Dashboard</h1>
//             <div className="flex flex-col bg-brand-blue items-center justify-center py-12 px-8 gap-2 rounded-2xl m-6 w-2/3">
//                 <h2 className="text-white font-extrabold text-2xl">Unread Leads: {unreadCount}</h2>
//             </div>
//             <div className="flex flex-col bg-brand-orange items-center justify-center py-12 px-8 gap-2 rounded-2xl m-6 w-2/3">
//                 <h2 className="text-white font-extrabold text-2xl">Emergency Leads: {emergencyCount}</h2>
//             </div>
//             <Link 
//                 href="./leads"
//                 className="rounded-2xl bg-brand-orange text-white font-semibold p-4 hover:bg-brand-light-blue"
//             >
//                 Go To Leads
//             </Link>
//             <FloatingEmergencyToggle></FloatingEmergencyToggle>
//         </div>
//     ) 
// }