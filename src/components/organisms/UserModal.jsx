import { Dialog } from "primereact/dialog";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import { useEffect, useState } from 'react';

export default function UserModal({
    onSubmit,
    onHide,
    visible = false,
    mode,
    initialData,
    formData,
    onChange,
    erros
}) {

    useEffect(() => {
        if (mode === "editar" && initialData) {
            onChange("nome", initialData.nome);
            onChange("email", initialData.email);
            onChange("ramal", initialData.ramal);
            onChange("tipo", initialData.tipo);
        }
    }, [initialData, mode]);

    const header = mode === "editar" ? "Editar Usuário" : "Cadastro de Usuário";
    const text   = mode === "editar" ? "Salvar Alterações" : "Cadastrar Usuário";

    return (

        <div className="modal-cadastro">
            <Dialog header={header} visible={visible} style={{ width: '50vw' }} onHide={onHide}>
                <form onSubmit={onSubmit}>
                    <div className="justify-center mb-3">
                        <div className="flex flex-row">
                            <div className='mb-2'>
                                <input type="radio" checked={formData.tipo === 'analista'} value="analista" id="tipoAnalista" name="tipoUsuario" className="w-5 h-5" onChange={(e) => onChange("tipo", e.target.value)} />
                                <label className="ml-2" labelFor="checkAnalista">Analista</label>
                            </div>
                            <div className='mb-2 ml-4'>
                                <input type="radio" checked={formData.tipo === 'admin'} value="admin" id="tipoAdmin" name="tipoUsuario" className="w-5 h-5" onChange={(e) => onChange("tipo", e.target.value)} />
                                <label className="ml-2" labelFor="checkAnalista">Aministrador</label>
                            </div>
                        </div>
                        {erros.tipo && (
                            <small className="text-red-500">{erros.tipo[0]}</small>
                        )}

                        <div className="flex flex-row mb-2">
                            <div className="w-full">
                                <InputField
                                    id='nomeCadastro'
                                    type='text'
                                    value={formData.nome}
                                    label={'Nome do Usuário'}
                                    onChange={(e) => onChange("nome", e.target.value)}
                                    placeholder="Digite o nome do analista"
                                    className='w-full'
                                    inputClassName={`text-base ${erros.nome ? 'border-red-500' : ''}`}
                                />

                                {erros.nome && (
                                    <small className="text-red-500">{erros.nome[0]}</small>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row mb-2">
                            <div className='w-full'>
                                <InputField
                                    id='emailCadastro'
                                    type='text'
                                    value={formData.email}
                                    label={'E-mail'}
                                    onChange={(e) => onChange("email", e.target.value)}
                                    placeholder="Digite o e-mail do usuário"
                                    className='w-full'
                                    inputClassName={`text-base ${erros.email ? 'border-red-500' : ''}`}
                                />

                                {erros.email && (
                                    <small className="text-red-500">{erros.email[0]}</small>
                                )}
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='w-full'>
                                <InputField
                                    id='ramalCadastro'
                                    type='text'
                                    label={'Ramal:'}
                                    value={formData.ramal}
                                    onChange={(e) => onChange("ramal", e.target.value)}
                                    placeholder="Digite o ramal"
                                    className='w-full'
                                    inputClassName={`text-base ${erros.ramal ? 'border-red-500' : ''}`}
                                />

                                {erros.ramal && (
                                    <small className="text-red-500">{erros.ramal[0]}</small>
                                )}
                            </div>
                            <div className='w-full'>
                                <InputField
                                    id='nomeAnalista'
                                    type='password'
                                    label={'Senha:'}
                                    onChange={(e) => onChange("senha", e.target.value)}
                                    placeholder="Digite a senha"
                                    className='w-full'
                                    inputClassName={`text-base ${erros.senha ? 'border-red-500' : ''}`}
                                />

                                {erros.senha && (
                                    <small className="text-red-500">{erros.senha[0]}</small>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row justify-end'>
                        <Button
                            type="submit"
                            text={text}
                            buttonClassName="w-full rounded-2xl shadow-md"
                            variant="green"
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
}