import { BUSINESS } from '@/lib/constants'

export default function Footer() {
    const licenseNumber = BUSINESS.license
    const businessName = BUSINESS.name
    const phoneNumber = BUSINESS.phone_display

    return (
        <div className="bg-brand-blue flex flex-col text-white justify-center items-center gap-4 py-12 px-8 text-center">
            <div>
                <h2 className="font-bold text-2xl mb-1">{businessName}</h2>
                <h3 className="font-semibold mb-0.5">{licenseNumber}</h3>
                <p className="font-semibold pb-1">{phoneNumber}</p>
            </div>
        </div>
    )
}