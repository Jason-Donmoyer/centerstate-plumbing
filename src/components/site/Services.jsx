import * as Icons from 'lucide-react'

export default function Services({ servicesData }) {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8 py-8 bg-brand-silver mb-2">
        {servicesData.map(service => {
            const Icon = Icons[service.icon]
            return (
                <div 
                    key={service.id}
                    className="text-center flex flex-col px-4 py-6 text-white bg-brand-blue mx-8 my-6 rounded-2xl shadow"   
                >
                    <h1 className="text-3xl font-bold mb-1.5">{service.name}</h1>
                    <h2 className="mb-3">{service.description}</h2>
                    <div className="flex items-center justify-center">
                        {service.is_emergency
                        ? <p className="text-white bg-brand-orange font-bold rounded p-5">Emergency Service</p>
                        : <Icon size={30}></Icon>
                        }  
                    </div>
                </div>
                )
            }
        )}
        </div>
    )
}