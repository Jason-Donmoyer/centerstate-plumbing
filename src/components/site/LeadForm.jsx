'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(7, "Phone number is required"),
    email: z.email('Invalid email address'),
    service_type: z.string().min(1, "Service type is required"),
    urgency: z.string().min(1, "Urgency is required"),
    message: z.string().min(1, "Message is required"),
})

export default function LeadForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    async function onSubmit(formData) {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('leads')
            .insert({
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                service_type: formData.service_type,
                urgency: formData.urgency,
                message: formData.message,
            })

            if (error) {
                console.error("There was a problem submitting the form:", error)
                // alert(`There was an error submitting the form, ${error}`)
                toast.error('Something went wrong. Please try again.')
            }

            toast.success('Message sent! We will be in touch shortly.')
            reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-8 gap-2">
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-brand-gray">Name</label>
                <input 
                    type="text" 
                    placeholder='John Smith'
                    {...register('name')} 
                    className="border 
                             border-gray-300 
                              rounded 
                              px-3 
                              py-2
                              w-1/2 
                              focus:outline-none 
                              focus:ring-2 
                              focus:ring-brand-blue"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-brand-gray">Phone</label>
                <input 
                    type="text" 
                    placeholder='(555) 555-1212'
                    {...register('phone')} 
                    className="border 
                             border-gray-300 
                              rounded 
                              px-3 
                              py-2
                              w-1/2 
                              focus:outline-none 
                              focus:ring-2 
                              focus:ring-brand-blue"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-brand-gray">Email</label>
                <input 
                    type="text" 
                    placeholder='johnsmith@email.com'
                    {...register('email')} 
                    className="border 
                             border-gray-300 
                              rounded 
                              px-3 
                              py-2
                              w-1/2 
                              focus:outline-none 
                              focus:ring-2 
                              focus:ring-brand-blue"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className=" flex flex-col gap-1">
                <label className="text-sm font-semibold text-brand-gray">Service-Type</label>
                <select 
                    {...register('service_type')}
                    className="border 
                             border-gray-300 
                              rounded 
                              px-3 
                              py-2
                              w-1/2 
                              focus:outline-none 
                              focus:ring-2 
                              focus:ring-brand-blue"
                >
                    <option value="">Select a service</option>
                    <option value="emergency_repairs">Emergency Repairs</option>
                    <option value="drain_cleaning">Drain Cleaning</option>
                    <option value="water_heater">Water Heater Installation</option>
                    <option value="pipe_repair">Pipe Repair & Replacement</option>
                    <option value="heating">Heating Systems</option>
                    <option value="fixture">Fixture Installation</option>
                </select>
                {errors.service_type && <p className="text-red-500 text-sm">{errors.service_type.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-brand-gray">Urgency</label>
                <select 
                    {...register('urgency')}
                    className="border 
                             border-gray-300 
                              rounded 
                              px-3 
                              py-2
                              w-1/2 
                              focus:outline-none 
                              focus:ring-2 
                              focus:ring-brand-blue"    
                >
                    <option value="">Select Urgency</option>
                    <option value="emergency">Emergency</option>
                    <option value="standard">Standard</option>
                </select>
                {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency.message}</p>}
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-sm font-semibold text-brand-gray">Message</label>
                <textarea 
                    placeholder='enter your message for Centerstate Plumbing and Heating'
                    {...register('message')} 
                    className="border 
                             border-gray-300 
                              rounded 
                              px-3 
                              py-2
                              w-1/2
                              h-36 
                              focus:outline-none 
                              focus:ring-2 
                              focus:ring-brand-blue"
                >
                </textarea>
                {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>
            <button 
                type="submit"
                className="
                bg-brand-blue
                rounded-full
                shadow
                p-6
                text-white
                font-bold
                w-1/5
                mt-3.5
                cursor-pointer
                "
            >
                Send Message
            </button>
        </form>
    )
}