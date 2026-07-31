'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Valid email is required"),
    role: z.string().min(1, "Role is required")
})

const inputClass = "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white"

export default function ReviewRequestManager({ requests }) {
    // State and form setup 
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })


    async function onSubmit(formData) {
        const supabase = createClient()
        const { data: newRequest, error } = await supabase
            .from('review_requests')
            .insert({
                name: formData.name,
                email: formData.email,
                role: formData.role
            })
            .select()
            .single()

        if (error) {
            console.error("Form submission error:", error)
            toast.error('Something went wrong. Please try again.')
            return
        }

        await fetch('/api/send-review-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                email: formData.email,
                role: formData.role,
                requestId: newRequest.id,
            }),
        })

        toast.success('Message sent! You will be notified when the review is returned.')
        reset()

    }

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-extrabold text-3xl text-text">Review Requests</h1>
                    <p className="text-muted text-[14px] mt-1">
                        Send a review request to customer. Responsed appear in Testimonials.
                    </p>
                </div>
                {/* Form Card */}
                <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Name</label>
                            <input {...register('name')} placeholder="John Smith" className={inputClass} />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Email</label>
                            <input {...register('email')} placeholder="j.smith@gmail.com" className={inputClass} />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Role</label>
                            <input {...register('role')} placeholder="Union Beach - homeowner" className={inputClass} />
                            {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                        </div>
                        <div className="flex gap-3 md:col-span-2">
                            <button type="submit"
                                    className="bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50">
                                Send
                            </button>
                        </div>
                    </form>
                </div>
                {/* Request List */}
                <div className="flex flex-col gap-4">
                    <h2 className="font-bold text-lg text-text">Sent Requests</h2>
                    {requests.length === 0 ? (
                        <p className="text-muted text-[14px]">No requests sent yet.</p>
                    ) : (
                        requests.map(r => {
                            const isReceived = r.review_received

                            return (
                                <div key={r.id}
                                    className="bg-surface
                                                border
                                                border-border
                                                rounded-2xl
                                                p-5
                                                flex
                                                items-start
                                                justify-between
                                                gap-4"
                                >
                                    <div>
                                        <h3 className="font-bold text-[15px] text-text">{r.name}</h3>
                                        <p className="text-[12px] text-muted mt-0.5">{r.role} · {r.email}</p>
                                        <p className="text-[12px] text-muted mt-0.5">
                                            Sent {new Date(r.sent_at).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    {/* Status badge */}
                                    <span className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full
                                                ${isReceived
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {isReceived ? 'Received' : 'Pending'}
                                            </span>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}