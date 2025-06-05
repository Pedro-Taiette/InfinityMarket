"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AnnouncementCard } from "@/components/announcement-card"

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

export default function AnnouncementsSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    filterAnnouncements()
  }, [searchTerm, selectedCategory, selectedStatus, announcements])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      // Simulando dados para demonstração
      const mockData: Announcement[] = [
        {
          id: 1,
          title: "Furadeira de Impacto Profissional",
          description: "Preciso de 5 furadeiras de impacto para uso profissional em construção civil.",
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
          description: "Busco 10 parafusadeiras a bateria 20V para equipe de instalação.",
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
          description: "Necessito de 2 serras circulares de bancada para marcenaria.",
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
          description: "Procuro compressor de ar 50L para oficina mecânica.",
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
          description: "Busco 15 jogos de chaves de fenda de precisão para manutenção eletrônica.",
          quantity: 15,
          unit: "kits",
          deadlineDate: "2025-07-05T00:00:00",
          status: 1,
          createdAt: "2025-06-04T11:10:00",
          companyName: "Eletrônica Técnica",
          employeeName: "Ana Souza",
          proposalCount: 1,
        },
      ]

      setAnnouncements(mockData)
      setFilteredAnnouncements(mockData)
    } catch (error) {
      console.error("Erro ao buscar anúncios:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAnnouncements = () => {
    let filtered = [...announcements]

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(
        (announcement) =>
          announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          announcement.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por categoria (simulado)
    if (selectedCategory !== "all") {
      // Na implementação real, você teria uma propriedade de categoria
      // Aqui estamos apenas simulando para demonstração
      filtered = filtered.filter((_, index) => index % 2 === (selectedCategory === "ferramentas" ? 0 : 1))
    }

    // Filtrar por status
    if (selectedStatus !== "all") {
      const statusNumber = Number.parseInt(selectedStatus)
      filtered = filtered.filter((announcement) => announcement.status === statusNumber)
    }

    setFilteredAnnouncements(filtered)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <Link href="/dashboard" className="mr-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Ferramentas</h1>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Buscar anúncios..."
              className="pl-10 pr-4 py-6 w-full bg-white text-gray-900 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtros */}
          <div className="md:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filtros</h3>
                  <Filter className="h-4 w-4 text-gray-500" />
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Categoria</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        <SelectItem value="ferramentas">Ferramentas</SelectItem>
                        <SelectItem value="eletricos">Elétricos</SelectItem>
                        <SelectItem value="manuais">Manuais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="1">Aberto</SelectItem>
                        <SelectItem value="2">Fechado</SelectItem>
                        <SelectItem value="3">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Prazo</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os prazos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os prazos</SelectItem>
                        <SelectItem value="7">Próximos 7 dias</SelectItem>
                        <SelectItem value="30">Próximos 30 dias</SelectItem>
                        <SelectItem value="90">Próximos 90 dias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Quantidade</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="Min" className="text-sm" />
                      <Input type="number" placeholder="Max" className="text-sm" />
                    </div>
                  </div>

                  <Button className="w-full">Aplicar Filtros</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Tags Populares</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Furadeira</Badge>
                  <Badge variant="secondary">Parafusadeira</Badge>
                  <Badge variant="secondary">Serra</Badge>
                  <Badge variant="secondary">Elétrica</Badge>
                  <Badge variant="secondary">Bateria</Badge>
                  <Badge variant="secondary">Profissional</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resultados */}
          <div className="flex-1">
            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="recent">Recentes</TabsTrigger>
                <TabsTrigger value="popular">Populares</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-600">{filteredAnnouncements.length} anúncios encontrados</p>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais recentes</SelectItem>
                  <SelectItem value="oldest">Mais antigos</SelectItem>
                  <SelectItem value="proposals">Mais propostas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredAnnouncements.map((announcement) => (
                  <AnnouncementCard key={announcement.id} announcement={announcement} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
