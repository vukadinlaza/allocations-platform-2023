import { Card } from "@tremor/react"
import { AppProps } from "next/app"
import { ReactNode } from "react"

interface ModalWrapperProps {
    children: ReactNode;
    open: boolean;
    // props: AppProps;
}

export default function ModalWrapper({ children, open }: ModalWrapperProps) {

    return (
        <>
          {open && <Card>{children}</Card>}
        </>
    )
}