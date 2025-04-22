"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Props {
  setSelectedEstado: (value: string) => void;
}

export default function DropdownEstadoInspector({ setSelectedEstado }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [estados, setEstados] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Estados estáticos ya que no hay API real
    setEstados(["Activo", "Inactivo"])
  }, [])

  const filteredEstados = estados.filter((estado) =>
    estado.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="w-96 relative">
      <div ref={dropdownRef}>
        <div
          className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption || "Estado"}</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isOpen && (
          <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full max-h-60 overflow-y-auto">
            <input
              type="text"
              className="p-2 border-b w-full"
              placeholder="Buscar estado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredEstados.map((estado, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedOption(estado)
                  setSelectedEstado(estado)
                  setIsOpen(false)
                }}
              >
                {estado}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
