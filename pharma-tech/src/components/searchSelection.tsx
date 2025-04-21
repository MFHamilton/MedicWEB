"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@heroui/button"
import FilterButton from "./filter-button"


export default function DropdownMedicamento() {
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

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))

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
        {/* Dropdown con z-index alto para aparecer sobre otros elementos */}
        <div className="relative flex-1" ref={dropdownRef}>
          <div
            className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{selectedOption || "Medicamento"}</span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOpen && (
            <div className="absolute  mt-1 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              <input
                type="text"
                className=" p-2 border-b"
                placeholder="Buscar medicamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedOption(option)
                    setIsOpen(false)
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón alineado verticalmente con el dropdown */}
        <FilterButton/>
        <div className="my-1">
        <Button className=" px-6 hover:bg-indigo-7 rounded-md self-start shadow-md" color="primary" size="md">Buscar</Button>
        </div>
        
      </div>
    </div>
  )
}
