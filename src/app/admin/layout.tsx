import type { Metadata } from "next";
import AdminNav from '@/components/admin/AdminNav'

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false
    }
}

export default function AdminLayout({
        children,
     }: Readonly<{
        children: React.ReactNode
    }> ) {
    
    return (
        <div>
            <AdminNav></AdminNav>
            {children}
        </div>
      
    )
}