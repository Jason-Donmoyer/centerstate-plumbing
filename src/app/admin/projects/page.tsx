// app/admin/projects/page.jsx
import { createServerSupabaseClient } from '@/lib/supabase-server'
import ProjectsManager from '@/components/admin/ProjectsManager'

export default async function ProjectsPage() {
    const supabase = await createServerSupabaseClient()

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) return <p className="text-red-500 p-8">{error.message}</p>

    return (
        <div className="min-h-screen bg-background py-10 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-extrabold text-3xl text-text">Projects</h1>
                        <p className="text-muted text-[14px] mt-1">
                            Manage project gallery. Toggle featured to show on homepage.
                        </p>
                    </div>
                </div>
                <ProjectsManager initialProjects={projects} />
            </div>
        </div>
    )
}