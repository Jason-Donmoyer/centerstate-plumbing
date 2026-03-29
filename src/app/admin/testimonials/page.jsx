import { createServerSupabaseClient } from '@/lib/supabase-server'
import TestimonialsManager from '@/components/admin/TestimonialsManager'

export default async function Testimonials() {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
    if (error) {
        console.error('There was an error fetching data:', error)
        return <p>{error.message}</p>
    }

    return (
        <TestimonialsManager data={data}></TestimonialsManager>
    )
}