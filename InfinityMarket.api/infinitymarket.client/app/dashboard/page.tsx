import { Suspense } from "react"
import { AnnouncementsList } from "@/components/announcements-list"
import { CategoriesGrid } from "@/components/categories-grid"
import { DashboardHeader } from "@/components/dashboard-header"
import { StatsCards } from "@/components/stats-cards"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">
        <StatsCards />
        <CategoriesGrid />
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Veja as Últimas Publicações</h2>
          <Suspense fallback={<div>Carregando anúncios...</div>}>
            <AnnouncementsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
