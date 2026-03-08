import AdminNav from '@/components/admin/AdminNav'

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