import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { Eye, Edit, Download, Printer, Search } from "lucide-react";
import FilterButtonInspecciones from "@/components/filter-inspecciones";

interface Inspeccion {
  id_inspeccion: number;
  inspec_fecha: string;
  id_inspector: number;
  inspec_resultado: string;
}

export default function Inspecciones() {
  const [inspectores, setInspectores] = useState([]);
  const [inspecciones, setInspecciones] = useState<Inspeccion[]>([]);

  useEffect(() => {
    fetchInspectores();
    fetchInspecciones();
  }, []);

  const fetchInspectores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Inspector");
      setInspectores(response.data);
    } catch (error) {
      console.error("Error al obtener inspectores:", error);
    }
  };

  const fetchInspecciones = async () => {
    const mockData: Inspeccion[] = [
      {
        id_inspeccion: 101,
        inspec_fecha: "2024-04-01",
        id_inspector: 1,
        inspec_resultado: "Satisfactoria",
      },
      {
        id_inspeccion: 102,
        inspec_fecha: "2024-04-12",
        id_inspector: 2,
        inspec_resultado: "Pendiente",
      },
    ];
    setInspecciones(mockData);
  };

  return (
    <DefaultLayout>
      <h1 className="pb-8 m-20px text-texty text-3xl font-bold">
        Inspecciones y Auditorías
      </h1>

      <div className="bg-surface px-8 pb-8">
        {/* Buscador y Filtro con estilo limpio */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm w-72">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Buscar inspector"
              className="w-full outline-none text-sm text-gray-700"
            />
          </div>

          <FilterButtonInspecciones />
        </div>

        {/* Tabla de Inspectores */}
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F9FAFB] border-b text-gray-600">
              <tr>
                <th className="px-6 py-4">ID Inspector</th>
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Entidad Reguladora</th>
                <th className="px-6 py-4">Estado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inspectores.length > 0 ? (
                inspectores.map((inspector: any, idx: number) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{inspector.id_inspector}</td>
                    <td className="px-6 py-4">
                      {inspector.inspec_nombre} {inspector.inspec_apellido}
                    </td>
                    <td className="px-6 py-4">{inspector.id_entidadreguladora}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${
                          inspector.inspec_estado
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-700"
                        }`}>
                        {inspector.inspec_estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3 text-gray-500">
                        <Eye size={18} className="cursor-pointer hover:text-blue-600" />
                        <Edit size={18} className="cursor-pointer hover:text-green-600" />
                        <Download size={18} className="cursor-pointer hover:text-gray-800" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No hay inspectores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Tabla de Inspecciones */}
        <div className="overflow-x-auto rounded-lg shadow-md bg-white mt-10">
          <h2 className="text-xl font-bold px-6 pt-6">Inspecciones Registradas</h2>
          <table className="min-w-full text-left text-sm mt-2">
            <thead className="bg-[#F9FAFB] border-b text-gray-600">
              <tr>
                <th className="px-6 py-4">ID Inspección</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Inspector</th>
                <th className="px-6 py-4">Resultado</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inspecciones.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{item.id_inspeccion}</td>
                  <td className="px-6 py-4">{item.inspec_fecha}</td>
                  <td className="px-6 py-4">{item.id_inspector}</td>
                  <td className="px-6 py-4">{item.inspec_resultado}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 text-gray-500">
                      <Printer size={18} className="cursor-pointer hover:text-indigo-600" />
                      <Edit size={18} className="cursor-pointer hover:text-green-600" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}
