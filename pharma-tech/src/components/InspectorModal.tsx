import React, { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function InspectorModal({ onClose, onSubmit }: any) {
  const [inspector, setInspector] = useState({
    id_entidadreguladora: "",
    inspec_nombre: "",
    inspec_apellido: "",
    inspec_estado: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInspector({ ...inspector, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(inspector);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Añadir Inspector</h2>
        <Input label="Nombre" name="inspec_nombre" onChange={handleChange} />
        <Input label="Apellido" name="inspec_apellido" onChange={handleChange} />
        <Input label="ID Entidad Reguladora" name="id_entidadreguladora" onChange={handleChange} />
        <Input label="Estado (1=Activo, 0=Inactivo)" name="inspec_estado" onChange={handleChange} />
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} variant="bordered">Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">Guardar</Button>
        </div>
      </div>
    </div>
  );
}
