import { createServerSupabaseClient } from '@/lib/supabase-server.js'
import Hero from '@/components/site/Hero'
import Services from '@/components/site/Services'
import WhyCenterstate from '@/components/site/WhyCenterstate'
import CommercialExperience from '@/components/site/CommercialExperience'
import FeaturedProjects from '@/components/site/FeaturedProjects'
import Testimonials from '@/components/site/Testimonials'
import Pricing from '@/components/site/Pricing'
import About from '@/components/site/About'
import LeadForm from '@/components/site/LeadForm'
import ServiceArea from '@/components/site/ServiceArea'
import CTASTrip from '@/components/site/CTAStrip'
import Footer from '@/components/site/Footer'

export default async function HomePage() {
    const supabase = await createServerSupabaseClient()

    const [
        { data: heroData, error: heroError },
        { data: servicesData, error: servicesError },
        { data: testimonialsData, error: testimonialsError },
        { data: pricingData, error: pricingError },
        { data: aboutData, error: aboutError },
        { data: projectsData, error: projectsError },
    ] = await Promise.all([
        supabase.from('content_blocks').select('*').eq('id', 'hero').single(),
        supabase.from('services').select('*').order('order_index'),
        supabase.from('testimonials').select('*').eq('visible', true).order('order_index'),
        supabase.from('pricing_cards').select('*').order('order_index'),
        supabase.from('content_blocks').select('*').eq('id', 'about').single(),
        supabase.from('projects').select('*').eq('featured', true).order('display_order').limit(3),
    ])
    if (heroError) return <p>Failed to load page.</p>
    if (servicesError) return <p>Failed to load page.</p>
    if (testimonialsError) return <p>Failed to load page.</p>
    if (pricingError) return <p>Failed to load page.</p>
    if (aboutError) return <p>Failed to load page.</p>
    if (projectsError) return <p>Failed to load page.</p>

    return (
        <main className="overflow-x-hidden">
            <Hero heroData={heroData}></Hero>
            {/* Add services={serviceData ?? []} */}
            <Services servicesData={servicesData ?? []}></Services>
            <WhyCenterstate></WhyCenterstate>
            <CommercialExperience></CommercialExperience>
            {/* Add projects={projectsData ?? []} */}
            <FeaturedProjects projectsData={projectsData ?? []}></FeaturedProjects>
            {/* <Testimonials testimonialsData={testimonialsData}></Testimonials> */}
            {/* <Pricing pricingData={pricingData}></Pricing> */}
            <About aboutData={aboutData}></About>
            <LeadForm></LeadForm>
            {/* <ServiceArea></ServiceArea> */}
            <CTASTrip></CTASTrip>
            <Footer></Footer>
        </main>
    )
}