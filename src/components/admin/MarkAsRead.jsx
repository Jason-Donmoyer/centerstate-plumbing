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
            {!viewed ? <button onClick={markAsRead}>Mark As Read</button>
            :
            <p>Viewed</p>
            }
        </div>
    )
}