"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"

export default function DropdownInspector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [inspectors, setInspectors] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchInspectors = async () => {
      try {
        // Reemplaza esta URL por la real de tu API
        const response = await axios.get("https://api.example.com/inspectores")
        // Suponiendo que la API devuelve un array de strings
        setInspectors(response.data)
      } catch (error) {
        console.error("Error al obtener inspectores:", error)
        // Datos de ejemplo en caso de error o como placeholder
        setInspectors([
          "Inspector Leanne Graham",
          "Inspector Ervin Howell",
          "Inspector Clementine Bauch",
          "Inspector Patricia Lebsack",
        ])
      }
    }

    fetchInspectors()
  }, [])

  const filteredInspectors = inspectors.filter((inspector) =>
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
    <div className="w-xl p-6 bg-white rounded-lg">
      <div className="flex items-center gap-4">
        <div className="relative flex-1" ref={dropdownRef}>
          <div
            className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedOption || "Inspector"}</span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOpen && (
            <div className="absolute mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              <input
                type="text"
                className="p-2 border-b w-full"
                placeholder="Buscar inspector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredInspectors.map((inspector, index) => (
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
    </div>
  )
}
