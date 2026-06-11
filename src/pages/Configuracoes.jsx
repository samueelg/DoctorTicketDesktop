import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import Button from "../components/atoms/Button";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Configuracoes(){
    const navigate = useNavigate();


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

    return(
        <div className="configuracao-page">
            <div className="min-h-screen bg-gray-50">
                <div className="mx-auto w-full max-w-2xl px-6 p-6">
                    <div className="space-y-4">
                        <section className="rounded-2xl p-3 bg-white shadow-sm">
                            <div className="text-xl">
                                <h1>Configurações</h1>
                            </div>
                            <div className="mt-3">
                                <Button
                                    text={'Fazer Logout'}
                                    className="w-ful flex justify-center"
                                    variant="red"
                                    onClick={logout}
                                    buttonClassName="w-75 h-8 rounded-2xl shadow-sm font-semibold"
                                    icon={<ArrowUturnLeftIcon className="h-5 w-5 mr-2"/>}
                                    iconPos="left"
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}