"use client"

import type React from "react"
import { Tag } from "lucide-react" // Import the Tag component

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Upload, FileText, ImageIcon, Calendar, Package } from "lucide-react"
import Link from "next/link"

export default function CreateAnnouncementPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    quantity: "",
    unit: "",
    deadlineDate: "",
    employeeId: 1, // Assumindo um ID padrão
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/PurchaseAnnouncements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number.parseInt(formData.quantity),
          deadlineDate: new Date(formData.deadlineDate).toISOString(),
        }),
      })

      if (response.ok) {
        alert("Anúncio criado com sucesso!")
        // Redirecionar para a página de anúncios
      }
    } catch (error) {
      console.error("Erro ao criar anúncio:", error)
      alert("Erro ao criar anúncio")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center">
          <Link href="/dashboard" className="mr-3">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Criar Anúncio</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Coluna da Esquerda - Formulário */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Anúncio</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                    <Label htmlFor="description">Descrição Detalhada</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descreva detalhadamente o que você precisa..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
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
                      <Select
                        value={formData.unit}
                        onValueChange={(value) => setFormData({ ...formData, unit: value })}
                      >
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

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (opcional)</Label>
                    <Input id="tags" placeholder="Ex: ferramentas, elétrico, profissional" />
                    <p className="text-xs text-gray-500">Separe as tags por vírgulas</p>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full">
                      Publicar Anúncio
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Coluna da Direita - Uploads e Dicas */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="h-5 w-5 mr-2" />
                  Adicionar Arquivos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="images">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="images" className="flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Imagens
                    </TabsTrigger>
                    <TabsTrigger value="documents" className="flex items-center justify-center">
                      <FileText className="h-4 w-4 mr-2" />
                      Documentos
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="images">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Upload className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-2">Arraste e solte imagens aqui</p>
                      <p className="text-xs text-gray-400 mb-4">Formatos suportados: JPG, PNG, GIF</p>
                      <Button variant="outline" size="sm">
                        Selecionar Arquivos
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-2">Arraste e solte documentos aqui</p>
                      <p className="text-xs text-gray-400 mb-4">Formatos suportados: PDF, DOC, XLS</p>
                      <Button variant="outline" size="sm">
                        Selecionar Arquivos
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dicas para um Bom Anúncio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Tag className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Seja específico</p>
                    <p className="text-sm text-gray-600">
                      Descreva detalhadamente o que você precisa, incluindo especificações técnicas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <ImageIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Adicione imagens</p>
                    <p className="text-sm text-gray-600">
                      Imagens ajudam os fornecedores a entender melhor sua necessidade.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Defina prazos realistas</p>
                    <p className="text-sm text-gray-600">
                      Prazos muito curtos podem reduzir o número de propostas recebidas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Informe a quantidade exata</p>
                    <p className="text-sm text-gray-600">
                      Quantidades precisas ajudam os fornecedores a calcular preços mais exatos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
