// components/site/FeaturedProjects.jsx

// TODO: Replace PROJECTS array with Supabase query
// Suggested table: projects (id, title, category, description, image_url, slug, featured, created_at)
// Fetch featured=true projects server-side and pass as props, same pattern as heroData
// When admin page is updated, add a ProjectsManager component to toggle featured status

import Link from 'next/link'
import Image from 'next/image'

export default function FeaturedProjects({ projectsData }) {
    if (!projectsData.length) return null

    return (
        <section id="projects" className="bg-background py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="text-center max-w-[680px] mx-auto mb-11">
                    <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-2">
                        Our Work
                    </p>
                    <h2 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight mb-3">
                        Featured Projects
                    </h2>
                    <p className="text-muted text-[15px] leading-relaxed">
                        A sample of recent residential and commercial work across
                        Monmouth, Middlesex and Ocean Counties.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-11">
                    {projectsData.map(p => (
                        <Link key={p.id} href={`/projects/${p.slug ?? p.id}`}
                              className="group block bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

                            {/* Photo */}
                            <div className="relative h-[220px] overflow-hidden bg-primary">
                                {p.image_url ? (
                                    <img
                                    src={p.image_url}
                                    alt={p.title}
                                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                                />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/20 text-sm">

                                    </div>
                                )}
                                
                                {/* Category pill */}
                                <span className="absolute top-3.5 left-3.5 bg-primary/85 text-white text-[11px] font-semibold uppercase tracking-[0.5px] px-2.5 py-1 rounded-full">
                                    {p.category?.replace(/_/g,' ')}
                                </span>
                            </div>

                            {/* Body */}
                            <div className="p-5 pb-6">
                                <h3 className="font-bold text-[18px] text-text mb-1.5 tracking-tight">
                                    {p.title}
                                </h3>
                                <p className="text-[13.5px] text-muted leading-relaxed mb-4">
                                    {p.description}
                                </p>
                                <span className="text-[13px] font-semibold text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                                    View Project <span>→</span>
                                </span>
                            </div>

                        </Link>
                    ))}
                </div>

                {/* View all CTA */}
                <div className="text-center">
                    <Link href="/projects"
                          className="inline-block bg-primary hover:bg-primary-light text-white font-bold uppercase tracking-[0.5px] text-sm px-8 py-3.5 rounded-lg transition-colors">
                        View All Projects
                    </Link>
                </div>

            </div>
        </section>
    )
}