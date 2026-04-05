'use client'

import { createClient } from '@/lib/supabase'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


export default function ResetPage() {
    const supabase = createClient()
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()

    async function updatePassword() {
        if (newPassword === confirmPassword) {
            await supabase.auth.updateUser({ password: newPassword })
            toast.success("Password updated")
            router.push('/admin/login')
        } else {
            toast.error("Passwords do not match")
        }
    }

    return (
        <div>
            <h1>Reset Password</h1>
            <label>Password</label>
            <input 
                type="password" 
                placeholder='Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <label> Confirm Password</label>
            <input 
                type="password" 
                placeholder='Re-Enter Password' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={updatePassword}>Reset Password</button>
        </div>
    )
}

