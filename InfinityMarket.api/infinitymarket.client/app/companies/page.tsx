import { Suspense } from "react"
import { CompaniesList } from "@/components/companies-list"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Empresas</h1>
            <p className="text-gray-600 mt-2">Gerencie empresas cadastradas</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Empresa
          </Button>
        </div>

        <Suspense fallback={<div>Carregando empresas...</div>}>
          <CompaniesList />
        </Suspense>
      </div>
    </div>
  )
}
