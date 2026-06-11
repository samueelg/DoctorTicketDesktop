import { motion } from "motion/react"

export default function LoadingScreen({ visible }) {
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
        <p>Carregando...</p>
      </div>
    </motion.div>
  );
}