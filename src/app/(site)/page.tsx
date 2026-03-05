import { createServerSupabaseClient } from '@/lib/supabase-server.js'
import Hero from '@/components/site/Hero'

export default async function HomePage() {
    const supabase = await createServerSupabaseClient()

    const { data, error} = await supabase
        .from('content_blocks')
        .select('*')
        .eq('id', 'hero')
    
        if (error) {
            console.error("There was an error fetchikng data:", error)
            return (
                <p>There was an error loading this page.</p>
            )
        }

    return (
        <div>
            <Hero heroData={data[0]}></Hero>
        </div>
    )
}