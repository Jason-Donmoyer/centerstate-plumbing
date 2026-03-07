import { BUSINESS } from '@/lib/constants'

export default function ServiceArea() {
    const address = BUSINESS.address
    const serviceArea = BUSINESS.service_area
    const serviceMonmouth = BUSINESS.service_area_monmouth_county
    const serviceOcean = BUSINESS.service_towns_ocean_county
    const serviceMiddlesex = BUSINESS.service_towns_middlesex_county

    return (
        <div className="flex flex-col items-center justify-center py-12 px-8 gap-2 bg-brand-silver">
            <h2 className="font-bold text-2xl">Located in {address}</h2>
            <h3 className="font-semibold">Serving all of {serviceArea} and Easten Middlesex and Northern Ocean Counties</h3>
            <div className="flex text-center py-12 px-8 gap-8 w-full">
                <div className="flex flex-col bg-white w-1/3 p-8 rounded-2xl border-brand-blue border-2 gap-4">
                    <h4 className="font-semibold">Middlesex County</h4>
                    <ul>
                        {serviceMiddlesex.map(town => (
                            <li key={town}>
                                {town}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col bg-white w-1/3 p-8 rounded-2xl border-brand-blue border-2 gap-4">
                    <h4 className="font-semibold">Monmouth County</h4>
                    <ul>
                        {serviceMonmouth.map(town => (
                            <li key={town}>
                                {town}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col bg-white w-1/3 p-8 rounded-2xl border-brand-blue border-2 gap-4">
                    <h4 className="font-semibold">Ocean County</h4>
                    <ul>
                        {serviceOcean.map(town => (
                            <li key={town}>
                                {town}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

