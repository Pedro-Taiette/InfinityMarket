"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MessageSquare, Eye, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UserAnnouncement {
  id: number
  title: string
  description: string
  quantity: number
  unit: string
  deadlineDate: string
  status: number
  createdAt: string
  proposalCount: number
  viewCount: number
}

export function UserAnnouncementsList() {
  const [announcements, setAnnouncements] = useState<UserAnnouncement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserAnnouncements()
  }, [])

  const fetchUserAnnouncements = async () => {
    try {
      setLoading(true)
      // Simulando dados do usuário logado
      const mockData: UserAnnouncement[] = [
        {
          id: 1,
          title: "Furadeira de Impacto Profissional",
          description: "Preciso de 5 furadeiras de impacto para uso profissional em construção civil.",
          quantity: 5,
          unit: "unidades",
          deadlineDate: "2025-07-15T00:00:00",
          status: 1,
          createdAt: "2025-06-01T10:30:00",
          proposalCount: 8,
          viewCount: 124,
        },
        {
          id: 2,
          title: "Parafusadeira a Bateria 20V",
          description: "Busco 10 parafusadeiras a bateria 20V para equipe de instalação.",
          quantity: 10,
          unit: "unidades",
          deadlineDate: "2025-07-20T00:00:00",
          status: 1,
          createdAt: "2025-06-02T14:15:00",
          proposalCount: 12,
          viewCount: 89,
        },
        {
          id: 3,
          title: "Serra Circular de Bancada",
          description: "Necessito de 2 serras circulares de bancada para marcenaria.",
          quantity: 2,
          unit: "unidades",
          deadlineDate: "2025-06-30T00:00:00",
          status: 2,
          createdAt: "2025-06-03T09:45:00",
          proposalCount: 6,
          viewCount: 67,
        },
        {
          id: 4,
          title: "Compressor de Ar 50L",
          description: "Procuro compressor de ar 50L para oficina mecânica.",
          quantity: 1,
          unit: "unidade",
          deadlineDate: "2025-07-10T00:00:00",
          status: 1,
          createdAt: "2025-05-28T16:20:00",
          proposalCount: 15,
          viewCount: 203,
        },
        {
          id: 5,
          title: "Jogo de Chaves de Fenda Precisão",
          description: "Busco 15 jogos de chaves de fenda de precisão para manutenção eletrônica.",
          quantity: 15,
          unit: "kits",
          deadlineDate: "2025-07-05T00:00:00",
          status: 1,
          createdAt: "2025-06-04T11:10:00",
          proposalCount: 4,
          viewCount: 45,
        },
        {
          id: 6,
          title: "Martelo de Unha 500g",
          description: "Preciso de 20 martelos de unha 500g para equipe de carpintaria.",
          quantity: 20,
          unit: "unidades",
          deadlineDate: "2025-07-25T00:00:00",
          status: 1,
          createdAt: "2025-06-05T08:20:00",
          proposalCount: 9,
          viewCount: 78,
        },
      ]

      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnnouncements(mockData)
    } catch (error) {
      console.error("Erro ao carregar anúncios do usuário:", error)
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
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
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
    <div className="grid md:grid-cols-2 gap-6">
      {announcements.map((announcement) => (
        <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{announcement.title}</h3>
                <p className="text-sm text-gray-500 mt-1">Criado em {formatDate(announcement.createdAt)}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(announcement.status)}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm line-clamp-2">{announcement.description}</p>

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
                  <span>{announcement.proposalCount}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{announcement.viewCount}</span>
                </div>
              </div>
              <Link href={`/announcements/${announcement.id}`}>
                <Button size="sm" variant="outline">
                  Ver Detalhes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
