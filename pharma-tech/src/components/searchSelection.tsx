import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@heroui/button";
import FilterButton from "./filter-button";

interface Medicamento {
  IdMedicamento: number;
  Proveedor: string;
  TipoMedicamento: string;
  Nombre: string;
  Descripción: string;
  Estado: boolean;
  Controlado: boolean;
  NivelRiesgo: string;
}

interface DropdownMedicamentoProps {
  onSearch: (med: Medicamento | null) => void;
}

export default function DropdownMedicamento({
  onSearch,
}: DropdownMedicamentoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<Medicamento[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedMed, setSelectedMed] = useState<Medicamento | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch options from API when dropdown opens or searchTerm changes
  useEffect(() => {
    if (!isOpen) return;

    const fetchOptions = async () => {
      try {
        const { data } = await axios.get<Medicamento[]>(
          "http://localhost:3000/api/Meds",
          { params: { med_nombre: searchTerm } }
        );
        setOptions(data);
      } catch (error) {
        console.error("Error fetching medicamentos:", error);
        setOptions([]);
      }
    };

    fetchOptions();
  }, [isOpen, searchTerm]);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full p-6 bg-white rounded-lg">
      <div className="flex items-center gap-4">
        <div className="relative flex-1" ref={dropdownRef}>
          <div
            className="flex items-center justify-between p-3 border rounded-md cursor-pointer bg-white"
            onClick={() => setIsOpen((o) => !o)}
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
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {options.length === 0 ? (
                <div className="p-3 text-gray-500">No hay resultados</div>
              ) : (
                options.map((med) => (
                  <div
                    key={med.IdMedicamento}
                    className="p-3 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedOption(med.Nombre);
                      setSelectedMed(med);
                      setIsOpen(false);
                    }}
                  >
                    {med.Nombre}
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
            onClick={() => onSearch(selectedMed)}
          >
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
}
