'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    quote: z.string().min(1, 'Quote is required'),
    avatar_url: z.string().optional(),
    visible: z.string().transform(val => val === 'true'),
})

export default function TestimonialsManager({ data }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
            resolver: zodResolver(schema)
        })

    const [createNewTestimonial, setCreateNewTestimonial] = useState(false)
    const [editTestimonial, setEditTestimonial] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (editTestimonial) {
            setValue('name', editTestimonial.name),
            setValue('role', editTestimonial.role),
            setValue('quote', editTestimonial.quote),
            setValue('avatar_url', editTestimonial.avatar_url),
            setValue('visible', String(editTestimonial.visible))
        }
    }, [editTestimonial])

    async function createTestimonial(formData) {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('testimonials')
            .insert({
                name: formData.name,
                role: formData.role,
                quote: formData.quote,
                avatar_url: formData.avatar_url,
                visible: formData.visible
            })
        if (error) {
            console.error('There was an error adding the testimonial:', error)
            toast.error("There was a problem adding this. Please try again")
        }
        toast.success("Testimonial added!")
        setCreateNewTestimonial(false)
        reset()
        router.refresh()
    }

    async function deleteTestimonial(id) {
        if (!window.confirm("Are you sure you want to delete this!")) return

        const supabase = createClient()

        const { data, error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id)
        if (error) {
            console.error("There was a problem removing this:", error)
            toast.error("There was a problem removing this data")
        }
        toast.success("Testimonial has been removed!")
        reset()
        router.refresh()
    }

    async function updateTestimonial(formData) {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('testimonials')
            .update({
                name: formData.name,
                role: formData.role,
                quote: formData.quote,
                avatar_url: formData.avatar_url,
                visible: formData.visible
            })
            .eq('id', editTestimonial.id)
        if (error) {
            console.error("There was an error updating this testimonial:", error)
            toast.error("There was a problem. Please try again")
        }
        toast.success("Testimonial updated!")
        setEditTestimonial(null)
        reset()
        router.refresh()
    }

    function closeModal() {
        setEditTestimonial(null)
        reset()
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-8">
            <h1 className="text-4xl font-bold text-brand-blue text-center mb-8">Testimonials</h1>
            {/* Existing Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {data.map(testimonial => (
                    <div key={testimonial.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
                        <div className="flex gap-8 flex-row-reverse justify-between"> 
                            {testimonial.visible
                            ? <p className="text-white bg-brand-blue font-bold rounded-2xl p-2.5">Visible</p>
                            : <p className="text-white bg-brand-orange font-bold rounded-2xl p-2.5">Hidden</p>
                            } 
                            <p className="font-bold text-brand-blue text-lg">{testimonial.name}</p>
                        </div>
                        <p className="font-semibold text-brand-gray text-lg">{testimonial.role}</p>
                        <div className="flex gap-3 mt-auto">
                            <button 
                                onClick={() => setEditTestimonial(testimonial)}
                                className="rounded-2xl bg-brand-blue text-white p-4 w-1/2 cursor-pointer"
                            >
                                Edit
                            </button>
                            
                            <button 
                                className="rounded-2xl bg-brand-orange text-white p-4 w-1/2 cursor-pointer" 
                                onClick={() => deleteTestimonial(testimonial.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Edit Modal */}
            {editTestimonial !== null && (
                <div className="fixed inset-0 bg-black/50 z-40">
                    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-full md:w-1/2">
                            {/* Form */}
                            <form onSubmit={handleSubmit(updateTestimonial)} className="flex flex-col p-8 gap-2"> 
                                <button 
                                    onClick={closeModal}
                                    className="self-end text-2xl font-extrabold cursor-pointer"
                                >
                                    X
                                </button>
                                <label className="text-sm font-semibold text-brand-gray">Testimonial Name</label>
                                <input 
                                    type="text" 
                                    placeholder='name' 
                                    {...register('name')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <label className="text-sm font-semibold text-brand-gray">Role</label>
                                <input 
                                    type="text" 
                                    placeholder='role' 
                                    {...register('role')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <label className="text-sm font-semibold text-brand-gray">Quote</label>
                                <input 
                                    type="text" 
                                    placeholder='quote' 
                                    {...register('quote')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <label className="text-sm font-semibold text-brand-gray">Avatar URL</label>
                                <input 
                                    type="text" 
                                    placeholder='avatar_url' 
                                    {...register('avatar_url')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <select 
                                    name="isVisible" 
                                    id="visible" 
                                    {...register('visible')}
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                >
                                    <option value="true">Visible</option>
                                    <option value="false">Hidden</option>
                                </select>
                                <button 
                                    type="submit"
                                    className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
                                >
                                    Submit Changes
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center mt-8">
                <button 
                    onClick={() => setCreateNewTestimonial(true)}
                    className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
                >
                    Add Testimonial
                </button>
            </div>
            {createNewTestimonial && (
                <div className="fixed inset-0 bg-black/50 z-40">
                    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-full md:w-1/2">
                            {/* Form */}
                            <form onSubmit={handleSubmit(createTestimonial)} className="flex flex-col p-8 gap-2">
                                <button 
                                    onClick={() => {
                                        setCreateNewTestimonial(false)
                                        reset()
                                    }}
                                    className="self-end text-2xl font-extrabold cursor-pointer"
                                >
                                    X
                                </button>
                                <label className="text-sm font-semibold text-brand-gray">Testimonial Name</label>
                                <input 
                                    type="text" 
                                    placeholder='name' 
                                    {...register('name')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <label className="text-sm font-semibold text-brand-gray">Role</label>
                                <input 
                                    type="text" 
                                    placeholder='role' 
                                    {...register('role')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <label className="text-sm font-semibold text-brand-gray">Quote</label>
                                <input 
                                    type="text" 
                                    placeholder='quote' 
                                    {...register('quote')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <label className="text-sm font-semibold text-brand-gray">Avatar URL</label>
                                <input 
                                    type="text" 
                                    placeholder='avatar_url' 
                                    {...register('avatar_url')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                />
                                <select 
                                    name="isVisible" 
                                    id="visible" 
                                    {...register('visible')}
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                >
                                    <option value="true">Visible</option>
                                    <option value="false">Hidden</option>
                                </select>
                                <button 
                                    type="submit"
                                    className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
                                >
                                    Add Testimonial
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}
