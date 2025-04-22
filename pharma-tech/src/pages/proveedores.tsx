import React, { useState } from "react";
import DefaultLayout from "@/layouts/default";
import TablaApi from "../components/tablaapi";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import NewProvDrawer from "@/components/AddProvDrawer";

// Columnas de la tabla
const columns = [
  { key: "pro_nombre", label: "Proveedor" },
  { key: "pro_ubicacion", label: "Ubicación" },
  { key: "pro_historial", label: "Historial" },
  { key: "proveedor_estado", label: "Estado" },
];

export default function Proveedores() {
  const [searchTerm, setSearchTerm] = useState("");
  const variants = ["faded"]
  const colors = ["primary"]
  const radius = [ "sm"];

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
        <div className="rounded-md w-80 flex flex-col gap-4 ">
          {variants.map((variant) => 
            colors.map((color) => 
              radius.map((r) => (
                <div key={`${variant}-${color}-${r}`}>
                  <Input 
                    label={"Buscar proveedores"} 
                    type="email" 
                    variant={variant} 
                    color={color} 
                    radius={r}
                    startContent={<Search size={18}/>}
                    />
                </div>
              
              ))
            )
          )}
        </div>
        
        

        {/* Botón nuevo proveedor */}
        <div>
          <NewProvDrawer/>
        </div>
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
