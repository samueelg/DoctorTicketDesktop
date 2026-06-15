import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import echo from "../../services/echo";

const LigacaoContext = createContext();

export function LigacaoProvider({ children }) {
    const [status, setStatus] = useState("wait");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        echo.channel("usuario.ramal.236")
            .listen(".ligacao.status", (e) => {
                console.log("status recebido: ", e);
                setStatus(e.status); // ajuste pro campo que vem no evento

                // redireciona para início se não estiver lá
                if (e.status == 'up' && location.pathname !== "/") {
                    navigate("/");
                }

                // redireciona para a tela de gravar audio
                if (e.status == 'hangup' && location.pathname !== "/gravar") {
                    navigate("/gravar");
                }
            });

        return () => {
            echo.leave("usuario.ramal.236");
        };
    }, [navigate, location.pathname]);

    return (
        <LigacaoContext.Provider value={{ status }}>
            {children}
        </LigacaoContext.Provider>
    );
}

export function useLigacao() {
    return useContext(LigacaoContext);
}
