import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    const body = await request.json()
    const { name, quote, role } = body

    const { error } = await resend.emails.send({
        from: 'Centerstate Website <noreply@centerstateplumbingnj.com>',
        to: `jason.donmoyer@centerstateplumbingnj.com`,
        subject: `New Review Received - ${name}`,
        html: `
                <h2>New review from ${name}</h2>
                <table cellpadding="8" style="border-collapse:collapse;width:100%">
                    <tr><td><strong>Name</strong></td><td>${name}</td></tr>
                    <tr><td><strong>Role</strong></td><td>${role}</td></tr>
                    <tr><td><strong>Review</strong></td><td>${quote}</td></tr>
                </table>
                <p>Log in to approve it: <a href="https://centerstateplumbingnj.com/admin/testimonials">Admin → Testimonials</a></p>
            `
    })

    if (error) {
        console.error('Resend error:', error)
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ success: true })

}