import { createServerSupabaseClient } from '@/lib/supabase-server'
import ContentManager from '@/components/admin/ContentManager'

export default async function Content() {
    const supabase = await createServerSupabaseClient()

    const [
        { data: about, error: aboutError },
        { data: hero, error: heroError }
    ] = await Promise.all([
        supabase.from('content_blocks').select('*').eq('id', 'about'),
        supabase.from('content_blocks').select('*').eq('id', 'hero')
    ])
    if (aboutError) return <p>There was an error getting the about data.</p>
    if (heroError) return <p>There was an error getting the hero data.</p>

    return (
        <ContentManager about={about} hero={hero}></ContentManager>
    )
}