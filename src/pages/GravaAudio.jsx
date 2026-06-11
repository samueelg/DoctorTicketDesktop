import { useRef, useState } from "react";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/layout/LoadingScreen";
import { Toast } from "primereact/toast";
import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/outline";
import { ligacaoService } from "../services/ligacaoService";

export default function GravaAudio() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const toast = useRef(null);
  const chunksRef = useRef([]);
  
  async function iniciaGravacao(e) {
    e.preventDefault();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        enviaAudio(blob);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error("Erro ao acessar microfone:", err);
    }
  }

  function finalizaGravacao() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }

  async function enviaAudio(blob){
    try{
      const formData = new FormData();
      formData.append('audio', blob, 'gravacao.webm');

      const response = await ligacaoService.transcrever(formData);
      const data = response.data

      if(response.status == 200){
        navigate('/ligacaoFinalizada', {
          state: { data }
        });
      }
    }catch(err){
      navigate('/');
      console.log('Erro ao transcrever ligação: ', err);
    }
  }

  return (

    <div className="inicio-page">
      <Toast ref={toast} />
      <LoadingScreen visible={loading} />
      <div className="flex w-full h-screen relative">

        {/* Conteúdo central */}
        <main className="flex-1"></main>

        {/* Overlay central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="text-xl font-semibold">Gravação de Áudio</span>
            <span className="text-sm text-gray-500 w-80 text-center mb-4">Em poucas palavras diga o assunto da ligação, seu nome, o solicitante e a unidade...</span>
            <div className="flex items-center justify-center">
                <Button
                  text=""
                  type="button"
                  variant="none"
                  onClick={(e) => {
                    if(isRecording){
                      finalizaGravacao();
                    }else{
                      iniciaGravacao(e);
                    }
                  }}
                  buttonClassName={`
                    ${isRecording ? "bg-red-600 animate-pulse" : "bg-black hover:scale-105"}
                    rounded-full
                    p-10
                    shadow-lg
                    transition
                    `}
                    icon={isRecording ? (<StopIcon className="h-16 w-16 text-white" />) : (<MicrophoneIcon className="h-16 w-16 text-white" />)}
                />
            </div>
              {(isRecording)
              ? <p className="text-xs text-gray-500 mt-2">Gravando...</p> 
              : <p className="text-xs text-gray-500 mt-2">Toque para começar</p>
              }
          </div>
        </div>
      </div>
    </div>
  );


}