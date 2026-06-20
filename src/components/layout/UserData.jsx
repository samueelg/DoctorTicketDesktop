import { useAuthStore } from "../../stores/authStore";

export default function UserData() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="px-3 py-2 text-sm text-gray-800">
        <div className="text-right uppercase">{user.nome}</div>
        <div className="text-right">{user.ramal}</div>
      </div>
    </div>
  );
}