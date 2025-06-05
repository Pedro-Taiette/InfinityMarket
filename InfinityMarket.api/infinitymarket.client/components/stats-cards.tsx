import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, MessageSquare, Eye, Clock } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Anúncios Ativos",
      value: "9",
      change: "+2 esta semana",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Propostas Recebidas",
      value: "387",
      change: "+45 hoje",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Visualizações",
      value: "1.2k",
      change: "+12% vs mês passado",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Tempo Médio Resposta",
      value: "2.4h",
      change: "-30min vs média",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
