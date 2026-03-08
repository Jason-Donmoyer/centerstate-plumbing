'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function AdminNav() {
    const [menu, setMenu] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    async function handleLogout() {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    return (
        <div className="bg-white 
                        border-b 
                        border-gray-200 
                        px-6 
                        py-4 flex 
                        items-center 
                        justify-between 
                        shadow-sm">
            <p className={`${menu ? "flex flex-col sm:flex" : "hidden sm:flex"} font-bold`}>Centerstate Admin</p>
            <div className="sm:hidden">
                {menu ? <X onClick={() => setMenu(false)}></X> : <Menu onClick={() => setMenu(true)}></Menu>}
            </div>
            <nav     
                className={`${menu ? "flex flex-col sm:flex" : "hidden sm:flex"} gap-6`}>
                <Link 
                    href="/admin/dashboard"
                    className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors"
                >
                    Dashboard
                </Link>
                <Link 
                    href="/admin/content"
                    className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
                >
                    Content
                </Link>
                <Link 
                    href="/admin/leads"
                    className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
                >
                    Leads
                </Link>
                <Link 
                    href="/admin/pricing"
                    className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
                >
                    Pricing
                </Link>
                <Link 
                    href="/admin/services"
                    className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
                >
                    Services
                </Link>
                <Link 
                    href="/admin/testimonials"
                    className="text-brand-gray hover:text-brand-blue font-semibold text-sm transition-colors cursor-pointer"
                >
                    Testimonials
                </Link> 
            </nav>
            <button 
                className="bg-brand-silver 
                            rounded-2xl 
                            text-brand-blue 
                            py-2 
                            px-4 
                            font-semibold 
                            cursor-pointer 
                            hover:bg-brand-light-blue 
                            hover:text-white
                            hidden sm:flex"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>     
    )
}