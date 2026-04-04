'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function useFloatingVisibility() {
    const [isVisible, setIsVisible] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function getButtonData() {
            const { data, error } = await supabase
                .from('settings')
                .select('*')
                .eq('name', 'floating_emergency_button')
                .single()
            if (error) {
                console.error("There was a problem fetching data:", error)
            }
            setIsVisible(data.visible)
        }
        getButtonData()
    }, [])
    
    return isVisible
}