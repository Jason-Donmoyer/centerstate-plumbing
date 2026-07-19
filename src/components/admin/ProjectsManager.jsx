// components/admin/ProjectsManager.jsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { toast } from 'sonner'

const CATEGORIES = [
    { value: 'renovation', label: 'Renovation' },
    { value: 'new_construction', label: 'New Construction' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'hydronic_heating', label: 'Hydronic Heating' },
    { value: 'water_heater', label: 'Water Heater' },
    { value: 'service_repair', label: 'Service & Repair' },
]

const EMPTY_FORM = {
    title: '',
    slug: '',
    category: '',
    description: '',
    image_url: '',
    featured: false,
    display_order: 0,
}

function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ProjectsManager({ initialProjects }) {
    const [projects, setProjects] = useState(initialProjects ?? [])
    const [form, setForm] = useState(EMPTY_FORM)
    const [editingId, setEditingId] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const supabase = createClient()

    function handleChange(e) {
        const { name, value, type, checked } = e.target
        setForm(f => ({
            ...f,
            [name]: type === 'checkbox' ? checked : value,
            // Auto-generate slug from title if not editing
            ...(name === 'title' && !editingId ? { slug: slugify(value) } : {}),
        }))
    }

    async function handleImageUpload(e) {
        const file = e.target.files?.[0]
        if (!file) return

        setUploading(true)
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
            .from('projects')
            .upload(fileName, file, { upsert: true })

        if (uploadError) {
            toast.error('Image upload failed.')
            setUploading(false)
            return
        }

        const { data } = supabase.storage.from('projects').getPublicUrl(fileName)
        setForm(f => ({ ...f, image_url: data.publicUrl }))
        setUploading(false)
        toast.success('Image uploaded.')
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)

        if (editingId) {
            const { error } = await supabase
                .from('projects')
                .update(form)
                .eq('id', editingId)

            if (error) {
                toast.error('Failed to update project.')
                setSaving(false)
                return
            }

            setProjects(p => p.map(proj => proj.id === editingId ? { ...proj, ...form } : proj))
            toast.success('Project updated.')
        } else {
            const { data, error } = await supabase
                .from('projects')
                .insert(form)
                .select()
                .single()

            if (error) {
                toast.error('Failed to add project.')
                setSaving(false)
                return
            }

            setProjects(p => [data, ...p])
            toast.success('Project added.')
        }

        setForm(EMPTY_FORM)
        setEditingId(null)
        setShowForm(false)
        setSaving(false)
    }

    function handleEdit(project) {
        setForm({
            title: project.title,
            slug: project.slug,
            category: project.category,
            description: project.description ?? '',
            image_url: project.image_url ?? '',
            featured: project.featured,
            display_order: project.display_order ?? 0,
        })
        setEditingId(project.id)
        setShowForm(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function handleCancel() {
        setForm(EMPTY_FORM)
        setEditingId(null)
        setShowForm(false)
    }

    async function toggleFeatured(project) {
        const { error } = await supabase
            .from('projects')
            .update({ featured: !project.featured })
            .eq('id', project.id)

        if (error) {
            toast.error('Failed to update featured status.')
            return
        }

        setProjects(p => p.map(proj =>
            proj.id === project.id ? { ...proj, featured: !proj.featured } : proj
        ))
    }

    async function handleDelete(id) {
        if (!confirm('Delete this project? This cannot be undone.')) return

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

        if (error) {
            toast.error('Failed to delete project.')
            return
        }

        setProjects(p => p.filter(proj => proj.id !== id))
        toast.success('Project deleted.')
    }

    const inputClass = "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white"

    return (
        <div>
            {/* Add button */}
            {!showForm && (
                <button onClick={() => setShowForm(true)}
                        className="mb-6 bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-5 py-2.5 rounded-lg transition-colors">
                    + Add Project
                </button>
            )}

            {/* Form */}
            {showForm && (
                <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                    <h2 className="font-bold text-lg text-text mb-5">
                        {editingId ? 'Edit Project' : 'Add Project'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Title</label>
                            <input name="title" value={form.title} onChange={handleChange}
                                   placeholder="Master Bathroom Renovation" required className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Slug</label>
                            <input name="slug" value={form.slug} onChange={handleChange}
                                   placeholder="master-bathroom-renovation" required className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Category</label>
                            <select name="category" value={form.category} onChange={handleChange}
                                    required className={inputClass}>
                                <option value="">Select category</option>
                                {CATEGORIES.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[13px] font-semibold text-text">Display Order</label>
                            <input name="display_order" type="number" value={form.display_order}
                                   onChange={handleChange} className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-[13px] font-semibold text-text">Description</label>
                            <textarea name="description" value={form.description} onChange={handleChange}
                                      rows={3} placeholder="Brief project description..."
                                      className={`${inputClass} resize-none`} />
                        </div>

                        {/* <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-[13px] font-semibold text-text">Project Photo</label>
                            {form.image_url && (
                                <img src={form.image_url} alt="Preview"
                                     className="w-40 h-28 object-cover rounded-lg border border-border mb-2" />
                            )}
                            <input type="file" accept="image/*" onChange={handleImageUpload}
                                   className="text-[13px] text-muted" />
                            {uploading && <p className="text-[13px] text-accent">Uploading...</p>}
                        </div> */}

                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="text-[13px] font-semibold text-text">Project Photo</label>
                            
                            {form.image_url && (
                                <img src={form.image_url} alt="Preview"
                                    className="w-40 h-28 object-cover rounded-lg border border-border mb-2" />
                            )}

                            <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 border border-border text-gray-700 font-semibold text-[13px] px-4 py-2.5 rounded-lg transition-colors w-fit">
                                {uploading ? 'Uploading...' : form.image_url ? 'Change Photo' : 'Choose Photo'}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={uploading}
                                />
                            </label>

                            {form.image_url && (
                                <button
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, image_url: '' }))}
                                    className="text-[12px] text-red-500 hover:text-red-700 font-medium w-fit mt-1">
                                    Remove photo
                                </button>
                            )}
</div>

                        <div className="flex items-center gap-2.5 md:col-span-2">
                            <input type="checkbox" name="featured" id="featured"
                                   checked={form.featured} onChange={handleChange}
                                   className="w-4 h-4 accent-[#C86A15]" />
                            <label htmlFor="featured" className="text-[14px] font-medium text-text">
                                Show on homepage (Featured Projects)
                            </label>
                        </div>

                        <div className="flex gap-3 md:col-span-2">
                            <button type="submit" disabled={saving}
                                    className="bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50">
                                {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
                            </button>
                            <button type="button" onClick={handleCancel}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-2.5 rounded-lg transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Projects list */}
            {projects.length === 0 ? (
                <div className="text-center py-16 text-muted">
                    <p className="text-[15px]">No projects yet. Add your first one above.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {projects.map(p => (
                        <div key={p.id}
                             className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-5">

                            {/* Thumbnail */}
                            <div className="w-20 h-16 rounded-lg overflow-hidden bg-primary flex-shrink-0">
                                {p.image_url
                                    ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                                    : <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">No photo</div>
                                }
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-[15px] text-text">{p.title}</h3>
                                        <p className="text-[12px] text-muted mt-0.5 capitalize">
                                            {p.category?.replace(/_/g, ' ')} · Order: {p.display_order ?? 0}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        {/* Featured toggle */}
                                        <button onClick={() => toggleFeatured(p)}
                                                className={`text-[11px] font-bold uppercase tracking-wide px-3 py-1 rounded-full transition-colors cursor-pointer
                                                    ${p.featured
                                                        ? 'bg-accent text-white'
                                                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}>
                                            {p.featured ? 'Featured' : 'Not Featured'}
                                        </button>
                                        <button onClick={() => handleEdit(p)}
                                                className="text-[12px] font-semibold text-primary hover:text-primary-light transition-colors cursor-pointer">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(p.id)}
                                                className="text-[12px] font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {p.description && (
                                    <p className="text-[13px] text-muted mt-1.5 leading-relaxed line-clamp-2">
                                        {p.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}