import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const toast = useRef(null);

    const showToast = (tipo, titulo, mensagem) => {
        toast.current?.show({
            severity: tipo,
            summary: titulo,
            detail: mensagem,
            life: 3000,
        });
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <Toast ref={toast}
                className="mt-10"
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    return useContext(ToastContext);
}