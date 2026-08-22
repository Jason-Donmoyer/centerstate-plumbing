import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { BUSINESS } from '@/lib/constants'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const body = await request.json()
    const { name, email, role, requestId } = body

    const { error } = await resend.emails.send({
        from: 'Centerstate Website <noreply@centerstateplumbingnj.com>',
        to: `${email}`,
        subject: 'Thanks for choosing Centerstate — quick favor to ask',
        html: `
                <h2>Hi, ${name}, please take a few minutes to let me know how we did.</h2>
                <p>You can leave a review here: <a href="${BUSINESS.googleReviewUrl}">Leave a Google Review</a>.</p>
                <p>It only takes a minute and helps us a lot!</p>
        `
    })

    if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}