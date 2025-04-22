import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Eye, Edit, Download, Plus, Filter, Search } from "lucide-react";
import FilterButtonInspecciones from "@/components/filter-inspecciones";
import DropdownEntidadReguladora from "@/components/InspectorEntidadReguladora-dropdown"
import DropdownEstadoInspector from "@/components/estado-Inspector-filtro"

export default function Inspecciones() {
 
  const [inspectores, setInspectores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    inspec_nombre: "",
    inspec_apellido: "",
    id_entidadreguladora: "",
    inspec_estado: true,
  });

  useEffect(() => {
    fetchInspectores();
  }, []);

  const fetchInspectores = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/Inspector");
      setInspectores(response.data);
    } catch (error) {
      console.error("Error al obtener inspectores:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/Inspector", {
        ...form,
        id_entidadreguladora: parseInt(form.id_entidadreguladora),
      });
      setForm({
        inspec_nombre: "",
        inspec_apellido: "",
        id_entidadreguladora: "",
        inspec_estado: true,
      });
      setShowModal(false);
      fetchInspectores();
    } catch (error) {
      console.error("Error al crear inspector:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <DefaultLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Inspecciones y Auditorías</h1>

        {/* Buscador y botones */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              className=" w-72 rounded-sm"
              placeholder="Buscar inspector"
              startContent={<Search size={18} />}
            />
           <FilterButtonInspecciones />

          </div>
          <Button
            className="rounded-md px-4"
            color="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={18} className="mr-2" />
            Añadir Inspector
          </Button>
        </div>

        {/* Tabla */}
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
                    <td className="px-6 py-4">{inspector.inspec_nombre} {inspector.inspec_apellido}</td>
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
                <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No hay inspectores.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Añadir Inspector</h2>
              <div className="space-y-4">
                <Input
                  name="inspec_nombre"
                  placeholder="Nombre"
                  onChange={handleChange}
                  className="rounded-md"
                />
                <Input
                  name="inspec_apellido"
                  placeholder="Apellido"
                  onChange={handleChange}
                  className="rounded-md"
                />
                <Input
                  name="id_entidadreguladora"
                  placeholder="ID Entidad Reguladora"
                  onChange={handleChange}
                  className="rounded-md"
                />
                <select
                  name="inspec_estado"
                  onChange={(e) =>
                    setForm({ ...form, inspec_estado: e.target.value === "true" })
                  }
                  className="w-full border p-2 rounded-md"
                >
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>

                <div className="flex justify-end gap-2 pt-4">
                  <Button className="rounded-md" color="danger" variant="flat" onClick={() => setShowModal(false)}>
                    Cancelar
                  </Button>
                  <Button className="rounded-md" onClick={handleSubmit}>
                    Guardar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}
