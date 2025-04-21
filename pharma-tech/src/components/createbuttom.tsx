// components/createbutton.tsx
import React, { useState } from "react";
import axios from "axios";

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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState<any>({});

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
      setMostrarFormulario(false);
    } catch (error: any) {
      alert("Error al crear el registro: " + error.message);
    }
  };

  return (
    <div>
      <button
        onClick={() => setMostrarFormulario(true)}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
      >
        {titulo}
      </button>

      {mostrarFormulario && (
        <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-white shadow-lg z-50 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{titulo}</h2>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {campos.map((campo) => (
              <div key={campo.name}>
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
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name={campo.name}
                      checked={formData[campo.name] || false}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {campo.placeholder}
                  </label>
                ) : (
                  <input
                    type={campo.type}
                    name={campo.name}
                    placeholder={campo.placeholder}
                    value={formData[campo.name] || ""}
                    onChange={handleChange}
                    required={campo.required}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Guardar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
