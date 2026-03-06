export default function About({ aboutData }) {
    const { headline, body, years, licensed } = aboutData.data
    
    return (
        <div className="flex flex-col items-center justify-center bg-brand-blue text-white p-8 gap-2">
            <h3 className="font-bold text-2xl">{headline}</h3>
            <p className="w-1/2 text-center">{body}</p>
            <h4>{years} Years in Business</h4>
            {licensed && <p>Licensed & Insured</p>}
        </div>
    )
}