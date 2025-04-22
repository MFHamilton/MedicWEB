import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import TablaApi from "../components/tablaapi";
import Createbutton from "@/components/createbuttom";
import FilterEnsayos from "../components/filter-ensayos";

// Columnas de la tabla de Ensayo Clínico
const columns = [
  { key: "id_ensayo", label: "ID Ensayo" },
  { key: "id_med", label: "ID Medicamento" },
  { key: "ens_fase", label: "Fase" },
  { key: "ens_poblacion_objetivo", label: "Población Objetivo" },
  { key: "ens_eficacia_observada", label: "Eficacia Observada (%)" },
  { key: "ens_estado", label: "Estado" },
];

export default function EnsayoClinico() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    ens_fase: "",
    ens_estado: "",
  });

  const rowsTransformData = (data: any[]) => {
    return (data || [])
      .filter((item: any) =>
        item.ens_poblacion_objetivo?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item: any) =>
        (filters.ens_fase ? item.ens_fase === filters.ens_fase : true) &&
        (filters.ens_estado ? (filters.ens_estado === "Activo" ? item.ens_estado : !item.ens_estado) : true)
      )
      .map((item: any, index: number) => ({
        key: item.id_ensayo?.toString() || index.toString(),
        id_ensayo: Number(item.id_ensayo),
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

      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Buscar ensayos clínicos"
            className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <FilterEnsayos filters={filters} setFilters={setFilters} />
        </div>

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
                options: ["Fase I", "Fase II", "Fase III", "Fase IV"],
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
