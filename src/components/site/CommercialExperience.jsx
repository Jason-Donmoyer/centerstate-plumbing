// TODO: Update supabase with EXPERIENCE table
const EXPERIENCE = [
    { label: 'Restaurants', desc: 'Commercial kitchens, grease waste & gas systems' },
    { label: 'Healthcare Facilities', desc: 'Medical offices and healthcare renovations' },
    { label: 'Schools', desc: 'Educational facilities and public projects' },
    { label: 'Laboratories', desc: 'RO/DI and chemical waste systems' },
    { label: 'Office Fit-Outs', desc: 'Tenant improvements and build-outs' },
    { label: 'Ground-Up Construction', desc: 'New plumbing installs from the foundation up' },
    { label: 'Tenant Improvements', desc: 'Renovations for new and existing tenants' },
    { label: 'Multi-Family Residential', desc: 'Apartments, condos and residential developments' },
]

export default function CommercialExperience() {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-[680px] mx-auto mb-10">
                    <p className="font-bold text-accent/80 text-xs uppercase tracking-[3px] mb-2">
                        Commercial &amp; Institutional Experience
                    </p>
                    <h2 className="font-extrabold text-3xl md:text-4xl text-white tracking-tight mb-3">
                        Commercial Plumbing Experience
                    </h2>
                    <p className="text-white/60 text-[15px] leading-relaxed">
                        Over 25 years of experience delivering plumbing systems for restaurants,
                        healthcare facilities, schools, laboratories, office fit-outs, and
                        ground-up construction projects throughout New Jersey.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {EXPERIENCE.map(item => (
                        <div key={item.label}
                             className="p-[18px]
                                        bg-white/[0.04]
                                        border
                                        border-white/[0.08]
                                        rounded-xl
                                        transition-all
                                        duration-300
                                        hover:bg-white/[0.07]
                                        hover:border-accent/40
                                        hover:shadow-xl
                                        hover:-translate-y-1"
                        >
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-accent font-bold text-base shrink-0">✓</span>
                                <span className="font-bold text-[14.5px] text-white">{item.label}</span>
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}