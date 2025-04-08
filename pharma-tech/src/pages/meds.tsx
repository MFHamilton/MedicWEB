import React, {useState} from "react";
import axios from "axios";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import DropDownSearch from "@/components/searchSelection";


export default function Meds(){
    return(
        <div className="bg-red">
            <DefaultLayout>
                <h1 className="pb-8 m-20px text-texty text-3xl font-bold" >Medicamentos</h1>
                <div className="bg-zinc-50 pb-8 m-50px">
                    <div className="flex w-full md:flex-nowrap gap-4">
                        <DropDownSearch/>
                        <Input className="mt-5 ml-5" label="Medicamentos" type="meds" />
                        <Button className="mt-5 ml-5 mr-5 self-center hover:bg-blue-500" color="primary">Buscar</Button>
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
                    
                </div>
            </DefaultLayout>
        </div>
        
    );

}