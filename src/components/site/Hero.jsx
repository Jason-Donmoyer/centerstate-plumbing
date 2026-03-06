import Image from 'next/image'

export default function Hero({ heroData }) {
    const headline = heroData.data.headline
    const subHeadline = heroData.data.subheadline
    const ctaQuote = heroData.data.cta_quote
    const ctaEmergency = heroData.data.cta_emergency

    return (
        <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center gap-4">
            <div className="flex items-center justify-center flex-col">
                <Image src="/noBgWhite.svg" width={200} height={140} alt="Centerstate Plumbing and Heating Logo"></Image>
                <h1 className="text-white font-bold text-5xl pl-4 mt-8">{headline}</h1>
            </div>
            <h2 className="text-white">{subHeadline}</h2>
            <div className="flex flex-col items-center justify-center gap-4">
                <button className="px-6 py-3 bg-brand-orange text-white rounded cursor-pointer">{ctaEmergency}</button>
                <button className="px-6 py-3 bg-brand-silver text-brand-blue rounded cursor-pointer">{ctaQuote}</button>
            </div>
        </div>
    )
}