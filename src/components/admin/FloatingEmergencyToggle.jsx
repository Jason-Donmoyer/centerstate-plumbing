'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function FloatingEmergencyToggle() {
    const [isVisible, setIsVisible] = useState(true)
    const supabase = createClient()

    const buttonClass = "flex items-center justify-center font-bold text-white rounded-2xl px-8 py-4 cursor-pointer hover:bg-brand-light-blue"

    useEffect(() => {
        async function getButtonData() {
            const { data, error } = await supabase
                .from('settings')
                .select('*')
                .eq('name', 'floating_emergency_button')
                .single()
            if (error) {
                console.error("There was an error fetching data:", error)
            }
            setIsVisible(data.visible)
        }
        getButtonData()
    }, [])

    async function setButtonData() {
        const { data, error } = await supabase
            .from('settings')
            .update({
                'visible': !isVisible
            })
            .eq('name', 'floating_emergency_button')
        setIsVisible(!isVisible)
    }

    return (
        <div className="flex flex-col gap-4 w-1/3 items-center justify-center mt-8">
            <p className="font-semibold">Floating Emergency Button</p>
            <button
                onClick={setButtonData}
                className={`${buttonClass} ${isVisible
                    ?
                    "bg-brand-blue" 
                    : 
                    "bg-brand-orange"}
                `}
            >
                {isVisible ? "Visible" : "Hidden"}
            </button>
        </div>
    )
    

}