"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"

interface Props {
  setSelectedEntidad: (value: string) => void;
}

export default function DropdownEntidadReguladora({ setSelectedEntidad }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [entidades, setEntidades] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchEntidades = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/EntidadReguladora")
        const nombres = response.data.map((entidad: any) => entidad.nombre)
        setEntidades(nombres)
      } catch (error) {
        console.error("Error al obtener entidades reguladoras:", error)
        setEntidades([
          "MSP",
          "DIGEMAPS",
          "COFEPRIS",
          "FDA",
        ])
      }
    }

    fetchEntidades()
  }, [])

  const filteredEntidades = entidades.filter((entidad) =>
    entidad.toLowerCase().includes(searchTerm.toLowerCase())
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
          <span>{selectedOption || "Entidad Reguladora"}</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isOpen && (
          <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full overflow-y-auto">
            <input
              type="text"
              className="p-2 border-b w-full"
              placeholder="Buscar entidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredEntidades.map((entidad, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedOption(entidad)
                  setSelectedEntidad(entidad)
                  setIsOpen(false)
                }}
              >
                {entidad}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
