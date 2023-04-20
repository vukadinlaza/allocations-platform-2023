import { Dialog } from "@headlessui/react";
import { Card } from "@tremor/react"
import { AppProps } from "next/app"
import { ReactNode, useState } from "react"

interface ModalWrapperProps {
    children: ReactNode;
    open: boolean;
}

export default function ModalWrapper({ children, open }: ModalWrapperProps) {
    let [isOpen, setIsOpen] = useState(true)

    return (
        <>
        {open &&
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <Dialog.Panel>
            <Card>{children}</Card>

            <button onClick={() => setIsOpen(false)}>Deactivate</button>
            <button onClick={() => setIsOpen(false)}>Cancel</button>
            </Dialog.Panel>
         </Dialog>}
        </>
    )
}