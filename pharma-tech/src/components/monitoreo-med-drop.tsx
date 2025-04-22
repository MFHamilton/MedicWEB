"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp, RefreshCcw } from "lucide-react"

export default function MonitoreoMedDropdown({
  onRefresh,
}: {
  onRefresh: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const options = [
    "Medicamento Leanne Graham",
    "Medicamento Ervin Howell",
    "Medicamento Clementine Bauch",
    "Medicamento Patricia Lebsack",
    "Medicamento Chelsey Dietrich",
  ]

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="w-full bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Dropdown + search */}
      <div className="relative flex-1 min-w-[250px]" ref={dropdownRef}>
        <div
          className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption || "Medicamento"}</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>

        {isOpen && (
          <div className="absolute mt-1 bg-white border rounded-md shadow-lg z-50 w-full max-h-64 overflow-y-auto">
            {/* 🔍 Search input */}
            <input
              type="text"
              className="w-full p-2 border-b outline-none text-sm"
              placeholder="Buscar medicamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                onClick={() => {
                  setSelectedOption(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-3 text-gray-500 text-sm">No encontrado</div>
            )}
          </div>
        )}
      </div>

      {/* Botón Actualizar */}
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 bg-[#070357] text-white px-4 py-2 rounded-md hover:bg-[#050245] transition"
      >
        <RefreshCcw size={16} />
        Actualizar
      </button>
    </div>
  )
}
