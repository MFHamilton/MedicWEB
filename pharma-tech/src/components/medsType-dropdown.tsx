"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"

interface DropdownMedTypeProps {
  onSelect?: (idTipo: number) => void
}

export default function DropdownMedType({ onSelect }: DropdownMedTypeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [medtipos, setMedtipos] = useState<{ id: number; name: string }[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedLabel, setSelectedLabel] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch medtipos when dropdown opens or searchTerm changes
  useEffect(() => {
    if (!isOpen) return

    const fetchMedtipos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/TipoMedicamento", {
          params: { tipom_nombre: searchTerm }
        })
        // Map API objects to array of {id, name}
        const items = (response.data || []).map((m: any) => ({
          id: Number(m.id_tipo_medicamento),
          name: String(m.tipom_nombre)
        }))
        setMedtipos(items)
      } catch (error) {
        console.error("Error al obtener tipos de medicamento:", error)
        setMedtipos([])
      }
    }

    fetchMedtipos()
  }, [isOpen, searchTerm])

  // Filter client-side
  const filteredMedtipos = medtipos.filter((tipo) =>
    tipo.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Close on outside click
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
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-default-600 text-sm">
          {selectedLabel || "Tipo de Medicamento"}
        </span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {isOpen && (
        <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full max-h-60 overflow-y-auto">
          <input
            type="text"
            className="p-2 border-b w-full"
            placeholder="Buscar medtipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {filteredMedtipos.map((medtipo, index) => (
            <div
              key={medtipo.id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedId(medtipo.id)
                setSelectedLabel(medtipo.name)
                setIsOpen(false)
                onSelect?.(medtipo.id)
              }}
            >
              {medtipo.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
