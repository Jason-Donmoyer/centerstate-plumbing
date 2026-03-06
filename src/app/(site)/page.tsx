import { createServerSupabaseClient } from '@/lib/supabase-server.js'
import Hero from '@/components/site/Hero'
import Services from '@/components/site/Services'
import Testimonials from '@/components/site/Testimonials'
import Pricing from '@/components/site/Pricing'
import About from '@/components/site/About'
import LeadForm from '@/components/site/LeadForm'

export default async function HomePage() {
    const supabase = await createServerSupabaseClient()

    const [
        { data: heroData, error: heroError },
        { data: servicesData, error: servicesError },
        { data: testimonialsData, error: testimonialsError },
        { data: pricingData, error: pricingError },
        { data: aboutData, error: aboutError },
    ] = await Promise.all([
        supabase.from('content_blocks').select('*').eq('id', 'hero'),
        supabase.from('services').select('*').order('order_index'),
        supabase.from('testimonials').select('*').order('order_index'),
        supabase.from('pricing_cards').select('*').order('order_index'),
        supabase.from('content_blocks').select('*').eq('id', 'about'),
    ])
    if (heroError) return <p>Failed to load page.</p>
    if (servicesError) return <p>Failed to load page.</p>
    if (testimonialsError) return <p>Failed to load page.</p>
    if (pricingError) return <p>Failed to load page.</p>
    if (aboutError) return <p>Failed to load page.</p>

    return (
        <div>
            <Hero heroData={heroData[0]}></Hero>
            <Services servicesData={servicesData}></Services>
            <Testimonials testimonialsData={testimonialsData}></Testimonials>
            <Pricing pricingData={pricingData}></Pricing>
            <About aboutData={aboutData[0]}></About>
            <LeadForm></LeadForm>
        </div>
    )
}