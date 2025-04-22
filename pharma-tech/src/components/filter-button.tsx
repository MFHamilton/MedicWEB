// components/FilterButton.tsx

import React, { useState } from "react";
import FilterIcon from "../assets/filter.png";
import DropdownProveedor from "./proveedor-dropdown";
import DropdownMedType from "./medsType-dropdown";
import DropdownEstado from "./estado-dropdown";
import DropdownControl from "./control-dropdown";
import DropdownRiesgo from "./riesgo-dropdown";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export type Filters = {
  proveedorId?: number;
  tipoId?: number;
  estadoId?: number;
  controlId?: number;
  riesgoId?: number;
};

export interface FilterButtonProps {
  /**
   * Se invoca cuando el usuario pulsa “Aceptar” en el modal,
   * con los IDs seleccionados de cada dropdown.
   */
  onApply: (filters: Filters) => void;
}

export default function FilterButton({ onApply }: FilterButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop] = useState<"blur">("blur");

  // estados internos para cada filtro
  const [proveedorId, setProveedorId] = useState<number | null>(null);
  const [tipoId, setTipoId] = useState<number | null>(null);
  const [estadoId, setEstadoId] = useState<number | null>(null);
  const [controlId, setControlId] = useState<number | null>(null);
  const [riesgoId, setRiesgoId] = useState<number | null>(null);

  const handleApply = () => {
    onApply({
      proveedorId: proveedorId ?? undefined,
      tipoId:      tipoId      ?? undefined,
      estadoId:    estadoId    ?? undefined,
      controlId:   controlId   ?? undefined,
      riesgoId:    riesgoId    ?? undefined,
    });
    onClose();
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-surface rounded-md p-2 shadow-md"
      >
        <img src={FilterIcon} alt="Filtros" className="w-7 h-7" />
      </Button>

      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="max-h-[90vh]">
          {(onCloseInner) => (
            <>
              <ModalHeader className="font-bold text-primary">
                Filtros
              </ModalHeader>
              <ModalBody className="flex flex-col gap-4 overflow-auto">
                <div>
                  <p className="font-bold mb-1">Proveedor</p>
                  <DropdownProveedor onSelect={setProveedorId} />
                </div>

                <div>
                  <p className="font-bold mb-1">Tipo de Medicamento</p>
                  <DropdownMedType onSelect={setTipoId} />
                </div>

                <div>
                  <p className="font-bold mb-1">Estado</p>
                  <DropdownEstado onSelect={setEstadoId} />
                </div>

                <div>
                  <p className="font-bold mb-1">Controlado</p>
                  <DropdownControl onSelect={setControlId} />
                </div>

                <div>
                  <p className="font-bold mb-1">Riesgo</p>
                  <DropdownRiesgo onSelect={setRiesgoId} />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end gap-2">
                <Button color="danger" variant="light" onPress={onCloseInner}>
                  Cerrar
                </Button>
                <Button color="secondary" onPress={handleApply}>
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
