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
    description: z.string().min(1, "Description is required"),
    icon: z.string().min(1, 'Icon description is required'),
    is_emergency: z.string().transform(val => val === 'true'),
})


export default function ServicesManager({ data }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const [createNewService, setCreateNewService] = useState(false)
    const [editService, setEditService] = useState(null)
    // const [deleteService, setDeleteService] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (editService) {
            setValue('name', editService.name)
            setValue('description', editService.description)
            setValue('icon', editService.icon)
            setValue('is_emergency', String(editService.is_emergency))
        }
    }, [editService])

    


    async function createService(formData) {
        // console.log(formData)
        const supabase = createClient()

        const { data, error } = await supabase
            .from('services')
            .insert({
                name: formData.name,
                description: formData.description,
                icon: formData.icon,
                is_emergency: formData.is_emergency,
            })
        if (error) {
            console.error('There was an error adding service:', error)
            toast.error("There was a problem adding service, please try again.")
        }
        
        toast.success("Service added!")
        setCreateNewService(false)
        reset()
        router.refresh()
    }

    async function deleteService(id) {
        if (!window.confirm("Are you sure you want to delete this service?")) return

        const supabase = createClient()

        const { data, error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)
        if (error) {
            console.error('There was an error deleting this service:', error)
            toast.error("There was a problem removing this service, please try again.")
        }
        toast.success("Service removed!")
        reset()
        router.refresh()
    }

    async function updateService(formData) {
        const supabase = createClient()
        // console.log(formData)
        const { error } = await supabase
            .from('services')
            .update({
                name: formData.name,
                description: formData.description,
                icon: formData.icon,
                is_emergency: formData.is_emergency
            })
            .eq('id', editService.id)
        if (error) {
            console.error('There was an error loading the data:', error)
            toast.error("There was a problem loading the data. Plese try again.")
            return
        }
        toast.success('Service Updated!')
        setEditService(null)
        reset()
        router.refresh()
    }

    function closeModal() {
        setEditService(null)
        reset()
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-8">
            <h1 className="text-4xl font-bold text-brand-blue text-center mb-8">Services</h1>
            {/* Existing Services */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {data.map(service => (
                    <div key={service.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
                        <p className="font-bold text-brand-blue text-lg">{service.name}</p>
                        <div className="flex gap-3 mt-auto">
                        <button 
                            onClick={() => setEditService(service)}
                            className="rounded-2xl bg-brand-blue text-white p-4 w-1/2 cursor-pointer"
                        >
                            Edit
                        </button>
                        
                        <button 
                            className="rounded-2xl bg-brand-orange text-white p-4 w-1/2 cursor-pointer" 
                            onClick={() => deleteService(service.id)}
                        >
                            Delete
                        </button>
                        </div>      
                    </div>
                ))}
                
            </div>
            {/* Edit Modal */}
            {editService !== null && (
                <div className="fixed inset-0 bg-black/50 z-40">
                    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-1/2">
                            {/* Form */}
                            <form onSubmit={handleSubmit(updateService)} 
                                className="flex flex-col p-8 gap-2">
                                <button 
                                    onClick={closeModal}
                                    className="self-end text-2xl font-extrabold cursor-pointer"
                                >
                                    X
                                </button>
                                <label className="text-sm font-semibold text-brand-gray">Service Name</label>
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
                                <label className="text-sm font-semibold text-brand-gray">Description</label>
                                <input 
                                    type="text" 
                                    placeholder='description' 
                                    {...register('description')} 
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
                                <label className="text-sm font-semibold text-brand-gray">Icon</label>
                                <input 
                                    type="text" 
                                    placeholder='icon description' 
                                    {...register('icon')} 
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
                                <label className="text-sm font-semibold text-brand-gray">Emergency Service?</label>
                                <select 
                                    name="isEmergency" 
                                    id="emergency" 
                                    {...register('is_emergency')}
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
                                    <option value="true">Emergency</option>
                                    <option value="false">Standard</option>
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
                    onClick={() => setCreateNewService(true)}
                    className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
                >
                    Add service
                </button>
            </div>
            {createNewService && (
                <div className="fixed inset-0 bg-black/50 z-40">
                    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-1/2">
                            {/* Form */}
                            <form onSubmit={handleSubmit(createService)}
                                className="flex flex-col p-8 gap-2"
                            >
                                <button 
                                    onClick={() => {
                                        setCreateNewService(false)
                                        reset()
                                    }}
                                    className="self-end text-2xl font-extrabold cursor-pointer"
                                >
                                    X
                                </button>
                                <label className="text-sm font-semibold text-brand-gray">Service Name</label>
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
                                <label className="text-sm font-semibold text-brand-gray">Description</label>
                                <input 
                                    type="text" 
                                    placeholder='description' 
                                    {...register('description')} 
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
                                <label className="text-sm font-semibold text-brand-gray">Icon</label>
                                <input 
                                    type="text" 
                                    placeholder='icon description' 
                                    {...register('icon')} 
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
                                <label className="text-sm font-semibold text-brand-gray">Emergency Service?</label>
                                <select 
                                    name="isEmergency" 
                                    id="emergency" 
                                    {...register('is_emergency')}
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
                                    <option value="true">Emergency</option>
                                    <option value="false">Standard</option>
                                </select>
                                <button 
                                    type="submit" 
                                    className="rounded-2xl bg-brand-gray text-white p-4 cursor-pointer hover:bg-brand-light-blue"
                                >
                                    Add Service
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}