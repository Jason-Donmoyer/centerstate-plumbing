// components/admin/AdminNav.jsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const LINKS = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Leads', href: '/admin/leads' },
    { label: 'Projects', href: '/admin/projects' },
    { label: 'Services', href: '/admin/services' },
    { label: 'Testimonials', href: '/admin/testimonials' },
    { label: 'Content', href: '/admin/content' },
]

export default function AdminNav() {
    const [menu, setMenu] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <div className="bg-primary border-b border-white/[0.08] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <p className="font-extrabold text-white text-[15px] tracking-tight">
                    Centerstate <span className="text-accent">Admin</span>
                </p>

                {/* Desktop links */}
                <nav className="hidden sm:flex gap-1">
                    {LINKS.map(l => (
                        <Link key={l.href} href={l.href}
                              className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors
                                ${pathname === l.href
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                                }`}>
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden sm:flex items-center gap-3">
                    <button onClick={handleLogout}
                            className="text-white/60 hover:text-white text-[13px] font-semibold transition-colors cursor-pointer">
                        Logout
                    </button>
                </div>

                {/* Hamburger */}
                <button className="sm:hidden text-white" onClick={() => setMenu(o => !o)}>
                    {menu ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menu && (
                <div className="sm:hidden flex flex-col gap-1 px-4 pb-4 border-t border-white/[0.08]">
                    {LINKS.map(l => (
                        <Link key={l.href} href={l.href}
                              onClick={() => setMenu(false)}
                              className={`px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-colors
                                ${pathname === l.href
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/65 hover:text-white'
                                }`}>
                            {l.label}
                        </Link>
                    ))}
                    <button onClick={handleLogout}
                            className="text-left px-3 py-2.5 text-white/60 hover:text-white text-[14px] font-semibold mt-1 cursor-pointer">
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

// 'use client'

// import { useState } from 'react'
// import Link from 'next/link'
// import { Menu, X } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase'

// export default function AdminNav() {
//     const [menu, setMenu] = useState(false)
//     const router = useRouter()
//     const supabase = createClient()

//     async function handleLogout() {
//         await supabase.auth.signOut()
//         router.push('/admin/login')
//     }

//     return (
//          <div className="bg-white border-b border-gray-200 shadow-sm">
//             {/* Top bar - always visible */}
//             <div className="px-6 py-4 flex items-center justify-between">
//                 <p className="font-bold">Centerstate Admin</p>
//                 <div className="sm:hidden">
//                 {menu ? <X onClick={() => setMenu(false)} /> : <Menu onClick={() => setMenu(true)} />}
//                 </div>
//                 <nav className="hidden sm:flex gap-6">
//                     <Link 
//                         href="/admin/dashboard"
//                             className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                     >
//                         Dashboard
//                     </Link>
//                     <Link 
//                         href="/admin/content"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                     >
//                         Content
//                     </Link>
//                     <Link 
//                         href="/admin/leads"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                     >
//                         Leads
//                     </Link>
//                     <Link 
//                         href="/admin/pricing"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                     >
//                         Pricing
//                     </Link>
//                     <Link 
//                         href="/admin/services"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                     >
//                         Services
//                     </Link>
//                     <Link 
//                         href="/admin/testimonials"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                     >
//                         Testimonials
//                     </Link> 
//                 </nav>
//                 <button 
//                     className="hidden sm:flex 
//                             bg-brand-silver 
//                             rounded-2xl 
//                             text-brand-blue 
//                             gap-6
//                             py-2 
//                             px-4 
//                             font-semibold 
//                             cursor-pointer 
//                             hover:bg-brand-light-blue 
//                             hover:text-white"
//                             onClick={handleLogout}
//                 >
//                     Logout
//                 </button>
//             </div>

//             {/* Mobile dropdown - only shows when menu is open */}
//             {menu && (
//                 <div className="sm:hidden flex flex-col gap-4 px-6 py-4 border-t border-gray-200">
//                     <Link 
//                         href="/admin/dashboard"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                         onClick={() => setMenu(false)}
//                     >
//                         Dashboard
//                     </Link>
//                     <Link 
//                         href="/admin/content"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                         onClick={() => setMenu(false)}
//                     >
//                         Content
//                     </Link>
//                     <Link 
//                         href="/admin/leads"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                         onClick={() => setMenu(false)}
//                     >
//                         Leads
//                     </Link>
//                     <Link 
//                         href="/admin/pricing"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                         onClick={() => setMenu(false)}
//                     >
//                         Pricing
//                     </Link>
//                     <Link 
//                         href="/admin/services"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                         onClick={() => setMenu(false)}
//                     >
//                         Services
//                     </Link>
//                     <Link 
//                         href="/admin/testimonials"
//                         className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
//                         onClick={() => setMenu(false)}
//                     >
//                         Testimonials
//                     </Link> 
//                     <div className="flex justify-center w-full"> 
//                         <button 
//                             className="w-1/2
//                                     bg-brand-silver 
//                                     rounded-2xl 
//                                     text-brand-blue 
//                                     gap-6
//                                     py-2 
//                                     px-4 
//                                     font-semibold 
//                                     cursor-pointer 
//                                     hover:bg-brand-light-blue 
//                                     hover:text-white"
//                             onClick={handleLogout}
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             )}
//             </div>
//     )
// }