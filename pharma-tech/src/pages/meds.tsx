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
  NivelRiesgo: string;
}

export default function Meds() {
  const [selectedMed, setSelectedMed] = useState<Medicamento | null>(null);
  const [addedMeds, setAddedMeds] = useState<Medicamento[]>([]);

  const handleAdd = () => {
    if (!selectedMed) return;
    // Evita duplicados si quieres:
    if (addedMeds.find((m) => m.IdMedicamento === selectedMed.IdMedicamento)) {
      return;
    }
    setAddedMeds((prev) => [...prev, selectedMed]);
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

          {/* 2) Inputs controlados */}
          {/* Fila 1 */}
          <div className="flex flex-wrap gap-4 mx-5 mt-4">
            <InputField
              label="ID Medicamento"
              value={selectedMed?.IdMedicamento.toString() || ""}
            />
            <InputField
              label="Proveedor"
              value={selectedMed?.Proveedor || ""}
            />
            <InputField
              label="Tipo"
              value={selectedMed?.TipoMedicamento || ""}
            />
          </div>

          {/* Fila 2 */}
          <div className="flex flex-wrap gap-4 mx-5 mt-4">
            <InputField label="Nombre" value={selectedMed?.Nombre || ""} />
            <InputField
              label="Descripción"
              value={selectedMed?.Descripcion || ""}
            />
            <InputField
              label="Controlado"
              value={
                selectedMed == null
                  ? ""
                  : selectedMed.Controlado
                  ? "Sí"
                  : "No"
              }
            />
          </div>

          {/* Fila 3 */}
          <div className="flex flex-wrap gap-4 mx-5 mt-4">
            <InputField
              label="Estado"
              value={
                selectedMed == null
                  ? ""
                  : selectedMed.Estado
                  ? "Activo"
                  : "Inactivo"
              }
            />
            <InputField
              label="Nivel de Riesgo"
              value={selectedMed?.NivelRiesgo || ""}
            />
          </div>

          {/* Botón Agregar */}
          <div className="p-5 self-center">
            <Button
              className="shadow-md"
              color="secondary"
              radius="sm"
              onPress={handleAdd}
            >
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
                onPress={() => window.print()}
              >
                <img src={Print} alt="Imprimir" className="w-8 h-8" />
              </Button>
              <NewMedDrawer />
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
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Controlado</th>
                  <th className="px-6 py-4">Nivel Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {addedMeds.map((med, i) => (
                  <tr key={`${med.IdMedicamento}-${i}`}>
                    <td className="px-6 py-4">{med.IdMedicamento}</td>
                    <td className="px-6 py-4">{med.Proveedor}</td>
                    <td className="px-6 py-4">{med.TipoMedicamento}</td>
                    <td className="px-6 py-4">{med.Nombre}</td>
                    <td className="px-6 py-4">{med.Descripcion}</td>
                    <td className="px-6 py-4">
                      {med.Estado ? "Activo" : "Inactivo"}
                    </td>
                    <td className="px-6 py-4">
                      {med.Controlado ? "Sí" : "No"}
                    </td>
                    <td className="px-6 py-4">{med.NivelRiesgo}</td>
                  </tr>
                ))}
                {addedMeds.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No hay registros agregados
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

// Componente auxiliar para Inputs
function InputField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex-1 min-w-[200px]">
      <h2 className="mb-2">{label}</h2>
      <Input
        isReadOnly
        className="w-full"
        label={label}
        value={value}
        variant="bordered"
      />
    </div>
  );
}
