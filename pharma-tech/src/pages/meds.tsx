import React, {useState} from "react";
import axios from "axios";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import DropDownSearch from "@/components/searchSelection";
import AddIcon from "../assets/add-icon.png";
import Print from "../assets/print-icon.png";
import NewMedDrawer from "@/components/AddMedsDrawer";
import TablaAPI from "@/components/tablaapi";

const columns = [
    { key: "IdMedicamento",           label: "ID" },
    { key: "Proveedor",       label: "Proveedor" },
    { key: "TipoMedicamento",     label: "Tipo" },
    { key: "Nombre",       label: "Nombre" },
    { key: "Descripcion",  label: "Descripción" },
    {
      key: "Estado",
      label: "Estado",
      render: (v: any) => (v ? "Activo" : "Inactivo"),
    },
    {
      key: "Controlado",
      label: "Controlado",
      render: (v: any) => (v ? "Sí" : "No"),
    },
    { key: "NivelRiesgo", label: "Nivel de Riesgo" },
  ];

export default function Meds(){
    const transformData = (data: any[]) => {
        return (data || []).map((item: any, idx: number) => ({
          // React necesita un key único por fila:
          key: item.IdMedicamento?.toString() || idx.toString(),
          // mantenemos las propiedades originales para que TablaAPI
          // acceda directamente con columns[i].key
          IdMedicamento: item.IdMedicamento,
          Proveedor:       item.Proveedor,
          TipoMedicamento: item.TipoMedicamento,
          Nombre:          item.Nombre,
          Descripción:     item["Descripción"],
          Estado:          item.Estado,
          Controlado:      item.Controlado,
          NivelRiesgo:     item.NivelRiesgo,
        }));
      };
    return(
        <div className="bg-red">
            <DefaultLayout>
                <h1 className="pb-8 m-20px text-texty text-3xl font-bold" >Medicamentos</h1>
                <div className="bg-surface pb-8 m-50px">
                    <div className="flex w-full md:flex-nowrap gap-4">
                        <DropDownSearch/>
                        
                    </div>  

                    <div className="flex flex-wrap gap-4 full ml-5 mt-4 ">
                        <div className="flex-1 min-w-[200px]">
                            <h2 className="mb-2">ID del Medicamento</h2>
                            <Input
                                    isReadOnly
                                    className="w-full mr-5"
                                    defaultValue=""
                                    label="ID Medicamento"
                                    type="meds"
                                    variant="bordered" 
                            />

                            </div>
                            
                            <div className="flex-1 min-w-[200px]">
                                <h2 className="mb-2">Nombre del Medicamento</h2>
                                <Input
                                    isReadOnly
                                    className="w-full mr-5"
                                    defaultValue=""
                                    label="Nombre del Medicamento"
                                    type="meds"
                                    variant="bordered"
                                />

                            </div>

                            <div className="flex-1 min-w-[200px]">
                            <h2 className="mb-2">Inspector</h2>
                            <Input
                                isReadOnly
                                className="w-full md:w-auto mr-5"
                                defaultValue=""
                                label="Inspector"
                                type="meds"
                                variant="bordered"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 full ml-5 mt-4 ">
                        <div className="flex-1 min-w-[200px]">
                            <h2 className="mb-2">Evenntos Adversos</h2>
                            <Input
                                    isReadOnly
                                    className="w-full mr-5"
                                    defaultValue=""
                                    label="Eventos Adversos"
                                    type="meds"
                                    variant="bordered" 
                            />

                            </div>
                            
                            <div className="flex-1 min-w-[200px]">
                                <h2 className="mb-2">Lote</h2>
                                <Input
                                    isReadOnly
                                    className="w-full mr-5"
                                    defaultValue=""
                                    label="Lote"
                                    type="meds"
                                    variant="bordered"
                                />

                            </div>

                            <div className="flex-1 min-w-[200px]">
                            <h2 className="mb-2">Tipo</h2>
                            <Input
                                isReadOnly
                                className="w-full md:w-auto mr-5"
                                defaultValue=""
                                label="Tipo"
                                type="meds"
                                variant="bordered"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 full ml-5 mt-4 ">
                        <div className="flex-1 min-w-[200px]">
                            <h2 className="mb-2">Estado</h2>
                            <Input
                                    isReadOnly
                                    className="w-full mr-5"
                                    defaultValue=""
                                    label="Estado"
                                    type="meds"
                                    variant="bordered" 
                            />

                            </div>
                            
                            <div className="flex-1 min-w-[200px]">
                                <h2 className="mb-2">Proveedor</h2>
                                <Input
                                    isReadOnly
                                    className="w-full mr-5"
                                    defaultValue=""
                                    label="Proveedor"
                                    type="meds"
                                    variant="bordered"
                                />

                            </div>

                            <div className="flex-1 min-w-[200px]">
                                <h2 className="mb-2">Entidad Reguladora</h2>
                                <Input
                                    isReadOnly
                                    className="w-full md:w-auto mr-5"
                                    defaultValue=""
                                    label="Entidad Reguladora"
                                    type="meds"
                                    variant="bordered"
                                />
                        </div>
                    </div>

                    <div className="p-5 self-center">
                        <Button className="shadow-md" color="secondary" radius="sm"><img src={AddIcon} alt="Agregar"/>Agregar</Button>
                    </div>
                    
                    <div className="mt-4 px-8">
          <TablaAPI
            endpoint="http://localhost:3000/api/Meds    "
            columns={columns}
            transformData={transformData}
          />
        </div>
      </div>

                <div className=" mt-8">
                    <div className=" flex justify-between items-center bg-surface px-8">
                        <h1 className="text-2xl font-bold">Resultados</h1>
                        <div className="flex items-center gap-4">
                            <div className="self-center">
                            <Button isIconOnly aria-label="Imprimir" className="bg-surface rounded-md">
                                <img src={Print} alt="Imprimir" className="w-8 h-8"></img>
                            </Button>
                            
                            </div>
                            <div className="p-5 self-center">
                                 <NewMedDrawer/>
                            </div>

                            
                                
                        </div>
                        
                    </div>
                    <div className="overflow-x-auto p-5 rounded-lg shadow-md bg-white">
                            <table className="w-full p-5text-left text-sm">
                                <thead className="bg-[#F9FAFB] border-b text-gray-600">
                                <tr>
                                    <th className="px-6 py-4">ID Medicamento</th>
                                    <th className="px-6 py-4">Nombre Medicamento</th>
                                    <th className="px-6 py-4">Tipo</th>
                                    <th className="px-6 py-4">Proveedor</th>
                                    <th className="px-6 py-4">Lote</th>
                                    <th className="px-6 py-4">Eventos Adversos</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Entidad Reguladora</th>
                                    <th className="px-6 py-4">Inspector</th>
                                    <th className="px-6 py-4">Editar</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    
                </div>

                

            </DefaultLayout>

            
        </div>
        
    );

}