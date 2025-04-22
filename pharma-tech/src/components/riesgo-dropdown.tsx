"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface DropdownRiesgoProps {
  onSelect?: (value: number) => void
}

export default function DropdownRiesgo({ onSelect }: DropdownRiesgoProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Opciones estáticas de 1 a 5
  const niveles = [1, 2, 3, 4, 5]

  // Filtrar por búsqueda (convertir a string)
  const filteredNiveles = niveles.filter(n =>
    n.toString().includes(searchTerm)
  )

  // Manejar clic fuera para cerrar dropdown
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
              {selectedLabel || "Riesgo"}
            </span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOpen && (
            <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full max-h-60 overflow-y-auto">
              <input
                type="text"
                className="p-2 border-b w-full"
                placeholder="Buscar nivel de riesgo..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {filteredNiveles.map((nivel, idx) => (
                <div
                  key={idx}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedLabel(nivel.toString())
                    setIsOpen(false)
                    onSelect?.(nivel)
                  }}
                >
                  {nivel}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
