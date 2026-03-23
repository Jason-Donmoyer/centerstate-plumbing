'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase'
import { useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    icon: z.string().min(1, 'Icon description is required'),
    is_emergency: z.string().transform(val => val === 'true'),
})


export default function ServicesManager({ data }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const [createNewService, setCreateNewService] = useState(false)
    const [editService, setEditService] = useState(null)
    // const [deleteService, setDeleteService] = useState(false)
    const router = useRouter()


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

    async function updateServices(id) {
        const supabase = createClient()
    }

    return (
        <div>
            <h1>Services</h1>
            <button onClick={() => setCreateNewService(true)}>Add service</button>
            {createNewService && (
                <div>
                    {/* Form */}
                    <form onSubmit={handleSubmit(createService)}>
                        <label>Service Name</label>
                        <input type="text" placeholder='name' {...register('name')} />
                        <label>Description</label>
                        <input type="text" placeholder='description' {...register('description')} />
                        <label>Icon</label>
                        <input type="text" placeholder='icon description' {...register('icon')} />
                        <label>Emergency Service?</label>
                        <select name="isEmergency" id="emergency" {...register('is_emergency')}>
                            <option value="true">Emergency</option>
                            <option value="false">Standard</option>
                        </select>
                        <button type="submit">Add Service</button>
                    </form>
                </div>
            )}

            {/* Existing Services */}
            {data.map(service => (
                <div key={service.id}>
                    <p>{service.name}</p>
                    <button>Edit</button>
                    <button onClick={() => deleteService(service.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}