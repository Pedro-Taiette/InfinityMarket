import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, Share2, MoreHorizontal } from "lucide-react"

export function ProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <Avatar className="h-20 w-20 mr-6 border-4 border-white/20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Jhon Sina" />
              <AvatarFallback className="bg-white/20 text-white text-2xl">JS</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold">Jhon Sina</h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-blue-100">9 anúncios • 387 propostas</span>
                <div className="flex items-center">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                  <span className="ml-2 text-blue-100">4.9★</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-3">
                <Badge className="bg-white/20 text-white">Verificado</Badge>
                <Badge className="bg-white/20 text-white">Premium</Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="text-white border-white hover:bg-blue-700">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-blue-700">
              <Settings className="h-4 w-4 mr-2" />
              Configurações
            </Button>
            <Button variant="outline" size="icon" className="text-white border-white hover:bg-blue-700">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
