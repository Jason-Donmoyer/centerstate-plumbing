// components/site/Footer.jsx
import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'

const CREDENTIALS = [
    `NJ Master Plumber ${BUSINESS.license}`,
    'Licensed · Bonded · Insured',
    '25+ Years Experience',
    'Residential · Commercial · Institutional',
]

const CONTACT = [
    { label: 'Phone', value: BUSINESS.phone_display },
    { label: 'Email', value: 'jason.donmoyer@centerstateplumbingnj.com' },
    { label: 'Business Hours', value: 'Mon–Sat 7am–5pm' },
]

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-[#08122e] text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-7">

                <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12 mb-10">

                    {/* Brand */}
                    <div>
                        <div className="font-extrabold text-[17px] tracking-tight mb-1">
                            {BUSINESS.name}
                        </div>
                        <div className="text-[13px] text-white/45 mb-4">Union Beach, New Jersey</div>
                        <p className="text-[13px] text-white/50 leading-[1.7] max-w-[280px] mb-5">
                            NJ Master Plumber serving Monmouth, Middlesex and Ocean Counties with over
                            25 years of residental, commercial and industrial plumbing experience.
                        </p>
                        {/* <div className="flex flex-col gap-1.5">
                            {['NJ Master Plumber License ' + BUSINESS.license, 'Licensed · Bonded · Insured', '25+ Years Experience'].map(c => (
                                <div key={c} className="flex items-center gap-2 text-[12.5px] text-white/55">
                                    <div className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />
                                    {c}
                                </div>
                            ))}
                        </div> */}
                    </div>

                    {/* Credentials */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-white/30 mb-4">
                            Credentials
                        </p>
                        <div className="flex flex-col gap-2.5">
                            {CREDENTIALS.map(c => (
                                <div key={c} className="flex items-center gap-2.5 text-[13.5px] text-white/65">
                                    <div className="w-[5px] h-[5px] rounded-full bg-accent flex-shrink-0" />
                                    {c}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[2.5px] text-white/30 mb-4">
                            Contact
                        </p>
                        <div className="flex flex-col gap-3.5 mb-5">
                            {CONTACT.map(item => (
                                <div key={item.label}>
                                    <div className="text-[11px] text-white/30 font-semibold uppercase tracking-[1px] mb-0.5">
                                        {item.label}
                                    </div>
                                    <div className="text-[13.5px] text-white/70 font-medium">{item.value}</div>
                                </div>
                            ))}
                        </div>
                        <a href={`tel:${BUSINESS.phone}`}
                           className="inline-block bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-5 py-2.5 rounded-lg transition-colors">
                            Call {BUSINESS.phone_display}
                        </a>
                    </div>

                </div>

                <div className="border-t border-white/[0.07] pt-5 flex flex-wrap justify-between items-center gap-2">
                    <span className="text-[12px] text-white/28">
                        © {year} {BUSINESS.name} LLC. All rights reserved.
                    </span>
                    <span className="text-[12px] text-white/28">
                        NJ Master Plumber {BUSINESS.license} · Union Beach, NJ
                    </span>
                </div>

            </div>
        </footer>
    )
}
