import { createServerSupabaseClient } from '@/lib/supabase-server'
import ServicesManager from '@/components/admin/ServicesManager'

export default async function Services() {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
        .from('services')
        .select('*')
    if (error) {
        console.error('There was an error loading services:', error)
        return <p>{error.message}</p>
    }

    return (
        <ServicesManager data={data}></ServicesManager>
    )
}