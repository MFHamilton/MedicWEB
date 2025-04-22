"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"

export default function DropdownInspectores() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [inspectores, setInspectores] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchInspectores = async () => {
      try {
        // Reemplaza esta URL por la real de tu API local
        const response = await axios.get("http://localhost:3000/api/Inspector")
        const nombres = response.data.map((inspector: any) => `${inspector.inspec_nombre} ${inspector.inspec_apellido}`)
        setInspectores(nombres)
      } catch (error) {
        console.error("Error al obtener inspectores:", error)
        setInspectores([
          "Inspector Leslie Jiménez",
          "Inspector Juan Ovalles",
          "Inspector Laura Pérez",
          "Inspector Pedro Martínez",
        ])
      }
    }

    fetchInspectores()
  }, [])

  const filteredInspectores = inspectores.filter((inspector) =>
    inspector.toLowerCase().includes(searchTerm.toLowerCase())
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
          <span>{selectedOption || "Inspector"}</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isOpen && (
          <div className="absolute bg-white border rounded-sm shadow-lg z-50 w-full overflow-y-auto">
            <input
              type="text"
              className="p-2 border-b w-full"
              placeholder="Buscar inspector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredInspectores.map((inspector, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedOption(inspector)
                  setIsOpen(false)
                }}
              >
                {inspector}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
