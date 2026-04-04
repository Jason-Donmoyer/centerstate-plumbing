export default function LoadingComponent() {

    return (
        <div className="animate-pulse w-full flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center w-full">
                <div className="w-full h-32 rounded bg-brand-gray mb-4"></div> 
                <div className="h-8 w-1/2 rounded bg-brand-gray mb-4"></div> 
                <div className="h-6 w-1/3 rounded bg-brand-gray mb-4"></div> 
                <div className="h-16 w-1/3 rounded bg-brand-gray mb-4"></div>
            </div>
            <div className="flex flex-col justify-center items-center w-3/4 mb-4">
                <div className="w-3/4 h-32 rounded bg-brand-gray mb-4"></div>
                <div className="h-8 w-1/2 rounded bg-brand-gray mb-4"></div> 
                <div className="h-24 w-1/4 rounded bg-brand-gray mb-4"></div>
            </div>  
            <div className="flex flex-col justify-center items-center w-3/4 mb-4">
                <div className="w-3/4 h-32 rounded bg-brand-gray mb-4"></div>
                <div className="h-8 w-1/2 rounded bg-brand-gray mb-4"></div> 
                <div className="h-24 w-1/4 rounded bg-brand-gray mb-4"></div>
            </div>  
        </div>
       
    )
}