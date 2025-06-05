import { Suspense } from "react"
import { ProfileHeader } from "@/components/profile-header"
import { UserAnnouncementsList } from "@/components/user-announcements-list"
import { CreateAnnouncementForm } from "@/components/create-announcement-form"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <ProfileHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1">
            <CreateAnnouncementForm />
          </aside>
          <main className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Veja as últimas publicações visualizadas</h2>
            <Suspense fallback={<div>Carregando publicações...</div>}>
              <UserAnnouncementsList />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
