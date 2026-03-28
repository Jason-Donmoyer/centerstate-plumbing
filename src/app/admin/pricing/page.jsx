import { createServerSupabaseClient } from '@/lib/supabase-server'
import PricingManager from '@/components/admin/PricingManager'

export default async function Pricing() {
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase
        .from('pricing_cards')
        .select('*')
    if (error) {
        console.error("There was a problem loading the data:", error)
        return <p>{error.message}</p>
    }

    return (
        <PricingManager data={data}></PricingManager>
    )
}