import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import TablaApi from "../components/tablaapi";
import Createbutton from "@/components/createbuttom";
import FilterEnsayosModal from "../components/filter-ensayos";
import { Input } from "@heroui/react";
import { Search } from "lucide-react";

const columns = [
  { key: "id_ensayo", label: "ID Ensayo" },
  { key: "id_med", label: "ID Medicamento" },
  {key: "NombreMedicamento", label: "Medicamento"},
  { key: "ens_fase", label: "Fase" },
  { key: "ens_poblacion_objetivo", label: "Población Objetivo" },
  { key: "ens_eficacia_observada", label: "Eficacia Observada (%)" },
  { key: "ens_estado", label: "Estado" },
];

export default function EnsayoClinico() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    ens_estado: "",
    ens_fase: ""
  });

  const variants = ["faded"];
  const colors = ["primary"];
  const radius = ["sm"];

  const rowsTransformData = (data: any[]) => {
    return (data || [])
      .filter((item: any) =>
        item.ens_poblacion_objetivo?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item: any) =>
        (filters.ens_estado ? (filters.ens_estado === "Activo" ? item.ens_estado : !item.ens_estado) : true) &&
        (filters.ens_fase ? item.ens_fase === filters.ens_fase : true)
      )
      .map((item: any, index: number) => ({
        key: item.id_ensayo?.toString() || index.toString(),
        id_ensayo: Number(item.id_ensayo),
        NombreMedicamento: String(item.NombreMedicamento),
        id_med: Number(item.id_med),
        ens_fase: String(item.ens_fase),
        ens_poblacion_objetivo: String(item.ens_poblacion_objetivo),
        ens_eficacia_observada: parseFloat(item.ens_eficacia_observada),
        ens_estado: item.ens_estado ? "Activo" : "Inactivo",
      }));
  };

  const beforeSubmit = (formData: any) => {
    return {
      id_med: parseInt(formData.id_med),
      ens_fase: String(formData.ens_fase),
      ens_eficacia_observada: parseFloat(formData.ens_eficacia_observada),
      ens_poblacion_objetivo: String(formData.ens_poblacion_objetivo),
      ens_estado: formData.ens_estado ? 1 : 0,
    };
  };

  return (
    <DefaultLayout>
      <h1 className="pb-8 m-20px text-black text-3xl font-bold">Ensayos Clínicos</h1>

      {/* Encabezado con búsqueda y botón */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Input de búsqueda con estilo personalizado */}
        <div className="rounded-md w-80 flex flex-col gap-4">
          {variants.map((variant) =>
            colors.map((color) =>
              radius.map((r) => (
                <div key={`${variant}-${color}-${r}`}>
                  <Input
                    label="Buscar por población"
                    type="text"
                    variant={variant}
                    color={color}
                    radius={r}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    startContent={<Search size={18} />}
                  />
                </div>
              ))
            )
          )}
        </div>

        <FilterEnsayosModal setFilters={setFilters} />

        <div className="ml-auto">
          <Createbutton
            titulo="Nuevo Ensayo Clínico"
            endpoint="http://localhost:3000/api/EnsayoClinico/:id"
            beforeSubmit={beforeSubmit}
            campos={[
              { name: "id_med", type: "text", placeholder: "ID Medicamento", required: true },
              {
                name: "ens_fase",
                type: "select",
                placeholder: "Seleccionar Fase",
                required: true,
                options: ["Fase I", "Fase II", "Fase III", "Fase IV"]
              },
              { name: "ens_eficacia_observada", type: "number", placeholder: "Eficacia Observada (%)", required: true },
              { name: "ens_poblacion_objetivo", type: "text", placeholder: "Población", required: true },
              { name: "ens_estado", type: "checkbox", placeholder: "Activo" },
            ]}
          />
        </div>
      </div>

      <TablaApi
        endpoint="http://localhost:3000/api/EnsayoClinico"
        columns={columns}
        transformData={rowsTransformData}
      />
    </DefaultLayout>
  );
}
