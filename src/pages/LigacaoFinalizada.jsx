import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import Input from "../components/atoms/InputField";
import Textarea from "../components/atoms/Textarea";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ticketService } from "../services/ticketService";

export default function LigacaoFinalizada() {
    const location = useLocation();
    const dados = location.state?.data;
    const navigate = useNavigate();
    const [erro, setErro] = useState({});
    const [form, setForm] = useState({
        titulo: "",
        assunto: "",
        solicitante: "",
        unidade: "",
        categoria: 'Solicitação de serviço',
        status: 'Resolvido',
        urgencia: 'Baixa'
        });

    useEffect(() => {
        if (dados) {
            setForm({
                ...form,
                titulo: dados.titulo,
                assunto: dados.assunto,
                solicitante: dados.solicitante,
                unidade: dados.unidade,
            })
        }
    }, [dados]);

    async function handleSubmit(e) {
        e.preventDefault();

        const data = form;

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
                                <Input
                                    id='unidade'
                                    type='text'
                                    value={form.unidade}
                                    onChange={(e) => setForm({...form, unidade: e.target.value})}
                                    placeholder="Digite a Unidade"
                                    className='max-w-md'
                                    inputClassName='text-base'
                                />
                                <Input
                                    id='solicitante'
                                    type='text'
                                    value={form.solicitante}
                                    onChange={(e) => setForm({...form, solicitante: e.target.value})}
                                    placeholder="Digite o solicitante"
                                    className='max-w-md'
                                    inputClassName='text-base'
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