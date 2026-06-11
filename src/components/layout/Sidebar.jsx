import {
  HomeIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex flex-col items-center gap-1 hover:text-gray-900 ${
    isActive ? "text-green-600" : "text-gray-600"
  }`;

export function Sidebar() {
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

        <NavLink to="/gravar" className={linkClass}>
          <UserIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">Perfil</span>
        </NavLink>

        <NavLink to="/cadastro" className={linkClass}>
          <UserIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">Usuários</span>
        </NavLink>

        <NavLink to="/configuracoes" className={(p) => linkClass(p) + " mt-auto"}>
          <Cog6ToothIcon className="h-6 w-6" />
          <span className="text-[10px] leading-none">Config</span>
        </NavLink>
      </nav>
    </aside>
  );
}