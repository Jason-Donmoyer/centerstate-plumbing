// components/admin/TestimonialsManager.jsx
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    role: z.string().min(1, "Role is required"),
    quote: z.string().min(1, "Quote is required"),
    avatar_url: z.string().optional(),
    order_index: z.coerce.number().default(0),
    visible: z.boolean().default(false),
})

const inputClass = "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white"

export default function TestimonialsManager({ data }) {
    const [testimonials, setTestimonials] = useState(data ?? [])
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [saving, setSaving] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { visible: false, order_index: 0 }
    })

    function handleEdit(testimonial) {
        setValue('name', testimonial.name)
        setValue('role', testimonial.role)
        setValue('quote', testimonial.quote)
        setValue('avatar_url', testimonial.avatar_url ?? '')
        setValue('order_index', testimonial.order_index ?? 0)
        setValue('visible', testimonial.visible ?? false)
        setEditingId(testimonial.id)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function handleCancel() {
        setEditingId(null)
        setShowForm(false)
        reset()
    }

    async function onSubmit(formData) {
        setSaving(true)
        const supabase = createClient()

        if (editingId) {
            const { error } = await supabase
                .from('testimonials')
                .update(formData)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update testimonial.')
                setSaving(false)
                return
            }

            setTestimonials(t => t.map(item =>
                item.id === editingId ? { ...item, ...formData } : item
            ))
            toast.success('Testimonial updated.')
        } else {
            const { data: newItem, error } = await supabase
                .from('testimonials')
                .insert(formData)
                .select()
                .single()

            if (error) {
                toast.error('Failed to add testimonial.')
                setSaving(false)
                return
            }

            setTestimonials(t => [...t, newItem])
            toast.success('Testimonial added.')
        }

        setEditingId(null)
        setShowForm(false)
        reset()
        setSaving(false)
        router.refresh()
    }

    async function toggleVisible(testimonial) {
        const supabase = createClient()
        const { error } = await supabase
            .from('testimonials')
            .update({ visible: !testimonial.visible })
            .eq('id', testimonial.id)

        if (error) { toast.error('Failed to update visibility.'); return }

        setTestimonials(t => t.map(item =>
            item.id === testimonial.id ? { ...item, visible: !item.visible } : item
        ))
    }

    async function handleDelete(id) {
        if (!confirm('Delete this testimonial? This cannot be undone.')) return
        const supabase = createClient()
        const { error } = await supabase.from('testimonials').delete().eq('id', id)
        if (error) { toast.error('Failed to delete testimonial.'); return }
        setTestimonials(t => t.filter(item => item.id !== id))
        toast.success('Testimonial deleted.')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-extrabold text-3xl text-text">Testimonials</h1>
                    <p className="text-muted text-[14px] mt-1">
                        Add and manage client reviews. Toggle visible to show on the site.
                    </p>
                </div>

                {/* Add button */}
                {!showForm && (
                    <button onClick={() => setShowForm(true)}
                            className="mb-6 bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-5 py-2.5 rounded-lg transition-colors">
                        + Add Testimonial
                    </button>
                )}

                {/* Form */}
                {showForm && (
                    <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                        <h2 className="font-bold text-lg text-text mb-5">
                            {editingId ? 'Edit Testimonial' : 'Add Testimonial'}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Name</label>
                                <input {...register('name')} placeholder="Dave K." className={inputClass} />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Role</label>
                                <input {...register('role')} placeholder="Homeowner · Union Beach" className={inputClass} />
                                {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5 md:col-span-2">
                                <label className="text-[13px] font-semibold text-text">Quote</label>
                                <textarea {...register('quote')} rows={3}
                                          placeholder="Jason replaced our water heater the same day we called..."
                                          className={`${inputClass} resize-none`} />
                                {errors.quote && <p className="text-red-500 text-xs">{errors.quote.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">
                                    Avatar URL <span className="text-muted font-normal">(optional)</span>
                                </label>
                                <input {...register('avatar_url')} placeholder="https://..." className={inputClass} />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Display Order</label>
                                <input {...register('order_index')} type="number" className={inputClass} />
                            </div>

                            <div className="flex items-center gap-2.5 md:col-span-2">
                                <input type="checkbox" id="visible" {...register('visible')}
                                       className="w-4 h-4 accent-[#C86A15]" />
                                <label htmlFor="visible" className="text-[14px] font-medium text-text">
                                    Visible on site
                                </label>
                            </div>

                            <div className="flex gap-3 md:col-span-2">
                                <button type="submit" disabled={saving}
                                        className="bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50">
                                    {saving ? 'Saving...' : editingId ? 'Update Testimonial' : 'Add Testimonial'}
                                </button>
                                <button type="button" onClick={handleCancel}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-2.5 rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Testimonials list */}
                {testimonials.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-muted text-[15px]">No testimonials yet. Add your first one above.</p>
                        <p className="text-muted text-[13px] mt-2">
                            Testimonials won't show on the site until marked visible.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {[...testimonials]
                            .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
                            .map(t => (
                                <div key={t.id}
                                     className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">

                                    {/* Avatar initial */}
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-[15px] flex-shrink-0">
                                        {t.name?.charAt(0).toUpperCase() ?? '?'}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-bold text-[15px] text-text">{t.name}</h3>
                                                <p className="text-[12px] text-muted mt-0.5">{t.role}</p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button onClick={() => toggleVisible(t)}
                                                        className={`text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full transition-colors cursor-pointer
                                                            ${t.visible
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                            }`}>
                                                    {t.visible ? 'Visible' : 'Hidden'}
                                                </button>
                                                <button onClick={() => handleEdit(t)}
                                                        className="text-[12px] font-semibold text-primary hover:text-primary-light transition-colors cursor-pointer">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(t.id)}
                                                        className="text-[12px] font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        {t.quote && (
                                            <p className="text-[13px] text-muted mt-2 leading-relaxed line-clamp-2 italic">
                                                &ldquo;{t.quote}&rdquo;
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}

// 'use client'

// import * as z from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { createClient } from '@/lib/supabase'
// import { useState, useEffect } from 'react'
// import { toast } from 'sonner'
// import { useRouter } from 'next/navigation'

// const schema = z.object({
//     name: z.string().min(1, "Name is required"),
//     role: z.string().min(1, "Role is required"),
//     quote: z.string().min(1, 'Quote is required'),
//     avatar_url: z.string().optional(),
//     visible: z.string().transform(val => val === 'true'),
// })

// export default function TestimonialsManager({ data }) {
//     const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
//             resolver: zodResolver(schema)
//         })

//     const [createNewTestimonial, setCreateNewTestimonial] = useState(false)
//     const [editTestimonial, setEditTestimonial] = useState(null)
//     const router = useRouter()

//     useEffect(() => {
//         if (editTestimonial) {
//             setValue('name', editTestimonial.name),
//             setValue('role', editTestimonial.role),
//             setValue('quote', editTestimonial.quote),
//             setValue('avatar_url', editTestimonial.avatar_url),
//             setValue('visible', String(editTestimonial.visible))
//         }
//     }, [editTestimonial])

//     async function createTestimonial(formData) {
//         const supabase = createClient()

//         const { data, error } = await supabase
//             .from('testimonials')
//             .insert({
//                 name: formData.name,
//                 role: formData.role,
//                 quote: formData.quote,
//                 avatar_url: formData.avatar_url,
//                 visible: formData.visible
//             })
//         if (error) {
//             console.error('There was an error adding the testimonial:', error)
//             toast.error("There was a problem adding this. Please try again")
//         }
//         toast.success("Testimonial added!")
//         setCreateNewTestimonial(false)
//         reset()
//         router.refresh()
//     }

//     async function deleteTestimonial(id) {
//         if (!window.confirm("Are you sure you want to delete this!")) return

//         const supabase = createClient()

//         const { data, error } = await supabase
//             .from('testimonials')
//             .delete()
//             .eq('id', id)
//         if (error) {
//             console.error("There was a problem removing this:", error)
//             toast.error("There was a problem removing this data")
//         }
//         toast.success("Testimonial has been removed!")
//         reset()
//         router.refresh()
//     }

//     async function updateTestimonial(formData) {
//         const supabase = createClient()

//         const { data, error } = await supabase
//             .from('testimonials')
//             .update({
//                 name: formData.name,
//                 role: formData.role,
//                 quote: formData.quote,
//                 avatar_url: formData.avatar_url,
//                 visible: formData.visible
//             })
//             .eq('id', editTestimonial.id)
//         if (error) {
//             console.error("There was an error updating this testimonial:", error)
//             toast.error("There was a problem. Please try again")
//         }
//         toast.success("Testimonial updated!")
//         setEditTestimonial(null)
//         reset()
//         router.refresh()
//     }

//     function closeModal() {
//         setEditTestimonial(null)
//         reset()
//         router.refresh()
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-8">
//             <h1 className="text-4xl font-bold text-brand-blue text-center mb-8">Testimonials</h1>
//             {/* Existing Testimonials */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
//                 {data.map(testimonial => (
//                     <div key={testimonial.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
//                         <div className="flex gap-8 flex-row-reverse justify-between"> 
//                             {testimonial.visible
//                             ? <p className="text-white bg-brand-blue font-bold rounded-2xl p-2.5">Visible</p>
//                             : <p className="text-white bg-brand-orange font-bold rounded-2xl p-2.5">Hidden</p>
//                             } 
//                             <p className="font-bold text-brand-blue text-lg">{testimonial.name}</p>
//                         </div>
//                         <p className="font-semibold text-brand-gray text-lg">{testimonial.role}</p>
//                         <div className="flex gap-3 mt-auto">
//                             <button 
//                                 onClick={() => setEditTestimonial(testimonial)}
//                                 className="rounded-2xl bg-brand-blue text-white p-4 w-1/2 cursor-pointer"
//                             >
//                                 Edit
//                             </button>
                            
//                             <button 
//                                 className="rounded-2xl bg-brand-orange text-white p-4 w-1/2 cursor-pointer" 
//                                 onClick={() => deleteTestimonial(testimonial.id)}
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {/* Edit Modal */}
//             {editTestimonial !== null && (
//                 <div className="fixed inset-0 bg-black/50 z-40">
//                     <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
//                         <div className="bg-white rounded-2xl p-8 w-full md:w-1/2">
//                             {/* Form */}
//                             <form onSubmit={handleSubmit(updateTestimonial)} className="flex flex-col p-8 gap-2"> 
//                                 <button 
//                                     onClick={closeModal}
//                                     className="self-end text-2xl font-extrabold cursor-pointer"
//                                 >
//                                     X
//                                 </button>
//                                 <label className="text-sm font-semibold text-brand-gray">Testimonial Name</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='name' 
//                                     {...register('name')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <label className="text-sm font-semibold text-brand-gray">Role</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='role' 
//                                     {...register('role')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <label className="text-sm font-semibold text-brand-gray">Quote</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='quote' 
//                                     {...register('quote')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <label className="text-sm font-semibold text-brand-gray">Avatar URL</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='avatar_url' 
//                                     {...register('avatar_url')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <select 
//                                     name="isVisible" 
//                                     id="visible" 
//                                     {...register('visible')}
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 >
//                                     <option value="true">Visible</option>
//                                     <option value="false">Hidden</option>
//                                 </select>
//                                 <button 
//                                     type="submit"
//                                     className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
//                                 >
//                                     Submit Changes
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             <div className="flex justify-center mt-8">
//                 <button 
//                     onClick={() => setCreateNewTestimonial(true)}
//                     className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
//                 >
//                     Add Testimonial
//                 </button>
//             </div>
//             {createNewTestimonial && (
//                 <div className="fixed inset-0 bg-black/50 z-40">
//                     <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
//                         <div className="bg-white rounded-2xl p-8 w-full md:w-1/2">
//                             {/* Form */}
//                             <form onSubmit={handleSubmit(createTestimonial)} className="flex flex-col p-8 gap-2">
//                                 <button 
//                                     onClick={() => {
//                                         setCreateNewTestimonial(false)
//                                         reset()
//                                     }}
//                                     className="self-end text-2xl font-extrabold cursor-pointer"
//                                 >
//                                     X
//                                 </button>
//                                 <label className="text-sm font-semibold text-brand-gray">Testimonial Name</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='name' 
//                                     {...register('name')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <label className="text-sm font-semibold text-brand-gray">Role</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='role' 
//                                     {...register('role')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <label className="text-sm font-semibold text-brand-gray">Quote</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='quote' 
//                                     {...register('quote')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <label className="text-sm font-semibold text-brand-gray">Avatar URL</label>
//                                 <input 
//                                     type="text" 
//                                     placeholder='avatar_url' 
//                                     {...register('avatar_url')} 
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 />
//                                 <select 
//                                     name="isVisible" 
//                                     id="visible" 
//                                     {...register('visible')}
//                                     className="border 
//                                               border-gray-300 
//                                               rounded 
//                                               px-3 
//                                               py-2
//                                               w-full 
//                                               focus:outline-none 
//                                               focus:ring-2 
//                                               focus:ring-brand-blue"
//                                 >
//                                     <option value="true">Visible</option>
//                                     <option value="false">Hidden</option>
//                                 </select>
//                                 <button 
//                                     type="submit"
//                                     className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
//                                 >
//                                     Add Testimonial
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )

// }
