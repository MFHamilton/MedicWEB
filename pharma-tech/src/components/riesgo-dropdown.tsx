"use client"

import React, { useState } from "react"
import AddIcon from "../assets/add-icon.png"
import DropdownProveedor from "./proveedor-dropdown"
import DropdownMedType from "./medsType-dropdown"
import DropdownEstado from "./estado-dropdown"
import DropdownControl from "./control-dropdown"
import DropdownRiesgo from "./riesgo-dropdown"
import axios from "axios"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  Checkbox,
} from "@heroui/react"

export default function NewMedDrawer() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [backdrop] = useState("blur")

  // Estados para el formulario
  const [medNombre, setMedNombre] = useState("")
  const [medDescripcion, setMedDescripcion] = useState("")
  const [idProveedor, setIdProveedor] = useState<number | null>(null)
  const [idTipo, setIdTipo] = useState<number | null>(null)
  const [medEstado, setMedEstado] = useState<number | null>(null)
  const [medControlado, setMedControlado] = useState<number | null>(null)
  const [medRiesgo, setMedRiesgo] = useState<number | null>(null)

  const handleCreate = async (onClose: () => void) => {
    // Validar campos obligatorios
    if (!idProveedor || !idTipo || !medNombre || medEstado === null) {
      alert("Por favor completa los campos obligatorios.")
      return
    }
    const payload = {
      id_proveedor: idProveedor,
      id_tipo_medicamento: idTipo,
      med_nombre: medNombre,
      med_descripcion: medDescripcion,
      med_nivel_riesgos: medRiesgo,    // corregido: plural
      med_estado: medEstado,
      med_controlado: medControlado,
    }
    console.log("Enviando create Medicamento:", payload)
    try {
      const response = await axios.post(
        "http://localhost:3000/api/Medicamento",
        payload
      )
      console.log("Creación exitosa:", response.data)
      onClose()
    } catch (error: any) {
      console.error("Error creando medicamento:", error)
      alert(error.response?.data || error.message)
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <Button
          className="shadow-md"
          color="primary"
          radius="sm"
          onPress={onOpen}
        >
          <img src={AddIcon} alt="Agregar" />
          Nuevo Medicamento
        </Button>
      </div>
      <Drawer backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Medicamento Nuevo
              </DrawerHeader>
              <DrawerBody>
                <Input
                  label="Nombre del Medicamento"
                  radius="sm"
                  variant="bordered"
                  value={medNombre}
                  onChange={(e) => setMedNombre(e.target.value)}
                />
                <DropdownProveedor onSelect={setIdProveedor} />
                <DropdownMedType onSelect={setIdTipo} />
                <Input
                  label="Descripción del Medicamento"
                  radius="sm"
                  variant="bordered"
                  value={medDescripcion}
                  onChange={(e) => setMedDescripcion(e.target.value)}
                />
                <DropdownEstado onSelect={setMedEstado} />
                <DropdownControl onSelect={setMedControlado} />
                <DropdownRiesgo onSelect={setMedRiesgo} />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox classNames={{ label: "text-small" }}>
                    Opcional
                  </Checkbox>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="primary"
                  onPress={() => handleCreate(onClose)}
                >
                  Crear
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  )
}
