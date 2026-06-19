import Button from "../components/atoms/Button";
import Select from "../components/atoms/Select";
import InputField from "../components/atoms/InputField";
import { DocumentIcon, FunnelIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { relatorioService } from "../services/relatorioService";
import { Calendar } from 'primereact/calendar';
import { Skeleton } from 'primereact/skeleton';
import { useEffect, useState } from "react";
import { addLocale } from 'primereact/api';
import { usuariosService } from '../services/usuarioService';
import { useRelatorio } from "../components/context/RelatorioContext";

export default function RelatorioBase(){
    const [form, setForm] = useState({
        data: "",
        filtro: "",
        usuario: "",
    });

    const [mostraResultados, setMostraResultado] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [resultado, setResultado] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const { gerando, exportarRelatorio } = useRelatorio();

    useEffect(() => {
        getUsuarios();
    },[]);

    const formatarDataHora = (valor) => {
        if (!valor) return 'Não retornado';
        const data = new Date(valor);
        if (isNaN(data.getTime())) return 'Não retornado';
        return data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    // Config Calendario
    addLocale('pt-BR', {
    firstDayOfWeek: 0,
    dayNames: [
        'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado'
    ],
    dayNamesShort: [
        'dom',
        'seg',
        'ter',
        'qua',
        'qui',
        'sex',
        'sáb'
    ],
    dayNamesMin: [
        'D',
        'S',
        'T',
        'Q',
        'Q',
        'S',
        'S'
    ],
    monthNames: [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ],
    monthNamesShort: [
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez'
    ],
    today: 'Hoje',
    clear: 'Limpar'
    });

    async function buscarRelatorio(e) {
        e.preventDefault();

        const intervalo = (form.data ?? []).filter(Boolean);
        if (intervalo.length < 2) {
            console.log('Selecione um intervalo de datas completo.');
            return;
        }

        //Dados de filtro e data
        const data = {
            data: intervalo.map(d => d.toISOString()),
            filtro: form.filtro,
            usuario: form.usuario,
        };

        try {
            setMostraResultado(true);
            setCarregando(true);
            setResultado(null);
            const response = await relatorioService.getTicketsChat(data);

            if (response.status == 200) {
                setResultado(response.data);
            }
        } catch (err) {
            console.log('erros: ', err);
        } finally {
            setCarregando(false);
        }
    }

    async function getUsuarios(){
        try {
            const response = await usuariosService.list();

            if (response.status == 200) {
                setUsuarios(response.data.data);
            }
        } catch (err) {
            console.log('erros: ', err);
        }
    }

    return (
        <div className="relatorio-base-page">
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto w-full max-w-2xl px-6 p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold">Relatório</h1>
                    </div>
                    <div className="space-y-4">
                        <section className="rounded-2xl p-3 bg-white shadow-sm">
                            <div className="border-b mb-4 flex items-center">
                                <FunnelIcon className="h-6 w-6 text-green-500" />
                                <h1 className="text-xl">Filtros</h1>
                            </div>
                            {/* Inputs */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="max-w-sm">
                                    <label htmlFor="dataBusca">Data Busca:</label>
                                <Calendar 
                                    id="dataBusca"
                                    value={form.data} 
                                    onChange={(e) => setForm({ data: e.value, filtro: form.filtro})}
                                    placeholder="dd/mm/aaaa - dd/mm/aaaa" 
                                    selectionMode="range" 
                                    locale="pt-BR"
                                    dateFormat="dd/mm/yy" 
                                    readOnlyInput 
                                    hideOnRangeSelection 
                                    className="w-full"
                                    inputClassName="w-full h-10"
                                />
                                </div>
                                
                                <Select
                                    name={'filtro'}
                                    label={'Filtro:'}
                                    value={form.filtro}
                                    onChange={(e) => setForm(prev => ({
                                        ...prev,
                                        filtro: e.value, data: form.data
                                        }))
                                    }
                                    options={[
                                        {value: "1", label: "Chats WhatsApp"},
                                    ]}
                                    selectClassName="h-10"
                                />
                            </div>
                            <div className="mx-auto mt-4 mb-2">
                                <Select
                                    name={'usuario'}
                                    label={'Usuário'}
                                    value={form.usuario} 
                                    optionLabel="nome" 
                                    optionValue="id"
                                    showClear={true}
                                    onChange={(e) =>
                                        setForm(prev => ({
                                            ...prev,
                                            usuario: e.value
                                        }))
                                    }
                                    options={usuarios}
                                    placeholder={'Digite o nome do usuário'}
                                    selectClassName="
                                        h-[38px] 
                                        border
                                        border-gray-300
                                        hover:bg-gray-100
                                        focus-within:ring-2
                                        focus-within:ring-green-500
                                "
                                />
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-4 py-2 gap-1">
                                <div className="col-span-3">
                                <Button
                                    text={'Buscar'}
                                    buttonClassName="w-full h-8 rounded-2xl shadow-sm"
                                    onClick={(e) => buscarRelatorio(e)}
                                />
                                </div>
                                <div className="col-span-1">
                                <Button
                                    text={'Limpar'}
                                    className="w-full"
                                    variant="outline"
                                    buttonClassName="w-full h-8 rounded-2xl shadow-sm font-semibold"
                                />
                                </div>
                            </div>
                        </section>

                        {mostraResultados && (
                        <section className="rounded-2xl p-3 bg-white shadow-sm">
                            <div className="mb-4 flex justify-between">
                                <h1 className="text-xl">Dados Encontrados</h1>
                                <div className="gap-2 flex">
                                    <Button
                                        icon={<TableCellsIcon  className="h-5 w-5"/>}
                                        text={gerando ? 'Gerando...' : 'Excel'}
                                        disabled={gerando}
                                        buttonClassName="rounded-2xl p-1.5 bg-blue-300 hover:bg-blue-500"
                                        onClick={() => exportarRelatorio(form, 'excel')}
                                    />
                                    <Button
                                        icon={<DocumentIcon  className="h-5 w-5"/>}
                                        text={gerando ? 'Gerando...' : 'PDF'}
                                        disabled={gerando}
                                        buttonClassName="rounded-2xl p-1.5 bg-green-400"
                                        onClick={() => exportarRelatorio(form, 'pdf')}
                                    />
                                </div>
                            </div>
                        
                        <div className="" id="tickets">
                        {carregando ? (
                            Array.from({ length: 3 }).map((_, i) => (
                            <div className="rounded-xl border m-4 p-3 bg-white shadow-md" key={`skeleton-${i}`}>
                                <div className="flex flex-cols gap-4 items-center">
                                    <Skeleton width="3rem" height="0.75rem" />
                                    <Skeleton width="4rem" height="1.5rem" borderRadius="0.75rem" />
                                </div>
                                <div className="mt-2">
                                    <Skeleton width="70%" height="1.25rem" />
                                </div>
                                <div className="mt-2">
                                    <Skeleton width="50%" height="0.875rem" />
                                </div>
                                <div className="mt-1">
                                    <Skeleton width="50%" height="0.875rem" />
                                </div>
                                <div className="mt-1">
                                    <Skeleton width="40%" height="0.875rem" />
                                </div>
                            </div>
                            ))
                        ) : resultado && resultado.length > 0 ? (
                            resultado.map(ticket =>(
                            <div id="dataTicket" className="rounded-xl border m-4 p-3 bg-white shadow-md" key={ticket.id}>
                                <div className="flex flex-cols gap-4">
                                    <div className="my-auto">
                                        <h1 id="idTicket" className="text-xs text-gray-500">TK-{ticket.id}</h1>
                                    </div>
                                    <div className="rounded-xl bg-green-600 text-white p-1 h-6 w-auto text-center">
                                        <h1 id="ticketStatus" className="text-xs">{ticket.status}</h1>
                                    </div>
                                </div>
                                <div id="divTitulo">
                                    <h1 id="tituloTicket" className="font-semibold text-md">{ticket.subject}</h1>
                                </div>
                                <div id="divSolicitante">
                                    <h1 id="solicitanteTicket" className="text-gray-500 text-sm">Solicitante: {ticket.createdBy?.businessName ?? 'Não retornado'}</h1>
                                </div>
                                <div id="divAnalista">
                                    <h1 id="analistaTicket" className="text-gray-500 text-sm">Responsavel: {ticket.owner?.businessName ?? 'Não retornado'}</h1>
                                </div>
                                <div id="divData">
                                    <h1 id="dataTicket" className="text-gray-500 text-sm">Data/Hora: {formatarDataHora(ticket.resolvedIn)}</h1>
                                </div>
                                </div>
                            ))
                        ) : (
                            <h1>Nao encontrado</h1>
                        )}
                        </div>
                        </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}