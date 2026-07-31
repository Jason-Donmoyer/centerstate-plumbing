'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { BUSINESS } from '../../lib/constants'
import { useEffect } from 'react'

type ReviewFormData = z.infer<typeof schema>

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    quote: z.string().min(1, 'Quote is required'),
})

const inputClass = "w-full border border-border rounded-lg px-3.5 py-3 text-[14.5px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"

const TRUST = [
    { text: <><strong>NJ Master Plumber</strong> #13826</> },
    { text: 'Licensed · Bonded · Insured' },
    { text: <><strong>25+ Years</strong> Experience</> },
    { text: 'Residential, Commercial & Industrial Experience' },
]

export default function ReviewForm({ name, role, requestId }: { name: string, role: string, requestId: string }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { name, role, quote: '' },
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        reset({ name, role, quote: '' })
    }, [name, role])

    async function onSubmit(formData: ReviewFormData) {
        const supabase = createClient()
        const { error } = await supabase
        .from('testimonials')
        .insert({
            name: formData.name,
            role: formData.role,
            quote: formData.quote,
            visible: false,
        })
        
        if (error) {
            console.error("Form submission error:", error)
            toast.error('Something went wrong. Please try again.')
            return
        }

        const { error: reviewError } = await supabase
        .from('review_requests')
        .update({ review_received: true })
        .eq('id', requestId)

        if (reviewError) {
            console.error('Failed to update review request:', reviewError)
        }

        await fetch('/api/send-review-notification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                role: formData.role,
                quote: formData.quote,
            }),
        })
    
        toast.success("Thank you for your feedback!")
        reset()
    }

    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6 py-16 pt-[90px] md:pt-[100px]">
            <div className="max-w-lg w-full">
                
                {/* Header */}
                <div className="mb-9">
                    <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-2">
                        If you are happy with your service, please leave us a review
                    </p>
                    <h2 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight leading-[1.15] mb-3">
                        Hi {name}, Thank You For Your Business!
                    </h2>
                    <p className="text-muted text-[15px] leading-relaxed">
                        Please leave us a message about how we did
                    </p>
                </div>

                {/* Form */}
                <div className="bg-surface border border-border rounded-2xl p-8 mb-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Name</label>
                            <input type="text" placeholder={name} {...register('name')} className={inputClass} />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Role</label>
                            <input type="text" placeholder={role} {...register('role')} className={inputClass} />
                            {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">How'd We Do?</label>
                            <textarea
                                placeholder="Tell us about how we did on your project..."
                                {...register('quote')}
                                className={`${inputClass} h-36 resize-none`}
                            />
                            {errors.quote && <p className="text-red-500 text-xs">{errors.quote.message}</p>}
                        </div>
                        <button type="submit"
                            className="w-full 
                                        bg-accent 
                                        hover:bg-accent-hover 
                                        text-white 
                                        font-bold 
                                        uppercase 
                                        tracking-[0.5px] 
                                        text-[15px] 
                                        py-4 
                                        rounded-lg 
                                        transition-colors 
                                        mt-1"
                        >
                            Send Review
                        </button>
                    </form>
                </div>

                {/* Trust strip */}
                <div className="bg-primary rounded-2xl px-7 py-6 flex flex-wrap items-center justify-between gap-5">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[2px] text-white/45 mb-1">
                            Call Centerstate
                        </p>
                        <p className="font-extrabold text-[20px] text-white tracking-tight">
                            {BUSINESS.phone_display}
                        </p>
                        <p className="text-[12px] text-white/45 mt-0.5">Mon–Fri 7am–5pm</p>
                    </div>

                    <div className="w-px h-10 bg-white/10 hidden sm:block" />

                    <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                        {TRUST.map((c, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                <span className="text-[13px] font-medium text-white/80">{c.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    )
}