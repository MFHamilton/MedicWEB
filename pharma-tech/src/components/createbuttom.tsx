// components/createbutton.tsx
import React, { useState } from "react";
import axios from "axios";
import AddIcon from "../assets/add-icon.png";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox
} from "@heroui/react";

interface CampoFormulario {
  name: string;
  type: "text" | "number" | "checkbox" | "select";
  placeholder: string;
  required?: boolean;
  options?: string[];
}

interface Props {
  titulo: string;
  campos: CampoFormulario[];
  endpoint: string;
  beforeSubmit?: (formData: any) => any;
}

export default function Createbutton({ titulo, campos, endpoint, beforeSubmit }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<any>({});
  const [backdrop, setBackdrop] = useState("blur");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const isChecked = type === "checkbox" ? target.checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? isChecked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload = { ...formData };
      for (const campo of campos) {
        if (campo.type === "number" && payload[campo.name] !== undefined) {
          payload[campo.name] = parseFloat(payload[campo.name]);
        }
        if (campo.type === "checkbox") {
          payload[campo.name] = payload[campo.name] ? 1 : 0;
        }
      }
      if (beforeSubmit) {
        payload = beforeSubmit(payload);
      }
      await axios.post(endpoint, payload);
      alert("Registro creado exitosamente.");
      setFormData({});
      onOpenChange();
    } catch (error: any) {
      alert("Error al crear el registro: " + error.message);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <Button
          className="shadow-md"
          color="primary"
          radius="sm"
          onPress={() => {
            setBackdrop("blur");
            onOpen();
          }}
        >
          <img src={AddIcon} alt="Agregar" />
          {titulo}
        </Button>
      </div>
      <Drawer backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1 text-xl font-bold">{titulo}</DrawerHeader>
              <DrawerBody>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {campos.map((campo) => (
                    <div key={campo.name} className="flex flex-col gap-2">
                      {campo.type === "select" ? (
                        <select
                          name={campo.name}
                          value={formData[campo.name] || ""}
                          onChange={handleChange}
                          required={campo.required}
                          className="w-full border border-gray-300 rounded px-4 py-2"
                        >
                          <option value="">{campo.placeholder}</option>
                          {campo.options?.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : campo.type === "checkbox" ? (
                        <Checkbox
                          isSelected={formData[campo.name] || false}
                          onChange={(checked) =>
                            setFormData((prev: any) => ({
                              ...prev,
                              [campo.name]: checked
                            }))
                          }
                        >
                          {campo.placeholder}
                        </Checkbox>
                      ) : (
                        <Input
                          type={campo.type}
                          name={campo.name}
                          label={campo.placeholder}
                          value={formData[campo.name] || ""}
                          onChange={handleChange}
                          required={campo.required}
                          radius="sm"
                          variant="bordered"
                        />
                      )}
                    </div>
                  ))}
                  <DrawerFooter className="flex gap-4">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      Guardar
                    </Button>
                  </DrawerFooter>
                </form>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
