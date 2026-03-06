export default function Testimonials({ testimonialsData }) {

    return (
        <div className="bg-white flex flex-col py-4 px-8">
            {testimonialsData.map(testimonial => (
                <div 
                    key={testimonial.id}
                    className="border-l-4 border-brand-orange pl-6 my-8"
                >
                    <p className="text-brand-gray text-sm font-semibold uppercase tracking-widest mb-3">{testimonial.role}</p>
                    <h2 className="text-brand-blue text-2xl italic font-light mb-4">{testimonial.quote}</h2>
                    <p className="text-brand-gray font-bold">{testimonial.name}</p>
                </div>
            ))}
        </div>
    )
}