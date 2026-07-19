import Link from 'next/link'
import { BUSINESS } from '@/lib/constants'

export default function ProjectPage({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="max-w-lg text-center py-24">
                <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-4">
                    Coming Soon
                </p>
                <h1 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight mb-4">
                    This Page Is On Its Way
                </h1>
                <p className="text-muted text-[15px] leading-relaxed mb-8">
                    We're building out dedicated pages for each project. In the meantime,
                    contact us directly and Jason will be happy to answer any questions.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/#contact"
                          className="bg-accent
                                     hover:bg-accent-hover 
                                     text-white 
                                     font-bold 
                                     uppercase
                                     tracking-[0.5px]
                                     text-[14px]
                                     px-6
                                     py-3
                                     rounded-lg
                                     transition-colors"
                    >
                        Request Estimate
                    </Link>
                    <a href={`tel:${BUSINESS.phone}`}
                       className="border 
                                border-border
                                hover:border-primary
                                text-text
                                font-bold
                                uppercase
                                tracking-[0.5px]
                                text-[14px]
                                px-6
                                py-3
                                rounded-lg
                                transition-colors"
                    >
                        Call {BUSINESS.phone_display}
                    </a>
                </div>
                <Link href={"/"}
                      className="inline-block mt-8 text-[13px] text-muted hover:text-text transition-colors"
                >
                    ← Back to Home
                </Link>
            </div>
        </main>
    )
}