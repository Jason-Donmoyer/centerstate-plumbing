import { BUSINESS } from '../../lib/constants'



export default function FloatingEmergencyButton() {
    const telLink = BUSINESS.phone

    return (
        <a
            href={`tel:${telLink}`}
            className="
                bg-brand-orange 
                fixed 
                bottom-6 
                right-6 
                hidden 
                md:flex
                rounded-full
                shadow
                p-6
                text-white
                font-bold
                items-center
                gap-2
                "
        >
        <span>&#128680;</span>
        <span>Emergency Repair</span>
        </a>
    )
}