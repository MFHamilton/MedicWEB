import { useState, useRef, useEffect } from "react"
import axios from "axios"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@heroui/button"
import FilterButton from "./filter-button"

export default function DropdownMedicamento() {
  const [isOpen, setIsOpen] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch options from API when dropdown opens or searchTerm changes
  useEffect(() => {
    if (!isOpen) return

    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Meds", {
          params: { med_nombre: searchTerm }
        })
        // Map the API response to option labels (field "Nombre")
        const names = (response.data || []).map((m: any) => m.Nombre)
        setOptions(names)
      } catch (error) {
        console.error("Error fetching medicamentos:", error)
        setOptions([])
      }
    }

    fetchOptions()
  }, [isOpen, searchTerm])

  // Close dropdown if click outside
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
    <div className="w-full p-6 bg-white rounded-lg">
      <div className="flex items-center gap-4">
        <div className="relative flex-1" ref={dropdownRef}>
          <div
            className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
            onClick={() => setIsOpen(open => !open)}
          >
            <span>{selectedOption || "Selecciona medicamento"}</span>
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {isOpen && (
            <div className="absolute mt-1 w-full bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
              <input
                type="text"
                className="w-full p-2 border-b"
                placeholder="Buscar medicamento..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              {options.length === 0 ? (
                <div className="p-3 text-gray-500">No hay resultados</div>
              ) : (
                options.map((option, index) => (
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
                ))
              )}
            </div>
          )}
        </div>

        <FilterButton />
        <div className="my-1">
          <Button
            className="px-6 hover:bg-indigo-700 rounded-md self-start shadow-md"
            color="primary"
            size="md"
          >Buscar</Button>
        </div>
      </div>
    </div>
  )
}