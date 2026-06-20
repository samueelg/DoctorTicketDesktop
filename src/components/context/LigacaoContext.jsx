import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import echo from "../../services/echo";
import { useAuthStore } from "../../stores/authStore";

const LigacaoContext = createContext();

export function LigacaoProvider({ children }) {
    const [status, setStatus] = useState("wait");
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAuthStore((state) => state.user);
    

    useEffect(() => {
        setStatus("wait");
    }, [location.pathname]);

    useEffect(() => {
        echo.private(`usuario.ramal.${user?.ramal}`)
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
            echo.leave(`usuario.ramal.${user?.ramal}`);
        };
    }, [navigate, location.pathname, user?.ramal]);

    return (
        <LigacaoContext.Provider value={{ status }}>
            {children}
        </LigacaoContext.Provider>
    );
}

export function useLigacao() {
    return useContext(LigacaoContext);
}
