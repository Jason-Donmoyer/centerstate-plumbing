'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { BUSINESS } from '../../lib/constants'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(7, "Phone number is required"),
    email: z.string().email('Invalid email address'),
    service_type: z.string().min(1, "Service type is required"),
    message: z.string().min(1, "Project description is required"),
})

const inputClass = "w-full border border-border rounded-lg px-3.5 py-3 text-[14.5px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15"

const TRUST = [
    { text: <><strong>NJ Master Plumber</strong> #13826</> },
    { text: 'Licensed · Bonded · Insured' },
    { text: <><strong>25+ Years</strong> Experience</> },
    { text: 'Residential, Commercial & Industrial Experience' },
]

export default function LeadForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    async function onSubmit(formData) {
        const supabase = createClient()
        const { error } = await supabase
            .from('leads')
            .insert({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                service_type: formData.service_type,
                urgency: 'standard', // removed from form — default to standard
                message: formData.message,
            })

        if (error) {
            console.error("Form submission error:", error)
            toast.error('Something went wrong. Please try again.')
            return
        }

        // Send email notification
        await fetch('api/send-lead-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                service_type: formData.service_type,
                message: formData.message,
            }),
        })

        toast.success('Message sent! We will be in touch shortly.')
        reset()
    }

    return (
        <section id="contact" className="bg-background py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="max-w-[720px]">

                    {/* Header */}
                    <div className="mb-9">
                        <p className="font-bold text-accent text-xs uppercase tracking-[3px] mb-2">
                            Get In Touch
                        </p>
                        <h2 className="font-extrabold text-3xl md:text-4xl text-text tracking-tight leading-[1.15] mb-3">
                            Let's Talk About<br /> Your Project
                        </h2>
                        <p className="text-muted text-[15px] leading-relaxed">
                            Describe your project and Jason will follow up with a free estimate.
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-surface border border-border rounded-2xl p-8 mb-5">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Name</label>
                                <input type="text" placeholder="John Smith" {...register('name')} className={inputClass} />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Phone</label>
                                <input type="text" placeholder="(555) 555-1212" {...register('phone')} className={inputClass} />
                                {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Email</label>
                                <input type="email" placeholder="johnsmith@email.com" {...register('email')} className={inputClass} />
                                {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Service Type</label>
                                <select {...register('service_type')} className={inputClass}>
                                    <option value="">Select a service</option>
                                    <option value="new_construction">New Construction</option>
                                    <option value="renovation">Renovation</option>
                                    <option value="commercial">Commercial</option>
                                    <option value="emergency_repairs">Emergency Repairs</option>
                                    <option value="water_heater">Water Heater Installation</option>
                                    <option value="heating">Hydronic Heating Systems</option>
                                    <option value="pipe_repair">Pipe Repair & Replacement</option>
                                    <option value="fixture">Fixture Installation</option>
                                    <option value="minor_drain_cleaning">Minor Drain Cleaning</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.service_type && <p className="text-red-500 text-xs">{errors.service_type.message}</p>}
                            </div>

                            {/* TODO: Remove urgency hidden field once Supabase leads table is updated
                            to either make urgency nullable or set a default value at the DB level.
                            Update LeadManager on admin page to reflect urgency removal or
                            handle null values gracefully. */}
                            <input type="hidden" {...register('urgency')} value="standard" />

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Project Description</label>
                                <textarea
                                    placeholder="Tell us about your project — what you need, location, and timeline..."
                                    {...register('message')}
                                    className={`${inputClass} h-36 resize-none`}
                                />
                                {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
                            </div>

                            <button type="submit"
                                    className="w-full bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[15px] py-4 rounded-lg transition-colors mt-1">
                                Request Estimate
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
            </div>
        </section>
    )
}

// 'use client'

// import * as z from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { createClient } from '@/lib/supabase'
// import { toast } from 'sonner'

// const schema = z.object({
//     name: z.string().min(1, "Name is required"),
//     phone: z.string().min(7, "Phone number is required"),
//     email: z.email('Invalid email address'),
//     service_type: z.string().min(1, "Service type is required"),
//     urgency: z.string().min(1, "Urgency is required"),
//     message: z.string().min(1, "Message is required"),
// })

// export default function LeadForm() {
//     const { register, handleSubmit, reset, formState: { errors } } = useForm({
//         resolver: zodResolver(schema)
//     })

//     async function onSubmit(formData) {
//         const supabase = createClient()

//         const { data, error } = await supabase
//             .from('leads')
//             .insert({
//                 name: formData.name,
//                 phone: formData.phone,
//                 email: formData.email,
//                 service_type: formData.service_type,
//                 urgency: formData.urgency,
//                 message: formData.message,
//             })

//             if (error) {
//                 console.error("There was a problem submitting the form:", error)
//                 // alert(`There was an error submitting the form, ${error}`)
//                 toast.error('Something went wrong. Please try again.')
//             }

//             toast.success('Message sent! We will be in touch shortly.')
//             reset()
//     }

//     return (
//         <form id="contact" onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8 gap-2">
//             <div className="flex flex-col gap-1">
//                 <label className="text-sm font-semibold text-brand-gray">Name</label>
//                 <input 
//                     type="text" 
//                     placeholder='John Smith'
//                     {...register('name')} 
//                     className="border 
//                              border-gray-300 
//                               rounded 
//                               px-3 
//                               py-2
//                               md:w-1/2 
//                               focus:outline-none 
//                               focus:ring-2 
//                               focus:ring-brand-blue"
//                 />
//                 {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//             </div>
//             <div className="flex flex-col gap-1">
//                 <label className="text-sm font-semibold text-brand-gray">Phone</label>
//                 <input 
//                     type="text" 
//                     placeholder='(555) 555-1212'
//                     {...register('phone')} 
//                     className="border 
//                              border-gray-300 
//                               rounded 
//                               px-3 
//                               py-2
//                               md:w-1/2 
//                               focus:outline-none 
//                               focus:ring-2 
//                               focus:ring-brand-blue"
//                 />
//                 {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
//             </div>
//             <div className="flex flex-col gap-1">
//                 <label className="text-sm font-semibold text-brand-gray">Email</label>
//                 <input 
//                     type="text" 
//                     placeholder='johnsmith@email.com'
//                     {...register('email')} 
//                     className="border 
//                              border-gray-300 
//                               rounded 
//                               px-3 
//                               py-2
//                               md:w-1/2 
//                               focus:outline-none 
//                               focus:ring-2 
//                               focus:ring-brand-blue"
//                 />
//                 {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//             </div>
//             <div className=" flex flex-col gap-1">
//                 <label htmlFor='service_type' className="text-sm font-semibold text-brand-gray">Service-Type</label>
//                 <select
//                     id="service_type" 
//                     {...register('service_type')}
//                     className="border 
//                              border-gray-300 
//                               rounded 
//                               px-3 
//                               py-2
//                               md:w-1/2 
//                               focus:outline-none 
//                               focus:ring-2 
//                               focus:ring-brand-blue"
//                 >
//                     <option value="">Select a service</option>
//                     <option value="new construction">New Construction</option>
//                     <option value="renovation">Renovation</option>
//                     <option value="commercial">Commercial</option>
//                     <option value="emergency_repairs">Emergency Repairs</option>
//                     <option value="minor-drain_cleaning">Minor Drain Cleaning</option>
//                     <option value="water_heater">Water Heater Installation</option>
//                     <option value="pipe_repair">Pipe Repair & Replacement</option>
//                     <option value="heating">Hydronic Heating Systems</option>
//                     <option value="fixture">Fixture Installation</option>
//                     <option value="other">Other Service</option>
//                 </select>
//                 {errors.service_type && <p className="text-red-500 text-sm">{errors.service_type.message}</p>}
//             </div>
//             <div className="flex flex-col gap-1">
//                 <label htmlFor='urgency' className="text-sm font-semibold text-brand-gray">Urgency</label>
//                 <select 
//                     id="urgency"
//                     {...register('urgency')}
//                     className="border 
//                              border-gray-300 
//                               rounded 
//                               px-3 
//                               py-2
//                               md:w-1/2 
//                               focus:outline-none 
//                               focus:ring-2 
//                               focus:ring-brand-blue"    
//                 >
//                     <option value="">Select Urgency</option>
//                     <option value="emergency">Emergency</option>
//                     <option value="standard">Standard</option>
//                 </select>
//                 {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency.message}</p>}
//             </div>
//             <div className="flex flex-col gap-1">
//                 <label className="text-sm font-semibold text-brand-gray">Message</label>
//                 <textarea 
//                     placeholder='enter your message for Centerstate Plumbing and Heating'
//                     {...register('message')} 
//                     className="border 
//                              border-gray-300 
//                               rounded 
//                               px-3 
//                               py-2
//                               md:w-1/2
//                               h-36 
//                               focus:outline-none 
//                               focus:ring-2 
//                               focus:ring-brand-blue"
//                 >
//                 </textarea>
//                 {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
//             </div>
//             <button 
//                 type="submit"
//                 className="
//                 bg-brand-blue
//                 rounded-full
//                 shadow
//                 p-6
//                 text-white
//                 font-bold
//                 md:w-1/5
//                 mt-3.5
//                 cursor-pointer
//                 "
//             >
//                 Send Message
//             </button>
//         </form>
//     )
// }