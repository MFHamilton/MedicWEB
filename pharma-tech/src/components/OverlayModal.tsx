// components/OverlayModal.tsx
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
  
  interface OverlayModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }
  
  export default function OverlayModal({ isOpen, onClose, title, children }: OverlayModalProps) {
    return (
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="text-xl font-bold text-primary">{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  