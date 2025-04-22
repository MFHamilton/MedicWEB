import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import DropDownSearch from "@/components/searchSelection";
import AddIcon from "../assets/add-icon.png";
import Print from "../assets/print-icon.png";
import NewMedDrawer from "@/components/AddMedsDrawer";

interface Medicamento {
  IdMedicamento: number;
  Proveedor: string;
  TipoMedicamento: string;
  Nombre: string;
  Descripcion: string;
  Estado: boolean;
  Controlado: boolean;
}

export default function Meds() {
  const [selectedMed, setSelectedMed] = useState<Medicamento | null>(null);
  const [rows, setRows] = useState<Medicamento[]>([]);

  const handleAdd = () => {
    if (selectedMed) {
      setRows(prev => [...prev, selectedMed]);
      setSelectedMed(null); // opcional: limpiar selección tras agregar
    }
  };

  return (
    <div className="bg-red">
      <DefaultLayout>
        <h1 className="pb-8 m-20px text-texty text-3xl font-bold">
          Medicamentos
        </h1>

        <div className="bg-surface pb-8 m-50px">
          {/* 1) Dropdown con callback */}
          <div className="flex w-full md:flex-nowrap gap-4">
            <DropDownSearch onSearch={setSelectedMed} />
          </div>

          {/* Inputs controlados */}
          <div className="flex flex-wrap gap-4 mx-5 mt-4">
            {/* Fila 1 */}
            <div className="flex-1 min-w-[200px]">
              <h2 className="mb-2">ID del Medicamento</h2>
              <Input
                isReadOnly
                className="w-full"
                label="ID Medicamento"
                value={selectedMed?.IdMedicamento.toString() || ""}
                variant="bordered"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h2 className="mb-2">Proveedor</h2>
              <Input
                isReadOnly
                className="w-full"
                label="Proveedor"
                value={selectedMed?.Proveedor || ""}
                variant="bordered"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h2 className="mb-2">Tipo</h2>
              <Input
                isReadOnly
                className="w-full"
                label="Tipo"
                value={selectedMed?.TipoMedicamento || ""}
                variant="bordered"
              />
            </div>

            {/* Fila 2 */}
            <div className="flex-1 min-w-[200px]">
              <h2 className="mb-2">Nombre</h2>
              <Input
                isReadOnly
                className="w-full"
                label="Nombre"
                value={selectedMed?.Nombre || ""}
                variant="bordered"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h2 className="mb-2">Descripción</h2>
              <Input
                isReadOnly
                className="w-full"
                label="Descripción"
                value={selectedMed?.Descripcion || ""}
                variant="bordered"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <h2 className="mb-2">Controlado</h2>
              <Input
                isReadOnly
                className="w-full"
                label="Controlado"
                value={
                  selectedMed?.Controlado
                    ? "Sí"
                    : selectedMed === null
                    ? ""
                    : "No"
                }
                variant="bordered"
              />
            </div>

            {/* Fila 3 */}
            <div className="flex-1 min-w-[200px]">
              <h2 className="mb-2">Estado</h2>
              <Input
                isReadOnly
                className="w-full"
                label="Estado"
                value={
                  selectedMed?.Estado
                    ? "Activo"
                    : selectedMed === null
                    ? ""
                    : "Inactivo"
                }
                variant="bordered"
              />
            </div>
          </div>

          {/* Agregar */}
          <div className="p-5 self-center">
            <Button onClick={handleAdd} className="shadow-md" color="secondary" radius="sm">
              <img src={AddIcon} alt="Agregar" />
              Agregar
            </Button>
          </div>
        </div>

        {/* Sección "Resultados" */}
        <div className="mt-8">
          <div className="flex justify-between items-center bg-surface px-8">
            <h1 className="text-2xl font-bold">Resultados</h1>
            <div className="flex items-center gap-4">
              <Button
                isIconOnly
                aria-label="Imprimir"
                className="bg-surface rounded-md"
              >
                <img src={Print} alt="Imprimir" className="w-8 h-8" />
              </Button>
              <div className="p-5 self-center">
                <NewMedDrawer />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto p-5 rounded-lg shadow-md bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F9FAFB] border-b text-gray-600">
                <tr>
                  <th className="px-6 py-4">ID Medicamento</th>
                  <th className="px-6 py-4">Proveedor</th>
                  <th className="px-6 py-4">Tipo</th>
                  <th className="px-6 py-4">Nombre</th>
                  <th className="px-6 py-4">Descripción</th>
                  <th className="px-6 py-4">Controlado</th>
                  <th className="px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(med => (
                  <tr key={med.IdMedicamento} className="border-b">
                    <td className="px-6 py-4">{med.IdMedicamento}</td>
                    <td className="px-6 py-4">{med.Proveedor}</td>
                    <td className="px-6 py-4">{med.TipoMedicamento}</td>
                    <td className="px-6 py-4">{med.Nombre}</td>
                    <td className="px-6 py-4">{med.Descripcion}</td>
                    <td className="px-6 py-4">{med.Controlado ? "Sí" : "No"}</td>
                    <td className="px-6 py-4">{med.Estado ? "Activo" : "Inactivo"}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No hay resultados aún
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}
