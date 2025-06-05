"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, MapPin, Package, Calendar, Eye, MessageSquare, Share2 } from "lucide-react"

interface AnnouncementDetailProps {
  id: string
}

interface AnnouncementDetail {
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
  viewCount: number
}

export function AnnouncementDetail({ id }: AnnouncementDetailProps) {
  const [announcement, setAnnouncement] = useState<AnnouncementDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnnouncementDetail()
  }, [id])

  const fetchAnnouncementDetail = async () => {
    try {
      setLoading(true)
      // Simulando dados para demonstração
      const mockData: AnnouncementDetail = {
        id: Number.parseInt(id),
        title: "Furadeira de Impacto Profissional",
        description: `Preciso de 5 furadeiras de impacto para uso profissional em construção civil. 
        
        Especificações necessárias:
        - Potência mínima de 800W
        - Velocidade variável
        - Mandril de 13mm
        - Deve vir com maleta
        - Garantia mínima de 1 ano
        
        As furadeiras serão utilizadas em obras de grande porte, então precisam ser resistentes e duráveis. Preferência por marcas conhecidas no mercado.
        
        Prazo de entrega: até 15 de julho de 2025
        Local de entrega: São Paulo - SP`,
        quantity: 5,
        unit: "unidades",
        deadlineDate: "2025-07-15T00:00:00",
        status: 1,
        createdAt: "2025-06-01T10:30:00",
        companyName: "Construtora Silva",
        employeeName: "João Silva",
        proposalCount: 8,
        viewCount: 124,
      }

      await new Promise((resolve) => setTimeout(resolve, 800))
      setAnnouncement(mockData)
    } catch (error) {
      console.error("Erro ao carregar detalhes do anúncio:", error)
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
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!announcement) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">Anúncio não encontrado</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl text-gray-900 mb-2">{announcement.title}</CardTitle>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarFallback className="text-xs">{announcement.companyName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{announcement.companyName}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Publicado em {formatDate(announcement.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusBadge(announcement.status)}
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-blue-600">{announcement.quantity}</p>
            <p className="text-sm text-gray-600">{announcement.unit}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-green-600">{formatDate(announcement.deadlineDate)}</p>
            <p className="text-sm text-gray-600">Prazo limite</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-purple-600">{announcement.proposalCount}</p>
            <p className="text-sm text-gray-600">Propostas</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg text-center">
            <Eye className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-lg font-bold text-orange-600">{announcement.viewCount}</p>
            <p className="text-sm text-gray-600">Visualizações</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Descrição</h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 whitespace-pre-line">{announcement.description}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Informações Adicionais</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Local de Entrega</p>
                <p className="text-gray-600">São Paulo - SP</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Prazo de Entrega</p>
                <p className="text-gray-600">Até {formatDate(announcement.deadlineDate)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
