import { createServerSupabaseClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import WhyCenterstate from '@/components/site/WhyCenterstate'
import CTAStrip from '@/components/site/CTAStrip'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createServerSupabaseClient()

    const { data: service } = await supabase
        .from('services')
        .select('name, description')
        .eq('slug', slug)
        .single()

    if (!service) return {}

    return {
        title: `${service.name} | Centerstate Plumbing & Heating`,
        description: service.description,
    }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const supabase = await createServerSupabaseClient()

    const { data: service, error } = await supabase
        .from('services')
        .select('*')
        .eq('slug', slug)
        .eq('visible', true)
        .single()

    if (error || !service) notFound()

    return (
        <main className="pt-[70px] md:pt-[90px]">

            {/* Hero */}
            <section className="bg-primary py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <Link href="/#services"
                          className="text-white/50 hover:text-white text-[13px] font-medium transition-colors mb-6 inline-block">
                        ← Back to Services
                    </Link>
                    <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-3">
                        Our Services
                    </p>
                    <h1 className="font-extrabold text-4xl md:text-5xl text-white tracking-tight mb-4">
                        {service.name}
                    </h1>
                    <p className="text-white/65 text-[17px] leading-relaxed max-w-2xl">
                        {service.description}
                    </p>
                </div>
            </section>

            {/* Long description */}
            {service.long_description && (
                <section className="bg-background py-16 md:py-24">
                    <div className="max-w-3xl mx-auto px-6 lg:px-8">
                        {service.long_description.split('\n\n').map((paragraph: string, i: number) => (
                            <p key={i} className="text-[16px] text-gray-700 leading-[1.8] mb-5">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </section>
            )}

            {/* Why Centerstate */}
            <WhyCenterstate />

            {/* CTA */}
            <CTAStrip />

        </main>
    )
}