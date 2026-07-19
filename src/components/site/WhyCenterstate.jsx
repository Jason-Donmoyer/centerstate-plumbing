const REASONS = [
    {
        title: 'Decades of Experience', 
        desc: '25+ years delivering reliable plumbing and heating work.', 
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg> 
    },
    {
        title: 'Licensed, Bonded & Insured',
        desc: 'Fully credentialed for residential and commercial projects.',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
    },
    {
        title: 'Residential & Commercial',
        desc: 'From service calls to large-scale construction projects.',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></svg>
    },
    {
        title: 'NJ Master Plumber',
        desc: 'Master Plumber License #13826',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" /></svg>
    },
    {
        title: 'Clean Professional Work',
        desc: 'Job sites left clean and organized every time.',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
    },
    {
        title: 'Clear Communication',
        desc: 'Written estimates and transparent project planning.',
        icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></svg>
    }
]

export default function WhyCenterstate() {
    return (
        <section className="bg-surface py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-[680px] mx-auto mb-8">
                    <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-2">
                        Why Centerstate
                    </p>
                    <h2 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight">
                        Built on Experience &amp; Trust
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                    {REASONS.map(r => (
                        <div key={r.title}
                             className="h-full 
                                        flex 
                                        items-start 
                                        gap-3.5 
                                        p-4 r
                                        ounded-xl 
                                        tranistion-all 
                                        duration-300 
                                        hover:-translate-y-1
                                        hover:shadow-lg"
                        >
                            <div className="w-[52px]
                                            h-[52px]
                                            rounded-xl
                                            bg-accent/10
                                            border
                                            border-accent/20
                                            flex
                                            items-center
                                            justify-center
                                            flex-shrink-0
                                            text-accent"
                            >
                                {r.icon}
                            </div>
                            <div>
                                <div className="font-bold text-[15px] text-text mb-[3px]">{r.title}</div>
                                <div className="text-[13px] text-muted leading-relaxed">{r.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="max-w-[760px] mx-auto text-center pt-10 pb-14">
                    <p className="text-[15px] text-gray-700 leading-[1.75]">
                        From residential service calls to healthcare facilities, schools, laboratories
                        and ground-up construction projects, Centerstate delivers the same level of
                        professionalism and craftsmanship on every job.
                    </p>
                </div>
            </div>
        </section>
    )
}