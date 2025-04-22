// components/OverlayInspectorEdit.tsx
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import axios from "axios";

export default function OverlayInspectorEdit({ inspector, onUpdate }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: inspector.Nombre || "",
    Apellido: inspector.Apellido || "",
    Estado: inspector.Estado === "Activo",
    IdInspector: inspector.IdInspector,
    IdEntidad: inspector.IdEntidad || null,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/api/Inspector/${formData.IdInspector}`, {
        inspec_nombre: formData.Nombre,
        inspec_apellido: formData.Apellido,
        inspec_estado: formData.Estado ? 1 : 0,
        id_entidadreguladora: formData.IdEntidad,
      });

      onUpdate(); // recargar la tabla del frontend
      setShowConfirm(false);
      onClose();
    } catch (error) {
      console.error("Error actualizando inspector:", error);
    }
  };

  return (
    <>
      <Button
        size="sm"
        className="text-green-600"
        onClick={onOpen}
      >
        Editar
      </Button>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Editar Inspector</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-3">
              <label className="font-bold">Nombre</label>
              <input
                name="Nombre"
                type="text"
                className="border px-3 py-2 rounded-md"
                value={formData.Nombre}
                onChange={handleChange}
              />
              <label className="font-bold">Apellido</label>
              <input
                name="Apellido"
                type="text"
                className="border px-3 py-2 rounded-md"
                value={formData.Apellido}
                onChange={handleChange}
              />
              <label className="font-bold">Estado</label>
              <select
                name="Estado"
                className="border px-3 py-2 rounded-md"
                value={formData.Estado ? "Activo" : "Inactivo"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Estado: e.target.value === "Activo",
                  })
                }
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="primary" onPress={() => setShowConfirm(true)}>
              Aceptar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Confirmación */}
      <Modal backdrop="blur" isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <ModalContent>
          <ModalHeader>Confirmar cambios</ModalHeader>
          <ModalBody>
            ¿Estás seguro de guardar los cambios realizados?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button color="success" onPress={handleSubmit}>
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
