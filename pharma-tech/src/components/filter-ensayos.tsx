// components/filter-ensayos.tsx
import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Divider
} from "@heroui/react";
import Filter from "../assets/filter.png";

interface Props {
  filters: { ens_fase: string; ens_estado: string };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const fases = ["Fase I", "Fase II", "Fase III", "Fase IV"];
const estados = ["Activo", "Inactivo"];

export default function FilterEnsayos({ filters, setFilters }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="bordered"
          className="text-[#000066] hover:bg-blue-100"
        >
          <img src={Filter} alt="Filtro" className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-4">
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Fase</h4>
          <select
            className="w-full border border-gray-300 rounded-md px-2 py-1"
            value={filters.ens_fase}
            onChange={(e) => setFilters((prev: any) => ({ ...prev, ens_fase: e.target.value }))}
          >
            <option value="">Todos</option>
            {fases.map((fase) => (
              <option key={fase} value={fase}>{fase}</option>
            ))}
          </select>
        </div>

        <Divider className="my-2" />

        <div>
          <h4 className="font-semibold mb-2">Estado</h4>
          <select
            className="w-full border border-gray-300 rounded-md px-2 py-1"
            value={filters.ens_estado}
            onChange={(e) => setFilters((prev: any) => ({ ...prev, ens_estado: e.target.value }))}
          >
            <option value="">Todos</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
