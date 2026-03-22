'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function MarkAsRead({ leadId, isRead }) {
    const [viewed, setIsViewed] = useState(isRead)

    async function markAsRead() {
        const supabase = createClient()
        console.log(leadId)

        const {data, error} = await supabase
            .from('leads')
            .update({ read:true })
            .eq('id', leadId)
        console.log(data, error)
        if (error) {
            console.error('There was a problem updating the data:', error)
            alert(error.message)
        }
        setIsViewed(true)
    }

    return (
        <div>
            {!viewed ? <button onClick={markAsRead} className="rounded-2xl bg-brand-blue text-white p-4 cursor-pointer hover:bg-brand-light-blue">Mark As Read</button>
            :
            <p className="rounded-2xl bg-brand-silver text-black font-semibold p-4">Viewed</p>
            }
        </div>
    )
}