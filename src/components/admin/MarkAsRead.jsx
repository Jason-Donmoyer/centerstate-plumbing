'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function MarkAsRead({ leadId, isRead }) {
    const [viewed, setIsViewed] = useState(isRead)

    async function markAsRead() {
        const supabase = createClient()

        const {data, error} = await supabase
            .from('leads')
            .update({ read:true })
            .eq('id', leadId)
        if (error) {
            console.error('There was a problem updating the data:', error)
            alert(error.message)
        }
        setIsViewed(true)
    }

    return (
        <div>
            {!viewed 
                ? <button 
                    onClick={markAsRead} 
                    className="bg-primary
                               hover:bg-primary-light
                               text-white
                               font-bold
                               text-[13px]
                               uppercase
                               tracking-[0.5px]
                               px-5
                               py-2.5
                               rounded-lg
                               cursor-pointer
                               transition-colors"
                    >
                        Mark As Read
                    </button>
                : <span className="inline-block
                                   bg-gray-100
                                   text-gray-500
                                   font-semibold
                                   text-[13px]
                                   px-5
                                   py-2.5
                                   rounded-lg">
                    Viewed
                </span>
            }
        </div>
    )
}