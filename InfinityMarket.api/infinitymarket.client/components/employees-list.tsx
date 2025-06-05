"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Briefcase, MoreVertical, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  position: string
  isActive: boolean
  createdAt: string
  companyId: number
  companyName: string
}

interface EmployeesListProps {
  companyId?: string
}

export function EmployeesList({ companyId }: EmployeesListProps) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployees()
  }, [companyId])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      // Simulando dados para demonstração
      const mockData: Employee[] = [
        {
          id: 1,
          name: "João Silva",
          email: "joao.silva@ferramentasexpress.com.br",
          phone: "(11) 98765-4321",
          position: "Gerente de Compras",
          isActive: true,
          createdAt: "2025-01-15T10:30:00",
          companyId: 1,
          companyName: "Ferramentas Express",
        },
        {
          id: 2,
          name: "Maria Santos",
          email: "maria.santos@ferramentasexpress.com.br",
          phone: "(11) 98765-1234",
          position: "Analista de Vendas",
          isActive: true,
          createdAt: "2025-02-20T14:15:00",
          companyId: 1,
          companyName: "Ferramentas Express",
        },
        {
          id: 3,
          name: "Pedro Oliveira",
          email: "pedro.oliveira@ferramentasexpress.com.br",
          phone: "(11) 98765-5678",
          position: "Especialista em Ferramentas",
          isActive: true,
          createdAt: "2025-03-10T09:45:00",
          companyId: 1,
          companyName: "Ferramentas Express",
        },
      ]

      setEmployees(mockData)
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
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
    <div className="grid md:grid-cols-2 gap-6">
      {employees.map((employee) => (
        <Card key={employee.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{employee.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="h-3.5 w-3.5 mr-1" />
                    <span>{employee.position}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center text-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remover
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">{employee.email}</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-gray-600">{employee.phone}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Badge variant={employee.isActive ? "success" : "secondary"} className="text-xs">
                {employee.isActive ? "Ativo" : "Inativo"}
              </Badge>
              <Button size="sm" variant="outline">
                Ver Detalhes
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
