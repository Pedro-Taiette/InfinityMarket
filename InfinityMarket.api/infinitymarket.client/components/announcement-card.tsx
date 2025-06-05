import { Card, CardContent } from "@/components/ui/card"
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

interface AnnouncementCardProps {
  announcement: Announcement
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{announcement.title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">{announcement.companyName?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{announcement.companyName}</span>
            </div>
          </div>
          {getStatusBadge(announcement.status)}
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{announcement.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
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
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>{announcement.proposalCount} propostas</span>
          </div>
          <Link href={`/announcements/${announcement.id}`}>
            <Button size="sm" variant="outline">
              Ver Mais
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
