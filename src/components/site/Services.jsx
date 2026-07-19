import * as Icons from 'lucide-react'
import Link from 'next/link'

function getIcons(iconName) {
    if (!iconName) return Icons.Wrench
    const formatted = iconName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')
    return Icons[formatted] ?? Icons.Wrench
}

export default function Services({ servicesData }) {
    return (
        <section id="services" className="bg-background py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-[680px] mx-auto mb-11">
                    <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-3">
                        What We Do
                    </p>
                    <h2 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight mb-3">
                        Plumbing &amp; Heating Services
                    </h2>
                    <p className="text-muted text-[15px] leading-relaxed">
                        From custom renovations to large-scale commercial projects, Centerstate 
                        brings 25+ years of licensed expertise into every job.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {servicesData.map(s => {
                        const Icon = getIcons(s.icon)
                        return (
                            <Link key={s.id} href={`/services/${s.slug ?? s.id}`}
                              className="group block 
                                        bg-surface 
                                         border 
                                         border-border 
                                         rounded-2xl 
                                         p-6
                                         transition-all
                                         duration-300
                                         hover:shadow-xl
                                         hover:-translate-y-1
                                         hover:border-primary/20"
                        >
                            <div className="w-11
                                            h-11
                                            rounded-[10px]
                                            bg-primary/[0.05]
                                            flex
                                            items-center
                                            justify-center
                                            text-accent
                                            mb-3.5
                                            transition-colors
                                            duration-300
                                            group-hover:bg-accent/[0.10]"
                            >
                                <Icon size={22} />
                            </div>
                                <h3 className="font-bold text-xl text-text mb-1.5 tracking-tight">{s.name}</h3>
                                <p className="text-[13.5px] text-muted leading-relaxed">{s.description}</p>
                        </Link>
                        )       
                    })}
                </div>
            </div>
        </section>
    )
}
