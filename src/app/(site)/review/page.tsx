import ReviewForm from '@/components/site/ReviewForm'

export default async function ReviewPage({ searchParams }: { 
    searchParams: { name?: string, role?: string, requestId?: string } 
}) {
    const { name, role, requestId } = await searchParams

    return <ReviewForm  
        name={name ?? ''} 
        role={role ?? ''} 
        requestId={requestId ?? ''}
        />  
}