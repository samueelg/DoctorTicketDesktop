import { useConfigStore } from "../../stores/configStore";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import { api } from "../../services/api";
import { configuracaoService } from "../../services/configuracaoService";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { usuariosService } from "../../services/usuarioService";
import { useAuthStore } from "../../stores/authStore";

export default function ConfiguracoesModal() {
    const { isOpen, close } = useConfigStore();
    const [idUsuario, setIdUsuario] = useState()
    const user = useAuthStore((state) => state.user);
    const [formData, setFormData] = useState({
      idMovidesk: "",
    });

    if (!isOpen) return null;

    async function logout() {
        try {
            await api.post("/logout");

        } catch (error) {
            console.error(error);
        } finally {
            localStorage.removeItem("token");

            navigate("/login");
        }

    }

    async function salvaConfiguracoes(){
        const data = formData;
        const id = user?.tipo

        try {
            const response = await configuracaoService.salvar(id, data);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
        
    }

    return (
    <div
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        tabIndex={-1}
        className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg"
        style={{ pointerEvents: "auto" }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-8 py-5">
          <h2 className="text-xl font-semibold">Configurações</h2>

          <Button
            aria-label="Fechar"
            text={"X"}
            onClick={close}
            variant="none"
            className="rounded-md p-1 hover:bg-gray-100"
          />
        </div>

        {/* BODY */}
        <div className="grid min-h-[480px] grid-cols-[220px_1fr]">
          {/* SIDEBAR */}
          <aside className="border-r bg-gray-50 p-3">
            <nav className="flex flex-col gap-1">
              <button className="rounded-md px-3 py-2 text-left hover:bg-gray-200">
                Perfil
              </button>
            </nav>
          </aside>

          {/* CONTENT */}
          <section className="flex flex-col p-6">
            <div>
                <label htmlFor="movidesk-id" className="text-sm font-medium">
                  ID Movidesk
                </label>

                <InputField
                  id="movidesk-id"
                  value={formData.idMovidesk || user?.idMovidesk || ""}
                  onChange={(e) => setFormData((prev) => ({
                    ...prev,
                    idMovidesk: e.target.value,
                  }))}
                  placeholder="Digite seu ID Movidesk"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Usado para integrar sua conta ao Movidesk.
                </p>
            </div>
            <div className="mt-3">
                <Button
                    text={'Fazer Logout'}
                    className="w-ful flex justify-end"
                    variant="red"
                    onClick={logout}
                    buttonClassName="w-75 h-8 rounded-2xl shadow-sm font-semibold"
                    icon={<ArrowUturnLeftIcon className="h-5 w-5 mr-2"/>}
                    iconPos="left"
                />
            </div>

            <div className="mt-auto flex justify-end border-t pt-6">
              <Button 
                onClick={salvaConfiguracoes}
                text={"Salvar"}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}