"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Phone, MapPin, Users, FileText } from "lucide-react"
import Link from "next/link"

interface Company {
  id: number
  name: string
  cnpj: string
  description: string
  email: string
  phone: string
  address: string
  isActive: boolean
  createdAt: string
}

export function CompaniesList() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCompanies()
  }, [])

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      // Simulando dados para demonstração
      const mockData: Company[] = [
        {
          id: 1,
          name: "Ferramentas Express",
          cnpj: "12.345.678/0001-90",
          description: "Fornecedor especializado em ferramentas profissionais e equipamentos para construção civil.",
          email: "contato@ferramentasexpress.com.br",
          phone: "(11) 3456-7890",
          address: "Av. Paulista, 1000, São Paulo - SP",
          isActive: true,
          createdAt: "2025-01-15T10:30:00",
        },
        {
          id: 2,
          name: "FerraPro Distribuidora",
          cnpj: "98.765.432/0001-10",
          description: "Distribuidora de ferramentas e equipamentos industriais com mais de 20 anos de experiência.",
          email: "vendas@ferrapro.com.br",
          phone: "(11) 2345-6789",
          address: "Rua das Indústrias, 500, São Bernardo - SP",
          isActive: true,
          createdAt: "2025-02-20T14:15:00",
        },
        {
          id: 3,
          name: "Mega Tools",
          cnpj: "11.222.333/0001-44",
          description: "Importadora e distribuidora de ferramentas de alta qualidade para profissionais.",
          email: "contato@megatools.com.br",
          phone: "(11) 9876-5432",
          address: "Av. Industrial, 2000, Guarulhos - SP",
          isActive: true,
          createdAt: "2025-03-10T09:45:00",
        },
        {
          id: 4,
          name: "Construção & Cia",
          cnpj: "55.666.777/0001-88",
          description: "Fornecedor completo para construção civil, ferramentas e materiais de qualidade.",
          email: "vendas@construcaoecia.com.br",
          phone: "(11) 1234-5678",
          address: "Rua dos Construtores, 300, Osasco - SP",
          isActive: false,
          createdAt: "2025-04-05T16:20:00",
        },
      ]

      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCompanies(mockData)
    } catch (error) {
      console.error("Erro ao buscar empresas:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <Card key={company.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    <Building2 className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.cnpj}</p>
                </div>
              </div>
              <Badge variant={company.isActive ? "success" : "secondary"} className="text-xs">
                {company.isActive ? "Ativa" : "Inativa"}
              </Badge>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{company.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600 truncate">{company.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">{company.phone}</span>
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600 truncate">{company.address}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>12 funcionários</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                <span>24 anúncios</span>
              </div>
            </div>

            <Link href={`/companies/${company.id}`}>
              <Button className="w-full" size="sm">
                Ver Detalhes
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
