import Filter from "../assets/filter.png";
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

interface Props {
  setFilters: (filters: { ens_estado: string; ens_fase: string }) => void;
}

export default function FilterEnsayosModal({ setFilters }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");
  const fases = ["Fase I", "Fase II", "Fase III", "Fase IV"];
  const [selectedFase, setSelectedFase] = React.useState("");
  const [selectedEstado, setSelectedEstado] = React.useState("");

  const backdrops = ["blur"];

  const handleOpen = (backdrop: string) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleApplyFilters = () => {
    setFilters({ ens_estado: selectedEstado, ens_fase: selectedFase });
    onClose();
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
            <img src={Filter} alt="Filtro" className="w-7 h-7" />
          </Button>
        ))}
      </div>

      <Modal className="rounded-md" backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="max-h-[90vh] min-w-[400px] relative z-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary font-bold">
                Filtro de Ensayos Clínicos
              </ModalHeader>
              <ModalBody className="flex flex-col overflow-auto gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Estado</label>
                  <select
                    value={selectedEstado}
                    onChange={(e) => setSelectedEstado(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
                  >
                    <option value="">Todos</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold">Fase</label>
                  <select
                    value={selectedFase}
                    onChange={(e) => setSelectedFase(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
                  >
                    <option value="">Todas</option>
                    {fases.map((fase) => (
                      <option key={fase} value={fase}>{fase}</option>
                    ))}
                  </select>
                </div>
              </ModalBody>
              <ModalFooter className="mr-4">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="secondary" onPress={handleApplyFilters}>
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}import Filter from "../assets/filter.png";
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

interface Props {
  setFilters: (filters: { ens_estado: string; ens_fase: string }) => void;
}

export default function FilterEnsayosModal({ setFilters }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");
  const fases = ["Fase I", "Fase II", "Fase III", "Fase IV"];
  const [selectedFase, setSelectedFase] = React.useState("");
  const [selectedEstado, setSelectedEstado] = React.useState("");

  const backdrops = ["blur"];

  const handleOpen = (backdrop: string) => {
    setBackdrop(backdrop);
    onOpen();
  };

  const handleApplyFilters = () => {
    setFilters({ ens_estado: selectedEstado, ens_fase: selectedFase });
    onClose();
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
            <img src={Filter} alt="Filtro" className="w-7 h-7" />
          </Button>
        ))}
      </div>

      <Modal className="rounded-md" backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="max-h-[90vh] min-w-[400px] relative z-0">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-primary font-bold">
                Filtro de Ensayos Clínicos
              </ModalHeader>
              <ModalBody className="flex flex-col overflow-auto gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-bold">Estado</label>
                  <select
                    value={selectedEstado}
                    onChange={(e) => setSelectedEstado(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
                  >
                    <option value="">Todos</option>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold">Fase</label>
                  <select
                    value={selectedFase}
                    onChange={(e) => setSelectedFase(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
                  >
                    <option value="">Todas</option>
                    {fases.map((fase) => (
                      <option key={fase} value={fase}>{fase}</option>
                    ))}
                  </select>
                </div>
              </ModalBody>
              <ModalFooter className="mr-4">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="secondary" onPress={handleApplyFilters}>
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
