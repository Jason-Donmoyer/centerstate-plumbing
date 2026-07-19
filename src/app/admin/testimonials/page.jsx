// app/admin/testimonials/page.jsx
import { createServerSupabaseClient } from '@/lib/supabase-server'
import TestimonialsManager from '@/components/admin/TestimonialsManager'

export default async function TestimonialsPage() {
    const supabase = await createServerSupabaseClient()

    const { data: testimonials, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true })

    if (error) return <p className="text-red-500 p-8">{error.message}</p>

    return <TestimonialsManager data={testimonials} />
}

// import { createServerSupabaseClient } from '@/lib/supabase-server'
// import TestimonialsManager from '@/components/admin/TestimonialsManager'

// export default async function Testimonials() {
//     const supabase = await createServerSupabaseClient()

//     const { data, error } = await supabase
//         .from('testimonials')
//         .select('*')
//     if (error) {
//         console.error('There was an error fetching data:', error)
//         return <p>{error.message}</p>
//     }

//     return (
//         <TestimonialsManager data={data}></TestimonialsManager>
//     )
// }