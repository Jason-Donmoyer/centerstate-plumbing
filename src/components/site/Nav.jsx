'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BUSINESS } from '../../lib/constants'

const LINKS = [
     { label: 'Services', href: '/#services' },
     { label: 'Projects', href: '/#projects' }, 
     { label: 'About', href: '/#about' }, 
     { label: 'Contact', href: '/#contact' },
    ]

export default function Nav() {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1432] border-b border-white/[0.07]">
            <nav className="flex items-center justify-between px-6 md:px-11 py-[14px] md:py-[18px]">
                <Image src="/noBgWhite.svg" width={120} height={28} alt="Centerstate Plumbing and Heating" />

                {/* Desktop links */}
                <ul className="hidden md:flex gap-6 list-none">
                    {LINKS.map(l => (
                        <li key={l.label}>
                            <Link href={l.href}
                               className="text-white/58 hover:text-white text-[13px] font-medium transition-colors">
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop call button */}
                <a href={`tel:${BUSINESS.phone}`}
                   className="hidden md:inline-block bg-[#b45309] hover:bg-[#963f03] text-white font-bold uppercase tracking-[0.6px] text-[12.5px] px-4 py-[7px] rounded transition-colors whitespace-nowrap">
                    Call {BUSINESS.phone_display}
                </a>

                {/* Hamburger */}
                <button
                    onClick={() => setMenuOpen(true)}
                    className="md:hidden text-white p-2"
                    aria-label="Open menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                    </svg>
                </button>
            </nav>

            {/* Mobile drawer */}
            <div className={`md:hidden fixed inset-0 z-50 transition-opacity ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setMenuOpen(false)}
                />
                {/* Drawer panel */}
                <div className={`absolute top-0 right-0 h-full w-[75%] max-w-[320px] bg-[#0a1432] border-l border-white/10 px-8 py-6 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end mb-10">
                        <button onClick={() => setMenuOpen(false)} className="text-white p-2" aria-label="Close menu">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col gap-6 list-none mb-10">
                        {LINKS.map(l => (
                            <li key={l.label}>
                                <Link href={l.href}
                                   onClick={() => setMenuOpen(false)}
                                   className="text-white text-lg font-medium">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <a href={`tel:${BUSINESS.phone}`}
                       className="block text-center bg-[#b45309] hover:bg-[#963f03] text-white font-bold uppercase tracking-[0.6px] text-sm px-4 py-3 rounded transition-colors">
                        Call {BUSINESS.phone_display}
                    </a>
                </div>
            </div>
        </header>
    )
}