import { createContext, useContext, useEffect, useState } from "react";
import echo from "../../services/echo";
import { relatorioService } from "../../services/relatorioService";
import { useAuthStore } from "../../stores/authStore";

const RelatorioContext = createContext();

export function RelatorioProvider({ children }) {
    const [gerando, setGerando] = useState(false);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (!user?.id) return;

        const canal = `relatorios.usuario.${user.id}`;

        echo.private(canal)
            .listen(".relatorio.gerado", async (e) => {
                console.log("relatório gerado: ", e);

                //Em caso de erro, tira o setGerando
                if (e.erro) {
                    console.log("falha ao gerar relatório: ", e.erro);
                    setGerando(false);
                    return;
                }

                try {
                    await baixarRelatorio(e.nome, e.mime);
                } catch (err) {
                    console.log("erro ao baixar relatório: ", err);
                } finally {
                    setGerando(false);
                }
            });

        return () => {
            echo.leave(canal);
        };
    }, [user?.id]);

    // Dispara a geração na API
    async function exportarRelatorio(form, tipo) {
        try {
            setGerando(true);
            await relatorioService.exportarRelatorio({
                data: (form.data ?? []).filter(Boolean).map((d) => d.toISOString()),
                filtro: form.filtro,
                tipo,
                usuario: form.usuario,
            });
        } catch (err) {
            console.log("erro ao exportar relatório: ", err);
            setGerando(false);
        }
    }

    // Baixa o arquivo já gerado e força o download no navegador.
    async function baixarRelatorio(nome, mime) {
        const response = await relatorioService.downloadRelatorio(nome);

        const blob = new Blob([response.data], { type: mime });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = nome;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
    }

    return (
        <RelatorioContext.Provider value={{ gerando, exportarRelatorio }}>
            {children}
        </RelatorioContext.Provider>
    );
}

export function useRelatorio() {
    return useContext(RelatorioContext);
}
