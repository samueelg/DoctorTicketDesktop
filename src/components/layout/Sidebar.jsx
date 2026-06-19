import {
  HomeIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useConfigStore } from "../../stores/configStore";
import Button from "../atoms/Button";
import { useAuthStore } from "../../stores/authStore";


const linkClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 hover:text-gray-900 ${
    isActive ? "text-green-600" : "text-gray-600"
  }`;

export function Sidebar() {
  const openConfig = useConfigStore((state) => state.open);
  const user       = useAuthStore((state) => state.user);

  return (
    <aside className="w-20 flex-none border-r">
      <nav className="h-full flex flex-col items-center gap-6 py-6">
        <NavLink to="/" className={linkClass}>
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">Início</span>
        </NavLink>

        <NavLink to="/relatorios" className={linkClass}>
          <FolderIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">Relatórios</span>
        </NavLink>

        <NavLink to="/ligacaoFinalizada" className={linkClass}>
          <UserIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">Perfil</span>
        </NavLink>

        <NavLink to="/gravar" className={linkClass}>
          <UserIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">Gravar</span>
        </NavLink>

        {user?.tipo === "admin" && (
          <NavLink to="/cadastro" className={linkClass}>
            <UserIcon className="h-6 w-6" />
            <span className="text-[10px] leading-none">Usuários</span>
          </NavLink>
        )}

        <div className="flex flex-col items-center">
        <Button
                type="button"
                onClick={openConfig}
                buttonClassName="w-full text-gray-600"
                variant="none"
                icon={<Cog6ToothIcon className="h-6 w-6" />}
            />
          <span className="text-[10px] leading-none">Configurações</span>
        </div>
      </nav>
    </aside>
  );
}