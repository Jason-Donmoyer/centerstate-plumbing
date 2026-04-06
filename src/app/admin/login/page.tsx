'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

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
        if (email) {
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'https://centerstateplumbingnj.com/admin/reset-password'
            })
            toast.success("An email has been sent to reset your password.")
        } else {
            toast.error("Please enter a valid email")
        }
        
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow w-full max-w-sm space-y-4">
                <h1 className="text-xl font-bold">Centerstate Admin</h1>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
            </form>
            <button
                className="mt-8 font-semibold hover:text-brand-orange cursor-pointer"
                onClick={resetPassword}
            >
                Forgot Password?
            </button>
        </div>
    )
}