"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"

export default function DropdownRiesgo() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [controles, setControl] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchControl = async () => {
      try {
        // Reemplaza esta URL por la real de tu API
        const response = await axios.get("https://api.example.com/controles")
        // Suponiendo que la API devuelve un array de strings
        setControl(response.data)
      } catch (error) {
        console.error("Error al obtener control:", error)
        // Datos de ejemplo en caso de error o como placeholder
        setControl([
          "1",
          "2",
          "3",
          "4",
          "5",
        ])
      }
    }

    fetchControl()
  }, [])

  const filteredControl = controles.filter((control) =>
    control.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex-none gap-4">
        <div className="" ref={dropdownRef}>
          <div
            className="flex items-center justify-between x-96 p-3 border rounded-md cursor-pointer bg-white"
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
                placeholder="Buscar control..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredControl.map((control, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedOption(control)
                    setIsOpen(false)
                  }}
                >
                  {control}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
