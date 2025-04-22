"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface DropdownControlProps {
  onSelect?: (value: number) => void
}

export default function DropdownControl({ onSelect }: DropdownControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Opciones estáticas con valor 1 para Controlado y 0 para No Controlado
  const controles = [
    { value: 1, label: "Controlado" },
    { value: 0, label: "No Controlado" }
  ]

  // Filtrar opciones por término de búsqueda
  const filteredControles = controles.filter(c =>
    c.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Cerrar dropdown al hacer clic fuera
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
      <div className="flex-none gap-4">
        <div>
          <div
            className="flex items-center justify-between x-96 p-3 border rounded-md cursor-pointer bg-white"
            onClick={() => setIsOpen(open => !open)}
          >
            <span className="text-default-600 text-sm">
              {selectedLabel || "Control"}
            </span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOpen && (
            <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full max-h-60 overflow-y-auto">
              <input
                type="text"
                className="p-2 border-b w-full"
                placeholder="Buscar control..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {filteredControles.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedLabel(c.label)
                    setIsOpen(false)
                    onSelect?.(c.value)
                  }}
                >
                  {c.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}