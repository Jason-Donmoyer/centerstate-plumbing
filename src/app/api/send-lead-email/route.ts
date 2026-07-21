// app/api/send-lead-email/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const body = await request.json()
    const { name, phone, email, service_type, message } = body

    const { error } = await resend.emails.send({
        from: 'Centerstate Website <noreply@centerstateplumbingnj.com>',
        to: 'jason.donmoyer@centerstateplumbingnj.com',
        subject: `New Lead: ${name} — ${service_type?.replace(/_/g, ' ')}`,
        html: `
            <h2>New Lead from Centerstate Website</h2>
            <table cellpadding="8" style="border-collapse:collapse;width:100%">
                <tr><td><strong>Name</strong></td><td>${name}</td></tr>
                <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
                <tr><td><strong>Email</strong></td><td>${email}</td></tr>
                <tr><td><strong>Service</strong></td><td>${service_type?.replace(/_/g, ' ')}</td></tr>
                <tr><td><strong>Message</strong></td><td>${message}</td></tr>
            </table>
        `,
    })

    if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
}