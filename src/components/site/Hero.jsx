'use client'

import Image from 'next/image'
import { BUSINESS } from '../../lib/constants'
import useFloatingVisibility from '@/hooks/useFloatingVisibility'

export default function Hero({ heroData }) {
    const headline = heroData.data.headline
    const subHeadline = heroData.data.subheadline
    const ctaQuote = heroData.data.cta_quote
    const ctaEmergency = heroData.data.cta_emergency
    const telLink = BUSINESS.phone
    const isVisible = useFloatingVisibility()

    return (
        <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center flex-col">
                <Image src="/noBgWhite.svg" width={350} height={350} alt="Centerstate Plumbing and Heating Logo"></Image>
                <h1 className="text-white text-center font-bold text-5xl pl-4 mt-8">{headline}</h1>
            </div>
            <h2 className="text-white text-center mx-6 my-4">{subHeadline}</h2>
            <div className="flex flex-col items-center justify-center gap-4">
                {isVisible && (
                    <a href={`tel:${telLink}`} className="px-6 py-3 bg-brand-orange text-white rounded cursor-pointer">{ctaEmergency}</a>
                )}
                <button 
                    onClick={() => document.getElementById('contact').scrollIntoView()} 
                    className="font-bold px-6 py-3 bg-brand-silver text-brand-gray rounded cursor-pointer mb-4 hover:bg-brand-light-blue"
                >
                    {ctaQuote}
                </button>
            </div>
        </div>
    )
}