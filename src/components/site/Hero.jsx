'use client'

import Image from 'next/image'
import { BUSINESS } from '../../lib/constants'

export default function Hero({ heroData }) {
    // const headline = heroData.data.headline
    const subHeadline = heroData?.data?.subheadline ?? ''
    const ctaQuote = heroData?.data?.cta_quote ?? 'Request Estimate'
    const badges = ['Licensed & Insured', 'Bonded', 'Master Plumber', '25+ Years Experience']

    return (
        <section className="relative flex flex-col overflow-hidden min-h-screen bg-[#0a1432] pt-[70px] md:pt-[90px]">

            {/* Split Body */}
            <div className="relative z-10 flex-1 grid grid-cols-1 md:grid-cols-2">

                {/* Left Content */}
                <div className="flex items-center px-11 pt-11 pb-4">
                    <div className="max-w-[480px]">
                        <p className="font-bold text-[#c97b38] text-[11px] uppercase tracking-[3px] mb-[14px]">
                            NJ Licensed Master Plumber
                        </p>
                        <h1 className="font-black text-white uppercase leading-[1.06] text-[clamp(28px,3vw,38px)] tracking-tight mb-0">
                            Renovations,<br />
                            New Construction<br />
                            &amp; Commercial Plumbing
                        </h1>
                        <p className="text-white/55 text-[14.5px] leading-[1.74] mt-[22px] mb-[22px]">
                            {subHeadline}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-7">
                            {badges.map(b => (
                                <span key={b}
                                    className="flex 
                                               items-center 
                                               gap-1 
                                               text-[11.5px] 
                                               text-white/72 
                                               font-medium 
                                               border 
                                               border-white/22
                                               rounded-full
                                               px-3
                                               py-1"
                                >
                                    <span className="text-[#c97b38] font-bold text-[12px]">✓</span>{b}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2.5 flex-wrap">
                            <button
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-[#b45309] 
                                           hover:bg-[#963f03] 
                                           text-white 
                                           font-bold 
                                           uppercase 
                                           tracking-[0.8px]
                                           text-[13.5px]
                                           px-6
                                           py-[11px]
                                           transition-colors"
                            >
                                {ctaQuote}
                            </button>
                            <a href={`tel:${BUSINESS.phone}`}
                                className="text-white/80
                                           hover:text-white
                                           border
                                           border-white/28
                                           hover:border-white/58
                                           font-bold
                                           uppercase
                                           tracking-[0.8px]
                                           text-[13.5px]
                                           px-6
                                           py-[10px]
                                           rounded
                                           transition-colors"
                            >
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
                    {/* Right - Project Photo */}
                <div className="hidden md:block relative overflow-hidden">
                    <Image 
                        src="/hero-project.jpg"
                        alt="Plumbing project"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a1432] to-transparent"></div>
                </div>        
            </div>
        </section>
    )
}