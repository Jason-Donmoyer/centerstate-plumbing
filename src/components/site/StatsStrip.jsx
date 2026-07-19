const STATS = [
    { num: '25+', label: 'Years Experience' },
    { num: '3', label: 'Counties Served' },
    { num: 'NJ' , label: 'Master Plumber' },
    // { num: 'Res + Com', label: 'Project Types' }
]

export default function StatsStrip() {
    return (
        <section className="bg-background border-y border-gray-200 py-8">
            <div className="max-w-3xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center">
                {STATS.map((s, i) => (
                    <div key={s.label}
                         className={`px-4 ${i < STATS.length -1 ? 'border-r border-gray-200' : ''}`}>
                        <div className="font-black text-[28px] text-primary tracking-tight">{s.num}</div>
                        <div className="text-xs font-semibold text-muted uppercase tracking-wider mt-0.5">{s.label}</div>
                    </div>
                ))}
            </div>
        </section>
    )
}