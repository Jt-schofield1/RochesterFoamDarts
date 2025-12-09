"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eraser, Check } from "lucide-react"

interface SignaturePadProps {
  onSignatureChange: (signature: string) => void
}

export default function SignaturePad({ onSignatureChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSignature, setHasSignature] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set up high DPI canvas
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Style settings
    ctx.strokeStyle = "#FFFFFF"
    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // Fill background
    ctx.fillStyle = "#1B1B1B"
    ctx.fillRect(0, 0, rect.width, rect.height)
  }, [])

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)
    const { x, y } = getCoordinates(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx) return

    const { x, y } = getCoordinates(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    saveSignature()
  }

  const saveSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const signature = canvas.toDataURL("image/png")
    onSignatureChange(signature)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    ctx.fillStyle = "#1B1B1B"
    ctx.fillRect(0, 0, rect.width * dpr, rect.height * dpr)
    
    setHasSignature(false)
    onSignatureChange("")
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-40 rounded-lg border-2 border-dashed border-border cursor-crosshair signature-canvas bg-dart-charcoal"
          style={{ touchAction: "none" }}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-muted-foreground text-sm">Sign here</p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={clearSignature}
          className="gap-2"
        >
          <Eraser className="w-4 h-4" />
          Clear
        </Button>
        {hasSignature && (
          <span className="text-green-400 text-sm flex items-center gap-1">
            <Check className="w-4 h-4" />
            Signature captured
          </span>
        )}
      </div>
    </div>
  )
}

