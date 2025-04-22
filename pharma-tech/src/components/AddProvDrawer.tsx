import React from "react";
import AddIcon from "../assets/add-icon.png";
import DropdownProveedor from "./proveedor-dropdown";
import DropdownMedType from "./medsType-dropdown";
import DropdownEstado from "./estado-dropdown";
import DropdownControl from "./control-dropdown";
import DropdownRiesgo from "./riesgo-dropdown";
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
  Link,
} from "@heroui/react";


export default function NewProvDrawer() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("blur");

  const backdrops = ["blur"];

  const handleBackdropChange = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      <div className="flex gap-2">
        {backdrops.map((backdrop) => (
          <Button
            key={backdrop}
            className="shadow-md" color="primary" radius="sm"
            onPress={() => handleBackdropChange(backdrop)}
          >
            <img src={AddIcon} alt="Agregar"/>
            Nuevo Proveedor
          </Button>
        ))}
      </div>
      <Drawer backdrop={backdrop} isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Proveedor Nuevo</DrawerHeader>
              <DrawerBody>
                <Input
                  label="Nombre del Proveedor"
                  radius="sm"
                  variant="bordered"
                />
                <Input
                  label="Ubicación del Proveedor"
                  radius="sm"
                  variant="bordered"
                />
                <DropdownEstado/>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Para que no se vea tan vacio
                  </Checkbox>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Crear
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

