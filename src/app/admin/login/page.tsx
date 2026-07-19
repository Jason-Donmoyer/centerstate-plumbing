'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import Image from 'next/image'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/admin/dashboard')
    }

    async function resetPassword() {
        const supabase = createClient()
        if (!email) {
            toast.error('Please enter your email address first.')
            return
        }
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://centerstateplumbingnj.com/admin/reset-password'
        })
        toast.success('Password reset email sent.')
    }

    const inputClass = "w-full border border-border rounded-lg px-3.5 py-3 text-[14.5px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"

    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Image src="/noBgWhite.svg" width={120} height={120} alt="Centerstate Plumbing and Heating" />
                </div>

                {/* Card */}
                <div className="bg-surface rounded-2xl border border-border p-8">
                    <h1 className="font-extrabold text-xl text-text mb-1">Admin Login</h1>
                    <p className="text-muted text-[13px] mb-6">Centerstate Plumbing & Heating</p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] rounded-lg px-4 py-3 mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Email</label>
                            <input
                                type="email"
                                placeholder="admin@centerstateplumbingnj.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[14px] py-3.5 rounded-lg transition-colors disabled:opacity-50 mt-1">
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                </div>

                <button
                    onClick={resetPassword}
                    className="w-full text-center text-white/50 hover:text-white text-[13px] font-medium mt-5 transition-colors">
                    Forgot password?
                </button>

            </div>
        </div>
    )
}

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { createClient } from '@/lib/supabase'
// import { toast } from 'sonner'

// export default function LoginPage() {
//     const router = useRouter()
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState<string | null>(null)
//     const [loading, setLoading] = useState(false)

//     async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
//         e.preventDefault()
//         setLoading(true)
//         setError(null)

//         const supabase = createClient()
//         const { error } = await supabase.auth.signInWithPassword({ email, password })

//         if (error) {
//             setError(error.message)
//             setLoading(false)
//             return
//         }

//         router.push('/admin/dashboard')
//     }

//     async function resetPassword() {
//         const supabase = createClient()
//         if (email) {
//             await supabase.auth.resetPasswordForEmail(email, {
//                 redirectTo: 'https://centerstateplumbingnj.com/admin/reset-password'
//             })
//             toast.success("An email has been sent to reset your password.")
//         } else {
//             toast.error("Please enter a valid email")
//         }
        
//     }

//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//             <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow w-full max-w-sm space-y-4">
//                 <h1 className="text-xl font-bold">Centerstate Admin</h1>
//                 {error && <p className="text-red-600 text-sm">{error}</p>}
//                 <input 
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full border px-3 py-2 rounded"
//                     required
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full border px-3 py-2 rounded"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//                 >
//                     {loading ? 'Logging in...' : 'Log In'}
//                 </button>
//             </form>
//             <button
//                 className="mt-8 font-semibold hover:text-brand-orange cursor-pointer"
//                 onClick={resetPassword}
//             >
//                 Forgot Password?
//             </button>
//         </div>
//     )
// }