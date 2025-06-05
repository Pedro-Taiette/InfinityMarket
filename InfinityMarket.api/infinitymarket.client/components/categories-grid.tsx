import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Truck, Smartphone, Sofa, Gamepad2, Baby } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Ferramentas",
    icon: Wrench,
    count: 45,
    color: "bg-blue-500",
    href: "/announcements?category=ferramentas",
  },
  {
    name: "Utilitários",
    icon: Truck,
    count: 32,
    color: "bg-green-500",
    href: "/announcements?category=utilitarios",
  },
  {
    name: "Eletrônicos",
    icon: Smartphone,
    count: 67,
    color: "bg-purple-500",
    href: "/announcements?category=eletronicos",
  },
  {
    name: "Móveis",
    icon: Sofa,
    count: 28,
    color: "bg-orange-500",
    href: "/announcements?category=moveis",
  },
  {
    name: "Entretenimento",
    icon: Gamepad2,
    count: 19,
    color: "bg-red-500",
    href: "/announcements?category=entretenimento",
  },
  {
    name: "Brinquedos",
    icon: Baby,
    count: 15,
    color: "bg-pink-500",
    href: "/announcements?category=brinquedos",
  },
]

export function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link key={category.name} href={category.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardContent className="p-6 text-center">
                <div
                  className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {category.count} anúncios
                </Badge>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
