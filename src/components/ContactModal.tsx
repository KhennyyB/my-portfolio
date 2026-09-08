import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import ContactSection from "./ContactSection";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; returnFocus: () => void };

export default function ContactModal({ open, onOpenChange, returnFocus }: Props) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="pe-modal-overlay" />
      <Dialog.Content className="portfolio-experience pe-contact-modal" data-lenis-prevent
        onCloseAutoFocus={event => { event.preventDefault(); returnFocus(); }}>
        <Dialog.Title className="pe-modal-title">Get in touch</Dialog.Title>
        <Dialog.Description className="pe-modal-description">Have a project or opportunity in mind? Send me a message.</Dialog.Description>
        <ContactSection compact />
        <Dialog.Close className="pe-modal-close" aria-label="Close contact form"><X /></Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
