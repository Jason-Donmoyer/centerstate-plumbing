// components/site/Testimonials.jsx
// Hidden from homepage until real reviews are collected.
// To enable: add <Testimonials testimonialsData={testimonialsData} /> 
// to page.jsx between CommercialExperience and FeaturedProjects.
// TODO: testimonialsData already fetched from Supabase — confirm 
// table has: id, name, role, quote, (optionally: rating, is_visible)

export default function Testimonials({ testimonialsData }) {

    // Generate initials avatar letter from name
    const initial = (name) => name?.charAt(0).toUpperCase() ?? '?'

    return (
        <section className="bg-background py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="text-center max-w-[680px] mx-auto mb-11">
                    <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-2">
                        Client Reviews
                    </p>
                    <h2 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight mb-3">
                        What Our Clients Say
                    </h2>
                    <p className="text-muted text-[15px] leading-relaxed">
                        Feedback from homeowners, contractors and business owners
                        we've had the pleasure of working with.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    {testimonialsData.map(t => (
                        <div key={t.id}
                             className="bg-surface border border-border rounded-2xl p-7 flex flex-col">

                            {/* Stars */}
                            <div className="flex gap-0.5 mb-4 text-accent text-[16px]">
                                {'★★★★★'}
                            </div>

                            {/* Quote */}
                            <p className="text-[15px] text-gray-700 leading-[1.75] italic flex-1 mb-5">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0">
                                    {initial(t.name)}
                                </div>
                                <div>
                                    <div className="font-bold text-[14px] text-text">{t.name}</div>
                                    <div className="text-[12px] text-muted mt-0.5">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Google rating badge */}
                <div className="text-center">
                    <p className="text-[13px] text-muted">
                        <span className="text-accent">★★★★★</span>{' '}
                        <strong className="text-text">5.0</strong> on Google ·{' '}
                        <strong className="text-text">Centerstate Plumbing & Heating</strong>
                    </p>
                </div>

            </div>
        </section>
    )
}

// export default function Testimonials({ testimonialsData }) {

//     return (
//         <div className="bg-white flex flex-col py-4 px-8">
//             {testimonialsData.map(testimonial => (
//                 <div 
//                     key={testimonial.id}
//                     className="border-l-4 border-brand-orange pl-6 my-8"
//                 >
//                     <p className="text-brand-gray text-sm font-semibold uppercase tracking-widest mb-3">{testimonial.role}</p>
//                     <h2 className="text-brand-blue text-2xl italic font-light mb-4">{testimonial.quote}</h2>
//                     <p className="text-brand-gray font-bold">{testimonial.name}</p>
//                 </div>
//             ))}
//         </div>
//     )
// }