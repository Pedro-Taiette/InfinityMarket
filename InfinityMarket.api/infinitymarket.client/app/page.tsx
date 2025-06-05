import { Suspense } from "react"
import { AnnouncementsList } from "@/components/announcements-list"
import { CategoriesCircular } from "@/components/categories-circular"
import { HeroSection } from "@/components/hero-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <CategoriesCircular />
        <div className="mt-12">
          <Suspense fallback={<div>Carregando anúncios...</div>}>
            <AnnouncementsList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
