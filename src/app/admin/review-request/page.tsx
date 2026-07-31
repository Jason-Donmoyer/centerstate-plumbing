import { createServerSupabaseClient } from '@/lib/supabase-server'
import ReviewRequestManager from '@/components/admin/ReviewRequestManager'

export default async function ReviewRequestPage() {
    const supabase = await createServerSupabaseClient()

    const { data: requests, error } = await supabase
    .from('review_requests')
    .select('*')
    .order('sent_at', { ascending: false })

    if (error) return <p className="text-red-500 p-8">{error.message}</p>

    return <ReviewRequestManager requests={requests} />
}

