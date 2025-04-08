import DefaultLayout from "@/layouts/default";
import axios from "axios";
import React, { useState } from "react";
import TablaApi from "../components/tablaapi";


const columns = [
    {key: "pro_nombre", label: "Proveedor"},
    {key: "pro_ubicacion", label: "Ubicacion"},
    {key: "pro_historial", label: "Hisotrial"},
    {key: "proveedor_estado", label: "Estado"},
]

const rowsTransformData = (data: any[]) => {
    return data.map((item: any, index: number) => ({
        key: item.id?.toString() || index.toString(),
        pro_nombre: item.pro_nombre,
        pro_ubicacion: item.pro_ubicacion,
        pro_historial: item.pro_historial,
        proveedor_estado: item.proveedor_estado,
    }));
}
export default function Proveedores() {

    return ( 
        <DefaultLayout> 
          <TablaApi
            endpoint="http://localhost:3000/api/Provd"
            columns={columns}
            transformData={rowsTransformData} 
          />
        </DefaultLayout>
    )
}

