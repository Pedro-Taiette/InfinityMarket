"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Senhas não coincidem")
      return
    }
    // Implementar lógica de registro
    console.log("Register:", { email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Criar Conta</CardTitle>
            <CardDescription>
              Crie sua Conta!
              <br />
              Comece a publicar intenções de compra agora!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Crie uma senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">Necessário ter no mínimo 6 caracteres.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Criar Conta →
              </Button>
            </form>

            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>

            <div className="text-center text-sm text-gray-600">© 2025 InfinityMarket</div>
          </CardContent>
        </Card>

        <div className="hidden lg:block">
          <div className="relative w-full h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20"></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white">
                <div className="w-32 h-32 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9H21ZM19 21H5V3H13V9H19V21Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Marketplace Invertido</h3>
                <p className="text-blue-100">Publique suas necessidades e receba propostas das melhores empresas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
