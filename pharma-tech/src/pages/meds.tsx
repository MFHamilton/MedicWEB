import React, {useState} from "react";
import axios from "axios";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";

export default function Meds(){
    return(
        <div className="bg-red-200 h-screen">
            <DefaultLayout/>
            <div className="flex flex-col items-center justify-center h-full">
                <h1 className="text-2xl font-bold mb-4">Buscar Medicamentos</h1>
                <Input placeholder="Medicamento" className="mb-4" />
                <Button color="primary">Buscar</Button>

            </div>

        </div>
    )

}