
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import * as Icons from 'lucide-react'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().min(1, "Description is required"),
    icon: z.string().min(1, "Icon name is required"),
    order_index: z.coerce.number().default(0),
    visible: z.boolean().default(true),
})

function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function LucidePreview({ name }) {
    if (!name) return null
    const formatted = name.charAt(0).toUpperCase() + name.slice(1).replace(/-([a-z])/g, (_, l) => l.toUpperCase())
    const Icon = Icons[formatted]
    if (!Icon) return <span className="text-[12px] text-red-500">Icon not found</span>
    return <Icon size={20} className="text-accent" />
}

const inputClass = "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white"

export default function ServicesManager({ data }) {
    const [services, setServices] = useState(data ?? [])
    const [editingId, setEditingId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [saving, setSaving] = useState(false)
    const router = useRouter()

    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { visible: true, order_index: 0 }
    })

    const watchedName = watch('name')
    const watchedIcon = watch('icon')

    // Auto-slug from name when creating
    useEffect(() => {
        if (!editingId && watchedName) {
            setValue('slug', slugify(watchedName))
        }
    }, [watchedName, editingId])

    function handleEdit(service) {
        setValue('name', service.name)
        setValue('slug', service.slug ?? slugify(service.name))
        setValue('description', service.description ?? '')
        setValue('icon', service.icon ?? '')
        setValue('order_index', service.order_index ?? 0)
        setValue('visible', service.visible ?? true)
        setEditingId(service.id)
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
                .from('services')
                .update(formData)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update service.')
                setSaving(false)
                return
            }

            setServices(s => s.map(svc => svc.id === editingId ? { ...svc, ...formData } : svc))
            toast.success('Service updated.')
        } else {
            const { data: newService, error } = await supabase
                .from('services')
                .insert(formData)
                .select()
                .single()

            if (error) {
                toast.error('Failed to add service.')
                setSaving(false)
                return
            }

            setServices(s => [...s, newService])
            toast.success('Service added.')
        }

        setEditingId(null)
        setShowForm(false)
        reset()
        setSaving(false)
        router.refresh()
    }

    async function toggleVisible(service) {
        const supabase = createClient()
        const { error } = await supabase
            .from('services')
            .update({ visible: !service.visible })
            .eq('id', service.id)

        if (error) { toast.error('Failed to update visibility.'); return }
        setServices(s => s.map(svc => svc.id === service.id ? { ...svc, visible: !svc.visible } : svc))
    }

    async function handleDelete(id) {
        if (!confirm('Delete this service? This cannot be undone.')) return
        const supabase = createClient()
        const { error } = await supabase.from('services').delete().eq('id', id)
        if (error) { toast.error('Failed to delete service.'); return }
        setServices(s => s.filter(svc => svc.id !== id))
        toast.success('Service deleted.')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-extrabold text-3xl text-text">Services</h1>
                        <p className="text-muted text-[14px] mt-1">
                            Manage services shown on the homepage. Toggle visible to show/hide.
                        </p>
                    </div>
                </div>

                {/* Add button */}
                {!showForm && (
                    <button onClick={() => setShowForm(true)}
                            className="mb-6 bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-5 py-2.5 rounded-lg transition-colors">
                        + Add Service
                    </button>
                )}

                {/* Form */}
                {showForm && (
                    <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                        <h2 className="font-bold text-lg text-text mb-5">
                            {editingId ? 'Edit Service' : 'Add Service'}
                        </h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Service Name</label>
                                <input {...register('name')} placeholder="Renovations" className={inputClass} />
                                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Slug</label>
                                <input {...register('slug')} placeholder="renovations" className={inputClass} />
                                {errors.slug && <p className="text-red-500 text-xs">{errors.slug.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5 md:col-span-2">
                                <label className="text-[13px] font-semibold text-text">Description</label>
                                <textarea {...register('description')} rows={3}
                                          placeholder="Brief service description..."
                                          className={`${inputClass} resize-none`} />
                                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">
                                    Lucide Icon Name
                                </label>
                                <div className="flex items-center gap-3">
                                    <input {...register('icon')} placeholder="wrench"
                                           className={inputClass} />
                                    <div className="flex-shrink-0">
                                        <LucidePreview name={watchedIcon} />
                                    </div>
                                </div>
                                <p className="text-[11px] text-muted">
                                    Find names at{' '}
                                    <a href="https://lucide.dev/icons" target="_blank"
                                       className="text-accent underline">lucide.dev/icons</a>
                                    {' '}— use camelCase e.g. <code>wrench</code>, <code>home</code>, <code>flame</code>
                                </p>
                                {errors.icon && <p className="text-red-500 text-xs">{errors.icon.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-[13px] font-semibold text-text">Display Order</label>
                                <input {...register('order_index')} type="number"
                                       className={inputClass} />
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
                                    {saving ? 'Saving...' : editingId ? 'Update Service' : 'Add Service'}
                                </button>
                                <button type="button" onClick={handleCancel}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-2.5 rounded-lg transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Services list */}
                {services.length === 0 ? (
                    <div className="text-center py-16 text-muted">
                        <p className="text-[15px]">No services yet. Add your first one above.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {[...services].sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0)).map(svc => {
                            const iconName = svc.icon?.charAt(0).toUpperCase() + svc.icon?.slice(1).replace(/-([a-z])/g, (_, l) => l.toUpperCase())
                            const Icon = Icons[iconName]

                            return (
                                <div key={svc.id}
                                     className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">

                                    {/* Icon */}
                                    <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 text-accent">
                                        {Icon ? <Icon size={18} /> : <span className="text-[10px] text-muted">?</span>}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h3 className="font-bold text-[15px] text-text">{svc.name}</h3>
                                                <p className="text-[12px] text-muted mt-0.5">
                                                    /{svc.slug ?? '—'} · Order: {svc.order_index ?? 0}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button onClick={() => toggleVisible(svc)}
                                                        className={`text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full transition-colors cursor-pointer
                                                            ${svc.visible
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                            }`}>
                                                    {svc.visible ? 'Visible' : 'Hidden'}
                                                </button>
                                                <button onClick={() => handleEdit(svc)}
                                                        className="text-[12px] font-semibold text-primary hover:text-primary-light transition-colors cursor-pointer">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(svc.id)}
                                                        className="text-[12px] font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        {svc.description && (
                                            <p className="text-[13px] text-muted mt-1.5 leading-relaxed line-clamp-2">
                                                {svc.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

