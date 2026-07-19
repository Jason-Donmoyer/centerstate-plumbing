// components/admin/ContentManager.jsx
'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const heroSchema = z.object({
    headline: z.string().min(1, "Headline is required"),
    subheadline: z.string().min(1, "Subheadline is required"),
    cta_quote: z.string().min(1, "CTA button text is required"),
})

const aboutSchema = z.object({
    headline: z.string().min(1, "Headline is required"),
    subheadline: z.string().min(1, "Subheadline is required"),
})

const inputClass = "w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/15 bg-white"

function SectionForm({ title, description, children, onSubmit, saving }) {
    return (
        <div className="bg-surface border border-border rounded-2xl p-6 mb-6">
            <div className="mb-5">
                <h2 className="font-bold text-lg text-text">{title}</h2>
                {description && <p className="text-muted text-[13px] mt-1">{description}</p>}
            </div>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                {children}
                <div>
                    <button type="submit" disabled={saving}
                            className="bg-accent hover:bg-accent-hover text-white font-bold uppercase tracking-[0.5px] text-[13px] px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50">
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default function ContentManager({ about, hero }) {
    const router = useRouter()

    const heroData = hero[0]
    const aboutData = about[0]

    const {
        register: registerHero,
        handleSubmit: handleHeroSubmit,
        setValue: setHeroValue,
    } = useForm({ resolver: zodResolver(heroSchema) })

    const {
        register: registerAbout,
        handleSubmit: handleAboutSubmit,
        setValue: setAboutValue,
    } = useForm({ resolver: zodResolver(aboutSchema) })

    useEffect(() => {
        setHeroValue('headline', heroData?.data?.headline ?? '')
        setHeroValue('subheadline', heroData?.data?.subheadline ?? '')
        setHeroValue('cta_quote', heroData?.data?.cta_quote ?? '')
    }, [])

    useEffect(() => {
        setAboutValue('headline', aboutData?.data?.headline ?? '')
        setAboutValue('subheadline', aboutData?.data?.subheadline ?? '')
    }, [])

    async function updateHero(formData) {
        const supabase = createClient()
        const { error } = await supabase
            .from('content_blocks')
            .update({
                data: {
                    ...heroData.data, // preserve any other fields
                    headline: formData.headline,
                    subheadline: formData.subheadline,
                    cta_quote: formData.cta_quote,
                }
            })
            .eq('id', heroData.id)

        if (error) {
            toast.error('Failed to update hero content.')
            return
        }
        toast.success('Hero content updated.')
        router.refresh()
    }

    async function updateAbout(formData) {
        const supabase = createClient()
        const { error } = await supabase
            .from('content_blocks')
            .update({
                data: {
                    ...aboutData.data, // preserve any other fields
                    headline: formData.headline,
                    subheadline: formData.subheadline,
                }
            })
            .eq('id', aboutData.id)

        if (error) {
            toast.error('Failed to update about content.')
            return
        }
        toast.success('About content updated.')
        router.refresh()
    }

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="font-extrabold text-3xl text-text">Content</h1>
                    <p className="text-muted text-[14px] mt-1">
                        Edit site copy for the Hero and About sections.
                    </p>
                </div>

                {/* Hero */}
                <SectionForm
                    title="Hero Section"
                    description="Text shown in the main hero banner at the top of the homepage."
                    onSubmit={handleHeroSubmit(updateHero)}
                >
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-text">Headline</label>
                        <input {...registerHero('headline')}
                               placeholder="Renovations, New Construction & Commercial Plumbing"
                               className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-text">Subheadline</label>
                        <textarea {...registerHero('subheadline')} rows={3}
                                  placeholder="Over 25 years of residential and commercial plumbing experience..."
                                  className={`${inputClass} resize-none`} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-text">Estimate Button Text</label>
                        <input {...registerHero('cta_quote')}
                               placeholder="Request Estimate"
                               className={inputClass} />
                    </div>
                </SectionForm>

                {/* About */}
                <SectionForm
                    title="About Section"
                    description="Text shown in the About Jason section."
                    onSubmit={handleAboutSubmit(updateAbout)}
                >
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-text">Headline</label>
                        <input {...registerAbout('headline')}
                               placeholder="25+ Years of Plumbing Experience You Can Trust"
                               className={inputClass} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[13px] font-semibold text-text">Subheadline</label>
                        <textarea {...registerAbout('subheadline')} rows={4}
                                  placeholder="Centerstate was built on the belief that every project deserves..."
                                  className={`${inputClass} resize-none`} />
                    </div>
                </SectionForm>

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

// const aboutSchema = z.object({
//     body: z.string().min(1, "Body is required"),
//     years: z.string().min(1, "Years in business is required"),
//     headline: z.string().min(1, 'Headline is required'),
//     licensed: z.string().transform(val => val === 'true'),
// })

// const heroSchema = z.object({
//     headline: z.string().min(1, "Headline is required"),
//     cta_quote: z.string().min(1, "CTA Quote is required"),
//     subheadline: z.string().min(1, 'Subheadline is required'),
//     cta_emergency: z.string().min(1, "CTA Emergency is required"),
// })

// export default function ContentManager({ about, hero }) {
//     const { register: registerAbout, handleSubmit: handleAbout, setValue: setAboutValue } = useForm({
//         resolver: zodResolver(aboutSchema)
//     })
      
//     const { register: registerHero, handleSubmit: handleHero, setValue: setHeroValue } = useForm({
//         resolver: zodResolver(heroSchema)
//     })

//     const aboutData = about[0]
//     const heroData = hero[0]
//     const router = useRouter()

//     useEffect(() => {
//         setAboutValue('body', aboutData.data.body),
//         setAboutValue('years', aboutData.data.years),
//         setAboutValue('headline', aboutData.data.headline),
//         setAboutValue('licensed', aboutData.data.licensed)   
//     }, [])

//     useEffect(() => {
//         setHeroValue('headline', heroData.data.headline),
//         setHeroValue('cta_quote', heroData.data.cta_quote),
//         setHeroValue('subheadline', heroData.data.subheadline),
//         setHeroValue('cta_emergency', heroData.data.cta_emergency)
//     }, [])

//     async function updateAbout(formData) {
//         const supabase = createClient()

//         const { data, error } = await supabase
//             .from('content_blocks')
//             .update({
//                 data: {
//                     body: formData.body,
//                     years: formData.years,
//                     headline: formData.headline,
//                     licensed: formData.licensed
//                 }
//             })
//             .eq('id', aboutData.id)
//         if (error) {
//             console.error("There was a problem updating the data:", error)
//             toast.error('There was a problem, please try again')
//         }
//         toast.success("About content updated!")
//         router.refresh()
//     }

//     async function updateHero(formData) {
//         const supabase = createClient()

//         const { data, error } = await supabase
//             .from('content_blocks')
//             .update({
//                 data: {
//                     headline: formData.headline,
//                     cta_quote: formData.cta_quote,
//                     subheadline: formData.subheadline,
//                     cta_emergency: formData.cta_emergency
//                 }
//             })
//             .eq('id', heroData.id)
//         if (error) {
//             console.error("There was a problem:", error)
//             toast.error("There was a problem, please try again")
//         }
//         toast.success("Hero content updated!")
//         router.refresh()
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-8">
//             <h1 className="text-4xl font-bold text-brand-blue text-center mb-8">Content</h1>
//             <div className="flex flex-col w-full justify-center items-center">
//                 <div className="w-full flex flex-col items-center gap-6">
//                     <h2 className="font-bold text-brand-blue text-lg">Hero</h2>
//                     {/* Hero Form */}
//                     <form onSubmit={handleHero(updateHero)} className="flex flex-col px-4 py-6 gap-2 w-full">
//                         <label className="text-sm font-semibold text-brand-gray">Headline</label>
//                             <input 
//                                 type="text" 
//                                 placeholder='headline' 
//                                 {...registerHero('headline')} 
//                                 className="border 
//                                             border-gray-300 
//                                             rounded 
//                                             px-3 
//                                             py-2
//                                             w-full 
//                                             focus:outline-none 
//                                             focus:ring-2 
//                                             focus:ring-brand-blue"
//                             />
//                             <label className="text-sm font-semibold text-brand-gray">CTA Quote</label>
//                             <input 
//                                 type="text" 
//                                 placeholder='cta_quote' 
//                                 {...registerHero('cta_quote')} 
//                                 className="border 
//                                             border-gray-300 
//                                             rounded 
//                                             px-3 
//                                             py-2
//                                             w-full 
//                                             focus:outline-none 
//                                             focus:ring-2 
//                                             focus:ring-brand-blue"
//                             />
//                             <label className="text-sm font-semibold text-brand-gray">Subheadline</label>
//                             <input 
//                                 type="text" 
//                                 placeholder='subheadline' 
//                                 {...registerHero('subheadline')} 
//                                 className="border 
//                                             border-gray-300 
//                                             rounded 
//                                             px-3 
//                                             py-2
//                                             w-full 
//                                             focus:outline-none 
//                                             focus:ring-2 
//                                             focus:ring-brand-blue"
//                             />
//                             <label className="text-sm font-semibold text-brand-gray">CTA Emergency</label>
//                             <input 
//                                 type="text" 
//                                 placeholder='cta_emergency' 
//                                 {...registerHero('cta_emergency')} 
//                                 className="border 
//                                             border-gray-300 
//                                             rounded 
//                                             px-3 
//                                             py-2
//                                             w-full 
//                                             focus:outline-none 
//                                             focus:ring-2 
//                                             focus:ring-brand-blue"
//                             />
//                             <div className="flex justify-center m-6">
//                                 <button 
//                                     type="submit"
//                                     className="rounded-2xl bg-brand-gray text-white p-4 w-3/4 md:w-1/4 cursor-pointer hover:bg-brand-light-blue"
//                                 >
//                                     Submit Changes
//                                 </button>
//                             </div>
//                     </form>
//                 </div>
//                 <div className="w-full flex flex-col items-center gap-6">
//                     <h2 className="font-bold text-brand-blue text-lg">About</h2>
//                     {/* About Form */}
//                     <form onSubmit={handleAbout(updateAbout)} className="flex flex-col px-4 py-6 gap-2 w-full">
//                         <label className="text-sm font-semibold text-brand-gray">Body</label>
//                         <textarea
//                             rows="6"
//                             placeholder='body' 
//                             {...registerAbout('body')} 
//                             className="border 
//                                         border-gray-300 
//                                         rounded 
//                                         px-3 
//                                         py-2
//                                         w-full 
//                                         focus:outline-none 
//                                         focus:ring-2 
//                                         focus:ring-brand-blue"
//                             > 
//                             </textarea>
//                         <label className="text-sm font-semibold text-brand-gray">Years In Business</label>
//                         <input 
//                             type="text" 
//                             placeholder='years' 
//                             {...registerAbout('years')} 
//                             className="border 
//                                         border-gray-300 
//                                         rounded 
//                                         px-3 
//                                         py-2
//                                         w-full 
//                                         focus:outline-none 
//                                         focus:ring-2 
//                                         focus:ring-brand-blue"
//                         />
//                         <label className="text-sm font-semibold text-brand-gray">Headline</label>
//                         <input 
//                             type="text" 
//                             placeholder='headline' 
//                             {...registerAbout('headline')} 
//                             className="border 
//                                         border-gray-300 
//                                         rounded 
//                                         px-3 
//                                         py-2
//                                         w-full 
//                                         focus:outline-none 
//                                         focus:ring-2 
//                                         focus:ring-brand-blue"
//                         />
//                         <label className="text-sm font-semibold text-brand-gray">Is Licensed?</label>
//                         <select 
//                             name="isLicensed" 
//                             id="licensed" 
//                             {...registerAbout('licensed')}
//                             className="border 
//                                         border-gray-300 
//                                         rounded 
//                                         px-3 
//                                         py-2
//                                         w-full 
//                                         focus:outline-none 
//                                         focus:ring-2 
//                                         focus:ring-brand-blue"
//                         >
//                             <option value="true">Licensed</option>
//                             <option value="false">Not Licensed</option>
//                         </select>
//                         <div className="flex justify-center m-6">
//                             <button 
//                                 type="submit"
//                                 className="rounded-2xl bg-brand-gray text-white p-4 w-3/4 md:w-1/4 cursor-pointer hover:bg-brand-light-blue"
//                             >
//                                 Submit Changes
//                             </button>
//                             </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }