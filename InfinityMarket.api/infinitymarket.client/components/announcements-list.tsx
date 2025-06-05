"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, MessageSquare } from "lucide-react"
import Link from "next/link"

interface Announcement {
  id: number
  title: string
  description: string
  quantity: number
  unit: string
  deadlineDate: string
  status: number
  createdAt: string
  companyName: string
  employeeName: string
  proposalCount: number
}

export function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      // Simulando dados para demonstração - removendo chamada para API inexistente
      const mockData: Announcement[] = [
        {
          id: 1,
          title: "Furadeira de Impacto Profissional",
          description:
            "Preciso de 5 furadeiras de impacto para uso profissional em construção civil. Deve ter potência mínima de 800W e vir com maleta.",
          quantity: 5,
          unit: "unidades",
          deadlineDate: "2025-07-15T00:00:00",
          status: 1,
          createdAt: "2025-06-01T10:30:00",
          companyName: "Construtora Silva",
          employeeName: "João Silva",
          proposalCount: 3,
        },
        {
          id: 2,
          title: "Parafusadeira a Bateria 20V",
          description:
            "Busco 10 parafusadeiras a bateria 20V para equipe de instalação. Preferência por marcas conhecidas com garantia.",
          quantity: 10,
          unit: "unidades",
          deadlineDate: "2025-07-20T00:00:00",
          status: 1,
          createdAt: "2025-06-02T14:15:00",
          companyName: "Instalações Rápidas",
          employeeName: "Maria Santos",
          proposalCount: 5,
        },
        {
          id: 3,
          title: "Serra Circular de Bancada",
          description:
            "Necessito de 2 serras circulares de bancada para marcenaria. Deve cortar madeira até 8cm de espessura.",
          quantity: 2,
          unit: "unidades",
          deadlineDate: "2025-06-30T00:00:00",
          status: 1,
          createdAt: "2025-06-03T09:45:00",
          companyName: "Móveis Personalizados",
          employeeName: "Pedro Oliveira",
          proposalCount: 2,
        },
        {
          id: 4,
          title: "Compressor de Ar 50L",
          description: "Procuro compressor de ar 50L para oficina mecânica. Deve ter pressão mínima de 8 bar.",
          quantity: 1,
          unit: "unidade",
          deadlineDate: "2025-07-10T00:00:00",
          status: 2,
          createdAt: "2025-05-28T16:20:00",
          companyName: "Auto Center Express",
          employeeName: "Carlos Mendes",
          proposalCount: 4,
        },
        {
          id: 5,
          title: "Jogo de Chaves de Fenda Precisão",
          description:
            "Busco 15 jogos de chaves de fenda de precisão para manutenção eletrônica. Deve incluir chaves Phillips e fenda comum.",
          quantity: 15,
          unit: "kits",
          deadlineDate: "2025-07-05T00:00:00",
          status: 1,
          createdAt: "2025-06-04T11:10:00",
          companyName: "Eletrônica Técnica",
          employeeName: "Ana Souza",
          proposalCount: 1,
        },
        {
          id: 6,
          title: "Martelo de Unha 500g",
          description: "Preciso de 20 martelos de unha 500g para equipe de carpintaria. Cabo de madeira ou fibra.",
          quantity: 20,
          unit: "unidades",
          deadlineDate: "2025-07-25T00:00:00",
          status: 1,
          createdAt: "2025-06-05T08:20:00",
          companyName: "Carpintaria Moderna",
          employeeName: "Roberto Lima",
          proposalCount: 6,
        },
      ]

      // Simulando delay de rede
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setAnnouncements(mockData)
    } catch (error) {
      console.error("Erro ao carregar anúncios:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge className="bg-green-500">Aberto</Badge>
      case 2:
        return <Badge className="bg-gray-500">Fechado</Badge>
      case 3:
        return <Badge className="bg-red-500">Cancelado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR")
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{announcement.title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">{announcement.companyName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{announcement.companyName}</span>
                </div>
              </div>
              {getStatusBadge(announcement.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm line-clamp-3">{announcement.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span className="font-medium">{announcement.quantity}</span>
                <span>{announcement.unit || "unidades"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDate(announcement.deadlineDate)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{announcement.proposalCount} propostas</span>
                </div>
              </div>
              <Link href={`/announcements/${announcement.id}`}>
                <Button size="sm" variant="outline">
                  Ver Mais
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
