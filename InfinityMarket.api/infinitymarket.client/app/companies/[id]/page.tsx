import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AnnouncementsList } from "@/components/announcements-list"
import { ProposalsList } from "@/components/proposals-list"
import { EmployeesList } from "@/components/employees-list"
import { Building2, Mail, Phone, MapPin, Edit, Users, FileText, MessageSquare } from "lucide-react"

interface CompanyPageProps {
  params: {
    id: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Ferramentas Express</h1>
                <p className="text-blue-100">Fornecedor de ferramentas profissionais</p>
              </div>
            </div>
            <Button variant="outline" className="text-white border-white hover:bg-blue-700">
              <Edit className="h-4 w-4 mr-2" />
              Editar Empresa
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Informações da Empresa */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Building2 className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">CNPJ</p>
                    <p className="text-gray-600">12.345.678/0001-90</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">contato@ferramentasexpress.com.br</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Telefone</p>
                    <p className="text-gray-600">(11) 3456-7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Endereço</p>
                    <p className="text-gray-600">Av. Paulista, 1000, São Paulo - SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">24</p>
                    <p className="text-sm text-gray-600">Anúncios</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">87</p>
                    <p className="text-sm text-gray-600">Propostas</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-sm text-gray-600">Funcionários</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <p className="text-2xl font-bold text-orange-600">4.8</p>
                    <p className="text-sm text-gray-600">Avaliação</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Ferramentas</Badge>
                  <Badge variant="secondary">Elétricos</Badge>
                  <Badge variant="secondary">Profissional</Badge>
                  <Badge variant="secondary">Construção</Badge>
                  <Badge variant="secondary">Atacado</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="md:col-span-2">
            <Tabs defaultValue="announcements">
              <TabsList className="mb-6">
                <TabsTrigger value="announcements" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Anúncios
                </TabsTrigger>
                <TabsTrigger value="proposals" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Propostas
                </TabsTrigger>
                <TabsTrigger value="employees" className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Funcionários
                </TabsTrigger>
              </TabsList>

              <TabsContent value="announcements">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Anúncios da Empresa</h2>
                <Suspense fallback={<div>Carregando anúncios...</div>}>
                  <AnnouncementsList />
                </Suspense>
              </TabsContent>

              <TabsContent value="proposals">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Propostas Enviadas</h2>
                <Suspense fallback={<div>Carregando propostas...</div>}>
                  <ProposalsList companyId={params.id} />
                </Suspense>
              </TabsContent>

              <TabsContent value="employees">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Funcionários</h2>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Adicionar Funcionário
                  </Button>
                </div>
                <Suspense fallback={<div>Carregando funcionários...</div>}>
                  <EmployeesList companyId={params.id} />
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
