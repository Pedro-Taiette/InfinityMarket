import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

export function AnnouncementFilters() {
  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Categoria</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Todas as categorias" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="ferramentas">Ferramentas</SelectItem>
              <SelectItem value="eletronicos">Eletrônicos</SelectItem>
              <SelectItem value="moveis">Móveis</SelectItem>
              <SelectItem value="utilitarios">Utilitários</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Status</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Todos os status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="open">Aberto</SelectItem>
              <SelectItem value="closed">Fechado</SelectItem>
              <SelectItem value="cancelled">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Prazo</Label>
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
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Quantidade</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input type="number" placeholder="Min" className="text-sm" />
            <Input type="number" placeholder="Max" className="text-sm" />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Localização</Label>
          <Input placeholder="Cidade ou Estado" className="text-sm" />
        </div>

        <Button className="w-full">Aplicar Filtros</Button>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Tags Populares</Label>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-300">
              Ferramentas
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-300">
              Elétrico
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-300">
              Profissional
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-300">
              Construção
            </Badge>
            <Badge variant="secondary" className="cursor-pointer hover:bg-gray-300">
              Atacado
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
