import { Suspense } from "react"
import { AnnouncementsList } from "@/components/announcements-list"
import { AnnouncementFilters } from "@/components/announcement-filters"

export default function AnnouncementsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80">
            <AnnouncementFilters />
          </aside>
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Anúncios de Compra</h1>
              <p className="text-gray-600 mt-2">Encontre oportunidades de negócio</p>
            </div>
            <Suspense fallback={<div>Carregando anúncios...</div>}>
              <AnnouncementsList />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
