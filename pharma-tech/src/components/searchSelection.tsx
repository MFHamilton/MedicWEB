"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { ChevronDown } from "lucide-react"
                 

interface Medicamento {
  id: string
  nombre: string
}

export default function MedicamentosPage() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMedicamento, setSelectedMedicamento] = useState<Medicamento | null>(null)
  const [resultados, setResultados] = useState<Medicamento[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        // Puedes reemplazar esta URL con tu API real
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        // Transformamos los datos para simular medicamentos
        const medicamentosData = response.data.map((user: any) => ({
          id: user.id.toString(),
          nombre: `Medicamento ${user.name}`,
        }))
        setMedicamentos(medicamentosData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error al cargar medicamentos:", error)
        setIsLoading(false)
      }
    }

    fetchMedicamentos()
  }, [])

  const handleSelect = (medicamento: Medicamento) => {
    setSelectedMedicamento(medicamento)
    setIsOpen(false)
  }

  const handleBuscar = () => {
    if (selectedMedicamento) {
      setResultados([selectedMedicamento])
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <div
            className="w-full border border-gray-300 rounded-md p-3 flex justify-between items-center cursor-pointer bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={selectedMedicamento ? "text-black" : "text-gray-500"}>
              {selectedMedicamento ? selectedMedicamento.nombre : "Medicamento"}
            </span>
            <ChevronDown className="h-5 w-5 text-gray-500" />
          </div>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {isLoading ? (
                <div className="p-3 text-center text-gray-500">Cargando...</div>
              ) : (
                medicamentos.map((med) => (
                  <div key={med.id} className="p-3 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect(med)}>
                    {med.nombre}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

      </div>

      {resultados.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-700">ID del medicamento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nombre del medicamento</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Inspección</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((med) => (
                <tr key={med.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{med.id}</td>
                  <td className="py-3 px-4">{med.nombre}</td>
                  <td className="py-3 px-4">
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
