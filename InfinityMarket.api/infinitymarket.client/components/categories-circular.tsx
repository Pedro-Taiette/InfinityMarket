import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Ferramentas",
    image: "/placeholder.svg?height=80&width=80",
    href: "/announcements?category=ferramentas",
    position: "top-left",
    bgColor: "bg-blue-200/60",
    size: "large",
  },
  {
    name: "Utilitários",
    image: "/placeholder.svg?height=60&width=60",
    href: "/announcements?category=utilitarios",
    position: "middle-left",
    bgColor: "bg-blue-800",
    textColor: "text-white",
    size: "medium",
  },
  {
    name: "Eletrônicos",
    image: "/placeholder.svg?height=80&width=80",
    href: "/announcements?category=eletronicos",
    position: "bottom-left",
    bgColor: "bg-blue-200/60",
    size: "large",
  },
  {
    name: "Móveis",
    image: "/placeholder.svg?height=80&width=80",
    href: "/announcements?category=moveis",
    position: "top-right",
    bgColor: "bg-blue-200/60",
    size: "large",
  },
  {
    name: "Entretenimento",
    image: "/placeholder.svg?height=60&width=60",
    href: "/announcements?category=entretenimento",
    position: "middle-right",
    bgColor: "bg-blue-800",
    textColor: "text-white",
    size: "medium",
  },
  {
    name: "Brinquedos",
    image: "/placeholder.svg?height=80&width=80",
    href: "/announcements?category=brinquedos",
    position: "bottom-right",
    bgColor: "bg-blue-200/60",
    size: "large",
  },
]

const getPositionClasses = (position: string, size: string) => {
  const sizeClasses = size === "large" ? "w-56 h-80" : "w-44 h-64"

  switch (position) {
    case "top-left":
      return `absolute top-0 left-16 ${sizeClasses}`
    case "middle-left":
      return `absolute top-1/2 left-[-60px] transform -translate-y-1/2 ${sizeClasses}`
    case "bottom-left":
      return `absolute bottom-0 left-16 ${sizeClasses}`
    case "top-right":
      return `absolute top-0 right-16 ${sizeClasses}`
    case "middle-right":
      return `absolute top-1/2 right-[-60px] transform -translate-y-1/2 ${sizeClasses}`
    case "bottom-right":
      return `absolute bottom-0 right-16 ${sizeClasses}`
    default:
      return sizeClasses
  }
}

export function CategoriesCircular() {
  return (
    <div className="relative w-full py-40 overflow-hidden">
      {/* Container principal */}
      <div className="relative w-full max-w-5xl mx-auto h-[700px]">
        {/* Categorias posicionadas */}
        {categories.map((category) => (
          <div key={category.name} className={getPositionClasses(category.position, category.size)}>
            <Link href={category.href}>
              <div
                className={`${category.bgColor} ${category.textColor || "text-gray-800"} rounded-[3rem] p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full flex flex-col items-center justify-between relative overflow-hidden`}
              >
                {/* Imagem da categoria no topo */}
                <div className="w-20 h-20 rounded-full overflow-hidden bg-white/30 flex items-center justify-center mb-4">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-full"
                  />
                </div>

                {/* Espaço flexível */}
                <div className="flex-1"></div>

                {/* Nome da categoria */}
                <h3 className="text-xl font-semibold text-center mb-6">{category.name}</h3>

                {/* Botão acessar */}
                <Button
                  variant="ghost"
                  className={`${
                    category.textColor === "text-white"
                      ? "text-white/80 hover:text-white hover:bg-white/10 border border-white/30"
                      : "text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-blue-200"
                  } font-medium px-6 py-2 rounded-full`}
                >
                  Acessar
                </Button>
              </div>
            </Link>
          </div>
        ))}

        {/* Centro - Logo e botão explorar */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="flex flex-col items-center">
            {/* Ícone do carrinho com infinito */}
            <div className="w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center mb-6 border-4 border-blue-100">
              <div className="relative">
                <ShoppingCart className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
                {/* Símbolo infinito */}
                <div className="absolute -top-2 -right-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                    <path
                      d="M18.178 8C19.186 8 20 8.813 20 9.822c0 1.008-.814 1.822-1.822 1.822-.47 0-.92-.178-1.262-.5L15.5 9.822c-.342.322-.792.5-1.262.5-.47 0-.92-.178-1.262-.5L11.56 8.5c-.342.322-.792.5-1.262.5S9.378 8.822 9.378 8.5c0-.322.15-.622.378-.822L11.178 6.5c.342-.322.792-.5 1.262-.5s.92.178 1.262.5l1.416 1.322c.342-.322.792-.5 1.262-.5.47 0 .92.178 1.262.5L18.178 8z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Linhas decorativas */}
            <div className="flex items-center mb-4 space-x-2">
              <div className="w-8 h-0.5 bg-pink-400"></div>
              <div className="w-8 h-0.5 bg-yellow-400"></div>
              <div className="w-8 h-0.5 bg-blue-400"></div>
            </div>

            {/* Botão explorar */}
            <Link href="/announcements">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-full shadow-lg text-lg font-medium">
                Explorar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Título das últimas publicações */}
      <div className="text-center mt-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Veja as Últimas Publicações</h2>
        <div className="w-8 h-8 mx-auto text-gray-400">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </div>
      </div>
    </div>
  )
}
