// components/site/CTAStrip.jsx
import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'

export default function CTAStrip() {
    return (
        <section className="bg-primary py-16 md:py-24 text-center">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-4">
                    Get Started
                </p>
                <h2 className="font-black text-white text-4xl md:text-5xl tracking-tight mb-4">
                    Let's Talk About Your Project
                </h2>
                <p className="text-white/55 text-[15px] mb-10 font-medium">
                    Renovations · New Construction · Commercial Plumbing
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="#contact"
                          className="bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.6px] text-[14px] px-8 py-4 rounded-lg transition-colors">
                        Request Free Estimate
                    </Link>
                    <a href={`tel:${BUSINESS.phone}`}
                       className="text-white border-2 border-white/25 hover:border-white/60 font-bold uppercase tracking-[0.6px] text-[14px] px-8 py-4 rounded-lg transition-colors">
                        Call {BUSINESS.phone_display}
                    </a>
                </div>
            </div>
        </section>
    )
}