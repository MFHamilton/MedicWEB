import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import TablaApi from "../components/tablaapi";

// Columnas de la tabla
const columns = [
  { key: "pro_nombre", label: "Proveedor" },
  { key: "pro_ubicacion", label: "Ubicación" },
  { key: "pro_historial", label: "Historial" },
  { key: "proveedor_estado", label: "Estado" },
];

export default function Proveedores() {
  const [searchTerm, setSearchTerm] = useState("");

  const rowsTransformData = (data: any[]) => {
    return data
      .filter((item) =>
        item.pro_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((item: any, index: number) => ({
        key: item.id?.toString() || index.toString(),
        pro_nombre: item.pro_nombre,
        pro_ubicacion: item.pro_ubicacion,
        pro_historial: item.pro_historial,
        proveedor_estado: item.proveedor_estado,
      }));
  };

  return (
    <DefaultLayout>
        <h1 className="pb-8 m-20px text-black text-3xl font-bold">Proveedores</h1>
      {/* Encabezado con búsqueda y botón */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar proveedor"
          className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Botón nuevo proveedor */}
        <button
          onClick={() => (window.location.href = "/proveedores/nuevo")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          
          Nuevo proveedor
        </button>
      </div>

      {/* Tabla */}
      <TablaApi
        endpoint="http://localhost:3000/api/Provd"
        columns={columns}
        transformData={rowsTransformData}
      />
    </DefaultLayout>
  );
}
