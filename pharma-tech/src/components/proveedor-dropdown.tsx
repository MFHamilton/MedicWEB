"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"

export default function DropdownProveedor() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [proveedores, setProveedor] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch providers whenever the search term changes or dropdown opens
    if (!isOpen) return

    const fetchProveedor = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Provd", {
          params: { pro_nombre: searchTerm }
        })
        // Map API objects to array of provider names
        setProveedor(
          (response.data || []).map((p: any) => String(p.pro_nombre))
        )
      } catch (error) {
        console.error("Error al obtener proveedor:", error)
        setProveedor([])
      }
    }

    fetchProveedor()
  }, [isOpen, searchTerm])

  const filteredProveedor = proveedores.filter((proveedor) =>
    proveedor.toLowerCase().includes(searchTerm.toLowerCase())
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
              {filteredProveedor.map((proveedor, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedOption(proveedor)
                    setIsOpen(false)
                  }}
                >
                  {proveedor}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}