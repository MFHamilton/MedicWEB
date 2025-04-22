
import Filter from "../assets/filter.png";
import DropdownInspectores from "./inspectores-dropdown";
import DropdownEntidadReguladora from "./InspectorEntidadReguladora-dropdown"
import DropdownEstadoInspector from "./estado-Inspector-filtro"
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

export default function FilterButtonInspecciones() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [backdrop, setBackdrop] = React.useState<"blur" | "transparent" | "opaque">("blur");

  // 👇 Aquí le damos el tipo directamente al array para que infiera correctamente
  const backdrops: Array<"blur" | "transparent" | "opaque"> = ["blur"];

  // 👇 Le damos tipo explícito al parámetro
  const handleOpen = (backdrop: "blur" | "transparent" | "opaque") => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {backdrops.map((b) => (
          <Button
            key={b}
            onPress={() => handleOpen(b)}
            className="bg-surface rounded-md p-2 shadow-md"
          >
            <img src={Filter} alt="Imprimir" className="w-7 h-7" />
          </Button>
        ))}
      </div>

      <Modal className="rounded-md" backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="max-h-[90vh] relative z-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary font-bold">Filtros</ModalHeader>
              <ModalBody className="flex flex-col overflow-auto gap-4">
                <p className="font-bold mb-1">Inspectores</p>
                <DropdownInspectores />
                
                <p className="font-bold mb-1">Entidad Reguladora</p>
                <DropdownEntidadReguladora />

                <p className="font-bold mb-1">Estado</p>
                <DropdownEstadoInspector />
              </ModalBody>
              <ModalFooter className="mr-4">
                <Button color="danger" variant="light" onPress={onClose}>
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
