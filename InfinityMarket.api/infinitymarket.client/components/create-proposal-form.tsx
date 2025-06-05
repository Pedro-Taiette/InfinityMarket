"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreateProposalFormProps {
  announcementId: string
}

export function CreateProposalForm({ announcementId }: CreateProposalFormProps) {
  const [formData, setFormData] = useState({
    description: "",
    unitPrice: "",
    totalPrice: "",
    deliveryDays: "",
    paymentConditions: "",
    additionalInfo: "",
    companyId: 1, // Assumindo um ID padrão
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log("Dados da proposta:", {
        ...formData,
        unitPrice: Number.parseFloat(formData.unitPrice),
        totalPrice: Number.parseFloat(formData.totalPrice),
        deliveryDays: Number.parseInt(formData.deliveryDays),
        purchaseAnnouncementId: Number.parseInt(announcementId),
      })

      await new Promise((resolve) => setTimeout(resolve, 1000))

      alert("Proposta enviada com sucesso!")
      setFormData({
        description: "",
        unitPrice: "",
        totalPrice: "",
        deliveryDays: "",
        paymentConditions: "",
        additionalInfo: "",
        companyId: 1,
      })
    } catch (error) {
      console.error("Erro ao enviar proposta:", error)
      alert("Erro ao enviar proposta")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Proposta</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Descrição da Proposta</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva sua proposta detalhadamente..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unitPrice">Preço Unitário (R$)</Label>
              <Input
                id="unitPrice"
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                placeholder="450.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalPrice">Preço Total (R$)</Label>
              <Input
                id="totalPrice"
                type="number"
                step="0.01"
                value={formData.totalPrice}
                onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
                placeholder="2250.00"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryDays">Prazo de Entrega (dias)</Label>
            <Input
              id="deliveryDays"
              type="number"
              value={formData.deliveryDays}
              onChange={(e) => setFormData({ ...formData, deliveryDays: e.target.value })}
              placeholder="7"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentConditions">Condições de Pagamento</Label>
            <Input
              id="paymentConditions"
              value={formData.paymentConditions}
              onChange={(e) => setFormData({ ...formData, paymentConditions: e.target.value })}
              placeholder="Ex: 30 dias após entrega"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Informações Adicionais</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              placeholder="Garantia, assistência técnica, etc..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            Enviar Proposta
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
