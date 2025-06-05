import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Bell, Plus } from "lucide-react"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-16 w-16 mr-4 border-2 border-white/20">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
              <AvatarFallback className="bg-white/20 text-white text-xl">JS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Jhon Sina</h1>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-blue-100">9 anúncios • 387 propostas</span>
                <div className="flex items-center">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-blue-100">4.9★</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="text-white border-white hover:bg-blue-700">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
              <Badge className="ml-2 bg-red-500 text-white">3</Badge>
            </Button>
            <Link href="/announcements/create">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="h-4 w-4 mr-2" />
                Criar Anúncio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
