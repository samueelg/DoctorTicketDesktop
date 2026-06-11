import { useEffect, useState } from "react";
import { usuariosService } from "../../services/usuarioService";

export default function UserData(){
  const [nome,setNome] = useState("");
  const [ramal,setRamal] = useState("");

  useEffect(()=>{
    getDadosUsuario();
  },[])

  async function getDadosUsuario(){
    try{
    const response = await usuariosService.me();
    
    if(response.status == 200){
      setNome(response.data.nome);
      setRamal(response.data.ramal);
    }

    }catch(error){
      console.log('Erro ao buscar dados do usuario: ', error)
    }
  }

  return(
    <div className="fixed bottom-4 right-4 z-50">
      <div className="px-3 py-2 text-sm text-gray-800">
        <div className="text-right uppercase">{nome}</div>
        <div className="text-right">{ramal}</div>
      </div>
    </div>
  );
}
