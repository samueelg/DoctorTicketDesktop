import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

const MENSAGENS = ["Carregando...", "Transcrevendo...", "Processando..."];

export default function LoadingScreen({ visible }) {
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    if (!visible) {
      setIndice(0);
      return;
    }

    const intervalo = setInterval(() => {
      setIndice((prev) => (prev + 1) % MENSAGENS.length);
    }, 3000);

    return () => clearInterval(intervalo);
  }, [visible]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
      style={{ pointerEvents: visible ? "all" : "none" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        <AnimatePresence mode="wait">
          <motion.p
            key={indice}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            {MENSAGENS[indice]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
