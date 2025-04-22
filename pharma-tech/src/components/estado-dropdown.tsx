"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface DropdownEstadoProps {
  onSelect?: (value: number) => void
}

export default function DropdownEstado({ onSelect }: DropdownEstadoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Opciones estáticas con valor 1 para Activo y 0 para Inactivo
  const estados = [
    { value: 1, label: "Activo" },
    { value: 0, label: "Inactivo" }
  ]

  // Filtrar por búsqueda
  const filteredEstados = estados.filter(e =>
    e.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Cerrar cuando se hace clic fuera
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center justify-between x-96 p-3 border rounded-md cursor-pointer bg-white"
        onClick={() => setIsOpen(open => !open)}
      >
        <span className="text-default-600 text-sm">
          {selectedLabel || "Estado"}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full max-h-60 overflow-y-auto">
          <input
            type="text"
            className="p-2 border-b w-full"
            placeholder="Buscar estado..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {filteredEstados.map((e, idx) => (
            <div
              key={idx}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedLabel(e.label)
                setIsOpen(false)
                onSelect?.(e.value)
              }}
            >
              {e.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}