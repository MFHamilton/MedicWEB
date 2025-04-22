import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { Eye, Pencil, Printer, Search } from "lucide-react";
import OverlayModal from "@/components/OverlayModal";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react";

interface Inspector {
  IdInspector: number;
  Nombre: string;
  Apellido: string;
  EntidadReguladora: string;
  Estado: string;
  id_entidadreguladora: number;
}

interface Inspeccion {
  IdInspeccion: number;
  InsFecha: string;
  IdProveedor: number;
  InsRequisitos: string;
}

interface EntidadReguladora {
  id_entidadreguladora: number;
  ent_nombre: string;
}

export default function Inspectores() {
  const [inspectores, setInspectores] = useState<Inspector[]>([]);
  const [inspecciones, setInspecciones] = useState<Inspeccion[]>([]);
  const [entidades, setEntidades] = useState<EntidadReguladora[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntidad, setSelectedEntidad] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Inspector | null>(null);
  const [editedEstado, setEditedEstado] = useState("");
  const [editedEntidadId, setEditedEntidadId] = useState<number | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchInspectores();
    fetchInspecciones();
    fetchEntidades();
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
    try {
      const response = await axios.get("http://localhost:3000/api/Inspeccion");
      setInspecciones(response.data);
    } catch (error) {
      console.error("Error al obtener inspecciones:", error);
    }
  };

  const fetchEntidades = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/EntidadReg");
      setEntidades(response.data);
    } catch (error) {
      console.error("Error al obtener entidades reguladoras:", error);
    }
  };

  const openView = (inspector: Inspector | any) => {
    setSelectedItem(inspector);
    setIsViewOpen(true);
  };

  const openEdit = (inspector: Inspector) => {
    setSelectedItem(inspector);
    setEditedEstado(inspector.Estado);
    setEditedEntidadId(inspector.id_entidadreguladora);
    setIsEditOpen(true);
  };

  const confirmUpdate = async () => {
    if (!selectedItem || editedEntidadId === null) return;
    try {
      await axios.put(`http://localhost:3000/api/Inspector/${selectedItem.IdInspector}`, {
        id_entidadreguladora: editedEntidadId,
        inspec_nombre: selectedItem.Nombre,
        inspec_apellido: selectedItem.Apellido,
        inspec_estado: editedEstado === "Activo" ? 1 : 0,
      });
      setIsEditOpen(false);
      setShowConfirm(false);
      fetchInspectores();
    } catch (err) {
      console.error("Error al actualizar:", err);
    }
  };

  const filteredInspectores = inspectores.filter((inspector) => {
    const matchesSearch = `${inspector.Nombre} ${inspector.Apellido}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEntidad = selectedEntidad ? inspector.EntidadReguladora === selectedEntidad : true;
    return matchesSearch && matchesEntidad;
  });

  return (
    <DefaultLayout>
      <h1 className="pb-8 m-20px text-texty text-3xl font-bold">Inspecciones y Auditorías</h1>

      <div className="bg-surface px-8 pb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Buscar inspector"
              className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="bg-primary text-white">Buscar</Button>
            <Button className="bg-surface p-2 shadow-md" onClick={onOpen}>Filtros</Button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md bg-white mb-10">
          <h2 className="text-xl font-bold px-6 pt-6">Inspecciones Registradas</h2>
          <table className="min-w-full text-left text-sm mt-2">
            <thead className="bg-[#F9FAFB] border-b text-gray-600">
              <tr>
                <th className="px-6 py-4">ID Inspección</th>
                <th className="px-6 py-4">Fecha</th>
                <th className="px-6 py-4">Proveedor</th>
                <th className="px-6 py-4">Requisitos</th>
                <th className="px-6 py-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {inspecciones.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{item.IdInspeccion}</td>
                  <td className="px-6 py-4">{item.InsFecha}</td>
                  <td className="px-6 py-4">{item.IdProveedor}</td>
                  <td className="px-6 py-4">{item.InsRequisitos}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 text-gray-500">
                      <Eye size={18} className="cursor-pointer hover:text-blue-600" onClick={() => openView(item)} />
                      <Printer size={18} className="cursor-pointer hover:text-indigo-600" onClick={() => window.print()} />
                      <Pencil size={18} className="cursor-pointer hover:text-green-600" onClick={() => openEdit(item)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <h2 className="text-xl font-bold px-6 pt-6">Entidad Reguladora</h2>
          <table className="min-w-full text-left text-sm mt-2">
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
              {filteredInspectores.map((inspector, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{inspector.IdInspector}</td>
                  <td className="px-6 py-4">{inspector.Nombre} {inspector.Apellido}</td>
                  <td className="px-6 py-4">{inspector.EntidadReguladora}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold shadow-sm ${inspector.Estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-700"}`}>{inspector.Estado}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 text-gray-500">
                      <Eye size={18} className="cursor-pointer hover:text-blue-600" onClick={() => openView(inspector)} />
                      <Printer size={18} className="cursor-pointer hover:text-indigo-600" onClick={() => window.print()} />
                      <Pencil size={18} className="cursor-pointer hover:text-green-600" onClick={() => openEdit(inspector)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal isOpen={isOpen} onClose={onClose} backdrop="blur">
          <ModalContent className="max-h-[90vh]">
            <ModalHeader className="text-primary font-bold">Filtros</ModalHeader>
            <ModalBody className="flex flex-col gap-4">
              <p className="font-bold">Entidad Reguladora</p>
              <select
                value={selectedEntidad}
                onChange={(e) => setSelectedEntidad(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="">Todas</option>
                {entidades.map((ent) => (
                  <option key={ent.id_entidadreguladora} value={ent.ent_nombre}>{ent.ent_nombre}</option>
                ))}
              </select>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" color="danger" onClick={onClose}>Cerrar</Button>
              <Button color="primary" onClick={onClose}>Aplicar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <OverlayModal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Detalles">
          <p><strong>ID:</strong> {selectedItem?.IdInspector || selectedItem?.IdInspeccion}</p>
          <p><strong>Nombre:</strong> {selectedItem?.Nombre || "—"} {selectedItem?.Apellido || ""}</p>
          <p><strong>Entidad:</strong> {selectedItem?.EntidadReguladora || "—"}</p>
          <p><strong>Estado:</strong> {selectedItem?.Estado || "—"}</p>
        </OverlayModal>

        <OverlayModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Editar">
          <p className="text-sm text-gray-600 mb-1">Nombre</p>
          <input
            type="text"
            value={`${selectedItem?.Nombre || ""} ${selectedItem?.Apellido || ""}`}
            readOnly
            className="w-full p-2 rounded border bg-gray-100"
          />

          <p className="text-sm text-gray-600 mt-4 mb-1">Entidad Reguladora</p>
          <select
            value={editedEntidadId || 0}
            onChange={(e) => setEditedEntidadId(Number(e.target.value))}
            className="w-full p-2 rounded border"
          >
            <option value={0} disabled>Selecciona una entidad</option>
            {entidades.map((ent) => (
              <option key={ent.id_entidadreguladora} value={ent.id_entidadreguladora}>{ent.ent_nombre}</option>
            ))}
          </select>

          <p className="text-sm text-gray-600 mt-4 mb-1">Estado</p>
          <select
            value={editedEstado}
            onChange={(e) => setEditedEstado(e.target.value)}
            className="w-full p-2 rounded border"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <div className="flex justify-end mt-4 gap-2">
            <Button color="secondary" onClick={() => setShowConfirm(true)}>Aceptar</Button>
          </div>
        </OverlayModal>

        <OverlayModal isOpen={showConfirm} onClose={() => setShowConfirm(false)} title="Confirmar Cambios">
          <p className="mb-4">¿Estás seguro que deseas guardar los cambios?</p>
          <div className="flex justify-end gap-2">
            <Button color="danger" variant="light" onClick={() => setShowConfirm(false)}>Cancelar</Button>
            <Button color="primary" onClick={confirmUpdate}>Confirmar</Button>
          </div>
        </OverlayModal>
      </div>
    </DefaultLayout>
  );
}

