import { BellIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from 'primereact/badge';
import Button from "../atoms/Button";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import echo from "../../services/echo";
import { notificacaoService } from "../../services/notificacaoService";
import { useToast } from "../context/ToastContext";
import { motion, AnimatePresence } from "motion/react";
import somNotificacao from "../../assets/sounds/notificacao.mp3";
import { useAuthStore } from "../../stores/authStore";

export function Notificacao() {
    const op = useRef(null);
    const audioRef = useRef(new Audio(somNotificacao));
    const [notificacoes, setNotificacoes] = useState([]);
    const [erro, setErro] = useState();
    const qtdeNotificacoes = notificacoes.filter(n => !n.lida_em).length;
    const { showToast } = useToast();
    const userId = useAuthStore((state) => state.user?.id);
    const panelVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: -10
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            staggerChildren: 0.05
        }
    }
};
const notificationVariants = {
    hidden: {
        opacity: 0,
        x: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
            duration: 0.2
        }
    },
    exit: {
        opacity: 0,
        x: 50,
        transition: {
            duration: 0.15
        }
    }
};

    function abreOverlay(e) {
        op.current?.toggle(e);
    }

    async function lerNotificacao(notificacao){
        try{
            if(notificacao.lida_em){
                return;
            }

            const response = await notificacaoService.ler(notificacao.id)

            if(response.status == 200 && response.data.success){
                carregarNotificacoes();
            }

        }catch(err){
            setErro(err);
            console.log(err)
        }
    }

    async function marcarTodasComoLidas(){
        try{
            if(qtdeNotificacoes === 0){
                return;
            }

            const response = await notificacaoService.lerTodas();

            if(response.status == 200 && response.data.success){
                carregarNotificacoes();
            }

        }catch(err){
            setErro(err);
            console.log(err);
        }
    }

    async function removeNotificacao(notificacao){
        try{
            const idNotificacao = notificacao.id;

            //TODO - Adicionar debounce para enviar varias de uma vez
            const response = await notificacaoService.remover(idNotificacao);
        
            if(response.status == 200){
                carregarNotificacoes();
            }
        }catch(error){
            setErro(error);
            console.log(error);
        }
    }

    async function carregarNotificacoes() {
        try {

            const response = await notificacaoService.listar();

            setNotificacoes(response.data.data);

        } catch (error) {
            setErro(error);
            console.error('Erro ao carregar notificações', error);
        }
    }

    useEffect(() => {

        carregarNotificacoes();

        if (!userId) return;

        echo.private(`usuario.${userId}`)
            .listen('.notificacao.criada', (e) => {
                setNotificacoes(prev => [
                    e,
                    ...prev
                ]);

                const exibeNotificacoes = useAuthStore.getState().user?.exibeNotificacoes;
                if (!exibeNotificacoes) return;

                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(err => console.warn('Não foi possível tocar o som', err));

                showToast('info', 'Nova Notificação', 'Notificação adicionada');
            });

        return () => {
            echo.leave(`usuario.${userId}`);
        };
    }, [userId]);

    return (
        <div className="flex justify-end pr-4 pt-4 bg-gray-50">
            <Button
                variant="none"
                buttonClassName="p-overlay-badge relative p-0"
                icon={<BellIcon className="h-8 w-8" />}
                onClick={abreOverlay}
            >
            
            {(qtdeNotificacoes > 0) ?
            <Badge
                className="!text-xs !min-w-5 !h-5 flex items-center justify-center pointer-events-none"
                severity="danger"
                value={qtdeNotificacoes}
            />
            : ''}
            </Button>

            <OverlayPanel
    ref={op}
    className="w-72 p-0 overflow-hidden"
>
    <div className="bg-white rounded-lg w-full">

        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b">
            <h2 className="text-base font-semibold text-gray-800">
                Notificações
            </h2>

            <button
                onClick={marcarTodasComoLidas}
                disabled={qtdeNotificacoes === 0}
                className="text-xs font-medium text-gray-600 hover:text-black transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
                ✓ Marcar todas
            </button>
        </div>

        {/* Lista com scroll */}
        <div className="divide-y max-h-80 overflow-y-auto">
<motion.div
    variants={panelVariants}
    initial="hidden"
    animate="visible"
    className="divide-y max-h-80 overflow-y-auto overflow-x-hidden"
>
    <AnimatePresence mode="popLayout">

        {notificacoes.map((n) => (
            <motion.div
                key={n.id}
                layout
                variants={notificationVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{
                    x: 2,
                    transition: { duration: 0.1 }
                }}
                onClick={() => lerNotificacao(n)}
            >
                <button className="w-full text-left px-3 py-1 hover:bg-gray-50 transition">

                    <div className={n.lida_em ? "" : "flex gap-2 w-full"}>

                        {!n.lida_em && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-gray-900 mt-1.5 shrink-0"
                            />
                        )}

                        <div className="w-full">
                            <div className="flex justify-between items-center">

                                <p className="text-sm font-medium text-gray-900">
                                    {n.titulo}
                                </p>

                                <Button
                                    icon={<XCircleIcon className="h-5 w-5" />}
                                    variant="none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeNotificacao(n);
                                    }}
                                />
                            </div>

                            <p
                                className={`text-sm ${
                                    n.lida_em
                                        ? "text-gray-500"
                                        : "text-blue-500"
                                }`}
                            >
                                {n.mensagem}
                            </p>

                            <span className="text-xs text-gray-400">
                                {n.tempo}
                            </span>
                        </div>
                    </div>

                </button>
            </motion.div>
        ))}

    </AnimatePresence>
</motion.div>
        </div>
    </div>
</OverlayPanel>
        </div>
    );
}