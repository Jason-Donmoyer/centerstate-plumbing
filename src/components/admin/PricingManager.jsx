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
    price: z.string().min(1, "Price is required"),
    features: z.string().min(1, 'Features are required'),
    is_featured: z.string().transform(val => val === 'true'),
    // index: z.number().min(1, "Index is required"),
})

export default function PricingManager({ data }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
            resolver: zodResolver(schema)
    })
    // const [createNewPricingCard, setNewPricingCard] = useState(false)
    const [updatePricingCard, setUpdatePricingCard] = useState(null)
    const router = useRouter()

    useEffect(() => {
        if (updatePricingCard) {
            setValue('name', updatePricingCard.name),
            setValue('price', updatePricingCard.price),
            setValue('features', updatePricingCard.features.join('\n')),
            setValue('is_featured', String(updatePricingCard.is_featured))
        }
    }, [updatePricingCard])

    async function updatePricing(formData) {
        const supabase = createClient()

        const { error } = await supabase
            .from('pricing_cards')
            .update({
                name: formData.name,
                price: formData.price,
                features: formData.features.split('\n').filter(f => f.trim() !== ''),
                is_featured: formData.is_featured
            })
            .eq('id', updatePricingCard.id)
        if (error) {
            console.error('There was an error loading the data:', error)
            toast.error("There was a problem loading the data. Plese try again.")
            return
        }
        toast.success('Pricing Card Updated!')
        setUpdatePricingCard(null)
        reset()
        router.refresh()
    }

    function closeModal() {
        setUpdatePricingCard(null)
        reset()
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-8">
            <h1 className="text-4xl font-bold text-brand-blue text-center mb-8">Pricing</h1>
            {/* Existing Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {data.map(price => (
                    <div key={price.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
                        <p className="font-bold text-brand-blue text-lg text-center">{price.name}</p>
                        <div className="flex justify-center gap-3 mt-auto">
                            <button 
                                onClick={() => setUpdatePricingCard(price)}
                                className="rounded-2xl bg-brand-blue text-white p-4 w-1/2 cursor-pointer hover:bg-brand-light-blue"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Update Pricing Card Modal */}
            {updatePricingCard !== null && (
                <div className="fixed inset-0 bg-black/50 z-40">
                    <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
                        <div className="bg-white rounded-2xl p-8 w-full md:w-1/2">
                            {/* Form */}
                            <form 
                                onSubmit={handleSubmit(updatePricing)}
                                className="flex flex-col p-8 gap-2"
                            >
                                <button 
                                    onClick={closeModal}
                                    className="self-end text-2xl font-extrabold cursor-pointer"
                                >
                                    X
                                </button>
                                <label className="text-sm font-semibold text-brand-gray">Pricing Name</label>
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
                                <label className="text-sm font-semibold text-brand-gray">Service Name</label>
                                <input 
                                    type="text" 
                                    placeholder='price' 
                                    {...register('price')} 
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
                                <label className="text-sm font-semibold text-brand-gray">Service Name</label>
                                <textarea 
                                    id="features"
                                    name="features" 
                                    placeholder='enter space separated features' 
                                    {...register('features')} 
                                    className="border 
                                              border-gray-300 
                                              rounded 
                                              px-3 
                                              py-2
                                              w-full 
                                              focus:outline-none 
                                              focus:ring-2 
                                              focus:ring-brand-blue"
                                ></textarea>
                                <label className="text-sm font-semibold text-brand-gray">Featured Pricing?</label>
                                <select 
                                    name="isFeatured" 
                                    id="is_featured" 
                                    {...register('is_featured')}
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
                                    <option value="true">Featured</option>
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
        </div>
    )

}