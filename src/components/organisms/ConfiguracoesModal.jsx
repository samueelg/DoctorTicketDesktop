import { useConfigStore } from "../../stores/configStore";
import Button from "../atoms/Button";
import InputField from "../atoms/InputField";
import { api } from "../../services/api";
import { configuracaoService } from "../../services/configuracaoService";
import { ArrowUturnLeftIcon, BellIcon, UserIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { usuariosService } from "../../services/usuarioService";
import { useAuthStore } from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function ConfiguracoesModal() {
    const { isOpen, close } = useConfigStore();
    const [idUsuario, setIdUsuario] = useState()
    const user = useAuthStore((state) => state.user);
    const [salvando, setSalvando] = useState(false);
    const [abaAtiva, setAbaAtiva] = useState("perfil");
    const [formData, setFormData] = useState({
      idMovidesk: "",
      exibeNotificacoes: true,
    });
    const navigate = useNavigate();
    const { showToast } = useToast();

    useEffect(() => {
      if (user?.idMovidesk !== undefined) {
        setFormData((prev) => ({
          ...prev,
          idMovidesk: user.idMovidesk ?? "",
        }));
      }
    }, [user?.idMovidesk]);

    useEffect(() => {
      if (user?.exibeNotificacoes !== undefined) {
        setFormData((prev) => ({
          ...prev,
          exibeNotificacoes: user.exibeNotificacoes ?? true,
        }));
      }
    }, [user?.exibeNotificacoes]);

    async function logout() {
        try {
            await api.post("/logout");

        } catch (error) {
            console.error(error);
        } finally {
            close();
            localStorage.removeItem("token");

            navigate("/login");
        }

    }

    async function salvaConfiguracoes(){
        const data = formData;
        const id = user?.id

        setSalvando(true);
        try {
            await configuracaoService.salvar(id, data);
            showToast('success', 'Sucesso', 'Configurações salvas com sucesso!');
            close();
        } catch (error) {
            showToast('error', 'Erro', 'Ocorreu um erro ao salvar as configurações');
            console.error(error);
        } finally {
            setSalvando(false);
        }
    }

    return (
    <AnimatePresence>
      {isOpen && (
    <motion.div
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        tabIndex={-1}
        className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg"
        style={{ pointerEvents: "auto" }}
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
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
              <button
                onClick={() => setAbaAtiva("perfil")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left ${
                  abaAtiva === "perfil"
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-200"
                }`}
              >
                <UserIcon className="h-5 w-5 text-gray-600" />
                Perfil
              </button>

              <button
                onClick={() => setAbaAtiva("notificacao")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-left ${
                  abaAtiva === "notificacao"
                    ? "bg-gray-200 font-medium"
                    : "hover:bg-gray-200"
                }`}
              >
                <BellIcon className="h-5 w-5 text-gray-600" />
                Notificação
              </button>
            </nav>
          </aside>

          {/* CONTENT */}
          <section className="flex flex-col p-6">
            {abaAtiva === "perfil" && (
              <>
                <div>
                    <label htmlFor="movidesk-id" className="text-sm font-medium">
                      ID Movidesk
                    </label>

                    <InputField
                      id="movidesk-id"
                      value={formData.idMovidesk}
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
              </>
            )}

            {abaAtiva === "notificacao" && (
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.exibeNotificacoes}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      exibeNotificacoes: e.target.checked,
                    }))}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium">
                    Deseja receber notificações?
                  </span>
                </label>

                <p className="mt-1 text-xs text-gray-500">
                  Quando desativado, você não recebe o som e o alerta de novas notificações.
                </p>
              </div>
            )}

            <div className="mt-auto flex justify-end border-t pt-6">
              <Button
                onClick={salvaConfiguracoes}
                text={salvando ? "Salvando..." : "Salvar"}
                loading={salvando}
              />
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}