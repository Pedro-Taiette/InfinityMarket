import { Suspense } from "react"
import { AnnouncementDetail } from "@/components/announcement-detail"
import { ProposalsList } from "@/components/proposals-list"
import { CreateProposalForm } from "@/components/create-proposal-form"

interface AnnouncementPageProps {
  params: {
    id: string
  }
}

export default function AnnouncementPage({ params }: AnnouncementPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Carregando anúncio...</div>}>
          <AnnouncementDetail id={params.id} />
        </Suspense>

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Propostas Recebidas</h2>
            <Suspense fallback={<div>Carregando propostas...</div>}>
              <ProposalsList announcementId={params.id} />
            </Suspense>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Enviar Proposta</h2>
            <CreateProposalForm announcementId={params.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
