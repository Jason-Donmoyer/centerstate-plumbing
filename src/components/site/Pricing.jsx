export default function Pricing({ pricingData }) {

    return (
        <div className="min-w-screen flex justify-between p-16 gap-4">
            {pricingData.map(pricing => (
                <div 
                    key={pricing.id}
                    className={
                        pricing.is_featured
                        ? "bg-brand-blue flex flex-col gap-1 py-4 px-6 rounded-2xl text-white w-1/3"
                        : "bg-brand-silver flex flex-col gap-1 py-4 px-6 rounded-2xl w-1/3" 
                    } 
                    >
                    <h2 className="font-bold text-2xl">{pricing.name}</h2>
                    {pricing.features.map(feature => (
                            <p 
                                key={feature}
                                className="m-0 p-0 font-semibold text-sm">{feature}
                            </p>
                    ))}
                    <p className="font-bold text-2xl">{pricing.price}</p>
                </div>
            ))}
        </div>
    )
}