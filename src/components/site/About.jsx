// components/site/About.jsx

// TODO: Pull bio copy from Supabase content_blocks table
// key: 'about' — same pattern as heroData
// Credential highlights can stay hardcoded or move to DB later

import Image from 'next/image'

const CREDENTIALS = [
    {
        label: 'NJ Master Plumber',
        sub: 'License #13826',
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" /></svg>,
    },
    {
        label: '25+ Years Experience',
        sub: 'Residential & Commercial',
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
    },
    {
        label: 'Licensed, Bonded & Insured',
        sub: 'NJ Contractor',
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>,
    },
    {
        label: 'Renovations & New Construction',
        sub: 'Residential & Commercial',
        icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" /></svg>,
    },
]

export default function About({ aboutData }) {
    const headline = aboutData?.data?.headline ?? '25+ years of Plumbing Experience You Can Trust'
    const subheadline = aboutData?.data?.subheadline ?? ''

    return (
        <section id="about" className="bg-surface py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                    {/* Left — text */}
                    <div>
                        <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-3">
                            About Centerstate
                        </p>
                        <h2 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight leading-[1.15] mb-5">
                            {headline}
                        </h2>
                        <p className="text-[15px] text-gray-700 leading-[1.8] mb-4">
                            I'm Jason Donmoyer, owner and Master Plumber at Centerstate Plumbing & Heating.
                            With over 25 years of experience in residential and commercial plumbing, I've had
                            the opportunity to work on projects most plumbers never see — from custom home
                            renovations to schools, healthcare facilities, restaurants, laboratories and
                            ground-up construction throughout New Jersey.
                        </p>
                        <p className="text-[15px] text-gray-700 leading-[1.8]">
                            {subheadline}
                        </p>

                        {/* Credential highlights */}
                        <div className="grid grid-cols-2 gap-3 mt-7">
                            {CREDENTIALS.map(c => (
                                <div key={c.label}
                                     className="flex items-start gap-2.5 p-3.5 bg-background border border-border rounded-xl">
                                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                                        {c.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold text-[13px] text-text leading-tight">{c.label}</div>
                                        <div className="text-[12px] text-muted mt-0.5">{c.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — photo */}
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-primary">
                            {/* Replace src with real photo of Jason */}
                            <Image
                                src="/about-jason.jpg"
                                alt="Jason Donmoyer — NJ Master Plumber"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Floating badge */}
                        <div className="absolute bottom-5 -left-5 bg-primary border border-white/10 rounded-xl px-4 py-3 shadow-xl">
                            <div className="font-black text-[28px] text-white leading-none">25+</div>
                            <div className="text-[12px] text-white/65 font-medium mt-1">Years Experience</div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}




// export default function About({ aboutData }) {
//     const { headline, body, years, licensed } = aboutData.data
    
//     return (
//         <div className="flex flex-col items-center justify-center bg-brand-blue text-white p-8 gap-2">
//             <h3 className="font-bold text-2xl text-center">{headline}</h3>
//             <p className="md:w-1/2 text-center">{body}</p>
//             {/* <h4>{years} Years in Business</h4> */}
//             {licensed && <p>Licensed, Bonded & Insured</p>}
//         </div>
//     )
    
//}