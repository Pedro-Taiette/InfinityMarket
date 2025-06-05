export function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Infinity Market</h3>
            <p className="text-blue-200 text-sm">O marketplace invertido que conecta necessidades com soluções.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-blue-200 hover:text-white">
                  Sobre Nós
                </a>
              </li>
              <li>
                <a href="/help" className="text-blue-200 hover:text-white">
                  Ajuda
                </a>
              </li>
              <li>
                <a href="/terms" className="text-blue-200 hover:text-white">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-blue-200 hover:text-white">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>📧 contato@infinitymarket.com</li>
              <li>📱 (11) 9999-9999</li>
              <li>📍 São Paulo, SP</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white">
                Facebook
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-200">
          <p>© 2025 InfinityMarket. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
