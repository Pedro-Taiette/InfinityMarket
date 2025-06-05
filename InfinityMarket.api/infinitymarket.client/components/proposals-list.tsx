"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, DollarSign, TruckIcon as TruckDelivery, FileText } from "lucide-react"

interface Proposal {
  id: number
  description: string
  unitPrice: number
  totalPrice: number
  deliveryDays: number
  paymentConditions: string
  additionalInfo: string
  createdAt: string
  companyName: string
  companyEmail: string
  companyPhone: string
}

interface ProposalsListProps {
  announcementId?: string
  companyId?: string
}

export function ProposalsList({ announcementId, companyId }: ProposalsListProps) {
  const [proposals, setProposals] = useState<Proposal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProposals()
  }, [announcementId, companyId])

  const fetchProposals = async () => {
    try {
      setLoading(true)
      // Simulando dados para demonstração
      const mockData: Proposal[] = [
        {
          id: 1,
          description: "Furadeiras de impacto profissionais com garantia de 2 anos e assistência técnica.",
          unitPrice: 450.0,
          totalPrice: 2250.0,
          deliveryDays: 7,
          paymentConditions: "30 dias após entrega",
          additionalInfo: "Incluindo maleta, brocas e manual em português",
          createdAt: "2025-06-02T10:30:00",
          companyName: "Ferramentas Express",
          companyEmail: "contato@ferramentasexpress.com.br",
          companyPhone: "(11) 3456-7890",
        },
        {
          id: 2,
          description: "Furadeiras de impacto linha profissional, motor brushless, 220V.",
          unitPrice: 420.0,
          totalPrice: 2100.0,
          deliveryDays: 10,
          paymentConditions: "À vista com 5% de desconto ou em 3x sem juros",
          additionalInfo: "Garantia estendida disponível",
          createdAt: "2025-06-03T14:15:00",
          companyName: "FerraPro Distribuidora",
          companyEmail: "vendas@ferrapro.com.br",
          companyPhone: "(11) 2345-6789",
        },
        {
          id: 3,
          description: "Furadeiras de impacto profissionais importadas, alta durabilidade.",
          unitPrice: 480.0,
          totalPrice: 2400.0,
          deliveryDays: 5,
          paymentConditions: "Em até 2x sem juros",
          additionalInfo: "Frete grátis para todo o Brasil",
          createdAt: "2025-06-04T09:45:00",
          companyName: "Mega Tools",
          companyEmail: "contato@megatools.com.br",
          companyPhone: "(11) 9876-5432",
        },
      ]

      setProposals(mockData)
    } catch (error) {
      console.error("Erro ao buscar propostas:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full mr-4"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback>{proposal.companyName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{proposal.companyName}</h3>
                  <p className="text-sm text-gray-500">{formatDate(proposal.createdAt)}</p>
                </div>
              </div>
              <Badge className="bg-blue-500">Nova</Badge>
            </div>

            <p className="text-gray-700 mb-4">{proposal.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Valor Unitário</p>
                  <p className="font-semibold">{formatCurrency(proposal.unitPrice)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Valor Total</p>
                  <p className="font-semibold">{formatCurrency(proposal.totalPrice)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <TruckDelivery className="h-5 w-5 text-gray-500 mr-2" />
                <div>
                  <p className="text-xs text-gray-500">Prazo de Entrega</p>
                  <p className="font-semibold">{proposal.deliveryDays} dias</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex items-start mb-2">
                <Clock className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Condições de Pagamento</p>
                  <p className="text-sm">{proposal.paymentConditions}</p>
                </div>
              </div>
              {proposal.additionalInfo && (
                <div className="flex items-start">
                  <FileText className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-500">Informações Adicionais</p>
                    <p className="text-sm">{proposal.additionalInfo}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-4 space-x-3">
              <Button variant="outline" size="sm">
                Ver Detalhes
              </Button>
              <Button size="sm">Aceitar Proposta</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
