import Filter from "../assets/filter.png";
import DropdownInspector from "./proveedor-dropdown";
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
                <ModalHeader className="flex flex-col gap-1">Filtro</ModalHeader>
                <ModalBody>
                  <Input
                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Sign in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    )
}