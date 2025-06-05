"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingBag, MessageSquare } from "lucide-react"

export function CreateAnnouncementForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    unit: "",
    deadlineDate: "",
    employeeId: 1, // Assumindo um ID padrão
  })

  const [activeTab, setActiveTab] = useState<"sell" | "buy">("buy")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulando criação de anúncio - removendo chamada para API inexistente
      console.log("Dados do anúncio:", {
        ...formData,
        quantity: Number.parseInt(formData.quantity),
        deadlineDate: new Date(formData.deadlineDate).toISOString(),
      })

      // Simulando delay de processamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Anúncio criado com sucesso!")
      setFormData({
        title: "",
        description: "",
        quantity: "",
        unit: "",
        deadlineDate: "",
        employeeId: 1,
      })
    } catch (error) {
      console.error("Erro ao criar anúncio:", error)
      alert("Erro ao criar anúncio")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comece adicionando fotos sobre seu produto/serviço!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upload Area */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">Clique para adicionar fotos</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={activeTab === "sell" ? "default" : "outline"}
            onClick={() => setActiveTab("sell")}
            className="flex items-center justify-center space-x-2 h-12"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Quero Vender</span>
          </Button>
          <Button
            type="button"
            variant={activeTab === "buy" ? "default" : "outline"}
            onClick={() => setActiveTab("buy")}
            className="flex items-center justify-center space-x-2 h-12"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Quero Solicitar</span>
          </Button>
        </div>

        {activeTab === "buy" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título do Anúncio</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Preciso de 100 parafusos M6"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva detalhadamente o que você precisa..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="100"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unidade</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unidades">Unidades</SelectItem>
                    <SelectItem value="kg">Quilogramas</SelectItem>
                    <SelectItem value="metros">Metros</SelectItem>
                    <SelectItem value="litros">Litros</SelectItem>
                    <SelectItem value="caixas">Caixas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Prazo Limite</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadlineDate}
                onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Publicar Anúncio
            </Button>
          </form>
        )}

        {activeTab === "sell" && (
          <div className="text-center py-8">
            <p className="text-gray-500">Funcionalidade de venda em desenvolvimento</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
