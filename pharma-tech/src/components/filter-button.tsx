import Filter from "../assets/filter.png";
import DropdownProveedor from "./proveedor-dropdown";
import DropdownMedType from "./medsType-dropdown";
import DropdownEstado from "./estado-dropdown";
import DropdownControl from "./control-dropdown";
import DropdownRiesgo from "./riesgo-dropdown";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function FilterButton(){
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  const backdrops = ["blur"];

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 ">
        {backdrops.map((b) => (
          <Button
            key={b}
            onPress={() => handleOpen(b)}
            className="bg-surface rounded-md p-2 shadow-md"
          >
            <img src={Filter} alt="Imprimir" className="w-7 h-7"></img>
          </Button>
        ))}
      </div>
      <Modal className="rounded-md" backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="max-h-[90vh]  relative z-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary font-bold">Filtros</ModalHeader>
              <ModalBody className="flex flex-col overflow-auto gap-4">
                <p className="font-bold mb-1">Proveedores</p>
                <DropdownProveedor/>
                <p className="font-bold mb-1">Tipo de Medicamento</p>
                <DropdownMedType/>
                <p className="font-bold mb-1">Estado</p>
                <DropdownEstado/>
                <p className="font-bold mb-1">Control</p>
                <DropdownControl/>
                <p className="font-bold mb-1">Riesgo del Medicamento</p>
                <DropdownRiesgo/>
              </ModalBody>
              <ModalFooter className="">
                <Button color="danger" variant="light" onPress={onClose} >
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
  );
}