import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { Notificacao } from "../../components/layout/Notificacao";
import UserData from "../../components/layout/UserData";
import { ToastProvider } from "../../components/context/ToastContext";
import ConfiguracaoModal from "../../components/organisms/ConfiguracoesModal";
import { useAuthStore } from "../../stores/authStore";
import { useEffect } from "react";

export default function AppLayout(){
    const fetchUser = useAuthStore((state) => state.fetchUser);

    useEffect(() => {
      fetchUser();
    }, []);

    return (
    <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 min-w-0">
            <Outlet />
        </main>
            <Notificacao/>
            <ConfiguracaoModal/>
            <UserData/>
    </div>
    );
}