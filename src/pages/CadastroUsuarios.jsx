import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Button from "../components/atoms/Button";
import { usuariosService } from '../services/usuarioService';
import { useRef } from 'react';
import UserModal from '../components/organisms/UserModal'
import { useToast } from "../components/context/ToastContext";


export default function CadastroUsuarios(){
    const [usuarios, setUsuarios] = useState([]);
    const [visible, setVisible]   = useState(false);
    const [visibleConfirm, setVisibleConfirm]   = useState(false);
    const [erros, setErro]        = useState({});
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [mode, setMode] = useState('create');
    const [loading, setLoading]   = useState(true);
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        ramal: "",
        tipo: "",
        senha: ""
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    //Carrega os dados ao iniciar a página
    useEffect(() => {
        getUsuarios();
    },[]);

    //Reseta os dados e fecha a modal
    function handleCloseModal() {
        setVisible(false);
        setFormData({
            nome: "",
            email: "",
            ramal: "",
            tipo: "",
            senha: ""
        });
        setMode("create");
        setUsuarioSelecionado(null);
    }

    async function getUsuarios(){
        try{
            const response = await usuariosService.list();
            setUsuarios(response.data.data);
        }catch(err){
            setErro('Erro ao buscar usuários.');
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        //Dados de cadastro
        const data = formData;

        setErro({});
        try {
            let response;

            if (mode === "editar") {
                response = await usuariosService.patch(usuarioSelecionado.id, formData);
            } else {
                response = await usuariosService.create(formData);
            }

            if (response.status == 201 || response.status == 200){
                showToast('success', 'Sucesso', mode == 'editar' ? 'Usuário editado com sucesso!' : 'Usuário cadastrado com sucesso!');
                handleCloseModal();
                getUsuarios();
            }
        } catch (err) {
            const errosApi = err.response?.data?.errors || {};
            setErro(errosApi);
            console.log('erros: ',erros);
        }
    }

    function abrirModalCadastro(){
        setMode('cadastro');
        setVisible(true);
    }

    function abrirModalRemover(id){
        setVisibleConfirm(true);
        setUsuarioSelecionado(id);
    }

    function abrirModalEditar(usuarioRow){
        setUsuarioSelecionado(usuarioRow);
        setFormData(usuarioRow);
        setMode('editar');
        setVisible(true);
    }

    async function removeUsuario(e){
        e.preventDefault();
        const id = usuarioSelecionado;

        try{
            const response = await usuariosService.remove(id);

            if(response.status == 200){
                setVisibleConfirm(false);
                showToast('success', 'Sucesso', 'Usuário removido com sucesso!');
                getUsuarios();
            }
        }catch(err){
            showToast('error', 'Erro', 'Ocorreu um erro ao remover o usuário');
            const errosApi = err.response?.data?.errors || {};
            setErro(errosApi);
            console.log('erros: ',erros);
        }
    }

    //Buttons ações
    const Acoes = (row) => (
        <div className="flex gap-2">
            {/* Botão de editar */}
            <Button
                type="button"
                text=""
                onClick={() => abrirModalEditar(row)}
                buttonClassName="w-full"
                variant="none"
                icon={<PencilIcon className="h-4 w-4" />}
                iconPos='right'
            />
            {/* Botão de Excluir */}
            <Button
                type="button"
                text=""
                onClick={() => abrirModalRemover(row.id)}
                buttonClassName="w-full"
                variant="none"
                icon={<TrashIcon className="h-4 w-4" />}
                iconPos='right'
            />
        </div>
    );

    //Ajusta a exibição do status na row
    const statusTemplate = (rowData) => {
        const status = rowData.status;

        switch(status){
        case 'ativo':
            return <span className='inline-block w-20 text-center bg-green-500 px-2 py-1 rounded-full text-sm text-white'>Ativo</span>;
        case 'inativo':
            return <span className='inline-block w-20 text-center bg-red-500 px-2 py-1 rounded-full text-sm text-white'>Inativo</span>;
        default:
                return <span className='font-semibold'>Não Informado</span>;
        }
    }

    //Ajusta a exibição do tipo na row
    const tipoTemplate = (rowData) => {
        const tipo = rowData.tipo;

        switch(tipo){
            case 'analista':
                return <span className='inline-block w-20 text-center bg-blue-300 px-2 py-1 rounded-full text-sm text-white'>Analista</span>;
            case 'admin':
                return <span className='inline-block w-20 text-center bg-purple-300 px-2 py-1 rounded-full text-sm text-white'>Admin</span>;
            default:
                return <span className='font-semibold'>Não Informado</span>;
        }
    }

    const emailTemplate = (rowData) => {
        const email = rowData.email;

        if(email){
            return email;
        }
        return <span className='font-semibold'>Não Informado</span>;

    }

    const ramalTemplate = (rowData) => {
        const ramal = rowData.ramal;

        if (ramal) {
            return <span className='italic'>{ramal}</span>;
        }
        return <span className='font-semibold'>Não Informado</span>;
    }


    return (
        <div className="cadastro-page">
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto w-full max-w-4xl px-6 p-6 min-h-screen flex flex-col justify-center">
                    <div className="mb-6 flex justify-between">
                        <h1 className="text-2xl font-semibold">Cadastro de Usuários</h1>
                        <div>
                        <Button
                            type="button"
                            text="Cadastrar Usuário"
                            onClick={abrirModalCadastro}
                            buttonClassName="w-full rounded-2xl shadow-md"
                            variant="green"
                            icon={<PlusIcon className="h-5 w-5 ml-1"/>}
                            iconPos='right'
                        />
                        </div>
                    </div>
                    <div id="table-usuarios" className="space-y-4">
                        <section className="rounded-2xl min-h-80 p-3 bg-white shadow-sm">
                            <DataTable value={usuarios} stripedRows showGridlines rowHover size="medium" loading={loading} paginator rows={5}>
                                <Column field="nome" header="Nome" body={(rowData) => rowData.nome ?? "Não Informado"}></Column>
                                <Column field="email" header="E-mail" body={emailTemplate}></Column>
                                <Column field="tipo" header="Tipo" body={tipoTemplate ?? "Não Informado"}></Column>
                                <Column field="ramal" header="Ramal" body={ramalTemplate}></Column>
                                <Column field="status" header="Status" body={statusTemplate}></Column>
                                <Column body={Acoes} header="Ações"></Column>
                            </DataTable>
                        </section>
                    </div>

                    <UserModal
                        onSubmit={handleSubmit}
                        onHide={handleCloseModal}
                        visible={visible}
                        mode={mode}
                        initialData={usuarioSelecionado}
                        formData={formData}
                        onChange={handleChange}
                        erros={erros}
                    />

                    <div className="modal-deletar">
                        <Dialog header="Confirmação" visible={visibleConfirm} style={{ width: '50vw' }} onHide={() => { if (!visibleConfirm) return; setVisibleConfirm(false); }}>
                            <form action="DELETE" onSubmit={removeUsuario}>
                            <div className="flex justify-center mb-3">
                                <span>Deseja confirmar a remoção?</span>
                            </div>
                            <hr className='mb-2'/>
                            <div className="flex flex-cols-2 justify-end gap-3">
                                <Button
                                    type="submit"
                                    text="Sim"
                                    buttonClassName="w-full rounded-2xl shadow-md"
                                    variant="green"
                                />
                                <Button
                                    type="button"
                                    text="Não"
                                    onClick={() => setVisibleConfirm(false)}
                                    buttonClassName="w-full rounded-2xl shadow-md"
                                    variant="red"
                                />
                            </div>
                            </form>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}