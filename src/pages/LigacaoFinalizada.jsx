import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/InputField";
import Textarea from "../components/atoms/Textarea";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ticketService } from "../services/ticketService";
import { unidadeService } from "../services/unidadeService";
import { franqueadoService } from "../services/franqueadoService";
import { AutoComplete } from 'primereact/autocomplete';
import Select from "../components/atoms/Select";

export default function LigacaoFinalizada() {
    const location = useLocation();
    const dados = location.state?.data;
    const navigate = useNavigate();
    const [erro, setErro] = useState({});
    const [items, setItems] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [form, setForm] = useState({
        titulo: "",
        assunto: "",
        solicitante: "",
        unidade: "",
        categoria: 'Solicitação de serviço',
        status: 'Resolvido',
        urgencia: 'Baixa'
        });

    const pesquisarFranqueado = async (event) => {
        const termo = event.query;

        const response = await franqueadoService.get({
                termo: termo,
                limit: 20
        });

        setItems(response.data);
    };

    async function getUnidades(){
        try {
            //Busca as unidades
            const response = await unidadeService.get();

            if (response.status == 200) {
                setUnidades(response.data.data)
            }
        } catch (err) {
            const errosApi = err.response?.data?.errors || {};
            setErro(errosApi);
            console.log('erros: ', erro);
        }
    }
    
    useEffect(() => {
        getUnidades();
    }, []);

    useEffect(() => {
        if (dados) {
            setForm(prev => ({
                ...prev,
                titulo: dados.titulo,
                assunto: dados.assunto,
                solicitante: dados.solicitante,
                unidade: dados.unidade,
            }))
        }
    }, [dados]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            ...form,
            solicitante: form.solicitante?.idMovidesk,
        };

        try {
            //Cria o ticket
            const response = await ticketService.create(data);

            if (response.status == 201) {
                //Retorna para o inicio
                navigate('/');
            }
        } catch (err) {
            const errosApi = err.response?.data?.errors || {};
            setErro(errosApi);
            console.log('erros: ', erro);
        }
    }

    return (
        <div className="ligacaoFinalizada-page">
            <div className="flex w-full min-h-screen justify-center items-center">
                    <div className="w-full max-w-md">
                        <div className="row">
                            <div className="flex flex-row justify-center">
                                <h2 className="font-semibold">Ligação Finalizada</h2>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <div className="flex items-center gap-3">
                            <CheckCircleIcon className="h-16 w-16 text-green-500" />
                            <h2 className="text-xl">
                                Chamada concluída<br></br>com Sucesso
                            </h2>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <Input
                                id='titulo'
                                type='text'
                                value={form.titulo}
                                onChange={(e) => setForm({...form, titulo: e.target.value})}
                                placeholder="Digite o titulo da solicitação"
                                className='max-w-md'
                                inputClassName='text-base'
                            />
                        </div>
                        <div className="row mt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <Select 
                                    value={form.unidade} 
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
                                            unidade: e.value
                                        }))
                                    }
                                    options={unidades} 
                                    optionLabel="nomeUnidade" 
                                    optionValue="id"
                                    editable={true}
                                    placeholder="Unidade" 
                                    className="w-full flex items-center mt-1" 
                                    selectClassName="
                                        h-[38px] 
                                        border
                                        border-gray-300
                                        hover:bg-gray-100
                                        focus-within:ring-2
                                        focus-within:ring-green-500
                                "/>

                                <AutoComplete
                                    value={form.solicitante}
                                    suggestions={items}
                                    completeMethod={pesquisarFranqueado}
                                    placeholder="Digite o solicitante"
                                    field="email"
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
                                            solicitante: e.value
                                        }))
                                    }
                                    className="w-full flex items-center mt-1"
                                    inputClassName="
                                        h-[38px]
                                        w-full
                                        rounded-md
                                        border
                                        border-gray-300
                                        px-3
                                        py-2
                                        text-sm
                                        hover:bg-gray-100
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-green-500
                                    "
                                    itemTemplate={(item) => (
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{item.nome}</span>
                                            <span className="text-sm text-gray-500">
                                                {item.email}
                                            </span>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                        <Textarea
                            id='assunto'
                            value={form.assunto}
                            onChange={(e) => setForm({...form, assunto: e.target.value})}
                            placeholder="Digite a mensagem da solicitação"
                            rows={6}
                        />
                    </div>
                    <div className="flex w-full justify-end">
                        <div className="flex w-full gap-2 justify-end">
                            <Button
                                type="button"
                                text="Criar solicitação"
                                className="mt-6 w-1/2"
                                onClick={handleSubmit}
                                buttonClassName="w-full rounded-2xl"
                            />
                            <Button
                                type="button"
                                text="Editar"
                                className="mt-6 w-1/4"
                                buttonClassName="w-full rounded-2xl bg-gray-200 hover:bg-gray-300 text-green-700"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}