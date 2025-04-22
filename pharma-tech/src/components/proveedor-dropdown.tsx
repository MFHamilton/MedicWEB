"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"

interface DropdownProveedorProps {
  onSelect?: (idProveedor: number) => void
}

export default function DropdownProveedor({ onSelect }: DropdownProveedorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [proveedores, setProveedores] = useState<{ id: number; nombre: string }[]>([])
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const fetchProveedor = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Provd", {
          params: { pro_nombre: searchTerm }
        })
        setProveedores(
          (response.data || []).map((p: any) => ({
            id: Number(p.id_proveedor),
            nombre: String(p.pro_nombre)
          }))
        )
      } catch (error) {
        console.error("Error al obtener proveedor:", error)
        setProveedores([])
      }
    }

    fetchProveedor()
  }, [isOpen, searchTerm])

  const filteredProveedor = proveedores.filter((proveedor) =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="relative">
      <div className="flex-none gap-4">
        <div className="" ref={dropdownRef}>
          <div
            className="flex items-center justify-between x-96 p-3 border rounded-md cursor-pointer bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-default-600 text-sm">{selectedOption || "Proveedor"}</span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOpen && (
            <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full overflow-y-auto">
              <input
                type="text"
                className="p-2 border-b w-full"
                placeholder="Buscar proveedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredProveedor.map((proveedor) => (
                <div
                  key={proveedor.id}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedOption(proveedor.nombre)
                    setSelectedId(proveedor.id)
                    setIsOpen(false)
                    onSelect?.(proveedor.id)
                  }}
                >
                  {proveedor.nombre}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
