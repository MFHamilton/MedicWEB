import Filter from "../assets/filter.png";
import DropdownProveedor from "./proveedor-dropdown";
import DropdownMedType from "./medsType-dropdown";
import DropdownEstado from "./estado-dropdown";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
  } from "@heroui/react";

export default function FilterButton(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
      <>
        <Button className="bg-surface" onPress={onOpen}>
            <img src={Filter} alt="Imprimir" className="w-7 h-7"></img>
        </Button>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-none gap-1">Filtrar</ModalHeader>
                <ModalBody className="">
                    <p className="font-semibold">Proveedores</p>
                    <DropdownProveedor/>
                    <p className="font-semibold">Tipos de Medicamento</p>
                    <DropdownMedType/>
                    <p>Estado</p>
                    <DropdownEstado/>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="secondary" onPress={onClose}>
                    Aceptar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
}