import { useEffect, useState } from "react";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/layout/LoadingScreen";
import { Toast } from "primereact/toast";
import { notificacaoService } from "../services/notificacaoService";
import { useLigacao } from "../components/context/LigacaoContext";


export default function Inicio() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { status } = useLigacao();
  const statusTexto = {
    'wait': 'Aguardando Ligação...',
    'ringing': 'Ramal tocando...',
    'up': 'Ligação em andamento...'
  }

return (
  
  <div className="inicio-page">
    <LoadingScreen visible={loading} />
    <div className="flex w-full h-screen relative bg-gray-50">

      {/* Conteúdo central */}
      <main className="flex-1"></main>

<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
  <div className="pointer-events-auto flex flex-col items-center gap-3">

    <PhoneIcon
      className={`h-28 w-28 text-gray-800 ${status === 'ringing' ? 'phone-ringing' : ''}`}
    />

    <p className="text-lg text-gray-600">
      {statusTexto[status]}
    </p>

  </div>
</div>
    </div>
  </div>
);


}